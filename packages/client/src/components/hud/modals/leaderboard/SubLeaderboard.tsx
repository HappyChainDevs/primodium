import { Entity } from "@latticexyz/recs";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { SecondaryCard } from "src/components/core/Card";
import { AccountDisplay } from "src/components/shared/AccountDisplay";
import { useMud } from "src/hooks";
import { components } from "src/network/components";
import { getAllianceName } from "src/util/alliance";
import { EntityType } from "src/util/constants";
import { formatNumber, formatResourceCount } from "src/util/number";
import { rankToScore } from "src/util/score";
import { Crown } from "@/components/shared/Crown";

export const SubLeaderboard = ({ leaderboard, alliance = false }: { leaderboard: Entity; alliance?: boolean }) => {
  const { playerAccount } = useMud();
  const data = components.Leaderboard.get(leaderboard);

  if (!data)
    return (
      <SecondaryCard className="w-full h-full flex justify-center items-center uppercase font-bold text-sm">
        No Data Found
      </SecondaryCard>
    );
  const entity = alliance
    ? (components.PlayerAlliance.get(playerAccount.entity)?.alliance as Entity)
    : playerAccount.entity;
  const playerIndex = data.players.indexOf(entity);
  const playerScore = playerIndex == -1 ? undefined : data.scores[playerIndex];

  return (
    <SecondaryCard className="flex flex-col w-full h-full text-xs pointer-events-auto">
      <div className={`grid grid-cols-8 w-full p-2 font-bold uppercase`}>
        <div>Rank</div>
        <div className="col-span-4">Name</div>
        <div className="col-span-2">Score</div>
        <div>Points</div>
      </div>
      <div className="flex flex-col w-full h-full justify-between text-xs pointer-events-auto">
        <AutoSizer>
          {({ height, width }: { height: number; width: number }) => (
            <List
              // Unsure how this offset works but it is required to have even height with GrandLeaderboard.tsx.
              height={height - 73}
              width={width}
              itemCount={data.players.length}
              itemSize={60}
              className="scrollbar"
            >
              {({ index, style }) => {
                const player = data.players[index];
                const score = data.scores[index];
                return (
                  <div style={style} className="pr-2">
                    <LeaderboardItem key={index} player={player} index={index} score={score} alliance={alliance} />
                  </div>
                );
              }}
            </List>
          )}
        </AutoSizer>
        {entity && (
          <div className="w-full self-end">
            <hr className="w-full border-t border-cyan-800 my-2" />
            <LeaderboardItem player={entity} index={playerIndex} score={playerScore ?? 0n} alliance={alliance} />
          </div>
        )}
      </div>
    </SecondaryCard>
  );
};

const LeaderboardItem = ({
  player,
  index,
  score,
  alliance = false,
}: {
  player: Entity;
  index: number;
  score: bigint;
  alliance?: boolean;
}) => {
  const {
    playerAccount: { entity: playerEntity },
  } = useMud();

  const entity = alliance ? (components.PlayerAlliance.get(playerEntity)?.alliance as Entity) : playerEntity;

  const rank = index + 1;
  const rankSuffix = rank == 1 ? "st" : rank == 2 ? "nd" : rank == 3 ? "rd" : "th";
  let rankString: string;
  if (rank == 0) {
    rankString = "";
  } else {
    rankString = `${rank}${rankSuffix}`;
  }
  return (
    <SecondaryCard
      className={`grid grid-cols-8 gap-1 w-full border border-cyan-800 p-2 bg-slate-800 bg-gradient-to-br from-transparent to-bg-slate-900/30 items-center h-14 ${
        player === entity ? "border-success" : ""
      }`}
    >
      <div className={`grid grid-cols-2 gap-2 items-center`}>
        <div>{rankString}</div>
        <Crown rank={rank} />
      </div>
      <div className="col-span-4 flex gap-1 justify-between items-center">
        <div className="flex items-center gap-1">
          {alliance ? `[${getAllianceName(player, true)}]` : <AccountDisplay player={player} />}
          {player === entity && <p className="text-accent">(You)</p>}
        </div>
      </div>
      <p className="font-bold w-fit col-span-2 px-2 flex justify-center">
        {formatResourceCount(EntityType.Iron, score, {
          notLocale: true,
          fractionDigits: 1,
          showZero: true,
        }).toLocaleString()}
      </p>
      <div className="flex items-center gap-1 px-1 font-bold">
        {formatNumber(rankToScore(index + 1), { fractionDigits: 1 })}
      </div>
    </SecondaryCard>
  );
};
