// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { PrimodiumSystem } from "systems/internal/PrimodiumSystem.sol";

import { OwnedBy, LastConquered, ColonyShipsInTraining, UnitCount, Home, Spawned } from "src/codegen/index.sol";
import { LibFleetStance } from "libraries/fleet/LibFleetStance.sol";
import { LibFleetClear } from "libraries/fleet/LibFleetClear.sol";
import { LibUnit } from "libraries/LibUnit.sol";
import { FleetSet } from "libraries/fleet/FleetSet.sol";
import { AsteroidSet } from "libraries/AsteroidSet.sol";
import { IWorld } from "codegen/world/IWorld.sol";
import { FleetOwnedByKey, AsteroidOwnedByKey } from "src/Keys.sol";
import { ColonyShipPrototypeId } from "codegen/Prototypes.sol";

contract S_TransferAsteroidSystem is PrimodiumSystem {
  function transferAsteroid(bytes32 asteroidEntity, bytes32 ownerEntity) public {
    bytes32 lastOwnerEntity = OwnedBy.get(asteroidEntity);
    if (lastOwnerEntity != bytes32(0)) {
      // clear defending fleets, including ones owned by other players
      LibFleetStance.clearDefendingFleets(asteroidEntity);
      // abandon all owned fleets
      LibFleetClear.abandonAllOwnedFleets(asteroidEntity);
      // destroy colony ships on the asteroid
      destroyAsteroidColonyShips(asteroidEntity);

      AsteroidSet.remove(lastOwnerEntity, AsteroidOwnedByKey, asteroidEntity);

      if (asteroidEntity == Home.get(lastOwnerEntity)) {
        bytes32[] memory ownedAsteroids = AsteroidSet.getAsteroidEntities(lastOwnerEntity, AsteroidOwnedByKey);

        if (ownedAsteroids.length > 0) {
          Home.set(lastOwnerEntity, ownedAsteroids[0]);
        } else {
          Home.deleteRecord(lastOwnerEntity);
          Spawned.set(lastOwnerEntity, false);
        }
      }
    }

    if (ownerEntity == bytes32(0)) {
      OwnedBy.deleteRecord(asteroidEntity);
    } else {
      OwnedBy.set(asteroidEntity, ownerEntity);
      AsteroidSet.add(ownerEntity, AsteroidOwnedByKey, asteroidEntity);
    }
    LastConquered.set(asteroidEntity, block.timestamp);
  }

  function clearAllFleets(bytes32 asteroidEntity) internal {
    bytes32[] memory ownedFleets = FleetSet.getFleetEntities(asteroidEntity, FleetOwnedByKey);
    for (uint256 i = 0; i < ownedFleets.length; i++) {
      LibFleetClear.clearFleet(ownedFleets[i]);

      IWorld world = IWorld(_world());
      world.Pri_11__resetFleetIfNoUnitsLeft(ownedFleets[i]);
    }
  }

  function destroyAsteroidColonyShips(bytes32 asteroidEntity) internal {
    ColonyShipsInTraining.set(asteroidEntity, 0); // when later claimed, the colony ships are destroyed via LibUnit.claimBuildingUnits
    // Technically the new owner could quickly queue another colony ship (with sufficient resources and slots) and skip some training time, but that's fine for now. This could likely be reworked in v0.12 with fleet/unit reassigned to player entities.

    uint256 shipCount = UnitCount.get(asteroidEntity, ColonyShipPrototypeId);
    if (shipCount > 0) {
      LibUnit.decreaseUnitCount(asteroidEntity, ColonyShipPrototypeId, shipCount, false);
    }
  }
}
