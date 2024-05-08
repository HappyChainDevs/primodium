import { Scene } from "engine/types";
import { renderOverview } from "@/game/scenes/command-center/systems/renderOverview";
// import { renderBattle } from "@/game/scenes/starmap/systems/renderBattle";
// import { renderFleets } from "@/game/scenes/starmap/systems/renderFleets";
// import { renderTrajectory } from "@/game/scenes/starmap/systems/renderTrajectory";

export const runSystems = (scene: Scene) => {
  renderOverview(scene);
  // renderFleets(scene);
  // renderBattle(scene);
  // renderTrajectory(scene);
};
