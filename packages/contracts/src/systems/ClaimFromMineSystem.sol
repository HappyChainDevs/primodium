// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System, IWorld } from "solecs/System.sol";
import { getAddressById, addressToEntity } from "solecs/utils.sol";

import { TileComponent, ID as TileComponentID } from "components/TileComponent.sol";
import { PathComponent, ID as PathComponentID } from "components/PathComponent.sol";
import { OwnedByComponent, ID as OwnedByComponentID } from "components/OwnedByComponent.sol";
import { LastClaimedAtComponent, ID as LastClaimedAtComponentID } from "components/LastClaimedAtComponent.sol";
import { LastResearchedAtComponent, ID as LastResearchedAtComponentID } from "components/LastResearchedAtComponent.sol";
import { HealthComponent, ID as HealthComponentID } from "components/HealthComponent.sol";
import { StorageCapacityComponent, ID as StorageCapacityComponentID } from "components/StorageCapacityComponent.sol";
import { StorageCapacityResourcesComponent, ID as StorageCapacityResourcesComponentID } from "components/StorageCapacityResourcesComponent.sol";
import { MineComponent, ID as MineComponentID } from "components/MineComponent.sol";
import { ItemComponent, ID as ItemComponentID } from "components/ItemComponent.sol";
import { ResearchComponent, ID as ResearchComponentID } from "components/ResearchComponent.sol";
import { UnclaimedResourceComponent, ID as UnclaimedResourceComponentID } from "components/UnclaimedResourceComponent.sol";
import { ClaimComponents } from "../prototypes/ClaimComponents.sol";

import { BuildingKey } from "../prototypes/Keys.sol";

import { Coord } from "../types.sol";

import { LibTerrain } from "../libraries/LibTerrain.sol";
import { LibHealth } from "../libraries/LibHealth.sol";
import { LibMath } from "../libraries/LibMath.sol";
import { LibUnclaimedResource } from "../libraries/LibUnclaimedResource.sol";
import { LibEncode } from "../libraries/LibEncode.sol";
import { LibNewMine } from "../libraries/LibNewMine.sol";
uint256 constant ID = uint256(keccak256("system.ClaimFromMine"));

contract ClaimFromMineSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  function execute(bytes memory args) public returns (bytes memory) {
    // Components
    ClaimComponents memory c = ClaimComponents(
      TileComponent(getAddressById(components, TileComponentID)),
      OwnedByComponent(getAddressById(components, OwnedByComponentID)),
      LastClaimedAtComponent(getAddressById(components, LastClaimedAtComponentID)),
      HealthComponent(getAddressById(components, HealthComponentID))
    );

    Coord memory coord = abi.decode(args, (Coord));

    // check if main base
    uint256 entity = LibEncode.encodeCoordEntity(coord, BuildingKey);
    require(c.tileComponent.has(entity), "[ClaimFromMineSystem] Cannot claim from mines on an empty coordinate");

    // Check that the coordinates is owned by the msg.sender
    uint256 ownedEntityAtStartCoord = c.ownedByComponent.getValue(entity);
    require(
      ownedEntityAtStartCoord == addressToEntity(msg.sender),
      "[ClaimFromMineSystem] Cannot claim from mines on a tile you do not own"
    );

    // Check that health is not zero
    require(
      LibHealth.checkAlive(c.healthComponent, entity),
      "[ClaimFromMineSystem] Cannot claim from mines on a tile with zero health"
    );

    ItemComponent itemComponent = ItemComponent(getAddressById(components, ItemComponentID));
    MineComponent mineComponent = MineComponent(getAddressById(components, MineComponentID));
    StorageCapacityComponent storageCapacityComponent = StorageCapacityComponent(
      getAddressById(components, StorageCapacityComponentID)
    );
    UnclaimedResourceComponent unclaimedResourceComponent = UnclaimedResourceComponent(
      getAddressById(components, UnclaimedResourceComponentID)
    );

    LibNewMine.claimResourcesFromMines(
      itemComponent, //writes to
      c.lastClaimedAtComponent, //writes to
      unclaimedResourceComponent, //writes to
      mineComponent,
      storageCapacityComponent,
      addressToEntity(msg.sender)
    );

    return abi.encode(0);
  }

  function executeTyped(Coord memory coord) public returns (bytes memory) {
    // Pass in the coordinates of the main base
    return execute(abi.encode(coord));
  }
}
