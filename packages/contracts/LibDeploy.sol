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
import { PositionComponent, ID as PositionComponentID } from "components/PositionComponent.sol";
import { TileComponent, ID as TileComponentID } from "components/TileComponent.sol";
import { OwnedByComponent, ID as OwnedByComponentID } from "components/OwnedByComponent.sol";
import { PathComponent, ID as PathComponentID } from "components/PathComponent.sol";
import { LastBuiltAtComponent, ID as LastBuiltAtComponentID } from "components/LastBuiltAtComponent.sol";
import { LastClaimedAtComponent, ID as LastClaimedAtComponentID } from "components/LastClaimedAtComponent.sol";
import { HealthComponent, ID as HealthComponentID } from "components/HealthComponent.sol";
import { ItemComponent, ID as ItemComponentID } from "components/ItemComponent.sol";
import { ResearchComponent, ID as ResearchComponentID } from "components/ResearchComponent.sol";
import { MainBaseInitializedComponent, ID as MainBaseInitializedComponentID } from "components/MainBaseInitializedComponent.sol";
import { StarterPackInitializedComponent, ID as StarterPackInitializedComponentID } from "components/StarterPackInitializedComponent.sol";
import { BuildingComponent, ID as BuildingComponentID } from "components/BuildingComponent.sol";

// Systems (requires 'systems=...' remapping in project's remappings.txt)
import { ResearchSystem, ID as ResearchSystemID } from "systems/ResearchSystem.sol";
import { StarterPackSystem, ID as StarterPackSystemID } from "systems/StarterPackSystem.sol";
import { AttackSystem, ID as AttackSystemID } from "systems/AttackSystem.sol";
import { IncrementSystem, ID as IncrementSystemID } from "systems/IncrementSystem.sol";
import { BuildSystem, ID as BuildSystemID } from "systems/BuildSystem.sol";
import { DestroySystem, ID as DestroySystemID } from "systems/DestroySystem.sol";
import { BuildPathSystem, ID as BuildPathSystemID } from "systems/BuildPathSystem.sol";
import { DestroyPathSystem, ID as DestroyPathSystemID } from "systems/DestroyPathSystem.sol";
import { ClaimFromMineSystem, ID as ClaimFromMineSystemID } from "systems/ClaimFromMineSystem.sol";
import { ClaimFromFactorySystem, ID as ClaimFromFactorySystemID } from "systems/ClaimFromFactorySystem.sol";
import { CraftSystem, ID as CraftSystemID } from "systems/CraftSystem.sol";


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

      console.log("Deploying PositionComponent");
      comp = new PositionComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying TileComponent");
      comp = new TileComponent(address(result.world));
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

      console.log("Deploying HealthComponent");
      comp = new HealthComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying ItemComponent");
      comp = new ItemComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying ResearchComponent");
      comp = new ResearchComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying MainBaseInitializedComponent");
      comp = new MainBaseInitializedComponent(address(result.world));
      console.log(address(comp));

      console.log("Deploying StarterPackInitializedComponent");
      comp = new StarterPackInitializedComponent(address(result.world));
      console.log(address(comp));
    } 
    
    // Deploy systems 
    deploySystems(address(result.world), true);

    // Call initializer libraries
    if (!_reuseComponents) {
      // Allow initializers to utilize SystemStorage
      SystemStorage.init(result.world, result.world.components());

    }
  }
  
  function authorizeWriter(
    IUint256Component components,
    uint256 componentId,
    address writer
  ) internal {
    IComponent(getAddressById(components, componentId)).authorizeWriter(writer);
  }
  
  /**
   * Deploy systems to the given world.
   * If `init` flag is set, systems with `initialize` setting in `deploy.json` will be executed.
   */
  function deploySystems(
    address _world,
    bool init
  ) internal {
    IWorld world = IWorld(_world);
    // Deploy systems
    ISystem system; 
    IUint256Component components = world.components();

    console.log("Deploying ResearchSystem");
    system = new ResearchSystem(world, address(components));
    world.registerSystem(address(system), ResearchSystemID);
    authorizeWriter(components, ItemComponentID, address(system));
    authorizeWriter(components, ResearchComponentID, address(system));
    console.log(address(system));

    console.log("Deploying StarterPackSystem");
    system = new StarterPackSystem(world, address(components));
    world.registerSystem(address(system), StarterPackSystemID);
    authorizeWriter(components, ItemComponentID, address(system));
    authorizeWriter(components, StarterPackInitializedComponentID, address(system));
    console.log(address(system));

    console.log("Deploying AttackSystem");
    system = new AttackSystem(world, address(components));
    world.registerSystem(address(system), AttackSystemID);
    authorizeWriter(components, HealthComponentID, address(system));
    authorizeWriter(components, ItemComponentID, address(system));
    console.log(address(system));

    console.log("Deploying IncrementSystem");
    system = new IncrementSystem(world, address(components));
    world.registerSystem(address(system), IncrementSystemID);
    authorizeWriter(components, CounterComponentID, address(system));
    console.log(address(system));

    console.log("Deploying BuildSystem");
    system = new BuildSystem(world, address(components));
    world.registerSystem(address(system), BuildSystemID);
    authorizeWriter(components, PositionComponentID, address(system));
    authorizeWriter(components, TileComponentID, address(system));
    authorizeWriter(components, OwnedByComponentID, address(system));
    authorizeWriter(components, LastBuiltAtComponentID, address(system));
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    authorizeWriter(components, ItemComponentID, address(system));
    authorizeWriter(components, MainBaseInitializedComponentID, address(system));
    authorizeWriter(components, BuildingComponentID, address(system));
    console.log(address(system));

    console.log("Deploying DestroySystem");
    system = new DestroySystem(world, address(components));
    world.registerSystem(address(system), DestroySystemID);
    authorizeWriter(components, PositionComponentID, address(system));
    authorizeWriter(components, TileComponentID, address(system));
    authorizeWriter(components, OwnedByComponentID, address(system));
    authorizeWriter(components, LastBuiltAtComponentID, address(system));
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    authorizeWriter(components, HealthComponentID, address(system));
    authorizeWriter(components, PathComponentID, address(system));
    authorizeWriter(components, BuildingComponentID, address(system));
    console.log(address(system));

    console.log("Deploying BuildPathSystem");
    system = new BuildPathSystem(world, address(components));
    world.registerSystem(address(system), BuildPathSystemID);
    authorizeWriter(components, PositionComponentID, address(system));
    authorizeWriter(components, TileComponentID, address(system));
    authorizeWriter(components, OwnedByComponentID, address(system));
    authorizeWriter(components, PathComponentID, address(system));
    console.log(address(system));

    console.log("Deploying DestroyPathSystem");
    system = new DestroyPathSystem(world, address(components));
    world.registerSystem(address(system), DestroyPathSystemID);
    authorizeWriter(components, PositionComponentID, address(system));
    authorizeWriter(components, TileComponentID, address(system));
    authorizeWriter(components, OwnedByComponentID, address(system));
    authorizeWriter(components, PathComponentID, address(system));
    console.log(address(system));

    console.log("Deploying ClaimFromMineSystem");
    system = new ClaimFromMineSystem(world, address(components));
    world.registerSystem(address(system), ClaimFromMineSystemID);
    authorizeWriter(components, PositionComponentID, address(system));
    authorizeWriter(components, TileComponentID, address(system));
    authorizeWriter(components, OwnedByComponentID, address(system));
    authorizeWriter(components, PathComponentID, address(system));
    authorizeWriter(components, LastBuiltAtComponentID, address(system));
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    authorizeWriter(components, ItemComponentID, address(system));
    console.log(address(system));

    console.log("Deploying ClaimFromFactorySystem");
    system = new ClaimFromFactorySystem(world, address(components));
    world.registerSystem(address(system), ClaimFromFactorySystemID);
    authorizeWriter(components, PositionComponentID, address(system));
    authorizeWriter(components, TileComponentID, address(system));
    authorizeWriter(components, OwnedByComponentID, address(system));
    authorizeWriter(components, PathComponentID, address(system));
    authorizeWriter(components, LastBuiltAtComponentID, address(system));
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    authorizeWriter(components, ItemComponentID, address(system));
    console.log(address(system));

    console.log("Deploying CraftSystem");
    system = new CraftSystem(world, address(components));
    world.registerSystem(address(system), CraftSystemID);
    authorizeWriter(components, PositionComponentID, address(system));
    authorizeWriter(components, TileComponentID, address(system));
    authorizeWriter(components, OwnedByComponentID, address(system));
    authorizeWriter(components, PathComponentID, address(system));
    authorizeWriter(components, LastBuiltAtComponentID, address(system));
    authorizeWriter(components, LastClaimedAtComponentID, address(system));
    authorizeWriter(components, ItemComponentID, address(system));
    console.log(address(system));
  }
}
