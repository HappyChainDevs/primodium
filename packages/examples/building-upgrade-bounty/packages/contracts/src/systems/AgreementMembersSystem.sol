// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { System } from "@latticexyz/world/src/System.sol";
import { Counter } from "../codegen/index.sol";

contract AgreementMembersSystem is System {
  function agree() public returns (uint32) {
    // below is just boilerplate example placeholder
    uint32 counter = Counter.get();
    uint32 newValue = counter + 1;
    Counter.set(newValue);
    return newValue;
  }
}
