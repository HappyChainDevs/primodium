import { requestSessionKey } from "@happy.tech/core";
import { useState } from "react";
import { FaInfoCircle, FaTimes } from "react-icons/fa";

import { useAccountClient } from "@primodiumxyz/core/react";
import { defaultEntity } from "@primodiumxyz/reactive-tables";
import { Button } from "@/components/core/Button";
import { SecondaryCard } from "@/components/core/Card";
import { TransactionQueueMask } from "@/components/shared/TransactionQueueMask";
import { HAPPY_STORAGE_PREFIX, isHappySessionKeyRegistered } from "@/util/localStorage";

const sessionWalletTooltip = (
  <>
    Bypass confirmation popups by authorizing a session key. Powered by{" "}
    <span className="text-yellow-400">Happy Wallet</span>, this lets you securely perform actions without repeated
    approvals.
  </>
);

export function Authorize() {
  const {
    playerAccount: { address: playerAddress, worldContract },
  } = useAccountClient();
  const [showHelp, setShowHelp] = useState(!localStorage.getItem("hideHelp"));

  const weAreHappySponsored = isHappySessionKeyRegistered(playerAddress);

  const handleHappySessionKeyRegister = async () => {
    if (!isHappySessionKeyRegistered(playerAddress)) {
      await requestSessionKey(worldContract.address);

      localStorage.setItem(HAPPY_STORAGE_PREFIX + playerAddress, "true");
    } else return;
  };

  const hideHelp = () => {
    setShowHelp(false);
    localStorage.setItem("hideHelp", "true");
  };

  return (
    <SecondaryCard className="gap-1">
      {showHelp && (
        <SecondaryCard className="flex flex-row gap-1 relative p-4 bg-info/50">
          <FaInfoCircle className="w-6" />
          <div className="text-xs opacity-75 space-y-2 normal-case">{sessionWalletTooltip}</div>
          <Button className="btn-ghost btn-xs absolute top-0 right-0" onClick={hideHelp}>
            <FaTimes />
          </Button>
        </SecondaryCard>
      )}

      <TransactionQueueMask queueItemId={defaultEntity}>
        {weAreHappySponsored ? (
          <div className="w-full flex flex-col">
            <div className="w-full flex items-center justify-center p-4">
              <p className="uppercase font-bold text-success w-full flex justify-center text-sm">
                🤠 SESSION KEY REGISTERED 🤠
              </p>
            </div>
          </div>
        ) : (
          <Button variant="primary" size="md" className="w-full" onClick={handleHappySessionKeyRegister}>
            CLICK TO AUTHORIZE SESSION KEY
          </Button>
        )}
      </TransactionQueueMask>
    </SecondaryCard>
  );
}
