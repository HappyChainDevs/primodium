// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { getAddressById, entityToAddress } from "solecs/utils.sol";
// external
import { IWorld } from "solecs/interfaces/IWorld.sol";

//interfaces
import { IOnEntitySubsystem } from "../interfaces/IOnEntitySubsystem.sol";

//systems
import { S_ResolveBattleSystem, ID as S_ResolveBattleSystemID } from "systems/S_ResolveBattleSystem.sol";

import "forge-std/console.sol";
// comps

import { P_UnitTravelSpeedComponent as SpeedComponent, ID as SpeedComponentID } from "components/P_UnitTravelSpeedComponent.sol";
import { P_IsUnitComponent, ID as P_IsUnitComponentID } from "components/P_IsUnitComponent.sol";
import { P_UnitCargoComponent, ID as P_UnitCargoComponentID } from "components/P_UnitCargoComponent.sol";
import { P_MaxResourceStorageComponent, ID as P_MaxResourceStorageComponentID } from "components/P_MaxResourceStorageComponent.sol";
import { OwnedByComponent, ID as OwnedByComponentID } from "components/OwnedByComponent.sol";
import { ArrivalsSizeComponent, ID as ArrivalsSizeComponentID } from "components/ArrivalsSizeComponent.sol";
import { BattleSpaceRockComponent, ID as BattleSpaceRockComponentID } from "components/BattleSpaceRockComponent.sol";
import { BattleDefenderComponent, ID as BattleDefenderComponentID } from "components/BattleDefenderComponent.sol";
import { BattleAttackerComponent, ID as BattleAttackerComponentID } from "components/BattleAttackerComponent.sol";
import { BattleResultComponent, ID as BattleResultComponentID } from "components/BattleResultComponent.sol";
import { LevelComponent, ID as LevelComponentID } from "components/LevelComponent.sol";
import { AsteroidTypeComponent, ID as AsteroidTypeComponentID } from "components/AsteroidTypeComponent.sol";
import { ItemComponent, ID as ItemComponentID } from "components/ItemComponent.sol";

// libs
import { ArrivalsList } from "libraries/ArrivalsList.sol";
import { LibEncode } from "libraries/LibEncode.sol";
import { ABDKMath64x64 as Math } from "abdk-libraries-solidity/ABDKMath64x64.sol";
import { LibMath } from "libraries/LibMath.sol";
import { LibUnits } from "libraries/LibUnits.sol";
import { LibUpdateSpaceRock } from "libraries/LibUpdateSpaceRock.sol";
import { LibReinforce } from "libraries/LibReinforce.sol";
import { LibBattle } from "libraries/LibBattle.sol";
import { LibResource } from "libraries/LibResource.sol";
import { LibStorage } from "libraries/LibStorage.sol";
// types
import { Coord, Arrival, ArrivalUnit, BattleParticipant, ESendType, BattleResult, ESpaceRockType } from "src/types.sol";

library LibRaid {
  function raid(IWorld world, uint256 invader, uint256 rockEntity) internal {
    OwnedByComponent ownedByComponent = OwnedByComponent(world.getComponent(OwnedByComponentID));
    uint256 battleEntity = LibEncode.hashKeyEntity(rockEntity, block.number);
    BattleSpaceRockComponent(world.getComponent(BattleSpaceRockComponentID)).set(battleEntity, rockEntity);
    require(
      AsteroidTypeComponent(world.getComponent(AsteroidTypeComponentID)).getValue(rockEntity) ==
        ESpaceRockType.ASTEROID,
      "LibRaid: can only raid asteroids"
    );
    LibBattle.setupBattleAttacker(world, battleEntity, invader, rockEntity, ESendType.RAID);
    console.log("setup attacker");
    uint256 defenderEntity = 0;
    if (ownedByComponent.has(rockEntity)) {
      require(ownedByComponent.getValue(rockEntity) != invader, "[Raid]: can not raid your own rock");
      defenderEntity = ownedByComponent.getValue(rockEntity);
    } else {
      revert("LibRaid: can not raid unowned rock");
    }
    LibBattle.setupBattleDefender(world, battleEntity, defenderEntity, rockEntity);
    console.log("setup defender");
    IOnEntitySubsystem(getAddressById(world.systems(), S_ResolveBattleSystemID)).executeTyped(
      entityToAddress(invader),
      battleEntity
    );
    console.log("resolve battle");
    updatePlayerUnitsAfterBattle(world, battleEntity, rockEntity);
    console.log("update units after battle");

    resolveRaid(world, battleEntity);
    console.log("resouces updated after raid");
    //ArrivalsList.get(world, playerAsteroidEntity, arrival);
  }

  function updatePlayerUnitsAfterBattle(IWorld world, uint256 battleEntity, uint256 rockEntity) internal {
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
          attacker.participantEntity,
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
    LevelComponent levelComponent = LevelComponent(world.getComponent(LevelComponentID));
    P_UnitCargoComponent unitCargoComponent = P_UnitCargoComponent(world.getComponent(P_UnitCargoComponentID));
    BattleAttackerComponent battleAttackerComponent = BattleAttackerComponent(
      world.getComponent(BattleAttackerComponentID)
    );
    BattleParticipant memory attacker = battleAttackerComponent.getValue(battleEntity);

    totalCargoValue = 0;
    for (uint256 i = 0; i < attacker.unitTypes.length; i++) {
      uint256 playerUnitEntity = LibEncode.hashKeyEntity(attacker.unitTypes[i], attacker.participantEntity);
      uint32 level = levelComponent.getValue(playerUnitEntity);

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

    (uint32 totalResources, uint32[] memory resources) = LibResource.getTotalResources(
      world,
      defender.participantEntity
    );
    if (totalResources == 0) return;

    LibResource.claimAllResources(
      world,
      BattleAttackerComponent(world.getComponent(BattleAttackerComponentID)).getValue(battleEntity).participantEntity
    );
    LibResource.claimAllResources(
      world,
      BattleDefenderComponent(world.getComponent(BattleDefenderComponentID)).getValue(battleEntity).participantEntity
    );

    BattleParticipant memory attacker = BattleAttackerComponent(world.getComponent(BattleAttackerComponentID)).getValue(
      battleEntity
    );

    ItemComponent itemComponent = ItemComponent(world.getComponent(ItemComponentID));
    uint256[] memory resourceIds = P_MaxResourceStorageComponent(world.getComponent(P_MaxResourceStorageComponentID))
      .getValue(defender.participantEntity);

    for (uint256 i = 0; i < resources.length; i++) {
      uint32 raidAmount = (totalCargo * resources[i]) / totalResources;

      if (resources[i] >= raidAmount) resources[i] = resources[i] - raidAmount;
      else {
        raidAmount = resources[i];
        resources[i] = 0;
      }
      LibStorage.addResourceToStorage(world, resourceIds[i], raidAmount, attacker.participantEntity);

      itemComponent.set(LibEncode.hashKeyEntity(resourceIds[i], defender.participantEntity), resources[i]);
    }
  }
}
