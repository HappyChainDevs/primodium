import { FaCheck, FaCopy, FaTimes } from "react-icons/fa";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";

import { entityToAddress } from "@primodiumxyz/core";
import { useAccountClient, useCore } from "@primodiumxyz/core/react";
import { Entity } from "@primodiumxyz/reactive-tables";
import { Button } from "@/components/core/Button";
import { SecondaryCard } from "@/components/core/Card";
import { Navigator } from "@/components/core/Navigator";
import { Tooltip } from "@/components/core/Tooltip";
import { TransactionQueueMask } from "@/components/shared/TransactionQueueMask";
import { useContractCalls } from "@/hooks/useContractCalls";
import { copyToClipboard } from "@/util/clipboard";

// This screen is only accessible to players who are not in an alliance
export const InvitesScreen: React.FC = () => {
  const { tables } = useCore();
  const playerEntity = useAccountClient().playerAccount.entity;
  const invites = tables.PlayerInvite.useAllWith({ target: playerEntity }) ?? [];
  const maxAllianceMembers = tables.P_AllianceConfig.get()?.maxAllianceMembers ?? 1n;

  return (
    <Navigator.Screen
      title="invites"
      className="grid grid-rows-[min-content_1fr_min-content] gap-4 w-full text-xs pointer-events-auto h-full overflow-hidden p-4"
    >
      <div className="justify-self-center text-base">INVITES</div>
      {invites.length > 0 ? (
        <SecondaryCard className="flex flex-col gap-4 p-4">
          <AutoSizer>
            {({ height, width }: { height: number; width: number }) => (
              <List height={height} width={width} itemCount={invites.length} itemSize={35} className="scrollbar">
                {({ index, style }) => (
                  <div style={style} className="grid grid-cols-[40px_1fr_min-content_min-content] gap-4 pr-4">
                    <InviteItem key={index} index={index} entity={invites[index]} max={maxAllianceMembers} />
                  </div>
                )}
              </List>
            )}
          </AutoSizer>
        </SecondaryCard>
      ) : (
        <SecondaryCard className="flex justify-center items-center h-full">
          <p className="opacity-50">NO INVITES</p>
        </SecondaryCard>
      )}
      <div className="flex justify-between">
        <Navigator.BackButton />
        <div className="flex justify-center items-center gap-4">
          <p className="opacity-80">FRIEND CODE</p>
          <Tooltip tooltipContent="Click to copy" direction="top">
            <Button
              variant="ghost"
              size="xs"
              className="flex gap-2"
              onClick={() => copyToClipboard(entityToAddress(playerEntity))}
            >
              <span className="text-accent">{entityToAddress(playerEntity, true)}</span>
              <FaCopy className="text-accent" />
            </Button>
          </Tooltip>
        </div>
      </div>
    </Navigator.Screen>
  );
};

const InviteItem = ({ index, entity, max }: { index: number; entity: Entity; max: bigint }) => {
  const { tables, utils } = useCore();
  const { declineInvite, joinAlliance } = useContractCalls();
  const playerInvite = tables.PlayerInvite.get(entity);
  const playerEntities = tables.PlayerAlliance.getAllWith({
    alliance: playerInvite?.alliance,
  });
  const full = playerEntities.length >= Number(max);

  if (!playerInvite?.alliance) return null;

  return (
    <>
      <span>{index + 1}.</span>
      <div className="flex gap-2">
        <span style={{ color: utils.getEntityColor(entity) }}>
          [{utils.getAllianceName(playerInvite.alliance, true)}]
        </span>
        <span className="opacity-75">
          ({playerEntities.length} MEMBER{playerEntities.length > 1 ? "S" : ""})
        </span>
      </div>
      <TransactionQueueMask queueItemId={`join-${playerInvite.alliance}`}>
        <Button
          tooltip={full ? "alliance full" : "accept"}
          className="btn-xs border-none !rounded-box text-success"
          onClick={() => joinAlliance(playerInvite.alliance)}
          disabled={full}
        >
          <div className="flex gap-2">
            <FaCheck className="rounded-none" /> ACCEPT
          </div>
        </Button>
      </TransactionQueueMask>
      <TransactionQueueMask queueItemId={`decline-${playerInvite.player}`}>
        <Button
          variant="ghost"
          className="btn-xs border-none !rounded-box text-error"
          onClick={() => declineInvite(playerInvite.player)}
        >
          <div className="flex gap-2">
            <FaTimes className="rounded-none" /> DECLINE
          </div>
        </Button>
      </TransactionQueueMask>
    </>
  );
};
