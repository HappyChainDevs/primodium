// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { PrimodiumSystem } from "systems/internal/PrimodiumSystem.sol";
import { PositionData, Level } from "codegen/index.sol";
import { LibBuilding } from "codegen/Libraries.sol";

contract UpgradeBuildingSystem is PrimodiumSystem {
  /// @notice Upgrades the building at the specified coordinate
  /// @param coord Coordinate of the building to be upgraded
  /// @return buildingEntity Entity identifier of the upgraded building
  function upgradeBuilding(PositionData memory coord)
    public
    claimResources(coord.parent)
    returns (bytes32 buildingEntity)
  {
    // Check there isn't another tile there
    buildingEntity = LibBuilding.getBuildingFromCoord(coord);

    LibBuilding.checkUpgradeRequirements(buildingEntity, buildingEntity);

    uint256 targetLevel = Level.get(buildingEntity) + 1;
    Level.set(buildingEntity, targetLevel);
  }
}
