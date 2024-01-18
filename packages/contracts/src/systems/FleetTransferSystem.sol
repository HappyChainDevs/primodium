// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { FleetBaseSystem } from "systems/internal/FleetBaseSystem.sol";
import { LibFleetTransfer } from "libraries/fleet/LibFleetTransfer.sol";
import { NUM_UNITS, NUM_RESOURCE } from "src/constants.sol";

contract FleetTransferSystem is FleetBaseSystem {
  function transferUnitsFromSpaceRockToFleet(
    bytes32 spaceRock,
    bytes32 fleetId,
    uint256[NUM_UNITS] calldata unitCounts
  ) public _onlySpaceRockOwner(spaceRock) _onlyWhenFleetIsInOrbitOfSpaceRock(fleetId, spaceRock) {
    LibFleetTransfer.transferUnitsFromSpaceRockToFleet(_player(), spaceRock, fleetId, unitCounts);
  }

  function transferResourcesFromSpaceRockToFleet(
    bytes32 spaceRock,
    bytes32 fleetId,
    uint256[NUM_RESOURCE] calldata resourceCounts
  ) public _onlySpaceRockOwner(spaceRock) _onlyWhenFleetIsInOrbitOfSpaceRock(fleetId, spaceRock) {
    LibFleetTransfer.transferResourcesFromSpaceRockToFleet(_player(), spaceRock, fleetId, resourceCounts);
  }

  function transferUnitsAndResourcesFromSpaceRockToFleet(
    bytes32 spaceRock,
    bytes32 fleetId,
    uint256[NUM_UNITS] calldata unitCounts,
    uint256[NUM_RESOURCE] calldata resourceCounts
  ) public _onlySpaceRockOwner(spaceRock) _onlyWhenFleetIsInOrbitOfSpaceRock(fleetId, spaceRock) {
    LibFleetTransfer.transferUnitsAndResourcesFromSpaceRockToFleet(
      _player(),
      spaceRock,
      fleetId,
      unitCounts,
      resourceCounts
    );
  }

  function transferUnitsFromFleetToSpaceRock(
    bytes32 fleetId,
    bytes32 spaceRock,
    uint256[NUM_UNITS] calldata unitCounts
  ) public _onlyFleetOwner(fleetId) _onlyWhenFleetIsInOrbitOfSpaceRock(fleetId, spaceRock) {
    LibFleetTransfer.transferUnitsFromFleetToSpaceRock(_player(), fleetId, spaceRock, unitCounts);
  }

  function transferResourcesFromFleetToSpaceRock(
    bytes32 fleetId,
    bytes32 spaceRock,
    uint256[NUM_RESOURCE] calldata resourceCounts
  ) public _onlyFleetOwner(fleetId) _onlyWhenFleetIsInOrbitOfSpaceRock(fleetId, spaceRock) {
    LibFleetTransfer.transferResourcesFromFleetToSpaceRock(_player(), fleetId, spaceRock, resourceCounts);
  }

  function transferUnitsAndResourcesFromFleetToSpaceRock(
    bytes32 spaceRock,
    bytes32 fleetId,
    uint256[NUM_UNITS] calldata unitCounts,
    uint256[NUM_RESOURCE] calldata resourceCounts
  ) public _onlyFleetOwner(fleetId) _onlyWhenFleetIsInOrbitOfSpaceRock(fleetId, spaceRock) {
    LibFleetTransfer.transferUnitsAndResourcesFromFleetToSpaceRock(
      _player(),
      spaceRock,
      fleetId,
      unitCounts,
      resourceCounts
    );
  }

  function transferUnitsFromFleetToFleet(
    bytes32 fromFleetId,
    bytes32 fleetId,
    uint256[NUM_UNITS] calldata unitCounts
  ) public _onlyFleetOwner(fromFleetId) _onlyWhenFleetsAreIsInSameOrbit(fromFleetId, fleetId) {
    LibFleetTransfer.transferUnitsFromFleetToFleet(_player(), fromFleetId, fleetId, unitCounts);
  }

  function transferResourcesFromFleetToFleet(
    bytes32 fromFleetId,
    bytes32 fleetId,
    uint256[NUM_RESOURCE] calldata resourceCounts
  ) public _onlyFleetOwner(fromFleetId) _onlyWhenFleetsAreIsInSameOrbit(fromFleetId, fleetId) {
    LibFleetTransfer.transferResourcesFromFleetToFleet(_player(), fromFleetId, fleetId, resourceCounts);
  }

  function transferUnitsAndResourcesFromFleetToFleet(
    bytes32 fromFleetId,
    bytes32 fleetId,
    uint256[NUM_UNITS] calldata unitCounts,
    uint256[NUM_RESOURCE] calldata resourceCounts
  ) public _onlyFleetOwner(fromFleetId) _onlyWhenFleetsAreIsInSameOrbit(fromFleetId, fleetId) {
    LibFleetTransfer.transferUnitsAndResourcesFromFleetToFleet(
      _player(),
      fromFleetId,
      fleetId,
      unitCounts,
      resourceCounts
    );
  }
}
