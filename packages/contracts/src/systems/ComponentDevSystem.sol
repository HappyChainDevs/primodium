// SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

// External
import "solecs/System.sol";
import { IWorld } from "solecs/interfaces/IWorld.sol";
import { IComponent } from "solecs/interfaces/IComponent.sol";
import { getAddressById } from "solecs/utils.sol";
import { LibDebug } from "libraries/LibDebug.sol";

uint256 constant ID = uint256(keccak256("system.ComponentDev"));

// NOTE: this contract is only used for testing and must be removed from deploy.json in prod
contract ComponentDevSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory args) public returns (bytes memory) {
    require(LibDebug.isDebug(world), "[ComponentDevSystem]: not debug mode");
    (uint256 componentId, uint256 entity, bytes memory value) = abi.decode(args, (uint256, uint256, bytes));
    IComponent c = IComponent(getAddressById(components, componentId));
    if (value.length == 0) {
      c.remove(entity);
    } else {
      c.set(entity, value);
    }
  }

  function executeTyped(
    uint256 componentId,
    uint256 entity,
    bytes memory value // If value has length 0, the component is removed
  ) public returns (bytes memory) {
    return execute(abi.encode(componentId, entity, value));
  }
}
