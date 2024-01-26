import { Entity } from "@latticexyz/recs";
import { execute } from "src/network/actions";
import { MUD } from "src/network/types";
import { TransactionQueueType } from "src/util/constants";
import { getSystemId, hashEntities } from "src/util/encode";
import { Hex } from "viem";

export const attack = async (mud: MUD, entity: Entity, target: Entity) => {
  await execute(
    {
      mud,
      functionName: "attack",
      systemId: getSystemId("FleetCombatSystem"),
      args: [entity as Hex, target as Hex],
      delegate: true,
    },
    {
      id: hashEntities(TransactionQueueType.Attack, entity, target),
      type: TransactionQueueType.Attack,
    }
  );
};
