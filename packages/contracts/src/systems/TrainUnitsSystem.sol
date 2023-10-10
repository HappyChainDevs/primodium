// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { PrimodiumSystem } from "systems/internal/PrimodiumSystem.sol";
import { P_EnumToPrototype, QueueItemUnitsData } from "codegen/index.sol";
import { LibUnit, UnitProductionQueue } from "codegen/Libraries.sol";

import { addressToEntity, entityToAddress, getSystemResourceId } from "src/utils.sol";
import { SystemCall } from "@latticexyz/world/src/SystemCall.sol";

import { S_UpdateRockSystem } from "systems/subsystems/S_UpdateRockSystem.sol";
import { S_SpendResourcesSystem } from "systems/subsystems/S_SpendResourcesSystem.sol";

import { EUnit } from "src/Types.sol";
import { UnitKey } from "src/Keys.sol";

contract TrainUnitsSystem is PrimodiumSystem {
  /// @notice Trains units based on specified unit type and count
  /// @param buildingEntity Entity identifier of the building
  /// @param unit Unit type to be trained
  /// @param count Quantity of units to be trained
  function trainUnits(
    bytes32 buildingEntity,
    EUnit unit,
    uint256 count
  ) public {
    bytes32 unitPrototype = P_EnumToPrototype.get(UnitKey, uint8(unit));
    bytes32 playerEntity = addressToEntity(_msgSender());

    require(unit > EUnit.NULL && unit < EUnit.LENGTH, "[TrainUnitsSystem] Unit does not exist");
    require(LibUnit.canProduceUnit(buildingEntity, unitPrototype), "[TrainUnitsSystem] Building cannot produce unit");

    // SystemCall.callWithHooksOrRevert(
    //   entityToAddress(playerEntity),
    //   getSystemResourceId("S_UpdateRockSystem"),
    //   abi.encodeCall(S_UpdateRockSystem.updateHomeRock, (playerEntity)),
    //   0
    // );

    // SystemCall.callWithHooksOrRevert(
    //   entityToAddress(playerEntity),
    //   getSystemResourceId("S_SpendResourcesSystem"),
    //   abi.encodeCall(S_SpendResourcesSystem.spendUnitRequiredResources, (playerEntity, unitPrototype, count)),
    //   0
    // );

    if (count == 0) {
      return;
    }

    QueueItemUnitsData memory queueItem = QueueItemUnitsData({ unitId: unitPrototype, quantity: count });

    UnitProductionQueue.enqueue(buildingEntity, queueItem);
  }
}
