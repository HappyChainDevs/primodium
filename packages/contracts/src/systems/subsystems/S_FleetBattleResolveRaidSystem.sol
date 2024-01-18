// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { FleetBaseSystem } from "systems/internal/FleetBaseSystem.sol";
import { LibFleetRaid } from "libraries/fleet/LibFleetRaid.sol";
import { NUM_UNITS, NUM_RESOURCE } from "src/constants.sol";

contract S_FleetBattleResolveRaidSystem is FleetBaseSystem {
  function resolveBattleRaid(bytes32 raider, bytes32 target) public {
    LibFleetRaid.resolveBattleRaid(raider, target);
  }
}
