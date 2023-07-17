import InfoBox from "../InfoBox";
import ResourceBox from "../resource-box/ResourceBox";
import SideMenu from "../SideMenu";
import TooltipBox from "../TooltipBox";
import NotificationBox from "../NotificationBox";
import { useGameStore } from "../../store/GameStore";
import { useEffect } from "react";
import { primodium } from "@game/api";
import { KeybindActions } from "@game/constants";
import { Hotbar } from "./Hotbar";
import { TileInfo } from "./TileInfo";

function GameUI() {
  const [showUI, toggleShowUI, isReady] = useGameStore((state) => [
    state.showUI,
    state.toggleShowUI,
    state.isReady,
  ]);

  useEffect(() => {
    if (!isReady) return;

    const listener = primodium.input.addListener(
      KeybindActions.ToggleUI,
      toggleShowUI
    );

    return () => {
      listener.dispose();
    };
  }, [isReady]);

  return (
    <div className="screen-container">
      <div className={`${showUI ? "" : "hidden pointer-events-none"}`}>
        <Hotbar />
        <TileInfo />
        <InfoBox />
        <NotificationBox />
        <ResourceBox />
        <TooltipBox />
        <SideMenu />
      </div>
    </div>
  );
}

export default GameUI;
