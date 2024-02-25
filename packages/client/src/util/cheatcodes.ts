import { createBurnerAccount, transportObserver } from "@latticexyz/common";
import { Entity } from "@latticexyz/recs";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { Cheatcodes } from "@primodiumxyz/mud-game-tools";
import encodeBytes32 from "contracts/config/util/encodeBytes32";
import IWorldAbi from "contracts/out/IWorld.sol/IWorld.abi.json";
import { components } from "src/network/components";
import { getNetworkConfig } from "src/network/config/getNetworkConfig";
import { setComponentValue } from "src/network/setup/contractCalls/dev";
import { MUD } from "src/network/types";
import { encodeEntity, hashEntities, hashKeyEntity } from "src/util/encode";
import { Hex, createWalletClient, fallback, getContract, http, webSocket } from "viem";
import { generatePrivateKey } from "viem/accounts";
import { getBlockTypeName } from "./common";
import {
  EntityType,
  PIRATE_KEY,
  RESOURCE_SCALE,
  ResourceEnumLookup,
  ResourceStorages,
  UtilityStorages,
} from "./constants";

const resources: Record<string, Entity> = {
  iron: EntityType.Iron,
  copper: EntityType.Copper,
  lithium: EntityType.Lithium,
  titanium: EntityType.Titanium,
  iridium: EntityType.Iridium,
  kimberlite: EntityType.Kimberlite,
  ironplate: EntityType.IronPlate,
  platinum: EntityType.Platinum,
  alloy: EntityType.Alloy,
  pvcell: EntityType.PVCell,
  housing: EntityType.Housing,
  vessel: EntityType.VesselCapacity,
  electricity: EntityType.Electricity,
  defense: EntityType.Defense,
  moves: EntityType.FleetCount,
};

const units: Record<string, Entity> = {
  stinger: EntityType.StingerDrone,
  aegis: EntityType.AegisDrone,
  anvil: EntityType.AnvilDrone,
  hammer: EntityType.HammerDrone,
  capitalShip: EntityType.CapitalShip,
  droid: EntityType.Droid,
};

export const setupCheatcodes = (mud: MUD): Cheatcodes => {
  return {
    setWorldSpeed: {
      params: [{ name: "value", type: "number" }],
      function: async (value: number) => {
        await setComponentValue(mud, mud.components.P_GameConfig, singletonEntity, {
          worldSpeed: BigInt(value),
        });
      },
    },
    stopGracePeriod: {
      params: [],
      function: async () => {
        setComponentValue(mud, components.P_GracePeriod, singletonEntity, { spaceRock: 0n });
      },
    },
    setMaxAllianceCount: {
      params: [{ name: "value", type: "number" }],
      function: async (value: number) => {
        await setComponentValue(mud, mud.components.P_AllianceConfig, singletonEntity, {
          maxAllianceMembers: BigInt(value),
        });
      },
    },
    maxMainBaseLevel: {
      params: [],
      function: async () => {
        const selectedRock = mud.components.ActiveRock.get()?.value;
        const mainBase = mud.components.Home.get(selectedRock)?.value as Entity | undefined;
        if (!mainBase) throw new Error("No main base found");
        const maxLevel = mud.components.P_MaxLevel.get(mainBase)?.value ?? 8n;
        await setComponentValue(mud, mud.components.Level, mainBase, {
          value: maxLevel,
        });
      },
    },
    getResource: {
      params: [{ name: "resource", type: "string" }],
      function: async (resource: string) => {
        const player = mud.playerAccount.entity;
        if (!player) throw new Error("No player found");
        const selectedRock = mud.components.ActiveRock.get()?.value;

        const resourceEntity = resources[resource.toLowerCase()];

        if (!resourceEntity || !selectedRock) throw new Error("Resource not found");

        const value = 100000n * RESOURCE_SCALE;
        console.log("setting resource", getBlockTypeName(resourceEntity), selectedRock, value);

        await setComponentValue(
          mud,
          mud.components.ResourceCount,
          encodeEntity(
            { entity: "bytes32", resource: "uint8" },
            { entity: selectedRock as Hex, resource: ResourceEnumLookup[resourceEntity] }
          ),
          {
            value,
          }
        );
      },
    },
    getMaxResource: {
      params: [{ name: "resource", type: "string" }],
      function: async (resource: string) => {
        const player = mud.playerAccount.entity;
        if (!player) throw new Error("No player found");

        const selectedRock = mud.components.ActiveRock.get()?.value;
        const resourceEntity = resources[resource.toLowerCase()];

        if (!resourceEntity || !selectedRock) throw new Error("Resource not found");

        await setComponentValue(
          mud,
          mud.components.MaxResourceCount,
          encodeEntity(
            { entity: "bytes32", resource: "uint8" },
            { entity: selectedRock as Hex, resource: ResourceEnumLookup[resourceEntity] }
          ),
          {
            value: 2000000n,
          }
        );
      },
    },
    getUnits: {
      params: [
        { name: "unit", type: "string" },
        { name: "count", type: "number" },
      ],
      function: async (unit: string, count: number) => {
        const player = mud.playerAccount.entity;
        if (!player) throw new Error("No player found");

        const unitEntity = units[unit.toLowerCase()];

        if (!unitEntity) throw new Error("Unit not found");

        const rock = mud.components.ActiveRock.get()?.value;

        if (!rock) throw new Error("No asteroid found");

        await setComponentValue(
          mud,
          mud.components.UnitCount,
          encodeEntity(mud.components.UnitCount.metadata.keySchema, {
            unit: unitEntity as Hex,
            entity: rock as Hex,
          }),
          {
            value: BigInt(count),
          }
        );
      },
    },
    getTesterPack: {
      params: [],
      function: async () => {
        const player = mud.playerAccount.entity;
        if (!player) throw new Error("No player found");
        for (const resource of [...ResourceStorages]) {
          await setComponentValue(
            mud,
            mud.components.MaxResourceCount,
            encodeEntity(
              { entity: "bytes32", resource: "uint8" },
              { entity: player as Hex, resource: ResourceEnumLookup[resource] }
            ),
            {
              value: 10000000n,
            }
          );
        }
        for (const resource of [...ResourceStorages]) {
          await setComponentValue(
            mud,
            mud.components.ResourceCount,
            encodeEntity(
              { entity: "bytes32", resource: "uint8" },
              { entity: player as Hex, resource: ResourceEnumLookup[resource] }
            ),
            {
              value: 10000000n,
            }
          );
        }
        UtilityStorages.forEach(async (resource) => {
          if (resource == EntityType.VesselCapacity) return;
          if (!player) throw new Error("No player found");

          await setComponentValue(
            mud,
            mud.components.MaxResourceCount,
            encodeEntity(
              { entity: "bytes32", resource: "uint8" },
              { entity: player as Hex, resource: ResourceEnumLookup[resource] }
            ),
            {
              value: 10000000n,
            }
          );
        });
        UtilityStorages.forEach(async (resource) => {
          if (resource == EntityType.VesselCapacity) return;
          if (!player) throw new Error("No player found");

          await setComponentValue(
            mud,
            mud.components.ResourceCount,
            encodeEntity(
              { entity: "bytes32", resource: "uint8" },
              { entity: player as Hex, resource: ResourceEnumLookup[resource] }
            ),
            {
              value: 10000000n,
            }
          );
        });
      },
    },
    spawnPlayers: {
      params: [{ name: "count", type: "number" }],
      function: async (count: number) => {
        const networkConfig = getNetworkConfig();
        const clientOptions = {
          chain: networkConfig.chain,
          transport: transportObserver(fallback([webSocket(), http()])),
          pollingInterval: 1000,
        };

        for (let i = 0; i < count; i++) {
          const privateKey = generatePrivateKey();
          const burnerAccount = createBurnerAccount(privateKey as Hex);

          const burnerWalletClient = createWalletClient({
            ...clientOptions,
            account: burnerAccount,
          });

          const worldContract = getContract({
            address: networkConfig.worldAddress as Hex,
            abi: IWorldAbi,
            publicClient: mud.network.publicClient,
            walletClient: burnerWalletClient,
          });

          await worldContract.write.spawn();
        }
      },
    },

    createPirateAsteroid: {
      params: [],
      function: async () => {
        const playerEntity = mud.playerAccount.entity;
        const asteroid = components.ActiveRock.get()?.value;
        const ownerEntity = hashKeyEntity(PIRATE_KEY, playerEntity);
        const asteroidEntity = hashEntities(ownerEntity);
        const homePromise = setComponentValue(mud, components.Home, ownerEntity, { value: asteroidEntity as Hex });
        const position = components.Position.get(asteroid);
        const coord = { x: (position?.x ?? 0) + 10, y: (position?.y ?? 0) + 10, parent: encodeBytes32("0") };

        await setComponentValue(mud, components.PirateAsteroid, asteroidEntity, {
          isDefeated: false,
          isPirateAsteroid: true,
          prototype: encodeBytes32("0"),
          playerEntity: playerEntity,
        });

        const positionPromise = setComponentValue(mud, components.Position, asteroidEntity, coord);
        const asteroidPromise = setComponentValue(mud, components.Asteroid, asteroidEntity, { isAsteroid: true });

        const reversePosEntity = encodeEntity(mud.components.ReversePosition.metadata.keySchema, {
          x: coord.x,
          y: coord.y,
        });
        const reversePositionPromise = setComponentValue(mud, components.ReversePosition, reversePosEntity, {
          entity: asteroidEntity as Hex,
        });
        const ownedByPromise = setComponentValue(mud, components.OwnedBy, asteroidEntity, { value: ownerEntity });

        await Promise.all([homePromise, positionPromise, reversePositionPromise, asteroidPromise, ownedByPromise]);

        await setComponentValue(mud, components.PirateAsteroid, asteroidEntity, {
          isDefeated: false,
        });
      },
    },
  };
};
