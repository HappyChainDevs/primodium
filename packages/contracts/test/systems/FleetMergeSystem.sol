// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;
import "test/PrimodiumTest.t.sol";

contract FleetMergeSystemTest is PrimodiumTest {
  bytes32 aliceHomeAsteroid;
  bytes32 aliceEntity;

  bytes32 bobHomeAsteroid;
  bytes32 bobEntity;

  function setUp() public override {
    super.setUp();
    aliceEntity = addressToEntity(alice);
    aliceHomeAsteroid = spawn(alice);

    bobEntity = addressToEntity(bob);
    bobHomeAsteroid = spawn(bob);
  }

  function testMergeFleets() public {
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    uint256[] memory unitCounts = new uint256[](unitPrototypes.length);
    //create fleet with 1 minuteman marine
    bytes32 unitPrototype = P_EnumToPrototype.get(UnitKey, uint8(EUnit.MinutemanMarine));
    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == unitPrototype) unitCounts[i] = 2;
    }

    //create fleet with 1 iron
    uint256[] memory resourceCounts = new uint256[](P_Transportables.length());
    for (uint256 i = 0; i < resourceCounts.length; i++) {
      if (P_Transportables.getItemValue(i) == uint8(EResource.Iron)) resourceCounts[i] = 2;
    }

    //provide resource and unit requirements to create fleet
    setupCreateFleet(alice, aliceHomeAsteroid, unitCounts, resourceCounts);

    vm.startPrank(alice);
    bytes32 fleetEntity = world.Primodium__createFleet(aliceHomeAsteroid, unitCounts, resourceCounts);
    vm.stopPrank();

    increaseResource(aliceHomeAsteroid, EResource.U_MaxFleets, 1);
    //provide resource and unit requirements to create fleet
    setupCreateFleet(alice, aliceHomeAsteroid, unitCounts, resourceCounts);
    vm.warp(block.timestamp + 1);
    vm.startPrank(alice);
    bytes32 secondFleetEntity = world.Primodium__createFleet(aliceHomeAsteroid, unitCounts, resourceCounts);
    vm.stopPrank();

    uint256 aliceScore = Score.get(aliceEntity);
    uint256 aliceHomeScore = Score.get(aliceHomeAsteroid);
    vm.startPrank(alice);
    world.Primodium__sendFleet(fleetEntity, bobHomeAsteroid);
    world.Primodium__sendFleet(secondFleetEntity, bobHomeAsteroid);
    vm.warp(FleetMovement.getArrivalTime(fleetEntity));
    bytes32[] memory fleets = new bytes32[](2);
    fleets[0] = fleetEntity;
    fleets[1] = secondFleetEntity;
    world.Primodium__mergeFleets(fleets);
    vm.stopPrank();

    assertEq(Score.get(aliceEntity), aliceScore, "score should stay the same");
    assertEq(Score.get(aliceHomeAsteroid), aliceHomeScore, "home score should stay the same");
    assertEq(Score.get(aliceEntity), aliceHomeScore, "score should stay the same as home score");

    assertEq(UnitCount.get(fleetEntity, unitPrototype), 4, "fleet unit count doesn't match");
    assertEq(UnitCount.get(secondFleetEntity, unitPrototype), 0, "fleet 2 unit count doesn't match");
    assertEq(ResourceCount.get(fleetEntity, uint8(EResource.Iron)), 4, "fleet resource count doesn't match");
    assertEq(ResourceCount.get(secondFleetEntity, uint8(EResource.Iron)), 0, "fleet resource count doesn't match");

    P_RequiredResourcesData memory requiredResources = P_RequiredResources.get(
      unitPrototype,
      UnitLevel.get(aliceHomeAsteroid, unitPrototype)
    );
    for (uint256 i = 0; i < requiredResources.resources.length; i++) {
      if (P_IsUtility.get(requiredResources.resources[i]))
        assertEq(
          ResourceCount.get(aliceHomeAsteroid, requiredResources.resources[i]),
          0,
          "no utility should be refunded when transfer is between same owner fleets"
        );
    }
    assertEq(ResourceCount.get(aliceHomeAsteroid, uint8(EResource.Iron)), 0, "asteroid resource count doesn't match");

    assertEq(FleetMovement.getDestination(fleetEntity), bobHomeAsteroid, "fleet destination doesn't match");
    assertEq(
      FleetMovement.getDestination(secondFleetEntity),
      aliceHomeAsteroid,
      "fleet 2 destination doesn't match, should have reset to home asteroid"
    );
    assertEq(FleetMovement.getOrigin(fleetEntity), aliceHomeAsteroid, "fleet origin doesn't match");
    assertEq(FleetMovement.getOrigin(secondFleetEntity), aliceHomeAsteroid, "fleet 2 origin doesn't match");
    assertEq(FleetMovement.getArrivalTime(secondFleetEntity), block.timestamp, "fleet 2 arrival time doesn't match");
  }
}
