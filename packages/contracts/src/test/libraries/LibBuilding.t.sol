// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "../PrimodiumTest.t.sol";
import { SingletonID } from "solecs/SingletonID.sol";

import { ComponentDevSystem, ID as ComponentDevSystemID } from "../../systems/ComponentDevSystem.sol";
import { DimensionsComponent, ID as DimensionsComponentID } from "components/DimensionsComponent.sol";
import { LevelComponent, ID as LevelComponentID } from "components/LevelComponent.sol";

import "../../prototypes.sol";

import { LibBuilding } from "../../libraries/LibBuilding.sol";

import { Dimensions, Bounds } from "../../types.sol";

contract LibBuildingTest is PrimodiumTest {
  constructor() PrimodiumTest() {}

  ComponentDevSystem internal componentDevSystem;

  function setUp() public override {
    super.setUp();
    componentDevSystem = ComponentDevSystem(system(ComponentDevSystemID));
  }

  function testGetPlayerBounds(int32 maxX, int32 maxY, int32 currX, int32 currY) public {
    // Bound fuzzy parameters to eliminate overflow errors when testing
    // Modulus operator on currX and currY before vm.assume results in a "rejected too many inputs" error
    vm.assume(currX > 0);
    vm.assume(currY > 0);
    vm.assume(maxX >= currX);
    vm.assume(maxY >= currY);

    maxX = maxX % 10000;
    maxY = maxY % 10000;
    currX = currX % 10000;
    currY = currY % 10000;

    spawn(alice);
    vm.startPrank(alice);

    Dimensions memory max = Dimensions(10, 10);
    componentDevSystem.executeTyped(DimensionsComponentID, SingletonID, abi.encode(max));

    uint256 playerEntity = addressToEntity(alice);
    uint32 playerLevel = LevelComponent(getAddressById(world.components(), LevelComponentID)).getValue(playerEntity);
    uint256 researchLevelEntity = LibEncode.hashKeyEntity(ExpansionKey, playerLevel);

    Dimensions memory curr = Dimensions(5, 5);
    componentDevSystem.executeTyped(DimensionsComponentID, researchLevelEntity, abi.encode(curr));
    Bounds memory bounds = LibBuilding.getPlayerBounds(world, playerEntity);
    console.log("maxX", uint32(bounds.maxX));
    console.log("maxY", uint32(bounds.maxY));
    console.log("minX", uint32(bounds.minX));
    console.log("minY", uint32(bounds.minY));

    assertEq(bounds.minX, (max.x - curr.x) / 2);
    assertEq(bounds.maxX, (max.x + curr.x) / 2 - 1);
    assertEq(bounds.minY, (max.y - curr.y) / 2);
    assertEq(bounds.maxY, (max.y + curr.y) / 2 - 1);

    // Check that the bound size matches with the current player dimensions
    assertEq(curr.x, bounds.maxX - bounds.minX + 1);
    assertEq(curr.y, bounds.maxY - bounds.minY + 1);
  }

  function testGetActualBounds() public {
    spawn(alice);
    vm.startPrank(alice);

    uint256 playerEntity = addressToEntity(alice);

    Bounds memory bounds = LibBuilding.getPlayerBounds(world, playerEntity);
    console.log("maxX", uint32(bounds.maxX));
    console.log("maxY", uint32(bounds.maxY));
    console.log("minX", uint32(bounds.minX));
    console.log("minY", uint32(bounds.minY));
  }
}
