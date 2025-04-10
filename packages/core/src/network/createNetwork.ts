import { happyProvider } from "@happy.tech/core";
import { transportObserver } from "@latticexyz/common";
import mudConfig from "contracts/mud.config";
import { createPublicClient, custom, fallback, Hex, http, Transport } from "viem";

import { createWorld } from "@primodiumxyz/reactive-tables";
import { CoreConfig, CreateNetworkResult } from "@/lib/types";
import { createClock } from "@/network/createClock";
import { otherTableDefs } from "@/network/otherTableDefs";
import { setupRecs } from "@/recs/setupRecs";
import { setupSyncTables } from "@/tables/syncTables";

/**
 * Creates network object
 *
 * @param config Configuration of core object {@link CoreConfig}
 * @returns: {@link CreateNetworkResult}
 */
export function createNetwork(config: CoreConfig): CreateNetworkResult {
  const world = createWorld();

  const clientOptions = {
    chain: config.chain,
    // [HAPPY_PRIM] publicClient here is used in core/src/txExecute/_execute.
    // When awaiting the userOp receipt, the client needs to route the request to
    // our impl. of `eth_getTransactionReceipt` for tx confirm and subsequent
    // state update within the client.
    transport: transportObserver(custom(happyProvider) as Transport<"custom", typeof happyProvider>),
    pollingInterval: 1000,
  };

  const publicClient = createPublicClient(clientOptions);

  const syncTables = setupSyncTables(world);
  const {
    tables,
    tableDefs,
    storageAdapter,
    triggerUpdateStream,
    latestBlock$,
    latestBlockNumber$,
    storedBlockLogs$,
    waitForTransaction,
  } = setupRecs({
    mudConfig,
    world,
    publicClient,
    address: config.worldAddress as Hex,
    otherTableDefs,
    syncTables,
  });

  const clock = createClock(world, latestBlock$, {
    period: 1100,
    initialTime: 0,
    syncInterval: 10000,
  });

  return {
    world,
    tables: { ...tables, ...syncTables },
    tableDefs,
    storageAdapter,
    triggerUpdateStream,
    publicClient,
    mudConfig,
    clock,
    latestBlock$,
    latestBlockNumber$,
    storedBlockLogs$,
    waitForTransaction,
  };
}
