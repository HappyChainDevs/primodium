import { Badge } from "@/components/core/Badge";
import { Button } from "@/components/core/Button";
import { SecondaryCard } from "@/components/core/Card";
import { UnlockSlot } from "@/components/hud/modals/colony-ships/UnlockSlot";
import { ResourceIconTooltip } from "@/components/shared/ResourceIconTooltip";
import { useMud } from "@/hooks";
import { useColonySlots } from "@/hooks/useColonySlots";
import { usePrimodium } from "@/hooks/usePrimodium";
import { components } from "@/network/components";
import { getBuildingImage } from "@/util/building";
import { getEntityTypeName } from "@/util/common";
import { EntityType, ResourceImage } from "@/util/constants";
import { formatNumber, formatResourceCount } from "@/util/number";
import { getRecipe } from "@/util/recipe";
import { getUnitStats } from "@/util/unit";
import { Entity } from "@latticexyz/recs";
import React, { useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { Navigator } from "src/components/core/Navigator";
import { Hex } from "viem";

export const CommissionColonyShips: React.FC<{ buildingEntity: Entity }> = ({ buildingEntity }) => {
  const [activeTile, setActiveTile] = React.useState<"train" | number | null>(null);
  const primodium = usePrimodium();
  const {
    playerAccount: { entity: playerEntity },
  } = useMud();
  const buildingImage = getBuildingImage(primodium, buildingEntity);
  const colonySlotsData = useColonySlots(playerEntity);

  const totalTilesAvailable = 9 - Number(colonySlotsData.shipsInTraining + colonySlotsData.availableSlots);
  const currSlotIndex = colonySlotsData.occupiedSlots.length;

  return (
    <div className="flex flex-col gap-2 h-[28rem]">
      <div className="flex gap-2 items-center">
        <img src={buildingImage} className="h-10" />
        Shipyard
      </div>
      <div className="flex h-full gap-2">
        <div className="grid grid-rows-3 grid-cols-3 gap-1 aspect-square">
          {Array(Number(colonySlotsData.shipsInTraining))
            .fill(0)
            .map((_, i) => (
              <TrainShipTile onClick={() => setActiveTile("train")} key={`tile-${i}`} />
            ))}
          {Array(Number(colonySlotsData.availableSlots))
            .fill(0)
            .map((_, i) => (
              <UnlockTile key={`tile-${i}`} onClick={() => setActiveTile(i + currSlotIndex)} />
            ))}

          {Array(totalTilesAvailable)
            .fill(0)
            .map((_, i) => (
              <BlankTile key={`tile-${i}`} />
            ))}
        </div>
        {activeTile === "train" && <TrainColonyShip buildingEntity={buildingEntity} />}
        {typeof activeTile === "number" && <UnlockSlot playerEntity={playerEntity} index={activeTile} />}
      </div>
      <Navigator.BackButton className="btn-primary w-fit" />
    </div>
  );
};

const BlankTile: React.FC = () => {
  return (
    <SecondaryCard className="w-full h-full flex text-xs justify-center items-center opacity-50">{null}</SecondaryCard>
  );
};

const TrainShipTile: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <SecondaryCard className="w-full h-full !p-0">
      <Button onClick={onClick} variant="ghost" className="w-full h-full flex text-xs justify-center items-center">
        + Ship
      </Button>
    </SecondaryCard>
  );
};

const UnlockTile: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <SecondaryCard className="w-full h-full !p-0">
      <Button onClick={onClick} variant="ghost" className="w-full h-full flex text-xs justify-center items-center">
        <FaPlus /> Add Slot
      </Button>
    </SecondaryCard>
  );
};

const TrainColonyShip: React.FC<{ buildingEntity: Entity; className?: string }> = ({
  buildingEntity,
  className = "",
}) => {
  const asteroid = components.OwnedBy.use(buildingEntity)?.value as Entity;
  if (!asteroid) throw new Error("[ColonyShipData] No asteroid selected");

  const unit = EntityType.ColonyShip;
  const unitLevel = useMemo(() => {
    return components.UnitLevel.getWithKeys({ entity: asteroid as Hex, unit: unit as Hex })?.value ?? 0n;
  }, [unit, asteroid]);

  const recipe = useMemo(() => {
    return getRecipe(unit, unitLevel);
  }, [unit, unitLevel]);

  const shipImage = ResourceImage.get(unit) ?? "";

  return (
    <SecondaryCard className={`h-full w-full flex flex-col gap-6 p-3 justify-center items-center ${className}`}>
      <div className="flex flex-col items-center gap-2">
        <img src={shipImage} className="h-10" />
        <p>Colony Ship</p>
      </div>
      <div className="grid grid-cols-3 gap-x-2 gap-y-1 border-y border-cyan-400/30 mx-auto">
        {Object.entries(getUnitStats(EntityType.ColonyShip, asteroid)).map(([name, value]) => {
          return (
            <div key={name} className="flex flex-col items-center">
              <p className="text-xs opacity-50">{name}</p>
              <p>{["SPD"].includes(name) ? formatNumber(value) : formatResourceCount(EntityType.Iron, value)}</p>
            </div>
          );
        })}
      </div>
      {recipe && (
        <div className="flex justify-center items-center gap-1">
          {recipe.map((resource, i) => (
            <Badge key={`resource-${i}`}>
              <ResourceIconTooltip
                image={ResourceImage.get(resource.id) ?? ""}
                resource={resource.id}
                name={getEntityTypeName(resource.id)}
                amount={resource.amount}
                fontSize="sm"
                validate
                spaceRock={asteroid}
              />
            </Badge>
          ))}
        </div>
      )}
      <Button variant="primary" size="sm">
        Commission
      </Button>
    </SecondaryCard>
  );
};
