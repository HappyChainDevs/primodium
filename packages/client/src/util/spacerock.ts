import { primodium } from "@game/api";
import { Entity } from "@latticexyz/recs";

import { Assets, EntitytoSpriteKey, SpriteKeys } from "@game/constants";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { ERock } from "contracts/config/enums";
import { components, components as comps } from "src/network/components";
import { Hangar } from "src/network/components/clientComponents";
import { clampedIndex, getBlockTypeName } from "./common";
import {
  EntityType,
  MotherlodeSizeNames,
  MotherlodeTypeNames,
  PIRATE_KEY,
  ResourceStorages,
  RockRelationship,
} from "./constants";
import { hashKeyEntity } from "./encode";
import { getFullResourceCount, getMotherlodeResource } from "./resource";
import { getNow } from "./time";

function getSpaceRockImage(spaceRock: Entity, type: ERock) {
  const { getSpriteBase64 } = primodium.api().sprite;

  if (type === ERock.Asteroid) {
    // const pirate = Pirate.get(spaceRock);

    // if (pirate) return getSpriteBase64(SpriteKeys.PirateAsteroid1, Assets.SpriteAtlas);

    const ownedBy = comps.OwnedBy.get(spaceRock, {
      value: singletonEntity,
    }).value as Entity;

    const mainBaseEntity = (comps.Home.get(ownedBy)?.mainBase ?? "-1") as Entity;

    const mainBaseLevel = comps.Level.get(mainBaseEntity, {
      value: 1n,
    }).value;

    const spriteKey =
      EntitytoSpriteKey[EntityType.Asteroid][
        clampedIndex(Number(mainBaseLevel - 1n), EntitytoSpriteKey[EntityType.Asteroid].length)
      ];

    return getSpriteBase64(spriteKey, Assets.SpriteAtlas);
  }

  if (type === ERock.Motherlode) {
    const motherlodeData = comps.Motherlode.get(spaceRock);
    if (!motherlodeData) return "";

    const spriteKey =
      SpriteKeys[
        `Motherlode${MotherlodeTypeNames[motherlodeData.motherlodeType]}${
          MotherlodeSizeNames[motherlodeData.size]
        }` as keyof typeof SpriteKeys
      ];

    return getSpriteBase64(spriteKey, Assets.SpriteAtlas);
  }

  return "";
}

export function getSpaceRockInfo(spaceRock: Entity) {
  const type = comps.RockType.get(spaceRock, { value: ERock.Asteroid }).value as ERock;

  const imageUri = getSpaceRockImage(spaceRock, type);

  const motherlodeData = comps.Motherlode.get(spaceRock);

  const ownedBy = comps.OwnedBy.get(spaceRock)?.value as Entity | undefined;
  const mainBaseEntity = comps.Home.get(ownedBy, {
    mainBase: "-1" as Entity,
    asteroid: "-1" as Entity,
  }).mainBase as Entity;
  const mainBaseLevel = comps.Level.get(mainBaseEntity)?.value;

  const position = comps.Position.get(spaceRock, {
    x: 0,
    y: 0,
    parent: "0" as Entity,
  });

  const resources = ownedBy
    ? [...ResourceStorages]
        .map((resource) => {
          const { resourceCount, resourcesToClaim } = getFullResourceCount(resource, ownedBy);

          const amount = resourceCount + resourcesToClaim;

          return {
            id: resource,
            amount,
          };
        })
        .filter((resource) => resource.amount)
    : [];

  const motherlodeResource = getMotherlodeResource(spaceRock);

  const hangar = Hangar.get(spaceRock);

  const gracePeriodValue = comps.GracePeriod.get(ownedBy)?.value ?? 0n;
  const isInGracePeriod = type === ERock.Asteroid ? gracePeriodValue > 0n && gracePeriodValue > getNow() : 0n;

  let name = "";
  switch (type) {
    case ERock.Motherlode:
      name = `${MotherlodeSizeNames[motherlodeData?.size ?? 0]} ${getBlockTypeName(motherlodeResource)} Motherlode`;
      break;
    case ERock.Asteroid:
      {
        const player = comps.Account.get()?.value;
        const hash = player ? hashKeyEntity(PIRATE_KEY, player) : undefined;
        name = `${hash === ownedBy ? "Pirate" : "Player"} Asteroid`;
      }
      break;
    default:
      name = "Unknown Spacerock";
      break;
  }

  return {
    type,
    imageUri,
    motherlodeData: {
      ...motherlodeData,
      motherlodeResource,
    },
    resources,
    ownedBy,
    mainBaseLevel,
    hangar,
    position,
    name,
    entity: spaceRock,
    isInGracePeriod,
    gracePeriodValue,
  };
}

export const getRockRelationship = (player: Entity, rock: Entity) => {
  const playerAlliance = components.PlayerAlliance.get(player)?.alliance;
  const rockOwner = components.OwnedBy.get(rock)?.value as Entity;
  const rockAlliance = components.PlayerAlliance.get(rockOwner)?.alliance;
  const rocktype = components.RockType.get(rock)?.value as ERock;

  if (player === rockOwner) return RockRelationship.Self;
  if (playerAlliance && playerAlliance === rockAlliance) return RockRelationship.Ally;
  if (rockOwner || rocktype === ERock.Asteroid) return RockRelationship.Enemy;

  return RockRelationship.Neutral;
};
