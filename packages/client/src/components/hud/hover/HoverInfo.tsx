import { Entity } from "@latticexyz/recs";
import { components } from "src/network/components";
import { getBuildingName } from "src/util/building";
import { Card } from "../../core/Card";
import { BlueprintInfo } from "../widgets/blueprints/BlueprintInfo";
import { AsteroidHover } from "./AsteroidHover";
import { FleetHover } from "./FleetHover";
import { ShardAsteroidHover } from "./ShardAsteroidHover";

export const HoverInfo = () => {
  const BuildingInfo: React.FC<{ entity: Entity }> = ({ entity }) => {
    const buildingName = getBuildingName(entity);

    return (
      <div className="uppercase font-bold text-xs relative p-1">
        <div className="absolute top-0 left-0 w-full h-full topographic-background-sm opacity-50" />
        <p className="z-10">{buildingName}</p>
      </div>
    );
  };

  const hoverEntity = components.HoverEntity.use()?.value;

  if (!hoverEntity) return <></>;

  let content = <></>;
  if (components.BuildingType.has(hoverEntity)) content = <BuildingInfo entity={hoverEntity} />;
  else if (components.Asteroid.has(hoverEntity)) content = <AsteroidHover entity={hoverEntity} />;
  else if (components.ShardAsteroid.has(hoverEntity)) content = <ShardAsteroidHover entity={hoverEntity} />;
  else if (components.IsFleet.has(hoverEntity)) content = <FleetHover entity={hoverEntity} />;
  else if (components.P_Blueprint.has(hoverEntity)) content = <BlueprintInfo building={hoverEntity} />;

  return (
    <Card className="relative ml-5 grid-background-sm shadow-2xl shadow-secondary/25 border-0">
      <div className="absolute inset-0 hover-gradient" />
      <div className="absolute inset-0 pixel-border2 scale-105 blur-[3px] opacity-50 bg-blend-hard-light" />
      <div className="absolute inset-0 pixel-border2" />
      <div className="absolute inset-0 pixel-border2 blur-[2px] opacity-50 bg-blend-screen" />
      {content}
    </Card>
  );
};
