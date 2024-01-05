import { useEffect } from "react";
import { useMud } from "src/hooks/useMud";

import { primodium } from "@game/api";
import { Progress } from "src/components/core/Progress";
import { GameHUD } from "src/components/hud/HUD";
import { GameReady } from "src/network/components/clientComponents";

const params = new URLSearchParams(window.location.search);

export const Game = () => {
  const gameReady = GameReady.use()?.value;

  return (
    <div>
      {!gameReady && (
        <div className="flex flex-col items-center justify-center h-screen text-white font-mono gap-4">
          <p className="text-lg text-white">
            <span className="font-mono">Initializing Game World</span>
            <span>&hellip;</span>
          </p>
          <Progress value={100} max={100} className="animate-pulse w-56" />
        </div>
      )}

      {/* cannot unmount. needs to be visible for phaser to attach to DOM element */}
      <div id="game-container relative ">
        <PhaserWrapper />
        {gameReady && <GameHUD />}
      </div>
    </div>
  );
};

const PhaserWrapper = () => {
  const mud = useMud();

  useEffect(() => {
    (async () => {
      try {
        const ready = GameReady.get()?.value;
        if (!mud || ready) return;

        await primodium.init(mud, params.get("version") ? params.get("version")! : "🔥");
      } catch (e) {
        console.log(e);
      }
    })();

    return () => {
      // console.log("destroying primodium");
      // GameReady.set({ value: false });
      // primodium.destroy();
    };
  }, [mud]);

  return <div id="phaser-container" className="absolute cursor-pointer screen-container" />;
};
