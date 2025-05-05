import { createHappyChainWagmiConfig, happyChainSepolia } from "@happy.tech/core";
import { Config } from "wagmi";

// [HAPPY_PRIM] use custom config tailored to HappyChain
export const wagmiConfig: Config = createHappyChainWagmiConfig(happyChainSepolia);
