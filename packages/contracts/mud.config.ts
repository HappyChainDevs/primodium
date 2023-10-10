import { mudConfig } from "@latticexyz/world/register";
import { MUDEnums } from "./config/enums";
import { prototypeConfig } from "./config/prototypeConfig";

// Exclude dev systems if not in dev PRI_DEV
let dev: string[] = [];
if (typeof process != undefined && typeof process != "undefined") {
  import("dotenv").then((dotenv) => {
    dotenv.config({ path: "../../.env" });
    dev = process.env.PRI_DEV === "true" ? [] : ["DevSystem"];
  });
}

/* -------------------------------------------------------------------------- */
/*                                   Config                                   */
/* -------------------------------------------------------------------------- */
export type Config = typeof config;
export const config = mudConfig({
  excludeSystems: [...dev],
  overrideSystems: {
    S_SpendResourcesSystem: {
      openAccess: false,
      accessList: ["BuildSystem", "UpgradeBuildingSystem"],
      name: "S_SpendResourcesSystem",
    },
    S_ReduceProductionRateSystem: {
      openAccess: false,
      accessList: ["BuildSystem", "UpgradeBuildingSystem", "DestroySystem"],
      name: "S_ReduceProductionRateSystem",
    },
    S_ResourceProductionSystem: {
      openAccess: false,
      accessList: ["BuildSystem", "UpgradeBuildingSystem", "DestroySystem"],
      name: "S_ResourceProductionSystem",
    },
    S_BattleSystem: {
      openAccess: false,
      accessList: ["RaidSystem", "InvadeSystem"],
      name: "S_BattleSystem",
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

    P_GameConfig: {
      keySchema: {},
      valueSchema: {
        unitProductionRate: "uint256",
        maxMotherlodesPerAsteroid: "uint256",
        motherlodeChanceInv: "uint256",
        motherlodeDistance: "uint256",
        moveSpeed: "uint256",
      },
    },

    Position: {
      keySchema: { entity: "bytes32" },
      valueSchema: {
        x: "int32",
        y: "int32",
        parent: "bytes32",
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

    /* --------------------------------- Player --------------------------------- */
    Home: {
      keySchema: { entity: "bytes32" },
      valueSchema: {
        asteroid: "bytes32",
        mainBase: "bytes32",
      },
    },

    MaxMoves: {
      keySchema: { entity: "bytes32" },
      valueSchema: "uint256",
    },

    /* ---------------------------------- Rocks --------------------------------- */
    P_Asteroid: {
      keySchema: {},
      valueSchema: {
        xBounds: "int32",
        yBounds: "int32",
      },
    },
    AsteroidCount: {
      keySchema: {},
      valueSchema: "uint256",
    },

    RockType: {
      keySchema: { entity: "bytes32" },
      // ERock
      valueSchema: "uint8",
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
      keySchema: { x: "int32", y: "int32" },
      valueSchema: "uint8", // EResource
    },

    /* -------------------------------- Resources ------------------------------- */

    P_IsUtility: {
      keySchema: { id: "uint8" }, // EResource
      valueSchema: "bool",
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

    // Used in the building utilities set
    SetItemUtilities: {
      keySchema: { entity: "bytes32", utility: "uint8" }, // EResource
      valueSchema: {
        index: "uint256",
        quantity: "uint256",
      },
    },
    SetUtilities: {
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

    P_RequiredDependencies: {
      keySchema: { prototype: "bytes32", level: "uint256" },
      valueSchema: {
        // mud doesnt recognize EResource arrays so we will manually convert them
        resources: "uint8[]",
        amounts: "uint256[]",
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
        resource: "uint8",
        amount: "uint256",
      },
    },

    // tracks if a building (prototype) can produce a unit (id)
    P_UnitProduction: {
      keySchema: { prototype: "bytes32", id: "bytes32" },
      valueSchema: "bool",
    },

    P_ProducesUnits: {
      keySchema: { prototype: "bytes32" },
      valueSchema: "bool",
    },

    P_UnitProdMultiplier: {
      keySchema: { prototype: "bytes32", level: "uint256" },
      valueSchema: "uint256",
    },

    SetItemUnitFactories: {
      keySchema: { entity: "bytes32", building: "bytes32" },
      valueSchema: {
        stored: "bool",
        index: "uint256",
      },
    },

    SetUnitFactories: {
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

    BuildingType: {
      keySchema: { entity: "bytes32" },
      valueSchema: "bytes32",
    },

    Children: {
      keySchema: { entity: "bytes32" },
      valueSchema: "bytes32[]",
    },

    ProductionRate: {
      keySchema: { entity: "bytes32", resource: "uint8" },
      valueSchema: "uint256",
    },

    /* ------------------------------- Motherlode ------------------------------- */

    Motherlode: {
      keySchema: { entity: "bytes32" },
      valueSchema: {
        size: "uint8", // ESize
        motherlodeType: "uint8", // EResource
      },
    },

    // Used in the building utilities set
    SetItemMotherlodes: {
      keySchema: { motherlode: "bytes32", item: "bytes32" },
      valueSchema: {
        stored: "bool",
        index: "uint256",
      },
    },
    SetMotherlodes: {
      keySchema: { entity: "bytes32" },
      valueSchema: "bytes32[]",
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
      },
    },

    P_MiningRate: {
      keySchema: { entity: "bytes32", level: "uint256" },
      valueSchema: "uint256",
    },

    QueueUnits: {
      keySchema: { entity: "bytes32" },
      valueSchema: {
        front: "uint256",
        back: "uint256",
        queue: "bytes32[]",
      },
    },

    QueueItemUnits: {
      keySchema: { entity: "bytes32", index: "uint256" },
      valueSchema: {
        unitId: "bytes32",
        quantity: "uint256",
      },
    },
    UnitLevel: {
      keySchema: { entity: "bytes32", unit: "bytes32" },
      valueSchema: "uint256",
    },

    UnitCount: {
      keySchema: { player: "bytes32", rock: "bytes32", unit: "bytes32" },
      valueSchema: "uint256",
    },

    /* ------------------------------ Sending Units ----------------------------- */
    ArrivalCount: {
      keySchema: { entity: "bytes32" },
      valueSchema: "uint256",
    },
    // Tracks player asteroid arrivals
    MapArrivals: {
      keySchema: { entity: "bytes32", asteroid: "bytes32" },
      valueSchema: { itemKeys: "bytes32[]" },
    },

    MapItemStoredArrivals: {
      keySchema: { entity: "bytes32", asteroid: "bytes32", key: "bytes32" },
      valueSchema: {
        stored: "bool",
        index: "uint256",
      },
    },

    // We need to split this up because it is too big to compile lol
    // But this is abstracted away in ArrivalSet.sol
    MapItemArrivals: {
      keySchema: { entity: "bytes32", asteroid: "bytes32", key: "bytes32" },
      valueSchema: "bytes",
    },

    /* ------------------------------ Battle Result ----------------------------- */
    BattleResult: {
      keySchema: { entity: "bytes32" },
      valueSchema: {
        attacker: "bytes32",
        defender: "bytes32",
        winner: "bytes32",

        rock: "bytes32",
        totalCargo: "uint256",
        timestamp: "uint256",

        attackerStartingUnits: "uint256[]",
        defenderStartingUnits: "uint256[]",
        attackerUnitsLeft: "uint256[]",
        defenderUnitsLeft: "uint256[]",
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

    /* ------------------------------ Test Hook ----------------------------- */
    HookedValue: {
      keySchema: { entity: "bytes32" },
      valueSchema: "uint256",
    },

    OnHookChangedValue: {
      keySchema: { entity: "bytes32" },
      valueSchema: "uint256",
    },
  },
});

export default {
  ...config,
  prototypeConfig,
};
