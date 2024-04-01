import { Join } from "src/components/core/Join";
import { Tabs } from "src/components/core/Tabs";
import { AllianceLeaderboard } from "./AllianceLeaderboard";
import { Leaderboards } from "./Leaderboards";

export const Leaderboard: React.FC = () => {
  return (
    <Tabs className="flex flex-col items-center gap-2 w-full h-full">
      <Join className="border border-secondary/25">
        <Tabs.Button showActive index={0} className="btn-sm">
          Alliances
        </Tabs.Button>
        <Tabs.Button showActive index={1} className="btn-sm">
          All Players
        </Tabs.Button>
      </Join>

      <Tabs.Pane index={0} className="w-full h-full p-0 border-none">
        <AllianceLeaderboard />
      </Tabs.Pane>
      <Tabs.Pane index={1} className="w-full h-full p-0 border-none">
        <Leaderboards />
      </Tabs.Pane>
    </Tabs>
  );
};
