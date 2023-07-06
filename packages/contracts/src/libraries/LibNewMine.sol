// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { Uint256Component } from "std-contracts/components/Uint256Component.sol";
import { BoolComponent } from "std-contracts/components/BoolComponent.sol";
import { Uint256ArrayComponent } from "std-contracts/components/Uint256ArrayComponent.sol";

import { LibEncode } from "./LibEncode.sol";
import { LibUnclaimedResource } from "./LibUnclaimedResource.sol";
import { LibClaim } from "./LibClaim.sol";
import { BolutiteResourceItemID, CopperResourceItemID, IridiumResourceItemID, IronResourceItemID, KimberliteResourceItemID, LithiumResourceItemID, OsmiumResourceItemID, TitaniumResourceItemID, TungstenResourceItemID, UraniniteResourceItemID, IronPlateCraftedItemID, BasicPowerSourceCraftedItemID, KineticMissileCraftedItemID, RefinedOsmiumCraftedItemID, AdvancedPowerSourceCraftedItemID, PenetratingWarheadCraftedItemID, PenetratingMissileCraftedItemID, TungstenRodsCraftedItemID, IridiumCrystalCraftedItemID, IridiumDrillbitCraftedItemID, LaserPowerSourceCraftedItemID, ThermobaricWarheadCraftedItemID, ThermobaricMissileCraftedItemID, KimberliteCrystalCatalystCraftedItemID, BulletCraftedItemID } from "../prototypes/Keys.sol";

library LibNewMine {
  function claimResourcesFromMines(
    Uint256Component itemComponent, //writes to
    Uint256Component lastClaimedAtComponent, //writes to
    Uint256Component unclaimedResourceComponent, //writes to
    Uint256Component mineComponent,
    Uint256Component storageCapacityComponent,
    uint256 playerEntity
  ) internal {
    uint256[25] memory storageResourceIds = getAllResourceIds();
    for (uint256 i = 0; i < storageResourceIds.length; i++) {
      uint256 playerResourceEntity = LibEncode.hashKeyEntity(storageResourceIds[i], playerEntity);
      if (!mineComponent.has(playerResourceEntity)) continue;
      LibUnclaimedResource.updateUnclaimedForResource(
        unclaimedResourceComponent,
        lastClaimedAtComponent,
        mineComponent,
        storageCapacityComponent,
        itemComponent,
        playerEntity,
        storageResourceIds[i]
      );
      LibClaim.addResourceToStorage(
        itemComponent,
        storageCapacityComponent,
        storageResourceIds[i],
        unclaimedResourceComponent.getValue(playerResourceEntity),
        playerEntity
      );
      unclaimedResourceComponent.set(playerResourceEntity, 0);
    }
  }

  function getAllResourceIds() internal pure returns (uint256[25] memory) {
    return [
      BolutiteResourceItemID,
      CopperResourceItemID,
      IridiumResourceItemID,
      IronResourceItemID,
      KimberliteResourceItemID,
      LithiumResourceItemID,
      OsmiumResourceItemID,
      TitaniumResourceItemID,
      TungstenResourceItemID,
      UraniniteResourceItemID,
      IronPlateCraftedItemID,
      BasicPowerSourceCraftedItemID,
      KineticMissileCraftedItemID,
      RefinedOsmiumCraftedItemID,
      AdvancedPowerSourceCraftedItemID,
      PenetratingWarheadCraftedItemID,
      PenetratingMissileCraftedItemID,
      TungstenRodsCraftedItemID,
      IridiumCrystalCraftedItemID,
      IridiumDrillbitCraftedItemID,
      LaserPowerSourceCraftedItemID,
      ThermobaricWarheadCraftedItemID,
      ThermobaricMissileCraftedItemID,
      KimberliteCrystalCatalystCraftedItemID,
      BulletCraftedItemID
    ];
  }
}
