// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { IWorld } from "solecs/interfaces/IWorld.sol";
import { getAddressById } from "solecs/utils.sol";
import { SingletonID } from "solecs/SingletonID.sol";
// Production Buildings
import { Uint256Component } from "std-contracts/components/Uint256Component.sol";
import { Uint256ArrayComponent } from "std-contracts/components/Uint256ArrayComponent.sol";
import { IUint256Component } from "solecs/interfaces/IUint256Component.sol";
import { ItemComponent, ID as ItemComponentID } from "components/ItemComponent.sol";
import { RequiredResourcesComponent, ID as RequiredResourcesComponentID } from "components/RequiredResourcesComponent.sol";
import { RequiredResearchComponent, ID as RequiredResearchComponentID } from "components/RequiredResearchComponent.sol";
import { BuildingTypeComponent, ID as BuildingTypeComponentID } from "components/BuildingTypeComponent.sol";
import { MineProductionComponent, ID as MineProductionComponentID } from "components/MineProductionComponent.sol";
import { HasResearchedComponent, ID as HasResearchedComponentID } from "components/HasResearchedComponent.sol";
import { IgnoreBuildLimitComponent, ID as IgnoreBuildLimitComponentID } from "components/IgnoreBuildLimitComponent.sol";
import { MinesComponent, ID as MinesComponentID, ResourceValues } from "components/MinesComponent.sol";
import { ProductionComponent, ID as ProductionComponentID, ResourceValue } from "components/ProductionComponent.sol";
import { LevelComponent, ID as LevelComponentID } from "components/LevelComponent.sol";
import { MaxStorageComponent, ID as MaxStorageComponentID } from "components/MaxStorageComponent.sol";
import { MaxResourceStorageComponent, ID as MaxResourceStorageComponentID } from "components/MaxResourceStorageComponent.sol";
import { BlueprintComponent as BlueprintComponent, ID as BlueprintComponentID } from "components/BlueprintComponent.sol";
import { MaxLevelComponent, ID as MaxLevelComponentID } from "components/MaxLevelComponent.sol";
import { RequiredPassiveComponent, ID as RequiredPassiveComponentID } from "components/RequiredPassiveComponent.sol";
import { PassiveProductionComponent, ID as PassiveProductionComponentID } from "components/PassiveProductionComponent.sol";
import { IsDebugComponent, ID as IsDebugComponentID } from "components/IsDebugComponent.sol";
import { LibEncode } from "../libraries/LibEncode.sol";
import { LibSetRequiredResources } from "../libraries/LibSetRequiredResources.sol";
import { LibSetRequiredResourcesUpgrade } from "../libraries/LibSetRequiredResourcesUpgrade.sol";
import { LibSetMineBuildingProductionForLevel } from "../libraries/LibSetMineBuildingProductionForLevel.sol";
import { LibSetProductionForLevel } from "../libraries/LibSetProductionForLevel.sol";
import { LibSetFactoryMineRequirements } from "../libraries/LibSetFactoryMineRequirements.sol";

import "../prototypes.sol";
import { ResourceValue, ResourceValues } from "../types.sol";

// Research
import { LibSetBuildingReqs } from "../libraries/LibSetBuildingReqs.sol";
import { LibDebug } from "../libraries/LibDebug.sol";
import { LibBlueprint } from "../libraries/LibBlueprint.sol";

bool constant DEBUG = true;

// the purpose of this lib is to define and initialize debug buildings that can be used for testing
// so additions and removal of actual game design elements don't effect the already written tests
library LibDebugInitializer {
  function init(IWorld world) internal {
    //should only work if debug is enabled
    if (DEBUG) IsDebugComponent(getAddressById(world.components(), IsDebugComponentID)).set(SingletonID);

    initBlueprints(world);
    initializeSimpleBuildings(world);

    initializeMines(world);

    initializeFactories(world);

    initializeTechnologies(world);

    initializeStorageBuildings(world);
  }

  function initBlueprints(IWorld world) internal {
    BlueprintComponent blueprintComponent = BlueprintComponent(world.getComponent(BlueprintComponentID));
    int32[] memory coords = LibBlueprint.get1x1Blueprint();
    blueprintComponent.set(DebugSimpleBuildingNoReqsID, coords);
    blueprintComponent.set(DebugSimpleBuildingResourceReqsID, coords);
    blueprintComponent.set(DebugSimpleBuildingResearchReqsID, coords);
    blueprintComponent.set(DebugSimpleBuildingBuildLimitReq, coords);
    blueprintComponent.set(DebugSimpleBuildingTileReqID, coords);
    blueprintComponent.set(DebugSimpleBuildingWithUpgradeResourceReqsID, coords);
    blueprintComponent.set(DebugSimpleBuildingWithUpgradeResearchReqsID, coords);
    blueprintComponent.set(DebugIronMineID, coords);
    blueprintComponent.set(DebugCopperMineID, coords);
    blueprintComponent.set(DebugIronMineWithBuildLimitID, coords);
    blueprintComponent.set(DebugIronMineNoTileReqID, coords);
    blueprintComponent.set(DebugIronPlateFactoryNoMineReqID, coords);
    blueprintComponent.set(DebugIronPlateFactoryID, coords);
    blueprintComponent.set(DebugSuperIronMineID, coords);
    blueprintComponent.set(DebugSuperIronPlateFactoryID, coords);
    blueprintComponent.set(DebugSimpleTechnologyNoReqsID, coords);
    blueprintComponent.set(DebugSimpleTechnologyResourceReqsID, coords);
    blueprintComponent.set(DebugSimpleTechnologyResearchReqsID, coords);
    blueprintComponent.set(DebugSimpleTechnologyMainBaseLevelReqsID, coords);
    blueprintComponent.set(DebugStorageBuildingID, coords);

    blueprintComponent.set(DebugPassiveProductionBuilding, coords);
    blueprintComponent.set(DebugSimpleBuildingPassiveResourceRequirement, coords);
    blueprintComponent.set(DebugLithiumMineID, coords);
    blueprintComponent.set(DebugAlloyFactoryID, coords);
    blueprintComponent.set(DebugLithiumCopperOxideFactoryID, coords);
    blueprintComponent.set(DebugSolarPanelID, coords);
  }

  function initializeSimpleBuildings(IWorld world) internal {
    IUint256Component components = world.components();
    RequiredResearchComponent requiredResearchComponent = RequiredResearchComponent(
      getAddressById(components, RequiredResearchComponentID)
    );
    IgnoreBuildLimitComponent ignoreBuildLimitComponent = IgnoreBuildLimitComponent(
      getAddressById(components, IgnoreBuildLimitComponentID)
    );
    BuildingTypeComponent buildingTypeComponent = BuildingTypeComponent(
      getAddressById(components, BuildingTypeComponentID)
    );
    MaxLevelComponent maxLevelComponent = MaxLevelComponent(getAddressById(components, MaxLevelComponentID));

    RequiredPassiveComponent requiredPassiveComponent = RequiredPassiveComponent(
      getAddressById(components, RequiredPassiveComponentID)
    );
    ResourceValue[] memory resourceValues = new ResourceValue[](1);
    // DebugSimpleBuildingNoReqsID
    ignoreBuildLimitComponent.set(DebugSimpleBuildingNoReqsID);

    // DebugSimpleBuildingResourceReqsID
    uint256 entity = LibEncode.hashKeyEntity(DebugSimpleBuildingResourceReqsID, 1);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 100 });
    LibSetBuildingReqs.setResourceReqs(world, entity, resourceValues);

    // DebugSimpleBuildingResearchReqsID
    ignoreBuildLimitComponent.set(DebugSimpleBuildingResourceReqsID);
    entity = LibEncode.hashKeyEntity(DebugSimpleBuildingResearchReqsID, 1);
    requiredResearchComponent.set(entity, DebugSimpleTechnologyNoReqsID);

    // DebugSimpleBuildingTileReqID
    ignoreBuildLimitComponent.set(DebugSimpleBuildingTileReqID);
    buildingTypeComponent.set(DebugSimpleBuildingTileReqID, IronID);

    //DebugSimpleBuildingWithUpgradeResourceReqsID
    ignoreBuildLimitComponent.set(DebugSimpleBuildingWithUpgradeResourceReqsID);
    maxLevelComponent.set(DebugSimpleBuildingWithUpgradeResourceReqsID, 4);
    //DebugSimpleBuildingWithUpgradeResourceReqsID level 2
    entity = LibEncode.hashKeyEntity(DebugSimpleBuildingWithUpgradeResourceReqsID, 2);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 100 });
    LibSetBuildingReqs.setResourceReqs(world, entity, resourceValues);

    //DebugSimpleBuildingWithUpgradeResourceReqsID level 3
    entity = LibEncode.hashKeyEntity(DebugSimpleBuildingWithUpgradeResourceReqsID, 3);
    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 100 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 100 });
    LibSetBuildingReqs.setResourceReqs(world, entity, resourceValues);

    //DebugSimpleBuildingWithUpgradeResourceReqsID level 4
    entity = LibEncode.hashKeyEntity(DebugSimpleBuildingWithUpgradeResourceReqsID, 4);
    resourceValues = new ResourceValue[](3);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 100 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 100 });
    resourceValues[2] = ResourceValue({ resource: LithiumResourceItemID, value: 100 });
    LibSetBuildingReqs.setResourceReqs(world, entity, resourceValues);

    //DebugSimpleBuildingWithUpgradeResourceReqsID level 4
    entity = LibEncode.hashKeyEntity(DebugSimpleBuildingWithUpgradeResourceReqsID, 4);
    resourceValues = new ResourceValue[](4);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 100 });
    resourceValues[1] = ResourceValue({ resource: CopperResourceItemID, value: 100 });
    resourceValues[2] = ResourceValue({ resource: LithiumResourceItemID, value: 100 });
    resourceValues[3] = ResourceValue({ resource: OsmiumResourceItemID, value: 100 });
    LibSetBuildingReqs.setResourceReqs(world, entity, resourceValues);

    //DebugSimpleBuildingWithUpgradeResearchReqsID
    maxLevelComponent.set(DebugSimpleBuildingWithUpgradeResearchReqsID, 2);
    uint256 buildingIdLevel = LibEncode.hashKeyEntity(DebugSimpleBuildingWithUpgradeResearchReqsID, 2);
    requiredResearchComponent.set(buildingIdLevel, DebugSimpleTechnologyNoReqsID);

    //DebugSimpleBuildingPassiveResourceRequirement
    ignoreBuildLimitComponent.set(DebugSimpleBuildingPassiveResourceRequirement);
    // LEVEL 1
    entity = LibEncode.hashKeyEntity(DebugSimpleBuildingPassiveResourceRequirement, 1);
    ResourceValues memory requiredPassiveData = ResourceValues(new uint256[](1), new uint32[](1));
    requiredPassiveData.resources[0] = ElectricityPassiveResourceID;
    requiredPassiveData.values[0] = 2;
    requiredPassiveComponent.set(entity, requiredPassiveData);
  }

  function initializeMines(IWorld world) internal {
    IgnoreBuildLimitComponent ignoreBuildLimitComponent = IgnoreBuildLimitComponent(
      getAddressById(world.components(), IgnoreBuildLimitComponentID)
    );
    BuildingTypeComponent buildingTypeComponent = BuildingTypeComponent(
      getAddressById(world.components(), BuildingTypeComponentID)
    );
    MineProductionComponent mineProductionComponent = MineProductionComponent(
      getAddressById(world.components(), MineProductionComponentID)
    );
    MaxLevelComponent maxLevelComponent = MaxLevelComponent(getAddressById(world.components(), MaxLevelComponentID));

    // DebugIronMineID
    ignoreBuildLimitComponent.set(DebugIronMineID);
    buildingTypeComponent.set(DebugIronMineID, IronID);
    maxLevelComponent.set(DebugIronMineID, 3);

    uint256 entity = LibEncode.hashKeyEntity(DebugIronMineID, 1);
    mineProductionComponent.set(entity, 1);

    entity = LibEncode.hashKeyEntity(DebugIronMineID, 2);
    mineProductionComponent.set(entity, 2);
    entity = LibEncode.hashKeyEntity(DebugIronMineID, 3);
    mineProductionComponent.set(entity, 3);

    // DebugIronMineNoTileReqID
    ignoreBuildLimitComponent.set(DebugIronMineNoTileReqID);
    maxLevelComponent.set(DebugIronMineNoTileReqID, 3);
    entity = LibEncode.hashKeyEntity(DebugIronMineNoTileReqID, 1);
    mineProductionComponent.set(entity, 5);

    entity = LibEncode.hashKeyEntity(DebugIronMineNoTileReqID, 2);
    mineProductionComponent.set(entity, 7);

    entity = LibEncode.hashKeyEntity(DebugIronMineNoTileReqID, 3);
    mineProductionComponent.set(entity, 10);

    //DebugIronMineWithBuildLimitID
    maxLevelComponent.set(DebugIronMineWithBuildLimitID, 3);
    buildingTypeComponent.set(DebugIronMineWithBuildLimitID, IronID);

    entity = LibEncode.hashKeyEntity(DebugIronMineWithBuildLimitID, 1);
    mineProductionComponent.set(entity, 5);

    entity = LibEncode.hashKeyEntity(DebugIronMineWithBuildLimitID, 2);
    mineProductionComponent.set(entity, 7);

    entity = LibEncode.hashKeyEntity(DebugIronMineWithBuildLimitID, 3);
    mineProductionComponent.set(entity, 10);

    //DebugCopperMineID
    maxLevelComponent.set(DebugCopperMineID, 3);
    buildingTypeComponent.set(DebugCopperMineID, CopperID);
    ignoreBuildLimitComponent.set(DebugCopperMineID);

    ResourceValue[] memory resourceValues = new ResourceValue[](1);

    entity = LibEncode.hashKeyEntity(DebugCopperMineID, 1);
    resourceValues[0] = ResourceValue({ resource: CopperResourceItemID, value: 1000 });
    LibSetBuildingReqs.setResourceReqs(world, entity, resourceValues);
    mineProductionComponent.set(entity, 3);

    entity = LibEncode.hashKeyEntity(DebugCopperMineID, 2);
    mineProductionComponent.set(entity, 5);

    entity = LibEncode.hashKeyEntity(DebugCopperMineID, 3);
    mineProductionComponent.set(entity, 7);

    maxLevelComponent.set(DebugLithiumMineID, 3);
    buildingTypeComponent.set(DebugLithiumMineID, LithiumID);
    ignoreBuildLimitComponent.set(DebugLithiumMineID);

    entity = LibEncode.hashKeyEntity(DebugLithiumMineID, 1);
    resourceValues[0] = ResourceValue({ resource: CopperResourceItemID, value: 1000 });
    LibSetBuildingReqs.setResourceReqs(world, entity, resourceValues);
    mineProductionComponent.set(entity, 3);

    entity = LibEncode.hashKeyEntity(DebugLithiumMineID, 2);
    mineProductionComponent.set(entity, 5);

    entity = LibEncode.hashKeyEntity(DebugLithiumMineID, 3);
    mineProductionComponent.set(entity, 7);
  }

  function initializeFactories(IWorld world) internal {
    IUint256Component components = world.components();

    IgnoreBuildLimitComponent ignoreBuildLimitComponent = IgnoreBuildLimitComponent(
      getAddressById(components, IgnoreBuildLimitComponentID)
    );

    MaxLevelComponent maxLevelComponent = MaxLevelComponent(getAddressById(components, MaxLevelComponentID));
    MinesComponent minesComponent = MinesComponent(getAddressById(components, MinesComponentID));
    ProductionComponent productionComponent = ProductionComponent(getAddressById(components, ProductionComponentID));

    PassiveProductionComponent passiveProductionComponent = PassiveProductionComponent(
      getAddressById(components, PassiveProductionComponentID)
    );
    //DebugIronPlateFactoryNoMineReqID
    uint256 entity = DebugIronPlateFactoryNoMineReqID;
    maxLevelComponent.set(entity, 3);
    ignoreBuildLimitComponent.set(entity);

    //set a storage amount for IronPlateCraftedItemID to stream line usage
    entity = LibEncode.hashKeyEntity(DebugIronPlateFactoryNoMineReqID, 1);
    ResourceValue[] memory resourceValues = new ResourceValue[](1);

    resourceValues[0] = ResourceValue({ resource: IronPlateCraftedItemID, value: 1000 });
    LibSetBuildingReqs.setResourceReqs(world, entity, resourceValues);

    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: DebugIronPlateFactoryNoMineReqID, value: 1 });
    resourceValues[1] = ResourceValue({ resource: IronPlateCraftedItemID, value: 2 });
    LibSetBuildingReqs.setStorageUpgrades(world, entity, resourceValues);

    entity = LibEncode.hashKeyEntity(DebugIronPlateFactoryNoMineReqID, 2);
    resourceValues[0] = ResourceValue({ resource: DebugIronPlateFactoryNoMineReqID, value: 2 });
    resourceValues[1] = ResourceValue({ resource: IronPlateCraftedItemID, value: 4 });
    LibSetBuildingReqs.setStorageUpgrades(world, entity, resourceValues);

    entity = LibEncode.hashKeyEntity(DebugIronPlateFactoryNoMineReqID, 3);
    resourceValues[0] = ResourceValue({ resource: DebugIronPlateFactoryNoMineReqID, value: 3 });
    resourceValues[1] = ResourceValue({ resource: IronPlateCraftedItemID, value: 6 });
    LibSetBuildingReqs.setStorageUpgrades(world, entity, resourceValues);

    //DebugIronPlateFactoryID

    ignoreBuildLimitComponent.set(DebugIronPlateFactoryID);
    maxLevelComponent.set(DebugIronPlateFactoryID, 3);
    //DebugIronPlateFactoryID level 1
    entity = LibEncode.hashKeyEntity(DebugIronPlateFactoryID, 1);
    resourceValues = new ResourceValue[](1);

    resourceValues[0] = ResourceValue({ resource: IronPlateCraftedItemID, value: 1000 });
    LibSetBuildingReqs.setResourceReqs(world, entity, resourceValues);

    ResourceValues memory requiredMines = ResourceValues(new uint256[](1), new uint32[](1));
    requiredMines.resources[0] = IronMineID;
    requiredMines.values[0] = 1;
    minesComponent.set(entity, requiredMines);

    productionComponent.set(entity, ResourceValue({ resource: IronPlateCraftedItemID, value: 2 }));

    //DebugIronPlateFactoryID level 2
    entity = LibEncode.hashKeyEntity(DebugIronPlateFactoryID, 2);
    requiredMines.resources[0] = DebugIronMineID;
    requiredMines.values[0] = 1;
    minesComponent.set(entity, requiredMines);

    productionComponent.set(entity, ResourceValue({ resource: IronPlateCraftedItemID, value: 4 }));

    //DebugIronPlateFactoryID level 3
    entity = LibEncode.hashKeyEntity(DebugIronPlateFactoryID, 3);
    requiredMines.resources[0] = DebugIronMineID;
    requiredMines.values[0] = 2;
    minesComponent.set(entity, requiredMines);

    productionComponent.set(entity, ResourceValue({ resource: IronPlateCraftedItemID, value: 6 }));

    //DebugPassiveProductionBuilding
    ignoreBuildLimitComponent.set(DebugPassiveProductionBuilding);
    passiveProductionComponent.set(DebugPassiveProductionBuilding, ResourceValue(ElectricityPassiveResourceID, 10));

    //DebugAlloyFactoryID
    ignoreBuildLimitComponent.set(DebugAlloyFactoryID);

    //DebugAlloyFactoryID level 1
    entity = LibEncode.hashKeyEntity(DebugAlloyFactoryID, 1);
    resourceValues[0] = ResourceValue({ resource: AlloyCraftedItemID, value: 1000 });
    LibSetBuildingReqs.setResourceReqs(world, entity, resourceValues);

    requiredMines = ResourceValues(new uint256[](2), new uint32[](2));
    requiredMines.resources[0] = DebugIronMineID;
    requiredMines.values[0] = 1;
    requiredMines.resources[0] = DebugCopperMineID;
    requiredMines.values[0] = 1;

    minesComponent.set(entity, requiredMines);

    productionComponent.set(entity, ResourceValue({ resource: AlloyCraftedItemID, value: 1 }));

    //LithiumCopperOxideFactoryID

    ignoreBuildLimitComponent.set(LithiumCopperOxideFactoryID);
    //LithiumCopperOxideFactoryID level 1
    entity = LibEncode.hashKeyEntity(LithiumCopperOxideFactoryID, 1);
    resourceValues[0] = ResourceValue({ resource: LithiumCopperOxideCraftedItemID, value: 1000 });
    LibSetBuildingReqs.setResourceReqs(world, entity, resourceValues);

    requiredMines = ResourceValues(new uint256[](2), new uint32[](2));
    requiredMines.resources[0] = DebugLithiumMineID;
    requiredMines.values[0] = 1;
    requiredMines.resources[0] = DebugCopperMineID;
    requiredMines.values[0] = 1;

    minesComponent.set(entity, requiredMines);

    productionComponent.set(entity, ResourceValue({ resource: LithiumCopperOxideCraftedItemID, value: 2 }));

    //DebugSolarPanelID
    ignoreBuildLimitComponent.set(DebugSolarPanelID);
    passiveProductionComponent.set(DebugSolarPanelID, ResourceValue(ElectricityPassiveResourceID, 10));
  }

  function initializeTechnologies(IWorld world) internal {
    HasResearchedComponent hasResearchedComponent = HasResearchedComponent(
      world.getComponent(HasResearchedComponentID)
    );
    RequiredResearchComponent requiredResearchComponent = RequiredResearchComponent(
      world.getComponent(RequiredResearchComponentID)
    );
    LevelComponent levelComponent = LevelComponent(world.getComponent(LevelComponentID));
    // DebugSimpleTechnologyNoReqsID
    hasResearchedComponent.set(DebugSimpleTechnologyNoReqsID);

    //DebugSimpleTechnologyResearchReqsID
    requiredResearchComponent.set(DebugSimpleTechnologyResearchReqsID, DebugSimpleTechnologyNoReqsID);
    hasResearchedComponent.set(DebugSimpleTechnologyResearchReqsID);
    //DebugSimpleTechnologyResourceReqsID
    hasResearchedComponent.set(DebugSimpleTechnologyResourceReqsID);
    /****************** Required Resources *******************/
    uint256 techLevel1Entity = LibEncode.hashKeyEntity(DebugSimpleTechnologyResourceReqsID, 1);

    ResourceValue[] memory resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: LithiumCopperOxideCraftedItemID, value: 500 });

    LibSetBuildingReqs.setResourceReqs(world, techLevel1Entity, resourceValues);

    //DebugSimpleTechnologyMainBaseLevelReqsID
    hasResearchedComponent.set(DebugSimpleTechnologyMainBaseLevelReqsID);
    levelComponent.set(DebugSimpleTechnologyMainBaseLevelReqsID, 2);
  }

  function initializeStorageBuildings(IWorld world) internal {
    IgnoreBuildLimitComponent ignoreBuildLimitComponent = IgnoreBuildLimitComponent(
      world.getComponent(IgnoreBuildLimitComponentID)
    );
    MaxLevelComponent maxLevelComponent = MaxLevelComponent(world.getComponent(MaxLevelComponentID));
    //DebugStorageBuildingID
    ignoreBuildLimitComponent.set(DebugStorageBuildingID);
    maxLevelComponent.set(DebugStorageBuildingID, 2);
    //DebugStorageBuildingID level 1
    uint256 buildingIdLevel = LibEncode.hashKeyEntity(DebugStorageBuildingID, 1);

    ResourceValue[] memory resourceValues = new ResourceValue[](1);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 200 });

    LibSetBuildingReqs.setStorageUpgrades(world, buildingIdLevel, resourceValues);
    //DebugStorageBuildingID level 2

    resourceValues = new ResourceValue[](2);
    resourceValues[0] = ResourceValue({ resource: IronResourceItemID, value: 200 });
    resourceValues[0] = ResourceValue({ resource: CopperResourceItemID, value: 200 });

    buildingIdLevel = LibEncode.hashKeyEntity(DebugStorageBuildingID, 2);
    LibSetBuildingReqs.setStorageUpgrades(world, buildingIdLevel, resourceValues);
  }
}
