import { DepthLayers } from "@game/constants";
import { Coord, tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { Entity, defineComponentSystem, namespaceWorld } from "@latticexyz/recs";
import { Scene } from "engine/types";
import { components } from "src/network/components";
import { attack as callAttack } from "src/network/setup/contractCalls/attack";
import { MUD } from "src/network/types";
import { world } from "src/network/world";
import { ObjectPosition, OnRxjsSystem } from "../../common/object-components/common";
import { Line } from "../../common/object-components/graphics";

export const renderAttackLine = (scene: Scene, mud: MUD) => {
  const systemsWorld = namespaceWorld(world, "systems");
  const { tileWidth, tileHeight } = scene.tilemap;
  const id = "attackLine";

  function render(originEntity: Entity, originCoord?: Coord) {
    scene.objectPool.removeGroup(id);
    const origin = originCoord ?? components.Position.get(originEntity);
    if (!origin) return;
    const attackLine = scene.objectPool.getGroup(id);
    const trajectory = attackLine.add("Graphics", true);
    const originPixelCoord = tileCoordToPixelCoord({ x: origin.x, y: -origin.y }, tileWidth, tileHeight);
    const x = scene.input.phaserInput.activePointer.worldX;
    const y = scene.input.phaserInput.activePointer.worldY;

    trajectory.setComponents([
      ObjectPosition(originPixelCoord, DepthLayers.Marker),
      Line(
        { x, y },
        {
          id: `attackLine-line`,
          thickness: Math.min(10, 3 / scene.camera.phaserCamera.zoom),
          alpha: 0.25,
          color: 0xff0000,
        }
      ),

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      OnRxjsSystem(scene.camera.zoom$, async (_, zoom) => {
        trajectory.removeComponent(`attackLine-line`);
        const x = scene.input.phaserInput.activePointer.worldX;
        const y = scene.input.phaserInput.activePointer.worldY;
        trajectory.setComponent(
          Line(
            { x, y },
            {
              id: `attackLine-line`,
              thickness: Math.min(10, 3 / zoom),
              alpha: 0.25,
              color: 0xff0000,
            }
          )
        );
      }),

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      OnRxjsSystem(scene.input.pointermove$, (_, { worldX, worldY }) => {
        trajectory.removeComponent(`moveLine-line`);
        const x = worldX;
        const y = worldY;

        trajectory.setComponent(
          Line(
            { x, y },
            {
              id: `attackLine-line`,
              thickness: Math.min(10, 3 / scene.camera.phaserCamera.zoom),
              alpha: 0.25,
              color: 0xff0000,
            }
          )
        );
      }),
    ]);
  }

  defineComponentSystem(systemsWorld, components.Attack, async ({ value }) => {
    // const mapOpen = components.MapOpen.get()?.value;
    const attack = value[0];
    if (!attack || !attack.originFleet) {
      scene.objectPool.removeGroup(id);
      return;
    }
    if (attack.destination) {
      scene.objectPool.removeGroup(id);
      components.Attack.reset();
      components.SelectedFleet.clear();
      components.SelectedRock.clear();
      await callAttack(mud, attack.originFleet, attack.destination);
      return;
    }
    const originPosition = attack.originX && attack.originY ? { x: attack.originX, y: attack.originY } : undefined;

    render(attack.originFleet, originPosition);
  });
};
