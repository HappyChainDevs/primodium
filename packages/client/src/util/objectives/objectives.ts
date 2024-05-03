import { Entity } from "@latticexyz/recs";
import { InterfaceIcons } from "@primodiumxyz/assets";
import { EObjectives } from "contracts/config/enums";
import { EntityType, ObjectiveEnumLookup } from "../constants";
import { Objective } from "./types";

export const getObjective = (objectiveEntity: Entity) => {
  const objectiveEnum = ObjectiveEnumLookup[objectiveEntity];

  if (!objectiveEnum) return;

  const objective = Objectives.get(objectiveEnum);
  if (!objective) return;
  return objective;
};

export const Objectives = new Map<EObjectives, Objective>([
  /* ---------------------------------- A Fundamentals --------------------------------- */
  [
    /*//////////////////////////////////////////////////////////////
                          Build Mines
  //////////////////////////////////////////////////////////////*/
    EObjectives.BuildIronMine,
    {
      category: "Fundamentals",
      type: "Build",
      buildingType: EntityType.IronMine,
      description:
        "Iron mines produce iron, which you can see in the Resources pane. To build, the iron mine on the building menu. Place it on an ore tile. ",
    },
  ],
  [
    EObjectives.BuildCopperMine,
    {
      category: "Fundamentals",
      type: "Build",
      buildingType: EntityType.CopperMine,
      description: "Copper mines produce copper. Select the copper mine on the building menu. Place it on an ore tile.",
    },
  ],
  [
    EObjectives.BuildLithiumMine,
    {
      category: "Fundamentals",
      type: "Build",
      buildingType: EntityType.LithiumMine,
      description:
        "Lithium mines produce lithium. Select the lithium mine in the building menu. Place it on an ore tile.",
    },
  ],

  /*//////////////////////////////////////////////////////////////
                          Main Base
  //////////////////////////////////////////////////////////////*/
  [
    EObjectives.UpgradeMainBase1,
    {
      category: "Fundamentals",
      type: "Upgrade",
      buildingType: EntityType.MainBase,
      level: 2n,
      description:
        "Upgrading a main base gives you more resource storage and makes your asteroid stronger. To upgrade, select your main base and select Upgrade.",
    },
  ],
  [
    EObjectives.UpgradeMainBase2,
    {
      category: "Fundamentals",
      type: "Upgrade",
      requiredObjectives: [EObjectives.UpgradeMainBase1],
      requiredMainBase: 2n,
      buildingType: EntityType.MainBase,
      level: 3n,
      description:
        "Upgrading a main base gives you more resource storage and makes your asteroid stronger. To upgrade, select your main base and select Upgrade.",
    },
  ],
  [
    EObjectives.UpgradeMainBase3,
    {
      category: "Fundamentals",
      type: "Upgrade",
      requiredObjectives: [EObjectives.UpgradeMainBase2],
      requiredMainBase: 3n,
      buildingType: EntityType.MainBase,
      level: 4n,
      description:
        "Upgrading a main base gives you more resource storage and makes your asteroid stronger. To upgrade, select your main base and select Upgrade.",
    },
  ],
  [
    EObjectives.UpgradeMainBase4,
    {
      category: "Fundamentals",
      type: "Upgrade",
      requiredObjectives: [EObjectives.UpgradeMainBase3],
      requiredMainBase: 4n,
      buildingType: EntityType.MainBase,
      level: 5n,
      description:
        "Upgrading a main base gives you more resource storage and makes your asteroid stronger. To upgrade, select your main base and select Upgrade.",
    },
  ],

  /*//////////////////////////////////////////////////////////////
                          Expand Base
  //////////////////////////////////////////////////////////////*/
  [
    EObjectives.ExpandBase1,
    {
      category: "Fundamentals",
      type: "Expand",
      requiredObjectives: [EObjectives.UpgradeMainBase1],
      requiredMainBase: 2n,
      level: 2n,
      description:
        "Expansion gives you more room to build and unlocks new ores. To Expand, Select your main base and click on Expand base.",
    },
  ],
  [
    EObjectives.ExpandBase2,
    {
      category: "Fundamentals",
      type: "Expand",
      requiredObjectives: [EObjectives.UpgradeMainBase2],
      requiredMainBase: 3n,
      level: 3n,
      description:
        "Expansion gives you more room to build and unlocks new ores. To Expand, Select your main base and click on Expand base.",
    },
  ],
  [
    EObjectives.ExpandBase3,
    {
      category: "Fundamentals",
      type: "Expand",
      requiredObjectives: [EObjectives.UpgradeMainBase4],
      requiredMainBase: 5n,
      level: 4n,
      description:
        "Expansion gives you more room to build and unlocks new ores. To Expand, Select your main base and click on Expand base.",
    },
  ],

  /*//////////////////////////////////////////////////////////////
                          Upgrade Mines
  //////////////////////////////////////////////////////////////*/
  [
    EObjectives.UpgradeIronMine1,
    {
      category: "Fundamentals",
      type: "Upgrade",
      requiredObjectives: [EObjectives.BuildIronMine, EObjectives.UpgradeMainBase1],
      requiredMainBase: 2n,
      buildingType: EntityType.IronMine,
      level: 2n,
      description:
        "Upgrading a mine produces more resources without needing to expand. To upgrade, select the mine and select Upgrade.",
    },
  ],
  [
    EObjectives.UpgradeIronMine2,
    {
      category: "Fundamentals",
      type: "Upgrade",
      requiredObjectives: [EObjectives.UpgradeIronMine1, EObjectives.UpgradeMainBase2],
      requiredMainBase: 3n,
      buildingType: EntityType.IronMine,
      level: 3n,
      description:
        "Upgrading a mine produces more resources without needing to expand. To upgrade, select the mine and select Upgrade.",
    },
  ],
  [
    EObjectives.UpgradeIronMine3,
    {
      category: "Fundamentals",
      type: "Upgrade",
      requiredObjectives: [EObjectives.UpgradeIronMine2, EObjectives.UpgradeMainBase3],
      requiredMainBase: 4n,
      buildingType: EntityType.IronMine,
      level: 4n,
      description:
        "Upgrading a mine produces more resources without needing to expand. To upgrade, select the mine and select Upgrade.",
    },
  ],
  [
    EObjectives.UpgradeIronMine4,
    {
      category: "Fundamentals",
      type: "Upgrade",
      requiredObjectives: [EObjectives.UpgradeIronMine3, EObjectives.UpgradeMainBase4],
      requiredMainBase: 5n,
      buildingType: EntityType.IronMine,
      level: 5n,
      description:
        "Upgrading a mine produces more resources without needing to expand. To upgrade, select the mine and select Upgrade.",
    },
  ],

  [
    EObjectives.UpgradeCopperMine1,
    {
      category: "Fundamentals",
      type: "Upgrade",
      requiredObjectives: [EObjectives.BuildCopperMine, EObjectives.UpgradeMainBase1],
      requiredMainBase: 2n,
      buildingType: EntityType.CopperMine,
      level: 2n,
      description:
        "Upgrading a mine produces more resources without needing to expand. To upgrade, select the mine and select Upgrade.",
    },
  ],
  [
    EObjectives.UpgradeCopperMine2,
    {
      category: "Fundamentals",
      type: "Upgrade",
      requiredObjectives: [EObjectives.UpgradeCopperMine1, EObjectives.UpgradeMainBase2],
      requiredMainBase: 3n,
      buildingType: EntityType.CopperMine,
      level: 3n,
      description:
        "Upgrading a mine produces more resources without needing to expand. To upgrade, select the mine and select Upgrade.",
    },
  ],
  [
    EObjectives.UpgradeCopperMine3,
    {
      category: "Fundamentals",
      type: "Upgrade",
      requiredObjectives: [EObjectives.UpgradeCopperMine2, EObjectives.UpgradeMainBase3],
      requiredMainBase: 4n,
      buildingType: EntityType.CopperMine,
      level: 4n,
      description:
        "Upgrading a mine produces more resources without needing to expand. To upgrade, select the mine and select Upgrade.",
    },
  ],
  [
    EObjectives.UpgradeCopperMine4,
    {
      category: "Fundamentals",
      type: "Upgrade",
      requiredObjectives: [EObjectives.UpgradeCopperMine3, EObjectives.UpgradeMainBase4],
      requiredMainBase: 5n,
      buildingType: EntityType.CopperMine,
      level: 5n,
      description:
        "Upgrading a mine produces more resources without needing to expand. To upgrade, select the mine and select Upgrade.",
    },
  ],

  [
    EObjectives.UpgradeLithiumMine1,
    {
      category: "Fundamentals",
      type: "Upgrade",
      requiredObjectives: [EObjectives.BuildLithiumMine, EObjectives.UpgradeMainBase1],
      requiredMainBase: 2n,
      buildingType: EntityType.LithiumMine,
      level: 2n,
      description:
        "Upgrading a mine produces more resources without needing to expand. To upgrade, select the mine and select Upgrade.",
    },
  ],
  [
    EObjectives.UpgradeLithiumMine2,
    {
      category: "Fundamentals",
      type: "Upgrade",
      requiredObjectives: [EObjectives.UpgradeLithiumMine1, EObjectives.UpgradeMainBase2],
      requiredMainBase: 3n,
      buildingType: EntityType.LithiumMine,
      level: 3n,
      description:
        "Upgrading a mine produces more resources without needing to expand. To upgrade, select the mine and select Upgrade.",
    },
  ],
  [
    EObjectives.UpgradeLithiumMine3,
    {
      category: "Fundamentals",
      type: "Upgrade",
      requiredObjectives: [EObjectives.UpgradeLithiumMine2, EObjectives.UpgradeMainBase3],
      requiredMainBase: 4n,
      buildingType: EntityType.LithiumMine,
      level: 4n,
      description:
        "Upgrading a mine produces more resources without needing to expand. To upgrade, select the mine and select Upgrade.",
    },
  ],
  [
    EObjectives.UpgradeLithiumMine4,
    {
      category: "Fundamentals",
      type: "Upgrade",
      requiredObjectives: [EObjectives.UpgradeLithiumMine3, EObjectives.UpgradeMainBase4],
      requiredMainBase: 5n,
      buildingType: EntityType.LithiumMine,
      level: 5n,
      description:
        "Upgrading a mine produces more resources without needing to expand. To upgrade, select the mine and select Upgrade.",
    },
  ],

  /* ----------------------------- A-A Military Basics ---------------------------- */
  [
    EObjectives.BuildGarage,
    {
      category: "Unit Production",
      type: "Build",
      requiredMainBase: 2n,
      buildingType: EntityType.Garage,
      description:
        "Garages provide housing for units. View your asteroid's housing in the Resources pane. To build, Select the garage from the Storage tab of the building menu. Place it on any empty tile.",
    },
  ],
  [
    EObjectives.UpgradeGarage,
    {
      category: "Unit Production",
      type: "Upgrade",
      requiredMainBase: 2n,
      requiredObjectives: [EObjectives.BuildGarage],
      buildingType: EntityType.Garage,
      level: 2n,
      description:
        "Upgrading a garage increases available housing without using more build space. To upgrade, select the garage and select Upgrade.",
    },
  ],
  [
    EObjectives.BuildWorkshop,
    {
      category: "Unit Production",
      type: "Build",
      requiredMainBase: 2n,
      buildingType: EntityType.Workshop,
      description:
        "Workshops train marines, which are basic units. To build, select the workshop from the Military tab of the building menu and place it on any empty tile.",
    },
  ],
  [
    EObjectives.UpgradeWorkshop,
    {
      category: "Unit Production",
      type: "Upgrade",
      requiredMainBase: 2n,
      requiredObjectives: [EObjectives.BuildWorkshop],
      buildingType: EntityType.Workshop,
      level: 2n,
      description:
        "Upgrading a workshop to produce units more quickly, and unlock new units. To upgrade, select the workshop and select Upgrade.",
    },
  ],

  /* ------------------------------ A-A-A Fleet ------------------------------ */
  [
    EObjectives.CreateFleet,
    {
      category: "Fleet",
      type: "Claim",
      requiredObjectives: [EObjectives.BuildGarage, EObjectives.BuildWorkshop],
      description:
        'Fleets transport units and resources between asteroids. Create a fleet on the starmap by selecting your asteroid and selecting "Add Fleet".',
      icon: InterfaceIcons.Outgoing,
      tooltip: "Created a fleet",
    },
  ],
  [
    EObjectives.TransferFromAsteroid,
    {
      category: "Fleet",
      type: "Claim",
      requiredObjectives: [EObjectives.CreateFleet],
      description: "Transfer units and resources from an asteroid by selecting the asteroid and selecting Transfer.",
      icon: InterfaceIcons.Trade,
      tooltip: "Executed a transfer",
    },
  ],
  [
    EObjectives.TransferFromFleet,
    {
      category: "Fleet",
      type: "Claim",
      requiredObjectives: [EObjectives.TransferFromAsteroid],
      description: "Transfer units and resources from a fleet by selecting the fleet and selecting Transfer.",
      icon: InterfaceIcons.Trade,
      tooltip: "Executed a transfer",
    },
  ],
  [
    EObjectives.SendFleet,
    {
      category: "Fleet",
      type: "Claim",
      requiredObjectives: [EObjectives.TransferFromFleet],
      description:
        "Sending a fleet to an asteroid allows it to deposit resources and units or fight other fleets. To send, select a fleet and select Send. Then select the target asteroid.",
      icon: InterfaceIcons.Outgoing,
      tooltip: "Executed a fleet send",
    },
  ],

  /* ------------------------------ A-A-A-A Fleet Combat ------------------------------ */
  [
    EObjectives.BattleAsteroid,
    {
      category: "Combat",
      type: "Claim",
      requiredObjectives: [EObjectives.SendFleet],
      description:
        "Battling an asteroid allows you to raid resources and conquer asteroids. To battle, select a fleet and select Attack. Then select the target asteroid.",
      icon: InterfaceIcons.Attack,
      tooltip: "Executed an attack",
    },
  ],
  [
    EObjectives.OpenBattleReport,
    {
      category: "Combat",
      type: "Claim",
      requiredObjectives: [EObjectives.BattleAsteroid],
      description:
        "Open a battle report to see the results of a battle. To open, select Battle Reports in the bottom bar.",
      icon: InterfaceIcons.Reports,
      tooltip: "Viewed a battle report",
    },
  ],
  [
    EObjectives.BattleFleet,
    {
      category: "Combat",
      type: "Claim",
      requiredObjectives: [EObjectives.OpenBattleReport],
      description:
        "Battling a fleet lets you defend asteroids and steal resources. To battle, select a fleet or asteroid and select Attack. Then select the target fleet.",
      icon: InterfaceIcons.Attack,
      tooltip: "Executed an attack",
    },
  ],

  /* -------------------------- A-A-A-B Conquest (continued) ------------------------- */
  [
    EObjectives.BuildShipyard,
    {
      category: "Conquest",
      type: "Build",
      requiredMainBase: 8n,
      buildingType: EntityType.Shipyard,
      description: "Shipyards constuct Colony Ships, which colonize asteroids.",
    },
  ],
  [
    EObjectives.TrainColonyShip,
    {
      category: "Conquest",
      type: "Train",
      requiredMainBase: 8n,
      requiredObjectives: [EObjectives.BuildShipyard],
      unitType: EntityType.ColonyShip,
      unitCount: 1n,
      description:
        "Select the Shipyard you placed on the map to build a Colony Ship. Colony ships can decrypt other asteroids and colonize on them.",
    },
  ],
  [
    EObjectives.DecryptAttack,
    {
      category: "Conquest",
      type: "Claim",
      requiredObjectives: [EObjectives.TrainColonyShip],
      description:
        "Once an asteroid's decryption reaches zero, you can conquer it. To decrypt an asteroid, attack it using a fleet with a Colony Ship. View the asteroid's decryption when you hover.",
      icon: InterfaceIcons.EncryptionBlue,
      tooltip: "Decrypted an asteroid",
    },
  ],
  [
    EObjectives.CaptureAsteroid,
    {
      category: "Conquest",
      type: "Asteroid",
      requiredObjectives: [EObjectives.DecryptAttack],
      asteroidType: "basic",
      description:
        "Capturing an asteroid allows you to take control of it. To capture, you need to reduce an asteroid's encryption to 0 using Colony Ships.",
    },
  ],

  /* --------------------- A-A-A-B-A Motherlode Extraction -------------------- */
  [
    EObjectives.CaptureMotherlodeAsteroid,
    {
      category: "Motherlode",
      type: "Asteroid",
      asteroidType: "motherlode",
      requiredObjectives: [EObjectives.CaptureAsteroid],
      description:
        "Capturing motherlode asteroids lets you mine rare resources. To earn, capture a motherlode asteroid near your home asteroid.",
    },
  ],

  [
    EObjectives.BuildRareMine,
    {
      category: "Motherlode",
      type: "BuildAny",
      buildingTypes: [
        EntityType.KimberliteMine,
        EntityType.IridiumMine,
        EntityType.PlatinumMine,
        EntityType.TitaniumMine,
      ],
      requiredObjectives: [EObjectives.CaptureMotherlodeAsteroid],
      description: "To extract a rare resource, capture a motherlode asteroid and build a rare mine on an ore tile.",
    },
  ],

  /* ------------------------ A-A-A-B-B Primodium Points ----------------------- */

  [
    EObjectives.EarnPrimodiumOnAsteroid,
    {
      category: "Victory (Shard)",
      type: "Claim",
      requiredObjectives: [EObjectives.CaptureAsteroid],
      description:
        "Claiming Primodium allows you to win the game. To claim, capture asteroids and hold them until you can claim their Primodium.",
      icon: InterfaceIcons.Leaderboard,
      tooltip: "Claimed Primodium",
    },
  ],
  [
    EObjectives.CaptureVolatileShard,
    {
      category: "Victory (Shard)",
      type: "Asteroid",
      asteroidType: "shard",
      requiredObjectives: [EObjectives.CaptureAsteroid],
      description:
        "Volatile Shards are rare space rocks that are made of Primodium. Over time, shards leach Primodium. To earn, capture a Shard while it is leaching Primodium.",
    },
  ],
  [
    EObjectives.ExplodeVolatileShard,
    {
      category: "Victory (Shard)",
      type: "Claim",
      requiredObjectives: [EObjectives.CaptureVolatileShard],
      description:
        "To explode a shard, select an owned shard when an explosion is imminent and select Explode. Be warned, the explosion kills all fleets in the area!",
      icon: InterfaceIcons.Asteroid,
      tooltip: "Exploded Shard",
    },
  ],
  /* ------------------------- A-A-A-B-C Extraction Points ------------------------ */

  [
    EObjectives.CaptureWormholeAsteroid,
    {
      category: "Victory (Wormhole)",
      type: "Asteroid",
      asteroidType: "wormhole",
      requiredObjectives: [EObjectives.CaptureAsteroid],
      description:
        "A wormhole asteroid is a special asteroid that lets you earn points on the Extraction leaderboard. To capture, decrypt a nearby Wormhole Asteroid.",
    },
  ],
  [
    EObjectives.TeleportResources,
    {
      category: "Victory (Wormhole)",
      type: "Claim",
      requiredObjectives: [EObjectives.CaptureWormholeAsteroid],
      description:
        "Claiming extraction points improves your rank on the Extraction leaderboard. To claim, click on a Wormhole Generator and send it the resource it currently requires.",
      icon: InterfaceIcons.Leaderboard,
      tooltip: "Claimed extraction points",
    },
  ],
  /* ------------------------ A-A-A-C Fleet Management ------------------------ */

  [
    EObjectives.BuildStarmapper,
    {
      category: "Fleet",
      type: "Build",
      requiredMainBase: 3n,
      buildingType: EntityType.StarmapperStation,
      description: "A starmapper station increases the number of fleets you can create.",
    },
  ],
  [
    EObjectives.DefendWithFleet,
    {
      category: "Fleet",
      type: "Claim",
      requiredObjectives: [EObjectives.CreateFleet],
      description:
        "Defending an asteroid with a fleet provides the fleet's defense to that asteroid's strength. To defend, go to the fleet's Management pane and select Defend.",
      icon: InterfaceIcons.Outgoing,
      tooltip: "Landed a fleet",
    },
  ],
  [
    EObjectives.BlockWithFleet,
    {
      category: "Fleet",
      type: "Claim",
      requiredObjectives: [EObjectives.DefendWithFleet],
      description:
        "Blocking with a fleet prevents all other fleets from leaving the current asteroid. To block, go to the fleet's Management pane and select Block.",
      icon: InterfaceIcons.Outgoing,
      tooltip: "Landed a fleet",
    },
  ],
  [
    EObjectives.LandFleet,
    {
      category: "Fleet",
      type: "Claim",
      requiredObjectives: [EObjectives.BlockWithFleet],
      description:
        "Landing a fleet on an asteroid sets the fleet's owner to that asteroid. It also deposit all resources and units. To land, select a fleet and select Land.",
      icon: InterfaceIcons.Outgoing,
      tooltip: "Landed a fleet",
    },
  ],

  /* ----------------------- A-A-B Unit Production ---------------------- */
  [
    EObjectives.TrainMinutemanMarine,
    {
      category: "Unit Production",
      type: "Train",
      requiredMainBase: 2n,
      requiredObjectives: [EObjectives.BuildWorkshop],
      unitType: EntityType.MinutemanMarine,
      unitCount: 8n,
      description:
        "Minutemen are weak units that are trained quickly, move fast, and carry lots of cargo. To train, select a workshop and select Train Units.",
    },
  ],
  [
    EObjectives.TrainTridentMarine,
    {
      category: "Unit Production",
      type: "Train",
      requiredMainBase: 8n,
      requiredObjectives: [EObjectives.TrainMinutemanMarine],
      unitType: EntityType.TridentMarine,
      unitCount: 8,

      description:
        "Select the workshop you placed on the map to train Trident marines. Trident marines are basic well-rounded units.",
    },
  ],
  [
    EObjectives.TrainLightningCraft,
    {
      category: "Unit Production",
      type: "Train",
      requiredMainBase: 10n,
      requiredObjectives: [EObjectives.TrainTridentMarine],
      unitType: EntityType.LightningCraft,
      unitCount: 8n,
      description:
        "Upgrade the workshop you placed on the map to Level 10 to unlock the ability to train Lightning Ships. Lightning Ships are weak but travel extremely fast without other types of ships.",
    },
  ],

  [
    EObjectives.BuildDroneFactory,
    {
      category: "Unit Production",
      type: "Build",
      requiredMainBase: 5n,
      buildingType: EntityType.DroneFactory,
      description:
        "Drone factories train drones, which are strong and specialized. To build, select the drone factory from the building menu and place it on any empty tile.",
    },
  ],

  /* --------------------- A-A-B-A Unit Management ---------------------------- */
  [
    EObjectives.UpgradeUnit,
    {
      category: "Unit Management",
      type: "Claim",
      requiredObjectives: [EObjectives.BuildDroneFactory],
      description:
        "Upgrading a unit increases its stats. To upgrade, select Upgrade Units next to Battle Reports and choose a unit to upgrade.",
      icon: InterfaceIcons.Add,
      tooltip: "Upgraded a unit",
    },
  ],
  /* --------------------- A-A-B-B Unit Production (cont) --------------------- */
  [
    EObjectives.TrainAnvilDrone,
    {
      category: "Unit Production",
      type: "Train",
      requiredMainBase: 5n,
      requiredObjectives: [EObjectives.BuildDroneFactory],
      unitType: EntityType.AnvilDrone,
      unitCount: 8n,
      description:
        "Select the drone factory you placed on the map to build anvil drones. Anvil drones are standard defensive drones.",
    },
  ],
  [
    EObjectives.TrainHammerDrone,
    {
      category: "Unit Production",
      type: "Train",
      requiredMainBase: 5n,
      requiredObjectives: [EObjectives.BuildDroneFactory],
      unitType: EntityType.HammerDrone,
      unitCount: 8n,
      description:
        "Select the drone factory you placed on the map to build hammer drones. Hammer drones are standard attacking drones.",
    },
  ],
  [
    EObjectives.TrainAegisDrone,
    {
      category: "Unit Production",
      type: "Train",
      requiredMainBase: 8n,
      unitType: EntityType.AegisDrone,
      requiredObjectives: [EObjectives.TrainAnvilDrone],
      unitCount: 8n,
      description:
        "Upgrade the drone factory you placed on the map to Level 2 to unlock the ability to build Aegis drones. Aegis drones are strong but slow defensive units and take up more housing.",
    },
  ],
  [
    EObjectives.TrainStingerDrone,
    {
      category: "Unit Production",
      type: "Train",
      requiredMainBase: 8n,
      requiredObjectives: [EObjectives.TrainHammerDrone],
      unitType: EntityType.StingerDrone,
      unitCount: 8n,
      description:
        "Upgrade the drone factory you placed on the map to Level 3 to unlock the ability to build Stinger drones. Stinger drones are strong but slow offensive units and take up more housing.",
    },
  ],

  /* --------------------- A-A-B-C Unit Storage --------------------- */
  [
    EObjectives.BuildHangar,
    {
      category: "Unit Storage",
      type: "Build",
      requiredMainBase: 5n,
      buildingType: EntityType.Hangar,
      description:
        "Hangars provide large amounts of housing for units. To build, select the hangar from the building menu and place it on an empty tile.",
    },
  ],

  /* ------------------------------ A-A-C Defense ----------------------------- */
  [
    EObjectives.BuildShieldGenerator,
    {
      category: "Defense",
      type: "Build",
      requiredMainBase: 5n,
      buildingType: EntityType.ShieldGenerator,
      description:
        "Shield generators provide strength boosts to supplement defense provided by fleets and SAM launchers.",
    },
  ],
  [
    EObjectives.BuildVault,
    {
      category: "Defense",
      type: "Build",
      requiredMainBase: 7n,
      buildingType: EntityType.Vault,
      description: "Vaults protect your resources from being raided.",
    },
  ],
  [
    EObjectives.BuildSAMLauncher,
    {
      category: "Defense",
      type: "Build",
      requiredMainBase: 8n,
      buildingType: EntityType.SAMLauncher,
      description:
        "SAM launchers give your asteroid strength, protecting you from enemy attacks! You need electricity to power them.",
    },
  ],

  /* ----------------------------- A-B Production ----------------------------- */
  [
    EObjectives.BuildStorageUnit,
    {
      category: "Resource Production",
      type: "Build",
      requiredMainBase: 3n,
      buildingType: EntityType.StorageUnit,
      description:
        "Storage units increase your resource storage. To build, select the Storage Unit from the building menu and place it on any empty tile.",
    },
  ],
  [
    EObjectives.UpgradeStorageUnit1,
    {
      category: "Resource Production",
      type: "Upgrade",
      requiredObjectives: [EObjectives.BuildStorageUnit],
      buildingType: EntityType.StorageUnit,
      level: 2n,
      description:
        "Upgrading a workshop to produce units more quickly, and unlock new units. To upgrade, select the workshop and select Upgrade.",
    },
  ],
  [
    EObjectives.BuildIronPlateFactory,
    {
      category: "Resource Production",
      type: "Build",
      requiredMainBase: 5n,
      requiredObjectives: [EObjectives.BuildIronMine],
      buildingType: EntityType.IronPlateFactory,
      description:
        "Iron Plate Factories produce iron plates by burning iron. To build, select the factory in the building menu. Place it on any empty tile.",
    },
  ],
  [
    EObjectives.BuildAlloyFactory,
    {
      category: "Resource Production",
      type: "Build",
      requiredMainBase: 5n,
      requiredObjectives: [EObjectives.BuildCopperMine],
      buildingType: EntityType.AlloyFactory,
      description:
        "Alloy factories produce alloys by burning iron and copper. To build, select the alloy factory in the building menu. Place it on any empty tile.",
    },
  ],
  [
    EObjectives.BuildPVCellFactory,
    {
      category: "Resource Production",
      type: "Build",
      requiredMainBase: 5n,
      requiredObjectives: [EObjectives.BuildLithiumMine],
      buildingType: EntityType.PVCellFactory,
      description:
        "The PV Cell factory produces photovoltaic cells by burning lithium. To build, select the PV Cell factory on the building menu and place it on any empty tile.",
    },
  ],

  /* ------------------------ A-B-A Production ----------------------- */

  [
    EObjectives.BuildSolarPanel,
    {
      category: "Resource Production",
      type: "Build",
      requiredMainBase: 5n,
      buildingType: EntityType.SolarPanel,
      description:
        "Solar panels provide electricity, which is used for advanced buildings. To build, select the solar panel from the building menu and place it on any empty tile.",
    },
  ],

  /* ------------------------------ A-B-B Market ------------------------------ */

  [
    EObjectives.BuildMarket,
    {
      category: "Market",
      type: "Build",
      requiredMainBase: 6n,
      buildingType: EntityType.Market,
      description:
        "Markets grant access to the global resource marketplace. It's perfect for moments when you are missing a rare resource!",
    },
  ],

  [
    EObjectives.MarketSwap,
    {
      category: "Market",
      type: "Claim",
      requiredObjectives: [EObjectives.BuildMarket],
      description:
        "Swapping resources on the market allows you to get resources you need. To swap, select the Market and select Swap.",
      icon: InterfaceIcons.Trade,
      tooltip: "Executed a swap",
    },
  ],

  /* ------------------------------- A-C Alliance ------------------------------ */
  [
    EObjectives.JoinAlliance,
    {
      category: "Alliance",
      type: "JoinAlliance",
      requiredObjectives: [EObjectives.ExpandBase1],
      requiredMainBase: 2n,
      description:
        "Joining an alliance allows you to combine your points with other players. Select Alliance Management in the bottom bar. Find an Alliance to join and select Join.",
    },
  ],
]);
