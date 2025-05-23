// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { console, PrimodiumTest } from "test/PrimodiumTest.t.sol";
import { addressToEntity } from "src/utils.sol";

import { EBuilding, EResource, EUnit } from "src/Types.sol";
import { BuildingKey, ExpansionKey, UnitKey } from "src/Keys.sol";
import { IronMinePrototypeId, MinutemanMarinePrototypeId } from "codegen/Prototypes.sol";

import { Dimensions, P_RequiredResourcesData, OwnedBy, BuildingType, P_ByLevelMaxResourceUpgrades, P_RequiredBaseLevel, P_EnumToPrototype, PositionData, TilePositions, Level, Home, ProductionRate, ConsumptionRate, P_RequiredDependencyData, P_Production, P_ProductionData, P_RequiredDependency, P_ListMaxResourceUpgrades, MaxResourceCount, ResourceCount, P_HasStarmapper, P_Transportables, P_UnitPrototypes } from "codegen/index.sol";

import { LibAsteroid } from "libraries/LibAsteroid.sol";
import { LibBuilding } from "libraries/LibBuilding.sol";
import { LibUnit } from "libraries/LibUnit.sol";

contract DestroySystemTest is PrimodiumTest {
  bytes32 public playerEntity;
  bytes32 public asteroidEntity;
  PositionData public position;
  int32[] public blueprint = get2x2Blueprint();

  function setUp() public override {
    super.setUp();

    spawn(creator);
    playerEntity = addressToEntity(creator);
    asteroidEntity = Home.get(playerEntity);
    position = getTilePosition(asteroidEntity, EBuilding.Market);
    vm.startPrank(creator);
  }

  function buildIronMine() private returns (bytes32) {
    removeRequirements(EBuilding.IronMine);
    return world.Pri_11__build(EBuilding.IronMine, position);
  }

  function testShipyardDestroy() public {
    EBuilding building = EBuilding.Shipyard;
    Dimensions.set(ExpansionKey, 1, 35, 27);
    P_RequiredResourcesData memory requiredResources = getBuildCost(building);
    provideResources(Home.get(playerEntity), requiredResources);
    vm.startPrank(creator);
    P_RequiredBaseLevel.set(P_EnumToPrototype.get(BuildingKey, uint8(EBuilding.Shipyard)), 1, 0);

    PositionData memory originalPosition = getTilePosition(Home.get(playerEntity), building);
    bytes32 buildingEntity = world.Pri_11__build(building, originalPosition);

    uint256 gas = gasleft();
    world.Pri_11__destroy(buildingEntity);
    console.log("after", gas - gasleft());
  }

  function destroy(bytes32 buildingEntity) public {
    int32[] memory tilePositions = TilePositions.get(buildingEntity);
    world.Pri_11__destroy(buildingEntity);

    assertEq(TilePositions.get(buildingEntity).length, 0);
    for (uint256 i = 0; i < tilePositions.length; i += 2) {
      int32[] memory currPosition = new int32[](2);
      currPosition[0] = tilePositions[i];
      currPosition[1] = tilePositions[i + 1];
      assertTrue(LibAsteroid.allTilesAvailable(Home.get(playerEntity), currPosition));
    }

    assertTrue(OwnedBy.get(buildingEntity) == 0, "has ownedby");
    assertTrue(BuildingType.get(buildingEntity) == 0, "has tile");
    assertTrue(Level.get(buildingEntity) == 0, "has level");
  }

  function testDestroyWithBuildingOrigin() public {
    bytes32 buildingEntity = buildIronMine();
    destroy(buildingEntity);
  }

  function testDestroyWithTile() public {
    bytes32 buildingEntity = buildIronMine();
    position.parentEntity = asteroidEntity;
    destroy(buildingEntity);
  }

  function testDestroyWithProductionDependencies() public {
    switchPrank(address(creator));
    uint256 originalProduction = 100;
    uint256 productionReduction = 10;
    ProductionRate.set(asteroidEntity, uint8(EResource.Iron), originalProduction);
    P_RequiredDependencyData memory requiredDependenciesData = P_RequiredDependencyData(
      uint8(Iron),
      productionReduction
    );

    P_RequiredDependency.set(IronMinePrototypeId, 1, requiredDependenciesData);
    switchPrank(creator);

    PositionData memory ironPosition = getTilePosition(asteroidEntity, EBuilding.IronMine);
    bytes32 ironMine = world.Pri_11__build(EBuilding.IronMine, ironPosition);
    uint256 productionIncrease = P_Production.getAmounts(IronMinePrototypeId, 1)[0];
    assertEq(ProductionRate.get(asteroidEntity, uint8(EResource.Iron)), originalProduction + productionIncrease);
    assertEq(ConsumptionRate.get(asteroidEntity, uint8(EResource.Iron)), productionReduction);

    world.Pri_11__destroy(ironMine);
    assertEq(ConsumptionRate.get(asteroidEntity, uint8(EResource.Iron)), 0);
    assertEq(ProductionRate.get(asteroidEntity, uint8(EResource.Iron)), originalProduction);
  }

  function testDestroyInActiveWithProductionDependencies() public {
    switchPrank(address(creator));
    uint256 originalProduction = 100;
    uint256 productionReduction = 10;
    ProductionRate.set(asteroidEntity, uint8(EResource.Iron), originalProduction);
    P_RequiredDependencyData memory requiredDependenciesData = P_RequiredDependencyData(
      uint8(Iron),
      productionReduction
    );

    P_RequiredDependency.set(IronMinePrototypeId, 1, requiredDependenciesData);
    switchPrank(creator);

    PositionData memory ironPosition = getTilePosition(asteroidEntity, EBuilding.IronMine);
    bytes32 ironMine = world.Pri_11__build(EBuilding.IronMine, ironPosition);
    uint256 productionIncrease = P_Production.getAmounts(IronMinePrototypeId, 1)[0];
    assertEq(ProductionRate.get(asteroidEntity, uint8(EResource.Iron)), originalProduction + productionIncrease);
    assertEq(ConsumptionRate.get(asteroidEntity, uint8(EResource.Iron)), productionReduction);
    world.Pri_11__toggleBuilding(ironMine);

    world.Pri_11__destroy(ironMine);
    assertEq(ConsumptionRate.get(asteroidEntity, uint8(EResource.Iron)), 0);
    assertEq(ProductionRate.get(asteroidEntity, uint8(EResource.Iron)), originalProduction);
  }

  function testDestroyWithResourceProductionIncrease() public {
    switchPrank(address(creator));
    uint256 increase = 69;
    P_ProductionData memory data = P_ProductionData(new uint8[](1), new uint256[](1));
    data.resources[0] = uint8(EResource.Iron);
    data.amounts[0] = increase;
    P_Production.set(IronMinePrototypeId, 1, data);
    switchPrank(creator);

    PositionData memory ironPosition = getTilePosition(asteroidEntity, EBuilding.IronMine);
    bytes32 ironMine = world.Pri_11__build(EBuilding.IronMine, ironPosition);
    assertEq(ProductionRate.get(asteroidEntity, uint8(EResource.Iron)), increase);

    world.Pri_11__destroy(ironMine);
    assertEq(ProductionRate.get(asteroidEntity, uint8(EResource.Iron)), 0);
  }

  function testDestroyInActiveWithResourceProductionIncrease() public {
    switchPrank(address(creator));
    uint256 increase = 69;
    P_ProductionData memory data = P_ProductionData(new uint8[](1), new uint256[](1));
    data.resources[0] = uint8(EResource.Iron);
    data.amounts[0] = increase;
    P_Production.set(IronMinePrototypeId, 1, data);
    switchPrank(creator);

    PositionData memory ironPosition = getTilePosition(asteroidEntity, EBuilding.IronMine);
    bytes32 ironMine = world.Pri_11__build(EBuilding.IronMine, ironPosition);
    assertEq(ProductionRate.get(asteroidEntity, uint8(EResource.Iron)), increase);
    world.Pri_11__toggleBuilding(ironMine);
    world.Pri_11__destroy(ironMine);
    assertEq(ProductionRate.get(asteroidEntity, uint8(EResource.Iron)), 0);
  }

  function testDestroyWithMaxStorageIncrease() public {
    switchPrank(creator);
    uint8[] memory data = new uint8[](1);
    data[0] = uint8(EResource.Iron);
    P_ListMaxResourceUpgrades.set(IronMinePrototypeId, 1, data);
    P_ByLevelMaxResourceUpgrades.set(IronMinePrototypeId, uint8(EResource.Iron), 1, 50);

    switchPrank(creator);
    MaxResourceCount.set(asteroidEntity, uint8(EResource.Iron), 0);
    PositionData memory ironPosition = getTilePosition(asteroidEntity, EBuilding.IronMine);
    bytes32 ironMine = world.Pri_11__build(EBuilding.IronMine, ironPosition);
    assertEq(MaxResourceCount.get(asteroidEntity, uint8(EResource.Iron)), 50);

    world.Pri_11__destroy(ironMine);
    assertEq(MaxResourceCount.get(asteroidEntity, uint8(EResource.Iron)), 0);
  }

  function testDestroyInActiveWithMaxStorageIncrease() public {
    switchPrank(creator);
    uint8[] memory data = new uint8[](1);
    data[0] = uint8(EResource.Iron);
    P_ListMaxResourceUpgrades.set(IronMinePrototypeId, 1, data);
    P_ByLevelMaxResourceUpgrades.set(IronMinePrototypeId, uint8(EResource.Iron), 1, 50);

    switchPrank(creator);
    MaxResourceCount.set(asteroidEntity, uint8(EResource.Iron), 0);
    PositionData memory ironPosition = getTilePosition(asteroidEntity, EBuilding.IronMine);
    bytes32 ironMine = world.Pri_11__build(EBuilding.IronMine, ironPosition);
    assertEq(MaxResourceCount.get(asteroidEntity, uint8(EResource.Iron)), 50);
    world.Pri_11__toggleBuilding(ironMine);
    assertEq(MaxResourceCount.get(asteroidEntity, uint8(EResource.Iron)), 0);
    world.Pri_11__destroy(ironMine);
    assertEq(MaxResourceCount.get(asteroidEntity, uint8(EResource.Iron)), 0);
  }

  function testDestroyWithUnitsInProduction() public {
    EBuilding building = EBuilding.Workshop;
    Dimensions.set(ExpansionKey, 1, 35, 27);
    P_RequiredResourcesData memory requiredBuildingResources = getBuildCost(building);
    uint256 unitCount = 1;
    uint256 unitLevel = 1;

    for (uint256 i = 0; i < 2; i++) {
      unitCount = i + 1;
      P_RequiredResourcesData memory requiredUnitResources = getTrainCost(
        MinutemanMarinePrototypeId,
        unitLevel,
        unitCount
      );

      provideResources(Home.get(playerEntity), requiredBuildingResources);
      provideResources(Home.get(playerEntity), requiredUnitResources);
      vm.startPrank(creator);
      P_RequiredBaseLevel.set(P_EnumToPrototype.get(BuildingKey, uint8(EBuilding.Workshop)), 1, 0);

      PositionData memory originalPosition = getTilePosition(Home.get(playerEntity), building);
      bytes32 buildingEntity = world.Pri_11__build(building, originalPosition);

      world.Pri_11__trainUnits(buildingEntity, EUnit.MinutemanMarine, unitCount);
      uint256 unitTrainTime = LibUnit.getUnitBuildTime(buildingEntity, MinutemanMarinePrototypeId) * unitCount;

      vm.expectRevert("[Destroy] Cannot destroy building with units in production");
      world.Pri_11__destroy(buildingEntity);

      vm.warp(block.timestamp + unitTrainTime);

      uint256 gas = gasleft();
      world.Pri_11__destroy(buildingEntity);
      console.log("after", gas - gasleft());
    }
  }

  function testHasStarmapperIsCleared() public {
    assertEq(P_HasStarmapper.get(Home.get(playerEntity)), false);

    EBuilding building = EBuilding.Starmapper;
    P_RequiredResourcesData memory requiredResources = getBuildCost(building);
    provideResources(Home.get(playerEntity), requiredResources);
    vm.startPrank(creator);
    P_RequiredBaseLevel.set(P_EnumToPrototype.get(BuildingKey, uint8(EBuilding.Starmapper)), 1, 0);

    PositionData memory coord = getTilePosition(Home.get(playerEntity), building);

    coord.y += 3;
    bytes32 starmapperEntity = world.Pri_11__build(EBuilding.Starmapper, coord);

    assertEq(P_HasStarmapper.get(Home.get(playerEntity)), true);

    world.Pri_11__destroy(starmapperEntity);
    vm.stopPrank();

    assertEq(P_HasStarmapper.get(Home.get(playerEntity)), false);
  }

  function testDestroyFailWithMaxFleetsUsed() public {
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    uint256[] memory unitCounts = new uint256[](unitPrototypes.length);
    //create fleet with 1 minuteman marine
    bytes32 unitPrototype = P_EnumToPrototype.get(UnitKey, uint8(EUnit.MinutemanMarine));
    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == unitPrototype) unitCounts[i] = 1;
    }

    //create fleet with 1 iron
    uint256[] memory resourceCounts = new uint256[](P_Transportables.length());
    for (uint256 i = 0; i < resourceCounts.length; i++) {
      if (P_Transportables.getItemValue(i) == uint8(EResource.Iron)) resourceCounts[i] = 1;
    }

    EBuilding building = EBuilding.Starmapper;
    P_RequiredResourcesData memory requiredResources = getBuildCost(building);
    provideResources(Home.get(playerEntity), requiredResources);
    vm.startPrank(creator);
    P_RequiredBaseLevel.set(P_EnumToPrototype.get(BuildingKey, uint8(EBuilding.Starmapper)), 1, 0);

    PositionData memory coord = getTilePosition(Home.get(playerEntity), building);
    coord.y += 3;

    uint256 initFleetsRemaining = ResourceCount.get(asteroidEntity, uint8(EResource.U_MaxFleets));
    bytes32 starmapperEntity = world.Pri_11__build(EBuilding.Starmapper, coord);
    uint256 fleetsRemaining = ResourceCount.get(asteroidEntity, uint8(EResource.U_MaxFleets));

    assertLt(initFleetsRemaining, fleetsRemaining, "Built Starmapper should have increased available fleets");
    console.log("fleetsRemaining: ", fleetsRemaining);
    for (uint256 i = 0; i < fleetsRemaining; i++) {
      setupCreateFleetNoMaxFleetsGranted(creator, asteroidEntity, unitCounts, resourceCounts);
      vm.startPrank(creator);
      world.Pri_11__createFleet(asteroidEntity, unitCounts, resourceCounts);
    }

    setupCreateFleetNoMaxFleetsGranted(creator, asteroidEntity, unitCounts, resourceCounts);
    vm.startPrank(creator);
    vm.expectRevert("[Fleet] asteroid has no fleets available");
    world.Pri_11__createFleet(asteroidEntity, unitCounts, resourceCounts);

    vm.expectRevert("[UtilityUsage] Cannot decrease utility amount below 0");
    world.Pri_11__destroy(starmapperEntity);
  }

  /* TODO: Add test that includes buildings with utility dependencies */
}
