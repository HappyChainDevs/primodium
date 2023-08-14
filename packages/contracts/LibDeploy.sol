// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

// NOTE: This file is autogenerated via `mud codegen-libdeploy` from `deploy.json`. Do not edit manually.

// Foundry
import { console } from "forge-std/console.sol";

// Solecs
import { IWorld } from "solecs/interfaces/IWorld.sol";
import { World } from "solecs/World.sol";
import { IComponent } from "solecs/interfaces/IComponent.sol";
import { getAddressById } from "solecs/utils.sol";
import { IUint256Component } from "solecs/interfaces/IUint256Component.sol";
import { ISystem } from "solecs/interfaces/ISystem.sol";
import { SystemStorage } from "solecs/SystemStorage.sol";

// Components (requires 'components=...' remapping in project's remappings.txt)
import { CounterComponent, ID as CounterComponentID } from "components/CounterComponent.sol";
import { BuildingTypeComponent, ID as BuildingTypeComponentID } from "components/BuildingTypeComponent.sol";
import { OwnedByComponent, ID as OwnedByComponentID } from "components/OwnedByComponent.sol";
import { PathComponent, ID as PathComponentID } from "components/PathComponent.sol";
import { LastClaimedAtComponent, ID as LastClaimedAtComponentID } from "components/LastClaimedAtComponent.sol";
import { ItemComponent, ID as ItemComponentID } from "components/ItemComponent.sol";
import { HasResearchedComponent, ID as HasResearchedComponentID } from "components/HasResearchedComponent.sol";
import { MainBaseComponent, ID as MainBaseComponentID } from "components/MainBaseComponent.sol";
import { LevelComponent, ID as LevelComponentID } from "components/LevelComponent.sol";
import { BuildingCountComponent, ID as BuildingCountComponentID } from "components/BuildingCountComponent.sol";
import { ChildrenComponent, ID as ChildrenComponentID } from "components/ChildrenComponent.sol";
import { ProductionComponent, ID as ProductionComponentID } from "components/ProductionComponent.sol";
import { IsDebugComponent, ID as IsDebugComponentID } from "components/IsDebugComponent.sol";
import { PositionComponent, ID as PositionComponentID } from "components/PositionComponent.sol";
import { MaxUtilityComponent, ID as MaxUtilityComponentID } from "components/MaxUtilityComponent.sol";
import { OccupiedUtilityResourceComponent, ID as OccupiedUtilityResourceComponentID } from "components/OccupiedUtilityResourceComponent.sol";
import { AsteroidTypeComponent, ID as AsteroidTypeComponentID } from "components/AsteroidTypeComponent.sol";
import { ActiveComponent, ID as ActiveComponentID } from "components/ActiveComponent.sol";
import { DimensionsComponent, ID as DimensionsComponentID } from "components/DimensionsComponent.sol";
import { P_ProductionDependenciesComponent, ID as P_ProductionDependenciesComponentID } from "components/P_ProductionDependenciesComponent.sol";
import { P_ProductionComponent, ID as P_ProductionComponentID } from "components/P_ProductionComponent.sol";
import { P_MaxLevelComponent, ID as P_MaxLevelComponentID } from "components/P_MaxLevelComponent.sol";
import { P_RequiredTileComponent, ID as P_RequiredTileComponentID } from "components/P_RequiredTileComponent.sol";
import { P_RequiredUtilityComponent, ID as P_RequiredUtilityComponentID } from "components/P_RequiredUtilityComponent.sol";
import { P_UtilityProductionComponent, ID as P_UtilityProductionComponentID } from "components/P_UtilityProductionComponent.sol";
import { P_BlueprintComponent, ID as P_BlueprintComponentID } from "components/P_BlueprintComponent.sol";
import { P_MaxStorageComponent, ID as P_MaxStorageComponentID } from "components/P_MaxStorageComponent.sol";
import { P_MaxResourceStorageComponent, ID as P_MaxResourceStorageComponentID } from "components/P_MaxResourceStorageComponent.sol";
import { P_IsTechComponent, ID as P_IsTechComponentID } from "components/P_IsTechComponent.sol";
import { P_RequiredResearchComponent, ID as P_RequiredResearchComponentID } from "components/P_RequiredResearchComponent.sol";
import { P_RequiredResourcesComponent, ID as P_RequiredResourcesComponentID } from "components/P_RequiredResourcesComponent.sol";
import { P_MaxBuildingsComponent, ID as P_MaxBuildingsComponentID } from "components/P_MaxBuildingsComponent.sol";
import { P_IgnoreBuildLimitComponent, ID as P_IgnoreBuildLimitComponentID } from "components/P_IgnoreBuildLimitComponent.sol";
import { P_IsBuildingTypeComponent, ID as P_IsBuildingTypeComponentID } from "components/P_IsBuildingTypeComponent.sol";

// Systems (requires 'systems=...' remapping in project's remappings.txt)
import { ResearchSystem, ID as ResearchSystemID } from "systems/ResearchSystem.sol";
import { IncrementSystem, ID as IncrementSystemID } from "systems/IncrementSystem.sol";
import { SpawnSystem, ID as SpawnSystemID } from "systems/SpawnSystem.sol";
import { BuildSystem, ID as BuildSystemID } from "systems/BuildSystem.sol";
import { DestroySystem, ID as DestroySystemID } from "systems/DestroySystem.sol";
import { BuildPathSystem, ID as BuildPathSystemID } from "systems/BuildPathSystem.sol";
import { DestroyPathSystem, ID as DestroyPathSystemID } from "systems/DestroyPathSystem.sol";
import { ClaimFromMineSystem, ID as ClaimFromMineSystemID } from "systems/ClaimFromMineSystem.sol";
import { UpgradeBuildingSystem, ID as UpgradeBuildingSystemID } from "systems/UpgradeBuildingSystem.sol";
import { ComponentDevSystem, ID as ComponentDevSystemID } from "systems/ComponentDevSystem.sol";
import { S_PlaceBuildingTilesSystem, ID as S_PlaceBuildingTilesSystemID } from "systems/S_PlaceBuildingTilesSystem.sol";
import { S_UpdatePlayerStorageSystem, ID as S_UpdatePlayerStorageSystemID } from "systems/S_UpdatePlayerStorageSystem.sol";
import { S_SpendRequiredResourcesSystem, ID as S_SpendRequiredResourcesSystemID } from "systems/S_SpendRequiredResourcesSystem.sol";
import { S_UpdateActiveStatusSystem, ID as S_UpdateActiveStatusSystemID } from "systems/S_UpdateActiveStatusSystem.sol";
import { S_SpendRequiredResourcesSystem, ID as S_SpendRequiredResourcesSystemID } from "systems/S_SpendRequiredResourcesSystem.sol";
import { S_UpdatePlayerResourceProductionSystem, ID as S_UpdatePlayerResourceProductionSystemID } from "systems/S_UpdatePlayerResourceProductionSystem.sol";
import { S_UpdateUnclaimedResourcesSystem, ID as S_UpdateUnclaimedResourcesSystemID } from "systems/S_UpdateUnclaimedResourcesSystem.sol";
import { S_UpdateOccupiedUtilitySystem, ID as S_UpdateOccupiedUtilitySystemID } from "systems/S_UpdateOccupiedUtilitySystem.sol";
import { S_UpdateUtilityProductionSystem, ID as S_UpdateUtilityProductionSystemID } from "systems/S_UpdateUtilityProductionSystem.sol";
import { S_UpdateRequiredProductionSystem, ID as S_UpdateRequiredProductionSystemID } from "systems/S_UpdateRequiredProductionSystem.sol";
import { S_UpdateConnectedRequiredProductionSystem, ID as S_UpdateConnectedRequiredProductionSystemID } from "systems/S_UpdateConnectedRequiredProductionSystem.sol";
import { S_CheckRequiredTileSystem, ID as S_CheckRequiredTileSystemID } from "systems/S_CheckRequiredTileSystem.sol";

// Initializer libraries (requires 'libraries=...' remapping in project's remappings.txt)
import { LibInitWorld } from "libraries/LibInitWorld.sol";
import { LibInitBuildings } from "libraries/LibInitBuildings.sol";
import { LibInitResearch } from "libraries/LibInitResearch.sol";
import { LibInitDebug } from "libraries/LibInitDebug.sol";

struct DeployResult {
  IWorld world;
  address deployer;
}

library LibDeploy {
  function deploy(
    address _deployer,
    address _world,
    bool _reuseComponents
  ) internal returns (DeployResult memory result) {
    result.deployer = _deployer;

    // ------------------------
    // Deploy
    // ------------------------

    // Deploy world
    result.world = _world == address(0) ? new World() : IWorld(_world);
    if (_world == address(0)) result.world.init(); // Init if it's a fresh world

    // Deploy components
    if (!_reuseComponents) {
      IComponent comp;

      console.log("Deploying CounterComponent");
      comp = new CounterComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying BuildingTypeComponent");
      comp = new BuildingTypeComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying OwnedByComponent");
      comp = new OwnedByComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying PathComponent");
      comp = new PathComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying LastClaimedAtComponent");
      comp = new LastClaimedAtComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying ItemComponent");
      comp = new ItemComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying HasResearchedComponent");
      comp = new HasResearchedComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying MainBaseComponent");
      comp = new MainBaseComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying LevelComponent");
      comp = new LevelComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying BuildingCountComponent");
      comp = new BuildingCountComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying ChildrenComponent");
      comp = new ChildrenComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying ProductionComponent");
      comp = new ProductionComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying IsDebugComponent");
      comp = new IsDebugComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying PositionComponent");
      comp = new PositionComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying MaxUtilityComponent");
      comp = new MaxUtilityComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying OccupiedUtilityResourceComponent");
      comp = new OccupiedUtilityResourceComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying AsteroidTypeComponent");
      comp = new AsteroidTypeComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying ActiveComponent");
      comp = new ActiveComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying DimensionsComponent");
      comp = new DimensionsComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying P_ProductionDependenciesComponent");
      comp = new P_ProductionDependenciesComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying P_ProductionComponent");
      comp = new P_ProductionComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying P_MaxLevelComponent");
      comp = new P_MaxLevelComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying P_RequiredTileComponent");
      comp = new P_RequiredTileComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying P_RequiredUtilityComponent");
      comp = new P_RequiredUtilityComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying P_UtilityProductionComponent");
      comp = new P_UtilityProductionComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying P_BlueprintComponent");
      comp = new P_BlueprintComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying P_MaxStorageComponent");
      comp = new P_MaxStorageComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying P_MaxResourceStorageComponent");
      comp = new P_MaxResourceStorageComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying P_IsTechComponent");
      comp = new P_IsTechComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying P_RequiredResearchComponent");
      comp = new P_RequiredResearchComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying P_RequiredResourcesComponent");
      comp = new P_RequiredResourcesComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying P_MaxBuildingsComponent");
      comp = new P_MaxBuildingsComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying P_IgnoreBuildLimitComponent");
      comp = new P_IgnoreBuildLimitComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying P_IsBuildingTypeComponent");
      comp = new P_IsBuildingTypeComponent(address(result.world));
      console.log(address(comp));
    }

    // Deploy systems
    deploySystems(address(result.world), true);

    // Call initializer libraries
    if (!_reuseComponents) {
      // Allow initializers to utilize SystemStorage
      SystemStorage.init(result.world, result.world.components());

      LibInitWorld.init(result.world);
      LibInitBuildings.init(result.world);
      LibInitResearch.init(result.world);
      LibInitDebug.init(result.world);
    }
  }

  function authorizeWriter(IUint256Component components, uint256 componentId, address writer) internal {
    IComponent(getAddressById(components, componentId)).authorizeWriter(writer);
  }

  /**
   * Deploy systems to the given world.
   * If `init` flag is set, systems with `initialize` setting in `deploy.json` will be executed.
   */
  function deploySystems(address _world, bool init) internal {
    IWorld world = IWorld(_world);
    // Deploy systems
    ISystem system;
    IUint256Component components = world.components();

    console.log("Deploying ResearchSystem");
    system = new ResearchSystem(world, address(components));
    world.registerSystem(address(system), ResearchSystemID);
    authorizeWriter(components, HasResearchedComponentID, address(system));
    console.log(address(system));

    console.log("Deploying IncrementSystem");
    system = new IncrementSystem(world, address(components));
    world.registerSystem(address(system), IncrementSystemID);
    authorizeWriter(components, CounterComponentID, address(system));
    console.log(address(system));

    console.log("Deploying SpawnSystem");
    system = new SpawnSystem(world, address(components));
    world.registerSystem(address(system), SpawnSystemID);
    authorizeWriter(components, PositionComponentID, address(system));
    authorizeWriter(components, AsteroidTypeComponentID, address(system));
    authorizeWriter(components, ActiveComponentID, address(system));
    console.log(address(system));

    console.log("Deploying BuildSystem");
    system = new BuildSystem(world, address(components));
    world.registerSystem(address(system), BuildSystemID);
    authorizeWriter(components, BuildingTypeComponentID, address(system));
    authorizeWriter(components, BuildingCountComponentID, address(system));
    authorizeWriter(components, OwnedByComponentID, address(system));
    authorizeWriter(components, LevelComponentID, address(system));
    authorizeWriter(components, MainBaseComponentID, address(system));
    authorizeWriter(components, ChildrenComponentID, address(system));
    authorizeWriter(components, MainBaseComponentID, address(system));
    authorizeWriter(components, PositionComponentID, address(system));
    console.log(address(system));

    console.log("Deploying DestroySystem");
    system = new DestroySystem(world, address(components));
    world.registerSystem(address(system), DestroySystemID);
    authorizeWriter(components, BuildingTypeComponentID, address(system));
    authorizeWriter(components, OwnedByComponentID, address(system));
    authorizeWriter(components, MainBaseComponentID, address(system));
    authorizeWriter(components, ChildrenComponentID, address(system));
    authorizeWriter(components, LevelComponentID, address(system));
    authorizeWriter(components, BuildingCountComponentID, address(system));
    authorizeWriter(components, PathComponentID, address(system));
    console.log(address(system));

    console.log("Deploying BuildPathSystem");
    system = new BuildPathSystem(world, address(components));
    world.registerSystem(address(system), BuildPathSystemID);
    authorizeWriter(components, PathComponentID, address(system));
    console.log(address(system));

    console.log("Deploying DestroyPathSystem");
    system = new DestroyPathSystem(world, address(components));
    world.registerSystem(address(system), DestroyPathSystemID);
    authorizeWriter(components, PathComponentID, address(system));
    console.log(address(system));

    console.log("Deploying ClaimFromMineSystem");
    system = new ClaimFromMineSystem(world, address(components));
    world.registerSystem(address(system), ClaimFromMineSystemID);
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    authorizeWriter(components, ItemComponentID, address(system));
    console.log(address(system));

    console.log("Deploying UpgradeBuildingSystem");
    system = new UpgradeBuildingSystem(world, address(components));
    world.registerSystem(address(system), UpgradeBuildingSystemID);
    authorizeWriter(components, LevelComponentID, address(system));
    console.log(address(system));

    console.log("Deploying ComponentDevSystem");
    system = new ComponentDevSystem(world, address(components));
    world.registerSystem(address(system), ComponentDevSystemID);
    authorizeWriter(components, CounterComponentID, address(system));
    authorizeWriter(components, BuildingTypeComponentID, address(system));
    authorizeWriter(components, OwnedByComponentID, address(system));
    authorizeWriter(components, PathComponentID, address(system));
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    authorizeWriter(components, ItemComponentID, address(system));
    authorizeWriter(components, HasResearchedComponentID, address(system));
    authorizeWriter(components, MainBaseComponentID, address(system));
    authorizeWriter(components, LevelComponentID, address(system));
    authorizeWriter(components, BuildingCountComponentID, address(system));
    authorizeWriter(components, ChildrenComponentID, address(system));
    authorizeWriter(components, ProductionComponentID, address(system));
    authorizeWriter(components, IsDebugComponentID, address(system));
    authorizeWriter(components, PositionComponentID, address(system));
    authorizeWriter(components, MaxUtilityComponentID, address(system));
    authorizeWriter(components, OccupiedUtilityResourceComponentID, address(system));
    authorizeWriter(components, AsteroidTypeComponentID, address(system));
    authorizeWriter(components, ActiveComponentID, address(system));
    authorizeWriter(components, DimensionsComponentID, address(system));
    authorizeWriter(components, P_ProductionDependenciesComponentID, address(system));
    authorizeWriter(components, P_ProductionComponentID, address(system));
    authorizeWriter(components, P_MaxLevelComponentID, address(system));
    authorizeWriter(components, P_RequiredTileComponentID, address(system));
    authorizeWriter(components, P_RequiredUtilityComponentID, address(system));
    authorizeWriter(components, P_UtilityProductionComponentID, address(system));
    authorizeWriter(components, P_BlueprintComponentID, address(system));
    authorizeWriter(components, P_MaxStorageComponentID, address(system));
    authorizeWriter(components, P_MaxResourceStorageComponentID, address(system));
    authorizeWriter(components, P_IsTechComponentID, address(system));
    authorizeWriter(components, P_RequiredResearchComponentID, address(system));
    authorizeWriter(components, P_RequiredResourcesComponentID, address(system));
    authorizeWriter(components, P_MaxBuildingsComponentID, address(system));
    authorizeWriter(components, P_IgnoreBuildLimitComponentID, address(system));
    authorizeWriter(components, P_IsBuildingTypeComponentID, address(system));
    console.log(address(system));

    console.log("Deploying S_PlaceBuildingTilesSystem");
    system = new S_PlaceBuildingTilesSystem(world, address(components));
    world.registerSystem(address(system), S_PlaceBuildingTilesSystemID);
    authorizeWriter(components, ChildrenComponentID, address(system));
    authorizeWriter(components, OwnedByComponentID, address(system));
    authorizeWriter(components, PositionComponentID, address(system));
    console.log(address(system));

    console.log("Deploying S_UpdatePlayerStorageSystem");
    system = new S_UpdatePlayerStorageSystem(world, address(components));
    world.registerSystem(address(system), S_UpdatePlayerStorageSystemID);
    authorizeWriter(components, ItemComponentID, address(system));
    authorizeWriter(components, P_MaxStorageComponentID, address(system));
    authorizeWriter(components, P_MaxResourceStorageComponentID, address(system));
    console.log(address(system));

    console.log("Deploying S_SpendRequiredResourcesSystem");
    system = new S_SpendRequiredResourcesSystem(world, address(components));
    world.registerSystem(address(system), S_SpendRequiredResourcesSystemID);
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    authorizeWriter(components, ItemComponentID, address(system));
    console.log(address(system));

    console.log("Deploying S_UpdateActiveStatusSystem");
    system = new S_UpdateActiveStatusSystem(world, address(components));
    world.registerSystem(address(system), S_UpdateActiveStatusSystemID);
    authorizeWriter(components, ActiveComponentID, address(system));
    console.log(address(system));

    console.log("Deploying S_SpendRequiredResourcesSystem");
    system = new S_SpendRequiredResourcesSystem(world, address(components));
    world.registerSystem(address(system), S_SpendRequiredResourcesSystemID);
    authorizeWriter(components, ItemComponentID, address(system));
    console.log(address(system));

    console.log("Deploying S_UpdatePlayerResourceProductionSystem");
    system = new S_UpdatePlayerResourceProductionSystem(world, address(components));
    world.registerSystem(address(system), S_UpdatePlayerResourceProductionSystemID);
    authorizeWriter(components, ProductionComponentID, address(system));
    authorizeWriter(components, ProductionComponentID, address(system));
    console.log(address(system));

    console.log("Deploying S_UpdateUnclaimedResourcesSystem");
    system = new S_UpdateUnclaimedResourcesSystem(world, address(components));
    world.registerSystem(address(system), S_UpdateUnclaimedResourcesSystemID);
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    authorizeWriter(components, ItemComponentID, address(system));
    console.log(address(system));

    console.log("Deploying S_UpdateOccupiedUtilitySystem");
    system = new S_UpdateOccupiedUtilitySystem(world, address(components));
    world.registerSystem(address(system), S_UpdateOccupiedUtilitySystemID);
    authorizeWriter(components, OccupiedUtilityResourceComponentID, address(system));
    console.log(address(system));

    console.log("Deploying S_UpdateUtilityProductionSystem");
    system = new S_UpdateUtilityProductionSystem(world, address(components));
    world.registerSystem(address(system), S_UpdateUtilityProductionSystemID);
    authorizeWriter(components, MaxUtilityComponentID, address(system));
    console.log(address(system));

    console.log("Deploying S_UpdateRequiredProductionSystem");
    system = new S_UpdateRequiredProductionSystem(world, address(components));
    world.registerSystem(address(system), S_UpdateRequiredProductionSystemID);
    authorizeWriter(components, P_ProductionDependenciesComponentID, address(system));
    console.log(address(system));

    console.log("Deploying S_UpdateConnectedRequiredProductionSystem");
    system = new S_UpdateConnectedRequiredProductionSystem(world, address(components));
    world.registerSystem(address(system), S_UpdateConnectedRequiredProductionSystemID);
    authorizeWriter(components, P_ProductionDependenciesComponentID, address(system));
    console.log(address(system));

    console.log("Deploying S_CheckRequiredTileSystem");
    system = new S_CheckRequiredTileSystem(world, address(components));
    world.registerSystem(address(system), S_CheckRequiredTileSystemID);
    console.log(address(system));
  }
}
