// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// world
import { IWorld } from "codegen/world/IWorld.sol";
// tables
import { HomeAsteroid, Spawned, ReversePosition, OwnedBy, Position, PositionData, AsteroidCount, RockType, PositionData } from "codegen/Tables.sol";

// types
import { ERock } from "src/Types.sol";

// libraries
import { LibMath } from "libraries/LibMath.sol";
import { LibEncode } from "libraries/LibEncode.sol";
import { Trigonometry as Trig } from "trig/src/Trigonometry.sol";
import { ABDKMath64x64 as Math } from "abdk/ABDKMath64x64.sol";

library LibAsteroid {
  /// @notice Creates new asteroid for player in world
  /// @dev Checks if asteroid already exists, sets position and other properties
  /// @param world World address
  /// @param ownerEntity Owner's entity ID
  /// @return asteroidEntity Created asteroid's entity ID
  function createAsteroid(address world, bytes32 ownerEntity) internal returns (bytes32 asteroidEntity) {
    asteroidEntity = LibEncode.getHash(world, ownerEntity);
    require(RockType.get(asteroidEntity) == ERock.NULL, "[LibAsteroid] asteroid already exists");

    uint32 asteroidCount = AsteroidCount.get() + 1;
    PositionData memory position = getUniqueAsteroidPosition(asteroidCount);

    Position.set(asteroidEntity, position);
    RockType.set(asteroidEntity, ERock.Asteroid);
    Spawned.set(ownerEntity, true);
    HomeAsteroid.set(ownerEntity, asteroidEntity);
    ReversePosition.set(position.x, position.y, asteroidEntity);
    OwnedBy.set(asteroidEntity, ownerEntity);
    AsteroidCount.set(asteroidCount);
  }

  /// @notice Generates unique asteroid position
  /// @dev Ensures asteroid positions do not overlap
  /// @return position Generated unique position
  function getUniqueAsteroidPosition(uint32 asteroidCount) internal view returns (PositionData memory position) {
    position = LibMath.getPositionByVector(LibMath.getDistance(asteroidCount), LibMath.getDirection(asteroidCount));
    while (ReversePosition.get(position.x, position.y) != 0) {
      position.y += 5;
    }
  }
}
