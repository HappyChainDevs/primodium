import { ContractTableDefs } from "@primodiumxyz/reactive-tables";
import { DecodedIndexerQuery } from "@primodiumxyz/sync-stack/types";
import { Hex } from "viem";

export const getPlayerQuery = ({
  tables,
  playerEntity,
  worldAddress,
}: {
  tables: ContractTableDefs;
  playerEntity: Hex;
  worldAddress: Hex;
}): DecodedIndexerQuery => {
  return {
    address: worldAddress,
    queries: [
      {
        tableId: tables.UserDelegationControl.tableId,
        where: { column: "delegator", operation: "eq", value: playerEntity },
      },
      {
        tableId: tables.Spawned.tableId,
        where: { column: "entity", operation: "eq", value: playerEntity },
      },
      {
        tableId: tables.Home.tableId,
        where: { column: "entity", operation: "eq", value: playerEntity },
      },
      {
        tableId: tables.PlayerAlliance.tableId,
        where: { column: "entity", operation: "eq", value: playerEntity },
      },
      {
        tableId: tables.CompletedObjective.tableId,
        where: { column: "entity", operation: "eq", value: playerEntity },
      },
      {
        tableId: tables.MaxColonySlots.tableId,
        where: { column: "playerEntity", operation: "eq", value: playerEntity },
      },
      {
        tableId: tables.ColonySlotsInstallments.tableId,
        where: { column: "playerEntity", operation: "eq", value: playerEntity },
      },
      {
        tableId: tables.OwnedBy.tableId,
        where: {
          column: "value",
          operation: "eq",
          value: playerEntity,
        },
        include: [{ tableId: tables.Asteroid.tableId }],
      },
    ],
  };
};
