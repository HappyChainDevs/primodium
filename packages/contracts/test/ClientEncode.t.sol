// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { PrimodiumTest, console } from "test/PrimodiumTest.t.sol";
import { LibEncode } from "libraries/LibEncode.sol";

contract ClientEncodeTest is PrimodiumTest {
  function testHashKeyEntity() public view {
    bytes32 key = bytes32("KEY");
    console.log("testHashKeyEntity");
    for (uint256 i = 0; i < 10; i++) {
      bytes32 entity = bytes32(i);
      bytes32 hash = LibEncode.getHash(key, entity);
      console.log(i);
      console.logBytes32(hash);
    }
  }
}
