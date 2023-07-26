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
import { GameConfigComponent, ID as GameConfigComponentID } from "components/GameConfigComponent.sol";
import { BuildingTypeComponent, ID as BuildingTypeComponentID } from "components/BuildingTypeComponent.sol";
import { OwnedByComponent, ID as OwnedByComponentID } from "components/OwnedByComponent.sol";
import { PathComponent, ID as PathComponentID } from "components/PathComponent.sol";
import { LastBuiltAtComponent, ID as LastBuiltAtComponentID } from "components/LastBuiltAtComponent.sol";
import { LastClaimedAtComponent, ID as LastClaimedAtComponentID } from "components/LastClaimedAtComponent.sol";
import { LastResearchedAtComponent, ID as LastResearchedAtComponentID } from "components/LastResearchedAtComponent.sol";
import { HealthComponent, ID as HealthComponentID } from "components/HealthComponent.sol";
import { ItemComponent, ID as ItemComponentID } from "components/ItemComponent.sol";
import { HasResearchedComponent, ID as HasResearchedComponentID } from "components/HasResearchedComponent.sol";
import { MainBaseComponent, ID as MainBaseComponentID } from "components/MainBaseComponent.sol";
import { StarterPackClaimedComponent, ID as StarterPackClaimedComponentID } from "components/StarterPackClaimedComponent.sol";
import { LevelComponent, ID as LevelComponentID } from "components/LevelComponent.sol";
import { RequiredResearchComponent, ID as RequiredResearchComponentID } from "components/RequiredResearchComponent.sol";
import { RequiredResourcesComponent, ID as RequiredResourcesComponentID } from "components/RequiredResourcesComponent.sol";
import { MaxBuildingsComponent, ID as MaxBuildingsComponentID } from "components/MaxBuildingsComponent.sol";
import { IgnoreBuildLimitComponent, ID as IgnoreBuildLimitComponentID } from "components/IgnoreBuildLimitComponent.sol";
import { ChildrenComponent, ID as ChildrenComponentID } from "components/ChildrenComponent.sol";
import { BlueprintComponent, ID as BlueprintComponentID } from "components/BlueprintComponent.sol";
import { MaxStorageComponent, ID as MaxStorageComponentID } from "components/MaxStorageComponent.sol";
import { OwnedResourcesComponent, ID as OwnedResourcesComponentID } from "components/OwnedResourcesComponent.sol";
import { MineComponent, ID as MineComponentID } from "components/MineComponent.sol";
import { UnclaimedResourceComponent, ID as UnclaimedResourceComponentID } from "components/UnclaimedResourceComponent.sol";
import { ActiveComponent, ID as ActiveComponentID } from "components/ActiveComponent.sol";
import { FactoryMineBuildingsComponent, ID as FactoryMineBuildingsComponentID } from "components/FactoryMineBuildingsComponent.sol";
import { FactoryProductionComponent, ID as FactoryProductionComponentID } from "components/FactoryProductionComponent.sol";
import { MaxLevelComponent, ID as MaxLevelComponentID } from "components/MaxLevelComponent.sol";
import { RequiredTileComponent, ID as RequiredTileComponentID } from "components/RequiredTileComponent.sol";
import { RequiredPassiveResourceComponent, ID as RequiredPassiveResourceComponentID } from "components/RequiredPassiveResourceComponent.sol";
import { PassiveResourceProductionComponent, ID as PassiveResourceProductionComponentID } from "components/PassiveResourceProductionComponent.sol";
import { IsDebugComponent, ID as IsDebugComponentID } from "components/IsDebugComponent.sol";

// Systems (requires 'systems=...' remapping in project's remappings.txt)
import { ResearchSystem, ID as ResearchSystemID } from "systems/ResearchSystem.sol";
import { StarterPackSystem, ID as StarterPackSystemID } from "systems/StarterPackSystem.sol";
import { AttackSystem, ID as AttackSystemID } from "systems/AttackSystem.sol";
import { IncrementSystem, ID as IncrementSystemID } from "systems/IncrementSystem.sol";
import { BuildSystem, ID as BuildSystemID } from "systems/BuildSystem.sol";
import { PostBuildSystem, ID as PostBuildSystemID } from "systems/PostBuildSystem.sol";
import { DestroySystem, ID as DestroySystemID } from "systems/DestroySystem.sol";
import { PostDestroySystem, ID as PostDestroySystemID } from "systems/PostDestroySystem.sol";
import { BuildPathSystem, ID as BuildPathSystemID } from "systems/BuildPathSystem.sol";
import { BuildPathFromFactoryToMainBaseSystem, ID as BuildPathFromFactoryToMainBaseSystemID } from "systems/BuildPathFromFactoryToMainBaseSystem.sol";
import { BuildPathFromMineToFactorySystem, ID as BuildPathFromMineToFactorySystemID } from "systems/BuildPathFromMineToFactorySystem.sol";
import { BuildPathFromMineToMainBaseSystem, ID as BuildPathFromMineToMainBaseSystemID } from "systems/BuildPathFromMineToMainBaseSystem.sol";
import { DestroyPathSystem, ID as DestroyPathSystemID } from "systems/DestroyPathSystem.sol";
import { PostDestroyPathSystem, ID as PostDestroyPathSystemID } from "systems/PostDestroyPathSystem.sol";
import { ClaimFromMineSystem, ID as ClaimFromMineSystemID } from "systems/ClaimFromMineSystem.sol";
import { ClaimFromFactorySystem, ID as ClaimFromFactorySystemID } from "systems/ClaimFromFactorySystem.sol";
import { CraftSystem, ID as CraftSystemID } from "systems/CraftSystem.sol";
import { UpgradeSystem, ID as UpgradeSystemID } from "systems/UpgradeSystem.sol";
import { PostUpgradeMineSystem, ID as PostUpgradeMineSystemID } from "systems/PostUpgradeMineSystem.sol";
import { PostUpgradeFactorySystem, ID as PostUpgradeFactorySystemID } from "systems/PostUpgradeFactorySystem.sol";
import { DebugAcquireResourcesSystem, ID as DebugAcquireResourcesSystemID } from "systems/DebugAcquireResourcesSystem.sol";
import { DebugAcquireResourcesBasedOnRequirementSystem, ID as DebugAcquireResourcesBasedOnRequirementSystemID } from "systems/DebugAcquireResourcesBasedOnRequirementSystem.sol";
import { DebugIgnoreBuildLimitForBuildingSystem, ID as DebugIgnoreBuildLimitForBuildingSystemID } from "systems/DebugIgnoreBuildLimitForBuildingSystem.sol";
import { DebugRemoveBuildingRequirementsSystem, ID as DebugRemoveBuildingRequirementsSystemID } from "systems/DebugRemoveBuildingRequirementsSystem.sol";
import { DebugRemoveUpgradeRequirementsSystem, ID as DebugRemoveUpgradeRequirementsSystemID } from "systems/DebugRemoveUpgradeRequirementsSystem.sol";
import { DebugRemoveBuildLimitSystem, ID as DebugRemoveBuildLimitSystemID } from "systems/DebugRemoveBuildLimitSystem.sol";
import { BlueprintSystem, ID as BlueprintSystemID } from "systems/BlueprintSystem.sol";
import { DebugAcquireStorageForAllResourcesSystem, ID as DebugAcquireStorageForAllResourcesSystemID } from "systems/DebugAcquireStorageForAllResourcesSystem.sol";
import { ComponentDevSystem, ID as ComponentDevSystemID } from "systems/ComponentDevSystem.sol";

// Initializer libraries (requires 'libraries=...' remapping in project's remappings.txt)
import { LibBuildingDesignInitializer } from "libraries/LibBuildingDesignInitializer.sol";
import { LibMaxBuildingsDesignInitializer } from "libraries/LibMaxBuildingsDesignInitializer.sol";
import { LibTechnologyDesignInitializer } from "libraries/LibTechnologyDesignInitializer.sol";
import { LibBlueprintInitializer } from "libraries/LibBlueprintInitializer.sol";
import { LibDebugInitializer } from "libraries/LibDebugInitializer.sol";

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

      console.log("Deploying GameConfigComponent");
      comp = new GameConfigComponent(address(result.world));
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

      console.log("Deploying LastBuiltAtComponent");
      comp = new LastBuiltAtComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying LastClaimedAtComponent");
      comp = new LastClaimedAtComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying LastResearchedAtComponent");
      comp = new LastResearchedAtComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying HealthComponent");
      comp = new HealthComponent(address(result.world));
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

      console.log("Deploying StarterPackClaimedComponent");
      comp = new StarterPackClaimedComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying LevelComponent");
      comp = new LevelComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying RequiredResearchComponent");
      comp = new RequiredResearchComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying RequiredResourcesComponent");
      comp = new RequiredResourcesComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying MaxBuildingsComponent");
      comp = new MaxBuildingsComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying IgnoreBuildLimitComponent");
      comp = new IgnoreBuildLimitComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying ChildrenComponent");
      comp = new ChildrenComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying BlueprintComponent");
      comp = new BlueprintComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying MaxStorageComponent");
      comp = new MaxStorageComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying OwnedResourcesComponent");
      comp = new OwnedResourcesComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying MineComponent");
      comp = new MineComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying UnclaimedResourceComponent");
      comp = new UnclaimedResourceComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying ActiveComponent");
      comp = new ActiveComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying FactoryMineBuildingsComponent");
      comp = new FactoryMineBuildingsComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying FactoryProductionComponent");
      comp = new FactoryProductionComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying MaxLevelComponent");
      comp = new MaxLevelComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying RequiredTileComponent");
      comp = new RequiredTileComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying RequiredPassiveResourceComponent");
      comp = new RequiredPassiveResourceComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying PassiveResourceProductionComponent");
      comp = new PassiveResourceProductionComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying IsDebugComponent");
      comp = new IsDebugComponent(address(result.world));
      console.log(address(comp));
    }

    // Deploy systems
    deploySystems(address(result.world), true);

    // Call initializer libraries
    if (!_reuseComponents) {
      // Allow initializers to utilize SystemStorage
      SystemStorage.init(result.world, result.world.components());

      LibBuildingDesignInitializer.init(result.world);
      LibMaxBuildingsDesignInitializer.init(result.world);
      LibTechnologyDesignInitializer.init(result.world);
      LibBlueprintInitializer.init(result.world);
      LibDebugInitializer.init(result.world);
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
    authorizeWriter(components, ItemComponentID, address(system));
    authorizeWriter(components, HasResearchedComponentID, address(system));
    authorizeWriter(components, LastResearchedAtComponentID, address(system));
    console.log(address(system));

    console.log("Deploying StarterPackSystem");
    system = new StarterPackSystem(world, address(components));
    world.registerSystem(address(system), StarterPackSystemID);
    authorizeWriter(components, ItemComponentID, address(system));
    authorizeWriter(components, StarterPackClaimedComponentID, address(system));
    console.log(address(system));

    console.log("Deploying AttackSystem");
    system = new AttackSystem(world, address(components));
    world.registerSystem(address(system), AttackSystemID);
    authorizeWriter(components, HealthComponentID, address(system));
    authorizeWriter(components, ItemComponentID, address(system));
    authorizeWriter(components, BuildingTypeComponentID, address(system));
    authorizeWriter(components, OwnedByComponentID, address(system));
    authorizeWriter(components, LastBuiltAtComponentID, address(system));
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    console.log(address(system));

    console.log("Deploying IncrementSystem");
    system = new IncrementSystem(world, address(components));
    world.registerSystem(address(system), IncrementSystemID);
    authorizeWriter(components, CounterComponentID, address(system));
    console.log(address(system));

    console.log("Deploying BuildSystem");
    system = new BuildSystem(world, address(components));
    world.registerSystem(address(system), BuildSystemID);
    authorizeWriter(components, BuildingTypeComponentID, address(system));
    authorizeWriter(components, OwnedByComponentID, address(system));
    authorizeWriter(components, LastBuiltAtComponentID, address(system));
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    authorizeWriter(components, ItemComponentID, address(system));
    authorizeWriter(components, MainBaseComponentID, address(system));
    authorizeWriter(components, LevelComponentID, address(system));
    authorizeWriter(components, MainBaseComponentID, address(system));
    authorizeWriter(components, ChildrenComponentID, address(system));
    console.log(address(system));

    console.log("Deploying PostBuildSystem");
    system = new PostBuildSystem(world, address(components));
    world.registerSystem(address(system), PostBuildSystemID);
    authorizeWriter(components, ItemComponentID, address(system));
    authorizeWriter(components, MaxStorageComponentID, address(system));
    authorizeWriter(components, OwnedResourcesComponentID, address(system));
    authorizeWriter(components, FactoryMineBuildingsComponentID, address(system));
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    authorizeWriter(components, MaxBuildingsComponentID, address(system));
    console.log(address(system));

    console.log("Deploying DestroySystem");
    system = new DestroySystem(world, address(components));
    world.registerSystem(address(system), DestroySystemID);
    authorizeWriter(components, BuildingTypeComponentID, address(system));
    authorizeWriter(components, OwnedByComponentID, address(system));
    authorizeWriter(components, LastBuiltAtComponentID, address(system));
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    authorizeWriter(components, HealthComponentID, address(system));
    authorizeWriter(components, PathComponentID, address(system));
    authorizeWriter(components, MainBaseComponentID, address(system));
    authorizeWriter(components, ChildrenComponentID, address(system));
    authorizeWriter(components, LevelComponentID, address(system));
    authorizeWriter(components, MaxBuildingsComponentID, address(system));
    authorizeWriter(components, ChildrenComponentID, address(system));
    console.log(address(system));

    console.log("Deploying PostDestroySystem");
    system = new PostDestroySystem(world, address(components));
    world.registerSystem(address(system), PostDestroySystemID);
    authorizeWriter(components, MaxStorageComponentID, address(system));
    authorizeWriter(components, OwnedResourcesComponentID, address(system));
    authorizeWriter(components, ItemComponentID, address(system));
    console.log(address(system));

    console.log("Deploying BuildPathSystem");
    system = new BuildPathSystem(world, address(components));
    world.registerSystem(address(system), BuildPathSystemID);
    console.log(address(system));

    console.log("Deploying BuildPathFromFactoryToMainBaseSystem");
    system = new BuildPathFromFactoryToMainBaseSystem(world, address(components));
    world.registerSystem(address(system), BuildPathFromFactoryToMainBaseSystemID);
    authorizeWriter(components, PathComponentID, address(system));
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    authorizeWriter(components, UnclaimedResourceComponentID, address(system));
    authorizeWriter(components, MineComponentID, address(system));
    authorizeWriter(components, ActiveComponentID, address(system));
    authorizeWriter(components, FactoryProductionComponentID, address(system));
    console.log(address(system));

    console.log("Deploying BuildPathFromMineToFactorySystem");
    system = new BuildPathFromMineToFactorySystem(world, address(components));
    world.registerSystem(address(system), BuildPathFromMineToFactorySystemID);
    authorizeWriter(components, PathComponentID, address(system));
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    authorizeWriter(components, UnclaimedResourceComponentID, address(system));
    authorizeWriter(components, MineComponentID, address(system));
    authorizeWriter(components, ActiveComponentID, address(system));
    authorizeWriter(components, FactoryMineBuildingsComponentID, address(system));
    authorizeWriter(components, FactoryProductionComponentID, address(system));
    console.log(address(system));

    console.log("Deploying BuildPathFromMineToMainBaseSystem");
    system = new BuildPathFromMineToMainBaseSystem(world, address(components));
    world.registerSystem(address(system), BuildPathFromMineToMainBaseSystemID);
    authorizeWriter(components, PathComponentID, address(system));
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    authorizeWriter(components, UnclaimedResourceComponentID, address(system));
    authorizeWriter(components, MineComponentID, address(system));
    console.log(address(system));

    console.log("Deploying DestroyPathSystem");
    system = new DestroyPathSystem(world, address(components));
    world.registerSystem(address(system), DestroyPathSystemID);
    authorizeWriter(components, BuildingTypeComponentID, address(system));
    authorizeWriter(components, OwnedByComponentID, address(system));
    authorizeWriter(components, PathComponentID, address(system));
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    authorizeWriter(components, UnclaimedResourceComponentID, address(system));
    authorizeWriter(components, MineComponentID, address(system));
    authorizeWriter(components, ActiveComponentID, address(system));
    authorizeWriter(components, FactoryMineBuildingsComponentID, address(system));
    authorizeWriter(components, FactoryProductionComponentID, address(system));
    console.log(address(system));

    console.log("Deploying PostDestroyPathSystem");
    system = new PostDestroyPathSystem(world, address(components));
    world.registerSystem(address(system), PostDestroyPathSystemID);
    authorizeWriter(components, MaxStorageComponentID, address(system));
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    authorizeWriter(components, UnclaimedResourceComponentID, address(system));
    authorizeWriter(components, MineComponentID, address(system));
    authorizeWriter(components, ActiveComponentID, address(system));
    authorizeWriter(components, FactoryProductionComponentID, address(system));
    authorizeWriter(components, FactoryMineBuildingsComponentID, address(system));
    console.log(address(system));

    console.log("Deploying ClaimFromMineSystem");
    system = new ClaimFromMineSystem(world, address(components));
    world.registerSystem(address(system), ClaimFromMineSystemID);
    authorizeWriter(components, BuildingTypeComponentID, address(system));
    authorizeWriter(components, OwnedByComponentID, address(system));
    authorizeWriter(components, PathComponentID, address(system));
    authorizeWriter(components, LastBuiltAtComponentID, address(system));
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    authorizeWriter(components, ItemComponentID, address(system));
    authorizeWriter(components, UnclaimedResourceComponentID, address(system));
    console.log(address(system));

    console.log("Deploying ClaimFromFactorySystem");
    system = new ClaimFromFactorySystem(world, address(components));
    world.registerSystem(address(system), ClaimFromFactorySystemID);
    authorizeWriter(components, BuildingTypeComponentID, address(system));
    authorizeWriter(components, OwnedByComponentID, address(system));
    authorizeWriter(components, PathComponentID, address(system));
    authorizeWriter(components, LastBuiltAtComponentID, address(system));
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    authorizeWriter(components, ItemComponentID, address(system));
    console.log(address(system));

    console.log("Deploying CraftSystem");
    system = new CraftSystem(world, address(components));
    world.registerSystem(address(system), CraftSystemID);
    authorizeWriter(components, BuildingTypeComponentID, address(system));
    authorizeWriter(components, OwnedByComponentID, address(system));
    authorizeWriter(components, PathComponentID, address(system));
    authorizeWriter(components, LastBuiltAtComponentID, address(system));
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    authorizeWriter(components, ItemComponentID, address(system));
    console.log(address(system));

    console.log("Deploying UpgradeSystem");
    system = new UpgradeSystem(world, address(components));
    world.registerSystem(address(system), UpgradeSystemID);
    authorizeWriter(components, LevelComponentID, address(system));
    authorizeWriter(components, ItemComponentID, address(system));
    authorizeWriter(components, MaxStorageComponentID, address(system));
    authorizeWriter(components, OwnedResourcesComponentID, address(system));
    console.log(address(system));

    console.log("Deploying PostUpgradeMineSystem");
    system = new PostUpgradeMineSystem(world, address(components));
    world.registerSystem(address(system), PostUpgradeMineSystemID);
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    authorizeWriter(components, UnclaimedResourceComponentID, address(system));
    authorizeWriter(components, MineComponentID, address(system));
    authorizeWriter(components, ActiveComponentID, address(system));
    console.log(address(system));

    console.log("Deploying PostUpgradeFactorySystem");
    system = new PostUpgradeFactorySystem(world, address(components));
    world.registerSystem(address(system), PostUpgradeFactorySystemID);
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    authorizeWriter(components, UnclaimedResourceComponentID, address(system));
    authorizeWriter(components, MineComponentID, address(system));
    authorizeWriter(components, ActiveComponentID, address(system));
    authorizeWriter(components, FactoryProductionComponentID, address(system));
    console.log(address(system));

    console.log("Deploying DebugAcquireResourcesSystem");
    system = new DebugAcquireResourcesSystem(world, address(components));
    world.registerSystem(address(system), DebugAcquireResourcesSystemID);
    authorizeWriter(components, ItemComponentID, address(system));
    console.log(address(system));

    console.log("Deploying DebugAcquireResourcesBasedOnRequirementSystem");
    system = new DebugAcquireResourcesBasedOnRequirementSystem(world, address(components));
    world.registerSystem(address(system), DebugAcquireResourcesBasedOnRequirementSystemID);
    authorizeWriter(components, ItemComponentID, address(system));
    console.log(address(system));

    console.log("Deploying DebugIgnoreBuildLimitForBuildingSystem");
    system = new DebugIgnoreBuildLimitForBuildingSystem(world, address(components));
    world.registerSystem(address(system), DebugIgnoreBuildLimitForBuildingSystemID);
    authorizeWriter(components, IgnoreBuildLimitComponentID, address(system));
    console.log(address(system));

    console.log("Deploying DebugRemoveBuildingRequirementsSystem");
    system = new DebugRemoveBuildingRequirementsSystem(world, address(components));
    world.registerSystem(address(system), DebugRemoveBuildingRequirementsSystemID);
    authorizeWriter(components, RequiredResearchComponentID, address(system));
    authorizeWriter(components, RequiredResourcesComponentID, address(system));
    console.log(address(system));

    console.log("Deploying DebugRemoveUpgradeRequirementsSystem");
    system = new DebugRemoveUpgradeRequirementsSystem(world, address(components));
    world.registerSystem(address(system), DebugRemoveUpgradeRequirementsSystemID);
    authorizeWriter(components, RequiredResearchComponentID, address(system));
    authorizeWriter(components, RequiredResourcesComponentID, address(system));
    console.log(address(system));

    console.log("Deploying DebugRemoveBuildLimitSystem");
    system = new DebugRemoveBuildLimitSystem(world, address(components));
    world.registerSystem(address(system), DebugRemoveBuildLimitSystemID);
    authorizeWriter(components, IgnoreBuildLimitComponentID, address(system));
    console.log(address(system));

    console.log("Deploying BlueprintSystem");
    system = new BlueprintSystem(world, address(components));
    world.registerSystem(address(system), BlueprintSystemID);
    authorizeWriter(components, BlueprintComponentID, address(system));
    console.log(address(system));

    console.log("Deploying DebugAcquireStorageForAllResourcesSystem");
    system = new DebugAcquireStorageForAllResourcesSystem(world, address(components));
    world.registerSystem(address(system), DebugAcquireStorageForAllResourcesSystemID);
    authorizeWriter(components, MaxStorageComponentID, address(system));
    authorizeWriter(components, OwnedResourcesComponentID, address(system));
    console.log(address(system));

    console.log("Deploying ComponentDevSystem");
    system = new ComponentDevSystem(world, address(components));
    world.registerSystem(address(system), ComponentDevSystemID);
    authorizeWriter(components, CounterComponentID, address(system));
    authorizeWriter(components, GameConfigComponentID, address(system));
    authorizeWriter(components, BuildingTypeComponentID, address(system));
    authorizeWriter(components, OwnedByComponentID, address(system));
    authorizeWriter(components, PathComponentID, address(system));
    authorizeWriter(components, LastBuiltAtComponentID, address(system));
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    authorizeWriter(components, LastResearchedAtComponentID, address(system));
    authorizeWriter(components, HealthComponentID, address(system));
    authorizeWriter(components, ItemComponentID, address(system));
    authorizeWriter(components, HasResearchedComponentID, address(system));
    authorizeWriter(components, MainBaseComponentID, address(system));
    authorizeWriter(components, StarterPackClaimedComponentID, address(system));
    authorizeWriter(components, LevelComponentID, address(system));
    authorizeWriter(components, RequiredResearchComponentID, address(system));
    authorizeWriter(components, RequiredResourcesComponentID, address(system));
    authorizeWriter(components, MaxBuildingsComponentID, address(system));
    authorizeWriter(components, IgnoreBuildLimitComponentID, address(system));
    authorizeWriter(components, ChildrenComponentID, address(system));
    authorizeWriter(components, BlueprintComponentID, address(system));
    authorizeWriter(components, MaxStorageComponentID, address(system));
    authorizeWriter(components, OwnedResourcesComponentID, address(system));
    authorizeWriter(components, MineComponentID, address(system));
    authorizeWriter(components, UnclaimedResourceComponentID, address(system));
    authorizeWriter(components, ActiveComponentID, address(system));
    authorizeWriter(components, FactoryMineBuildingsComponentID, address(system));
    authorizeWriter(components, FactoryProductionComponentID, address(system));
    authorizeWriter(components, MaxLevelComponentID, address(system));
    authorizeWriter(components, RequiredTileComponentID, address(system));
    authorizeWriter(components, RequiredPassiveResourceComponentID, address(system));
    authorizeWriter(components, PassiveResourceProductionComponentID, address(system));
    authorizeWriter(components, IsDebugComponentID, address(system));
    console.log(address(system));
  }
}
