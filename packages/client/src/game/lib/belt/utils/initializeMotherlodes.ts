import { EntityID } from "@latticexyz/recs";
import { Coord, keccak256 } from "@latticexyz/utils";
import { defaultAbiCoder } from "ethers/lib/utils.js";
import {
  AsteroidType,
  GameConfig,
  Motherlode,
  MotherlodeResource,
  P_MotherlodeResource,
  Position,
  ReversePosition,
} from "src/network/components/chainComponents";
import { encodeCoord, hashKeyEntity } from "src/util/encode";
import { getPositionByVector } from "src/util/vector";
import { EMotherlodeSize, EMotherlodeType, ESpaceRockType } from "../types";
import { world } from "src/network/world";

export function initializeMotherlodes(sourceEntity: EntityID, source: Coord) {
  const config = GameConfig.get();
  if (!config) throw new Error("GameConfig not found");
  for (let i = 0; i < config.maxMotherlodesPerAsteroid; i++) {
    const motherlodePosition = getPositionByVector(
      config.motherlodeDistance,
      Math.floor((i * 360) / config.maxMotherlodesPerAsteroid),
      source
    );
    if (ReversePosition.has(encodeCoord(motherlodePosition))) continue;
    const motherlodeEntity = keccak256(
      defaultAbiCoder.encode(
        ["uint256", "string", "int32", "int32"],
        [sourceEntity, "motherlode", motherlodePosition.x, motherlodePosition.y]
      )
    ) as EntityID;
    if (!isMotherlode(motherlodeEntity, config.motherlodeChanceInv)) {
      continue;
    }

    world.registerEntity({ id: motherlodeEntity });
    console.log("initializing motherlode at ", motherlodePosition);
    const {
      size: rawSize,
      motherlodeType: rawMotherlodeType,
      cooldownBlocks,
    } = getMotherlodeRawPrototype(motherlodeEntity);
    const motherlodeType = getMotherlodeType(rawMotherlodeType);
    const size = getSize(rawSize);
    Motherlode.set(
      { size, motherlodeType, cooldownBlocks: cooldownBlocks.toString() },
      motherlodeEntity
    );
    const encodedPosition = encodeCoord(motherlodePosition);
    Position.set(
      { ...motherlodePosition, parent: "0" as EntityID },
      motherlodeEntity
    );
    ReversePosition.set({ value: encodedPosition }, motherlodeEntity);

    const resource = P_MotherlodeResource.get(
      hashKeyEntity(motherlodeType, size)
    )?.resource;

    if (!resource)
      throw new Error("no resource found for this motherlode type and size");
    const resourceMotherlodeEntity = hashKeyEntity(resource, motherlodeEntity);
    world.registerEntity({ id: resourceMotherlodeEntity });
    MotherlodeResource.set({ value: 0 }, resourceMotherlodeEntity);
    AsteroidType.set({ value: ESpaceRockType.Motherlode }, motherlodeEntity);
  }
}

function isMotherlode(entity: EntityID, chanceInv: number) {
  const motherlodeType = getByteUInt(entity, 6, 128);
  return motherlodeType % chanceInv === 1;
}

function getSize(size: number) {
  if (size <= 16) return EMotherlodeSize.SMALL;
  if (size <= 26) return EMotherlodeSize.MEDIUM;
  return EMotherlodeSize.LARGE;
}

function getMotherlodeType(motherlodeType: number) {
  if (motherlodeType <= 11) return EMotherlodeType.TITANIUM;
  if (motherlodeType < 21) return EMotherlodeType.IRIDIUM;
  if (motherlodeType < 27) return EMotherlodeType.PLATINUM;
  return EMotherlodeType.KIMBERLITE;
}

const getByteUInt = (_b: EntityID, length: number, shift: number): number => {
  const b = BigInt(_b);
  const mask = ((1n << BigInt(length)) - 1n) << BigInt(shift);
  const _byteUInt = (b & mask) >> BigInt(shift);
  return Number(_byteUInt);
};

function getMotherlodeRawPrototype(entity: EntityID) {
  // 0-31 size
  const size = getByteUInt(entity, 5, 0);
  // 0-31 motherlodeType
  const motherlodeType = getByteUInt(entity, 5, 5);
  // 0-63 blocks to wait
  const cooldownBlocks = getByteUInt(entity, 6, 10);
  return { size, motherlodeType, cooldownBlocks };
}
