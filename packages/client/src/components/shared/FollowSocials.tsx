import { Button } from "@/components/core/Button";
import { useMud } from "@/hooks";
import { components } from "@/network/components";
import { ObjectiveEntityLookup } from "@/util/constants";
import { makeObjectiveClaimable } from "@/util/objectives/makeObjectiveClaimable";
import { EObjectives } from "contracts/config/enums";
import { FaDiscord, FaXTwitter } from "react-icons/fa6";
import { Hex } from "viem";

export const FollowSocials = () => {
  const playerEntity = useMud().playerAccount.entity;
  const twitterFollowed = !!components.CompletedObjective.useWithKeys({
    entity: playerEntity as Hex,
    objective: ObjectiveEntityLookup[EObjectives.FollowTwitter] as Hex,
  })?.value;
  const discordFollowed = !!components.CompletedObjective.useWithKeys({
    entity: playerEntity as Hex,
    objective: ObjectiveEntityLookup[EObjectives.JoinDiscord] as Hex,
  })?.value;

  const handleTwitterClick = () => {
    window.open("https://twitter.com/intent/follow?screen_name=primodiumgame", "_blank");
    makeObjectiveClaimable(playerEntity, EObjectives.FollowTwitter);
  };

  const handleDiscordClick = () => {
    window.open("https://discord.gg/primodium", "_blank");
    makeObjectiveClaimable(playerEntity, EObjectives.JoinDiscord);
  };

  if (twitterFollowed && discordFollowed) return null;
  return (
    <div className="flex flex-row gap-2 ml-2 z-10 pointer-events-auto">
      {!twitterFollowed && (
        <Button
          tooltip="Follow&nbsp;our&nbsp;Twitter"
          variant="ghost"
          size="sm"
          className="h-12 w-12 hover:scale-105 rounded-tl-xl rounded-tr-xl"
          motion="disabled"
          onClick={handleTwitterClick}
        >
          <FaXTwitter className="w-6 h-6" />
        </Button>
      )}
      {!discordFollowed && (
        <Button
          variant="ghost"
          size="sm"
          tooltip="Join&nbsp;our&nbsp;Discord"
          className="h-12 w-12 hover:scale-105 rounded-tl-xl rounded-tr-xl"
          motion="disabled"
          onClick={handleDiscordClick}
        >
          <FaDiscord className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
};
