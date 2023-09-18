// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { Counter } from "codegen/Tables.sol";

contract IncrementSystem is System {
  function increment() public returns (uint256) {
    uint256 counter = Counter.get();
    uint256 newValue = counter + 1;
    Counter.set(newValue);
    return newValue;
  }
}
