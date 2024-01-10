// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { PrimodiumSystem } from "systems/internal/PrimodiumSystem.sol";

import { ESendType, SendArgs, Arrival } from "src/Types.sol";
import { ReversePosition, PositionData, UnitCount } from "codegen/index.sol";
import { LibFleet } from "codegen/Libraries.sol";
import { NUM_UNITS, NUM_RESOURCE } from "src/constants.sol";

contract ManageFleetSystem is PrimodiumSystem {
  function createFleet(
    bytes32 spaceRock,
    uint256[NUM_UNITS] calldata unitCounts,
    uint256[NUM_RESOURCE] calldata resourceCounts
  ) public returns (bytes32 fleetId) {
    bytes32 playerEntity = addressToEntity(_msgSender());
    fleetId = LibFleet.createFleet(playerEntity, spaceRock, unitCounts, resourceCounts);
  }

  function transferUnitsFromFleetToFleet(
    bytes32 fromFleetId,
    bytes32 fleetId,
    uint256[NUM_UNITS] calldata unitCounts
  ) public {
    bytes32 playerEntity = addressToEntity(_msgSender());
    LibFleet.transferUnitsFromFleetToFleet(playerEntity, fromFleetId, fleetId, unitCounts);
  }

  function transferResourcesFromFleetToFleet(
    bytes32 fromFleetId,
    bytes32 fleetId,
    uint256[NUM_RESOURCE] calldata resourceCounts
  ) public {
    bytes32 playerEntity = addressToEntity(_msgSender());
    LibFleet.transferResourcesFromFleetToFleet(playerEntity, fromFleetId, fleetId, resourceCounts);
  }

  function transferUnitsFromSpaceRockToFleet(
    bytes32 spaceRock,
    bytes32 fleetId,
    uint256[NUM_UNITS] calldata unitCounts
  ) public {
    bytes32 playerEntity = addressToEntity(_msgSender());
    LibFleet.transferUnitsFromSpaceRockToFleet(playerEntity, spaceRock, fleetId, unitCounts);
  }

  function transferUnitsFromFleetToSpaceRock(
    bytes32 spaceRock,
    bytes32 fleetId,
    uint256[NUM_UNITS] calldata unitCounts
  ) public {
    bytes32 playerEntity = addressToEntity(_msgSender());
    LibFleet.transferUnitsFromFleetToSpaceRock(playerEntity, spaceRock, fleetId, unitCounts);
  }

  function transferResourcesFromSpaceRockToFleet(
    bytes32 spaceRock,
    bytes32 fleetId,
    uint256[NUM_RESOURCE] calldata resourceCounts
  ) public {
    bytes32 playerEntity = addressToEntity(_msgSender());
    LibFleet.transferResourcesFromSpaceRockToFleet(playerEntity, spaceRock, fleetId, resourceCounts);
  }

  function transferResourcesFromFleetToSpaceRock(
    bytes32 spaceRock,
    bytes32 fleetId,
    uint256[NUM_RESOURCE] calldata resourceCounts
  ) public {
    bytes32 playerEntity = addressToEntity(_msgSender());
    LibFleet.transferResourcesFromFleetToSpaceRock(playerEntity, spaceRock, fleetId, resourceCounts);
  }

  function transferUnitsAndResourcesFromFleetToSpaceRock(
    bytes32 spaceRock,
    bytes32 fleetId,
    uint256[NUM_UNITS] calldata unitCounts,
    uint256[NUM_RESOURCE] calldata resourceCounts
  ) public {
    bytes32 playerEntity = addressToEntity(_msgSender());
    LibFleet.transferUnitsAndResourcesFromFleetToSpaceRock(
      playerEntity,
      spaceRock,
      fleetId,
      unitCounts,
      resourceCounts
    );
  }

  function transferUnitsAndResourcesFromSpaceRockToFleet(
    bytes32 spaceRock,
    bytes32 fleetId,
    uint256[NUM_UNITS] calldata unitCounts,
    uint256[NUM_RESOURCE] calldata resourceCounts
  ) public {
    bytes32 playerEntity = addressToEntity(_msgSender());
    LibFleet.transferUnitsAndResourcesFromSpaceRockToFleet(
      playerEntity,
      spaceRock,
      fleetId,
      unitCounts,
      resourceCounts
    );
  }

  function transferUnitsAndResourcesFromFleetToFleet(
    bytes32 fromFleetId,
    bytes32 fleetId,
    uint256[NUM_UNITS] calldata unitCounts,
    uint256[NUM_RESOURCE] calldata resourceCounts
  ) public {
    bytes32 playerEntity = addressToEntity(_msgSender());
    LibFleet.transferUnitsAndResourcesFromFleetToFleet(playerEntity, fromFleetId, fleetId, unitCounts, resourceCounts);
  }

  function landFleet(bytes32 fleetId, bytes32 spaceRock) public {
    bytes32 playerEntity = addressToEntity(_msgSender());
    LibFleet.landFleet(playerEntity, fleetId, spaceRock);
  }

  function mergeFleets(bytes32[] calldata fleets) public {
    bytes32 playerEntity = addressToEntity(_msgSender());
    LibFleet.mergeFleets(playerEntity, fleets);
  }

  function recallFleet(bytes32 fleetId) public {
    bytes32 playerEntity = addressToEntity(_msgSender());
    LibFleet.recallFleet(playerEntity, fleetId);
  }

  function sendFleets(bytes32[] calldata fleets, bytes32 spaceRock) public {
    bytes32 playerEntity = addressToEntity(_msgSender());
    LibFleet.sendFleets(playerEntity, fleets, spaceRock);
  }

  function sendFleet(bytes32 fleetId, bytes32 spaceRock) public {
    bytes32 playerEntity = addressToEntity(_msgSender());
    LibFleet.sendFleet(playerEntity, fleetId, spaceRock);
  }
}
