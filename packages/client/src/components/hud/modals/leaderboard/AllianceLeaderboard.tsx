import { ComponentValue, Entity } from "@latticexyz/recs";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { EAllianceInviteMode, EAllianceRole } from "contracts/config/enums";
import { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowUp,
  FaCheck,
  FaCog,
  FaCopy,
  FaEnvelope,
  FaInfoCircle,
  FaLock,
  FaTimes,
  FaUserMinus,
  FaUserPlus,
} from "react-icons/fa";
import { GiRank1, GiRank2, GiRank3 } from "react-icons/gi";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { Button } from "src/components/core/Button";
import { SecondaryCard } from "src/components/core/Card";
import { Checkbox } from "src/components/core/Checkbox";
import { Join } from "src/components/core/Join";
import { Navigator } from "src/components/core/Navigator";
import { TextInput } from "src/components/core/TextInput";
import { Tooltip } from "src/components/core/Tooltip";
import { AccountDisplay } from "src/components/shared/AccountDisplay";
import { TransactionQueueMask } from "src/components/shared/TransactionQueueMask";
import { useMud } from "src/hooks";
import { components } from "src/network/components";
import {
  acceptJoinRequest,
  createAlliance,
  declineInvite,
  grantRole,
  invite,
  joinAlliance,
  kickPlayer,
  leaveAlliance,
  rejectJoinRequest,
  requestToJoin,
} from "src/network/setup/contractCalls/alliance";
import { hydrateAllianceData } from "src/network/sync/indexer";
import { getAllianceName } from "src/util/alliance";
import { entityToColor } from "src/util/color";
import { entityToAddress } from "src/util/common";
import { TransactionQueueType } from "src/util/constants";
import { hashEntities } from "src/util/encode";
import { isProfane } from "src/util/profanity";
import { Hex, isAddress, padHex } from "viem";

const ALLIANCE_TAG_SIZE = 6;

export const AllianceLeaderboard = () => {
  return (
    <Navigator initialScreen="score" className="border-none p-0! h-full">
      <ScoreScreen />
      <CreateScreen />
      <InvitesScreen />
      <SendInviteScreen />
      <ManageScreen />
    </Navigator>
  );
};

export const ScoreScreen = () => {
  const data = components.AllianceLeaderboard.use();

  return (
    <Navigator.Screen
      title="score"
      className="lex flex-col !items-start justify-between w-full h-full text-xs pointer-events-auto"
    >
      {/* CAUSED BY INCOMPATIBLE REACT VERSIONS */}
      {data && (
        <AutoSizer>
          {({ height, width }: { height: number; width: number }) => (
            <List height={height} width={width} itemCount={data.alliances.length} itemSize={47} className="scrollbar">
              {({ index, style }) => {
                const alliance = data.alliances[index];
                const score = data.scores[index];
                return (
                  <div style={style} className="pr-2">
                    <LeaderboardItem key={index} index={index} score={Number(score)} entity={alliance} />
                  </div>
                );
              }}
            </List>
          )}
        </AutoSizer>
      )}
      {!data && (
        <SecondaryCard className="w-full flex-grow items-center justify-center font-bold opacity-50">
          NO ALLIANCES
        </SecondaryCard>
      )}
      <div className="w-full">
        <hr className="w-full border-t border-cyan-800 my-2" />

        <InfoRow data={data} />
      </div>
    </Navigator.Screen>
  );
};

export const CreateScreen = () => {
  const mud = useMud();
  const [inviteOnly, setInviteOnly] = useState(true);
  const [allianceTag, setAllianceTag] = useState("");

  return (
    <Navigator.Screen
      title="create"
      className="flex flex-col items-center w-full text-xs pointer-events-auto h-full my-5"
    >
      <div className="flex items-center gap-2">
        <b className="text-2xl">[</b>
        <TextInput
          placeholder=""
          bottomLeftLabel={`MAX ${ALLIANCE_TAG_SIZE} CHAR.`}
          topLeftLabel="ENTER ALLIANCE TAG"
          maxLength={ALLIANCE_TAG_SIZE}
          onChange={(e) => {
            setAllianceTag(e.target.value);
          }}
          className="text-center font-bold uppercase"
        />
        <b className="text-2xl">]</b>
      </div>

      <Checkbox label="INVITE ONLY" className="checkbox-error" defaultChecked onChange={setInviteOnly} />

      <div className="flex gap-1 mt-auto">
        <Navigator.BackButton
          disabled={!allianceTag || isProfane(allianceTag)}
          className="btn-primary btn-sm"
          onClick={() => createAlliance(mud, allianceTag, inviteOnly)}
        >
          Create
        </Navigator.BackButton>
        <Navigator.BackButton>Back</Navigator.BackButton>
      </div>
    </Navigator.Screen>
  );
};

export const ManageScreen: React.FC = () => {
  const mud = useMud();
  const playerEntity = mud.playerAccount.entity;
  const data = components.AllianceLeaderboard.use();
  const allianceEntity = data?.alliances[data?.playerAllianceRank - 1];
  const playerRole = components.PlayerAlliance.get(playerEntity)?.role ?? EAllianceRole.Member;
  const playerEntities = components.PlayerAlliance.useAllWith({
    alliance: allianceEntity,
  });
  const maxAllianceMembers = components.P_AllianceConfig.get()?.maxAllianceMembers ?? 1n;

  useEffect(() => {
    console.log("here");
    hydrateAllianceData(allianceEntity, mud);
  }, [allianceEntity, mud]);

  if (!data) return <></>;

  // sort by role
  const players = playerEntities
    .map((entity) => {
      return { entity, ...components.PlayerAlliance.get(entity) };
    })
    .sort((a, b) => {
      return (a.role ?? EAllianceRole.Member) - (b.role ?? EAllianceRole.Member);
    });

  return (
    <Navigator.Screen
      title="manage"
      className="flex flex-col items-center w-full text-xs pointer-events-auto h-full overflow-hidden"
    >
      <div className="w-full flex flex-col flex-grow">
        <div className="flex justify-between items-center">
          <p className="font-bold p-1 opacity-75">MEMBERS</p>
          <div className="dropdown dropdown-end ">
            <label tabIndex={0} className="btn btn-circle btn-ghost btn-xs">
              <FaInfoCircle />
            </label>
            <div
              tabIndex={0}
              className="card compact dropdown-content z-[1] shadow bg-base-100 w-56 p-1 m-1 border border-secondary"
            >
              <span className="flex">
                <GiRank3 size={18} className="text-yellow-500" /> Promote/Demote Members
              </span>
              <span className="flex">
                <GiRank2 size={18} className="text-yellow-500" /> Kick Members
              </span>

              <span className="flex">
                <GiRank1 size={18} className="text-yellow-500" /> Invite Members
              </span>
            </div>
          </div>
        </div>

        <Join
          direction="vertical"
          className="overflow-auto w-full h-full scrollbar bg-neutral border border-secondary/25"
        >
          {players.map((player) => {
            const role = player?.role ?? EAllianceRole.Member;
            const entity = player.entity;

            return (
              <SecondaryCard key={player.entity} className="border-b rounded-none flex-row justify-between">
                {role === EAllianceRole.Owner && (
                  <div className="flex items-center gap-1 font-bold text-warning uppercase">
                    <GiRank3 size={18} className="text-yellow-500" />
                    <AccountDisplay player={entity} />
                    <p className="bg-yellow-500 text-neutral px-2 rounded-sm text-xs">OWNER</p>
                  </div>
                )}
                {role === EAllianceRole.CanGrantRole && (
                  <div className="flex items-center gap-1 font-bold">
                    <GiRank3 size={18} className="text-yellow-500" />
                    <AccountDisplay player={entity} />
                  </div>
                )}
                {role === EAllianceRole.CanKick && (
                  <div className="flex items-center gap-1 font-bold">
                    <GiRank2 size={18} className="text-yellow-500" />
                    <AccountDisplay player={entity} />
                  </div>
                )}
                {role === EAllianceRole.CanInvite && (
                  <div className="flex items-center gap-1 font-bold">
                    <GiRank1 size={18} className="text-yellow-500" />
                    <AccountDisplay player={entity} />
                  </div>
                )}
                {role === EAllianceRole.Member && (
                  <div className="flex items-center gap-1 font-bold">
                    <AccountDisplay player={entity} />
                  </div>
                )}
                <div className="flex gap-1">
                  {/* only kick if not current player, has the ability to kick, and current player is higher than member */}
                  {entity !== playerEntity && playerRole <= EAllianceRole.CanKick && role > playerRole && (
                    <TransactionQueueMask queueItemId={hashEntities(TransactionQueueType.KickPlayer, entity)}>
                      <Button
                        tooltip="Kick"
                        tooltipDirection="left"
                        className="btn-xs !rounded-box border-error"
                        onClick={() => kickPlayer(mud, entity)}
                      >
                        <FaUserMinus className="rounded-none" size={10} />
                      </Button>
                    </TransactionQueueMask>
                  )}
                  {/* only promote if not current player, has the ability to promote, and current player is higher than member */}
                  {entity !== playerEntity && playerRole <= EAllianceRole.CanGrantRole && role > playerRole && (
                    <TransactionQueueMask queueItemId={hashEntities(TransactionQueueType.Demote, entity)}>
                      <Button
                        tooltip="Demote"
                        tooltipDirection="left"
                        className="btn-xs !rounded-box border-warning"
                        onClick={() => grantRole(mud, entity, Math.min(role + 1, EAllianceRole.Member))}
                      >
                        <FaArrowDown />
                      </Button>
                    </TransactionQueueMask>
                  )}
                  {/* only promote if not current player, has the ability to promote, and current player is higher than member */}
                  {entity !== playerEntity && playerRole <= EAllianceRole.CanGrantRole && role > playerRole && (
                    <TransactionQueueMask queueItemId={hashEntities(TransactionQueueType.Promote, entity)}>
                      <Button
                        tooltip="Promote"
                        tooltipDirection="left"
                        className="btn-xs !rounded-box border-success"
                        onClick={() => grantRole(mud, entity, Math.max(role - 1, EAllianceRole.CanGrantRole))}
                      >
                        <FaArrowUp />
                      </Button>
                    </TransactionQueueMask>
                  )}
                </div>
              </SecondaryCard>
            );
          })}
        </Join>
        <p className="p-1 opacity-50 text-right">
          {players.length}/{maxAllianceMembers?.toLocaleString()} member(s)
        </p>
      </div>

      <div className="flex gap-1">
        <Navigator.BackButton>
          <FaArrowLeft />
        </Navigator.BackButton>

        <Navigator.BackButton className="btn-error border-none" onClick={() => leaveAlliance(mud)}>
          LEAVE ALLIANCE
        </Navigator.BackButton>
      </div>
    </Navigator.Screen>
  );
};

export const InvitesScreen: React.FC = () => {
  const mud = useMud();
  const playerEntity = mud.playerAccount.entity;
  const playerAlliance = components.PlayerAlliance.use(playerEntity)?.alliance as Entity | undefined;
  const role = components.PlayerAlliance.use(playerEntity)?.role ?? EAllianceRole.Member;
  const invites = components.PlayerInvite.useAllWith({ target: playerEntity }) ?? [];
  const joinRequests = components.AllianceRequest.useAllWith({ alliance: playerAlliance ?? singletonEntity }) ?? [];
  const playerEntities = components.PlayerAlliance.useAllWith({
    alliance: playerAlliance,
  });
  const maxAllianceMembers = components.P_AllianceConfig.get()?.maxAllianceMembers ?? 1n;

  const full = playerEntities.length >= Number(maxAllianceMembers);

  return (
    <Navigator.Screen
      title="invites"
      className="flex flex-col items-center w-full h-full text-xs pointer-events-auto h-full overflow-hidden"
    >
      <div className="flex flex-grow w-full gap-2 mb-2">
        {!playerAlliance && (
          <div className={`w-full flex flex-col`}>
            <div className="flex justify-between items-center">
              <p className="font-bold p-1 opacity-75">INVITES</p>
            </div>

            <Join
              direction="vertical"
              className="overflow-auto w-full h-full scrollbar bg-neutral border border-secondary/25"
            >
              {invites.map((entity) => {
                const playerInvite = components.PlayerInvite.get(entity);
                const playerEntities = components.PlayerAlliance.getAllWith({
                  alliance: playerInvite?.alliance,
                });

                if (!playerInvite?.alliance) return <></>;

                return (
                  <SecondaryCard key={entity} className="border-b rounded-none flex-row justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <b>[{getAllianceName(playerInvite.alliance, true)}]</b>
                      <b className="opacity-75">{playerEntities.length} MEMBER(S)</b>
                    </div>

                    <div className="flex gap-1">
                      {/* only kick if not current player, has the ability to kick, and current player is higher than member */}
                      <TransactionQueueMask
                        queueItemId={hashEntities(TransactionQueueType.DeclineInvite, playerInvite.player)}
                      >
                        <Button
                          tooltip="Decline"
                          tooltipDirection="left"
                          className="btn-xs !rounded-box border-error"
                          onClick={() => declineInvite(mud, playerInvite.player)}
                        >
                          <FaTimes className="rounded-none" size={10} />
                        </Button>
                      </TransactionQueueMask>
                      <TransactionQueueMask
                        queueItemId={hashEntities(TransactionQueueType.JoinAlliance, playerInvite.alliance)}
                      >
                        <Button
                          tooltip="Accept"
                          tooltipDirection="left"
                          className="btn-xs !rounded-box border-success"
                          onClick={() => joinAlliance(mud, playerInvite.alliance)}
                        >
                          <FaCheck className="rounded-none" size={10} />
                        </Button>
                      </TransactionQueueMask>
                    </div>
                  </SecondaryCard>
                );
              })}
            </Join>
            <p className="p-1 opacity-50 text-right">{invites.length} invites(s)</p>
          </div>
        )}
        {role <= EAllianceRole.CanInvite && (
          <div className="w-full flex flex-col">
            <div className="flex justify-between items-center">
              <p className="font-bold p-1 opacity-75">REQUESTS</p>
            </div>
            {full && (
              <SecondaryCard className="w-full h-full font-bold items-center justify-center opacity-75 uppercase">
                alliance full
              </SecondaryCard>
            )}
            {!full && (
              <Join
                direction="vertical"
                className="overflow-auto w-full h-full scrollbar bg-neutral border border-secondary/25"
              >
                {joinRequests.map((entity) => {
                  const request = components.AllianceRequest.get(entity);

                  if (!request?.player) return <></>;

                  return (
                    <SecondaryCard key={entity} className="border-b rounded-none flex-row justify-between items-center">
                      <AccountDisplay player={request.player} />

                      <div className="flex gap-1">
                        {/* only kick if not current player, has the ability to kick, and current player is higher than member */}
                        <TransactionQueueMask
                          queueItemId={hashEntities(TransactionQueueType.RejectRequest, request.player)}
                        >
                          <Button
                            tooltip="Decline"
                            tooltipDirection="left"
                            className="btn-xs !rounded-box border-error"
                            onClick={() => rejectJoinRequest(mud, request.player)}
                          >
                            <FaTimes className="rounded-none" size={10} />
                          </Button>
                        </TransactionQueueMask>

                        <TransactionQueueMask
                          queueItemId={hashEntities(TransactionQueueType.AcceptRequest, request.player)}
                        >
                          <Button
                            tooltip="Accept"
                            tooltipDirection="left"
                            className="btn-xs !rounded-box border-success"
                            onClick={() => acceptJoinRequest(mud, request.player)}
                          >
                            <FaCheck className="rounded-none" size={10} />
                          </Button>
                        </TransactionQueueMask>
                      </div>
                    </SecondaryCard>
                  );
                })}
              </Join>
            )}
            <p className="p-1 opacity-50 text-right">{joinRequests.length} requests(s)</p>
          </div>
        )}
      </div>

      {role > EAllianceRole.CanInvite && playerAlliance && (
        <SecondaryCard className="w-full h-full items-center justify-center font-bold opacity-50 mb-2 text-center">
          NEED INVITE ROLE TO SEND INVITES OR ACCEPT JOIN REQUESTS
        </SecondaryCard>
      )}

      <div className="flex gap-1">
        <Navigator.BackButton>
          <FaArrowLeft />
        </Navigator.BackButton>
        <Navigator.NavButton to="send" className="btn-secondary btn-sm border-none" disabled={full || !playerAlliance}>
          SEND INVITE
        </Navigator.NavButton>
      </div>
      <div className="flex p-2 items-center">
        FRIEND CODE:
        <Tooltip text="Click to copy" direction="top">
          <Button
            className="btn-xs flex gap-1"
            onClick={() => navigator.clipboard.writeText(entityToAddress(playerEntity))}
          >
            {entityToAddress(playerEntity, true)}
            <FaCopy />
          </Button>
        </Tooltip>
      </div>
    </Navigator.Screen>
  );
};

export const SendInviteScreen = () => {
  const mud = useMud();
  const [targetAddress, setTargetAddress] = useState("");

  return (
    <Navigator.Screen
      title="send"
      className="flex flex-col items-center w-full text-xs pointer-events-auto h-full my-5"
    >
      <div className="flex items-center gap-2">
        <TextInput
          placeholder="0x..."
          topLeftLabel="ENTER FRIEND CODE"
          maxLength={42}
          onChange={(e) => {
            setTargetAddress(e.target.value);
          }}
          className="text-center font-bold"
        />
      </div>

      <div className="flex gap-1 mt-auto">
        <Navigator.BackButton
          disabled={!targetAddress || !isAddress(targetAddress)}
          className="btn-primary btn-sm"
          onClick={() => {
            invite(mud, padHex(targetAddress as Hex, { size: 32 }) as Entity);
          }}
        >
          Invite
        </Navigator.BackButton>
        <Navigator.BackButton>Back</Navigator.BackButton>
      </div>
    </Navigator.Screen>
  );
};

const LeaderboardItem = ({
  index,
  score,
  entity,
  className,
}: {
  index: number;
  score: number;
  entity: Entity;
  className?: string;
}) => {
  const mud = useMud();
  const { playerAccount } = mud;
  const allianceMode = components.Alliance.get(entity)?.inviteMode as EAllianceInviteMode | undefined;
  const playerAlliance = components.PlayerAlliance.get(playerAccount.entity)?.alliance as Entity;
  const inviteOnly = allianceMode === EAllianceInviteMode.Closed;

  return (
    <SecondaryCard
      className={`grid grid-cols-7 w-full border border-cyan-800 p-2 bg-slate-800 bg-gradient-to-br from-transparent to-bg-slate-900/30 items-center h-10 ${
        playerAlliance === entity ? "border-success" : ""
      } ${className}`}
    >
      <div>{index + 1}.</div>
      <div className="col-span-6 flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <FaLock className="text-warning opacity-75" />
          <p className="font-bold" style={{ color: entityToColor(entity) }}>
            [{getAllianceName(entity, true)}]
          </p>
        </div>
        <div className="flex items-center gap-1">
          <p className="font-bold bg-cyan-700 px-2 ">{score.toLocaleString()}</p>
          {!playerAlliance && (
            <TransactionQueueMask queueItemId={hashEntities(TransactionQueueType.JoinAlliance, entity)}>
              <Button
                tooltip={inviteOnly ? "Request to Join" : "Join"}
                tooltipDirection="left"
                className={`btn-xs flex border ${inviteOnly ? "border-warning" : "border-secondary"}`}
                onClick={() => {
                  inviteOnly ? requestToJoin(mud, entity) : joinAlliance(mud, entity);
                }}
              >
                <FaUserPlus />
              </Button>
            </TransactionQueueMask>
          )}
        </div>
      </div>
    </SecondaryCard>
  );
};

const InfoRow = ({ data }: { data?: ComponentValue<typeof components.AllianceLeaderboard.schema> }) => {
  if (!data) return <SoloPlayerInfo />;

  const score = data.scores[data.playerAllianceRank - 1];
  const rank = data.playerAllianceRank;
  const allianceEntity = data.alliances[data.playerAllianceRank - 1];

  if (!allianceEntity) return <SoloPlayerInfo />;

  return <PlayerInfo rank={rank} alliance={allianceEntity} score={Number(score)} />;
};

const PlayerInfo = ({ rank, score, alliance }: { rank: number; alliance: Entity; score: number }) => {
  const {
    playerAccount: { entity: playerEntity },
  } = useMud();
  const invites = components.PlayerInvite.useAllWith({ target: playerEntity }) ?? [];
  const playerAlliance = components.PlayerAlliance.use(playerEntity)?.alliance as Entity | undefined;
  const joinRequests = components.AllianceRequest.useAllWith({ alliance: playerAlliance ?? singletonEntity }) ?? [];

  return (
    <SecondaryCard className="w-full border border-slate-700 p-2 bg-slate-800">
      {
        <div className="grid grid-cols-6 w-full items-center gap-2">
          <LeaderboardItem index={rank - 1} score={score} entity={alliance} className="col-span-4 h-full" />
          <Navigator.NavButton to="manage" className="flex bg-secondary btn-sm">
            <FaCog />
          </Navigator.NavButton>
          <Navigator.NavButton to="invites" className="flex bg-secondary btn-sm">
            <FaEnvelope /> <b>{joinRequests.length ?? invites.length}</b>
          </Navigator.NavButton>
        </div>
      }
    </SecondaryCard>
  );
};

const SoloPlayerInfo = () => {
  const {
    playerAccount: { entity: playerEntity },
  } = useMud();
  const invites = components.PlayerInvite.useAllWith({ target: playerEntity }) ?? [];

  return (
    <SecondaryCard className="w-full border border-slate-700 p-2 bg-slate-800">
      {
        <div className="grid grid-cols-6 w-full items-center gap-2">
          <Navigator.NavButton to="create" className="btn-xs btn-secondary col-span-5">
            + Create Alliance
          </Navigator.NavButton>
          <Navigator.NavButton to="invites" className="btn-xs flex">
            <FaEnvelope /> <b>{invites.length}</b>
          </Navigator.NavButton>
        </div>
      }
    </SecondaryCard>
  );
};
