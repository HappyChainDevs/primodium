import { Entity } from "@latticexyz/recs";
import { Card } from "src/components/core/Card";
import { useFullResourceCounts } from "src/hooks/useFullResourceCount";
import { useUnitCounts } from "src/hooks/useUnitCount";
import { components } from "src/network/components";
import { EntityType, ResourceImage } from "src/util/constants";
import { formatNumber, formatResourceCount, formatTime } from "src/util/number";
import { getFleetStats } from "src/util/unit";

export const FleetInfo: React.FC<{ entity: Entity }> = ({ entity }) => {
  const fleetStats = getFleetStats(entity);
  const units = useUnitCounts(entity);
  const resources = useFullResourceCounts(entity);
  const movement = components.FleetMovement.use(entity);
  const time = components.Time.use()?.value ?? 0n;
  const arrivalTime = movement?.arrivalTime ?? 0n;
  const inTransit = arrivalTime > (time ?? 0n);
  const eta = inTransit ? formatTime(arrivalTime - time) : "";

  return (
    <Card className="ml-5 uppercase font-bold text-xs relative w-48">
      <div className="absolute top-0 left-0 w-full h-full topographic-background-sm opacity-50" />
      <div className="flex flex-col gap-1 z-10">
        <div className="flex gap-1 items-center">
          <p className="text-sm">{fleetStats.title}</p>
          <p className="text-xs opacity-50 bg-primary px-1">{inTransit ? `ETA ${eta}` : "ORBITING"}</p>
        </div>
        <div className="text-xs grid grid-cols-3 gap-1 divide-x divide-primary/50">
          <div className="flex flex-col gap-1 p-1">
            <div className="flex gap-1">
              <p className="text-secondary">{formatNumber(fleetStats.attack, { short: true })}</p> ATK
            </div>
            <div className="flex gap-1">
              <p className="text-secondary">{formatNumber(fleetStats.defense, { short: true })}</p> DEF
            </div>
            <div className="flex gap-1">
              <p className="text-secondary">
                {formatResourceCount(EntityType.Iron, fleetStats.cargo, { short: true })}
              </p>
              CRG
            </div>
            <div className="flex gap-1">
              <p className="text-secondary">{formatNumber(fleetStats.hp, { short: true })}</p> HP
            </div>
          </div>
          <div className="flex flex-col gap-1 p-1">
            {[...units.entries()].map(([unit, count]) => (
              <div key={`unit-${unit}`} className="flex gap-1">
                <img
                  src={ResourceImage.get(unit as Entity) ?? ""}
                  className={`pixel-images w-4 scale-200 font-bold text-lg pointer-events-none`}
                />
                {formatNumber(count, { short: true })}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1 p-1">
            {[...resources.entries()].map(([resource, count]) => (
              <div key={`resource-${resource}`} className="flex gap-1">
                <img
                  src={ResourceImage.get(resource as Entity) ?? ""}
                  className={`pixel-images w-4 scale-200 font-bold text-lg pointer-events-none`}
                />
                {formatResourceCount(resource as Entity, count.resourceCount, { short: true })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
