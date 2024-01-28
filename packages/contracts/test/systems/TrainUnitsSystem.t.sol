// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import "test/PrimodiumTest.t.sol";

contract TrainUnitsSystemTest is PrimodiumTest {
  bytes32 rock = bytes32("rock");
  bytes32 player;

  EUnit unit = EUnit(1);
  bytes32 unitPrototype = "unitPrototype";

  bytes32 building = "building";
  bytes32 buildingPrototype = "buildingPrototype";

  uint256 COLONY_SHIP_BASE_COST;
  EResource COLONY_SHIP_COST_RESOURCE;

  function setUp() public override {
    super.setUp();
    COLONY_SHIP_BASE_COST = P_ColonyShipConfig.getResourceAmount();
    COLONY_SHIP_COST_RESOURCE = EResource(P_ColonyShipConfig.getResourceType());
    vm.startPrank(creator);
    player = addressToEntity(creator);
    BuildingType.set(building, buildingPrototype);
    IsActive.set(building, true);
    P_EnumToPrototype.set(UnitKey, uint8(unit), unitPrototype);
    P_GameConfigData memory config = P_GameConfig.get();
    config.unitProductionRate = 100;
    P_GameConfig.set(config);
    Asteroid.setIsAsteroid(rock, true);
    Home.set(player, rock);
    OwnedBy.set(building, rock);
    Spawned.set(player, true);
  }

  // copied from LibUnit.t.sol
  function setupClaimUnits() public {
    Level.set(building, 1);
    LastClaimedAt.set(building, block.timestamp - 100);
    P_UnitProdMultiplier.set(buildingPrototype, 1, 100);
    P_Unit.setTrainingTime(unitPrototype, 0, 1);

    QueueItemUnitsData memory item = QueueItemUnitsData(unitPrototype, 100);
    UnitProductionQueue.enqueue(building, item);
    UnitFactorySet.add(rock, building);
  }

  function testCannotProduceUnit() public {
    vm.expectRevert(bytes("[TrainUnitsSystem] Building cannot produce unit"));
    world.trainUnits(building, unit, 1);
  }

  function testTrainUnits() public {
    bytes32[] memory unitPrototypes = new bytes32[](1);
    unitPrototypes[0] = unitPrototype;
    P_UnitProdTypes.set(buildingPrototype, 0, unitPrototypes);

    world.trainUnits(building, unit, 1);
    QueueItemUnitsData memory data = UnitProductionQueue.peek(building);
    assertEq(toString(data.unitId), toString(unitPrototype));
    assertEq(data.quantity, 1);
  }

  function testTrainUnitsNotEnoughResources() public {
    uint8[] memory p_requiredresources_resources_level_0 = new uint8[](1);
    p_requiredresources_resources_level_0[0] = uint8(Iron);
    uint256[] memory p_requiredresources_amounts_level_0 = new uint256[](1);
    p_requiredresources_amounts_level_0[0] = 100;

    P_RequiredResources.set(
      unitPrototype,
      0,
      P_RequiredResourcesData(p_requiredresources_resources_level_0, p_requiredresources_amounts_level_0)
    );
    bytes32[] memory unitPrototypes = new bytes32[](1);
    unitPrototypes[0] = unitPrototype;
    P_UnitProdTypes.set(buildingPrototype, 0, unitPrototypes);

    vm.expectRevert(bytes("[SpendResources] Not enough resources to spend"));
    world.trainUnits(building, unit, 1);
  }

  function testTrainUnitsUpdateAsteroid() public {
    bytes32[] memory unitPrototypes = new bytes32[](1);
    unitPrototypes[0] = unitPrototype;
    P_UnitProdTypes.set(buildingPrototype, 1, unitPrototypes);

    Asteroid.setIsAsteroid(rock, true);

    setupClaimUnits();
    Home.set(player, rock);
    OwnedBy.set(rock, player);
    MaxResourceCount.set(rock, Iron, 1000);
    ProductionRate.set(rock, Iron, 10);
    LastClaimedAt.set(rock, block.timestamp - 10);

    world.trainUnits(building, unit, 1);
    LibUnit.claimUnits(rock);
    assertEq(ResourceCount.get(rock, Iron), 100, "resource count does not match");
    assertEq(UnitCount.get(rock, unitPrototype), 100, "unit count does not match");
  }

  function testTrainColonyShip() public {
    vm.startPrank(alice);
    bytes32 aliceHomeSpaceRock = world.spawn();
    vm.stopPrank();

    uint256 amount = COLONY_SHIP_BASE_COST * 2;
    assertEq(
      amount,
      COLONY_SHIP_BASE_COST * LibUnit.getNextColonyShipResourceCostMultiplier(aliceHomeSpaceRock),
      "next colony ship cost does not match expectation"
    );
    EResource resource = COLONY_SHIP_COST_RESOURCE;
    increaseResource(aliceHomeSpaceRock, resource, amount);
    assertEq(ResourceCount.get(aliceHomeSpaceRock, uint8(resource)), amount, "resource count does not match");
    trainUnits(alice, EUnit.ColonyShip, 1, true);
    assertEq(ResourceCount.get(aliceHomeSpaceRock, uint8(resource)), 0, "resource count does not match");
  }

  function testFailTrainColonyShipNoSpecialResource() public {
    vm.startPrank(alice);
    bytes32 aliceHomeSpaceRock = world.spawn();
    vm.stopPrank();

    trainUnits(alice, EUnit.ColonyShip, 1, true);
  }

  function testTrainColonyShipsCostIncrease() public {
    vm.startPrank(alice);
    bytes32 aliceHomeSpaceRock = world.spawn();
    vm.stopPrank();

    uint256 amount = COLONY_SHIP_BASE_COST * 2;
    EResource resource = COLONY_SHIP_COST_RESOURCE;
    increaseResource(aliceHomeSpaceRock, resource, amount);
    trainUnits(alice, EUnit.ColonyShip, 1, true);

    amount *= 2;
    increaseResource(aliceHomeSpaceRock, resource, amount);
    assertEq(
      amount,
      COLONY_SHIP_BASE_COST * LibUnit.getNextColonyShipResourceCostMultiplier(aliceHomeSpaceRock),
      "next colony ship cost does not match expectation"
    );
    trainUnits(alice, EUnit.ColonyShip, 1, true);

    amount *= 2;
    increaseResource(aliceHomeSpaceRock, resource, amount);
    trainUnits(alice, EUnit.ColonyShip, 1, true);
  }

  function testFailTrainColonyShipsNoCostIncrease() public {
    vm.startPrank(alice);
    bytes32 aliceHomeSpaceRock = world.spawn();
    vm.stopPrank();

    uint256 amount = COLONY_SHIP_BASE_COST * 2;
    EResource resource = COLONY_SHIP_COST_RESOURCE;
    increaseResource(aliceHomeSpaceRock, resource, amount);
    assertEq(
      amount,
      COLONY_SHIP_BASE_COST * LibUnit.getNextColonyShipResourceCostMultiplier(aliceHomeSpaceRock),
      "next colony ship cost does not match expectation"
    );
    trainUnits(alice, EUnit.ColonyShip, 2, true);

    increaseResource(aliceHomeSpaceRock, resource, amount);
    assertEq(
      amount,
      COLONY_SHIP_BASE_COST * LibUnit.getNextColonyShipResourceCostMultiplier(aliceHomeSpaceRock),
      "next colony ship cost does not match expectation"
    );
    trainUnits(alice, EUnit.ColonyShip, 1, true);
  }

  function testInvalidBuilding() public {
    vm.expectRevert(bytes("[TrainUnitsSystem] Can not train units using an in active building"));
    world.trainUnits(bytes32(0), unit, 1);
  }

  function testInvalidUnit() public {
    vm.expectRevert();
    world.trainUnits(building, EUnit(uint8(100)), 1);
  }
}
