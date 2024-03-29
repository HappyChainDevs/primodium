// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { console, PrimodiumTest } from "test/PrimodiumTest.t.sol";
import { addressToEntity } from "src/utils.sol";
import { EScoreType } from "src/Types.sol";
import { PositionData, Asteroid, AsteroidData, P_ConquestConfig, Score, LastConquered, Home } from "codegen/index.sol";
import { LibAsteroid } from "libraries/LibAsteroid.sol";

contract ConquestSystemTest is PrimodiumTest {
  bytes32 playerEntity;
  function setUp() public override {
    super.setUp();
    spawn(creator);
    playerEntity = addressToEntity(creator);
  }

  function testConquerAsteroid() public {
    vm.startPrank(creator);
    PositionData memory position = findSecondaryAsteroid(Home.get(playerEntity));

    bytes32 asteroidEntity = LibAsteroid.createSecondaryAsteroid(position);
    AsteroidData memory asteroidData = Asteroid.get(asteroidEntity);

    conquerAsteroid(creator, Home.get(playerEntity), asteroidEntity);
    uint256 conquerTime = block.timestamp + P_ConquestConfig.get();
    vm.warp(conquerTime);

    vm.startPrank(creator);

    world.Primodium__claimConquestPoints(asteroidEntity);
    assertEq(Score.get(playerEntity, uint8(EScoreType.Conquest)), asteroidData.conquestPoints);
    assertEq(LastConquered.get(asteroidEntity), block.timestamp + P_ConquestConfig.get());
  }

  function testConquerAsteroidFailNotOwner() public {
    vm.startPrank(creator);
    PositionData memory position = findSecondaryAsteroid(Home.get(playerEntity));

    bytes32 asteroidEntity = LibAsteroid.createSecondaryAsteroid(position);
    AsteroidData memory asteroidData = Asteroid.get(asteroidEntity);

    conquerAsteroid(creator, Home.get(playerEntity), asteroidEntity);
    uint256 conquerTime = block.timestamp + P_ConquestConfig.get();
    vm.warp(conquerTime);

    vm.startPrank(alice);

    vm.expectRevert("[Conquest] Only owner can claim conquest points");
    world.Primodium__claimConquestPoints(asteroidEntity);
  }

  function testConquerAsteroidFailNotLongEnough() public {
    vm.startPrank(creator);
    PositionData memory position = findSecondaryAsteroid(Home.get(playerEntity));

    bytes32 asteroidEntity = LibAsteroid.createSecondaryAsteroid(position);
    AsteroidData memory asteroidData = Asteroid.get(asteroidEntity);

    conquerAsteroid(creator, Home.get(playerEntity), asteroidEntity);
    uint256 conquerTime = block.timestamp + P_ConquestConfig.get();
    vm.warp(conquerTime - 1);

    vm.startPrank(creator);
    Asteroid.setConquestPoints(asteroidEntity, 0);

    vm.expectRevert("[Conquest] No conquest points to claim");
    world.Primodium__claimConquestPoints(asteroidEntity);
  }
}
