// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { System, IWorld } from "solecs/System.sol";
import { getAddressById, addressToEntity, entityToAddress } from "solecs/utils.sol";
import { PositionComponent, ID as PositionComponentID } from "components/PositionComponent.sol";
import { TileComponent, ID as TileComponentID } from "components/TileComponent.sol";
import { OwnedByComponent, ID as OwnedByComponentID } from "components/OwnedByComponent.sol";
import { BuildingComponent, ID as BuildingComponentID } from "components/BuildingComponent.sol";
import { RequiredResearchComponent, ID as RequiredResearchComponentID } from "components/RequiredResearchComponent.sol";
import { RequiredResourcesComponent, ID as RequiredResourcesComponentID } from "components/RequiredResourcesComponent.sol";

import { LastBuiltAtComponent, ID as LastBuiltAtComponentID } from "components/LastBuiltAtComponent.sol";

import { ResearchComponent, ID as ResearchComponentID } from "components/ResearchComponent.sol";
import { ItemComponent, ID as ItemComponentID } from "components/ItemComponent.sol";
// debug buildings
import { PlatingFactoryID,MainBaseID, DebugNodeID, MinerID, LithiumMinerID, BulletFactoryID, DebugPlatingFactoryID, SiloID } from "../prototypes/Tiles.sol";

import { MainBaseInitializedComponent, ID as MainBaseInitializedComponentID } from "components/MainBaseInitializedComponent.sol";



import { Coord } from "../types.sol";
import { LibBuild } from "../libraries/LibBuild.sol";
import { LibResearch } from "../libraries/LibResearch.sol";
import { LibEncode } from "../libraries/LibEncode.sol";
import { LibDebug } from "../libraries/LibDebug.sol";
import { LibBuilding } from "../libraries/LibBuilding.sol";
import { LibResourceCost } from "../libraries/LibResourceCost.sol";

uint256 constant ID = uint256(keccak256("system.Build"));

contract BuildSystem is System {
  constructor(IWorld _world, address _components) System(_world, _components) {}

 

  function checkResearchRequirements(uint256 blockType, address player) internal view returns (bool) {
    RequiredResearchComponent requiredResearchComponent = RequiredResearchComponent(getAddressById(components, RequiredResearchComponentID));
    ResearchComponent researchComponent = ResearchComponent(getAddressById(components, ResearchComponentID));
    return !requiredResearchComponent.has(blockType) || LibResearch.hasResearchedWithKey(researchComponent,
      requiredResearchComponent.getValue(blockType),addressToEntity(player));
  }

  function checkResourceRequirements(uint256 blockType, address player) internal view returns (bool) {
    RequiredResourcesComponent requiredResourcesComponent = RequiredResourcesComponent(getAddressById(components, RequiredResourcesComponentID));
    ItemComponent itemComponent = ItemComponent(getAddressById(components, ItemComponentID));
    return LibResourceCost.hasRequiredResources(requiredResourcesComponent, itemComponent,
     blockType, player);
  }

  function spendRequiredResources(uint256 blockType, address player) internal {
    RequiredResourcesComponent requiredResourcesComponent = RequiredResourcesComponent(getAddressById(components, RequiredResourcesComponentID));
    ItemComponent itemComponent = ItemComponent(getAddressById(components, ItemComponentID));
    LibResourceCost.spendRequiredResources(requiredResourcesComponent, itemComponent,blockType,player);
  }

  function execute(bytes memory args) public returns (bytes memory) {
    (uint256 blockType, Coord memory coord) = abi.decode(args, (uint256, Coord));
    PositionComponent positionComponent = PositionComponent(getAddressById(components, PositionComponentID));
    TileComponent tileComponent = TileComponent(getAddressById(components, TileComponentID));
    OwnedByComponent ownedByComponent = OwnedByComponent(getAddressById(components, OwnedByComponentID));
    BuildingComponent buildingComponent = BuildingComponent(getAddressById(components, BuildingComponentID));
    LastBuiltAtComponent lastBuiltAtComponent = LastBuiltAtComponent(
      getAddressById(components, LastBuiltAtComponentID)
    );
    
    // Check there isn't another tile there
    uint256[] memory entitiesAtPosition = positionComponent.getEntitiesWithValue(coord);
    require(entitiesAtPosition.length == 0, "[BuildSystem] Cannot build on a non-empty coordinate");

    //check required research
    require(checkResearchRequirements(blockType, msg.sender),
      "[BuildSystem] You have not researched the required Technology");

    
    //check required resources
    require(checkResourceRequirements(blockType, msg.sender), "[BuildSystem] You do not have the required resources");

    
<<<<<<< HEAD
    if(LibBuilding.doesTileCountTowardsBuildingLimit(blockType))
=======

    //check if counts towards build limit and if so, check if limit is reached
    if(LibBuilding.isBuilding(blockType))
>>>>>>> alireza/move-gamedesign-to-components
    {
        require(LibBuilding.checkBuildCountLimit(buildingComponent, ownedByComponent, tileComponent, addressToEntity(msg.sender)), "[BuildSystem] build limit reached. upgrade main building or destroy other buildings");
    }

   

    // Check if the player has enough resources to build
    // debug buildings are free:  DebugNodeID, MinerID, LithiumMinerID, BulletFactoryID, SiloID
    //  MainBaseID has a special condition called MainBaseInitialized, so that each wallet only has one MainBase
    if (
      blockType == DebugNodeID ||
      blockType == MinerID ||
      blockType == LithiumMinerID ||
      blockType == BulletFactoryID ||
      blockType == DebugPlatingFactoryID ||
      blockType == SiloID
    ) {
      // debug buildings, do nothing
      if (!LibDebug.isDebug()) {
        revert("[BuildSystem] Debug buildings are not allowed to be built");
      }
    } else if (blockType == MainBaseID) {
      MainBaseInitializedComponent mainBaseInitializedComponent = MainBaseInitializedComponent(
        getAddressById(components, MainBaseInitializedComponentID)
      );

      if (mainBaseInitializedComponent.has(addressToEntity(msg.sender))) {
        revert("[BuildSystem] Cannot build more than one main base per wallet");
      } else {
        mainBaseInitializedComponent.set(addressToEntity(msg.sender), coord);
      }
    }
     
    //spend required resources
    spendRequiredResources(blockType, msg.sender);
   
    // Randomly generate IDs instead of basing on coordinate
    uint256 newBlockEntity = world.getUniqueEntityId();

    // Standardize storing uint256 as uint160 because entity IDs are converted to addresses before hashing
    uint256 blockEntity = addressToEntity(entityToAddress(newBlockEntity));
    if(LibBuilding.doesTileCountTowardsBuildingLimit(blockType) || blockType == MainBaseID)
    {
      buildingComponent.set(blockEntity, 1);
    }
    
    positionComponent.set(blockEntity, coord);
    tileComponent.set(blockEntity, blockType);
    ownedByComponent.set(blockEntity, addressToEntity(msg.sender));
    lastBuiltAtComponent.set(blockEntity, block.number);

    return abi.encode(blockEntity);
  }

  function executeTyped(uint256 blockType, Coord memory coord) public returns (bytes memory) {
    return execute(abi.encode(blockType, coord));
  }
}
