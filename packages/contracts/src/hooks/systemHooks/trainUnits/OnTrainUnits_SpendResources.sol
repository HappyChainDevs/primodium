pragma solidity >=0.8.21;

import { addressToEntity, entityToAddress, getSystemResourceId, bytes32ToString } from "src/utils.sol";
import { SystemHook } from "@latticexyz/world/src/SystemHook.sol";
import { Schema, SchemaLib } from "@latticexyz/store/src/Schema.sol";
import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { IStore } from "@latticexyz/store/src/IStore.sol";
import { StoreCore } from "@latticexyz/store/src/StoreCore.sol";
import { ResourceId } from "@latticexyz/store/src/ResourceId.sol";
import { PackedCounter } from "@latticexyz/store/src/PackedCounter.sol";
import { FieldLayout } from "@latticexyz/store/src/FieldLayout.sol";
import { BuildingType, BuildingTypeTableId } from "codegen/tables/BuildingType.sol";
import { Position, PositionTableId, PositionData } from "codegen/tables/Position.sol";
import { OwnedBy, OwnedByTableId } from "codegen/tables/OwnedBy.sol";
import { Bounds } from "libraries/LibBuilding.sol";
import { OnHookChangedValue, OnHookChangedValueTableId } from "codegen/tables/OnHookChangedValue.sol";
import { ResourceIdInstance } from "@latticexyz/store/src/ResourceId.sol";
import { EBuilding, EUnit } from "src/Types.sol";
import { BuildSystem } from "systems/BuildSystem.sol";
import { LibEncode } from "libraries/LibEncode.sol";
import { UnitKey } from "src/Keys.sol";
import { IWorld } from "codegen/world/IWorld.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { LibBuilding } from "libraries/LibBuilding.sol";
import { LibResource } from "libraries/LibResource.sol";
import { SliceLib, SliceInstance } from "@latticexyz/store/src/Slice.sol";
import { P_EnumToPrototype } from "codegen/tables/P_EnumToPrototype.sol";

contract OnTrainUnits_SpendResources is SystemHook {
  constructor() {}

  function onBeforeCallSystem(
    address msgSender,
    ResourceId systemId,
    bytes memory callData
  ) public {
    bytes memory args = SliceInstance.toBytes(SliceLib.getSubslice(callData, 4));
    (bytes32 buildingEntity, uint8 unit, uint256 count) = abi.decode(args, (bytes32, uint8, uint256));
    LibResource.spendUnitRequiredResources(addressToEntity(msgSender), P_EnumToPrototype.get(UnitKey, unit), count);
  }

  function onAfterCallSystem(
    address msgSender,
    ResourceId systemId,
    bytes memory callData
  ) public {}
}
