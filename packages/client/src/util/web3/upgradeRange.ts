import { BigNumber } from "ethers";
import { ampli } from "src/ampli";
import { execute } from "src/network/actions";
import { Network } from "src/network/layer";
import { useGameStore } from "src/store/GameStore";
import { useNotificationStore } from "src/store/NotificationStore";
import { parseReceipt } from "../analytics/parseReceipt";
import {
  Account,
  ActiveAsteroid,
} from "src/network/components/clientComponents";
import { Level } from "src/network/components/chainComponents";
import { getPlayerBounds } from "../outOfBounds";
import { updateSpaceRock } from "./updateSpaceRock";

export const upgradeRange = async (network: Network) => {
  const { providers, systems } = network;
  const setTransactionLoading = useGameStore.getState().setTransactionLoading;
  const setNotification = useNotificationStore.getState().setNotification;
  setTransactionLoading(true);

  const activeAsteroid = ActiveAsteroid.get()?.value;

  const player = Account.get()?.value;
  const level = Level.get(player, { value: 1 }).value;
  const bounds = getPlayerBounds(player!);

  if (!activeAsteroid) return;

  await updateSpaceRock(network);

  const receipt = await execute(
    systems["system.UpgradeRange"].executeTyped({
      gasLimit: 5_000_000,
    }),
    providers,
    setNotification
  );

  ampli.systemUpgradeRange({
    asteroidCoord: BigNumber.from(activeAsteroid).toString(),
    currLevel: level,
    currBounds: [bounds.minX, bounds.minY, bounds.maxX, bounds.maxY],
    ...parseReceipt(receipt),
  });

  setTransactionLoading(false);
};
