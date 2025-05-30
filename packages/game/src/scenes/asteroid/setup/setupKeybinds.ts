import { Core, Mode } from "@primodiumxyz/core";
import { Entity } from "@primodiumxyz/reactive-tables";
import { PrimodiumScene } from "@game/types";

export const setupKeybinds = (scene: PrimodiumScene, core: Core) => {
  const {
    tables,
    network: { world },
  } = core;
  const mainbaseKeybind = scene.input.addListener("Base", () => {
    const selectedRockEntity = tables.SelectedRock.get()?.value;
    if (!selectedRockEntity) return;
    const mainBase = tables.Home.get(selectedRockEntity) as Entity | undefined;

    if (!mainBase) return;

    const mainBaseCoord = tables.Position.get(mainBase);
    if (mainBaseCoord) scene.camera.pan(mainBaseCoord);
  });

  const escapeKeybind = scene.input.addListener("Esc", () => {
    // todo: dont run this if a modal is open
    if (tables.SelectedBuilding.get()) {
      tables.SelectedBuilding.remove();
      tables.SelectedAction.remove();
    }

    const mode = tables.SelectedMode.get()?.value;
    if (mode === Mode.Starmap && tables.SelectedRock.get()) tables.SelectedRock.remove();
    if (mode === Mode.Spectate) tables.SelectedMode.set({ value: Mode.Starmap });
  });

  world.registerDisposer(() => {
    mainbaseKeybind.dispose();
    escapeKeybind.dispose();
  }, "game");
};
