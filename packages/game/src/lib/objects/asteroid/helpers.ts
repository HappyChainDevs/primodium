import { Sprites } from "@primodiumxyz/assets";
import { Entity } from "@primodiumxyz/reactive-tables";
import { Relationship } from "@game/lib/constants/common";
import {
  EntityTypeSizeToSecondaryAsteroidSprites,
  LevelToPrimaryAsteroidSprites,
  MaxLevelToAsteroidSpriteSize,
  RelationshipSizeToSecondaryAsteroidOutlineSprites,
  RelationshipToPrimaryAsteroidOutlineSprites,
} from "@game/lib/mappings";

export enum LODs {
  FullyShow = 0,
  ShowLabelOnly = 1,
  HideAsteroidAndOwnerLabel = 2,
  FullyHide = 3,
}

export const getPrimarySprite = (level: bigint) => {
  return LevelToPrimaryAsteroidSprites[Number(level - 1n)]!;
};

export const getSecondarySprite = (resourceType: Entity, maxLevel: bigint) => {
  const size = MaxLevelToAsteroidSpriteSize[Number(maxLevel)]!;
  return EntityTypeSizeToSecondaryAsteroidSprites[resourceType]![size] ?? Sprites.MotherlodeKimberliteSmall;
};

export const getPrimaryOutlineSprite = (rockRelationship: Relationship) => {
  return RelationshipToPrimaryAsteroidOutlineSprites[rockRelationship];
};

export const getSecondaryOutlineSprite = (relationship: Relationship, maxLevel: bigint) => {
  const size = MaxLevelToAsteroidSpriteSize[Number(maxLevel)]!;
  return RelationshipSizeToSecondaryAsteroidOutlineSprites[relationship][size] ?? Sprites.MotherlodeNeutralSmall;
};
