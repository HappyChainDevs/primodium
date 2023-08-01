// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { PrimodiumSystem, IWorld, getAddressById, addressToEntity, entityToAddress } from "systems/internal/PrimodiumSystem.sol";
import { BuildingTypeComponent, ID as BuildingTypeComponentID } from "components/BuildingTypeComponent.sol";
import { PathComponent, ID as PathComponentID } from "components/PathComponent.sol";
import { LevelComponent, ID as LevelComponentID } from "components/LevelComponent.sol";
import { TotalProductionComponent, ID as TotalProductionComponentID } from "components/TotalProductionComponent.sol";
import { ProductionComponent, ID as ProductionComponentID, ResourceValue } from "components/ProductionComponent.sol";
import { LibMath } from "../libraries/LibMath.sol";
import { LibEncode } from "../libraries/LibEncode.sol";
import { LibUnclaimedResource } from "../libraries/LibUnclaimedResource.sol";
import { LibTerrain } from "../libraries/LibTerrain.sol";
import { LibResource } from "../libraries/LibResource.sol";

import { ID as BuildPathSystemID } from "./BuildPathSystem.sol";
import { IOnTwoEntitySubsystem } from "../interfaces/IOnTwoEntitySubsystem.sol";

uint256 constant ID = uint256(keccak256("system.BuildPathFromMineToMainBase"));

contract BuildPathFromMineToMainBaseSystem is IOnTwoEntitySubsystem, PrimodiumSystem {
  constructor(IWorld _world, address _components) PrimodiumSystem(_world, _components) {}

  function execute(bytes memory args) public override returns (bytes memory) {
    require(
      msg.sender == getAddressById(world.systems(), BuildPathSystemID),
      "PostUpgradeSystem: Only BuildSystem can call this function"
    );
    TotalProductionComponent mineProductionComponent = TotalProductionComponent(getC(TotalProductionComponentID));
    ProductionComponent productionComponent = ProductionComponent(getC(ProductionComponentID));

    (address playerAddress, uint256 fromBuildingEntity, uint256 toBuildingEntity) = abi.decode(
      args,
      (address, uint256, uint256)
    );
    uint256 playerEntity = addressToEntity(playerAddress);
    uint256 buildingId = BuildingTypeComponent(getC(BuildingTypeComponentID)).getValue(fromBuildingEntity);
    uint256 levelEntity = LibEncode.hashKeyEntity(
      buildingId,
      LevelComponent(getC(LevelComponentID)).getValue(fromBuildingEntity)
    );
    require(productionComponent.has(levelEntity), "Mine level entity not found");

    uint256 resourceId = productionComponent.getValue(levelEntity).resource;

    LibUnclaimedResource.updateResourceClaimed(world, playerEntity, resourceId);

    uint256 playerResourceEntity = LibEncode.hashKeyEntity(resourceId, playerEntity);
    LibResource.updateResourceProduction(
      world,
      playerResourceEntity,
      LibMath.getSafe(mineProductionComponent, playerResourceEntity) + productionComponent.getValue(levelEntity).value
    );

    PathComponent(getC(PathComponentID)).set(fromBuildingEntity, toBuildingEntity);

    return abi.encode(fromBuildingEntity);
  }

  function executeTyped(
    address playerAddress,
    uint256 fromBuildingEntity,
    uint256 toBuildingEntity
  ) public returns (bytes memory) {
    return execute(abi.encode(playerAddress, fromBuildingEntity, toBuildingEntity));
  }
}
