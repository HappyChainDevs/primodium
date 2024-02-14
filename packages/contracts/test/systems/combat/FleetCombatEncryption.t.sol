// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { console } from "forge-std/console.sol";
import "test/PrimodiumTest.t.sol";
import { LibFleetMove } from "libraries/fleet/LibFleetMove.sol";
import { LibCombatAttributes } from "libraries/LibCombatAttributes.sol";
import { FleetsMap } from "libraries/fleet/FleetsMap.sol";
import { FleetIncomingKey } from "src/Keys.sol";

contract FleetCombatSystemTest is PrimodiumTest {
  bytes32 aliceHomeSpaceRock;
  bytes32 aliceEntity;

  bytes32 bobHomeSpaceRock;
  bytes32 bobEntity;

  bytes32 eveHomeSpaceRock;
  bytes32 eveEntity;

  function setUp() public override {
    super.setUp();
    aliceEntity = addressToEntity(alice);
    aliceHomeSpaceRock = spawn(alice);
    bobEntity = addressToEntity(bob);
    bobHomeSpaceRock = spawn(bob);
    eveEntity = addressToEntity(eve);
    eveHomeSpaceRock = spawn(eve);
  }

  function testFleetAttackSpaceRockEncryption() public {
    console.log("start");
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();

    uint256[] memory unitCounts = new uint256[](unitPrototypes.length);
    uint256 numberOfUnits = 10;

    //create fleet with 1 minuteman marine
    bytes32 unitPrototype = P_EnumToPrototype.get(UnitKey, uint8(EUnit.MinutemanMarine));
    bytes32 capitalShipPrototype = P_EnumToPrototype.get(UnitKey, uint8(EUnit.CapitalShip));
    uint256 decryption = P_Unit.getDecryption(
      capitalShipPrototype,
      UnitLevel.get(aliceHomeSpaceRock, capitalShipPrototype)
    );
    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == unitPrototype) unitCounts[i] = numberOfUnits;
      if (unitPrototypes[i] == capitalShipPrototype) unitCounts[i] = 2;
    }

    //create fleet with 1 iron
    uint256[] memory resourceCounts = new uint256[](P_Transportables.length());

    //provide resource and unit requirements to create fleet
    setupCreateFleet(alice, aliceHomeSpaceRock, unitCounts, resourceCounts);

    vm.startPrank(alice);
    bytes32 fleetId = world.createFleet(aliceHomeSpaceRock, unitCounts, resourceCounts);
    vm.stopPrank();

    vm.startPrank(alice);
    world.sendFleet(fleetId, bobHomeSpaceRock);
    vm.stopPrank();

    vm.startPrank(creator);
    GracePeriod.set(bobHomeSpaceRock, block.timestamp);
    vm.stopPrank();

    uint256 defense = (numberOfUnits *
      P_Unit.getAttack(unitPrototype, UnitLevel.get(aliceHomeSpaceRock, unitPrototype))) / 2;
    uint256 hpProduction = 1;
    uint256 hp = defense;
    uint256 encryption = ResourceCount.get(bobHomeSpaceRock, uint8(EResource.R_Encryption));
    increaseResource(bobHomeSpaceRock, EResource.U_Defense, defense);
    increaseResource(bobHomeSpaceRock, EResource.R_HP, hp);
    increaseProduction(bobHomeSpaceRock, EResource.R_HP, hpProduction);

    uint256 ironAmount = numberOfUnits *
      P_Unit.getCargo(unitPrototype, UnitLevel.get(aliceHomeSpaceRock, unitPrototype));
    increaseResource(bobHomeSpaceRock, EResource.Iron, ironAmount);

    vm.warp(FleetMovement.getArrivalTime(fleetId));
    vm.startPrank(alice);
    world.attack(fleetId, bobHomeSpaceRock);
    vm.stopPrank();

    assertEq(
      ResourceCount.get(bobHomeSpaceRock, uint8(EResource.R_HP)),
      0,
      "space rock hp should have been reduced by unit attack"
    );

    assertEq(LibCombatAttributes.getCargo(fleetId), 0, "fleet should not have raided");

    assertEq(
      ResourceCount.get(bobHomeSpaceRock, uint8(EResource.Iron)),
      ironAmount,
      "space rock should not have been raided"
    );

    console.log("curr encryption: %s", ResourceCount.get(fleetId, uint8(EResource.R_Encryption)));
    assertEq(
      ResourceCount.get(bobHomeSpaceRock, uint8(EResource.R_Encryption)),
      encryption - decryption,
      "encryption should have been reduced by decryption"
    );

    vm.warp(block.timestamp + 5);
    claimResources(bobHomeSpaceRock);
    assertEq(
      ResourceCount.get(bobHomeSpaceRock, uint8(EResource.R_Encryption)),
      encryption - decryption + ProductionRate.get(bobHomeSpaceRock, uint8(EResource.R_Encryption)) * 5,
      "encryption should recovered by production"
    );

    console.log("end");
  }

  function testFleetAttackSpaceRockEncryptionTakeOver() public {
    console.log("start");
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();

    uint256[] memory unitCounts = new uint256[](unitPrototypes.length);
    uint256 numberOfUnits = 10;

    //create fleet with 1 minuteman marine
    bytes32 unitPrototype = P_EnumToPrototype.get(UnitKey, uint8(EUnit.MinutemanMarine));
    bytes32 capitalShipPrototype = P_EnumToPrototype.get(UnitKey, uint8(EUnit.CapitalShip));
    uint256 decryption = P_Unit.getDecryption(
      capitalShipPrototype,
      UnitLevel.get(aliceHomeSpaceRock, capitalShipPrototype)
    );
    console.log("decryption: %s", decryption);
    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == unitPrototype) unitCounts[i] = numberOfUnits;
      if (unitPrototypes[i] == capitalShipPrototype) unitCounts[i] = 1;
    }
    uint256[] memory resourceCounts = new uint256[](P_Transportables.length());

    uint256 encryption = ResourceCount.get(bobHomeSpaceRock, uint8(EResource.R_Encryption));
    console.log("encryption: %s", encryption);
    uint256 fleetCountToWin = LibMath.divideCeil(encryption, decryption);

    bytes32[] memory fleetIds = new bytes32[](fleetCountToWin);
    require(fleetCountToWin > 0, "should have at least 1 fleet to win");

    for (uint256 i = 0; i < fleetCountToWin; i++) {
      console.log("create fleet %s", i);
      setupCreateFleet(alice, aliceHomeSpaceRock, unitCounts, resourceCounts);

      vm.startPrank(alice);
      fleetIds[i] = world.createFleet(aliceHomeSpaceRock, unitCounts, resourceCounts);
      vm.stopPrank();
      console.log("create fleet done %s", i);
    }

    vm.startPrank(alice);
    for (uint256 i = 0; i < fleetCountToWin; i++) {
      console.log("send fleet %s", i);
      world.sendFleet(fleetIds[i], bobHomeSpaceRock);
      console.log("send fleet done %s", i);
    }
    vm.stopPrank();
    //bob stuff:

    uint256 ironAmount = numberOfUnits *
      P_Unit.getCargo(unitPrototype, UnitLevel.get(aliceHomeSpaceRock, unitPrototype));
    increaseResource(bobHomeSpaceRock, EResource.Iron, ironAmount);

    vm.startPrank(creator);
    GracePeriod.set(bobHomeSpaceRock, block.timestamp);
    vm.stopPrank();

    console.log("creaete bob fleet");
    setupCreateFleet(bob, bobHomeSpaceRock, unitCounts, resourceCounts);

    vm.startPrank(bob);
    bytes32 bobFleet = world.createFleet(bobHomeSpaceRock, unitCounts, resourceCounts);

    world.sendFleet(bobFleet, aliceHomeSpaceRock);
    vm.stopPrank();
    console.log("creaete bob fleet done");

    vm.warp(LibMath.max(FleetMovement.getArrivalTime(fleetIds[0]), block.timestamp));
    vm.startPrank(alice);
    for (uint256 i = 0; i < fleetCountToWin; i++) {
      console.log("fleet attack %s", i);
      uint256 encryptionBeforeAttack = ResourceCount.get(bobHomeSpaceRock, uint8(EResource.R_Encryption));

      world.attack(fleetIds[i], bobHomeSpaceRock);
      if (encryptionBeforeAttack > decryption) {
        assertEq(
          ResourceCount.get(bobHomeSpaceRock, uint8(EResource.R_Encryption)),
          encryptionBeforeAttack - decryption,
          "encryption should have decreased after attack"
        );
      } else {
        assertEq(
          ResourceCount.get(bobHomeSpaceRock, uint8(EResource.R_Encryption)),
          0,
          "encryption should have reached zero"
        );
      }
      assertEq(LibCombatAttributes.getCargo(fleetIds[i]), 0, "fleet should not have raided");
      console.log("fleet attack done %s", i);
    }

    vm.stopPrank();
    console.log("encryption after battles: %s", ResourceCount.get(bobHomeSpaceRock, uint8(EResource.R_Encryption)));

    assertEq(OwnedBy.get(bobHomeSpaceRock), aliceEntity, "space rock should have been taken over");

    assertEq(UnitCount.get(bobFleet, unitPrototype), 0, "fleet should have been disbanded and marine units");
    assertEq(
      UnitCount.get(bobFleet, capitalShipPrototype),
      0,
      "fleet should have been disbanded and colony ship unit lost"
    );

    assertEq(FleetMovement.getDestination(bobFleet), bobHomeSpaceRock, "fleet should have been reset to orbit");
    assertEq(FleetMovement.getOrigin(bobFleet), bobHomeSpaceRock, "fleet should have been reset to orbit");
    assertEq(FleetMovement.getArrivalTime(bobFleet), block.timestamp, "fleet should have been reset to orbit");
    assertEq(FleetMovement.getSendTime(bobFleet), block.timestamp, "fleet should have been reset to orbit");

    assertEq(
      ResourceCount.get(bobHomeSpaceRock, uint8(EResource.Iron)),
      ironAmount,
      "space rock should not have been raided"
    );
    assertEq(
      ResourceCount.get(bobHomeSpaceRock, uint8(EResource.R_Encryption)),
      0,
      "encryption should have reached zero"
    );
    console.log("end");
  }
}
