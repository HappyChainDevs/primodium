import { Entity } from "@latticexyz/recs";
import { Badge } from "src/components/core/Badge";
import { Button } from "src/components/core/Button";
import { SecondaryCard } from "src/components/core/Card";
import { ResourceIconTooltip } from "src/components/shared/ResourceIconTooltip";
import { TransactionQueueMask } from "src/components/shared/TransactionQueueMask";
import { useMud } from "src/hooks";
import { useHasEnoughResources } from "src/hooks/useHasEnoughResources";
import { components } from "src/network/components";
import { upgradeRange } from "src/network/setup/contractCalls/upgradeRange";
import { getBlockTypeName } from "src/util/common";
import { EntityType, ResourceImage, TransactionQueueType } from "src/util/constants";
import { hashEntities } from "src/util/encode";
import { getUpgradeInfo } from "src/util/upgrade";

export const ExpandRange: React.FC<{ asteroid: Entity }> = ({ asteroid }) => {
  asteroid;
  const mud = useMud();
  const { playerAccount } = mud;
  const mainBaseEntity = components.Home.use(asteroid)?.value as Entity;
  const mainBaseLevel = components.Level.use(mainBaseEntity, {
    value: 1n,
  }).value;
  const { level, maxLevel, mainBaseLvlReq, recipe, isResearched } = getUpgradeInfo(
    EntityType.Expansion,
    playerAccount.entity
  );
  console.log("ExpandRange", { level, maxLevel, mainBaseLvlReq, recipe, isResearched });

  const hasEnough = useHasEnoughResources(recipe);
  const canUpgrade = hasEnough && mainBaseLevel >= mainBaseLvlReq && !isResearched;
  const atMaxLevel = level >= maxLevel;

  let error = "";
  if (atMaxLevel) {
    error = "reached max expansion";
  } else if (!hasEnough) {
    error = "Not enough resources";
  } else if (mainBaseLevel < mainBaseLvlReq) {
    error = `Mainbase lvl. ${mainBaseLvlReq} required`;
  }
  return (
    <SecondaryCard className="w-full items-center">
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-2 items-center">
          <img src="img/icons/expansionicon.png" className="pixel-images h-8 w-8" />
          <div>
            {recipe.length !== 0 && <p className="text-xs opacity-75 px-2 mb-1">EXPANSION COST</p>}
            <div className="flex flex-wrap gap-1 px-2">
              {!atMaxLevel &&
                recipe.length !== 0 &&
                recipe.map((resource) => {
                  return (
                    <Badge key={resource.id + resource.type} className="text-xs gap-2">
                      <ResourceIconTooltip
                        name={getBlockTypeName(resource.id)}
                        image={ResourceImage.get(resource.id) ?? ""}
                        resource={resource.id}
                        amount={resource.amount}
                        resourceType={resource.type}
                        direction="top"
                        validate
                      />
                    </Badge>
                  );
                })}
            </div>
          </div>
        </div>
        <TransactionQueueMask queueItemId={hashEntities(TransactionQueueType.Upgrade, playerAccount.entity)}>
          <Button
            className="w-fit btn-secondary btn-sm"
            disabled={!canUpgrade}
            onClick={() => upgradeRange(mud, asteroid)}
          >
            Expand
          </Button>
        </TransactionQueueMask>
      </div>
      {error && <p className="animate-pulse text-error text-xs uppercase mt-2">{error}</p>}
      <div className="flex gap-1 mt-1">
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
    </SecondaryCard>
  );
};
