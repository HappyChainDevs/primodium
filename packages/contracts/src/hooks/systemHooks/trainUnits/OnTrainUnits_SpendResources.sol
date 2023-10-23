// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { WorldResourceIdInstance } from "@latticexyz/world/src/WorldResourceId.sol";
import { addressToEntity, getSystemResourceId } from "src/utils.sol";
import { SystemHook } from "@latticexyz/world/src/SystemHook.sol";
import { ResourceId, ResourceIdInstance } from "@latticexyz/store/src/ResourceId.sol";
import { PositionData } from "codegen/tables/Position.sol";

import { EBuilding } from "src/Types.sol";
import { LibEncode } from "libraries/LibEncode.sol";
import { BuildingKey, UnitKey } from "src/Keys.sol";
import { LibResource } from "libraries/LibResource.sol";
import { LibBuilding } from "libraries/LibBuilding.sol";
import { Level } from "codegen/tables/Level.sol";
import { SliceLib, SliceInstance } from "@latticexyz/store/src/Slice.sol";
import { P_EnumToPrototype } from "codegen/tables/P_EnumToPrototype.sol";

/**
 * @title OnTrainUnits_SpendResources
 * @dev This contract is a system hook that handles resource spending when units are trained.
 */
contract OnTrainUnits_SpendResources is SystemHook {
  constructor() {}

  /**
   * @dev This function is called before the system's main logic is executed.
   * @param msgSender The address of the message sender.
   * @param systemId The identifier of the system.
   * @param callData The data passed to the system.
   */
  function onBeforeCallSystem(
    address msgSender,
    ResourceId systemId,
    bytes memory callData
  ) public {
    // Decode the arguments from the callData
    bytes memory args = SliceInstance.toBytes(SliceLib.getSubslice(callData, 4));

    (bytes32 buildingEntity, uint8 unit, uint256 count) = abi.decode(args, (bytes32, uint8, uint256));

    // Spend the required resources for training units
    LibResource.spendUnitRequiredResources(addressToEntity(msgSender), P_EnumToPrototype.get(UnitKey, unit), count);
  }

  /**
   * @dev This function is called after the system's main logic is executed.
   * @param msgSender The address of the message sender.
   * @param systemId The identifier of the system.
   * @param callData The data passed to the system.
   */
  function onAfterCallSystem(
    address msgSender,
    ResourceId systemId,
    bytes memory callData
  ) public {}
}
