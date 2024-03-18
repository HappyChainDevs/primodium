import { Entity } from "@latticexyz/recs";
import { ampli } from "src/ampli";
import { execute } from "src/network/actions";
import { components } from "src/network/components";
import { MUD } from "src/network/types";
import { getBlockTypeName } from "src/util/common";
import { TransactionQueueType } from "src/util/constants";
import { getSystemId, hashEntities } from "src/util/encode";
import { bigintToNumber } from "src/util/number";
import { Hex } from "viem";
import { parseReceipt } from "../../../util/analytics/parseReceipt";

export async function demolishBuilding(mud: MUD, building: Entity) {
  const position = components.Position.get(building);

  if (!position) return;

  await execute(
    {
      mud,
      functionName: "Primodium__destroy",
      systemId: getSystemId("DestroySystem"),
      args: [{ ...position, parent: position.parent as Hex }],
      withSession: true,
    },
    {
      id: hashEntities(TransactionQueueType.Demolish, building),
    },
    (receipt) => {
      const buildingType = components.BuildingType.get(building)?.value as Entity;
      const currLevel = components.Level.get(building)?.value || 0;

      ampli.systemDestroy({
        asteroidCoord: position.parent,
        buildingType: getBlockTypeName(buildingType),
        coord: [position.x, position.y],
        currLevel: bigintToNumber(currLevel),
        ...parseReceipt(receipt),
      });
    }
  );
}
