
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "std-contracts/components/BoolComponent.sol";

uint256 constant ID = uint256(keccak256("component.IridiumDrillbitFactoryResearch"));

contract IridiumDrillbitFactoryResearchComponent is BoolComponent {
  constructor(address world) BoolComponent(world, ID) {}
}
