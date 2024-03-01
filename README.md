# Primodium v0.10.0

## Installation

Clone this repository:

```
git clone https://github.com/primodiumxyz/primodium.git
```

Initialize with `pnpm i`.

## Quickstart

Run the following command in your terminal:

```bash
echo "PRI_CHAIN_ID=\"dev\"" >> ./.env && echo "PRI_DEV=\"true\"" >> ./.env
```

This adds a `.env` file to the top level with the following values:

```
PRI_CHAIN_ID="dev"
PRI_DEV="true"
```

To start a development server at `localhost:3000` run:

```bash
pnpm dev
```

_Recommended:_ To run development processes with run-pty, run `pnpm dev:pty`.

Or you can run each process individually:

```
pnpm dev:node
pnpm dev:contracts
pnpm dev:client
pnpm dev:indexer
```

> NOTE: If you are running the indexer locally, docker network and volumes properly clear only on rerun of `pnpm dev:indexer`. If you would like to manually free these resources run `pnpm clean:indexer`.

# Testing and Deployment

To run in dev mode, set `PRI_DEV` to true. This will grant access to the Game Tools browser (for the editor and cheatcodes) and Mud Dev Tools (for chain and transaction information).
To build packages, run `pnpm build`

For production deployment on Caldera testnet:

1. In `<top-level>/.env`:
   - Set `PRI_DEV="false"`.
   - Set `PRI_CHAIN_ID="caldera"`
2. Add your private key to the `.env` file in `packages/contracts`:
   ```bash
   echo "PRIVATEKEY=<your-private-key>" >> ./packages/contracts/.env
   ```
3. Comment out the content of the `packages/contracts/src/systems/DevSystem.sol` contract. **TODO:** fix `mud.config.ts` for `DevSystem` to automatically be excluded from production with `PRI_DEV="false"`.
4. Deploy your contracts:
   `pnpm deploy:caldera`
   **Note:** to update deployment information, modify the `[profile.caldera]` field in `packages/contracts/foundry.toml`.

The client is automatically deployed on Vercel from the main branch. The live instance is located at `testnet2.primodium.com/?worldAddress=<world_address>?chainid=caldera` with the rpc settings to the Caldera testnet.

To clean types/ and abis/ in the git diff, run `pnpm clean` in the top level directory.

## Vercel Environment Variables

The chat functionality in the client is built on [Vercel Serverless functions](https://vercel.com/docs/functions/serverless-functions) and therefore requires Vercel environment variables to test. If you encounter any errors with the above steps while running the client, you may use the Vercel CLI to run the clien instead as follows:

1. In the top level directory, run `vercel pull` and setup the Vercel project with the following settings. Ask Emerson if you don't have access to Vercel.
   - Org: `primodium`
   - Project: `primodium-testnet2`
2. Check that the `.vercel` exists in the top level directory.
3. Run `pnpm dev:vercel` to start the client.

## Account Authorization

Authorizing an account to act on behalf of another account requires ETH in the player's main account. To test this feature locally with the Anvil development chain, do the following:

1. Transfer ~0.1 ETH to the authorized account from the development chain faucet.
   - For simplicity, you can add the Anvil private key to your Metamask wallet and transfer the wallet balance there on the local RPC network. See the Metamask docs for more information.
2. Add the Anvil private key to the `PRI_DEV_PKEY` environment variable in the root directory.
   - Note that this is necessary for testing faucet drip for the external wallet in development because there is no faucet deployed locally for the local anvil chain.
3. Set `noExternalWallet` to false in `client/src/network/config/getNetworkConfig.ts`

See [here](https://github.com/primodiumxyz/primodium/pull/873) for more information on account authorization.

# Config

## There are four sources of configuration for the game:

1. `mud.config.ts`: Houses tables. To create/modify a table, [read here.](https://mud.dev/world/config)
2. `enums.ts`: Houses enums.
3. `terrain.csv`: Houses the terrain of the main map. Numbers correspond to terrain as follows:

```
  60: "Iron"
  62: "Lithium"
  64: "Water"
  58: "Copper"
```

4. `prototypesConfig.ts`: Houses preset entity configurations. A prototype object has the following fields:
   a. keys?: the keys of the prototype. If not set, the key will be a bytes32 encoding of the name of the prototype.
   b. tables?: the values of the tables on the prototype's key(s)
   c. levels?: the values of the levels of the prototype, indexed by `[...keys, level: "uint256"]`. The key of each level should be the number of the level in question.

To regenerate solidity based on updated typescript source, run `pnpm build`.

# Dev Systems

- Functions in `DevSystem` expose direct table access. We can add abstractions as necessary.

### Contracts

- To set field data of a table:
  `DevSystem.devSetRecord(tableId, key, data, valueSchema)`
- To remove a record:
  `devDeleteRecord(tableId, key, valueSchema)`

### Client

- To set field data of a recs contract component:
  `mud.contractCalls.setComponentValue(<component>, <entity>, <fields>)`
- To remove a recs contract component:
  `mud.contractCalls.removeComponent(<component>, <entity>)`
