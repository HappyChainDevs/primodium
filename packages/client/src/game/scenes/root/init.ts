// ROOT ENTRY POINT
import { api } from "@game/api";
import { rootSceneConfig } from "@game/lib/config/rootScene";
import { Game } from "engine/types";

export const initRootScene = async (game: Game) => {
  const scene = await game.sceneManager.createScene(rootSceneConfig, true);

  const sceneApi = api(scene);
  sceneApi.audio.play("Background", "music");
  sceneApi.audio.play("Background2", "music", {
    loop: true,
    volume: 0,
  });
  sceneApi.audio.setPauseOnBlur(false);

  return { scene, api: sceneApi };
};
