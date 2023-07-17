// PRIMODIUM ENTRY POINT
import { Address } from "wagmi";
import { engine } from "../../../engine";
import { Network } from "../../../network/layer";
import gameConfig from "../../config/gameConfig";
import mainSceneConfig from "../../config/mainSceneConfig";
import { Scenes } from "../../constants";
import { runSystems } from "../systems";
import setupMouseInputs from "./SetupMouseInputs";
import { createChunkManager } from "./managers/chunkManager";
import setupCamera from "./setupCamera";

export const init = async (address: Address, network: Network) => {
  const { world } = network;
  const game = await engine.createGame(gameConfig);
  const scene = await game.sceneManager.addScene(
    Scenes.Main,
    mainSceneConfig,
    true
  );

  const chunkManager = await createChunkManager(scene.tilemap);
  chunkManager.renderInitialChunks();
  chunkManager.startChunkRenderer();

  scene.camera.phaserCamera.fadeIn(1000);

  setupMouseInputs(scene, network, address);
  setupCamera(scene, network, address);

  runSystems(scene, network);

  world.registerDisposer(() => {
    chunkManager.dispose();
    game.dispose();
  });
};
