import { defineWorld } from "@latticexyz/world";

import { MUDEnums } from "./config/enums";
import { prototypeConfig } from "./config/prototypeConfig";
import { ConfigWithPrototypes } from "./ts/prototypes/types";

// Exclude dev systems if not in dev PRI_DEV

/* -------------------------------------------------------------------------- */
/*                                   Config                                   */
/* -------------------------------------------------------------------------- */

export const worldInput = {
  namespace: "Primodium",
  systems: {
    // these systems are closed access by default
    S_ProductionRateSystem: {},
    S_SpendResourcesSystem: {},
    S_RewardsSystem: {},
    S_StorageSystem: {},
    S_BattleApplyDamageSystem: {},
    S_BattleRaidResolveSystem: {},
    S_BattleEncryptionResolveSystem: {},
    S_FleetResetIfNoUnitsLeftSystem: {},
    S_InitAsteroidOwnerSystem: {},
    S_TransferAsteroidSystem: {},
    S_CreateSecondaryAsteroidSystem: {},
  },

  // using as any here for now because of a type issue and also because the enums are not being recognized in our codebase rn
  enums: MUDEnums as unknown as { [key: string]: ["NULL"] },
  codegen: {},
  tables: {
    /* ----------------------------------- Dev ---------------------------------- */
    Counter: {
      key: [],
      schema: { value: "uint256" },
    },

    /* --------------------------------- Common --------------------------------- */
    // if the key is a player, value is their home asteroid.
    // if the key is an asteroid, value is its main base.
    Home: {
      key: ["entity"],
      schema: { entity: "bytes32", value: "bytes32" },
    },

    P_GameConfig: {
      key: [],
      schema: {
        admin: "address",
        unitProductionRate: "uint256",
        travelTime: "uint256",
        worldSpeed: "uint256",
        tax: "uint256",
        maxAsteroidsPerPlayer: "uint256",
        asteroidChanceInv: "uint256",
        asteroidDistance: "uint256",
      },
    },

    P_ColonyShipConfig: {
      key: [],
      schema: {
        resource: "uint8",
        initialCost: "uint256",
        decryption: "uint256",
        cooldownExtension: "uint256",
      },
    },

    Position: {
      key: ["entity"],
      schema: { entity: "bytes32", x: "int32", y: "int32", parentEntity: "bytes32" },
    },

    ReversePosition: {
      key: ["x", "y"],
      schema: { x: "int32", y: "int32", entity: "bytes32" },
    },

    OwnedBy: {
      key: ["entity"],
      schema: { entity: "bytes32", value: "bytes32" },
    },

    Level: {
      key: ["entity"],
      schema: { entity: "bytes32", value: "uint256" },
    },

    Spawned: {
      key: ["entity"],
      schema: { entity: "bytes32", value: "bool" },
    },

    /*
     This table maps building types to their prototypes. 
     For example:
        The key is the EBuilding enum value for the building type (e.g. EBuilding.MainBase). 
        The value is the prototype name (e.g. "MainBase")
        It is autogenerated in the build step.
    */
    P_EnumToPrototype: {
      key: ["key", "id"],
      schema: { key: "bytes32", id: "uint8", value: "bytes32" },
    },

    /* -------------------------------- Asteroids ------------------------------- */
    AsteroidCount: {
      key: [],
      schema: { value: "uint256" },
    },

    P_Asteroid: {
      key: [],
      schema: {
        xBounds: "int32",
        yBounds: "int32",
      },
    },

    Asteroid: {
      key: ["entity"],
      schema: { entity: "bytes32", isAsteroid: "bool", maxLevel: "uint256", mapId: "uint8", spawnsSecondary: "bool" },
    },

    P_WormholeAsteroidConfig: {
      key: [],
      schema: { wormholeAsteroidSlot: "uint256", maxLevel: "uint256", mapId: "uint8" },
    },

    // note: dimensions will always be positive, but are int32s so they work with coords
    Dimensions: {
      key: ["key", "level"],
      schema: { key: "bytes32", level: "uint256", width: "int32", height: "int32" },
    },

    P_Terrain: {
      key: ["mapId", "x", "y"],
      schema: { mapId: "uint8", x: "int32", y: "int32", value: "uint8" }, // EResource
    },

    Specialty: {
      key: ["entity"],
      schema: { entity: "bytes32", value: "uint8" }, // EResource
    },

    /* -------------------------------- Resources ------------------------------- */
    P_IsResource: {
      key: ["id"],
      schema: { id: "uint8", isResource: "bool", isAdvanced: "bool" },
    },

    P_IsUtility: {
      key: ["id"],
      schema: { id: "uint8", value: "bool" },
    },
    //when the storage for this resources is provided it is full
    P_IsRecoverable: {
      key: ["id"],
      schema: { id: "uint8", value: "bool" },
    },

    P_Transportables: {
      key: [],
      schema: { value: "uint8[]" }, // EResource
    },

    // contains a bitmap
    UsedTiles: {
      key: ["entity"],
      schema: { entity: "bytes32", value: "uint256[]" },
    },

    // tracks the max resource a player can store
    MaxResourceCount: {
      key: ["entity", "resource"],
      schema: { entity: "bytes32", resource: "uint8", value: "uint256" },
    },

    LastClaimedAt: {
      key: ["entity"],
      schema: { entity: "bytes32", value: "uint256" },
    },

    ResourceCount: {
      key: ["entity", "resource"],
      schema: { entity: "bytes32", resource: "uint8", value: "uint256" },
    },

    // Used in the mbuilding utilities Map data structure
    Value_UtilityMap: {
      key: ["entity", "utility"],
      schema: { entity: "bytes32", utility: "uint8", value: "uint256" },
    },
    Meta_UtilityMap: {
      key: ["entity", "utility"],
      schema: { entity: "bytes32", utility: "uint8", stored: "bool", index: "uint256" },
    },
    Keys_UtilityMap: {
      key: ["entity"],
      schema: { entity: "bytes32", value: "uint8[]" },
    },

    /* --------------------------- Build Requirements --------------------------- */
    P_RequiredTile: {
      key: ["prototype"],
      schema: { prototype: "bytes32", value: "uint8" }, // EResource
    },
    P_RequiredBaseLevel: {
      key: ["prototype", "level"],
      schema: { prototype: "bytes32", level: "uint256", value: "uint256" },
    },

    P_RequiredResources: {
      key: ["prototype", "level"],
      schema: {
        prototype: "bytes32",
        level: "uint256",
        // mud doesnt recognize EResource arrays so we will manually convert them
        resources: "uint8[]",
        amounts: "uint256[]",
      },
    },

    P_RequiredDependency: {
      key: ["prototype", "level"],
      schema: {
        prototype: "bytes32",
        level: "uint256",
        // mud doesnt recognize EResource arrays so we will manually convert them
        resource: "uint8",
        amount: "uint256",
      },
    },

    P_RequiredUpgradeResources: {
      key: ["prototype", "level"],
      schema: { prototype: "bytes32", level: "uint256", resources: "uint8[]", amounts: "uint256[]" },
    },
    /* -------------------------------- Buildings ------------------------------- */

    P_Blueprint: {
      key: ["prototype"],
      schema: { prototype: "bytes32", value: "int32[]" },
    },

    P_MaxLevel: {
      key: ["prototype"],
      schema: { prototype: "bytes32", value: "uint256" },
    },

    P_Production: {
      key: ["prototype", "level"],
      schema: {
        prototype: "bytes32",
        level: "uint256",
        // mud doesnt recognize EResource arrays so we will manually convert them
        // EResource
        resources: "uint8[]",
        amounts: "uint256[]",
      },
    },

    P_UnitProdTypes: {
      key: ["prototype", "level"],
      schema: { prototype: "bytes32", level: "uint256", value: "bytes32[]" },
    },

    P_UnitProdMultiplier: {
      key: ["prototype", "level"],
      schema: { prototype: "bytes32", level: "uint256", value: "uint256" },
    },

    Meta_UnitFactorySet: {
      key: ["entity", "building"],
      schema: { entity: "bytes32", building: "bytes32", stored: "bool", index: "uint256" },
    },

    Keys_UnitFactorySet: {
      key: ["entity"],
      schema: { entity: "bytes32", value: "bytes32[]" },
    },

    P_ByLevelMaxResourceUpgrades: {
      key: ["prototype", "resource", "level"],
      schema: { prototype: "bytes32", resource: "uint8", level: "uint256", value: "uint256" },
    },

    P_ListMaxResourceUpgrades: {
      key: ["prototype", "level"],
      schema: { prototype: "bytes32", level: "uint256", value: "uint8[]" },
    },

    P_ConsumesResource: {
      key: ["resource"],
      schema: { resource: "uint8", value: "uint8" },
    },

    BuildingType: {
      key: ["entity"],
      schema: { entity: "bytes32", value: "bytes32" },
    },

    TilePositions: {
      key: ["entity"],
      schema: { entity: "bytes32", value: "int32[]" },
    },
    Children: {
      key: ["entity"],
      schema: { entity: "bytes32", value: "bytes32[]" },
    },

    ProductionRate: {
      key: ["entity", "resource"],
      schema: { entity: "bytes32", resource: "uint8", value: "uint256" },
    },

    ConsumptionRate: {
      key: ["entity", "resource"],
      schema: { entity: "bytes32", resource: "uint8", value: "uint256" },
    },

    IsActive: {
      key: ["entity"],
      schema: { entity: "bytes32", value: "bool" },
    },

    /* ------------------------------- Motherlode ------------------------------- */

    P_SizeToAmount: {
      key: ["size"],
      schema: { size: "uint8", value: "uint256" },
    },

    P_RawResource: {
      key: ["resource"],
      schema: { resource: "uint8", value: "uint8" },
    },

    /* ----------------------------- Unit Production ---------------------------- */
    // stores an array of all unit prototypes in the game
    P_UnitPrototypes: {
      key: [],
      schema: { value: "bytes32[]" },
    },

    P_Unit: {
      key: ["entity", "level"],
      schema: {
        entity: "bytes32",
        level: "uint256",
        attack: "uint256",
        defense: "uint256",
        speed: "uint256",
        cargo: "uint256",
        trainingTime: "uint256",
        hp: "uint256",
      },
    },

    Meta_UnitProductionQueue: {
      key: ["entity"],
      schema: { entity: "bytes32", front: "uint256", back: "uint256", queue: "bytes32[]" },
    },

    Value_UnitProductionQueue: {
      key: ["entity", "index"],
      schema: { entity: "bytes32", index: "uint256", unitEntity: "bytes32", quantity: "uint256" },
    },

    UnitLevel: {
      key: ["entity", "unit"],
      schema: { entity: "bytes32", unit: "bytes32", value: "uint256" },
    },

    UnitCount: {
      key: ["entity", "unit"],
      schema: { entity: "bytes32", unit: "bytes32", value: "uint256" },
    },

    // used to record the progress of claiming the current unit
    ClaimOffset: {
      key: ["entity"],
      schema: { entity: "bytes32", value: "uint256" },
    },

    // can only increase, never decrease. Assigned to player to prevent weird edge cases of losing asteroids
    ColonyShipSlots: {
      key: ["playerEntity"],
      schema: { playerEntity: "bytes32", training: "uint256", capacity: "uint256" },
    },

    P_ColonyShipSlotConfig: {
      key: [],
      schema: {
        resources: "uint8[]",
        amounts: "uint256[]",
      },
    },

    ColonyShipSlotInstallments: {
      key: ["playerEntity"],
      schema: {
        playerEntity: "bytes32",
        // mud doesnt recognize EResource arrays so we will manually convert them
        resources: "uint8[]",
        amounts: "uint256[]",
      },
    },

    /* ------------------------------ Sending Units ----------------------------- */

    FleetMovement: {
      key: ["entity"],
      schema: {
        entity: "bytes32",
        origin: "bytes32",
        destination: "bytes32",
        sendTime: "uint256",
        arrivalTime: "uint256",
      },
    },

    FleetStance: {
      key: ["entity"],
      schema: { entity: "bytes32", stance: "uint8", target: "bytes32" },
    },

    IsFleet: {
      key: ["entity"],
      schema: { entity: "bytes32", value: "bool" },
    },

    IsFleetEmpty: {
      key: ["entity"],
      schema: { entity: "bytes32", value: "bool" },
      type: "offchainTable",
    },

    // used in the Fleet Set
    Keys_FleetSet: {
      key: ["entity", "key"],
      schema: { entity: "bytes32", key: "bytes32", itemKeys: "bytes32[]" },
    },

    Meta_FleetSet: {
      key: ["entity", "key", "fleetEntity"],
      schema: { entity: "bytes32", key: "bytes32", fleetEntity: "bytes32", stored: "bool", index: "uint256" },
    },

    /* ------------------------------ Battle Result ----------------------------- */
    BattleResult: {
      key: ["battleEntity"],
      schema: {
        battleEntity: "bytes32",
        aggressorEntity: "bytes32", //can be fleet or space rock
        aggressorDamage: "uint256", //can be fleet or space rock
        targetEntity: "bytes32", //can be fleet or space rock
        targetDamage: "uint256", //can be fleet or space rock
        winnerEntity: "bytes32",
        asteroidEntity: "bytes32", // place where battle took place
        playerEntity: "bytes32", // player who initiated the battle
        targetPlayerEntity: "bytes32", // player who was attacked
        timestamp: "uint256", // timestamp of battle
        aggressorAllies: "bytes32[]", //only fleets
        targetAllies: "bytes32[]", //only fleets
      },
      type: "offchainTable",
    },

    BattleDamageDealtResult: {
      key: ["battleEntity", "participantEntity"],
      schema: { battleEntity: "bytes32", participantEntity: "bytes32", damageDealt: "uint256" },
      type: "offchainTable",
    },

    BattleDamageTakenResult: {
      key: ["battleEntity", "participantEntity"],
      schema: { battleEntity: "bytes32", participantEntity: "bytes32", hpAtStart: "uint256", damageTaken: "uint256" },
      type: "offchainTable",
    },

    BattleUnitResult: {
      key: ["battleEntity", "participantEntity"],
      schema: {
        battleEntity: "bytes32",
        participantEntity: "bytes32",
        unitLevels: "uint256[]",
        unitsAtStart: "uint256[]",
        casualties: "uint256[]",
      },
      type: "offchainTable",
    },

    BattleRaidResult: {
      key: ["battleEntity", "participantEntity"],
      schema: {
        battleEntity: "bytes32",
        participantEntity: "bytes32",
        resourcesAtStart: "uint256[]",
        resourcesAtEnd: "uint256[]",
      },
      type: "offchainTable",
    },

    BattleEncryptionResult: {
      key: ["battleEntity", "participantEntity"],
      schema: {
        battleEntity: "bytes32",
        participantEntity: "bytes32",
        encryptionAtStart: "uint256",
        encryptionAtEnd: "uint256",
      },
      type: "offchainTable",
    },

    RaidResult: {
      key: ["entity"],
      schema: { entity: "bytes32", defenderValuesBeforeRaid: "uint256[]", raidedAmount: "uint256[]" },
      type: "offchainTable",
    },

    DamageDealt: {
      key: ["entity"],
      schema: { entity: "bytes32", value: "uint256" },
    },

    /* ---------------------------------- Score --------------------------------- */

    P_ScoreMultiplier: {
      key: ["entity"],
      schema: { entity: "uint8", value: "uint256" },
    },
    Score: {
      key: ["entity"],
      schema: { entity: "bytes32", value: "uint256" },
    },

    /* ------------------------------ Test Hook ----------------------------- */
    HookedValue: {
      key: ["entity"],
      schema: { entity: "bytes32", value: "uint256" },
    },

    OnHookChangedValue: {
      key: ["entity"],
      schema: { entity: "bytes32", value: "uint256" },
    },

    /* ------------------------------ Objectives ----------------------------- */

    P_RequiredObjectives: {
      key: ["prototype"],
      schema: {
        prototype: "bytes32",
        // mud doesnt recognize EObjective arrays so we will manually convert them
        objectives: "bytes32[]",
      },
    },

    CompletedObjective: {
      key: ["entity", "objective"],
      schema: { entity: "bytes32", objective: "bytes32", value: "bool" },
    },

    P_UnitReward: {
      key: ["prototype"],
      schema: {
        prototype: "bytes32",
        // mud doesnt recognize EUnit arrays so we will manually convert them
        units: "bytes32[]",
        amounts: "uint256[]",
      },
    },

    P_ResourceReward: {
      key: ["prototype"],
      schema: {
        prototype: "bytes32",
        // mud doesnt recognize EResource arrays so we will manually convert them
        resources: "uint8[]",
        amounts: "uint256[]",
      },
    },

    P_HasBuiltBuildings: {
      key: ["prototype"],
      schema: {
        prototype: "bytes32",
        value: "bytes32[]",
      },
    },

    HasBuiltBuilding: {
      key: ["entity", "buildingType"],
      schema: { entity: "bytes32", buildingType: "bytes32", value: "bool" },
    },

    P_ProducedResources: {
      key: ["prototype"],
      schema: {
        prototype: "bytes32",
        // mud doesnt recognize EResource arrays so we will manually convert them
        resources: "uint8[]",
        amounts: "uint256[]",
      },
    },

    ProducedResource: {
      key: ["entity", "resource"],
      schema: { entity: "bytes32", resource: "uint8", value: "uint256" },
    },

    P_DestroyedUnits: {
      key: ["prototype"],
      schema: {
        prototype: "bytes32",
        // mud doesnt recognize EUnit arrays so we will manually convert them
        units: "bytes32[]",
        amounts: "uint256[]",
      },
    },

    DestroyedUnit: {
      key: ["entity", "unit"],
      schema: { entity: "bytes32", unit: "bytes32", value: "uint256" },
    },

    P_RaidedResources: {
      key: ["prototype"],
      schema: {
        prototype: "bytes32",
        // mud doesnt recognize EResource arrays so we will manually convert them
        resources: "uint8[]",
        amounts: "uint256[]",
      },
    },

    RaidedResource: {
      key: ["entity", "resource"],
      schema: { entity: "bytes32", resource: "uint8", value: "uint256" },
    },

    P_RequiredUnits: {
      key: ["prototype"],
      schema: {
        prototype: "bytes32",
        // mud doesnt recognize EUnit arrays so we will manually convert them
        units: "bytes32[]",
        amounts: "uint256[]",
      },
    },

    P_ProducedUnits: {
      key: ["prototype"],
      schema: {
        prototype: "bytes32",
        // mud doesnt recognize EUnit arrays so we will manually convert them
        units: "bytes32[]",
        amounts: "uint256[]",
      },
    },

    ProducedUnit: {
      key: ["entity", "unit"],
      schema: { entity: "bytes32", unit: "bytes32", value: "uint256" },
    },

    P_RequiredExpansion: {
      key: ["prototype"],
      schema: { prototype: "bytes32", value: "uint256" },
    },

    /* ------------------------------ Defense ----------------------------- */

    P_GracePeriod: {
      key: [],
      schema: {
        asteroid: "uint256",
        fleet: "uint256",
      },
    },

    GracePeriod: {
      key: ["entity"],
      schema: { entity: "bytes32", value: "uint256" },
    },

    CooldownEnd: {
      key: ["entity"],
      schema: { entity: "bytes32", value: "uint256" },
    },
    /* ------------------------------ Alliance ----------------------------- */

    P_AllianceConfig: {
      key: [],
      schema: {
        maxAllianceMembers: "uint256",
      },
    },

    PlayerAlliance: {
      key: ["entity"],
      schema: { entity: "bytes32", alliance: "bytes32", role: "uint8" },
    },

    Alliance: {
      key: ["entity"],
      schema: { entity: "bytes32", name: "bytes32", score: "uint256", inviteMode: "uint8" },
    },

    Keys_AllianceMemberSet: {
      key: ["entity"],
      schema: { entity: "bytes32", memberKeys: "bytes32[]" },
    },

    Meta_AllianceMemberSet: {
      key: ["entity", "memberKey"],
      schema: { entity: "bytes32", memberKey: "bytes32", stored: "bool", index: "uint256" },
    },

    AllianceInvitation: {
      key: ["entity", "alliance"],
      schema: { entity: "bytes32", alliance: "bytes32", inviter: "bytes32", timeStamp: "uint256" },
    },

    AllianceJoinRequest: {
      key: ["entity", "alliance"],
      schema: { entity: "bytes32", alliance: "bytes32", timeStamp: "uint256" },
    },

    /* ------------------------------- Marketplace ------------------------------ */
    // resource A is always the smaller index in the EResource enum
    Reserves: {
      key: ["resourceA", "resourceB"],
      schema: { resourceA: "uint8", resourceB: "uint8", amountA: "uint256", amountB: "uint256" },
    },

    P_MarketplaceConfig: {
      key: [],
      schema: {
        feeThousandths: "uint256",
        lock: "bool",
      },
    },

    Swap: {
      key: ["entity"],
      schema: {
        entity: "bytes32",
        resourceIn: "uint8",
        resourceOut: "uint8",
        amountIn: "uint256",
        amountOut: "uint256",
      },
      type: "offchainTable",
    },

    /* ---------------------------- Player Asteroids ---------------------------- */

    Keys_AsteroidSet: {
      key: ["entity", "key"],
      schema: { entity: "bytes32", key: "bytes32", itemKeys: "bytes32[]" },
    },

    Meta_AsteroidSet: {
      key: ["entity", "key", "asteroidEntity"],
      schema: { entity: "bytes32", key: "bytes32", asteroidEntity: "bytes32", stored: "bool", index: "uint256" },
    },
  },
} as const;

const getConfig = async () => {
  let exclude: string[] = [];
  if (typeof process != undefined && typeof process != "undefined") {
    const dotenv = await import("dotenv");
    dotenv.config({ path: "../../.env" });
    if (process.env.PRI_DEV !== "true") exclude = ["DevSystem"];
  }

  const world = defineWorld({ ...worldInput, excludeSystems: exclude });

  return world;
};

const config = await getConfig();
export default config;

export const configInputs: ConfigWithPrototypes<typeof worldInput, (typeof worldInput)["tables"]> = {
  worldInput,
  prototypeConfig,
};
