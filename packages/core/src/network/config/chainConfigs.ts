import { garnet, MUDChain, mudFoundry, redstone } from "@latticexyz/common/chains";

const dev: ChainConfig = {
  ...mudFoundry,
  //COMMENT OUT INDEXER URL TO USE ONLY RPC
  indexerUrl: "http://localhost:3001",
};

const caldera: ChainConfig = {
  name: "Caldera",
  id: 12523,
  nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
  rpcUrls: {
    default: {
      http: ["https://primodium-bedrock.calderachain.xyz/replica-http"],
      // webSocket: ["wss://primodium-bedrock.calderachain.xyz/replica-ws"],
    },
    public: {
      http: ["https://primodium-bedrock.calderachain.xyz/replica-http"],
      // webSocket: ["wss://primodium-bedrock.calderachain.xyz/replica-ws"],
    },
  },
  faucetUrl: "https://caldera-faucet.primodium.ai/trpc",
  indexerUrl: "https://caldera-mud2-indexer.primodium.ai/trpc",
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://primodium-bedrock.calderaexplorer.xyz/",
    },
  },
};

const calderaSepolia: ChainConfig = {
  name: "Caldera Sepolia",
  id: 10017,
  nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
  rpcUrls: {
    default: {
      http: ["https://primodium-sepolia.rpc.caldera.xyz/http"],
    },
    public: {
      http: ["https://primodium-sepolia.rpc.caldera.xyz/http"],
    },
  },
  faucetUrl: "https://caldera-sepolia-faucet.primodium.ai/trpc",
  indexerUrl: "https://indexer-v0-11-1.primodium.ai",
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://primodium-sepolia.explorer.caldera.xyz/",
    },
  },
};

const baseSepolia: ChainConfig = {
  name: "Base Sepolia",
  id: 84532,
  nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
  rpcUrls: {
    default: {
      http: ["https://sepolia.base.org"],
    },
    public: {
      http: ["https://sepolia.base.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "BaseScan",
      url: "https://sepolia.basescan.org",
    },
  },
};

export const happyChainSepolia: ChainConfig = {
  name: "HappyChain Sepolia",
  id: 216,
  nativeCurrency: { decimals: 18, symbol: "HAPPY", name: "HappyChain" },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.happy.tech/http"],
    },
  },
  blockExplorers: {
    default: {
      name: "HappyChain Sepolia Explorer",
      url: "https://explorer.testnet.happy.tech",
    },
  },
  // indexerUrl: "http://localhost:3001", // ## [happyTODO :: deploy indexer and then add the URL here] ##
};

export type ChainConfig = MUDChain & { indexerUrl?: string };

export const chainConfigs = {
  baseSepolia,
  caldera,
  calderaSepolia,
  happyChainSepolia,
  dev,
  garnet: garnet as ChainConfig,
  redstone: redstone as ChainConfig,
} as const;
