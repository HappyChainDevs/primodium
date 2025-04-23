import { createHappyChainWagmiConfig, happyChainSepolia } from "@happy.tech/core";
import { Config } from "wagmi";

export const wagmiConfig: Config = createHappyChainWagmiConfig(happyChainSepolia);
