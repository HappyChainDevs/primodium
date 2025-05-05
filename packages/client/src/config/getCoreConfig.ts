import worldsJson from "contracts/worlds.json";
import { Address, Hex } from "viem";

import { ChainConfig, chainConfigs, CoreConfig } from "@primodiumxyz/core";

const worlds = worldsJson as Partial<Record<string, { address: string; blockNumber?: number }>>;

const findChainById = (id: number | string): ChainConfig => {
  const chain = Object.values(chainConfigs).find((chain) => chain.id === Number(id));
  if (!chain) {
    throw new Error(`No chain found with ID ${id}`);
  }
  return chain;
};

export const getCoreConfig = (): CoreConfig => {
  // Ignore deployment URL params on production subdomains (primodium.com)
  const params = window.location.hostname.endsWith("primodium.com")
    ? new URLSearchParams()
    : new URLSearchParams(window.location.search);

  const chainId = params.get("chainid") || import.meta.env.PRI_CHAIN_ID || "dev";
  const chain = findChainById(chainId);

  console.log(chain);

  const world = worlds[chain.id];
  const worldAddress = (params.get("worldAddress") || world?.address) as Address;
  if (!worldAddress) {
    throw new Error(`No world address found for chain ${chainId}. `);
  }
  const initialBlockNumber = params.has("initialBlockNumber")
    ? Number(params.get("initialBlockNumber"))
    : (world?.blockNumber ?? 0);

  const config: CoreConfig = {
    chain,
    worldAddress,
    initialBlockNumber: BigInt(initialBlockNumber),
    runSync: true,
    runSystems: true,
    devPrivateKey: import.meta.env.PRI_DEV_PKEY as Hex,
    accountLinkUrl: import.meta.env.PRI_ACCOUNT_LINK_VERCEL_URL as string,
  };
  return config;
};
