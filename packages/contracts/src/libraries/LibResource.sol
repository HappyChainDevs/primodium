// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { EBuilding, EResource } from "src/Types.sol";
import { LibMath } from "libraries/LibMath.sol";
import { LibStorage } from "libraries/LibStorage.sol";
import { UtilityMap } from "libraries/UtilityMap.sol";
import { P_IsUtility, P_RequiredResources, P_GameConfig, P_RequiredResourcesData, P_RequiredUpgradeResources, P_RequiredUpgradeResourcesData, P_EnumToPrototype, ResourceCount, MaxResourceCount, UnitLevel, LastClaimedAt, ProductionRate, BuildingType, OwnedBy } from "codegen/index.sol";
import { BuildingKey } from "src/Keys.sol";
import { WORLD_SPEED_SCALE } from "src/constants.sol";

library LibResource {
  /**
   * @dev Retrieves the available count of a specific resource for a player.
   * @param playerEntity The identifier of the player.
   * @param resource The type of resource to check.
   * @return availableCount The available count of the specified resource.
   */
  function getResourceCountAvailable(bytes32 playerEntity, uint8 resource) internal view returns (uint256) {
    uint256 max = MaxResourceCount.get(playerEntity, resource);
    uint256 curr = ResourceCount.get(playerEntity, resource);
    if (curr > max) return 0;
    return max - curr;
  }

  /// @notice Spends required resources of an entity, when creating/upgrading a building
  /// @notice claims all resources beforehand
  /// @param entity Entity ID of the building
  /// @param level Target level for the building
  function spendBuildingRequiredResources(bytes32 entity, uint256 level) internal {
    bytes32 playerEntity = OwnedBy.get(entity);
    bytes32 buildingPrototype = BuildingType.get(entity);
    P_RequiredResourcesData memory requiredResources = P_RequiredResources.get(buildingPrototype, level);

    for (uint256 i = 0; i < requiredResources.resources.length; i++) {
      spendResource(playerEntity, entity, requiredResources.resources[i], requiredResources.amounts[i]);
    }
  }

  /// @notice Spends required resources of a unit, when adding to training queue
  /// @notice claims all resources beforehand
  /// @param playerEntity Entity ID of the player
  /// @param prototype Unit Prototype
  /// @param count Quantity of units to be trained
  function spendUnitRequiredResources(
    bytes32 playerEntity,
    bytes32 prototype,
    uint256 count
  ) internal {
    uint256 level = UnitLevel.get(playerEntity, prototype);
    P_RequiredResourcesData memory requiredResources = P_RequiredResources.get(prototype, level);
    for (uint256 i = 0; i < requiredResources.resources.length; i++) {
      spendResource(playerEntity, prototype, requiredResources.resources[i], requiredResources.amounts[i] * count);
    }
  }

  /// @notice Spends resources required to upgrade a unit
  /// @notice claims all resources beforehand
  /// @param playerEntity ID of the player upgrading
  /// @param unitPrototype Prototype ID of the unit to upgrade
  /// @param level Target level for the building
  function spendUpgradeResources(
    bytes32 playerEntity,
    bytes32 unitPrototype,
    uint256 level
  ) internal {
    P_RequiredUpgradeResourcesData memory requiredResources = P_RequiredUpgradeResources.get(unitPrototype, level);
    for (uint256 i = 0; i < requiredResources.resources.length; i++) {
      spendResource(playerEntity, unitPrototype, requiredResources.resources[i], requiredResources.amounts[i]);
    }
  }

  /**
   * @dev Spends a specified amount of a resource by a player entity.
   * @param playerEntity The identifier of the player entity.
   * @param entity The identifier of the entity from which resources are spent.
   * @param resource The type of the resource to be spent.
   * @param resourceCost The amount of the resource to be spent.
   * @notice Ensures that the player has enough of the specified resource and updates resource counts accordingly.
   */
  function spendResource(
    bytes32 playerEntity,
    bytes32 entity,
    uint8 resource,
    uint256 resourceCost
  ) internal {
    // Check if the player has enough resources.
    uint256 playerResourceCount = ResourceCount.get(playerEntity, resource);
    require(resourceCost <= playerResourceCount, "[SpendResources] Not enough resources to spend");

    // If the spent resource is a utility, add its cost to the total utility usage of the entity.
    if (P_IsUtility.get(resource)) {
      uint256 prevUtilityUsage = UtilityMap.get(entity, resource);
      // add to the total building utility usage
      UtilityMap.set(entity, resource, prevUtilityUsage + resourceCost);
    }

    // Spend resources. This will decrease the available resources for the player.
    LibStorage.decreaseStoredResource(playerEntity, resource, resourceCost);
  }

  /// @notice Claims all unclaimed resources of a player
  /// @param playerEntity ID of the player to claim
  function claimAllResources(bytes32 playerEntity) internal {
    uint256 lastClaimed = LastClaimedAt.get(playerEntity);
    if (lastClaimed == block.timestamp) return;

    if (lastClaimed == 0) {
      LastClaimedAt.set(playerEntity, block.timestamp);
      return;
    }

    uint256 timeSinceClaimed = block.timestamp - lastClaimed;
    timeSinceClaimed = (timeSinceClaimed * P_GameConfig.getWorldSpeed()) / WORLD_SPEED_SCALE;

    LastClaimedAt.set(playerEntity, block.timestamp);
    for (uint8 i = 1; i < uint8(EResource.LENGTH); i++) {
      uint8 resource = i;
      // you can't claim utilities
      if (P_IsUtility.get(resource)) continue;

      // you have no production rate
      uint256 productionRate = ProductionRate.get(playerEntity, resource);
      if (productionRate == 0) continue;

      // add resource to storage
      uint256 increase = productionRate * timeSinceClaimed;
      LibStorage.increaseStoredResource(playerEntity, resource, increase);
    }
  }

  /// @notice Clears utility usage of a building when it is destroyed
  /// @param playerEntity ID of the owner of the building
  /// @param buildingEntity ID of the building to clear
  function clearUtilityUsage(bytes32 playerEntity, bytes32 buildingEntity) internal {
    uint8[] memory utilities = UtilityMap.keys(buildingEntity);
    for (uint256 i = 0; i < utilities.length; i++) {
      uint8 utility = utilities[i];
      uint256 utilityUsage = UtilityMap.get(buildingEntity, utility);
      UtilityMap.remove(buildingEntity, utility);
      LibStorage.increaseStoredResource(playerEntity, utility, utilityUsage);
    }
  }

  /**
   * @dev Retrieves the counts of all non-utility resources for a player and calculates the total.
   * @param playerEntity The identifier of the player.
   * @return totalResources The total count of non-utility resources.
   * @return resourceCounts An array containing the counts of each non-utility resource.
   */
  function getAllResourceCounts(bytes32 playerEntity)
    internal
    view
    returns (uint256 totalResources, uint256[] memory resourceCounts)
  {
    resourceCounts = new uint256[](uint8(EResource.LENGTH));
    for (uint8 i = 1; i < resourceCounts.length; i++) {
      if (P_IsUtility.get(i)) continue;
      resourceCounts[i] = ResourceCount.get(playerEntity, i);
      totalResources += resourceCounts[i];
    }
  }
}
