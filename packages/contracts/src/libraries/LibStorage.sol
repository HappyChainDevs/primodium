pragma solidity >=0.8.0;
// Production Buildings
import { LibMath } from "libraries/LibMath.sol";
import { LibEncode } from "libraries/LibEncode.sol";
import { Uint256Component } from "std-contracts/components/Uint256Component.sol";
import { Uint256ArrayComponent } from "std-contracts/components/Uint256ArrayComponent.sol";
import { BoolComponent } from "std-contracts/components/BoolComponent.sol";
import { entityToAddress } from "solecs/utils.sol";

library LibStorage {
  function getAvailableSpaceInStorageForResource(
    Uint256Component storageComponent,
    Uint256Component itemComponent,
    uint256 entity,
    uint256 resourceId
  ) internal view returns (uint256) {
    return
      getEntityStorageCapacityForResource(storageComponent, entity, resourceId) -
      LibMath.getSafeUint256Value(itemComponent, LibEncode.hashKeyEntity(resourceId, entity));
  }

  function getEntityStorageCapacityForResource(
    Uint256Component storageComponent,
    uint256 entity,
    uint256 resourceId
  ) internal view returns (uint256) {
    return LibMath.getSafeUint256Value(storageComponent, LibEncode.hashKeyEntity(resourceId, entity));
  }

  function addResourceToStorage(
    Uint256Component itemComponent,
    Uint256Component storageComponent,
    uint256 resourceId,
    uint256 resourceAmount,
    uint256 playerEntity
  ) internal returns (uint256) {
    uint256 playerResourceEntity = LibEncode.hashKeyEntity(resourceId, playerEntity);
    uint256 availableSpaceInPlayerStorage = getAvailableSpaceInStorageForResource(
      storageComponent,
      itemComponent,
      playerEntity,
      resourceId
    );
    if (availableSpaceInPlayerStorage > resourceAmount) {
      itemComponent.set(
        playerResourceEntity,
        LibMath.getSafeUint256Value(itemComponent, playerResourceEntity) + resourceAmount
      );
      return 0;
    } else {
      itemComponent.set(
        playerResourceEntity,
        LibMath.getSafeUint256Value(itemComponent, playerResourceEntity) + availableSpaceInPlayerStorage
      );
      return resourceAmount - availableSpaceInPlayerStorage;
    }
  }
}
