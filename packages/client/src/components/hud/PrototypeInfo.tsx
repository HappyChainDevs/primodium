import { Entity } from "@latticexyz/recs";
import React, { useMemo } from "react";

import { EntityToResourceImage, EntityToUnitImage } from "@/util/mappings";
import _ from "lodash";
import { ResourceIconTooltip } from "src/components/shared/ResourceIconTooltip";
import { EntityTypetoBuildingSprites } from "src/game/lib/mappings";
import { useGame } from "src/hooks/useGame";
import { useHasEnoughResources } from "src/hooks/useHasEnoughResources";
import { components } from "src/network/components";
import { getBuildingLevelStorageUpgrades, transformProductionData } from "src/util/building";
import { getEntityTypeName } from "src/util/common";
import { ResourceType } from "src/util/constants";
import { getRecipe } from "src/util/recipe";
import { Hex } from "viem";
import { Badge } from "../core/Badge";
import { IconLabel } from "../core/IconLabel";

export const RecipeDisplay: React.FC<{
  building: Entity;
  asteroid: Entity;
}> = ({ building, asteroid }) => {
  const recipe = getRecipe(building, 1n);

  if (recipe.length === 0) return <></>;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex justify-center items-center text-sm bg-slate-800/60 p-1 border border-slate-500 rounded-md gap-2 flex-wrap w-full">
        {_.chunk(recipe, 2).map((chunk, i) => (
          <div key={`recipe-chunk-${i}`} className="flex flex-row gap-1">
            {chunk.map((resource) => {
              return (
                <ResourceIconTooltip
                  key={resource.id + resource.type}
                  spaceRock={asteroid}
                  image={EntityToResourceImage[resource.id]}
                  resource={resource.id}
                  resourceType={resource.type}
                  name={getEntityTypeName(resource.id)}
                  amount={resource.amount}
                  validate
                  fontSize={"xs"}
                  short
                  fractionDigits={3}
                />
              );
            })}
          </div>
        ))}
        <p className="text-[.6rem] opacity-50">COST</p>
      </div>
    </div>
  );
};

export const PrototypeInfo: React.FC<{
  building: Entity;
}> = ({ building }) => {
  const { getSpriteBase64 } = useGame().ASTEROID.sprite;
  const rawProduction = components.P_Production.useWithKeys({ prototype: building as Hex, level: 1n });
  const production = useMemo(() => transformProductionData(rawProduction), [rawProduction]);
  const spaceRock = components.ActiveRock.use()?.value;
  if (!spaceRock) throw new Error("No asteroid found");

  const unitProduction = components.P_UnitProdTypes.useWithKeys({ prototype: building as Hex, level: 1n });
  const storageUpgrades = useMemo(() => getBuildingLevelStorageUpgrades(building, 1n), [building]);

  const hasEnough = useHasEnoughResources(getRecipe(building, 1n), spaceRock);

  if (!getEntityTypeName(building)) return <></>;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-col justify-center items-center border border-yellow-400 border-dashed ring ring-yellow-700/20 rounded-md bg-slate-900 p-2">
        <div className="relative flex gap-2 items-center">
          <div className="flex flex-col items-center gap-2">
            <div
              className={`relative flex flex-col text-sm items-center cursor-pointer w-16 h-12 border rounded border-cyan-400`}
            >
              <img
                src={
                  EntityTypetoBuildingSprites[building] !== undefined
                    ? getSpriteBase64(EntityTypetoBuildingSprites[building][0])
                    : undefined
                }
                className={`absolute bottom-0 w-14 pixel-images rounded-md`}
              />
            </div>
            {production.map(({ resource, amount, type }) => (
              <Badge
                key={`prototypeproduction-${resource}`}
                className="text-xs gap-2 bg-green-800/60 py-3 border border-green-600 rounded-md w-fit"
              >
                <ResourceIconTooltip
                  name={getEntityTypeName(resource)}
                  image={EntityToResourceImage[resource]}
                  resource={resource}
                  amount={amount}
                  resourceType={type}
                  short
                  fractionDigits={3}
                />
              </Badge>
            ))}
            {!!unitProduction && (
              <Badge
                className="text-xs gap-2 bg-green-800/60 py-3 border border-green-600 rounded-md w-fit justify-center"
                tooltipDirection={"bottom"}
              >
                {unitProduction?.value.map((unit) => (
                  <IconLabel
                    className={`text-xs font-bold justify-center`}
                    imageUri={EntityToUnitImage[unit]}
                    key={`unitProduction-${unit}`}
                    hideText
                  />
                ))}
              </Badge>
            )}
            {!!storageUpgrades.length && (
              <div className="flex flex-col text-xs gap-1 bg-green-800/60 p-2 border border-green-600 rounded-md w-fit justify-center text-center">
                Storage
                {_.chunk(storageUpgrades, 2).map((chunk, i) => (
                  <div key={`storage-chunk-${i}`} className="flex flex-row gap-1">
                    {chunk.map(({ resource, amount }) => (
                      <Badge
                        key={`storage-${resource}`}
                        className="text-xs gap-2 bg-green-800/60 py-3 border border-green-600 rounded-md w-full"
                      >
                        <ResourceIconTooltip
                          name={getEntityTypeName(resource)}
                          image={EntityToResourceImage[resource]}
                          resource={resource}
                          amount={amount}
                          resourceType={ResourceType.Resource}
                          short
                          fractionDigits={3}
                        />
                      </Badge>
                    ))}
                  </div>
                ))}
              </div>
            )}
            <p className="text-[.6rem] opacity-50">OUTPUT</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="flex justify-center align-center border border-cyan-700 bg-slate-700 rounded-md p-1 text-sm font-bold w-full text-center">
              {getEntityTypeName(building)}
            </p>
            <div className="flex gap-1 w-full">
              {
                <div className="flex flex-col gap-1 w-18 text-xs w-full">
                  <RecipeDisplay building={building} asteroid={spaceRock} />
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      {!hasEnough && <p className="text-rose-400 animate-pulse text-xs">NOT ENOUGH RESOURCES</p>}
    </div>
  );
};
