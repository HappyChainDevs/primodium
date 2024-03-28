import { Primodium } from "@game/api";
import { Entity } from "@latticexyz/recs";

import { singletonEntity } from "@latticexyz/store-sync/recs";
import { EFleetStance } from "contracts/config/enums";
// import { getRockSprite } from "src/game/scenes/starmap/systems/utils/getSprites";
import { components, components as comps } from "src/network/components";
import { Hangar } from "src/network/components/clientComponents";
import { getBlockTypeName } from "./common";
import { EntityType, MapIdToAsteroidType, ResourceStorages, RockRelationship } from "./constants";
import { getFullResourceCount } from "./resource";
import { getOrbitingFleets } from "./unit";
import { Assets } from "src/game/lib/constants/assets";
import { SpriteKeys } from "src/game/lib/constants/assets/sprites";

//TODO: proper implementation
export function getAsteroidImage(primodium: Primodium, asteroid: Entity) {
  const { getSpriteBase64 } = primodium.api().sprite;
  console.log("getAsteroidImage", asteroid);
  return getSpriteBase64(SpriteKeys.Asteroid1, Assets.SpriteAtlas);
}

export function getAsteroidName(spaceRock: Entity) {
  const expansionLevel = comps.Level.get(spaceRock)?.value;
  const asteroidData = comps.Asteroid.get(spaceRock);

  const asteroidResource = MapIdToAsteroidType[asteroidData?.mapId ?? 0];
  const asteroidSize = asteroidResource
    ? {
        1: "Micro",
        3: "Small",
        5: "Medium",
        8: "Large",
      }[Number(asteroidData?.maxLevel ?? 1)]
    : "";

  return ` ${expansionLevel ? `LVL. ${expansionLevel} ` : asteroidSize} ${
    asteroidResource ? getBlockTypeName(asteroidResource) : ""
  } ${"Asteroid"}`;
}

export function getAsteroidDescription(asteroid: Entity) {
  const asteroidData = comps.Asteroid.get(asteroid);

  const asteroidResource = MapIdToAsteroidType[asteroidData?.mapId ?? 0];
  const asteroidSize = {
    1: "Micro",
    3: "Small",
    5: "Medium",
    8: "Large",
  }[Number(asteroidData?.maxLevel ?? 1)];

  return {
    type: asteroidResource ? getBlockTypeName(asteroidResource) : "Basic",
    size: asteroidSize,
  };
}

export function getAsteroidInfo(primodium: Primodium, spaceRock: Entity) {
  const imageUri = getAsteroidImage(primodium, spaceRock);
  const ownedBy = comps.OwnedBy.get(spaceRock)?.value as Entity | undefined;
  const mainBaseEntity = comps.Home.get(spaceRock)?.value as Entity;
  const mainBaseLevel = comps.Level.get(mainBaseEntity)?.value;
  const asteroidData = comps.Asteroid.get(spaceRock);

  const position = comps.Position.get(spaceRock, {
    x: 0,
    y: 0,
    parentEntity: "0" as Entity,
  });

  const resources = [...ResourceStorages].reduce((acc, resource) => {
    const { resourceCount } = getFullResourceCount(resource, spaceRock);
    const amount = resourceCount;

    if (amount) {
      // only add to the array if amount is non-zero
      acc.push({ id: resource, amount });
    }

    return acc;
  }, [] as { id: Entity; amount: bigint }[]);
  const { resourceCount: encryption } = getFullResourceCount(EntityType.Encryption, spaceRock);

  const hangar = Hangar.get(spaceRock);

  const gracePeriodValue = comps.GracePeriod.get(ownedBy)?.value ?? 0n;
  const now = comps.Time.get()?.value ?? 0n;
  const isInGracePeriod = gracePeriodValue > 0n && gracePeriodValue > now;

  const isBlocked = !!getOrbitingFleets(spaceRock).find(
    (fleet) => components.FleetStance.get(fleet)?.stance == EFleetStance.Block
  );

  return {
    imageUri,
    resources,
    ownedBy,
    mainBaseLevel,
    hangar,
    position,
    name: getAsteroidName(spaceRock),
    entity: spaceRock,
    isInGracePeriod,
    gracePeriodValue,
    asteroidData,
    encryption,
    isBlocked,
  };
}

export const getRockRelationship = (player: Entity, rock: Entity) => {
  if (player === singletonEntity) return RockRelationship.Neutral;
  const playerAlliance = components.PlayerAlliance.get(player)?.alliance;
  const rockOwner = components.OwnedBy.get(rock)?.value as Entity;
  const rockAlliance = components.PlayerAlliance.get(rockOwner)?.alliance;

  if (player === rockOwner) return RockRelationship.Self;
  if (playerAlliance && playerAlliance === rockAlliance) return RockRelationship.Ally;
  if (rockOwner) return RockRelationship.Enemy;

  return RockRelationship.Neutral;
};
