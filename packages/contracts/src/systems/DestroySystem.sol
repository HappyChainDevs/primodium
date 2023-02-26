// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById } from "solecs/utils.sol";
import { PositionComponent, ID as PositionComponentID } from "components/PositionComponent.sol";
import { TileComponent, ID as TileComponentID } from "components/TileComponent.sol";
import { PathComponent, ID as PathComponentID } from "components/PathComponent.sol";
import { OwnedByComponent, ID as OwnedByComponentID } from "components/OwnedByComponent.sol";
import { LastBuiltAtComponent, ID as LastBuiltAtComponentID } from "components/LastBuiltAtComponent.sol";

import { Coord } from "../types.sol";

uint256 constant ID = uint256(keccak256("system.Destroy"));

contract DestroySystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory arguments) public returns (bytes memory) {
    (Coord memory coord) = abi.decode(arguments, ( Coord));
    PositionComponent positionComponent = PositionComponent(getAddressById(components, PositionComponentID));
    TileComponent tileComponent = TileComponent(getAddressById(components, TileComponentID));
    PathComponent pathComponent = PathComponent(getAddressById(components, PathComponentID));
    OwnedByComponent ownedByComponent = OwnedByComponent(getAddressById(components, OwnedByComponentID));
    LastBuiltAtComponent lastBuiltAtComponent = LastBuiltAtComponent(getAddressById(components, LastBuiltAtComponentID));

    // Check there isn't another tile there
    uint256[] memory entitiesAtPosition = positionComponent.getEntitiesWithValue(coord);
    require(entitiesAtPosition.length < 2, "can not destroy multiple tiles at once");
    require(entitiesAtPosition.length == 1, "can not destroy tile at empty coord");

    // TODO: check that there is no path that starts or ends at the current location
    require(!pathComponent.has(entitiesAtPosition[0]), "cannot destroy tile with a path that begins there");
    uint256[] memory pathWithEndingTile = pathComponent.getEntitiesWithValue(entitiesAtPosition[0]);
    require(pathWithEndingTile.length == 0, "cannot destroy tile with a path that ends there");

    positionComponent.remove(entitiesAtPosition[0]);
    tileComponent.remove(entitiesAtPosition[0]);
    ownedByComponent.remove(entitiesAtPosition[0]);
    lastBuiltAtComponent.remove(entitiesAtPosition[0]);

    return abi.encode(entitiesAtPosition[0]);
  }

  function executeTyped(Coord memory coord) public returns (bytes memory) {
    return execute(abi.encode(coord));
  }
}
