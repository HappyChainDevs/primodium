import { Sync } from "@primodiumxyz/sync-stack";
import { SetupResult } from "../types";
import { getNetworkConfig } from "../config/getNetworkConfig";
import { Hex } from "viem";
import { SyncStep } from "src/util/constants";

export const subToRPC = (setupResult: SetupResult) => {
  const { network } = setupResult;
  const { tables, publicClient, world } = network;
  const networkConfig = getNetworkConfig();

  const sync = Sync.withLiveRPCRecsSync({
    world,
    tables,
    address: networkConfig.worldAddress as Hex,
    publicClient,
  });

  sync.start((_, blockNumber) => {
    console.log("syncing updates on block:", blockNumber);
  });

  world.registerDisposer(sync.unsubscribe);
};

export const hydrateFromRPC = (
  setupResult: SetupResult,
  fromBlock: bigint,
  toBlock: bigint,
  onComplete?: () => void,
  onError?: (err: unknown) => void
) => {
  const { network, components } = setupResult;
  const { tables, publicClient, world } = network;
  const networkConfig = getNetworkConfig();

  const sync = Sync.withRPCRecsSync({
    world,
    tables,
    address: networkConfig.worldAddress as Hex,
    fromBlock,
    publicClient,
    toBlock,
  });

  sync.start((_, __, progress) => {
    components.SyncStatus.set({
      step: SyncStep.Syncing,
      progress,
      message: `Hydrating from RPC`,
    });

    if (progress === 1) {
      components.SyncStatus.set({
        step: SyncStep.Complete,
        progress: 1,
        message: `DONE`,
      });

      onComplete?.();
    }
  }, onError);

  world.registerDisposer(sync.unsubscribe);
};
