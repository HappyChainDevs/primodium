import { requestSessionKey } from "@happy.tech/core";
import { useEffect, useState } from "react";
import { FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAccountClient, useCore } from "@primodiumxyz/core/react";
import { defaultEntity } from "@primodiumxyz/reactive-tables";
import { Tooltip } from "@/components/core/Tooltip";
import { TransactionQueueMask } from "@/components/shared/TransactionQueueMask";
import { useContractCalls } from "@/hooks/useContractCalls";
import { HAPPY_STORAGE_PREFIX, isHappySessionKeyRegistered } from "@/util/localStorage";

import { Landing } from "./Landing";

export const Enter: React.FC = () => {
  const { tables } = useCore();
  const {
    playerAccount: { address: playerAddress, worldContract, entity: playerEntity },
    sessionAccount,
  } = useAccountClient();

  const { spawn } = useContractCalls();
  const navigate = useNavigate();
  const location = useLocation();
  const [showingToast, setShowingToast] = useState(false);

  const [state, setState] = useState<"loading" | "delegate" | "play">("loading");

  const confirmSkip = async () => {
    toast.dismiss();
    if (showingToast) await new Promise((resolve) => setTimeout(resolve, 500));
    setShowingToast(true);
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col text-center justify-center items-center gap-2 w-full">
            <FaExclamationTriangle size={24} className="text-warning" />
            Are you sure you want to skip? You will need to confirm every action with your external wallet.
            <br />
            <br />
            You can still enable a session key within the game settings.
          </div>

          <div className="flex justify-center w-full gap-2">
            <button
              className="btn btn-secondary btn-xs"
              onClick={() => {
                setState("play");
                closeToast && closeToast();
              }}
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setShowingToast(false);
                closeToast && closeToast();
              }}
              className="btn btn-primary btn-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        // className: "border-error",
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        hideProgressBar: true,
      },
    );
  };

  useEffect(() => {
    if (!isHappySessionKeyRegistered(playerAddress)) {
      setState("delegate");
    } else {
      setState("play");
    }
  }, [sessionAccount]);

  useEffect(() => {
    if (!sessionAccount) return;
    toast.success(`Session account detected! (${sessionAccount.address.slice(0, 7)})`);
  }, [sessionAccount]);

  const handlePlay = async () => {
    const hasSpawned = !!tables.Home.get(playerEntity)?.value;
    if (!hasSpawned) {
      await spawn();
    }
    navigate("/game" + location.search);
  };

  const handleHappySessionKeyRegister = async () => {
    if (!isHappySessionKeyRegistered(playerAddress)) {
      // once this resolves, write a status into local storage that this has been done
      await requestSessionKey(worldContract.address);

      localStorage.setItem(HAPPY_STORAGE_PREFIX + playerAddress, "true");
      setState("play");
    } else return;
  };

  return (
    <Landing>
      <TransactionQueueMask queueItemId={defaultEntity} className="w-4/5 z-20 space-y-2">
        {state === "delegate" && (
          <div className="grid grid-cols-7 gap-2 items-center pointer-events-auto">
            <button
              onClick={handleHappySessionKeyRegister}
              className="relative btn col-span-6 font-bold outline-none h-fit btn-secondary w-full star-background hover:scale-105"
            >
              <Tooltip
                className="w-56 text-left h-fit text-wrap"
                tooltipContent="Bypass annoying confirmation popups by authorizing a session account. This allows you to securely perform certain actions without external confirmation."
                direction="bottom"
              >
                <div className="flex items-center justify-center">
                  <FaInfoCircle className="w-6 text-info" />
                </div>
              </Tooltip>
              Authorize Delegate
            </button>
            <button onClick={confirmSkip} className="btn btn-neutral opacity-80 hover:scale-110">
              Skip
            </button>
          </div>
        )}
        {state === "play" && (
          <button
            onClick={handlePlay}
            className="btn join=item inline pointer-events-auto font-bold outline-none h-fit btn-secondary w-full star-background hover:scale-125 relative"
          >
            Play
          </button>
        )}
      </TransactionQueueMask>
    </Landing>
  );
};
