// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { PrimodiumSystem } from "systems/internal/PrimodiumSystem.sol";
import { OwnedBy, Asteroid, LastConquered, P_ConquestConfig, P_GameConfig, ConquestAsteroid } from "codegen/index.sol";
import { EScoreType } from "src/Types.sol";
import { LibScore } from "libraries/LibScore.sol";
import { LibConquestAsteroid } from "libraries/LibConquestAsteroid.sol";
import { WORLD_SPEED_SCALE } from "src/constants.sol";

contract ConquestSystem is PrimodiumSystem {
  function claimConquestPoints(bytes32 asteroidEntity) public {
    bytes32 playerEntity = _player();
    bytes32 ownerEntity = OwnedBy.get(asteroidEntity);
    require(ownerEntity == playerEntity, "[Conquest] Only owner can claim conquest points");

    uint256 conquestPoints = Asteroid.getConquestPoints(asteroidEntity);
    require(conquestPoints > 0, "[Conquest] This asteroid does not generate conquest points");

    uint256 lastConquered = LastConquered.get(asteroidEntity);
    uint256 holdTime = (P_ConquestConfig.getHoldTime() * WORLD_SPEED_SCALE) / P_GameConfig.getWorldSpeed();
    bool canConquer = lastConquered + holdTime <= block.timestamp;

    require(canConquer, "[Conquest] Asteroid hasn't been held long enough to claim conquest points");

    LibScore.addScore(playerEntity, EScoreType.Conquest, conquestPoints);

    LastConquered.set(asteroidEntity, block.timestamp);
  }

  // @dev like claimUnits and claimResources, this function can be called by anyone
  function claimConquestAsteroidPoints(bytes32 asteroidEntity) public {
    bytes32 ownerEntity = OwnedBy.get(asteroidEntity);
    if (ownerEntity == 0) return;

    uint256 lifespan = (P_ConquestConfig.getConquestAsteroidLifeSpan() * WORLD_SPEED_SCALE) /
      P_GameConfig.getWorldSpeed();

    uint256 explodeTime = ConquestAsteroid.getSpawnTime(asteroidEntity) + lifespan;

    uint256 lastConquered = LastConquered.get(asteroidEntity);
    uint256 endTime = block.timestamp > explodeTime ? explodeTime : block.timestamp;

    if (endTime > lastConquered) {
      uint256 holdPctX1000 = ((endTime - lastConquered) * 1000) / lifespan;
      LibScore.addScore(
        ownerEntity,
        EScoreType.Conquest,
        (holdPctX1000 * P_ConquestConfig.getConquestAsteroidPoints()) / 1000
      );
    }

    if (block.timestamp >= explodeTime) {
      LibConquestAsteroid.explodeConquestAsteroid(asteroidEntity);
    } else {
      LastConquered.set(asteroidEntity, block.timestamp);
    }
  }
}
