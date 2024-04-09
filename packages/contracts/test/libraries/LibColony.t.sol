// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { console, PrimodiumTest } from "test/PrimodiumTest.t.sol";
import { addressToEntity } from "src/utils.sol";

import { EUnit } from "src/Types.sol";
import { UnitKey } from "src/Keys.sol";

import { UnitCount, MaxResourceCount, Asteroid, Home, OwnedBy, ResourceCount, ColonySlots, P_Transportables, P_UnitPrototypes, P_EnumToPrototype, P_ColonySlotsConfigData, P_ColonySlotsConfig, P_ColonySlotsMultiplier, ColonySlotsInstallments } from "codegen/index.sol";

import { ColonyShipPrototypeId } from "codegen/Prototypes.sol";

import { LibColony } from "libraries/LibColony.sol";
import { LibUnit } from "libraries/LibUnit.sol";

contract LibColonyTest is PrimodiumTest {
  bytes32 playerEntity;
  bytes32 creatorHomeAsteroid;

  function setUp() public override {
    super.setUp();
    vm.startPrank(creator);
    playerEntity = addressToEntity(creator);
    world.Primodium__spawn();

    OwnedBy.set(Home.get(playerEntity), playerEntity);
    creatorHomeAsteroid = Home.get(playerEntity);
  }

  function testIncreaseColonySlotsCapacity() public {
    assertEq(LibColony.increaseColonySlotsCapacity(playerEntity), 2);
    assertEq(LibColony.increaseColonySlotsCapacity(playerEntity), 3);
  }

  function testGetColonyShipsPlusAsteroids() public {
    vm.startPrank(creator);
    assertEq(ColonySlots.getCapacity(playerEntity), 1);
    LibColony.increaseColonySlotsCapacity(playerEntity);
    assertEq(ColonySlots.getCapacity(playerEntity), 2);

    assertEq(LibUnit.getColonyShipsPlusAsteroids(playerEntity), 1, "primary asteroid should count as a colony slot");
    trainUnits(creator, ColonyShipPrototypeId, 1, true);
    vm.startPrank(creator);
    assertEq(
      LibUnit.getColonyShipsPlusAsteroids(playerEntity),
      2,
      "trained and claimed colony ship isn't being counted"
    );

    // prepare to make a fleet for testing
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();

    uint256[] memory unitCounts = new uint256[](unitPrototypes.length);
    uint256 numberOfUnits = 10;

    // do a fleet with some minutemen and one more colony ship
    bytes32 minuteman = P_EnumToPrototype.get(UnitKey, uint8(EUnit.MinutemanMarine));
    bytes32 colonyShipPrototype = P_EnumToPrototype.get(UnitKey, uint8(EUnit.ColonyShip));

    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      if (unitPrototypes[i] == minuteman) unitCounts[i] = numberOfUnits;
      if (unitPrototypes[i] == colonyShipPrototype) unitCounts[i] = 1;
    }
    uint256[] memory resourceCounts = new uint256[](P_Transportables.length());

    // train and setup everything
    LibColony.increaseColonySlotsCapacity(playerEntity);
    setupCreateFleet(creator, creatorHomeAsteroid, unitCounts, resourceCounts);
    assertEq(LibUnit.getColonyShipsPlusAsteroids(playerEntity), 3, "colony ship on asteroid isn't being counted");

    vm.startPrank(creator);
    // create the fleet
    world.Primodium__createFleet(creatorHomeAsteroid, unitCounts, resourceCounts);
    assertEq(
      LibUnit.getColonyShipsPlusAsteroids(playerEntity),
      3,
      "colony ship transfer from asteroid to fleet isn't being counted"
    );

    // Start colony ship training but don't claim it
    LibColony.increaseColonySlotsCapacity(playerEntity);
    trainUnits(creator, ColonyShipPrototypeId, 1, false);
    vm.startPrank(creator);
    assertEq(LibUnit.getColonyShipsPlusAsteroids(playerEntity), 4, "colony ship in training isn't being counted");
  }

  // todo: make the multiplier a prototypeConfig changeable value
  function testGetColonySlotsCostMultiplier() public {
    assertEq(ColonySlots.getCapacity(playerEntity), 1);
    assertEq(LibColony.getColonySlotsCostMultiplier(playerEntity), P_ColonySlotsMultiplier.get());

    LibColony.increaseColonySlotsCapacity(playerEntity);

    assertEq(ColonySlots.getCapacity(playerEntity), 2);
    assertEq(LibColony.getColonySlotsCostMultiplier(playerEntity), P_ColonySlotsMultiplier.get() * 2);

    LibColony.increaseColonySlotsCapacity(playerEntity);

    assertEq(ColonySlots.getCapacity(playerEntity), 3);
    assertEq(LibColony.getColonySlotsCostMultiplier(playerEntity), P_ColonySlotsMultiplier.get() * 3);
  }

  function testPayForColonySlotsCapacityInput() public {
    P_ColonySlotsConfigData memory costData = P_ColonySlotsConfig.get();
    uint256[] memory emptyPaymentAmounts = new uint256[](0);
    uint256[] memory undersizedPaymentAmounts = new uint256[](costData.resources.length - 1);
    uint256[] memory oversizedPaymentAmounts = new uint256[](costData.resources.length + 1);

    // Pass the various incorrect payment data
    vm.expectRevert("[SpendResources] Payment data does not match cost data");
    world.Primodium__payForColonySlotsCapacity(creatorHomeAsteroid, emptyPaymentAmounts);

    vm.expectRevert("[SpendResources] Payment data does not match cost data");
    world.Primodium__payForColonySlotsCapacity(creatorHomeAsteroid, undersizedPaymentAmounts);

    vm.expectRevert("[SpendResources] Payment data does not match cost data");
    world.Primodium__payForColonySlotsCapacity(creatorHomeAsteroid, oversizedPaymentAmounts);

    // Pass a player entity instead of an asteroid entity
    vm.expectRevert("[Colony] Paying entity is not an asteroid");
    world.Primodium__payForColonySlotsCapacity(playerEntity, costData.amounts);
  }

  function testPayForColonySlotsCapacity() public {
    P_ColonySlotsConfigData memory costData = P_ColonySlotsConfig.get();
    uint256[] memory paymentAmounts = new uint256[](costData.resources.length);

    uint256 colonySlotsCostMultiplier = LibColony.getColonySlotsCostMultiplier(playerEntity);
    uint256 currentSlotCapacity = ColonySlots.getCapacity(playerEntity);

    assertEq(currentSlotCapacity, 1);
    assertEq(colonySlotsCostMultiplier, currentSlotCapacity * P_ColonySlotsMultiplier.get());

    // properly structure the payment data but don't own any resources
    for (uint256 i = 0; i < costData.resources.length; i++) {
      uint8 resource = costData.resources[i];
      uint256 amount = costData.amounts[i] * colonySlotsCostMultiplier;
      MaxResourceCount.set(creatorHomeAsteroid, resource, amount);
      ResourceCount.set(creatorHomeAsteroid, resource, 0);
      paymentAmounts[i] = amount;
    }
    vm.expectRevert("[SpendResources] Not enough resources to spend");
    world.Primodium__payForColonySlotsCapacity(creatorHomeAsteroid, paymentAmounts);

    // ------------

    // properly pay for the colony slot in full
    for (uint256 i = 0; i < costData.resources.length; i++) {
      uint8 resource = costData.resources[i];
      uint256 amount = costData.amounts[i] * colonySlotsCostMultiplier;
      MaxResourceCount.set(creatorHomeAsteroid, resource, amount);
      ResourceCount.set(creatorHomeAsteroid, resource, amount);
      paymentAmounts[i] = amount;
    }

    world.Primodium__payForColonySlotsCapacity(creatorHomeAsteroid, paymentAmounts);
    currentSlotCapacity = ColonySlots.getCapacity(playerEntity);
    uint256 prevColonySlotsCostMultiplier = colonySlotsCostMultiplier;
    colonySlotsCostMultiplier = LibColony.getColonySlotsCostMultiplier(playerEntity);
    assertEq(currentSlotCapacity, 2);
    assertEq(colonySlotsCostMultiplier, currentSlotCapacity * P_ColonySlotsMultiplier.get());

    // Check that installment amounts are currently empty (resources are already initialized from first payment)
    for (uint256 i = 0; i < costData.resources.length; i++) {
      uint256 installment = ColonySlotsInstallments.get(playerEntity, i);
      assertEq(installment, 0, "installment amounts should be empty");
    }

    // ------------

    // Try to pay for another slot with same amount, but it's now not enough so it becomes an installment
    for (uint256 i = 0; i < costData.resources.length; i++) {
      uint8 resource = costData.resources[i];
      uint256 amount = costData.amounts[i] * prevColonySlotsCostMultiplier;
      MaxResourceCount.set(creatorHomeAsteroid, resource, amount);
      ResourceCount.set(creatorHomeAsteroid, resource, amount);
      paymentAmounts[i] = amount;
    }
    bool fullPayment = world.Primodium__payForColonySlotsCapacity(creatorHomeAsteroid, paymentAmounts);
    assertEq(fullPayment, false);
    currentSlotCapacity = ColonySlots.getCapacity(playerEntity);
    colonySlotsCostMultiplier = LibColony.getColonySlotsCostMultiplier(playerEntity);
    assertEq(currentSlotCapacity, 2);
    assertEq(colonySlotsCostMultiplier, currentSlotCapacity * P_ColonySlotsMultiplier.get());

    for (uint256 i = 0; i < costData.resources.length; i++) {
      uint256 installment = ColonySlotsInstallments.get(playerEntity, i);
      assertEq(installment, paymentAmounts[i], "installment resources should match payment resources");
    }

    // ------------

    // check additional installment doesn't overwrite the previous one, and do it for just one resource
    uint256[] memory prevInstallments = new uint256[](costData.resources.length);
    for (uint256 i = 0; i < costData.resources.length; i++) {
      prevInstallments[i] = ColonySlotsInstallments.get(playerEntity, i);
    }

    for (uint256 i = 0; i < costData.resources.length; i++) {
      uint8 resource = costData.resources[i];
      uint256 amount;

      if (i == 0) {
        amount = 1;
      } else {
        amount = 0;
      }
      MaxResourceCount.set(creatorHomeAsteroid, resource, amount);
      ResourceCount.set(creatorHomeAsteroid, resource, amount);
      paymentAmounts[i] = amount;
    }
    fullPayment = world.Primodium__payForColonySlotsCapacity(creatorHomeAsteroid, paymentAmounts);
    assertEq(fullPayment, false);
    currentSlotCapacity = ColonySlots.getCapacity(playerEntity);
    colonySlotsCostMultiplier = LibColony.getColonySlotsCostMultiplier(playerEntity);
    assertEq(currentSlotCapacity, 2);
    assertEq(colonySlotsCostMultiplier, currentSlotCapacity * P_ColonySlotsMultiplier.get());

    // add the amounts of the payment and the previous installment and compare to the installment table
    for (uint i = 0; i < costData.resources.length; i++) {
      uint256 totalInstallmentsCheck = paymentAmounts[i] + prevInstallments[i];
      uint256 installment = ColonySlotsInstallments.get(playerEntity, i);
      assertEq(
        installment,
        totalInstallmentsCheck,
        "installment table amounts should match paymentAmounts + prevInstallment amounts"
      );
    }

    // ------------

    // check no overpayment without full payment (just one resource)

    assertGt(costData.resources.length, 1, "Colony Slots Config Data resources length is less than 2 for next test");
    // get remaining amount required for all resources
    uint256[] memory remainingCost = new uint256[](costData.resources.length);
    for (uint256 i = 0; i < costData.resources.length; i++) {
      remainingCost[i] = costData.amounts[i] * colonySlotsCostMultiplier - ColonySlotsInstallments.get(playerEntity, i);
    }

    for (uint256 i = 0; i < costData.resources.length; i++) {
      uint8 resource = costData.resources[i];
      uint256 amount;
      if (i == 0) {
        amount = remainingCost[i] + 1;
      } else {
        amount = 0;
      }
      MaxResourceCount.set(creatorHomeAsteroid, resource, amount);
      ResourceCount.set(creatorHomeAsteroid, resource, amount);
      paymentAmounts[i] = amount;
    }

    fullPayment = world.Primodium__payForColonySlotsCapacity(creatorHomeAsteroid, paymentAmounts);
    assertEq(fullPayment, false);
    currentSlotCapacity = ColonySlots.getCapacity(playerEntity);
    colonySlotsCostMultiplier = LibColony.getColonySlotsCostMultiplier(playerEntity);
    assertEq(currentSlotCapacity, 2);
    assertEq(colonySlotsCostMultiplier, currentSlotCapacity * P_ColonySlotsMultiplier.get());

    for (uint256 i = 0; i < costData.resources.length; i++) {
      uint256 asteroidResourceAmounts = ResourceCount.get(creatorHomeAsteroid, costData.resources[i]);
      if (i == 0) {
        assertEq(asteroidResourceAmounts, 1, "no rebate from overpayment");
        assertEq(
          ColonySlotsInstallments.get(playerEntity, i),
          costData.amounts[i] * colonySlotsCostMultiplier,
          "installments should be at full cost for the resource that was paid for in full"
        );
      } else {
        assertEq(asteroidResourceAmounts, 0, "asteroid resource amounts should be 0");
      }
    }

    // ------------

    // check no overpayment with full payment

    assertGt(costData.resources.length, 1, "Colony Slots Config Data resources length is less than 2 for next test");
    // get remaining amount required for all resources
    for (uint256 i = 0; i < costData.resources.length; i++) {
      remainingCost[i] = costData.amounts[i] * colonySlotsCostMultiplier - ColonySlotsInstallments.get(playerEntity, i);
    }

    for (uint256 i = 0; i < costData.resources.length; i++) {
      uint8 resource = costData.resources[i];
      uint256 amount = remainingCost[i] + 2;
      MaxResourceCount.set(creatorHomeAsteroid, resource, amount);
      ResourceCount.set(creatorHomeAsteroid, resource, amount);
      paymentAmounts[i] = amount;
    }

    fullPayment = world.Primodium__payForColonySlotsCapacity(creatorHomeAsteroid, paymentAmounts);
    assertEq(fullPayment, true);
    currentSlotCapacity = ColonySlots.getCapacity(playerEntity);
    colonySlotsCostMultiplier = LibColony.getColonySlotsCostMultiplier(playerEntity);
    assertEq(currentSlotCapacity, 3);
    assertEq(colonySlotsCostMultiplier, currentSlotCapacity * P_ColonySlotsMultiplier.get());

    for (uint256 i = 0; i < costData.resources.length; i++) {
      uint256 asteroidResourceAmounts = ResourceCount.get(creatorHomeAsteroid, costData.resources[i]);
      assertEq(asteroidResourceAmounts, 2, "missing a rebate from overpayment");
      assertEq(ColonySlotsInstallments.get(playerEntity, i), 0, "installments should be reset to 0");
    }
  }

  // todo: fix case when losing an asteroid that was training a colony ship
  // todo: fix case when losing an asteroid that owns a colony ship, have to destroy the colony ship if player has no other colony slots
  // todo: (future release) players may try to stash resources in slot payments to avoid losing them in battle. Need to have a way to prevent this, likely by adding a stash inside the main base that can be looted if base is captured, or pulled for full payment when ready to pay in full.
  // todo: (future release) in the future add a few hr lock between making an installment and being able to use it (so that people don't use creative ways to avoid losing resources for imminent battle)
}
