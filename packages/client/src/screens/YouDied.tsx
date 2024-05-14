import { Button } from "@/components/core/Button";
import { Card, SecondaryCard } from "@/components/core/Card";
import { BattleDetails } from "@/components/hud/global/modals/battle-reports/BattleDetails";
import { BattleButton, ErrorScreen, LoadingScreen } from "@/components/hud/global/modals/battle-reports/BattleReports";
import { TransactionQueueMask } from "@/components/shared/TransactionQueueMask";
import { spawn } from "@/network/setup/contractCalls/spawn";
import { hydrateBattleReports } from "@/network/sync/indexer";
import { Entity } from "@latticexyz/recs";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { InterfaceIcons } from "@primodiumxyz/assets";
import { useEffect, useState } from "react";
import { Navigator } from "src/components/core/Navigator";
import { useMud } from "src/hooks";
import { components } from "src/network/components";

export const YouDied = () => {
  const mud = useMud();
  const {
    playerAccount: { entity: playerEntity },
  } = mud;
  const battles = components.Battle.useAllPlayerBattles(playerEntity).sort((a, b) =>
    Number(components.Battle.get(b)?.timestamp! - components.Battle.get(a)?.timestamp!)
  );

  useEffect(() => {
    hydrateBattleReports(playerEntity, mud);
  }, [playerEntity, mud]);
  const BaseContent = () => (
    <Navigator.Screen title="YouDied" className="flex flex-col gap-6 px-8 z-[1000]">
      <h1 className="font-bold text-error">Ashes to ashes, dust to dust</h1>
      <p className="text-xl">All your asteroids have been captured. Will you reclaim your glory?</p>
      <div className="w-full grid place-items-center">
        <Navigator.NavButton to="BattleReports" variant="neutral" size="content" className="!w-56">
          <img src={InterfaceIcons.Reports} alt="reports" className="w-8" />
          <p className="text-xs">View Battle Reports</p>
        </Navigator.NavButton>
      </div>
      <div className="w-full grid place-items-center">
        <TransactionQueueMask queueItemId={singletonEntity}>
          <Button variant="secondary" size="md" onClick={() => spawn(mud)} className="!w-56">
            Respawn
          </Button>
        </TransactionQueueMask>
      </div>
    </Navigator.Screen>
  );

  const BattleContent = () => {
    const [selectedBattle, setSelectedBattle] = useState<Entity>();
    return (
      <>
        <LoadingScreen />
        <ErrorScreen />
        <Navigator.Screen title={"BattleReports"} className="full h-full">
          <div className="text-xs gap-z w-full h-full flex flex-col items-center">
            {battles.length === 0 && (
              <SecondaryCard className="w-full h-full flex items-center justify-center font-bold">
                <p className="opacity-50">NO BATTLE REPORTS FOUND</p>
              </SecondaryCard>
            )}
            {battles.length !== 0 &&
              battles.map((battle, i) => (
                <BattleButton battleEntity={battle} key={`battle-${i}`} setSelectedBattle={setSelectedBattle} />
              ))}
          </div>
          <div className="flex justify-center w-full mt-2">
            <Navigator.BackButton className="w-fit" />
          </div>
        </Navigator.Screen>

        {selectedBattle && <BattleDetails battleEntity={selectedBattle} />}
      </>
    );
  };

  return (
    <div className="w-screen h-screen absolute top-0 left-0 flex justify-center items-center z-50">
      <div key="bg" className="fixed w-full h-full bg-black" />
      <div key="star" className="fixed w-full h-full star-background opacity-30" />

      <div className="animate-in fade-in duration-100">
        <Card className="w-[40rem] h-[32rem]">
          <div className="absolute inset-0 w-full h-full heropattern-skulls-slate-800/10" />
          <Navigator initialScreen={"YouDied"} className="border-none p-0! h-full">
            <div className="w-full h-full flex text-center justify-center items-center ">
              <BaseContent />
              <BattleContent />
            </div>
          </Navigator>
        </Card>
      </div>
    </div>
  );
};
