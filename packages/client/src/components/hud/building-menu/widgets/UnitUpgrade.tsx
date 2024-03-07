import { Entity } from "@latticexyz/recs";
import { memo } from "react";
import { Badge } from "src/components/core/Badge";
import { Button } from "src/components/core/Button";
import { SecondaryCard } from "src/components/core/Card";
import { IconLabel } from "src/components/core/IconLabel";
import { ResourceIconTooltip } from "src/components/shared/ResourceIconTooltip";
import { TransactionQueueMask } from "src/components/shared/TransactionQueueMask";
import { useMud } from "src/hooks";
import { useHasEnoughResources } from "src/hooks/useHasEnoughResources";
import { components } from "src/network/components";
import { upgradeUnit } from "src/network/setup/contractCalls/upgradeUnit";
import { getEntityTypeName } from "src/util/common";
import {
  BackgroundImage,
  EntityType,
  ResourceImage,
  ResourceType,
  TransactionQueueType,
  UnitEnumLookup,
} from "src/util/constants";
import { hashEntities } from "src/util/encode";
import { formatNumber, formatResourceCount } from "src/util/number";
import { getUnitStatsLevel } from "src/util/unit";
import { getUpgradeInfo } from "src/util/upgrade";

export const RecipeDisplay: React.FC<{
  asteroid: Entity;
  recipe: {
    id: Entity;
    type: ResourceType;
    amount: bigint;
  }[];
}> = memo(({ recipe, asteroid }) => {
  return (
    <SecondaryCard className="items-center gap-1 w-full !border-error/50 bg-transparent p-1">
      <p className="font-bold absolute opacity-75 left-0 top-1/2 -translate-y-1/2 text-error text-sm ml-1">-</p>
      <div className="flex flex-wrap justify-center items-center gap-1 w-44">
        {recipe.length == 0 ? (
          <Badge className="font-bold">FREE</Badge>
        ) : (
          recipe.map((resource, i) => {
            const resourceImage = ResourceImage.get(resource.id)!;
            const resourceName = getEntityTypeName(resource.id);
            return (
              <Badge key={`recipe-chunk-${i}`} className="border border-secondary/75">
                <ResourceIconTooltip
                  key={resource.id + resource.type}
                  spaceRock={asteroid}
                  image={resourceImage}
                  resource={resource.id}
                  resourceType={resource.type}
                  name={resourceName}
                  amount={resource.amount}
                  validate
                  fontSize={"xs"}
                  short
                  direction="top"
                  fractionDigits={1}
                />
              </Badge>
            );
          })
        )}
      </div>
    </SecondaryCard>
  );
});
export const UnitUpgrade: React.FC<{ unit: Entity }> = memo(({ unit }) => {
  const mud = useMud();

  const asteroid = components.ActiveRock.use()?.value as Entity | undefined;
  if (!asteroid) throw new Error("No active rock entity found");
  const mainBaseEntity = components.Home.use(asteroid)?.value as Entity;
  const mainBaseLevel = components.Level.use(mainBaseEntity, {
    value: 1n,
  }).value;

  const { level, maxLevel, mainBaseLvlReq, recipe, isResearched } = getUpgradeInfo(unit, asteroid);

  const hasEnough = useHasEnoughResources(recipe, asteroid);
  const canUpgrade = hasEnough && mainBaseLevel >= mainBaseLvlReq && !isResearched;

  let error = "";
  if (!hasEnough) {
    error = "Not enough resources";
  } else if (mainBaseLevel < mainBaseLvlReq) {
    error = `Mainbase lvl. ${mainBaseLvlReq} required`;
  } else if (level >= maxLevel) {
    error = "reached max upgrade";
  }

  const nextStats = getUnitStatsLevel(unit, level + 1n);
  return (
    <SecondaryCard className="flex flex-col gap-2 p-3 justify-between items-center">
      <div className="flex gap-1 absolute top-2 left-1/2 -translate-x-1/2">
        {Array(Number(maxLevel))
          .fill(0)
          .map((_, index) => {
            return (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${level - 1n >= index ? "bg-green-600" : "bg-slate-500"}`}
              />
            );
          })}
      </div>

      <IconLabel
        className="text-lg font-bold gap-4 mt-2"
        imageUri={BackgroundImage.get(unit)?.at(0) ?? ""}
        text={getEntityTypeName(unit)}
      />
      <div className="grid grid-cols-6 gap-2 border-y border-cyan-400/30 mx-auto">
        {Object.entries(getUnitStatsLevel(unit, level)).map(([name, value]) => {
          const increase = level === maxLevel ? 0n : nextStats[name as keyof typeof nextStats] - value;
          return (
            <div key={name} className="flex flex-col items-center">
              <p className="text-xs opacity-50">{name}</p>

              <p className="text-sm">
                {name === "SPD" ? formatNumber(value) : formatResourceCount(EntityType.Iron, value)}
              </p>
              <p className="text-xs text-success">
                {increase > 0n ? "+" : ""}
                {name === "SPD" ? formatNumber(increase) : formatResourceCount(EntityType.Iron, increase)}
              </p>
            </div>
          );
        })}
      </div>

      <RecipeDisplay asteroid={asteroid} recipe={recipe} />
      <TransactionQueueMask queueItemId={hashEntities(TransactionQueueType.Upgrade, unit)}>
        <Button
          className="btn-sm btn-secondary"
          disabled={!canUpgrade}
          onClick={() => upgradeUnit(mud, asteroid, UnitEnumLookup[unit])}
        >
          Upgrade
        </Button>
      </TransactionQueueMask>

      {error && <p className="text-xs text-error animate-pulse uppercase py-1">{error}</p>}
    </SecondaryCard>
  );
});
