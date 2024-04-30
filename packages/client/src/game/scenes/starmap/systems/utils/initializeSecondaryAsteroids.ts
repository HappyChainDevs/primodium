import { ComponentValue, Entity } from "@latticexyz/recs";
import { Coord } from "@latticexyz/utils";
import { EResource, EMap } from "contracts/config/enums";
import { components } from "src/network/components";
import { world } from "src/network/world";
import { EntityType, RESOURCE_SCALE } from "src/util/constants";
import { getSecondaryAsteroidEntity, hashEntities, toHex32 } from "src/util/encode";
import { getPositionByVector } from "src/util/vector";
import { Hex } from "viem";

const emptyData = {
  __staticData: "",
  __encodedLengths: "",
  __dynamicData: "",
};

const spawnDroidBase = (asteroidEntity: Entity) => {
  const mainBaseCoord = components.Position.get(EntityType.MainBase) ?? { x: 19, y: 13 };
  const droidBaseEntity = hashEntities(asteroidEntity, EntityType.DroidBase);
  components.Position.set(
    { ...emptyData, x: mainBaseCoord.x, y: mainBaseCoord.y, parentEntity: asteroidEntity },
    droidBaseEntity
  );
  components.BuildingType.set({ ...emptyData, value: EntityType.DroidBase }, droidBaseEntity);
  components.Level.set({ ...emptyData, value: 1n }, droidBaseEntity);
  components.IsActive.set({ ...emptyData, value: true }, droidBaseEntity);
  components.OwnedBy.set({ ...emptyData, value: asteroidEntity }, droidBaseEntity);

  if (components.P_Blueprint.has(EntityType.DroidBase)) return;

  components.P_Blueprint.set(
    { ...emptyData, value: components.P_Blueprint.get(EntityType.MainBase)?.value ?? [] },
    EntityType.DroidBase
  );
};

export function initializeSecondaryAsteroids(sourceEntity: Entity, source: Coord) {
  const config = components.P_GameConfig.get();
  const wormholeAsteroidConfig = components.P_WormholeAsteroidConfig.get();

  if (!config) throw new Error("GameConfig not found");
  if (!wormholeAsteroidConfig) throw new Error("WormholeAsteroidConfig not found");
  for (let i = 0; i < config.maxAsteroidsPerPlayer; i++) {
    const asteroidPositionRelative = getPositionByVector(
      Number(config.asteroidDistance),
      Math.floor((i * 360) / Number(config.maxAsteroidsPerPlayer))
    );
    const asteroidPosition = {
      x: source.x - asteroidPositionRelative.x,
      y: source.y - asteroidPositionRelative.y,
    };

    const asteroidEntity = getSecondaryAsteroidEntity(sourceEntity, asteroidPosition);

    const wormholeAsteroid = i == Number(wormholeAsteroidConfig.wormholeAsteroidSlot);

    if (components.ReversePosition.getWithKeys(asteroidPosition)) continue;

    if (!wormholeAsteroid && !isSecondaryAsteroid(asteroidEntity, Number(config.asteroidChanceInv), wormholeAsteroid))
      continue;

    if (!components.OwnedBy.get(asteroidEntity)) spawnDroidBase(asteroidEntity);

    world.registerEntity({ id: asteroidEntity });
    components.ReversePosition.setWithKeys({ entity: asteroidEntity as string, ...emptyData }, asteroidPosition);

    const asteroidData = getAsteroidData(asteroidEntity, wormholeAsteroid);
    components.Asteroid.set({ ...emptyData, ...asteroidData }, asteroidEntity);
    components.Position.set({ ...emptyData, ...asteroidPosition, parentEntity: toHex32("0") }, asteroidEntity);

    const defenseData = getSecondaryAsteroidUnitsAndEncryption(asteroidEntity, asteroidData.maxLevel);
    components.UnitCount.setWithKeys(
      { ...emptyData, value: defenseData.droidCount },
      { entity: asteroidEntity as Hex, unit: EntityType.Droid as Hex }
    );

    components.ResourceCount.setWithKeys(
      { ...emptyData, value: defenseData.encryption },
      { entity: asteroidEntity as Hex, resource: EResource.R_Encryption }
    );
    components.MaxResourceCount.setWithKeys(
      { ...emptyData, value: defenseData.encryption },
      { entity: asteroidEntity as Hex, resource: EResource.R_Encryption }
    );
  }
}

function isSecondaryAsteroid(entity: Entity, chanceInv: number, wormholeAsteroid: boolean) {
  if (wormholeAsteroid) {
    return true;
  }
  const motherlodeType = getByteUInt(entity, 6, 128);
  return motherlodeType % chanceInv === 0;
}

function getSecondaryAsteroidUnitsAndEncryption(asteroidEntity: Entity, level: bigint) {
  const droidCount = 4n ** level + 100n;
  const encryption = (level * 10n + 10n) * RESOURCE_SCALE;
  return { droidCount, encryption };
}

function getAsteroidData(
  asteroidEntity: Entity,
  wormholeAsteroid: boolean
): ComponentValue<typeof components.Asteroid.schema> {
  const wormholeAsteroidConfig = components.P_WormholeAsteroidConfig.get();
  if (!wormholeAsteroidConfig) throw new Error("wormholeAsteroidConfig not found");
  if (wormholeAsteroid) {
    return {
      ...emptyData,
      isAsteroid: true,
      maxLevel: wormholeAsteroidConfig.maxLevel,
      mapId: wormholeAsteroidConfig.mapId,
      primodium: wormholeAsteroidConfig.primodium,
      spawnsSecondary: false,
      wormhole: true,
    };
  }
  const distributionVal = getByteUInt(asteroidEntity, 7, 12) % 100;
  let maxLevel = 8;
  let primodium = 1n;

  const asteroidThresholdProb = components.P_AsteroidThresholdProbConfig.get();
  if (!asteroidThresholdProb) throw new Error("asteroidThresholdProb not found");

  let mapId = 1;

  // Distribution
  if (distributionVal < asteroidThresholdProb.common1) {
    // common resources
    maxLevel = 1; // micro
    primodium = 1n;
    mapId = EMap.Common;
  } else if (distributionVal < asteroidThresholdProb.common2) {
    // common + advanced resources
    maxLevel = 3; // small
    primodium = 2n;
    mapId = EMap.Common;
  } else if (distributionVal < asteroidThresholdProb.eliteMicro) {
    // elite resources, micro
    maxLevel = 1;
    primodium = 3n;
  } else if (distributionVal < asteroidThresholdProb.eliteSmall) {
    // elite resources, small
    maxLevel = 3;
    primodium = 4n;
  } else if (distributionVal < asteroidThresholdProb.eliteMedium) {
    // elite resources, medium
    maxLevel = 5;
    primodium = 5n;
  } else {
    // elite resources, large
    maxLevel = 8;
    primodium = 5n;
  }

  if (mapId != EMap.Common) {
    // elite resources
    // number between 2 and 5
    mapId = (getByteUInt(asteroidEntity, 3, 20) % 4) + 2;
  }
  return {
    ...emptyData,
    isAsteroid: true,
    maxLevel: BigInt(maxLevel),
    mapId: mapId,
    spawnsSecondary: false,
    wormhole: false,
    primodium,
  };
}

const ONE = BigInt(1);
const getByteUInt = (_b: Entity, length: number, shift: number): number => {
  const b = BigInt(_b);
  const mask = ((ONE << BigInt(length)) - ONE) << BigInt(shift);
  const _byteUInt = (b & mask) >> BigInt(shift);
  return Number(_byteUInt);
};
