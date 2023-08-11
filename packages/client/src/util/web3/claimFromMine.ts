import { Coord } from "@latticexyz/utils";
import { ampli } from "src/ampli";
import { execute } from "src/network/actions";
import { Network } from "src/network/layer";
import { useGameStore } from "src/store/GameStore";
import { useNotificationStore } from "src/store/NotificationStore";
import { parseReceipt } from "../analytics/parseReceipt";

export const claimFromMine = async (coord: Coord, network: Network) => {
  const { providers, systems } = network;
  const setTransactionLoading = useGameStore.getState().setTransactionLoading;
  const setNotification = useNotificationStore.getState().setNotification;
  setTransactionLoading(true);

  const receipt = await execute(
    systems["system.ClaimFromMine"].executeTyped(coord, {
      gasLimit: 5_000_000,
    }),
    providers,
    setNotification
  );

  ampli.systemClaimFromMine({
    coord: [coord.x, coord.y, 0],
    ...parseReceipt(receipt),
  });

  setTransactionLoading(false);
};
