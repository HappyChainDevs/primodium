// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

// external
import { PrimodiumSystem } from "systems/internal/PrimodiumSystem.sol";

// tables
import { P_EnumToPrototype, PositionData } from "codegen/index.sol";

// libraries
import { LibBuilding } from "libraries/LibBuilding.sol";
import { IWorld } from "codegen/world/IWorld.sol";

// types
import { BuildingKey } from "src/Keys.sol";
import { EBuilding } from "src/Types.sol";

contract BuildSystem is PrimodiumSystem {
  function build(
    EBuilding buildingType,
    PositionData memory coord
  ) public _claimResources(coord.parentEntity) returns (bytes32 buildingEntity) {
    require(buildingType > EBuilding.NULL && buildingType < EBuilding.LENGTH, "[BuildSystem] Invalid building type");

    bytes32 buildingPrototype = P_EnumToPrototype.get(BuildingKey, uint8(buildingType));
    buildingEntity = LibBuilding.build(_player(), buildingPrototype, coord, false);

    IWorld world = IWorld(_world());
    world.Pri_11__increaseMaxStorage(buildingEntity, 1);
    world.Pri_11__upgradeProductionRate(buildingEntity, 1);
    world.Pri_11__spendBuildingRequiredResources(buildingEntity, 1);
  }
}
