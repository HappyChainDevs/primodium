// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { PrimodiumSystem } from "systems/internal/PrimodiumSystem.sol";
import { LibFleet } from "libraries/fleet/LibFleet.sol";
import { LibFleetClear } from "libraries/fleet/LibFleetClear.sol";

contract S_FleetClearSystem is PrimodiumSystem {
  function uncheckedAbandonFleet(bytes32 fleetEntity) public {
    LibFleetClear.abandonFleet(fleetEntity);
  }

  function resetFleetIfNoUnitsLeft(bytes32 fleetEntity) public {
    LibFleet.resetFleetIfNoUnitsLeft(fleetEntity);
  }
}
