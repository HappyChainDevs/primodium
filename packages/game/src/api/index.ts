import { Core, Mode } from "@primodiumxyz/core";
import { namespaceWorld } from "@primodiumxyz/reactive-tables";
import { ContractCalls } from "@client/contractCalls/createContractCalls";
import init from "@game/init";
import { Scenes } from "@game/lib/constants/common";
import { runSystems as runCommonSystems } from "@game/scenes/common/systems";

export async function initGame(core: Core, calls: ContractCalls, version = "v1") {
  const {
    network: { world },
    tables,
  } = core;

  const asciiArt = `

  ██████╗ ██████╗ ██╗███╗   ███╗ ██████╗ ██████╗ ██╗██╗   ██╗███╗   ███╗
  ██╔══██╗██╔══██╗██║████╗ ████║██╔═══██╗██╔══██╗██║██║   ██║████╗ ████║
  ██████╔╝██████╔╝██║██╔████╔██║██║   ██║██║  ██║██║██║   ██║██╔████╔██║
  ██╔═══╝ ██╔══██╗██║██║╚██╔╝██║██║   ██║██║  ██║██║██║   ██║██║╚██╔╝██║
  ██║     ██║  ██║██║██║ ╚═╝ ██║╚██████╔╝██████╔╝██║╚██████╔╝██║ ╚═╝ ██║
  ╚═╝     ╚═╝  ╚═╝╚═╝╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚═╝ ╚═════╝ ╚═╝     ╚═╝

                                                                          `;

  console.log("%c" + asciiArt, "color: white; background-color: brown;");

  console.log(`%cPrimodium ${version}`, "color: white; background-color: black;", "https://twitter.com/primodiumgame");

  namespaceWorld(world, "game");

  const api = await init(core, calls);

  function destroy() {
    api.GLOBAL.dispose();

    //dispose game logic
    world.dispose("game");
    world.dispose("systems");
  }

  function runSystems() {
    const primary = () => {
      tables.SelectedMode.set({ value: Mode.Asteroid });

      console.info("[Game] Running primary systems");

      Object.values(Scenes).forEach((key) => {
        const scene = api[key];
        if (scene.isPrimary) scene.runSystems?.();
      });
    };

    const secondary = () => {
      console.info("[Game] Running secondary systems");
      Object.values(Scenes).forEach((key) => {
        const scene = api[key];
        if (!scene.isPrimary) scene.runSystems?.();
      });
    };

    // run after all systems are ready
    // includes common systems that run across all scenes
    // we can use that to keep the loading screen until all systems are run to prevent annoying stutter while the interface is ready
    const done = () => {
      console.info("[Game] Running common systems");
      runCommonSystems(api, core);
      tables.SystemsReady.set({ value: true });
    };

    return { primary, secondary, done };
  }

  return { ...api, destroy, runSystems };
}
