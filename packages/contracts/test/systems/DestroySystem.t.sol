// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import "test/PrimodiumTest.t.sol";

contract DestroySystemTest is PrimodiumTest {
  bytes32 public playerEntity;
  PositionData public position;
  int32[] public blueprint = get2x2Blueprint();

  function setUp() public override {
    super.setUp();

    spawn(creator);
    playerEntity = addressToEntity(creator);
    position = getPosition1(creator);
    vm.startPrank(creator);
  }

  function buildIronMine() private returns (bytes32) {
    removeRequirements(EBuilding.IronMine);
    return world.build(EBuilding.IronMine, position);
  }

  function destroy(bytes32 buildingEntity, PositionData memory _coord) public {
    bytes32[] memory children = Children.get(buildingEntity);
    world.destroy(_coord);

    for (uint256 i = 0; i < children.length; i++) {
      assertTrue(OwnedBy.get(children[i]) == 0);
      assertTrue(BuildingType.get(children[i]) == 0);
    }

    assertTrue(OwnedBy.get(buildingEntity) == 0, "has ownedby");
    assertTrue(BuildingType.get(buildingEntity) == 0, "has tile");
    assertTrue(Level.get(buildingEntity) == 0, "has level");
  }

  function testDestroyWithBuildingOrigin() public {
    bytes32 buildingEntity = buildIronMine();
    destroy(buildingEntity, position);
  }

  function testDestroyWithTile() public {
    bytes32 buildingEntity = buildIronMine();
    bytes32 asteroid = Home.getAsteroid(playerEntity);
    position.parent = asteroid;
    destroy(buildingEntity, position);
  }

  function testDestroyWithProductionDependencies() public {
    switchPrank(address(creator));
    uint256 originalProduction = 100;
    uint256 productionReduction = 10;
    bytes32 spaceRockEntity = Home.getAsteroid(playerEntity);
    ProductionRate.set(spaceRockEntity, uint8(EResource.Iron), originalProduction);
    P_RequiredDependencyData memory requiredDependenciesData = P_RequiredDependencyData(
      uint8(Iron),
      productionReduction
    );

    P_RequiredDependency.set(IronMinePrototypeId, 1, requiredDependenciesData);
    switchPrank(creator);

    world.build(EBuilding.IronMine, getIronPosition(creator));
    uint256 productionIncrease = P_Production.getAmounts(IronMinePrototypeId, 1)[0];
    assertEq(ProductionRate.get(spaceRockEntity, uint8(EResource.Iron)), originalProduction + productionIncrease);
    assertEq(ConsumptionRate.get(spaceRockEntity, uint8(EResource.Iron)), productionReduction);

    world.destroy(getIronPosition(creator));
    assertEq(ConsumptionRate.get(spaceRockEntity, uint8(EResource.Iron)), 0);
    assertEq(ProductionRate.get(spaceRockEntity, uint8(EResource.Iron)), originalProduction);
  }

  function testDestroyWithResourceProductionIncrease() public {
    switchPrank(address(creator));
    bytes32 spaceRockEntity = Home.getAsteroid(playerEntity);
    uint256 increase = 69;
    P_ProductionData memory data = P_ProductionData(new uint8[](1), new uint256[](1));
    data.resources[0] = uint8(EResource.Iron);
    data.amounts[0] = increase;
    P_Production.set(IronMinePrototypeId, 1, data);
    switchPrank(creator);

    world.build(EBuilding.IronMine, getIronPosition(creator));
    assertEq(ProductionRate.get(spaceRockEntity, uint8(EResource.Iron)), increase);

    world.destroy(getIronPosition(creator));
    assertEq(ProductionRate.get(spaceRockEntity, uint8(EResource.Iron)), 0);
  }

  function testDestroyWithMaxStorageIncrease() public {
    switchPrank(creator);
    bytes32 spaceRockEntity = Home.getAsteroid(playerEntity);
    uint8[] memory data = new uint8[](1);
    data[0] = uint8(EResource.Iron);
    P_ListMaxResourceUpgrades.set(IronMinePrototypeId, 1, data);
    P_ByLevelMaxResourceUpgrades.set(IronMinePrototypeId, uint8(EResource.Iron), 1, 50);

    switchPrank(creator);
    MaxResourceCount.set(spaceRockEntity, uint8(EResource.Iron), 0);
    world.build(EBuilding.IronMine, getIronPosition(creator));
    assertEq(MaxResourceCount.get(spaceRockEntity, uint8(EResource.Iron)), 50);

    world.destroy(getIronPosition(creator));
    assertEq(MaxResourceCount.get(spaceRockEntity, uint8(EResource.Iron)), 0);
  }
}
