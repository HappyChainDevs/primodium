// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
// Production Buildings
import { MainBaseID, SiloID, BulletFactoryID, DebugPlatingFactoryID, MinerID } from "../prototypes/Tiles.sol";
import { getAddressById, addressToEntity, entityToAddress } from "solecs/utils.sol";
import { IWorld } from "solecs/System.sol";

//components
import { RequiredResearchComponent, ID as RequiredResearchComponentID } from "components/RequiredResearchComponent.sol";
import { BuildingComponent, ID as BuildingComponentID } from "components/BuildingComponent.sol";
import { ResearchComponent, ID as ResearchComponentID } from "components/ResearchComponent.sol";
import { RequiredResearchComponent, ID as RequiredResearchComponentID } from "components/RequiredResearchComponent.sol";
import { RequiredResourcesComponent, ID as RequiredResourcesComponentID } from "components/RequiredResourcesComponent.sol";
import { ItemComponent, ID as ItemComponentID } from "components/ItemComponent.sol";

import { BasicMinerID, PlatingFactoryID, BasicBatteryFactoryID, KineticMissileFactoryID, ProjectileLauncherID, HardenedDrillID, DenseMetalRefineryID, AdvancedBatteryFactoryID, HighTempFoundryID, PrecisionMachineryFactoryID, IridiumDrillbitFactoryID, PrecisionPneumaticDrillID, PenetratorFactoryID, PenetratingMissileFactoryID, MissileLaunchComplexID, HighEnergyLaserFactoryID, ThermobaricWarheadFactoryID, ThermobaricMissileFactoryID, KimberliteCatalystFactoryID } from "../prototypes/Tiles.sol";

import { LibDebug } from "libraries/LibDebug.sol";
import { LibResearch } from "../libraries/LibResearch.sol";
import { LibResourceCost } from "../libraries/LibResourceCost.sol";
import { LibMath } from "libraries/LibMath.sol";

import { Uint256Component } from "std-contracts/components/Uint256Component.sol";
import { BoolComponent } from "std-contracts/components/BoolComponent.sol";
import { entityToAddress } from "solecs/utils.sol";

library LibBuilding {
  function checkBuildLimitConditionForBuildingId(
    BoolComponent ignoreBuildLimitComponent,
    Uint256Component buildingLimitComponent,
    Uint256Component buildingComponent,
    uint256 playerEntity,
    uint256 buildingId
  ) internal view returns (bool) {
    return
      !doesTileCountTowardsBuildingLimit(ignoreBuildLimitComponent, buildingId) ||
      checkBuildingCountNotExceedBuildLimit(buildingLimitComponent, buildingComponent, playerEntity);
  }

  function checkBuildingCountNotExceedBuildLimit(
    Uint256Component buildingLimitComponent,
    Uint256Component buildingComponent,
    uint256 playerEntity
  ) internal view returns (bool) {
    uint256 mainBuildingLevel = getMainBuildingLevelforPlayer(buildingComponent, playerEntity);
    uint256 buildCountLimit = getBuildCountLimit(buildingLimitComponent, mainBuildingLevel);
    uint256 buildingCount = getNumberOfBuildingsForPlayer(buildingLimitComponent, playerEntity);
    return buildingCount < buildCountLimit;
  }

  function checkMainBaseLevelRequirement(
    Uint256Component buildingComponent,
    uint256 playerEntity,
    uint256 entity
  ) internal view returns (bool) {
    if (!buildingComponent.has(entity)) return true;
    uint256 mainBuildingLevel = getMainBuildingLevelforPlayer(buildingComponent, playerEntity);
    return mainBuildingLevel >= buildingComponent.getValue(entity);
  }

  function getMainBuildingLevelforPlayer(
    Uint256Component buildingComponent,
    uint256 playerEntity
  ) internal view returns (uint256) {
    return buildingComponent.has(playerEntity) ? buildingComponent.getValue(playerEntity) : 0;
  }

  function getNumberOfBuildingsForPlayer(
    Uint256Component buildingLimitComponent,
    uint256 playerEntity
  ) internal view returns (uint256) {
    return LibMath.getSafeUint256Value(buildingLimitComponent, playerEntity);
  }

  function getBuildCountLimit(
    Uint256Component buildingLimitComponent,
    uint256 mainBuildingLevel
  ) internal view returns (uint256) {
    if (LibDebug.isDebug()) return 100;
    else if (buildingLimitComponent.has(mainBuildingLevel)) return buildingLimitComponent.getValue(mainBuildingLevel);
    else revert("Invalid Main Building Level");
  }

  function isMainBase(uint256 tileId) internal pure returns (bool) {
    return tileId == MainBaseID;
  }

  function doesTileCountTowardsBuildingLimit(
    BoolComponent ignoreBuildLimitComponent,
    uint256 tileId
  ) internal view returns (bool) {
    return !ignoreBuildLimitComponent.has(tileId) || !ignoreBuildLimitComponent.getValue(tileId);
  }

  function checkResearchReqs(IWorld world, uint256 blockType) internal view returns (bool) {
    RequiredResearchComponent requiredResearchComponent = RequiredResearchComponent(
      getAddressById(world.components(), RequiredResearchComponentID)
    );
    ResearchComponent researchComponent = ResearchComponent(getAddressById(world.components(), ResearchComponentID));
    return
      LibResearch.checkResearchRequirements(
        requiredResearchComponent,
        researchComponent,
        blockType,
        addressToEntity(msg.sender)
      );
  }

  function checkResourceReqs(IWorld world, uint256 blockType) internal view returns (bool) {
    RequiredResourcesComponent requiredResourcesComponent = RequiredResourcesComponent(
      getAddressById(world.components(), RequiredResourcesComponentID)
    );
    ItemComponent itemComponent = ItemComponent(getAddressById(world.components(), ItemComponentID));
    return
      LibResourceCost.hasRequiredResources(
        requiredResourcesComponent,
        itemComponent,
        blockType,
        addressToEntity(msg.sender)
      );
  }

  function checkAndSpendResourceReqs(IWorld world, uint256 blockType) internal returns (bool) {
    RequiredResourcesComponent requiredResourcesComponent = RequiredResourcesComponent(
      getAddressById(world.components(), RequiredResourcesComponentID)
    );
    ItemComponent itemComponent = ItemComponent(getAddressById(world.components(), ItemComponentID));
    return
      LibResourceCost.checkAndSpendRequiredResources(
        requiredResourcesComponent,
        itemComponent,
        blockType,
        addressToEntity(msg.sender)
      );
  }
}
