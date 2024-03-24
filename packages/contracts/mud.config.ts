import { mudConfig } from "@latticexyz/world/register";
import { MUDEnums } from "./config/enums";
import { prototypeConfig } from "./config/prototypeConfig";

// Exclude dev systems if not in dev PRI_DEV

/* -------------------------------------------------------------------------- */
/*                                   Config                                   */
/* -------------------------------------------------------------------------- */
const getConfig = async () => {
  let exclude: string[] = [];
  if (typeof process != undefined && typeof process != "undefined") {
    const dotenv = await import("dotenv");
    dotenv.config({ path: "../../.env" });
    if (process.env.PRI_DEV !== "true") exclude = ["DevSystem"];
  }
  return mudConfig({
    excludeSystems: exclude,
    namespace: "Primodium",
    systems: {
      S_SpawnPirateAsteroidSystem: {
        openAccess: false,
        accessList: [],
      },
      S_ProductionRateSystem: {
        openAccess: false,
        accessList: [],
      },
      S_SpendResourcesSystem: {
        openAccess: false,
        accessList: [],
      },
      S_RewardsSystem: {
        openAccess: false,
        accessList: [],
      },
      S_StorageSystem: {
        openAccess: false,
        accessList: [],
      },
      S_BattleApplyDamageSystem: {
        openAccess: false,
        accessList: [],
      },
      S_BattleRaidResolveSystem: {
        openAccess: false,
        accessList: [],
      },
      S_BattleEncryptionResolveSystem: {
        openAccess: false,
        accessList: [],
      },
      S_FleetResetIfNoUnitsLeftSystem: {
        openAccess: false,
        accessList: [],
      },
      S_InitAsteroidOwnerSystem: {
        openAccess: false,
        accessList: [],
      },
      S_TransferAsteroidSystem: {
        openAccess: false,
        accessList: [],
      },
      S_FleetResolvePirateAsteroidSystem: {
        openAccess: false,
        accessList: [],
      },
      S_CreateSecondaryAsteroidSystem: {
        openAccess: false,
        accessList: [],
      },
    },

    enums: MUDEnums,
    tables: {
      /* ----------------------------------- Dev ---------------------------------- */
      Counter: {
        keySchema: {},
        valueSchema: "uint256",
      },

      /* --------------------------------- Common --------------------------------- */
      // if the key is a player, value is their home asteroid.
      // if the key is an asteroid, value is its main base.
      Home: {
        keySchema: { entity: "bytes32" },
        valueSchema: "bytes32",
      },

      P_GameConfig: {
        keySchema: {},
        valueSchema: {
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

      P_CapitalShipConfig: {
        keySchema: {},
        valueSchema: {
          resource: "uint8",
          initialCost: "uint256",
          decryption: "uint256",
          cooldownExtension: "uint256",
        },
      },

      Position: {
        keySchema: { entity: "bytes32" },
        valueSchema: {
          x: "int32",
          y: "int32",
          parentEntity: "bytes32",
        },
      },

      ReversePosition: {
        keySchema: { x: "int32", y: "int32" },
        valueSchema: {
          entity: "bytes32",
        },
      },

      OwnedBy: {
        keySchema: { entity: "bytes32" },
        valueSchema: {
          value: "bytes32",
        },
      },

      Level: {
        keySchema: { entity: "bytes32" },
        valueSchema: "uint256",
      },

      Spawned: {
        keySchema: { entity: "bytes32" },
        valueSchema: "bool",
      },

      /*
     This table maps building types to their prototypes. 
     For example:
        The key is the EBuilding enum value for the building type (e.g. EBuilding.MainBase). 
        The value is the prototype name (e.g. "MainBase")
        It is autogenerated in the build step.
    */
      P_EnumToPrototype: {
        keySchema: { key: "bytes32", id: "uint8" },
        valueSchema: "bytes32",
      },

      /* -------------------------------- Asteroids ------------------------------- */
      AsteroidCount: {
        keySchema: {},
        valueSchema: "uint256",
      },

      P_Asteroid: {
        keySchema: {},
        valueSchema: {
          xBounds: "int32",
          yBounds: "int32",
        },
      },

      Asteroid: {
        keySchema: { entity: "bytes32" },
        valueSchema: {
          isAsteroid: "bool",
          maxLevel: "uint256",
          mapId: "uint8",
          spawnsSecondary: "bool",
        },
      },

      P_BasicAsteroidConfig: {
        keySchema: {},
        valueSchema: {
          basicSecondarySlot: "uint256",
          maxLevel: "uint256",
          mapId: "uint8",
        },
      },

      // note: dimensions will always be positive, but are int32s so they work with coords
      Dimensions: {
        keySchema: { key: "bytes32", level: "uint256" },
        valueSchema: {
          width: "int32",
          height: "int32",
        },
      },

      P_Terrain: {
        keySchema: { mapId: "uint8", x: "int32", y: "int32" },
        valueSchema: "uint8", // EResource
      },

      Specialty: {
        keySchema: { entity: "bytes32" },
        valueSchema: "uint8", // EResource
      },

      /* -------------------------------- Resources ------------------------------- */
      P_IsResource: {
        keySchema: { id: "uint8" }, // EResource
        valueSchema: {
          isResource: "bool",
          isAdvanced: "bool",
        },
      },

      P_IsUtility: {
        keySchema: { id: "uint8" }, // EResource
        valueSchema: "bool",
      },
      //when the storage for this resources is provided it is full
      P_IsRecoverable: {
        keySchema: { id: "uint8" }, // EResource
        valueSchema: "bool",
      },

      P_Transportables: {
        keySchema: {},
        valueSchema: "uint8[]", // EResource
      },

      // contains a bitmap
      UsedTiles: {
        keySchema: { entity: "bytes32" },
        valueSchema: "uint256[]",
      },

      // tracks the max resource a player can store
      MaxResourceCount: {
        keySchema: { entity: "bytes32", resource: "uint8" }, // EResource
        valueSchema: "uint256",
      },

      LastClaimedAt: {
        keySchema: { entity: "bytes32" },
        valueSchema: "uint256",
      },

      ResourceCount: {
        keySchema: { entity: "bytes32", resource: "uint8" }, //EResource
        valueSchema: "uint256",
      },

      // Used in the mbuilding utilities Map data structure
      Value_UtilityMap: {
        keySchema: { entity: "bytes32", utility: "uint8" }, // EResource
        valueSchema: "uint256",
      },
      Meta_UtilityMap: {
        keySchema: { entity: "bytes32", utility: "uint8" }, // EResource
        valueSchema: {
          stored: "bool",
          index: "uint256",
        },
      },
      Keys_UtilityMap: {
        keySchema: { entity: "bytes32" },
        valueSchema: "uint8[]",
      },

      /* --------------------------- Build Requirements --------------------------- */
      P_RequiredTile: {
        keySchema: { prototype: "bytes32" },
        valueSchema: "uint8", // EResource
      },
      P_RequiredBaseLevel: {
        keySchema: { prototype: "bytes32", level: "uint256" },
        valueSchema: "uint256",
      },

      P_RequiredResources: {
        keySchema: { prototype: "bytes32", level: "uint256" },
        valueSchema: {
          // mud doesnt recognize EResource arrays so we will manually convert them
          resources: "uint8[]",
          amounts: "uint256[]",
        },
      },

      P_RequiredDependency: {
        keySchema: { prototype: "bytes32", level: "uint256" },
        valueSchema: {
          // mud doesnt recognize EResource arrays so we will manually convert them
          resource: "uint8",
          amount: "uint256",
        },
      },

      P_RequiredUpgradeResources: {
        keySchema: { prototype: "bytes32", level: "uint256" },
        valueSchema: {
          resources: "uint8[]",
          amounts: "uint256[]",
        },
      },
      /* -------------------------------- Buildings ------------------------------- */

      P_Blueprint: {
        keySchema: { prototype: "bytes32" },
        valueSchema: "int32[]",
      },

      P_MaxLevel: {
        keySchema: { prototype: "bytes32" },
        valueSchema: "uint256",
      },

      P_Production: {
        keySchema: { prototype: "bytes32", level: "uint256" },
        valueSchema: {
          // mud doesnt recognize EResource arrays so we will manually convert them
          // EResource
          resources: "uint8[]",
          amounts: "uint256[]",
        },
      },

      P_UnitProdTypes: {
        keySchema: { prototype: "bytes32", level: "uint256" },
        valueSchema: "bytes32[]",
      },

      P_UnitProdMultiplier: {
        keySchema: { prototype: "bytes32", level: "uint256" },
        valueSchema: "uint256",
      },

      Meta_UnitFactorySet: {
        keySchema: { entity: "bytes32", building: "bytes32" },
        valueSchema: {
          stored: "bool",
          index: "uint256",
        },
      },

      Keys_UnitFactorySet: {
        keySchema: { entity: "bytes32" },
        valueSchema: "bytes32[]",
      },

      P_ByLevelMaxResourceUpgrades: {
        keySchema: { prototype: "bytes32", resource: "uint8", level: "uint256" },
        valueSchema: "uint256",
      },

      P_ListMaxResourceUpgrades: {
        keySchema: { prototype: "bytes32", level: "uint256" },
        valueSchema: "uint8[]",
      },

      P_ConsumesResource: {
        keySchema: { resource: "uint8" },
        valueSchema: "uint8",
      },

      BuildingType: {
        keySchema: { entity: "bytes32" },
        valueSchema: "bytes32",
      },

      TilePositions: {
        keySchema: { entity: "bytes32" },
        valueSchema: "int32[]",
      },
      Children: {
        keySchema: { entity: "bytes32" },
        valueSchema: "bytes32[]",
      },

      ProductionRate: {
        keySchema: { entity: "bytes32", resource: "uint8" },
        valueSchema: "uint256",
      },

      ConsumptionRate: {
        keySchema: { entity: "bytes32", resource: "uint8" },
        valueSchema: "uint256",
      },

      IsActive: {
        keySchema: { entity: "bytes32" },
        valueSchema: "bool",
      },

      /* ------------------------------- Motherlode ------------------------------- */

      P_SizeToAmount: {
        keySchema: { size: "uint8" },
        valueSchema: "uint256",
      },

      P_RawResource: {
        keySchema: { resource: "uint8" },
        valueSchema: "uint8",
      },

      /* ----------------------------- Unit Production ---------------------------- */
      // stores an array of all unit prototypes in the game
      P_UnitPrototypes: {
        keySchema: {},
        valueSchema: "bytes32[]",
      },

      P_Unit: {
        keySchema: { entity: "bytes32", level: "uint256" },
        valueSchema: {
          attack: "uint256",
          defense: "uint256",
          speed: "uint256",
          cargo: "uint256",
          trainingTime: "uint256",
          hp: "uint256",
        },
      },

      Meta_UnitProductionQueue: {
        keySchema: { entity: "bytes32" },
        valueSchema: {
          front: "uint256",
          back: "uint256",
          queue: "bytes32[]",
        },
      },

      Value_UnitProductionQueue: {
        keySchema: { entity: "bytes32", index: "uint256" },
        valueSchema: {
          unitEntity: "bytes32",
          quantity: "uint256",
        },
      },

      UnitLevel: {
        keySchema: { entity: "bytes32", unit: "bytes32" },
        valueSchema: "uint256",
      },

      UnitCount: {
        keySchema: { entity: "bytes32", unit: "bytes32" },
        valueSchema: "uint256",
      },

      // used to record the progress of claiming the current unit
      ClaimOffset: {
        keySchema: { entity: "bytes32" },
        valueSchema: "uint256",
      },

      /* ------------------------------ Sending Units ----------------------------- */

      FleetMovement: {
        keySchema: { entity: "bytes32" },
        valueSchema: {
          origin: "bytes32",
          destination: "bytes32",
          sendTime: "uint256",
          arrivalTime: "uint256",
        },
      },

      FleetStance: {
        keySchema: { entity: "bytes32" },
        valueSchema: {
          stance: "uint8",
          target: "bytes32",
        },
      },

      IsFleet: {
        keySchema: { entity: "bytes32" },
        valueSchema: "bool",
      },

      IsFleetEmpty: {
        keySchema: { entity: "bytes32" },
        valueSchema: "bool",
        offchainOnly: true,
      },

      // used in the Fleet Set
      Keys_FleetSet: {
        keySchema: { entity: "bytes32", key: "bytes32" },
        valueSchema: { itemKeys: "bytes32[]" },
      },

      Meta_FleetSet: {
        keySchema: { entity: "bytes32", key: "bytes32", fleetEntity: "bytes32" },
        valueSchema: {
          stored: "bool",
          index: "uint256",
        },
      },

      /* ------------------------------ Battle Result ----------------------------- */
      BattleResult: {
        keySchema: { battleEntity: "bytes32" },
        valueSchema: {
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
        offchainOnly: true,
      },

      BattleDamageDealtResult: {
        keySchema: { battleEntity: "bytes32", participantEntity: "bytes32" },
        valueSchema: {
          damageDealt: "uint256",
        },
        offchainOnly: true,
      },

      BattleDamageTakenResult: {
        keySchema: { battleEntity: "bytes32", participantEntity: "bytes32" },
        valueSchema: {
          hpAtStart: "uint256",
          damageTaken: "uint256",
        },
        offchainOnly: true,
      },

      BattleUnitResult: {
        keySchema: { battleEntity: "bytes32", participantEntity: "bytes32" },
        valueSchema: {
          unitLevels: "uint256[]",
          unitsAtStart: "uint256[]",
          casualties: "uint256[]",
        },
        offchainOnly: true,
      },

      BattleRaidResult: {
        keySchema: { battleEntity: "bytes32", participantEntity: "bytes32" },
        valueSchema: {
          resourcesAtStart: "uint256[]",
          resourcesAtEnd: "uint256[]",
        },
        offchainOnly: true,
      },

      BattleEncryptionResult: {
        keySchema: { battleEntity: "bytes32", participantEntity: "bytes32" },
        valueSchema: {
          encryptionAtStart: "uint256",
          encryptionAtEnd: "uint256",
        },
        offchainOnly: true,
      },

      RaidResult: {
        keySchema: { entity: "bytes32" },
        valueSchema: {
          defenderValuesBeforeRaid: "uint256[]",
          raidedAmount: "uint256[]",
        },
        offchainOnly: true,
      },

      DamageDealt: {
        keySchema: { entity: "bytes32" },
        valueSchema: "uint256",
      },

      /* ---------------------------------- Score --------------------------------- */

      P_ScoreMultiplier: {
        keySchema: { entity: "uint8" },
        valueSchema: "uint256",
      },
      Score: {
        keySchema: { entity: "bytes32" },
        valueSchema: "uint256",
      },

      /* ------------------------------ Test Hook ----------------------------- */
      HookedValue: {
        keySchema: { entity: "bytes32" },
        valueSchema: "uint256",
      },

      OnHookChangedValue: {
        keySchema: { entity: "bytes32" },
        valueSchema: "uint256",
      },
      /* ------------------------------ Pirate Asteroids ----------------------------- */

      P_SpawnPirateAsteroid: {
        keySchema: { prototype: "bytes32" },
        valueSchema: {
          x: "int32",
          y: "int32",
          resources: "uint8[]",
          resourceAmounts: "uint256[]",
          units: "bytes32[]",
          unitAmounts: "uint256[]",
        },
      },

      PirateAsteroid: {
        keySchema: { entity: "bytes32" },
        valueSchema: {
          isPirateAsteroid: "bool",
          isDefeated: "bool",
          playerEntity: "bytes32",
          prototype: "bytes32",
        },
      },

      /* ------------------------------ Objectives ----------------------------- */

      P_RequiredObjectives: {
        keySchema: { prototype: "bytes32" },
        valueSchema: {
          // mud doesnt recognize EObjective arrays so we will manually convert them
          objectives: "bytes32[]",
        },
      },

      CompletedObjective: {
        keySchema: { entity: "bytes32", objective: "bytes32" },
        valueSchema: "bool",
      },

      P_UnitReward: {
        keySchema: { prototype: "bytes32" },
        valueSchema: {
          // mud doesnt recognize EUnit arrays so we will manually convert them
          units: "bytes32[]",
          amounts: "uint256[]",
        },
      },

      P_ResourceReward: {
        keySchema: { prototype: "bytes32" },
        valueSchema: {
          // mud doesnt recognize EResource arrays so we will manually convert them
          resources: "uint8[]",
          amounts: "uint256[]",
        },
      },

      P_HasBuiltBuildings: {
        keySchema: { prototype: "bytes32" },
        valueSchema: "bytes32[]",
      },

      HasBuiltBuilding: {
        keySchema: { entity: "bytes32", buildingType: "bytes32" },
        valueSchema: "bool",
      },

      P_ProducedResources: {
        keySchema: { prototype: "bytes32" },
        valueSchema: {
          // mud doesnt recognize EResource arrays so we will manually convert them
          resources: "uint8[]",
          amounts: "uint256[]",
        },
      },

      ProducedResource: {
        keySchema: { entity: "bytes32", resource: "uint8" },
        valueSchema: "uint256",
      },

      P_DestroyedUnits: {
        keySchema: { prototype: "bytes32" },
        valueSchema: {
          // mud doesnt recognize EUnit arrays so we will manually convert them
          units: "bytes32[]",
          amounts: "uint256[]",
        },
      },

      DestroyedUnit: {
        keySchema: { entity: "bytes32", unit: "bytes32" },
        valueSchema: "uint256",
      },

      P_RaidedResources: {
        keySchema: { prototype: "bytes32" },
        valueSchema: {
          // mud doesnt recognize EResource arrays so we will manually convert them
          resources: "uint8[]",
          amounts: "uint256[]",
        },
      },

      RaidedResource: {
        keySchema: { entity: "bytes32", resource: "uint8" },
        valueSchema: "uint256",
      },

      P_DefeatedPirates: {
        keySchema: { prototype: "bytes32" },
        valueSchema: "bytes32[]",
      },

      DefeatedPirate: {
        keySchema: { entity: "bytes32", pirate: "bytes32" },
        valueSchema: "bool",
      },

      P_RequiredUnits: {
        keySchema: { prototype: "bytes32" },
        valueSchema: {
          // mud doesnt recognize EUnit arrays so we will manually convert them
          units: "bytes32[]",
          amounts: "uint256[]",
        },
      },

      P_ProducedUnits: {
        keySchema: { prototype: "bytes32" },
        valueSchema: {
          // mud doesnt recognize EUnit arrays so we will manually convert them
          units: "bytes32[]",
          amounts: "uint256[]",
        },
      },

      ProducedUnit: {
        keySchema: { entity: "bytes32", unit: "bytes32" },
        valueSchema: "uint256",
      },

      P_RequiredExpansion: {
        keySchema: { prototype: "bytes32" },
        valueSchema: "uint256",
      },

      /* ------------------------------ Defense ----------------------------- */

      P_GracePeriod: {
        keySchema: {},
        valueSchema: {
          asteroid: "uint256",
          fleet: "uint256",
        },
      },

      GracePeriod: {
        keySchema: { entity: "bytes32" },
        valueSchema: "uint256",
      },

      CooldownEnd: {
        keySchema: { entity: "bytes32" },
        valueSchema: "uint256",
      },
      /* ------------------------------ Alliance ----------------------------- */

      P_AllianceConfig: {
        keySchema: {},
        valueSchema: {
          maxAllianceMembers: "uint256",
        },
      },

      PlayerAlliance: {
        keySchema: { entity: "bytes32" },
        valueSchema: {
          alliance: "bytes32",
          role: "uint8",
        },
      },

      Alliance: {
        keySchema: { entity: "bytes32" },
        valueSchema: {
          name: "bytes32",
          score: "uint256",
          inviteMode: "uint8",
        },
      },

      Keys_AllianceMemberSet: {
        keySchema: { entity: "bytes32" },
        valueSchema: {
          memberKeys: "bytes32[]",
        },
      },

      Meta_AllianceMemberSet: {
        keySchema: { entity: "bytes32", memberKey: "bytes32" },
        valueSchema: {
          stored: "bool",
          index: "uint256",
        },
      },

      AllianceInvitation: {
        keySchema: { entity: "bytes32", alliance: "bytes32" },
        valueSchema: { inviter: "bytes32", timeStamp: "uint256" },
      },

      AllianceJoinRequest: {
        keySchema: { entity: "bytes32", alliance: "bytes32" },
        valueSchema: { timeStamp: "uint256" },
      },

      /* ------------------------------- Marketplace ------------------------------ */
      // resource A is always the smaller index in the EResource enum
      Reserves: {
        keySchema: { resourceA: "uint8", resourceB: "uint8" },
        valueSchema: {
          amountA: "uint256",
          amountB: "uint256",
        },
      },

      P_MarketplaceConfig: {
        keySchema: {},
        valueSchema: {
          feeThousandths: "uint256",
          lock: "bool",
        },
      },

      Swap: {
        keySchema: { entity: "bytes32" },
        valueSchema: {
          resourceIn: "uint8",
          resourceOut: "uint8",
          amountIn: "uint256",
          amountOut: "uint256",
        },
        offchainOnly: true,
      },

      /* ---------------------------- Player Asteroids ---------------------------- */

      Keys_AsteroidSet: {
        keySchema: { entity: "bytes32", key: "bytes32" },
        valueSchema: { itemKeys: "bytes32[]" },
      },

      Meta_AsteroidSet: {
        keySchema: { entity: "bytes32", key: "bytes32", asteroidEntity: "bytes32" },
        valueSchema: {
          stored: "bool",
          index: "uint256",
        },
      },
    },
  });
};

export const config = await getConfig();

export default {
  ...config,
  prototypeConfig,
};
