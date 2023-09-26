// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { getAddressById, entityToAddress } from "solecs/utils.sol";
// external
import { IWorld } from "solecs/interfaces/IWorld.sol";
//interfaces
import { IOnEntitySubsystem } from "../interfaces/IOnEntitySubsystem.sol";
import { IOnSubsystem } from "../interfaces/IOnSubsystem.sol";

//systems
import { ID as S_ResolveBattleSystemID } from "systems/S_ResolveBattleSystem.sol";
import { ID as S_ClaimAllResourcesSystemID } from "systems/S_ClaimAllResourcesSystem.sol";
import { ID as S_ResolveRaidUnitsSystemID } from "systems/S_ResolveRaidUnitsSystem.sol";
// comps

import { P_IsUnitComponent, ID as P_IsUnitComponentID } from "components/P_IsUnitComponent.sol";
import { P_UnitCargoComponent, ID as P_UnitCargoComponentID } from "components/P_UnitCargoComponent.sol";
import { P_MaxResourceStorageComponent, ID as P_MaxResourceStorageComponentID } from "components/P_MaxResourceStorageComponent.sol";
import { P_RaidRequirementComponent, ID as P_RaidRequirementComponentID } from "components/P_RaidRequirementComponent.sol";
import { OwnedByComponent, ID as OwnedByComponentID } from "components/OwnedByComponent.sol";
import { BattleSpaceRockComponent, ID as BattleSpaceRockComponentID } from "components/BattleSpaceRockComponent.sol";
import { BattleDefenderComponent, ID as BattleDefenderComponentID } from "components/BattleDefenderComponent.sol";
import { BattleAttackerComponent, ID as BattleAttackerComponentID } from "components/BattleAttackerComponent.sol";
import { BattleResultComponent, ID as BattleResultComponentID } from "components/BattleResultComponent.sol";
import { AsteroidTypeComponent, ID as AsteroidTypeComponentID } from "components/AsteroidTypeComponent.sol";
import { ItemComponent, ID as ItemComponentID } from "components/ItemComponent.sol";
import { BattleRaidResultComponent, ID as BattleRaidResultComponentID } from "components/BattleRaidResultComponent.sol";
import { BattleBlockNumberComponent, ID as BattleBlockNumberComponentID } from "components/BattleBlockNumberComponent.sol";
import { TotalRaidComponent, ID as TotalRaidComponentID } from "components/TotalRaidComponent.sol";
import { RaidResult } from "src/types.sol";

import { ID as UpdateUnclaimedResourcesSystemID } from "systems/S_UpdateUnclaimedResourcesSystem.sol";

// libs
import { ArrivalsList } from "libraries/ArrivalsList.sol";
import { LibEncode } from "libraries/LibEncode.sol";
import { LibMath } from "libraries/LibMath.sol";
import { LibUnits } from "libraries/LibUnits.sol";
import { LibUpdateSpaceRock } from "libraries/LibUpdateSpaceRock.sol";
import { LibReinforce } from "libraries/LibReinforce.sol";
import { LibBattle } from "libraries/LibBattle.sol";
import { LibResource } from "libraries/LibResource.sol";
import { LibStorage } from "libraries/LibStorage.sol";
// types
import { Coord, Arrival, ArrivalUnit, BattleParticipant, ESendType, BattleResult, ESpaceRockType, ResourceValues } from "src/types.sol";

library LibRaid {
  function raid(IWorld world, uint256 invader, uint256 rockEntity) internal {
    OwnedByComponent ownedByComponent = OwnedByComponent(world.getComponent(OwnedByComponentID));
    uint256 battleEntity = LibEncode.hashKeyEntity(rockEntity, block.number);

    require(
      AsteroidTypeComponent(world.getComponent(AsteroidTypeComponentID)).getValue(rockEntity) ==
        ESpaceRockType.ASTEROID,
      "LibRaid: can only raid asteroids"
    );

    //console.log("setup attacker");
    uint256 defenderEntity = 0;
    if (ownedByComponent.has(rockEntity)) {
      require(ownedByComponent.getValue(rockEntity) != invader, "[Raid]: can not raid your own rock");
      defenderEntity = ownedByComponent.getValue(rockEntity);
    } else {
      revert("LibRaid: can not raid unowned rock");
    }

    BattleSpaceRockComponent(world.getComponent(BattleSpaceRockComponentID)).set(battleEntity, rockEntity);
    BattleBlockNumberComponent(world.getComponent(BattleBlockNumberComponentID)).set(battleEntity, block.number);
    LibBattle.setupBattleAttacker(world, battleEntity, invader, rockEntity, ESendType.RAID);
    LibBattle.setupBattleDefender(world, battleEntity, defenderEntity, rockEntity);
    //console.log("setup defender");
    IOnEntitySubsystem(getAddressById(world.systems(), S_ResolveBattleSystemID)).executeTyped(
      entityToAddress(invader),
      battleEntity
    );
    //console.log("resolve battle");

    IOnEntitySubsystem(getAddressById(world.systems(), S_ResolveRaidUnitsSystemID)).executeTyped(
      entityToAddress(invader),
      battleEntity
    );
    //console.log("update units after battle");

    resolveRaid(world, battleEntity);
    //console.log("resouces updated after raid");
  }

  function updatePlayerUnitsAfterBattle(IWorld world, uint256 battleEntity) internal {
    uint256 rockEntity = BattleSpaceRockComponent(world.getComponent(BattleSpaceRockComponentID)).getValue(
      battleEntity
    );
    BattleResult memory battleResult = BattleResultComponent(world.getComponent(BattleResultComponentID)).getValue(
      battleEntity
    );
    BattleParticipant memory attacker = BattleAttackerComponent(world.getComponent(BattleAttackerComponentID)).getValue(
      battleEntity
    );
    BattleParticipant memory defender = BattleDefenderComponent(world.getComponent(BattleDefenderComponentID)).getValue(
      battleEntity
    );

    uint256 loserEntity = battleResult.winnerEntity == attacker.participantEntity
      ? defender.participantEntity
      : attacker.participantEntity;
    uint256[] memory unitTypes = P_IsUnitComponent(world.getComponent(P_IsUnitComponentID)).getEntitiesWithValue(true);
    uint256 attackerHomeAsteroid = LibEncode.hashEntity(world, attacker.participantEntity);

    if (attacker.participantEntity == battleResult.winnerEntity) {
      LibUpdateSpaceRock.destroyAllPlayerUnitsOnAsteroid(world, loserEntity, rockEntity);
      for (uint i = 0; i < battleResult.attackerUnitsLeft.length; i++) {
        if (attacker.unitCounts[i] <= 0) continue;
        LibUnits.updateOccuppiedUtilityResources(
          world,
          attacker.participantEntity,
          unitTypes[i],
          attacker.unitCounts[i] - battleResult.attackerUnitsLeft[i],
          false
        );
        LibUpdateSpaceRock.setUnitsOnAsteroid(
          world,
          attacker.participantEntity,
          attackerHomeAsteroid,
          unitTypes[i],
          battleResult.attackerUnitsLeft[i]
        );
      }
    } else {
      for (uint i = 0; i < unitTypes.length; i++) {
        if (attacker.unitCounts[i] > 0)
          LibUnits.updateOccuppiedUtilityResources(
            world,
            attacker.participantEntity,
            unitTypes[i],
            attacker.unitCounts[i],
            false
          );
        if (defender.unitCounts[i] <= 0) continue;
        LibUnits.updateOccuppiedUtilityResources(
          world,
          defender.participantEntity,
          unitTypes[i],
          defender.unitCounts[i] - battleResult.defenderUnitsLeft[i],
          false
        );
        LibUpdateSpaceRock.setUnitsOnAsteroid(
          world,
          battleResult.winnerEntity,
          rockEntity,
          unitTypes[i],
          battleResult.defenderUnitsLeft[i]
        );
      }
    }
  }

  function getTotalCargoValue(IWorld world, uint256 battleEntity) internal view returns (uint32 totalCargoValue) {
    P_UnitCargoComponent unitCargoComponent = P_UnitCargoComponent(world.getComponent(P_UnitCargoComponentID));
    BattleAttackerComponent battleAttackerComponent = BattleAttackerComponent(
      world.getComponent(BattleAttackerComponentID)
    );
    BattleParticipant memory attacker = battleAttackerComponent.getValue(battleEntity);

    totalCargoValue = 0;
    for (uint256 i = 0; i < attacker.unitTypes.length; i++) {
      if (attacker.unitCounts[i] == 0) continue;
      uint32 level = LibUnits.getPlayerUnitTypeLevel(world, attacker.participantEntity, attacker.unitTypes[i]);
      totalCargoValue +=
        attacker.unitCounts[i] *
        unitCargoComponent.getValue(LibEncode.hashKeyEntity(attacker.unitTypes[i], level));
    }

    return totalCargoValue;
  }

  function resolveRaid(IWorld world, uint256 battleEntity) internal {
    uint32 totalCargo = getTotalCargoValue(world, battleEntity);

    if (totalCargo == 0) return;

    BattleParticipant memory defender = BattleDefenderComponent(world.getComponent(BattleDefenderComponentID)).getValue(
      battleEntity
    );
    //uint256[] memory resourceIds = LibResource.getMotherlodeResources();
    uint256[] memory resourceIds = P_MaxResourceStorageComponent(world.getComponent(P_MaxResourceStorageComponentID))
      .getValue(defender.participantEntity);

    (uint32 totalResources, uint32[] memory defenderResources) = LibResource.getTotalResources(
      world,
      defender.participantEntity
    );

    RaidResult memory raidResult = RaidResult({
      resources: resourceIds,
      defenderValuesBeforeRaid: new uint32[](defenderResources.length),
      raidedAmount: new uint32[](defenderResources.length)
    });
    if (totalResources == 0 || resourceIds.length == 0) {
      BattleRaidResultComponent(world.getComponent(BattleRaidResultComponentID)).set(battleEntity, raidResult);
      return;
    }
    BattleParticipant memory attacker = BattleAttackerComponent(world.getComponent(BattleAttackerComponentID)).getValue(
      battleEntity
    );
    TotalRaidComponent totalRaidComponent = TotalRaidComponent(world.getComponent(TotalRaidComponentID));
    for (uint256 i = 0; i < defenderResources.length; i++) {
      uint256 raidAmount = (uint256(totalCargo) * uint256(defenderResources[i]));
      raidAmount = raidAmount / totalResources;
      if (defenderResources[i] < raidAmount) {
        raidAmount = defenderResources[i];
      }
      if (raidAmount == 0) continue;
      raidResult.defenderValuesBeforeRaid[i] = defenderResources[i];
      raidResult.raidedAmount[i] = uint32(raidAmount);
      LibMath.add(
        totalRaidComponent,
        LibEncode.hashKeyEntity(resourceIds[i], attacker.participantEntity),
        uint32(raidAmount)
      );
      LibStorage.addResourceToStorage(world, attacker.participantEntity, resourceIds[i], uint32(raidAmount));
      LibStorage.reduceResourceFromStorage(world, defender.participantEntity, resourceIds[i], uint32(raidAmount));
    }
    BattleRaidResultComponent(world.getComponent(BattleRaidResultComponentID)).set(battleEntity, raidResult);
  }

  function checkRaidRequirement(
    IWorld world,
    uint256 playerEntity,
    uint256 objectiveEntity
  ) internal view returns (bool) {
    P_RaidRequirementComponent raidRequirementComponent = P_RaidRequirementComponent(
      world.getComponent(P_RaidRequirementComponentID)
    );
    if (!raidRequirementComponent.has(objectiveEntity)) return true;
    TotalRaidComponent totalRaidComponent = TotalRaidComponent(world.getComponent(TotalRaidComponentID));
    ResourceValues memory raidRequirements = raidRequirementComponent.getValue(objectiveEntity);
    for (uint256 i = 0; i < raidRequirements.resources.length; i++) {
      if (
        LibMath.getSafe(totalRaidComponent, LibEncode.hashKeyEntity(raidRequirements.resources[i], playerEntity)) <
        raidRequirements.values[i]
      ) {
        return false;
      }
    }
    return true;
  }
}
