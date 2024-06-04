import { Entity, HasValue, runQuery } from "@latticexyz/recs";
import { InterfaceIcons } from "@primodiumxyz/assets";
import { Hex } from "viem";
import { BuildObjective, ObjectiveReq } from "../types";
import { Components } from "@/types";
import { getEntityTypeName } from "@/utils/global/common";

export function getHasRequiredBuilding(
  components: Components,
  asteroid: Entity,
  objective: BuildObjective
): ObjectiveReq {
  const buildings = runQuery([
    HasValue(components.OwnedBy, { value: asteroid as Hex }),
    HasValue(components.BuildingType, { value: objective.buildingType as Hex }),
  ]);

  return {
    tooltipText: `Build a ${getEntityTypeName(objective.buildingType)}`,
    backgroundImage: InterfaceIcons.Build,
    requiredValue: 1n,
    currentValue: BigInt(buildings.size),
    isBool: true,
    scale: 1n,
  };
}
