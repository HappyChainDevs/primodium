// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "../PrimodiumTest.t.sol";

import { SendUnitsSystem, ID as SendUnitsSystemID } from "systems/SendUnitsSystem.sol";
import { TrainUnitsSystem, ID as TrainUnitsSystemID } from "systems/TrainUnitsSystem.sol";
import { BuildSystem, ID as BuildSystemID } from "systems/BuildSystem.sol";
import { InvadeSystem, ID as InvadeSystemID } from "systems/InvadeSystem.sol";
import { ReceiveReinforcementSystem, ID as ReceiveReinforcementSystemID } from "systems/ReceiveReinforcementSystem.sol";
import { RecallReinforcementsSystem, ID as RecallReinforcementsSystemID } from "systems/RecallReinforcementsSystem.sol";
import { GameConfigComponent, ID as GameConfigComponentID, SingletonID } from "components/GameConfigComponent.sol";
import { P_UnitTravelSpeedComponent, ID as P_UnitTravelSpeedComponentID } from "components/P_UnitTravelSpeedComponent.sol";
import { PositionComponent, ID as PositionComponentID } from "components/PositionComponent.sol";
import { P_IsUnitComponent, ID as P_IsUnitComponentID } from "components/P_IsUnitComponent.sol";
import { GameConfigComponent, ID as GameConfigComponentID, SingletonID } from "components/GameConfigComponent.sol";
import { OwnedByComponent, ID as OwnedByComponentID } from "components/OwnedByComponent.sol";
import { LibSend } from "libraries/LibSend.sol";
import { LibArrival } from "libraries/LibArrival.sol";
import { LibMotherlode } from "libraries/LibMotherlode.sol";
import { ArrivalsList } from "libraries/ArrivalsList.sol";

contract SendUnitsTest is PrimodiumTest {
  constructor() PrimodiumTest() {}

  P_IsUnitComponent public isUnitComponent;
  GameConfigComponent public gameConfigComponent;
  OwnedByComponent public ownedByComponent;

  SendUnitsSystem public sendUnitsSystem;
  TrainUnitsSystem public trainUnitsSystem;
  BuildSystem public buildSystem;
  InvadeSystem public invadeSystem;
  ReceiveReinforcementSystem public receiveReinforcementSystem;
  RecallReinforcementsSystem public recallReinforcementsSystem;

  function setUp() public override {
    super.setUp();

    sendUnitsSystem = SendUnitsSystem(system(SendUnitsSystemID));
    buildSystem = BuildSystem(system(BuildSystemID));
    trainUnitsSystem = TrainUnitsSystem(system(TrainUnitsSystemID));
    invadeSystem = InvadeSystem(system(InvadeSystemID));
    receiveReinforcementSystem = ReceiveReinforcementSystem(system(ReceiveReinforcementSystemID));
    recallReinforcementsSystem = RecallReinforcementsSystem(system(RecallReinforcementsSystemID));
    isUnitComponent = P_IsUnitComponent(world.getComponent(P_IsUnitComponentID));
    gameConfigComponent = GameConfigComponent(world.getComponent(GameConfigComponentID));
    ownedByComponent = OwnedByComponent(world.getComponent(OwnedByComponentID));
    spawn(alice);
    spawn(bob);
    spawn(deployer);

    gameConfigComponent = GameConfigComponent(world.getComponent(GameConfigComponentID));
    GameConfig memory gameConfig = GameConfig({
      moveSpeed: 100,
      motherlodeDistance: 10,
      maxMotherlodesPerAsteroid: 6,
      motherlodeChanceInv: 6
    });
    vm.prank(deployer);
    gameConfigComponent.set(SingletonID, gameConfig);
    vm.stopPrank();
  }

  function testFailSendUnitsCountZero() public {
    vm.startPrank(alice);
    ArrivalUnit[] memory units = new ArrivalUnit[](1);
    units[0] = ArrivalUnit(DebugUnit, 0);

    vm.expectRevert(bytes("unit count must be positive"));
    sendUnitsSystem.executeTyped(units, ESendType.INVADE, getHomeAsteroid(alice), getHomeAsteroid(bob), bob);
  }

  function testFailSendTooFewUnits() public {
    vm.startPrank(alice);
    ArrivalUnit[] memory units = new ArrivalUnit[](1);
    units[0] = ArrivalUnit(DebugUnit, 10);

    vm.expectRevert(bytes("not enough value to subtract"));
    sendUnitsSystem.executeTyped(units, ESendType.INVADE, getHomeAsteroid(alice), getHomeAsteroid(bob), bob);
  }

  function testFailMustSendFromYourAsteroid() public {
    vm.startPrank(alice);
    ArrivalUnit[] memory units = new ArrivalUnit[](1);
    units[0] = ArrivalUnit(DebugUnit, 10);

    vm.expectRevert(bytes("you can only move from an asteroid you own"));
    sendUnitsSystem.executeTyped(units, ESendType.INVADE, getHomeAsteroid(deployer), getHomeAsteroid(bob), bob);
  }

  function testFailSameRock() public {
    vm.startPrank(alice);
    ArrivalUnit[] memory units = new ArrivalUnit[](1);
    units[0] = ArrivalUnit(DebugUnit, 10);

    vm.expectRevert(bytes("origin and destination cannot be the same"));
    sendUnitsSystem.executeTyped(units, ESendType.INVADE, getHomeAsteroid(alice), getHomeAsteroid(alice), bob);
  }

  function testFailInvadeSameTo() public {
    vm.startPrank(alice);
    ArrivalUnit[] memory units = new ArrivalUnit[](1);
    units[0] = ArrivalUnit(DebugUnit, 10);

    vm.expectRevert(bytes("you cannot invade yourself"));
    sendUnitsSystem.executeTyped(units, ESendType.INVADE, getHomeAsteroid(alice), getHomeAsteroid(bob), alice);
  }

  // todo: check motherlode movement rules

  function setupInvasion(uint256 entity) internal {
    vm.roll(0);
    bytes memory unitProductionBuildingEntity = buildSystem.executeTyped(
      DebugUnitProductionBuilding,
      getIronCoord(alice)
    );
    uint256 unitProductionBuildingEntityID = abi.decode(unitProductionBuildingEntity, (uint256));
    buildSystem.executeTyped(DebugHousingBuilding, getCoord3(alice));

    vm.roll(10);
    trainUnitsSystem.executeTyped(unitProductionBuildingEntityID, entity, 10);
  }

  function testInvade() public {
    invade(alice);
  }

  function reinforce() public returns (Arrival memory) {
    setupInvasion(DebugUnit);
    uint32 attackNumber = 4;
    vm.roll(100);
    uint256[] memory unitTypes = isUnitComponent.getEntities();
    ArrivalUnit[] memory units = new ArrivalUnit[](unitTypes.length);
    for (uint i = 0; i < unitTypes.length; i++) {
      units[i] = ArrivalUnit(unitTypes[i], unitTypes[i] == DebugUnit ? attackNumber : 0);
    }

    bytes memory rawArrival = sendUnitsSystem.executeTyped(
      units,
      ESendType.REINFORCE,
      getHomeAsteroid(alice),
      getHomeAsteroid(bob),
      bob
    );
    Arrival memory arrival = abi.decode(rawArrival, (Arrival));

    uint32 speed = P_UnitTravelSpeedComponent(world.getComponent(P_UnitTravelSpeedComponentID)).getValue(DebugUnit);
    Coord memory originPosition = PositionComponent(world.getComponent(PositionComponentID)).getValue(
      getHomeAsteroid(alice)
    );
    Coord memory destinationPosition = PositionComponent(world.getComponent(PositionComponentID)).getValue(
      getHomeAsteroid(bob)
    );
    uint256 worldSpeed = GameConfigComponent(world.getComponent(GameConfigComponentID)).getValue(SingletonID).moveSpeed;
    uint256 expectedArrivalBlock = block.number +
      ((LibSend.distance(originPosition, destinationPosition) * speed * worldSpeed) / 100 / 100);
    Arrival memory expectedArrival = Arrival({
      sendType: ESendType.INVADE,
      units: units,
      arrivalBlock: expectedArrivalBlock,
      from: addressToEntity(alice),
      to: addressToEntity(bob),
      origin: getHomeAsteroid(alice),
      destination: getHomeAsteroid(bob)
    });
    assertEq(arrival, expectedArrival);

    assertEq(ArrivalsList.length(world, LibEncode.hashKeyEntity(addressToEntity(alice), getHomeAsteroid(bob))), 1);
    return arrival;
  }

  function findAndInitializeMotherlode(address player) public returns (uint256) {
    GameConfig memory config = gameConfigComponent.getValue(SingletonID);

    vm.startPrank(deployer);
    uint256 asteroid = getHomeAsteroid(player);
    Coord memory sourcePosition = PositionComponent(world.getComponent(PositionComponentID)).getValue(asteroid);
    Coord memory targetPositionRelative = LibMotherlode.getCoord(
      0,
      config.motherlodeDistance,
      config.motherlodeChanceInv
    );
    Coord memory targetPosition = Coord(
      sourcePosition.x + targetPositionRelative.x,
      sourcePosition.y + targetPositionRelative.y,
      0
    );
    uint256 motherlodeSeed = uint256(keccak256(abi.encode(asteroid, "motherlode", targetPosition)));
    uint32 i = 0;
    bool found = LibMotherlode.isMotherlode(motherlodeSeed, config.motherlodeChanceInv);
    while (i < 6 && !found) {
      i++;
      targetPositionRelative = LibMotherlode.getCoord(i, config.motherlodeDistance, config.motherlodeChanceInv);
      targetPosition = Coord(
        sourcePosition.x + targetPositionRelative.x,
        sourcePosition.y + targetPositionRelative.y,
        0
      );
      motherlodeSeed = uint256(keccak256(abi.encode(asteroid, "motherlode", targetPosition)));
      found = LibMotherlode.isMotherlode(motherlodeSeed, config.motherlodeChanceInv);
    }
    require(found, "uh oh, no motherlode found");
    LibMotherlode.initMotherlode(world, targetPosition, asteroid);
    vm.stopPrank();
    return (asteroid);
  }

  function invade(address invader) public returns (Arrival memory) {
    uint256 motherlodeEntity = findAndInitializeMotherlode(bob);

    vm.startPrank(deployer);
    ownedByComponent.set(motherlodeEntity, addressToEntity(bob));
    vm.stopPrank();

    vm.startPrank(invader);
    setupInvasion(DebugUnit);
    uint32 attackNumber = 4;
    vm.roll(100);

    uint256[] memory unitTypes = isUnitComponent.getEntities();
    ArrivalUnit[] memory units = new ArrivalUnit[](unitTypes.length);
    for (uint i = 0; i < unitTypes.length; i++) {
      units[i] = ArrivalUnit(unitTypes[i], unitTypes[i] == DebugUnit ? attackNumber : 0);
    }

    bytes memory rawArrival = sendUnitsSystem.executeTyped(
      units,
      ESendType.INVADE,
      getHomeAsteroid(alice),
      motherlodeEntity,
      bob
    );

    Arrival memory arrival = abi.decode(rawArrival, (Arrival));

    uint256 speed = P_UnitTravelSpeedComponent(world.getComponent(P_UnitTravelSpeedComponentID)).getValue(DebugUnit) *
      GameConfigComponent(world.getComponent(GameConfigComponentID)).getValue(SingletonID).moveSpeed;
    Coord memory originPosition = PositionComponent(world.getComponent(PositionComponentID)).getValue(
      getHomeAsteroid(alice)
    );
    Coord memory destinationPosition = PositionComponent(world.getComponent(PositionComponentID)).getValue(
      motherlodeEntity
    );
    uint256 expectedArrivalBlock = block.number +
      ((LibSend.distance(originPosition, destinationPosition) * speed) / 100 / 100);
    Arrival memory expectedArrival = Arrival({
      sendType: ESendType.INVADE,
      units: units,
      arrivalBlock: expectedArrivalBlock,
      from: addressToEntity(alice),
      to: addressToEntity(bob),
      origin: getHomeAsteroid(alice),
      destination: motherlodeEntity
    });
    assertEq(arrival, expectedArrival);

    assertEq(ArrivalsList.length(world, LibEncode.hashKeyEntity(addressToEntity(alice), motherlodeEntity)), 1);
    vm.stopPrank();
    return arrival;
  }

  function raid(address raider) public returns (Arrival memory) {
    vm.startPrank(raider);
    setupInvasion(DebugUnit);
    uint32 attackNumber = 4;
    vm.roll(100);

    uint256[] memory unitTypes = isUnitComponent.getEntities();
    ArrivalUnit[] memory units = new ArrivalUnit[](unitTypes.length);
    for (uint i = 0; i < unitTypes.length; i++) {
      units[i] = ArrivalUnit(unitTypes[i], unitTypes[i] == DebugUnit ? attackNumber : 0);
    }

    bytes memory rawArrival = sendUnitsSystem.executeTyped(
      units,
      ESendType.RAID,
      getHomeAsteroid(alice),
      getHomeAsteroid(bob),
      bob
    );
    Arrival memory arrival = abi.decode(rawArrival, (Arrival));

    uint32 speed = P_UnitTravelSpeedComponent(world.getComponent(P_UnitTravelSpeedComponentID)).getValue(DebugUnit);
    Coord memory originPosition = PositionComponent(world.getComponent(PositionComponentID)).getValue(
      getHomeAsteroid(alice)
    );
    Coord memory destinationPosition = PositionComponent(world.getComponent(PositionComponentID)).getValue(
      getHomeAsteroid(bob)
    );

    uint256 worldSpeed = GameConfigComponent(world.getComponent(GameConfigComponentID)).getValue(SingletonID).moveSpeed;
    uint256 expectedArrivalBlock = block.number +
      ((LibSend.distance(originPosition, destinationPosition) * speed * worldSpeed) / 100 / 100);
    Arrival memory expectedArrival = Arrival({
      sendType: ESendType.RAID,
      units: units,
      arrivalBlock: expectedArrivalBlock,
      from: addressToEntity(alice),
      to: addressToEntity(bob),
      origin: getHomeAsteroid(alice),
      destination: getHomeAsteroid(bob)
    });
    assertEq(arrival, expectedArrival);

    assertEq(ArrivalsList.length(world, LibEncode.hashKeyEntity(addressToEntity(alice), getHomeAsteroid(bob))), 1);
    vm.stopPrank();
    return arrival;
  }

  // Arrival resolution

  function testArrivalTooSoon() public {
    Arrival memory arrival = raid(alice);
    vm.roll(arrival.arrivalBlock - 1);
    vm.startPrank(deployer);
    LibArrival.applyArrivals(world, addressToEntity(alice), getHomeAsteroid(bob));
    assertEq(ArrivalsList.length(world, LibEncode.hashKeyEntity(addressToEntity(alice), getHomeAsteroid(bob))), 1);
  }

  function testArrivalExecuted() public {
    Arrival memory arrival = raid(alice);
    vm.roll(arrival.arrivalBlock);
    vm.startPrank(deployer);
    LibArrival.applyArrivals(world, addressToEntity(alice), getHomeAsteroid(bob));
    assertEq(ArrivalsList.length(world, LibEncode.hashKeyEntity(addressToEntity(alice), getHomeAsteroid(bob))), 0);
  }

  // testTwoArrivals
  function testOneArrivedOneDidntYet() public {
    Arrival memory arrival = raid(alice);
    vm.roll(block.number + 10);
    ArrivalUnit[] memory units = new ArrivalUnit[](1);
    units[0] = ArrivalUnit(DebugUnit, 5);

    vm.startPrank(alice);
    sendUnitsSystem.executeTyped(units, ESendType.RAID, getHomeAsteroid(alice), getHomeAsteroid(bob), bob);
    vm.roll(arrival.arrivalBlock);
    vm.stopPrank();
    vm.startPrank(deployer);
    LibArrival.applyArrivals(world, addressToEntity(alice), arrival.destination);

    assertEq(ArrivalsList.length(world, LibEncode.hashKeyEntity(addressToEntity(alice), getHomeAsteroid(bob))), 1);
  }

  function testArrivalSnuckInBehind() public {
    vm.startPrank(alice);
    setupInvasion(DebugUnit);

    uint256 unitProductionBuildingEntityID = LibEncode.hashKeyCoord(BuildingKey, getIronCoord(alice));
    trainUnitsSystem.executeTyped(unitProductionBuildingEntityID, DebugUnit3, 10);
    vm.roll(block.number + 1000);
    ArrivalUnit[] memory units = new ArrivalUnit[](1);
    units[0] = ArrivalUnit(DebugUnit, 1);

    Arrival memory slowArrival = abi.decode(
      sendUnitsSystem.executeTyped(units, ESendType.INVADE, getHomeAsteroid(alice), getHomeAsteroid(bob), bob),
      (Arrival)
    );
    units = new ArrivalUnit[](1);
    units[0] = ArrivalUnit(DebugUnit3, 1);

    Arrival memory arrival2 = abi.decode(
      sendUnitsSystem.executeTyped(units, ESendType.INVADE, getHomeAsteroid(alice), getHomeAsteroid(bob), bob),
      (Arrival)
    );
    vm.roll(arrival2.arrivalBlock);
    vm.stopPrank();
    vm.startPrank(deployer);
    LibArrival.applyArrivals(world, addressToEntity(alice), arrival2.destination);
    assertEq(ArrivalsList.length(world, LibEncode.hashKeyEntity(addressToEntity(alice), getHomeAsteroid(bob))), 1);
    assertEq(
      ArrivalsList.get(world, LibEncode.hashKeyEntity(addressToEntity(alice), getHomeAsteroid(bob)), 0),
      slowArrival
    );
  }

  function testExecuteInvade() public {
    Arrival memory invasionArrival = invade(alice);
    vm.roll(invasionArrival.arrivalBlock);
    vm.prank(alice);
    invadeSystem.executeTyped(invasionArrival.destination);
    assertEq(ArrivalsList.length(world, LibEncode.hashKeyEntity(addressToEntity(alice), getHomeAsteroid(bob))), 0);

    vm.stopPrank();
  }
}
