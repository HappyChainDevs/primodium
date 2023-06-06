// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { Uint256Component } from "std-contracts/components/Uint256Component.sol";
import { BoolComponent } from "std-contracts/components/BoolComponent.sol";
import { entityToAddress } from "solecs/utils.sol";

import { MainBaseID, MinerID, LithiumMinerID, BasicMinerID, HardenedDrillID, PrecisionMachineryFactoryID, ConveyorID, SiloID, BolutiteID, CopperID, IridiumID, IronID, KimberliteID, LithiumID, OsmiumID, TungstenID, UraniniteID, BulletFactoryID } from "../prototypes/Tiles.sol";

import { LibDebug } from "./LibDebug.sol";
import { LibEncode } from "./LibEncode.sol";

library LibMine {
  function isDefaultUnlockedResource(uint256 resourceKey) internal pure returns (bool) {
    if (LibDebug.isDebug()) {
      // copper is unlocked for mud test
      return resourceKey == IronID || resourceKey == CopperID;
    } else {
      return resourceKey == IronID;
    }
  }

  // allow mine resource if unlocked.
  function mine(
    Uint256Component lastClaimedAtComponent,
    Uint256Component lastBuiltAtComponent,
    Uint256Component lastResearchedAtComponent,
    BoolComponent researchComponent,
    uint256 minerType,
    uint256 resourceKey,
    uint256 researchKey,
    uint256 ownerKey,
    uint256 minerEntity
  ) internal returns (uint256) {
    uint256 MINE_COUNT_PER_BLOCK = 10;
    uint256 MINE_COUNT_MAX = 10000;

    if (minerType == MinerID || minerType == LithiumMinerID) {
      MINE_COUNT_PER_BLOCK = 10;
    } else if (minerType == BasicMinerID) {
      MINE_COUNT_PER_BLOCK = 1;
      MINE_COUNT_MAX = 1000;
    } else if (minerType == HardenedDrillID) {
      MINE_COUNT_PER_BLOCK = 2;
      MINE_COUNT_MAX = 2000;
    } else if (minerType == PrecisionMachineryFactoryID) {
      MINE_COUNT_PER_BLOCK = 3;
      MINE_COUNT_MAX = 3000;
    }

    uint256 hashedResearchKey = LibEncode.hashFromAddress(researchKey, entityToAddress(ownerKey));

    if (!isDefaultUnlockedResource(resourceKey)) {
      if (!researchComponent.has(hashedResearchKey)) {
        return 0;
      }
    }

    // Logic for setting startClaimTime:
    // If last claimed time doesn't exist, check if default unlocked resource.
    // - If not a default unlocked resource, use the last researched time for the unlocked resource as startClaimTime.
    // - If a default unlocked resource, use the last built at time as startClaimTime.
    // If last claimed time exists, use as startClaimTime.
    uint256 startClaimTime;
    if (!lastClaimedAtComponent.has(minerEntity)) {
      if (!isDefaultUnlockedResource(resourceKey)) {
        startClaimTime = lastResearchedAtComponent.getValue(hashedResearchKey);
      } else {
        startClaimTime = lastBuiltAtComponent.getValue(minerEntity);
      }
    } else {
      startClaimTime = lastClaimedAtComponent.getValue(minerEntity);
    }
    uint256 endClaimTime = block.number;

    lastClaimedAtComponent.set(minerEntity, endClaimTime);

    uint256 incBy = MINE_COUNT_PER_BLOCK * (endClaimTime - startClaimTime);
    if (incBy > MINE_COUNT_MAX) {
      incBy = MINE_COUNT_MAX;
    }
    return incBy;
  }
}
