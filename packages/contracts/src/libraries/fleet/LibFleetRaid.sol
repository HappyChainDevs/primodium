// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;
import { EResource } from "src/Types.sol";

import { RaidedResource, BattleRaidResult, BattleRaidResultData, P_Transportables, IsFleet, MaxResourceCount, BattleResult, BattleResultData, P_EnumToPrototype, FleetStance, FleetStanceData, Position, FleetMovementData, FleetMovement, Spawned, PirateAsteroid, DefeatedPirate, UnitCount, ReversePosition, PositionData, P_Unit, P_UnitData, UnitLevel, P_GameConfig, P_GameConfigData, ResourceCount, OwnedBy, P_UnitPrototypes } from "codegen/index.sol";

import { LibMath } from "libraries/LibMath.sol";
import { LibEncode } from "libraries/LibEncode.sol";
import { LibUnit } from "libraries/LibUnit.sol";
import { LibStorage } from "libraries/LibStorage.sol";
import { LibFleet } from "libraries/fleet/LibFleet.sol";
import { FleetsMap } from "libraries/fleet/FleetsMap.sol";
import { LibFleetDisband } from "libraries/fleet/LibFleetDisband.sol";
import { LibResource } from "libraries/LibResource.sol";
import { LibFleetStance } from "libraries/fleet/LibFleetStance.sol";
import { LibFleetAttributes } from "libraries/fleet/LibFleetAttributes.sol";
import { LibAsteroidAttributes } from "libraries/LibAsteroidAttributes.sol";
import { FleetsMap } from "libraries/fleet/FleetsMap.sol";
import { FleetKey, FleetOwnedByKey, FleetIncomingKey, FleetStanceKey } from "src/Keys.sol";

import { WORLD_SPEED_SCALE, UNIT_SPEED_SCALE } from "src/constants.sol";
import { EResource, EFleetStance } from "src/Types.sol";

library LibFleetRaid {
  function getMaxRaidAmountWithAllies(bytes32 entity) internal view returns (uint256, uint256[] memory, uint256) {
    return
      IsFleet.get(entity)
        ? LibFleetAttributes.getFreeCargoSpaceWithFollowers(entity)
        : LibAsteroidAttributes.getFreeCargoSpacesWithDefenders(entity);
  }

  function getRaidableResourceCountsWithAllies(bytes32 entity) internal view returns (uint256[] memory, uint256) {
    return
      IsFleet.get(entity)
        ? LibFleetAttributes.getResourceCountsWithFollowers(entity)
        : LibAsteroidAttributes.getStoredResourceCountsWithDefenders(entity);
  }

  function getAllies(bytes32 entity) internal view returns (bytes32[] memory) {
    return IsFleet.get(entity) ? LibFleetStance.getFollowerFleets(entity) : LibFleetStance.getDefendingFleets(entity);
  }

  function battleRaidResolve(bytes32 battleId, bytes32 raider, bytes32 target) internal {
    //maximum amount of resources the fleet can raid
    (
      uint256 freeCargoSpace,
      uint256[] memory freeCargoSpaces,
      uint256 totalFreeCargoSpace
    ) = getMaxRaidAmountWithAllies(raider);
    if (totalFreeCargoSpace == 0) return;
    // will caculate how much of each resource was successfuly raided from target and increase those to be used for increasing resources of the raiders
    (uint256[] memory totalRaidedResourceCounts, uint256 totalRaidedResources) = calculateRaidFromWithAllies(
      battleId,
      target,
      totalFreeCargoSpace
    );
    //will increase the resources that were successfully raided to the raider and their allies
    receiveRaidedResourcesWithAllies(
      battleId,
      raider,
      freeCargoSpace,
      freeCargoSpaces,
      totalFreeCargoSpace,
      totalRaidedResourceCounts
    );
  }

  function calculateRaidFromWithAllies(
    bytes32 battleId,
    bytes32 targetEntity,
    uint256 totalFreeCargoSpace
  ) internal returns (uint256[] memory totalRaidedResourceCounts, uint256 totalRaidedResources) {
    (
      uint256[] memory totalRaidableResourceCounts,
      uint256 totalRaidableResources
    ) = getRaidableResourceCountsWithAllies(targetEntity);

    totalRaidedResources = 0;
    totalRaidedResourceCounts = new uint256[](P_Transportables.length());

    //if the fleet can raid more than the total resources available, raid all resources
    if (totalFreeCargoSpace > totalRaidableResources) totalFreeCargoSpace = totalRaidableResources;

    if (totalFreeCargoSpace == 0) return (totalRaidedResourceCounts, totalRaidedResources);
    (totalRaidedResourceCounts, totalRaidedResources) = calculateRaidFrom(
      battleId,
      targetEntity,
      totalRaidableResourceCounts,
      totalRaidableResources,
      totalFreeCargoSpace,
      totalRaidedResourceCounts,
      totalRaidedResources
    );

    bytes32[] memory allies = getAllies(targetEntity);
    for (uint256 i = 0; i < allies.length; i++) {
      (totalRaidedResourceCounts, totalRaidedResources) = calculateRaidFrom(
        battleId,
        allies[i],
        totalRaidableResourceCounts,
        totalRaidableResources,
        totalFreeCargoSpace,
        totalRaidedResourceCounts,
        totalRaidedResources
      );
    }
  }

  function calculateRaidFrom(
    bytes32 battleId,
    bytes32 targetEntity,
    uint256[] memory totalRaidableResourceCounts,
    uint256 totalRaidableResources,
    uint256 totalFreeCargoSpace,
    uint256[] memory totalRaidedResourceCounts,
    uint256 totalRaidedResources
  ) internal returns (uint256[] memory, uint256) {
    if (totalFreeCargoSpace == 0 || totalRaidableResources == 0)
      return (totalRaidedResourceCounts, totalRaidedResources);

    uint8[] memory transportables = P_Transportables.get();
    BattleRaidResultData memory raidResult = BattleRaidResultData({
      resourcesAtStart: new uint256[](transportables.length),
      resourcesAtEnd: new uint256[](transportables.length)
    });
    for (uint256 i = 0; i < transportables.length; i++) {
      raidResult.resourcesAtStart[i] = ResourceCount.get(targetEntity, transportables[i]);
      if (raidResult.resourcesAtStart[i] == 0) continue;
      uint256 resourcePortion = LibMath.divideRound(
        (raidResult.resourcesAtStart[i] * totalFreeCargoSpace),
        totalRaidableResources
      );
      if (resourcePortion > raidResult.resourcesAtStart[i]) resourcePortion = raidResult.resourcesAtStart[i];
      if (totalRaidedResources + resourcePortion > totalFreeCargoSpace)
        resourcePortion = totalFreeCargoSpace - totalRaidedResources;
      if (IsFleet.get(targetEntity)) {
        LibFleet.decreaseFleetResource(targetEntity, transportables[i], resourcePortion);
      } else {
        LibStorage.decreaseStoredResource(targetEntity, transportables[i], resourcePortion);
      }
      raidResult.resourcesAtEnd[i] = ResourceCount.get(targetEntity, transportables[i]);
      totalRaidedResourceCounts[i] += resourcePortion;
      totalRaidedResources += resourcePortion;
      if (totalRaidedResources == totalFreeCargoSpace) break;
    }
    BattleRaidResult.set(battleId, targetEntity, raidResult);
    return (totalRaidedResourceCounts, totalRaidedResources);
  }

  function receiveRaidedResourcesWithAllies(
    bytes32 battleId,
    bytes32 targetEntity,
    uint256 freeCargoSpace,
    uint256[] memory freeCargoSpaces,
    uint256 totalFreeCargoSpace,
    uint256[] memory totalRaidedResourceCounts
  ) internal {
    if (totalFreeCargoSpace == 0) return;
    receiveRaidedResources(battleId, targetEntity, totalFreeCargoSpace, freeCargoSpace, totalRaidedResourceCounts);
    bytes32[] memory allies = getAllies(targetEntity);
    for (uint256 i = 0; i < allies.length; i++) {
      receiveRaidedResources(battleId, allies[i], totalFreeCargoSpace, freeCargoSpaces[i], totalRaidedResourceCounts);
    }
  }

  function receiveRaidedResources(
    bytes32 battleId,
    bytes32 targetEntity,
    uint256 totalFreeCargoSpace,
    uint256 freeCargoSpace,
    uint256[] memory totalRaidedResourceCounts
  ) internal {
    if (totalFreeCargoSpace == 0 || freeCargoSpace == 0) return;
    uint8[] memory transportables = P_Transportables.get();
    BattleRaidResultData memory raidResult = BattleRaidResultData({
      resourcesAtStart: new uint256[](transportables.length),
      resourcesAtEnd: new uint256[](transportables.length)
    });
    uint256 receivedResources = 0;
    bytes32 playerEntity = IsFleet.get(targetEntity)
      ? OwnedBy.get(OwnedBy.get(targetEntity))
      : OwnedBy.get(targetEntity);
    for (uint256 i = 0; i < transportables.length; i++) {
      if (totalRaidedResourceCounts[i] == 0) continue;
      uint256 resourcePortion = LibMath.divideRound(
        (totalRaidedResourceCounts[i] * freeCargoSpace),
        totalFreeCargoSpace
      );
      raidResult.resourcesAtStart[i] = ResourceCount.get(targetEntity, transportables[i]);
      if (resourcePortion > totalRaidedResourceCounts[i]) resourcePortion = totalRaidedResourceCounts[i];
      if (resourcePortion + receivedResources > freeCargoSpace) resourcePortion = freeCargoSpace - receivedResources;
      if (IsFleet.get(targetEntity)) {
        LibFleet.increaseFleetResource(targetEntity, transportables[i], resourcePortion);
      } else {
        LibStorage.increaseStoredResource(targetEntity, transportables[i], resourcePortion);
      }
      RaidedResource.set(
        playerEntity,
        transportables[i],
        RaidedResource.get(playerEntity, transportables[i]) + resourcePortion
      );
      receivedResources += resourcePortion;
      raidResult.resourcesAtEnd[i] = ResourceCount.get(targetEntity, transportables[i]);
    }
    BattleRaidResult.set(battleId, targetEntity, raidResult);
  }
}
