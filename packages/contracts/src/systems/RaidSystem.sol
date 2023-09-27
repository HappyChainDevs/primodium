// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { PrimodiumSystem } from "systems/internal/PrimodiumSystem.sol";
import { IWorld } from "codegen/world/IWorld.sol";

import { OwnedBy } from "codegen/index.sol";
import { LibRaid } from "codegen/Libraries.sol";

contract RaidSystem is PrimodiumSystem {
  /**
   * @dev Initiates a raid on a rock entity using the LibRaid library.
   * @param rockEntity The identifier of the target rock entity.
   */
  function raid(bytes32 rockEntity) public {
    IWorld world = IWorld(_world());
    bytes32 playerEntity = addressToEntity(_msgSender());
    if (OwnedBy.get(rockEntity) != 0) world.updateRock(playerEntity, rockEntity);
    LibRaid.raid(world, playerEntity, rockEntity);
  }
}
