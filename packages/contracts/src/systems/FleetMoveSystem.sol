// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { FleetBaseSystem } from "systems/internal/FleetBaseSystem.sol";
import { LibFleetMove } from "libraries/fleet/LibFleetMove.sol";
import { FleetMovement } from "codegen/index.sol";
import { LibAsteroid } from "libraries/LibAsteroid.sol";
import { createSecondaryAsteroid } from "libraries/SubsystemCalls.sol";
import { PirateAsteroid, Asteroid, PositionData, ReversePosition } from "codegen/index.sol";

contract FleetMoveSystem is FleetBaseSystem {
  modifier _onlyOtherSpaceRock(bytes32 fleetId, bytes32 spaceRock) {
    require(FleetMovement.getDestination(fleetId) != spaceRock, "[Fleet] Only fleet owner can call this function");
    _;
  }

  modifier _onlyWhenPersonalPirate(bytes32 spaceRock) {
    bytes32 pirateAsteroidPersonalPlayer = PirateAsteroid.getPlayerEntity(spaceRock);
    require(
      pirateAsteroidPersonalPlayer == bytes32(0) || pirateAsteroidPersonalPlayer == _player(),
      "[Fleet] Can only send fleet to your own pirate asteroid"
    );
    _;
  }

  modifier _onlyIfAsteroidExists(bytes32 spaceRock) {
    require(Asteroid.getIsAsteroid(spaceRock), "[Fleet] Space rock does not exist");
    _;
  }

  function sendFleet(bytes32 fleetId, PositionData memory position) public {
    bytes32 spaceRock = ReversePosition.get(position.x, position.y);
    if (spaceRock == bytes32(0)) {
      spaceRock = createSecondaryAsteroid(position);
    }
    sendFleet(fleetId, spaceRock);
  }

  function sendFleet(
    bytes32 fleetId,
    bytes32 spaceRock
  )
    public
    _onlyIfAsteroidExists(spaceRock)
    _onlyFleetOwner(fleetId)
    _onlyWhenFleetIsInOrbit(fleetId)
    _onlyOtherSpaceRock(fleetId, spaceRock)
    _onlyWhenNotPirateAsteroidOrHasNotBeenDefeated(spaceRock)
    _onlyWhenPersonalPirate(spaceRock)
  {
    LibFleetMove.sendFleet(fleetId, spaceRock);
  }
}
