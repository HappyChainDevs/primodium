import { Button } from "@/components/core/Button";
import { Navigator } from "@/components/core/Navigator";
import { RadioGroup } from "@/components/core/Radio";
import { TextInput } from "@/components/core/TextInput";
import { TransactionQueueMask } from "@/components/shared/TransactionQueueMask";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
// import { TextArea } from "@/components/core/TextArea";
import { SecondaryCard } from "@/components/core/Card";
import { useMud } from "@/hooks";
import { createAlliance } from "@/network/setup/contractCalls/alliance";
import { TransactionQueueType } from "@/util/constants";
import { hashEntities } from "@/util/encode";
import { isProfane } from "@/util/profanity";

export const ALLIANCE_TAG_SIZE = 6;

// This screen is only accessible to players who are not in an alliance
export const CreateScreen = () => {
  const mud = useMud();
  const [inviteOnly, setInviteOnly] = useState(true);
  const [allianceTag, setAllianceTag] = useState("");

  // TODO: implement description when implemented in backend
  return (
    <Navigator.Screen title="create" className="flex flex-col w-full text-sm pointer-events-auto h-full p-4 gap-4">
      <p className="self-center text-base">CREATE ALLIANCE</p>
      <SecondaryCard className="grid grid-cols-[min-content_1fr] items-center py-4 px-24 gap-4 whitespace-nowrap">
        <div>NAME</div>
        <TextInput
          placeholder=""
          maxLength={ALLIANCE_TAG_SIZE}
          onChange={(e) => setAllianceTag(e.target.value)}
          className="w-48 uppercase h-8 text-sm"
        />
        {/* <div className="mt-1">DESCRIPTION</div>
        <TextArea placeholder="" className="min-h-20 text-sm" /> */}
        <div>ACCESS</div>
        <RadioGroup
          name="create-alliance-restriction"
          value={inviteOnly ? "closed" : "open"}
          options={[
            { id: "open", label: "OPEN" },
            { id: "closed", label: "INVITE ONLY" },
          ]}
          onChange={(value) => setInviteOnly(value === "closed")}
        />
      </SecondaryCard>

      <div className="flex mt-auto self-center gap-8">
        <Navigator.BackButton />
        <TransactionQueueMask queueItemId={hashEntities(TransactionQueueType.CreateAlliance, mud.playerAccount.entity)}>
          <Button
            disabled={!allianceTag || isProfane(allianceTag)}
            onClick={() => createAlliance(mud, allianceTag, inviteOnly)}
            variant="primary"
            className="btn-sm border-2 border-secondary flex gap-2"
          >
            <FaPlus />
            CREATE
          </Button>
        </TransactionQueueMask>
      </div>
    </Navigator.Screen>
  );
};
