import { ContractWrite, transportObserver } from "@latticexyz/common";
import { transactionQueue, writeObserver } from "@latticexyz/common/actions";
import { Subject } from "rxjs";
import {
  Account,
  Address,
  createPublicClient,
  createWalletClient,
  custom,
  fallback,
  getContract,
  Hex,
  http,
  Transport,
} from "viem";
import { toAccount } from "viem/accounts";

import { CoreConfig, ExternalAccount } from "@/lib/types";
import { WorldAbi } from "@/lib/WorldAbi";
import { normalizeAddress } from "@/utils/global/common";
import { addressToEntity } from "@/utils/global/encode";

/**
 * @param coreConfig Configuration of core object
 * @param address Address of the account
 * @returns: {@link ExternalAccount}
 */
export function createExternalAccount(
  coreConfig: CoreConfig,
  address: Address,
  customTransport?: Transport,
): ExternalAccount {
  if (typeof window === "undefined") {
    throw new Error("createExternalAccount must be called in a browser environment");
  }

  const clientOptions = {
    chain: coreConfig.chain,
    pollingInterval: 1000,
    account: toAccount(address) as Account,
  };

  const publicClient = createPublicClient({
    ...clientOptions,
    transport: transportObserver(fallback([http()])),
  });
  const walletClient = createWalletClient({
    ...clientOptions,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transport:
      customTransport ?? (custom((window as unknown as { ethereum: any }).ethereum) as Transport<"custom", any>), // this should probably be created based on chain ID?
  });

  const write$ = new Subject<ContractWrite>();
  walletClient.extend(transactionQueue()).extend(writeObserver({ onWrite: (write) => write$.next(write) }));

  const worldContract = getContract({
    address: coreConfig.worldAddress as Hex,
    abi: WorldAbi,
    client: {
      public: publicClient,
      wallet: walletClient,
    },
  });

  return {
    worldContract,
    account: walletClient.account,
    address: normalizeAddress(walletClient.account.address),
    publicClient,
    walletClient,
    entity: addressToEntity(walletClient.account.address),
    write$,
    privateKey: null,
  };
}
