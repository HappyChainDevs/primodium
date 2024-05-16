import type { Sync } from "@primodiumxyz/sync-stack";
import { EntityType } from "src/util/constants";
import { Hex } from "viem";

export const getInitalQuery = ({
  tables,
  world,
  indexerUrl,
  worldAddress,
}: Omit<Parameters<typeof Sync.withQueryDecodedIndexerRecsSync>[0], "query"> & {
  worldAddress: Hex;
}) => {
  //get all the tables that start with P_
  const configTableQueries = [...Object.keys(tables)]
    .filter((key) => key.startsWith("P_"))
    .map((tableName) => ({ tableId: tables[tableName].tableId }));

  return {
    indexerUrl,
    tables,
    world,
    query: {
      address: worldAddress as Hex,
      queries: [
        ...configTableQueries,
        { tableId: tables.FunctionSelectors.tableId },
        { tableId: tables.FunctionSignatures.tableId },
        { tableId: tables.Dimensions.tableId },
        { tableId: tables.GracePeriod.tableId },
        { tableId: tables.Wormhole.tableId },
        { tableId: tables.Points.tableId },
        { tableId: tables.Alliance.tableId },
        { tableId: tables.PlayerAlliance.tableId },
        { tableId: tables.Reserves.tableId },
        { tableId: tables.Home.tableId },
        //get main base starting coord
        { tableId: tables.Position.tableId, where: { column: "entity", operation: "eq", value: EntityType.MainBase } },
        {
          tableId: tables.Position.tableId,
          where: { column: "entity", operation: "eq", value: EntityType.WormholeBase },
        },
        //get asteroids
        {
          tableId: tables.Asteroid.tableId!,
          include: [
            {
              tableId: tables.OwnedBy.tableId,
            },
            {
              tableId: tables.Position.tableId,
            },
            {
              tableId: tables.ReversePosition.tableId,
              on: "entity",
            },
            {
              tableId: tables.Level.tableId,
            },
          ],
        },
        //get fleets
        {
          tableId: tables.FleetMovement.tableId,
          include: [
            { tableId: tables.IsFleetEmpty.tableId },
            { tableId: tables.FleetStance.tableId },
            { tableId: tables.IsFleet.tableId },
            { tableId: tables.OwnedBy.tableId, on: "entity" },
            { tableId: tables.CooldownEnd.tableId },
          ],
        },
      ],
    } as Parameters<typeof Sync.withQueryDecodedIndexerRecsSync>[0]["query"],
  };
};
