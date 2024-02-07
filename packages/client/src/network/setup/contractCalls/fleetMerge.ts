import { Entity } from "@latticexyz/recs";
import { execute } from "src/network/actions";
import { MUD } from "src/network/types";
import { TransactionQueueType } from "src/util/constants";
import { getSystemId, hashEntities } from "src/util/encode";
import { Hex } from "viem";

export const mergeFleets = async (mud: MUD, fleets: Entity[]) => {
  await execute(
    {
      mud,
      functionName: "mergeFleets",
      systemId: getSystemId("FleetMergeSystem"),
      args: [fleets as Hex[]],
      delegate: true,
    },
    {
      id: hashEntities(TransactionQueueType.MergeFleets, ...fleets),
      type: TransactionQueueType.MergeFleets,
    }
  );
};
