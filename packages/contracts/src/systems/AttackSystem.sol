// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "forge-std/console.sol";

import { System, IWorld } from "solecs/System.sol";
import { getAddressById, addressToEntity, entityToAddress } from "solecs/utils.sol";
import { SiloID } from "../prototypes/Tiles.sol";

import { ClaimComponents } from "../prototypes/ClaimComponents.sol";
import { PositionComponent, ID as PositionComponentID } from "components/PositionComponent.sol";
import { TileComponent, ID as TileComponentID } from "components/TileComponent.sol";
import { OwnedByComponent, ID as OwnedByComponentID } from "components/OwnedByComponent.sol";
import { HealthComponent, ID as HealthComponentID } from "components/HealthComponent.sol";
import { LastClaimedAtComponent, ID as LastClaimedAtComponentID } from "components/LastClaimedAtComponent.sol";

import { ItemComponent, ID as ItemComponentID } from "components/ItemComponent.sol";

import { BulletCraftedItemID } from "../prototypes/Keys.sol";

import { LibHealth } from "../libraries/LibHealth.sol";
import { LibEncode } from "../libraries/LibEncode.sol";
import { Coord } from "../types.sol";

uint256 constant ID = uint256(keccak256("system.Attack"));

contract AttackSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  // new function that takes in coord and attacks the entity at that coord
  function attack(Coord memory coord, uint256 attackEntity) public returns (uint8) {
    ClaimComponents memory c = ClaimComponents(
      PositionComponent(getAddressById(components, PositionComponentID)),
      TileComponent(getAddressById(components, TileComponentID)),
      OwnedByComponent(getAddressById(components, OwnedByComponentID)),
      LastClaimedAtComponent(getAddressById(components, LastClaimedAtComponentID)),
      HealthComponent(getAddressById(components, HealthComponentID))
    );

    ItemComponent itemComponent = ItemComponent(getAddressById(components, ItemComponentID));

    uint256[] memory curEntities = c.positionComponent.getEntitiesWithValue(coord);
    if (curEntities.length == 1) {
      uint256 curOwnedEntity = c.ownedByComponent.getValue(curEntities[0]);

      if (curOwnedEntity != addressToEntity(msg.sender)) {
        // check that attackEntity has enough bullets
        uint hashedAttackEntity = LibEncode.hashFromAddress(BulletCraftedItemID, entityToAddress(attackEntity));
        if (itemComponent.has(hashedAttackEntity)) {
          uint256 curBullets = itemComponent.getValue(hashedAttackEntity);
          if (curBullets > 0) {
            itemComponent.set(hashedAttackEntity, curBullets - 1);
          } else {
            return 0;
          }
        } else {
          return 0;
        }

        // decrease by HP
        if (c.healthComponent.has(curEntities[0])) {
          uint256 curHealth = c.healthComponent.getValue(curEntities[0]);
          if (curHealth > 0) {
            c.healthComponent.set(curEntities[0], curHealth - LibHealth.ATTACK_DAMAGE);
          }
        } else {
          c.healthComponent.set(curEntities[0], LibHealth.MAX_HEALTH - LibHealth.ATTACK_DAMAGE);
        }

        return 1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  function execute(bytes memory args) public returns (bytes memory) {
    (Coord memory coord, Coord memory targetCoord) = abi.decode(args, (Coord, Coord));

    ClaimComponents memory c = ClaimComponents(
      PositionComponent(getAddressById(components, PositionComponentID)),
      TileComponent(getAddressById(components, TileComponentID)),
      OwnedByComponent(getAddressById(components, OwnedByComponentID)),
      LastClaimedAtComponent(getAddressById(components, LastClaimedAtComponentID)),
      HealthComponent(getAddressById(components, HealthComponentID))
    );

    // Check that the coordinates exist for the silo tile
    uint256[] memory entities = c.positionComponent.getEntitiesWithValue(coord);
    require(entities.length == 1, "[AttackSystem] Cannot attack from an empty tile");

    // Check that it is a silo tile
    uint256 tileEntity = c.tileComponent.getValue(entities[0]);
    require(tileEntity == SiloID, "[AttackSystem] Cannot attack from a non-silo tile");

    // Check that the coordinates is owned by the msg.sender
    uint256 ownedEntity = c.ownedByComponent.getValue(entities[0]);
    require(ownedEntity == addressToEntity(msg.sender), "[AttackSystem] Cannot attack from a tile you do not own");

    return abi.encode(attack(targetCoord, entities[0]));
  }

  function executeTyped(Coord memory coord, Coord memory targetCoord) public returns (bytes memory) {
    return execute(abi.encode(coord, targetCoord));
  }
}
