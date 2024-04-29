import { AsteroidRelationship } from "../../constants/common";
import {
  EntityTypeSizeToSecondaryAsteroidSprites,
  LevelToPrimaryAsteroidSprites,
  MaxLevelToAsteroidSpriteSize,
  RelationshipSizeToSecondaryAsteroidOutlineSprites,
  RelationshipToPrimaryAsteroidOutlineSprites,
} from "../../mappings";
import { Entity } from "@latticexyz/recs";

export const getPrimarySprite = (level: bigint) => {
  return LevelToPrimaryAsteroidSprites[Number(level)];
};

export const getSecondarySprite = (resourceType: Entity, maxLevel: bigint) => {
  const size = MaxLevelToAsteroidSpriteSize[Number(maxLevel)];
  return EntityTypeSizeToSecondaryAsteroidSprites[resourceType][size] ?? SpriteKeys.MotherlodeKimberliteSmall;
};

export const getPrimaryOutlineSprite = (rockRelationship: AsteroidRelationship) => {
  return RelationshipToPrimaryAsteroidOutlineSprites[rockRelationship];
};

export const getSecondaryOutlineSprite = (relationship: AsteroidRelationship, maxLevel: bigint) => {
  const size = MaxLevelToAsteroidSpriteSize[Number(maxLevel)];
  return RelationshipSizeToSecondaryAsteroidOutlineSprites[relationship][size] ?? SpriteKeys.MotherlodeNeutralSmall;
};
