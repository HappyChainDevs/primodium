// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

// tables
import { Home, P_IsUtility, P_UnitPrototypes, Asteroid, MaxResourceCount, ResourceCount, UnitCount, PirateAsteroidData, P_SpawnPirateAsteroid, P_SpawnPirateAsteroidData, PirateAsteroid, Spawned, ReversePosition, OwnedBy, Position, PositionData } from "codegen/index.sol";

// types
import { EResource } from "src/Types.sol";
import { PirateKey } from "src/Keys.sol";
// libraries
import { LibEncode } from "libraries/LibEncode.sol";
import { LibUnit } from "libraries/LibUnit.sol";
import { LibProduction } from "libraries/LibProduction.sol";

library LibPirate {
  /// @notice spawns new pirate asteroid for player in world
  /// @param prototype the prototype which has spawned the asteroid
  /// @param playerEntity the player the pirate asteroid is spawned for
  /// @return asteroidEntity the entity ID of the spawned asteroid
  function createPirateAsteroid(bytes32 playerEntity, bytes32 prototype) internal returns (bytes32 asteroidEntity) {
    P_SpawnPirateAsteroidData memory spawnPirateAsteroid = P_SpawnPirateAsteroid.get(prototype);
    bytes32 ownerEntity = LibEncode.getHash(PirateKey, playerEntity);
    asteroidEntity = LibEncode.getHash(ownerEntity);
    PositionData memory playerHomeAsteroidCoord = Position.get(Home.get(playerEntity));
    if (Spawned.get(ownerEntity)) {
      PositionData memory lastCoord = Position.get(asteroidEntity);
      ReversePosition.deleteRecord(lastCoord.x, lastCoord.y);
      Position.deleteRecord(asteroidEntity);
      bytes32[] memory units = P_UnitPrototypes.get();
      for (uint8 i = 0; i < units.length; i++) {
        LibUnit.updateStoredUtilities(asteroidEntity, units[i], UnitCount.get(asteroidEntity, units[i]), false);
        UnitCount.set(asteroidEntity, units[i], 0);
      }
    } else {
      Home.set(ownerEntity, asteroidEntity);
      uint8 resourceCount = uint8(EResource.LENGTH);
      LibProduction.increaseResourceProduction(asteroidEntity, EResource.U_Housing, 100000000);
      for (uint8 i = 1; i < resourceCount; i++) {
        if (!P_IsUtility.get(i)) {
          MaxResourceCount.set(asteroidEntity, i, 100000000);
        }
      }
    }
    PositionData memory coord = PositionData({
      x: playerHomeAsteroidCoord.x + spawnPirateAsteroid.x,
      y: playerHomeAsteroidCoord.y + spawnPirateAsteroid.y,
      parent: 0
    });

    PirateAsteroid.set(
      asteroidEntity,
      PirateAsteroidData({
        isPirateAsteroid: true,
        isDefeated: false,
        prototype: prototype,
        playerEntity: playerEntity
      })
    );
    Position.set(asteroidEntity, coord);
    Asteroid.setIsAsteroid(asteroidEntity, true);
    Spawned.set(ownerEntity, true);
    ReversePosition.set(coord.x, coord.y, asteroidEntity);
    OwnedBy.set(asteroidEntity, ownerEntity);

    for (uint8 i = 0; i < spawnPirateAsteroid.resources.length; i++) {
      uint8 resource = spawnPirateAsteroid.resources[i];
      uint256 amount = spawnPirateAsteroid.resourceAmounts[i];
      ResourceCount.set(asteroidEntity, resource, ResourceCount.get(asteroidEntity, resource) + amount);
    }

    for (uint8 i = 0; i < spawnPirateAsteroid.units.length; i++) {
      bytes32 unit = spawnPirateAsteroid.units[i];
      uint256 amount = spawnPirateAsteroid.unitAmounts[i];
      UnitCount.set(asteroidEntity, unit, UnitCount.get(asteroidEntity, unit) + amount);
      LibUnit.updateStoredUtilities(asteroidEntity, unit, amount, true);
    }
  }
}
