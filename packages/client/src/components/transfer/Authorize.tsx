import { requestSessionKey } from "@happy.tech/core";
import { useEffect, useState } from "react";
import { FaClipboard, FaExclamationCircle, FaEye, FaEyeSlash, FaInfoCircle, FaTimes, FaUnlink } from "react-icons/fa";
import { Address } from "viem";

import { STORAGE_PREFIX } from "@primodiumxyz/core";
import { useAccountClient } from "@primodiumxyz/core/react";
import { defaultEntity } from "@primodiumxyz/reactive-tables";
import { Button } from "@/components/core/Button";
import { SecondaryCard } from "@/components/core/Card";
import { TransactionQueueMask } from "@/components/shared/TransactionQueueMask";
import { useContractCalls } from "@/hooks/useContractCalls";
import { copyToClipboard } from "@/util/clipboard";

const sessionWalletTooltip = (
  <>
    Bypass confirmation popups by authorizing a session key. Powered by{" "}
    <span className="text-yellow-400">Happy Wallet</span>, this lets you securely perform actions without repeated
    approvals.
  </>
);

export function Authorize() {
  const {
    playerAccount: { worldContract },
    sessionAccount,
  } = useAccountClient();
  const { revokeAccess } = useContractCalls();
  const [showDetails, setShowDetails] = useState(false);
  const [showHelp, setShowHelp] = useState(!localStorage.getItem("hideHelp"));

  useEffect(() => {
    setShowDetails(false);
  }, [sessionAccount]);

  // Function to handle private key validation and connection
  const sessionAddress = sessionAccount?.address;

  // const _submitPrivateKey = async (privateKey: Hex) => {
  //   // Validate the private key format here
  //   // This is a basic example, adjust the validation according to your requirements
  //   const isValid = /^0x[a-fA-F0-9]{64}$/.test(privateKey);
  //   if (!isValid) return;
  //   const account = privateKeyToAccount(privateKey as Hex);

  //   if (sessionAddress && sessionAddress === account.address) return;
  //   else await grantAccessWithSignature(privateKey, { id: defaultEntity });
  // };

  // const _handleRandomPress = () => {
  //   const storedKeys = findEntriesWithPrefix();
  //   const privateKey = storedKeys.length > 0 ? storedKeys[0].privateKey : generatePrivateKey();

  //   const account = privateKeyToAccount(privateKey as Hex);
  //   localStorage.setItem(STORAGE_PREFIX + account.address, privateKey);

  //   return privateKey;
  // };

  const removeSessionKey = async (publicKey: Address) => {
    await revokeAccess(publicKey);
    localStorage.removeItem(STORAGE_PREFIX + publicKey);
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
        {sessionAddress ? (
          <div className="w-full flex flex-col">
            <div className="w-full flex items-center justify-center p-4">
              <p className="uppercase font-bold text-success w-full flex justify-center text-sm">AUTHORIZING</p>
              <div className="absolute right-2 flex gap-1">
                <Button
                  onClick={async () => {
                    setShowDetails(false);
                    revokeAccess(sessionAddress);
                    removeSessionKey(sessionAddress);
                  }}
                  tooltip="stop authorizing"
                  tooltipDirection="top"
                  className="btn-sm btn-primary"
                >
                  <FaUnlink />
                </Button>
                <Button
                  tooltip={`${showDetails ? "Hide" : "See"} details`}
                  onClick={() => setShowDetails((prev) => !prev)}
                  tooltipDirection="top"
                  className="btn-sm btn-primary"
                >
                  {showDetails ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
            </div>
            {showDetails && (
              <SecondaryCard className="flex flex-col gap-2 p-3 w-full animate-slide-down bg-base-800">
                <div className="text-sm flex justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1 items-center">
                      <span className="font-bold">Session Address: </span>
                      <Button
                        size="xs"
                        variant="primary"
                        tooltip="Copy address"
                        onClick={() => copyToClipboard(sessionAddress, "address")}
                        tooltipDirection="top"
                      >
                        <FaClipboard />
                      </Button>
                      <Button
                        size="xs"
                        variant="error"
                        tooltip={`Copy private key`}
                        onClick={() => copyToClipboard(sessionAccount?.privateKey, "private key")}
                        tooltipDirection="top"
                      >
                        <FaExclamationCircle />
                      </Button>
                    </div>
                    <p className="text-xs">{sessionAddress}</p>
                  </div>
                </div>
              </SecondaryCard>
            )}
          </div>
        ) : (
          <Button
            variant="primary"
            size="md"
            className="w-full"
            onClick={async () => {
              // const key = handleRandomPress();
              // submitPrivateKey(key);
              await requestSessionKey(worldContract.address);
            }}
          >
            CLICK TO AUTHORIZE SESSION KEY
          </Button>
        )}
      </TransactionQueueMask>
    </SecondaryCard>
  );
}
