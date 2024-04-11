// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { PrimodiumSystem } from "systems/internal/PrimodiumSystem.sol";
import { MainBasePrototypeId } from "codegen/Prototypes.sol";
import { Position, PositionData, Home } from "codegen/index.sol";
import { LibAsteroid } from "libraries/LibAsteroid.sol";
import { LibBuilding } from "libraries/LibBuilding.sol";
import { IWorld } from "codegen/world/IWorld.sol";

contract S_InitAsteroidOwnerSystem is PrimodiumSystem {
  function initAsteroidOwner(bytes32 asteroidEntity, bytes32 playerEntity) public _claimResources(asteroidEntity) {
    LibAsteroid.initAsteroidOwner(asteroidEntity, playerEntity);

    // Create main base, mirroring the BuildSystem logic
    PositionData memory position = Position.get(MainBasePrototypeId);
    position.parentEntity = asteroidEntity;
    // For cases of abandoned asteroids, skip building main base
    if (Home.get(position.parentEntity) != bytes32(0)) return;

    bytes32 buildingEntity = LibBuilding.build(playerEntity, MainBasePrototypeId, position);
    IWorld world = IWorld(_world());
    world.Primodium__increaseMaxStorage(buildingEntity, 1);
    world.Primodium__upgradeProductionRate(buildingEntity, 1);
    world.Primodium__spendBuildingRequiredResources(buildingEntity, 1);
  }
}
