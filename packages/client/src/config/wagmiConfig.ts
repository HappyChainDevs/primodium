import { happyWagmiConnector } from "@happy.tech/core";
import { createClient } from "viem";
import { Config, createConfig, http } from "wagmi";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";

import { getCoreConfig } from "@/config/getCoreConfig";

const env = import.meta.env;
const projectId = env.PRI_WALLETCONNECT_PROJECT_ID;

const { chain } = getCoreConfig();

export const wagmiConfig: Config = createConfig({
  chains: [chain],

  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
  connectors: [
    walletConnect({ projectId }),
    coinbaseWallet({ appName: "wagmi" }),
    happyWagmiConnector(),
    // injected({target: 'Injected', shimDisconnect: true}),
  ],
});
