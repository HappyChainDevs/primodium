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
  enums: MUDEnums,
  tables: {
    /* ----------------------------------- Dev ---------------------------------- */
    Counter: {
      keySchema: {},
      schema: "uint32",
    },

    /* --------------------------------- Common --------------------------------- */
    Position: {
      keySchema: { entity: "bytes32" },
      schema: {
        x: "int32",
        y: "int32",
        parent: "bytes32",
      },
    },

    ReversePosition: {
      keySchema: { x: "int32", y: "int32" },
      schema: {
        entity: "bytes32",
      },
    },

    OwnedBy: {
      keySchema: { entity: "bytes32" },
      schema: {
        owner: "bytes32",
      },
    },

    Level: {
      keySchema: { entity: "bytes32" },
      schema: "uint32",
    },

    Spawned: {
      keySchema: { entity: "bytes32" },
      schema: "bool",
    },

    /* --------------------------------- Player --------------------------------- */
    Home: {
      keySchema: { entity: "bytes32" },
      schema: {
        asteroid: "bytes32",
        mainBase: "bytes32",
      },
    },

    /* ---------------------------------- Rocks --------------------------------- */
    P_Asteroid: {
      keySchema: {},
      schema: {
        xBounds: "int32",
        yBounds: "int32",
      },
    },
    AsteroidCount: {
      keySchema: {},
      schema: "uint32",
    },

    RockType: {
      keySchema: { entity: "bytes32" },
      schema: "ERock",
    },

    // note: dimensions will always be positive, but are int32s so they work with coords
    Dimensions: {
      keySchema: { key: "bytes32", level: "uint32" },
      schema: {
        x: "int32",
        y: "int32",
      },
    },

    P_Terrain: {
      keySchema: { x: "int32", y: "int32" },
      schema: "EResource",
    },

    /* -------------------------------- Resources ------------------------------- */

    P_IsUtility: {
      keySchema: { id: "EResource" },
      schema: "bool",
    },

    // tracks the max resource a player can store
    MaxResourceCount: {
      keySchema: { entity: "bytes32", resource: "EResource" },
      schema: "uint32",
    },

    LastClaimedAt: {
      keySchema: { entity: "bytes32" },
      schema: "uint256",
    },

    // ResourceSet tables: used to track which resources a player has
    Set_Player: {
      keySchema: { entity: "bytes32" },
      schema: "uint8[]",
    },

    Set_PlayerResource: {
      keySchema: { entity: "bytes32", resource: "EResource" },
      schema: {
        index: "uint256",
        quantity: "uint32",
      },
    },

    /* --------------------------- Build Requirements --------------------------- */
    P_RequiredTile: {
      keySchema: { prototype: "bytes32" },
      schema: "EResource",
    },
    P_RequiredBaseLevel: {
      keySchema: { prototype: "bytes32", level: "uint32" },
      schema: "uint32",
    },

    P_RequiredResources: {
      keySchema: { prototype: "bytes32", level: "uint32" },
      schema: {
        // mud doesnt recognize EResource arrays so we will manually convert them
        resources: "uint8[]",
        amounts: "uint32[]",
      },
    },

    P_RequiredDependencies: {
      keySchema: { prototype: "bytes32", level: "uint32" },
      schema: {
        // mud doesnt recognize EResource arrays so we will manually convert them
        resources: "uint8[]",
        amounts: "uint32[]",
      },
    },

    /* -------------------------------- Buildings ------------------------------- */

    /*
     This table maps building types to their prototypes. 
     The key is the EBuilding enum value for the building type (e.g. EBuilding.MainBase). 
     The value is the prototype name (e.g. "MainBase")
     It is autogenerated in the build step.
    */
    P_EnumToPrototype: {
      keySchema: { key: "bytes32", id: "uint8" },
      schema: "bytes32",
    },

    P_Blueprint: {
      keySchema: { prototype: "bytes32" },
      schema: "int32[]",
    },

    P_MaxLevel: {
      keySchema: { prototype: "bytes32" },
      schema: "uint32",
    },

    P_Production: {
      keySchema: { prototype: "bytes32", level: "uint32" },
      schema: {
        // mud doesnt recognize EResource arrays so we will manually convert them
        resources: "uint8[]",
        amounts: "uint32[]",
      },
    },

    // @note Used for ResourceUpgrade set
    P_ByLevelMaxResourceUpgrades: {
      keySchema: { prototype: "bytes32", resource: "EResource", level: "uint32" },
      schema: "uint32",
    },

    P_ListMaxResourceUpgrades: {
      keySchema: { prototype: "bytes32", level: "uint32" },
      schema: "uint8[]",
    },

    BuildingType: {
      keySchema: { entity: "bytes32" },
      schema: "bytes32",
    },

    Children: {
      keySchema: { entity: "bytes32" },
      schema: "bytes32[]",
    },

    ProductionRate: {
      keySchema: { entity: "bytes32", resource: "EResource" },
      schema: "uint32",
    },
  },
});

export default {
  ...config,
  prototypeConfig,
};
