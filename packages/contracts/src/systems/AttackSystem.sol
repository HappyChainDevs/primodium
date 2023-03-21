// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById, addressToEntity } from "solecs/utils.sol";
import { SiloID } from "../prototypes/Tiles.sol";

import { CraftedComponents } from "../prototypes/CraftedComponents.sol";
import { ClaimComponents } from "../prototypes/ClaimComponents.sol";
import { PositionComponent, ID as PositionComponentID } from "components/PositionComponent.sol";
import { TileComponent, ID as TileComponentID } from "components/TileComponent.sol";
import { OwnedByComponent, ID as OwnedByComponentID } from "components/OwnedByComponent.sol";
import { HealthComponent, ID as HealthComponentID } from "components/HealthComponent.sol";
import { LastClaimedAtComponent, ID as LastClaimedAtComponentID } from "components/LastClaimedAtComponent.sol";

import { BulletCraftedComponent, ID as BulletCraftedComponentID } from "components/BulletCraftedComponent.sol";

import { LibHealth } from "../libraries/LibHealth.sol";
import { Coord } from "../types.sol";

uint256 constant ID = uint256(keccak256("system.Attack"));

contract AttackSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

  // new function that takes in coord and attacks the entity at that coord
  function attack(Coord memory coord, uint256 attackEntity) public {
    ClaimComponents memory c = ClaimComponents(
      PositionComponent(getAddressById(components, PositionComponentID)),
      TileComponent(getAddressById(components, TileComponentID)),
      OwnedByComponent(getAddressById(components, OwnedByComponentID)),
      LastClaimedAtComponent(getAddressById(components, LastClaimedAtComponentID)),
      HealthComponent(getAddressById(components, HealthComponentID))
    );

    CraftedComponents memory cc = CraftedComponents(
      BulletCraftedComponent(getAddressById(components, BulletCraftedComponentID))
    );

    uint256[] memory curEntities = c.positionComponent.getEntitiesWithValue(coord);
    if (curEntities.length == 1) {
      uint256 curOwnedEntity = c.ownedByComponent.getValue(curEntities[0]);

      if (curOwnedEntity != addressToEntity(msg.sender)) {
        // check that attackEntity has enough bullets
        if (cc.bulletCraftedComponent.has(attackEntity)) {
          uint256 curBullets = cc.bulletCraftedComponent.getValue(attackEntity);
          if (curBullets > 0) {
            cc.bulletCraftedComponent.set(attackEntity, curBullets - 1);
          } else {
            return;
          }
        } else {
          return;
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
      }
    }
  }

  function execute(bytes memory arguments) public returns (bytes memory) {
    Coord memory coord = abi.decode(arguments, (Coord));

    ClaimComponents memory c = ClaimComponents(
      PositionComponent(getAddressById(components, PositionComponentID)),
      TileComponent(getAddressById(components, TileComponentID)),
      OwnedByComponent(getAddressById(components, OwnedByComponentID)),
      LastClaimedAtComponent(getAddressById(components, LastClaimedAtComponentID)),
      HealthComponent(getAddressById(components, HealthComponentID))
    );

    // Check that the coordinates exist for the silo tile
    uint256[] memory entities = c.positionComponent.getEntitiesWithValue(coord);
    require(entities.length == 1, "can not start path at empty coord");

    // Check that it is a silo tile
    uint256 tileEntity = c.tileComponent.getValue(entities[0]);
    require(tileEntity == SiloID, "can not attack from not silo tile");

    // Check that the coordinates is owned by the msg.sender
    uint256 ownedEntity = c.ownedByComponent.getValue(entities[0]);
    require(ownedEntity == addressToEntity(msg.sender), "can not attack from not owned tile");

    // find all not owned tile in radius
    // deduct by x number of bullet in silo tile
    // deduct by z hp in tiles that were attacked

    int32 i = LibHealth.ATTACK_RADIUS;
    int32 j = LibHealth.ATTACK_RADIUS;
    int32 totalElements = i * j;
    int32 index = 0;
    int32 radius = 0;
    while (index < totalElements) {
      for (int32 r = radius; r <= radius && index < totalElements; r++) {
        int32 row = i / 2;
        int32 col = j / 2;
        for (int32 k = 0; k < r && index < totalElements; k++) {
          row--;
          attack(Coord({ x: row, y: col }), entities[0]);
          index++;
        }
        for (int32 k = 0; k < r && index < totalElements; k++) {
          col++;
          attack(Coord({ x: row, y: col }), entities[0]);
          index++;
        }
        for (int32 k = 0; k < r && index < totalElements; k++) {
          row++;
          attack(Coord({ x: row, y: col }), entities[0]);
          index++;
        }
        for (int32 k = 0; k < r && index < totalElements; k++) {
          col--;
          attack(Coord({ x: row, y: col }), entities[0]);
          index++;
        }
      }
      radius++;
    }

    return abi.encode(entities[0]);
  }

  function executeTyped(Coord memory coord) public returns (bytes memory) {
    return execute(abi.encode(coord));
  }
}
