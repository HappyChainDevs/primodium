// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { Uint256Component } from "std-contracts/components/Uint256Component.sol";
import { BoolComponent } from "std-contracts/components/BoolComponent.sol";
import { Uint256ArrayComponent } from "std-contracts/components/Uint256ArrayComponent.sol";
import { MinerID, LithiumMinerID, BasicMinerID, HardenedDrillID, PrecisionPneumaticDrillID, BolutiteID, CopperID, IridiumID, IronID, KimberliteID, LithiumID, OsmiumID, TungstenID, UraniniteID } from "../prototypes/Tiles.sol";
import { MainBaseID } from "../prototypes/Tiles.sol";

import { LibDebug } from "./LibDebug.sol";
import { LibEncode } from "./LibEncode.sol";
import { LibStorage } from "./LibStorage.sol";
import { LibMath } from "./LibMath.sol";
import { LibTerrain } from "./LibTerrain.sol";

library LibNewMine {
  function claimResourcesFromMines(
    Uint256Component itemComponent, //writes to
    Uint256Component lastClaimedAtComponent, //writes to
    Uint256Component unclaimedResourceComponent, //writes to
    Uint256Component mineComponent,
    Uint256ArrayComponent storageCapacityResourcesComponent,
    Uint256Component storageCapacityComponent,
    uint256 playerEntity
  ) internal {
    uint256[] memory storageResourceIds = storageCapacityResourcesComponent.getValue(playerEntity);
    for (uint256 i = 0; i < storageResourceIds.length; i++) {
      uint256 playerResourceEntity = LibEncode.hashKeyEntity(storageResourceIds[i], playerEntity);
      updateUnclaimedForResource(
        unclaimedResourceComponent,
        lastClaimedAtComponent,
        mineComponent,
        storageCapacityComponent,
        itemComponent,
        playerEntity,
        storageResourceIds[i]
      );
      if (unclaimedResourceComponent.getValue(playerEntity) > 0)
        LibStorage.addResourceToStorage(
          itemComponent,
          storageCapacityComponent,
          playerResourceEntity,
          storageResourceIds[i],
          unclaimedResourceComponent.getValue(playerEntity)
        );
    }
  }

  function updateUnclaimedForResource(
    Uint256Component unclaimedResourceComponent, //writes to
    Uint256Component lastClaimedAtComponent, //writes to
    Uint256Component mineComponent,
    Uint256Component storageComponent,
    Uint256Component itemComponent,
    uint256 playerEntity,
    uint256 resourceId
  ) internal {
    uint256 playerResourceProductionEntity = LibEncode.hashKeyEntity(resourceId, playerEntity);
    uint256 playerResourceProduction = mineComponent.getValue(playerResourceProductionEntity);
    if (playerResourceProduction <= 0) {
      lastClaimedAtComponent.set(playerResourceProductionEntity, block.number);
      return;
    }
    uint256 availableSpaceInStorage = LibStorage.getAvailableSpaceInStorageForResource(
      storageComponent,
      itemComponent,
      playerEntity,
      resourceId
    );
    if (availableSpaceInStorage <= 0) {
      lastClaimedAtComponent.set(playerResourceProductionEntity, block.number);
      return;
    }
    uint256 unclaimedResource = LibMath.getSafeUint256Value(unclaimedResourceComponent, playerResourceProductionEntity);
    unclaimedResource +=
      playerResourceProduction *
      (block.number - LibMath.getSafeUint256Value(lastClaimedAtComponent, playerResourceProductionEntity));
    if (availableSpaceInStorage < unclaimedResource) {
      unclaimedResource = availableSpaceInStorage;
    }
    lastClaimedAtComponent.set(playerResourceProductionEntity, block.number);
    unclaimedResourceComponent.set(playerEntity, unclaimedResource);
  }

  function checkAndUpdateResourceProductionOnUpgradeMine(
    Uint256Component mineComponent, //writes to
    Uint256Component buildingComponent,
    Uint256Component tileComponent,
    uint256 playerEntity,
    uint256 fromEntity,
    uint256 toEntity
  ) internal {
    uint256 buildingLevelEntity = LibEncode.hashKeyEntity(
      tileComponent.getValue(fromEntity),
      buildingComponent.getValue(fromEntity)
    );
    uint256 resourceId = LibTerrain.getTopLayerKey(LibEncode.decodeCoordEntity(fromEntity));
    uint256 playerResourceEntity = LibEncode.hashKeyEntity(resourceId, playerEntity);
    uint256 resourceProductionIncreaseOfMine = mineComponent.getValue( // new building level entity
      LibEncode.hashKeyEntity(tileComponent.getValue(fromEntity), buildingComponent.getValue(fromEntity) + 1) // new building level entity
    ) - mineComponent.getValue(buildingLevelEntity);
    mineComponent.set(
      playerResourceEntity,
      mineComponent.getValue(playerResourceEntity) + resourceProductionIncreaseOfMine
    );
  }

  function updateResourceProductionOnDestroyPathFromMine(
    Uint256Component mineComponent, //writes to
    Uint256Component buildingComponent,
    Uint256Component tileComponent,
    uint256 playerEntity,
    uint256 fromEntity,
    uint256 toEntity
  ) internal {
    uint256 buildingId = tileComponent.getValue(fromEntity);
    uint256 buildingLevelEntity = LibEncode.hashKeyEntity(buildingId, buildingComponent.getValue(fromEntity));
    uint256 resourceId = LibTerrain.getTopLayerKey(LibEncode.decodeCoordEntity(fromEntity));
    uint256 resourceProductionOfMine = mineComponent.getValue(buildingLevelEntity);
    uint256 playerResourceEntity = LibEncode.hashKeyEntity(resourceId, playerEntity);
    mineComponent.set(playerResourceEntity, mineComponent.getValue(playerResourceEntity) - resourceProductionOfMine);
  }

  function updateResourceProductionOnBuildPathFromMine(
    Uint256Component mineComponent, //writes to
    Uint256Component buildingComponent,
    Uint256Component tileComponent,
    uint256 playerEntity,
    uint256 fromEntity,
    uint256 toEntity
  ) internal {
    uint256 buildingId = tileComponent.getValue(fromEntity);
    uint256 buildingLevelEntity = LibEncode.hashKeyEntity(buildingId, buildingComponent.getValue(fromEntity));
    uint256 resourceId = LibTerrain.getTopLayerKey(LibEncode.decodeCoordEntity(fromEntity));
    uint256 playerResourceEntity = LibEncode.hashKeyEntity(resourceId, playerEntity);
    mineComponent.set(
      playerResourceEntity, //player resource production entity
      mineComponent.getValue(playerResourceEntity) + mineComponent.getValue(buildingLevelEntity) //current total resource production // resource production of mine
    );
  }
}
