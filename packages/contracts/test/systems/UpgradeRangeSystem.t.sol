// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { console, PrimodiumTest } from "test/PrimodiumTest.t.sol";
import { addressToEntity } from "src/utils.sol";

import { EBuilding } from "src/Types.sol";

import { UnitKey, ExpansionKey } from "src/Keys.sol";

import { Home, Position, PositionData, Level, P_RequiredBaseLevel, P_RequiredUpgradeResources, Asteroid } from "codegen/index.sol";

import { Bounds } from "src/Types.sol";

import { LibBuilding } from "libraries/LibBuilding.sol";

contract UpgradeRangeSystemTest is PrimodiumTest {
  function setUp() public override {
    super.setUp();
    spawn(creator);
    vm.startPrank(creator);
  }

  function testOutOfBounds() public {
    bytes32 creatorEntity = addressToEntity(creator);
    bytes32 asteroidEntity = Home.get(creatorEntity);

    Bounds memory bounds = LibBuilding.getAsteroidBounds(asteroidEntity);

    removeRequirements(EBuilding.IronMine);

    vm.expectRevert(bytes("[BuildSystem] Building out of bounds"));
    world.Pri_11__build(EBuilding.IronMine, PositionData(bounds.maxX + 1, bounds.maxY, asteroidEntity));
  }

  function testFailUpgradeRangeWrongBaseLevel() public {
    bytes32 creatorEntity = addressToEntity(creator);
    Level.set(Home.get(creatorEntity), 5);

    assertTrue(P_RequiredBaseLevel.get(ExpansionKey, 5) != 0, "should have expansion level 5");
    P_RequiredUpgradeResources.deleteRecord(ExpansionKey, 5);
    //vm.expectRevert(bytes("[UpgradeRangeSystem] MainBase level requirement not met"));
    world.Pri_11__upgradeRange(Home.get(creatorEntity));
  }

  function testFailUpgradeRangeMaxLevel() public {
    bytes32 creatorEntity = addressToEntity(creator);
    bytes32 home = Home.get(creatorEntity);
    // set player level to max level

    uint256 maxLevel = Asteroid.getMaxLevel(home);

    Level.set(Home.get(creatorEntity), maxLevel);
    assertEq(Level.get(Home.get(creatorEntity)), maxLevel);
    P_RequiredUpgradeResources.deleteRecord(ExpansionKey, maxLevel);
    //vm.expectRevert(bytes("[UpgradeRangeSystem] Max level reached"));
    world.Pri_11__upgradeRange(Home.get(creatorEntity));
  }

  function testUpgradeRange() public {
    bytes32 creatorEntity = addressToEntity(creator);
    bytes32 asteroidEntity = Home.get(creatorEntity);
    uint256 level = Level.get(asteroidEntity);

    // increment creator's main base level by 1
    bytes32 mainBase = Home.get(asteroidEntity);

    Level.set(mainBase, level + 1);
    P_RequiredUpgradeResources.deleteRecord(ExpansionKey, level + 1);

    world.Pri_11__upgradeRange(asteroidEntity);
    assertEq(Level.get(asteroidEntity), level + 1);
  }
}
