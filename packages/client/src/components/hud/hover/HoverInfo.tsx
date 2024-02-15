import { Entity } from "@latticexyz/recs";
import { useEffect, useState } from "react";
import { components } from "src/network/components";
import { getBuildingName } from "src/util/building";
import { Card } from "../../core/Card";
import { FleetHover } from "./FleetHover";
import { RockHover } from "./RockHover";

export const HoverInfo = () => {
  const [hoverEntity, setHoverEntity] = useState<Entity | null>(null);

  const BuildingInfo: React.FC<{ entity: Entity }> = ({ entity }) => {
    const buildingName = getBuildingName(entity);

    return (
      <Card className="ml-5 uppercase font-bold text-xs relative">
        <div className="absolute top-0 left-0 w-full h-full topographic-background-sm opacity-50" />
        <p className="z-10">{buildingName}</p>
      </Card>
    );
  };

  const rawHoverEntity = components.HoverEntity.use()?.value;

  useEffect(() => {
    const showDelay = 300;
    let timeout: NodeJS.Timeout | null = null;
    if (!rawHoverEntity) {
      setHoverEntity(null);
      timeout && clearTimeout(timeout);
    }

    if (rawHoverEntity) {
      timeout = setTimeout(() => {
        setHoverEntity(rawHoverEntity);
      }, showDelay);
    }

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [rawHoverEntity]);

  if (!hoverEntity) return <></>;

  let content = <></>;
  if (components.BuildingType.has(hoverEntity)) content = <BuildingInfo entity={hoverEntity} />;
  else if (components.Asteroid.has(hoverEntity)) content = <RockHover entity={hoverEntity} />;
  else if (components.IsFleet.has(hoverEntity)) content = <FleetHover entity={hoverEntity} />;

  return (
    <div className="relative" style={{ zIndex: 1001 }}>
      {content}
    </div>
  );
};
