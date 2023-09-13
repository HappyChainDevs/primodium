// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

import { IStore } from "@latticexyz/store/src/IStore.sol";
import { createPrototype } from "../../libraries/prototypes/createPrototype.sol";
import { ERock, EBuilding } from "../Types.sol";
import { P_Blueprint, P_BlueprintTableId, P_MaxLevel, P_MaxLevelTableId } from "../Tables.sol";

bytes32 constant prototypeId = "Hangar";
bytes32 constant HangarPrototypeId = prototypeId;
uint256 constant LENGTH = 2;

function HangarKeys() pure returns (bytes32[] memory) {
  bytes32[] memory _keyTuple = new bytes32[](1);
  _keyTuple[0] = prototypeId;

  return _keyTuple;
}

function HangarPrototype(IStore store) {
  bytes32[] memory keys = HangarKeys();
  bytes32[] memory tableIds = new bytes32[](LENGTH);
  bytes[] memory values = new bytes[](LENGTH);

  tableIds[0] = P_BlueprintTableId;
  tableIds[1] = P_MaxLevelTableId;

  int32[] memory p_blueprint_value = new int32[](32);
  p_blueprint_value[0] = 0;
  p_blueprint_value[1] = 0;
  p_blueprint_value[2] = 0;
  p_blueprint_value[3] = -1;
  p_blueprint_value[4] = 0;
  p_blueprint_value[5] = -2;
  p_blueprint_value[6] = 0;
  p_blueprint_value[7] = -3;
  p_blueprint_value[8] = -1;
  p_blueprint_value[9] = 0;
  p_blueprint_value[10] = -1;
  p_blueprint_value[11] = -1;
  p_blueprint_value[12] = -1;
  p_blueprint_value[13] = -2;
  p_blueprint_value[14] = -1;
  p_blueprint_value[15] = -3;
  p_blueprint_value[16] = -2;
  p_blueprint_value[17] = 0;
  p_blueprint_value[18] = -2;
  p_blueprint_value[19] = -1;
  p_blueprint_value[20] = -2;
  p_blueprint_value[21] = -2;
  p_blueprint_value[22] = -2;
  p_blueprint_value[23] = -3;
  p_blueprint_value[24] = -3;
  p_blueprint_value[25] = 0;
  p_blueprint_value[26] = -3;
  p_blueprint_value[27] = -1;
  p_blueprint_value[28] = -3;
  p_blueprint_value[29] = -2;
  p_blueprint_value[30] = -3;
  p_blueprint_value[31] = -3;
  values[0] = P_Blueprint.encode(p_blueprint_value);
  values[1] = P_MaxLevel.encode(5);

  createPrototype(store, keys, tableIds, values);
}
