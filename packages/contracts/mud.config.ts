import { mudConfig } from "@latticexyz/world/register";
import { MUDEnums } from "./config/enums";
import { prototypesConfig } from "./config/prototypesConfig";

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

    LastClaimedAt: {
      keySchema: { entity: "bytes32" },
      schema: "uint256",
    },

    /* --------------------------------- Player --------------------------------- */
    HomeAsteroid: {
      keySchema: { entity: "bytes32" },
      schema: {
        value: "bytes32",
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

    Spawned: {
      keySchema: { entity: "bytes32" },
      schema: "bool",
    },

    /* -------------------------------- Resources ------------------------------- */

    P_Terrain: {
      keySchema: { x: "int32", y: "int32" },
      schema: "EResource",
    },
    /* -------------------------------- Buildings ------------------------------- */
    P_BuildingTypeToPrototype: {
      keySchema: { buildingType: "EBuilding" },
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

    BuildingType: {
      keySchema: { entity: "bytes32" },
      schema: "bytes32",
    },

    Children: {
      keySchema: { entity: "bytes32" },
      schema: "bytes32[]",
    },
  },
});

/* -------------------------------------------------------------------------- */
/*                                 Prototypes                                 */
/* -------------------------------------------------------------------------- */

export default {
  ...config,
  prototypes: prototypesConfig,
};
