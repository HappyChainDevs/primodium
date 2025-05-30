import { ContractWrite } from "@latticexyz/common";
import type CallWithSignatureAbi from "@latticexyz/world-modules/out/Unstable_CallWithSignatureSystem.sol/Unstable_CallWithSignatureSystem.abi.json.d.ts";
import mudConfig from "contracts/mud.config";
import type IWorldAbi from "contracts/out/IWorld.sol/IWorld.abi.json.d.ts";
import { ReplaySubject, Subject } from "rxjs";
import {
  Account,
  Address,
  CustomTransport,
  FallbackTransport,
  GetContractReturnType,
  Hex,
  PublicClient,
  WalletClient,
} from "viem";

import { AllTableDefs, ContractTables, Entity, World, WrapperResult } from "@primodiumxyz/reactive-tables";
import { ChainConfig } from "@/network/config/chainConfigs";
import { otherTableDefs } from "@/network/otherTableDefs";
import { Recs } from "@/recs/setupRecs";
import { createSync } from "@/sync";
import setupCoreTables from "@/tables/coreTables";
import { SyncTables } from "@/tables/syncTables";
import { createUtils } from "@/utils";

/** Core configuration */
export type CoreConfig = {
  /** Chain configuration. Default configurations can be found in the {@link chainConfigs object chainConfigs} object */
  chain: ChainConfig;
  worldAddress: Address;
  initialBlockNumber?: bigint;

  /**
   * Used to automatically drip eth to accounts in dev mode.
   *
   * If using anvil, this value is 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   */
  devPrivateKey?: Hex;
  /** Used to fetch player ens names */
  accountLinkUrl?: string;

  /**
   * Run the default initial sync? (default: false)
   *
   * If using RPC, will hydrate full game state. If using indexer, default sync only fetches prototype data and player
   * data (if playerAddress is set)
   */
  runSync?: boolean;
  /**
   * Run the default initial systems? (default: false)
   *
   * Setups up systems to keep core tables and simplified tables in sync with contract tables
   */
  runSystems?: boolean;
};

type MudConfig = typeof mudConfig;

/**
 * @typedef {Object} CreateNetworkResult
 * @property {World} world - The world instance.
 * @property {MudConfig} mudConfig - Configuration for MUD.
 * @property {PublicClient<FallbackTransport, ChainConfig, undefined>} publicClient - The public client.
 * @property {Clock} clock - The clock instance.
 * @property {WrapperResult<MudConfig, typeof otherTableDefs>} - The wrapper result containing all tables and their
 *   definitions and the storage adapter.
 *
 *   Contains contract table metadata.
 *
 *   See [mud.config.ts](https://github.com/primodiumxyz/contracts/blob/main/mud.config.ts#L85-L97) for more details.
 */

export type CreateNetworkResult = Omit<Recs<MudConfig, typeof otherTableDefs>, "tables"> & {
  /** @property {World} world - The world instance. */
  world: World;
  mudConfig: MudConfig;
  // publicClient: PublicClient<FallbackTransport, ChainConfig, undefined>;
  // [HAPPY_PRIM] see note in core/src/createNetwork
  publicClient: PublicClient<CustomTransport, ChainConfig, undefined>;
  clock: Clock;
} & WrapperResult<MudConfig, typeof otherTableDefs> & {
    tables: ContractTables<AllTableDefs<MudConfig, typeof otherTableDefs>> & SyncTables;
  };

export type Tables = CreateNetworkResult["tables"] & ReturnType<typeof setupCoreTables>;
export type Utils = ReturnType<typeof createUtils>;
export type Sync = ReturnType<typeof createSync>;

/**
 * Core object
 *
 * @typedef {Object} Core
 * @property {CoreConfig} config - Chain configuration. Default configurations can be found in the
 *   {@link chainConfigs object chainConfigs} object
 * @property {CreateNetworkResult} network - Network configuration
 * @property {Tables} tables - Tables contain data and methods to interact with game state. See [reactive tables](
 * @property {Utils} utils - Utility functions
 * @property {Sync} sync - Sync functions
 */

export type Core = {
  /** Chain configuration. Default configurations can be found in the {@link chainConfigs object chainConfigs} object */
  config: CoreConfig;
  network: CreateNetworkResult;
  /**
   * Tables contain data and methods to interact with game state. See [reactive
   * tables](https://github.com/primodiumxyz/reactive-tables)
   */
  tables: Tables;
  utils: Utils;
  sync: Sync;
};

export type Clock = {
  currentTime: number;
  lastUpdateTime: number;
  time$: ReplaySubject<number>;
  dispose: () => void;
  update: (time: number) => void;
};

/** World Abi. Combination of IWorld abi and CallWithSignature abi. */

export type WorldAbiType = typeof IWorldAbi | typeof CallWithSignatureAbi;

type _Account<
  IsLocalAccount extends boolean = false,
  TPublicClient extends PublicClient = PublicClient<FallbackTransport, ChainConfig>,
  TWalletClient extends WalletClient = IsLocalAccount extends true
    ? WalletClient<FallbackTransport, ChainConfig, Account>
    : WalletClient<CustomTransport, ChainConfig, Account>,
> = {
  worldContract: GetContractReturnType<
    WorldAbiType,
    {
      public: TPublicClient;
      wallet: TWalletClient;
    },
    Address
  >;
  account: Account;
  address: Address;
  publicClient: TPublicClient;
  walletClient: TWalletClient;
  entity: Entity;
  write$: Subject<ContractWrite>;
  privateKey: IsLocalAccount extends true ? Hex : null;
};

export type ExternalAccount = _Account<false>;
export type LocalAccount = _Account<true>;

export interface AccountClient {
  sessionAccount: LocalAccount | null;
  playerAccount: ExternalAccount | LocalAccount;
  setPlayerAccount: (options: { playerAddress?: Address; playerPrivateKey?: Hex }) => void;
  setSessionAccount: (privateKey: Hex) => void;
  removeSessionAccount: () => void;
  requestDrip: (address: Address) => void;
}

export type Dimensions = { width: number; height: number };

export type Coord = {
  x: number;
  y: number;
};

export enum SyncSourceType {
  Indexer,
  RPC,
}

export enum SyncStep {
  Syncing,
  Error,
  Complete,
  Live,
}

export enum Action {
  DemolishBuilding,
  SelectBuilding,
  PlaceBuilding,
  MoveBuilding,
}

export enum ResourceType {
  Resource,
  ResourceRate,
  Utility,
  Multiplier,
}

export enum RewardType {
  Resource,
  Unit,
}
