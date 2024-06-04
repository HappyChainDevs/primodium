import {
  MultiplierStorages,
  ResourceEntityLookup,
  ResourceStorages,
  SPEED_SCALE,
  UtilityStorages,
} from "@/lib/constants";
import { Components, Coord, Dimensions, ResourceType } from "@/lib/types";
import { createBoundsUtils } from "@/utils/core/bounds";
import { createRecipeUtils } from "@/utils/core/recipe";
import { createTileUtils } from "@/utils/core/tile";
import { getEntityTypeName, toRomanNumeral } from "@/utils/global/common";
import { Entity } from "@latticexyz/recs";
import { EResource, MUDEnums } from "contracts/config/enums";
import { Hex } from "viem";

export function createBuildingUtils(components: Components) {
  const { outOfBounds } = createBoundsUtils(components);
  const { getRecipe } = createRecipeUtils(components);
  const { getResourceKey, getBuildingAtCoord } = createTileUtils(components);
  const blueprintCache = new Map<Entity, Dimensions>();

  function calcDims(entity: Entity, coordinates: Coord[]): Dimensions {
    if (blueprintCache.has(entity)) return blueprintCache.get(entity)!;
    let minX = coordinates[0].x;
    let maxX = coordinates[0].x;
    let minY = coordinates[0].y;
    let maxY = coordinates[0].y;

    for (let i = 1; i < coordinates.length; i++) {
      minX = Math.min(minX, coordinates[i].x);
      maxX = Math.max(maxX, coordinates[i].x);
      minY = Math.min(minY, coordinates[i].y);
      maxY = Math.max(maxY, coordinates[i].y);
    }

    const width = maxX - minX + 1;
    const height = maxY - minY + 1;

    blueprintCache.set(entity, { width, height });
    return { width, height };
  }

  function convertToCoords(numbers: number[]): Coord[] {
    if (numbers.length % 2 !== 0) {
      throw new Error("Input array must contain an even number of elements");
    }

    const coordinates: Coord[] = [];

    for (let i = 0; i < numbers.length; i += 2) {
      coordinates.push({ x: numbers[i], y: numbers[i + 1] });
    }

    return coordinates;
  }

  function relCoordToAbs(coordinates: Coord[], origin: Coord): Coord[] {
    return coordinates.map((coord) => ({
      x: coord.x + origin.x,
      y: coord.y + origin.y,
    }));
  }

  function getBuildingOrigin(source: Coord, building: Entity) {
    const blueprint = components.P_Blueprint.get(building)?.value;
    if (!blueprint) return;
    const topLeftCoord = getTopLeftCoord(convertToCoords(blueprint));

    if (!blueprint) return;
    return { x: source.x - topLeftCoord.x, y: source.y - topLeftCoord.y };
  }

  function getBuildingTopLeft(origin: Coord, buildingType: Entity) {
    const rawBlueprint = components.P_Blueprint.get(buildingType)?.value;
    if (!rawBlueprint) throw new Error("No blueprint found");

    const relativeTopLeft = getTopLeftCoord(convertToCoords(rawBlueprint));

    return { x: origin.x + relativeTopLeft.x, y: origin.y + relativeTopLeft.y };
  }

  function getBuildingBottomLeft(origin: Coord, buildingType: Entity) {
    const rawBlueprint = components.P_Blueprint.get(buildingType)?.value;
    if (!rawBlueprint) throw new Error("No blueprint found");

    const relativeBottomLeft = getBottomLeftCoord(convertToCoords(rawBlueprint));

    return { x: origin.x + relativeBottomLeft.x, y: origin.y + relativeBottomLeft.y };
  }

  function getTopLeftCoord(coordinates: Coord[]): Coord {
    if (coordinates.length === 0) throw new Error("Cannot get top left coordinate of empty array");
    if (coordinates.length === 1) return coordinates[0];

    let minX = coordinates[0].x;
    let maxY = coordinates[0].y;

    for (let i = 1; i < coordinates.length; i++) {
      minX = Math.min(minX, coordinates[i].x);
      maxY = Math.max(maxY, coordinates[i].y);
    }

    return { x: minX, y: maxY };
  }

  function getBottomLeftCoord(coordinates: Coord[]): Coord {
    if (coordinates.length === 0) throw new Error("Cannot get bottom left coordinate of empty array");
    if (coordinates.length === 1) return coordinates[0];

    let minX = coordinates[0].x;
    let minY = coordinates[0].y;

    for (let i = 1; i < coordinates.length; i++) {
      minX = Math.min(minX, coordinates[i].x);
      minY = Math.min(minY, coordinates[i].y);
    }

    return { x: minX, y: minY };
  }

  function getBuildingDimensions(building: Entity) {
    const blueprint = components.P_Blueprint.get(building)?.value;

    const dimensions = blueprint ? calcDims(building, convertToCoords(blueprint)) : { width: 1, height: 1 };

    return dimensions;
  }

  const validateBuildingPlacement = (coord: Coord, buildingPrototype: Entity, asteroid: Entity, building?: Entity) => {
    //get building dimesions
    const buildingDimensions = getBuildingDimensions(buildingPrototype);
    const requiredTile = components.P_RequiredTile.get(buildingPrototype)?.value;

    //iterate over dimensions and check if there is a building there
    for (let x = 0; x < buildingDimensions.width; x++) {
      for (let y = 0; y < buildingDimensions.height; y++) {
        const buildingCoord = { x: coord.x + x, y: coord.y - y };
        const buildingAtCoord = getBuildingAtCoord(buildingCoord, asteroid);
        if (buildingAtCoord && buildingAtCoord !== building) return false;
        if (outOfBounds(buildingCoord, asteroid)) return false;
        const mapId = components.Asteroid.get(asteroid)?.mapId ?? 1;
        if (requiredTile && requiredTile !== getResourceKey(buildingCoord, mapId)) return false;
      }
    }

    return true;
  };

  const getBuildingName = (building: Entity) => {
    const buildingType = components.BuildingType.get(building)?.value as Entity;
    const level = components.Level.get(building)?.value ?? 1n;

    if (!buildingType) return null;

    return `${getEntityTypeName(buildingType)} ${toRomanNumeral(Number(level))}`;
  };

  const getBuildingStorages = (buildingType: Entity, level: bigint) => {
    const resourceStorages = MUDEnums.EResource.map((_, i) => {
      const storage = components.P_ByLevelMaxResourceUpgrades.getWithKeys({
        prototype: buildingType as Hex,
        level,
        resource: i,
      })?.value;

      if (!storage) return null;

      return {
        resource: ResourceEntityLookup[i as EResource],
        resourceType: components.P_IsUtility.getWithKeys({ id: i }) ? ResourceType.Resource : ResourceType.Utility,
        amount: storage,
      };
    });

    return resourceStorages.filter((storage) => !!storage) as {
      resource: Entity;
      resourceType: ResourceType;
      amount: bigint;
    }[];
  };

  function getBuildingLevelStorageUpgrades(buildingType: Entity, level: bigint) {
    const storageUpgrade = components.P_ListMaxResourceUpgrades.getWithKeys({
      prototype: buildingType as Hex,
      level: level,
    })?.value as EResource[] | undefined;
    if (!storageUpgrade) return [];
    return storageUpgrade.map((resource) => ({
      resource: ResourceEntityLookup[resource],
      amount:
        components.P_ByLevelMaxResourceUpgrades.getWithKeys({ prototype: buildingType as Hex, level, resource })
          ?.value ?? 0n,
    }));
  }

  function transformProductionData(
    production: { resources: number[]; amounts: bigint[] } | undefined
  ): { resource: Entity; amount: bigint; type: ResourceType }[] {
    if (!production) return [];

    return production.resources
      .map((curr, i) => {
        const resourceEntity = ResourceEntityLookup[curr as EResource];
        const type = ResourceStorages.has(resourceEntity)
          ? ResourceType.ResourceRate
          : UtilityStorages.has(resourceEntity)
          ? ResourceType.Utility
          : MultiplierStorages.has(resourceEntity)
          ? ResourceType.Multiplier
          : null;

        if (type === null) return null;

        let amount = production.amounts[i];
        if (type === ResourceType.ResourceRate) {
          const worldSpeed = components.P_GameConfig.get()?.worldSpeed ?? 100n;
          amount = (amount * worldSpeed) / SPEED_SCALE;
        }

        return {
          resource: ResourceEntityLookup[curr as EResource],
          amount,
          type,
        };
      })
      .filter((item) => item !== null) as { resource: Entity; amount: bigint; type: ResourceType }[];
  }

  const getBuildingInfo = (building: Entity) => {
    const buildingType = components.BuildingType.get(building)?.value as Hex | undefined;
    if (!buildingType) throw new Error("No building type found");
    const buildingTypeEntity = buildingType as Entity;

    const level = components.Level.get(building)?.value ?? 1n;
    const buildingLevelKeys = { prototype: buildingType, level: level };
    const production = transformProductionData(components.P_Production.getWithKeys(buildingLevelKeys));
    const productionDep = components.P_RequiredDependency.getWithKeys(buildingLevelKeys);

    const requiredDependencies = transformProductionData({
      resources: productionDep ? [productionDep.resource] : [],
      amounts: productionDep ? [productionDep.amount] : [],
    });
    const unitProduction = components.P_UnitProdTypes.getWithKeys(buildingLevelKeys)?.value;
    const storages = getBuildingStorages(buildingTypeEntity, level);
    const unitProductionMultiplier = components.P_UnitProdMultiplier.getWithKeys(buildingLevelKeys)?.value;
    const position = components.Position.get(building) ?? { x: 0, y: 0, parentEntity: undefined };

    const nextLevel = level + 1n;
    const maxLevel = components.P_MaxLevel.getWithKeys({ prototype: buildingType })?.value ?? 1n;

    let upgrade = undefined;
    if (nextLevel <= maxLevel) {
      const buildingNextLevelKeys = { prototype: buildingType, level: nextLevel };
      const nextLevelProduction = transformProductionData(components.P_Production.getWithKeys(buildingNextLevelKeys));
      const nextLevelProductionDep = components.P_RequiredDependency.getWithKeys(buildingNextLevelKeys);
      const nextLevelRequiredDependencies = transformProductionData({
        resources: nextLevelProductionDep ? [nextLevelProductionDep.resource] : [],
        amounts: nextLevelProductionDep ? [nextLevelProductionDep.amount] : [],
      });
      const unitNextLevelProduction = components.P_UnitProdTypes.getWithKeys(buildingNextLevelKeys)?.value;
      const nextLevelStorages = getBuildingStorages(buildingTypeEntity, nextLevel);
      const nextLevelUnitProductionMultiplier =
        components.P_UnitProdMultiplier.getWithKeys(buildingNextLevelKeys)?.value;
      const upgradeRecipe = getRecipe(buildingTypeEntity, nextLevel);
      const mainBaseLvlReq = components.P_RequiredBaseLevel.getWithKeys(buildingNextLevelKeys)?.value ?? 1;
      upgrade = {
        unitProduction: unitNextLevelProduction,
        production: nextLevelProduction,
        storages: nextLevelStorages,
        recipe: upgradeRecipe,
        mainBaseLvlReq,
        nextLevelUnitProductionMultiplier,
        requiredDependencies: nextLevelRequiredDependencies,
      };
    }

    return {
      buildingType,
      level,
      maxLevel,
      nextLevel,
      production,
      unitProduction,
      storages,
      position,
      unitProductionMultiplier,
      requiredDependencies,
      upgrade,
    };
  };

  return {
    calcDims,
    convertToCoords,
    relCoordToAbs,
    getBuildingOrigin,
    getBuildingDimensions,
    getBuildingName,
    getBuildingStorages,
    getBuildingLevelStorageUpgrades,
    validateBuildingPlacement,
    getBuildingInfo,
    getBuildingTopLeft,
    getBuildingBottomLeft,
  };
}
