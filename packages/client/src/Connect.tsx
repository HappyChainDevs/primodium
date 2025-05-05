import { chunk } from "lodash";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useAccount, useConnect } from "wagmi";

import { usePersistentStore } from "@primodiumxyz/game/src/stores/PersistentStore";
import { Landing } from "@/screens/Landing";

const connectorIcons: Record<string, string> = {
  ["HappyChain Wagmi Provider"]: "/img/icons/web3/happychain.png", // [HAPPY_PRIM] new icon, provided name is configured within the package
};

/** [HAPPY_PRIM] We only show the happychain connector here since we want them to play using the HappyWallet! */
export const Connect: React.FC = React.memo(() => {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, isPending } = useConnect();
  const { noExternalAccount } = usePersistentStore();

  useEffect(() => {
    if (error) toast.warn(error.message);
  }, [error]);

  if (isConnected || noExternalAccount) return null;

  return (
    <Landing>
      <div className="flex flex-col gap-2 w-full">
        {chunk(
          connectors.filter((x) => x.id !== connector?.id),
          2,
        ).map((chunk, i) => (
          <div key={`chunk-${i}`} className="flex flex-row gap-2">
            {chunk.map((x) => (
              <button
                className="flex-1 items-center justify-center btn btn-secondary star-background join-item inline pointer-events-auto font-bold outline-none h-fit z-10"
                key={`${x.id}-${x.name}`}
                onClick={() => !isPending && connect({ connector: x })}
                disabled={isPending}
              >
                <div className="flex w-full items-center justify-center gap-2">
                  {connectorIcons[x.name] && <img src={connectorIcons[x.name]} className="w-6 h-6" />}
                  {x.name}
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </Landing>
  );
});
