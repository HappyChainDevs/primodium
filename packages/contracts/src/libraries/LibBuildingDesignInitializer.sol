// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { IWorld } from "solecs/interfaces/IWorld.sol";
import { getAddressById } from "solecs/utils.sol";
// Production Buildings
import { Uint256Component } from "std-contracts/components/Uint256Component.sol";
import { Uint256ArrayComponent } from "std-contracts/components/Uint256ArrayComponent.sol";
import { IUint256Component } from "solecs/interfaces/IUint256Component.sol";
import { ItemComponent, ID as ItemComponentID } from "components/ItemComponent.sol";
import { RequiredResourcesComponent, ID as RequiredResourcesComponentID } from "components/RequiredResourcesComponent.sol";
import { RequiredResearchComponent, ID as RequiredResearchComponentID } from "components/RequiredResearchComponent.sol";
import { RequiredTileComponent, ID as TileComponentID } from "components/RequiredTileComponent.sol";
import { MineComponent, ID as MineComponentID } from "components/MineComponent.sol";

import { StorageCapacityComponent, ID as StorageCapacityComponentID } from "components/StorageCapacityComponent.sol";
import { StorageCapacityResourcesComponent, ID as StorageCapacityResourcesComponentID } from "components/StorageCapacityResourcesComponent.sol";
import { FactoryMineBuildingsComponent, ID as FactoryMineBuildingsComponentID } from "components/FactoryMineBuildingsComponent.sol";
import { FactoryProductionComponent, ID as FactoryProductionComponentID, FactoryProductionData } from "components/FactoryProductionComponent.sol";

import { MaxLevelComponent, ID as MaxLevelComponentID } from "components/MaxLevelComponent.sol";

import { MainBaseID } from "../prototypes/Tiles.sol";
import { LibEncode } from "../libraries/LibEncode.sol";
import { LibSetRequiredResources } from "../libraries/LibSetRequiredResources.sol";
import { LibSetFactoryMineRequirements } from "../libraries/LibSetFactoryMineRequirements.sol";
import { LibSetFactoryProductionForLevel } from "../libraries/LibSetFactoryProductionForLevel.sol";
import { LibSetUpgradeResearchRequirements } from "../libraries/LibSetUpgradeResearchRequirements.sol";
import { LibSetRequiredResourcesUpgrade } from "../libraries/LibSetRequiredResourcesUpgrade.sol";

// Items
import { ElectricityPassiveResourceID, BolutiteResourceItemID, CopperResourceItemID, IridiumResourceItemID, IronResourceItemID, KimberliteResourceItemID, LithiumResourceItemID, OsmiumResourceItemID, TitaniumResourceItemID, TungstenResourceItemID, UraniniteResourceItemID, IronPlateCraftedItemID, AlloyCraftedItemID, LithiumCopperOxideCraftedItemID, SpaceFuelCraftedItemID } from "../prototypes/Keys.sol";

import { IronMine2ResearchID, IronMine3ResearchID, IronMine4ResearchID } from "../prototypes/Keys.sol";
import { CopperMineResearchID, CopperMine2ResearchID, CopperMine3ResearchID } from "../prototypes/Keys.sol";
import { LithiumMineResearchID, LithiumMine2ResearchID, LithiumMine3ResearchID } from "../prototypes/Keys.sol";
import { StorageUnitResearchID, StorageUnit2ResearchID, StorageUnit3ResearchID } from "../prototypes/Keys.sol";
import { IronPlateFactoryResearchID, IronPlateFactory2ResearchID, IronPlateFactory3ResearchID } from "../prototypes/Keys.sol";
import { AlloyFactoryResearchID, AlloyFactory2ResearchID, AlloyFactory3ResearchID } from "../prototypes/Keys.sol";
import { LithiumCopperOxideFactoryResearchID, LithiumCopperOxideFactory2ResearchID, LithiumCopperOxideFactory3ResearchID } from "../prototypes/Keys.sol";
import { SpaceFuelFactoryResearchID, SpaceFuelFactory2ResearchID, SpaceFuelFactory3ResearchID } from "../prototypes/Keys.sol";
import { SolarPanelResearchID, SolarPanel2ResearchID, SolarPanel3ResearchID } from "../prototypes/Keys.sol";

import { IronMineID, CopperMineID, LithiumMineID } from "../prototypes/Tiles.sol";
import { IronPlateFactoryID, AlloyFactoryID, LithiumCopperOxideFactoryID } from "../prototypes/Tiles.sol";
import { StorageUnitID } from "../prototypes/Tiles.sol";

library LibBuildingDesignInitializer {
  function initIronMine(
    ItemComponent itemComponent,
    RequiredTileComponent requiredTileComponent,
    MineComponent mineComponent,
    MaxLevelComponent maxLevelComponent,
    RequiredResearchComponent requiredResearch,
    RequiredResourcesComponent requiredResources
  ) internal {
    //IronMineID
    requiredTileComponent.set(IronMineID, IronResourceItemID);
    maxLevelComponent.set(IronMineID, 3);
    //IronMineID Level 1
    uint256 buildingIdLevel = LibEncode.hashKeyEntity(IronMineID, 1);
    mineComponent.set(buildingIdLevel, 5);

    //IronMineID Level 2
    buildingIdLevel = LibEncode.hashKeyEntity(IronMineID, 2);
    mineComponent.set(buildingIdLevel, 7);
    requiredResearch.set(buildingIdLevel, IronMine2ResearchID);
    LibSetRequiredResourcesUpgrade.set1RequiredResourcesForEntityUpgradeToLevel(
      requiredResources,
      itemComponent,
      IronMineID,
      CopperResourceItemID,
      300,
      2
    );

    //IronMineID Level 3
    buildingIdLevel = LibEncode.hashKeyEntity(IronMineID, 3);
    mineComponent.set(buildingIdLevel, 4);
    requiredResearch.set(buildingIdLevel, IronMine3ResearchID);
    LibSetRequiredResourcesUpgrade.set1RequiredResourcesForEntityUpgradeToLevel(
      requiredResources,
      itemComponent,
      IronMineID,
      CopperResourceItemID,
      1000,
      3
    );
  }

  function initCopperMine(
    ItemComponent itemComponent,
    RequiredTileComponent requiredTileComponent,
    MineComponent mineComponent,
    MaxLevelComponent maxLevelComponent,
    RequiredResearchComponent requiredResearch,
    RequiredResourcesComponent requiredResources
  ) internal {
    //CopperMineID
    requiredTileComponent.set(CopperMineID, CopperResourceItemID);
    requiredResearch.set(CopperMineID, CopperMineResearchID);
    maxLevelComponent.set(CopperMineID, 3);

    //CopperMineID Level 1
    uint256 buildingIdLevel = LibEncode.hashKeyEntity(CopperMineID, 1);
    mineComponent.set(buildingIdLevel, 2);
    requiredResearch.set(buildingIdLevel, CopperMineResearchID);
    LibSetRequiredResources.set1RequiredResourceForEntity(
      requiredResources,
      itemComponent,
      CopperMineID,
      IronResourceItemID,
      500
    );

    //CopperMineID Level 2
    buildingIdLevel = LibEncode.hashKeyEntity(CopperMineID, 2);
    mineComponent.set(buildingIdLevel, 4);
    requiredResearch.set(buildingIdLevel, CopperMine2ResearchID);
    LibSetRequiredResourcesUpgrade.set1RequiredResourcesForEntityUpgradeToLevel(
      requiredResources,
      itemComponent,
      CopperMineID,
      IronPlateCraftedItemID,
      300,
      2
    );

    //CopperMineID Level 3
    buildingIdLevel = LibEncode.hashKeyEntity(CopperMineID, 3);
    mineComponent.set(buildingIdLevel, 6);
    requiredResearch.set(buildingIdLevel, CopperMine3ResearchID);
    LibSetRequiredResourcesUpgrade.set1RequiredResourcesForEntityUpgradeToLevel(
      requiredResources,
      itemComponent,
      CopperMineID,
      IronPlateCraftedItemID,
      1000,
      3
    );
  }

  function initLithiumMine(
    ItemComponent itemComponent,
    RequiredTileComponent requiredTileComponent,
    MineComponent mineComponent,
    MaxLevelComponent maxLevelComponent,
    RequiredResearchComponent requiredResearch,
    RequiredResourcesComponent requiredResources
  ) internal {
    //LithiumMineID
    requiredTileComponent.set(LithiumMineID, CopperResourceItemID);
    requiredResearch.set(LithiumMineID, LithiumMineResearchID);
    maxLevelComponent.set(LithiumMineID, 3);
    //LithiumMineID Level 1
    uint256 buildingIdLevel = LibEncode.hashKeyEntity(LithiumMineID, 1);
    mineComponent.set(buildingIdLevel, 2);
    requiredResearch.set(buildingIdLevel, LithiumMineResearchID);
    LibSetRequiredResources.set1RequiredResourceForEntity(
      requiredResources,
      itemComponent,
      LithiumMineID,
      IronResourceItemID,
      500
    );

    //LithiumMineID Level 2
    buildingIdLevel = LibEncode.hashKeyEntity(LithiumMineID, 2);
    mineComponent.set(buildingIdLevel, 3);
    requiredResearch.set(buildingIdLevel, LithiumMine2ResearchID);
    LibSetRequiredResourcesUpgrade.set1RequiredResourcesForEntityUpgradeToLevel(
      requiredResources,
      itemComponent,
      LithiumMineID,
      IronPlateCraftedItemID,
      300,
      2
    );

    //LithiumMineID Level 3
    buildingIdLevel = LibEncode.hashKeyEntity(LithiumMineID, 3);
    mineComponent.set(buildingIdLevel, 5);
    requiredResearch.set(buildingIdLevel, LithiumMine3ResearchID);
    LibSetRequiredResourcesUpgrade.set1RequiredResourcesForEntityUpgradeToLevel(
      requiredResources,
      itemComponent,
      LithiumMineID,
      IronPlateCraftedItemID,
      1000,
      3
    );
  }

  function initStorageUnit(
    ItemComponent itemComponent,
    StorageCapacityResourcesComponent storageCapacityResourcesComponent,
    StorageCapacityComponent storageCapacityComponent,
    MaxLevelComponent maxLevelComponent,
    RequiredResearchComponent requiredResearch,
    RequiredResourcesComponent requiredResources
  ) internal {
    //StorageUnitID
    maxLevelComponent.set(StorageUnitID, 3);
    requiredResearch.set(StorageUnitID, StorageUnitResearchID);
    LibSetRequiredResources.set1RequiredResourceForEntity(
      requiredResources,
      itemComponent,
      StorageUnitID,
      IronResourceItemID,
      500
    );
    //StorageUnitID Level 1
    uint256 buildingIdLevel = LibEncode.hashKeyEntity(StorageUnitID, 1);
    //storage increase
    LibSetRequiredResources.set2RequiredResourcesForEntity(
      storageCapacityResourcesComponent,
      storageCapacityComponent,
      buildingIdLevel,
      IronResourceItemID,
      1000,
      CopperResourceItemID,
      1000
    );

    //StorageUnitID Level 2
    buildingIdLevel = LibEncode.hashKeyEntity(StorageUnitID, 2);
    requiredResearch.set(buildingIdLevel, StorageUnit2ResearchID);
    LibSetRequiredResources.set1RequiredResourceForEntity(
      requiredResources,
      itemComponent,
      buildingIdLevel,
      IronPlateCraftedItemID,
      400
    );
    //storage increase
    LibSetRequiredResources.set3RequiredResourcesForEntity(
      storageCapacityResourcesComponent,
      storageCapacityComponent,
      buildingIdLevel,
      IronResourceItemID,
      2000,
      CopperResourceItemID,
      2000,
      IronPlateCraftedItemID,
      1000
    );

    //StorageUnitID Level 3
    buildingIdLevel = LibEncode.hashKeyEntity(StorageUnitID, 3);
    requiredResearch.set(buildingIdLevel, StorageUnit3ResearchID);
    LibSetRequiredResources.set1RequiredResourceForEntity(
      requiredResources,
      itemComponent,
      buildingIdLevel,
      IronPlateCraftedItemID,
      1000
    );
    //storage increase
    LibSetRequiredResources.set4RequiredResourcesForEntity(
      storageCapacityResourcesComponent,
      storageCapacityComponent,
      buildingIdLevel,
      IronResourceItemID,
      2000,
      CopperResourceItemID,
      2000,
      IronPlateCraftedItemID,
      1000,
      LithiumResourceItemID,
      1000
    );
  }

  function initIronPlateFactory(
    ItemComponent itemComponent,
    FactoryMineBuildingsComponent factoryMineBuildingsComponent,
    FactoryProductionComponent factoryProductionComponent,
    MaxLevelComponent maxLevelComponent,
    RequiredResearchComponent requiredResearch,
    RequiredResourcesComponent requiredResources
  ) internal {
    //IronPlateFactoryID
    maxLevelComponent.set(IronPlateFactoryID, 3);

    requiredResearch.set(IronPlateFactoryID, IronPlateFactoryResearchID);
    LibSetRequiredResources.set1RequiredResourceForEntity(
      requiredResources,
      itemComponent,
      IronPlateFactoryID,
      CopperResourceItemID,
      1000
    );
    //IronPlateFactoryID Level 1
    uint256 buildingIdLevel = LibEncode.hashKeyEntity(IronPlateFactoryID, 1);
    //required Mines
    LibSetFactoryMineRequirements.setFactory1MineRequirement(
      factoryMineBuildingsComponent,
      IronPlateFactoryID,
      1,
      IronMineID,
      1
    );
    // production
    LibSetFactoryProductionForLevel.setFactoryProductionForLevel(
      factoryProductionComponent,
      IronPlateFactoryID,
      1,
      IronPlateCraftedItemID,
      2
    );

    //IronPlateFactoryID Level 2
    buildingIdLevel = LibEncode.hashKeyEntity(IronPlateFactoryID, 2);
    requiredResearch.set(buildingIdLevel, IronPlateFactory2ResearchID);
    LibSetRequiredResources.set1RequiredResourceForEntity(
      requiredResources,
      itemComponent,
      buildingIdLevel,
      CopperResourceItemID,
      3000
    );

    //required Mines
    LibSetFactoryMineRequirements.setFactory1MineRequirement(
      factoryMineBuildingsComponent,
      IronPlateFactoryID,
      2,
      IronMineID,
      1
    );

    // production
    LibSetFactoryProductionForLevel.setFactoryProductionForLevel(
      factoryProductionComponent,
      IronPlateFactoryID,
      2,
      IronPlateCraftedItemID,
      3
    );

    //IronPlateFactoryID Level 3
    buildingIdLevel = LibEncode.hashKeyEntity(IronPlateFactoryID, 3);
    requiredResearch.set(buildingIdLevel, IronPlateFactory3ResearchID);
    LibSetRequiredResources.set1RequiredResourceForEntity(
      requiredResources,
      itemComponent,
      buildingIdLevel,
      CopperResourceItemID,
      10000
    );

    //required Mines
    LibSetFactoryMineRequirements.setFactory1MineRequirement(
      factoryMineBuildingsComponent,
      IronPlateFactoryID,
      3,
      IronMineID,
      2
    );

    // production
    LibSetFactoryProductionForLevel.setFactoryProductionForLevel(
      factoryProductionComponent,
      IronPlateFactoryID,
      3,
      IronPlateCraftedItemID,
      4
    );
  }

  //wip
  function initAlloyFactory(
    ItemComponent itemComponent,
    FactoryMineBuildingsComponent factoryMineBuildingsComponent,
    FactoryProductionComponent factoryProductionComponent,
    MaxLevelComponent maxLevelComponent,
    RequiredResearchComponent requiredResearch,
    RequiredResourcesComponent requiredResources
  ) internal {
    //AlloyFactoryID
    maxLevelComponent.set(AlloyFactoryID, 3);

    requiredResearch.set(AlloyFactoryID, AlloyFactoryResearchID);
    LibSetRequiredResources.set2RequiredResourcesForEntity(
      requiredResources,
      itemComponent,
      AlloyFactoryID,
      IronPlateCraftedItemID,
      800,
      CopperResourceItemID,
      1500
    );
    //AlloyFactoryID Level 1
    uint256 buildingIdLevel = LibEncode.hashKeyEntity(AlloyFactoryID, 1);
    //required Mines
    LibSetFactoryMineRequirements.setFactory2MineRequirement(
      factoryMineBuildingsComponent,
      AlloyFactoryID,
      1,
      IronMineID,
      1,
      CopperMineID,
      1
    );
    // production
    LibSetFactoryProductionForLevel.setFactoryProductionForLevel(
      factoryProductionComponent,
      AlloyFactoryID,
      1,
      AlloyCraftedItemID,
      1
    );

    //AlloyFactoryID Level 2
    buildingIdLevel = LibEncode.hashKeyEntity(AlloyFactoryID, 2);
    requiredResearch.set(buildingIdLevel, AlloyFactoryResearchID);
    LibSetRequiredResources.set2RequiredResourcesForEntity(
      requiredResources,
      itemComponent,
      buildingIdLevel,
      IronPlateCraftedItemID,
      1500,
      CopperResourceItemID,
      4000
    );
    //AlloyFactoryID Level 2
    //required Mines
    LibSetFactoryMineRequirements.setFactory2MineRequirement(
      factoryMineBuildingsComponent,
      AlloyFactoryID,
      2,
      IronMineID,
      1,
      CopperMineID,
      1
    );
    // production
    LibSetFactoryProductionForLevel.setFactoryProductionForLevel(
      factoryProductionComponent,
      AlloyFactoryID,
      2,
      AlloyCraftedItemID,
      2
    );

    //AlloyFactoryID Level 3
    buildingIdLevel = LibEncode.hashKeyEntity(AlloyFactoryID, 3);
    requiredResearch.set(buildingIdLevel, AlloyFactory3ResearchID);
    LibSetRequiredResources.set1RequiredResourceForEntity(
      requiredResources,
      itemComponent,
      buildingIdLevel,
      IronPlateCraftedItemID,
      10000
    );

    //required Mines
    LibSetFactoryMineRequirements.setFactory2MineRequirement(
      factoryMineBuildingsComponent,
      AlloyFactoryID,
      3,
      IronMineID,
      2,
      CopperMineID,
      2
    );

    // production
    LibSetFactoryProductionForLevel.setFactoryProductionForLevel(
      factoryProductionComponent,
      AlloyFactoryID,
      3,
      AlloyCraftedItemID,
      5
    );
  }

  function initLithiumCopperOxideFactory(
    ItemComponent itemComponent,
    FactoryMineBuildingsComponent factoryMineBuildingsComponent,
    FactoryProductionComponent factoryProductionComponent,
    MaxLevelComponent maxLevelComponent,
    RequiredResearchComponent requiredResearch,
    RequiredResourcesComponent requiredResources
  ) internal {
    //LithiumCopperOxideFactoryID
    maxLevelComponent.set(LithiumCopperOxideFactoryID, 2);

    requiredResearch.set(LithiumCopperOxideFactoryID, LithiumCopperOxideFactoryResearchID);
    LibSetRequiredResources.set2RequiredResourcesForEntity(
      requiredResources,
      itemComponent,
      LithiumCopperOxideFactoryID,
      IronPlateCraftedItemID,
      800,
      CopperResourceItemID,
      1500
    );
    //LithiumCopperOxideFactoryID Level 1
    uint256 buildingIdLevel = LibEncode.hashKeyEntity(LithiumCopperOxideFactoryID, 1);
    //required Mines
    LibSetFactoryMineRequirements.setFactory2MineRequirement(
      factoryMineBuildingsComponent,
      LithiumCopperOxideFactoryID,
      1,
      LithiumMineID,
      1,
      CopperMineID,
      1
    );
    // production
    LibSetFactoryProductionForLevel.setFactoryProductionForLevel(
      factoryProductionComponent,
      LithiumCopperOxideFactoryID,
      1,
      LithiumCopperOxideCraftedItemID,
      1
    );

    //LithiumCopperOxideFactoryID Level 2
    buildingIdLevel = LibEncode.hashKeyEntity(LithiumCopperOxideFactoryID, 2);
    requiredResearch.set(buildingIdLevel, LithiumCopperOxideFactoryResearchID);
    LibSetRequiredResources.set2RequiredResourcesForEntity(
      requiredResources,
      itemComponent,
      buildingIdLevel,
      AlloyCraftedItemID,
      1500,
      IronPlateCraftedItemID,
      4000
    );
    //LithiumCopperOxideFactoryID Level 2
    //required Mines
    LibSetFactoryMineRequirements.setFactory2MineRequirement(
      factoryMineBuildingsComponent,
      LithiumCopperOxideFactoryID,
      2,
      LithiumMineID,
      1,
      CopperMineID,
      1
    );
    // production
    LibSetFactoryProductionForLevel.setFactoryProductionForLevel(
      factoryProductionComponent,
      LithiumCopperOxideFactoryID,
      2,
      LithiumCopperOxideCraftedItemID,
      3
    );

    //LithiumCopperOxideFactoryID Level 3
    buildingIdLevel = LibEncode.hashKeyEntity(LithiumCopperOxideFactoryID, 3);
    requiredResearch.set(buildingIdLevel, LithiumCopperOxideFactory3ResearchID);
    LibSetRequiredResources.set2RequiredResourcesForEntity(
      requiredResources,
      itemComponent,
      buildingIdLevel,
      AlloyCraftedItemID,
      5000,
      IronResourceItemID,
      20000
    );

    //required Mines
    LibSetFactoryMineRequirements.setFactory2MineRequirement(
      factoryMineBuildingsComponent,
      LithiumCopperOxideFactoryID,
      3,
      LithiumMineID,
      2,
      CopperMineID,
      2
    );

    // production
    LibSetFactoryProductionForLevel.setFactoryProductionForLevel(
      factoryProductionComponent,
      LithiumCopperOxideFactoryID,
      3,
      LithiumCopperOxideCraftedItemID,
      7
    );
  }

  function initMainBase(
    ItemComponent itemComponent,
    StorageCapacityResourcesComponent storageCapacityResourcesComponent,
    StorageCapacityComponent storageCapacityComponent,
    MaxLevelComponent maxLevelComponent,
    RequiredResourcesComponent requiredResources
  ) internal {
    //MainBaseID
    maxLevelComponent.set(MainBaseID, 5);

    //MainBaseID
    uint256 buildingIdLevel = LibEncode.hashKeyEntity(MainBaseID, 1);
    //MainBase ID Level 1
    LibSetRequiredResources.set1RequiredResourceForEntity(
      storageCapacityResourcesComponent,
      storageCapacityComponent,
      buildingIdLevel,
      IronResourceItemID,
      600
    );

    //MainBaseID Level 2
    buildingIdLevel = LibEncode.hashKeyEntity(MainBaseID, 2);
    //upgrade cost
    LibSetRequiredResources.set1RequiredResourceForEntity(
      requiredResources,
      itemComponent,
      buildingIdLevel,
      IronResourceItemID,
      500
    );
    //storage increase
    LibSetRequiredResources.set2RequiredResourcesForEntity(
      storageCapacityResourcesComponent,
      storageCapacityComponent,
      buildingIdLevel,
      IronResourceItemID,
      1000,
      CopperResourceItemID,
      1000
    );

    //MainBaseID Level 3
    buildingIdLevel = LibEncode.hashKeyEntity(MainBaseID, 3);
    LibSetRequiredResources.set2RequiredResourcesForEntity(
      requiredResources,
      itemComponent,
      buildingIdLevel,
      IronResourceItemID,
      800,
      CopperResourceItemID,
      800
    );
    //storage increase
    LibSetRequiredResources.set3RequiredResourcesForEntity(
      storageCapacityResourcesComponent,
      storageCapacityComponent,
      buildingIdLevel,
      IronResourceItemID,
      2000,
      CopperResourceItemID,
      2000,
      IronPlateCraftedItemID,
      1000
    );

    //MainBaseID Level 4
    buildingIdLevel = LibEncode.hashKeyEntity(MainBaseID, 4);
    LibSetRequiredResources.set1RequiredResourceForEntity(
      requiredResources,
      itemComponent,
      buildingIdLevel,
      IronPlateCraftedItemID,
      800
    );
    //storage increase
    LibSetRequiredResources.set4RequiredResourcesForEntity(
      storageCapacityResourcesComponent,
      storageCapacityComponent,
      buildingIdLevel,
      IronResourceItemID,
      3000,
      CopperResourceItemID,
      3000,
      IronPlateCraftedItemID,
      1500,
      LithiumResourceItemID,
      1500
    );

    //MainBaseID Level 5
    buildingIdLevel = LibEncode.hashKeyEntity(MainBaseID, 5);
    LibSetRequiredResources.set2RequiredResourcesForEntity(
      requiredResources,
      itemComponent,
      buildingIdLevel,
      IronPlateCraftedItemID,
      800,
      LithiumResourceItemID,
      800
    );
    //storage increase
  }

  function init(IWorld world) internal {
    IUint256Component components = world.components();
    ItemComponent itemComponent = ItemComponent(getAddressById(components, ItemComponentID));
    RequiredResearchComponent requiredResearch = RequiredResearchComponent(
      getAddressById(components, RequiredResearchComponentID)
    );
    RequiredResourcesComponent requiredResources = RequiredResourcesComponent(
      getAddressById(components, RequiredResourcesComponentID)
    );

    RequiredTileComponent requiredTileComponent = RequiredTileComponent(getAddressById(components, TileComponentID));
    MineComponent mineComponent = MineComponent(getAddressById(components, MineComponentID));
    MaxLevelComponent maxLevelComponent = MaxLevelComponent(getAddressById(components, MaxLevelComponentID));

    StorageCapacityComponent storageCapacityComponent = StorageCapacityComponent(
      getAddressById(components, StorageCapacityComponentID)
    );
    StorageCapacityResourcesComponent storageCapacityResourcesComponent = StorageCapacityResourcesComponent(
      getAddressById(components, StorageCapacityResourcesComponentID)
    );
    FactoryProductionComponent factoryProductionComponent = FactoryProductionComponent(
      getAddressById(components, FactoryProductionComponentID)
    );
    FactoryMineBuildingsComponent factoryMineBuildingsComponent = FactoryMineBuildingsComponent(
      getAddressById(components, FactoryMineBuildingsComponentID)
    );

    initMainBase(
      itemComponent,
      storageCapacityResourcesComponent,
      storageCapacityComponent,
      maxLevelComponent,
      requiredResources
    );

    //Iron Mine
    initIronMine(
      itemComponent,
      requiredTileComponent,
      mineComponent,
      maxLevelComponent,
      requiredResearch,
      requiredResources
    );
    initCopperMine(
      itemComponent,
      requiredTileComponent,
      mineComponent,
      maxLevelComponent,
      requiredResearch,
      requiredResources
    );
    initLithiumMine(
      itemComponent,
      requiredTileComponent,
      mineComponent,
      maxLevelComponent,
      requiredResearch,
      requiredResources
    );

    initStorageUnit(
      itemComponent,
      storageCapacityResourcesComponent,
      storageCapacityComponent,
      maxLevelComponent,
      requiredResearch,
      requiredResources
    );

    initIronPlateFactory(
      itemComponent,
      factoryMineBuildingsComponent,
      factoryProductionComponent,
      maxLevelComponent,
      requiredResearch,
      requiredResources
    );

    initAlloyFactory(
      itemComponent,
      factoryMineBuildingsComponent,
      factoryProductionComponent,
      maxLevelComponent,
      requiredResearch,
      requiredResources
    );
    initLithiumCopperOxideFactory(
      itemComponent,
      factoryMineBuildingsComponent,
      factoryProductionComponent,
      maxLevelComponent,
      requiredResearch,
      requiredResources
    );
  }
}
