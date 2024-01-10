import { DepthLayers } from "@game/constants";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { ComponentUpdate, Has, defineEnterSystem, defineExitSystem, namespaceWorld } from "@latticexyz/recs";
import { Scene } from "engine/types";
import { components } from "src/network/components";
import { world } from "src/network/world";
import { PIRATE_KEY } from "src/util/constants";
import { hashKeyEntity } from "src/util/encode";
import {
  ObjectPosition,
  OnComponentSystem,
  OnHover,
  OnOnce,
  OnRxjsSystem,
} from "../../common/object-components/common";
import { Circle, Line } from "../../common/object-components/graphics";
import { renderEntityOrbitingArrivals } from "./renderArrivalsInOrbit";

export const renderArrivalsInTransit = (scene: Scene) => {
  const { tileWidth, tileHeight } = scene.tilemap;
  const systemsWorld = namespaceWorld(world, "systems");
  const objIndexSuffix = "_arrival";

  const render = ({ entity }: ComponentUpdate) => {
    const playerEntity = components.Account.get()?.value;
    const arrival = components.Arrival.getEntity(entity);

    if (!arrival) return;

    scene.objectPool.removeGroup(entity + objIndexSuffix);

    //don't render if arrival is already in orbit
    const now = components.Time.get()?.value ?? 0n;
    if (arrival.arrivalTime < now) return;

    const origin = components.Position.get(arrival.origin);
    const destination = components.Position.get(arrival.destination);

    if (!origin || !destination) return;

    //render personal pirates only
    if (
      components.PirateAsteroid.has(arrival.destination) &&
      playerEntity &&
      hashKeyEntity(PIRATE_KEY, playerEntity) !== components.OwnedBy.get(arrival.destination)?.value
    )
      return;

    const originPixelCoord = tileCoordToPixelCoord({ x: origin.x, y: -origin.y }, tileWidth, tileHeight);

    const destinationPixelCoord = tileCoordToPixelCoord({ x: destination.x, y: -destination.y }, tileWidth, tileHeight);

    const sendTrajectory = scene.objectPool.getGroup(entity + objIndexSuffix);

    const trajectory = sendTrajectory.add("Graphics", true);
    trajectory.setComponents([
      ObjectPosition(originPixelCoord, DepthLayers.Marker),
      Line(destinationPixelCoord, {
        id: `${entity}-trajectoryline`,
        thickness: Math.min(10, 3 / scene.camera.phaserCamera.zoom),
        alpha: 0.25,
        color: 0x00ffff,
      }),
      Circle(7, {
        position: destinationPixelCoord,
        alpha: 0.5,
        color: 0xff0000,
      }),
      OnHover(
        () => {
          components.HoverEntity.set({ value: entity });
        },
        () => {
          components.HoverEntity.remove();
        }
      ),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      OnRxjsSystem(scene.camera.zoom$, (_, zoom) => {
        let thickness = 3 / zoom;
        thickness = Math.min(10, thickness);

        trajectory.removeComponent(`${entity}-trajectoryline`);

        trajectory.setComponent(
          Line(destinationPixelCoord, {
            id: `${entity}-trajectoryline`,
            thickness,
            alpha: 0.25,
            color: 0x00ffff,
          })
        );
      }),
    ]);

    const fleetIcon = sendTrajectory.add("Graphics", true);
    fleetIcon.setComponents([
      ObjectPosition(originPixelCoord, DepthLayers.Marker),
      Circle(7, {
        color: 0x00ffff,
        id: "fleet",
        borderThickness: 1,
        alpha: 0.75,
      }),
      OnHover(
        () => {
          components.HoverEntity.set({ value: entity });
        },
        () => {
          components.HoverEntity.remove();
        }
      ),
      OnOnce((gameObject) => {
        gameObject.setInteractive(new Phaser.Geom.Rectangle(-32, -32, 64, 64), Phaser.Geom.Rectangle.Contains);
      }),
      OnComponentSystem(components.Time, (gameObject, update) => {
        const now = update.value[0]?.value ?? 0n;
        const timeTraveled = now - arrival.sendTime;
        const totaltime = arrival.arrivalTime - arrival.sendTime;

        const progress = Number(timeTraveled) / Number(totaltime);

        if (playerEntity && progress > 1) {
          //render orbit
          renderEntityOrbitingArrivals(arrival.destination, playerEntity, scene);

          //remove transit render
          scene.objectPool.removeGroup(entity + objIndexSuffix);

          return;
        }

        // Calculate the starting position based on progress
        const startX = originPixelCoord.x + (destinationPixelCoord.x - originPixelCoord.x) * progress;
        const startY = originPixelCoord.y + (destinationPixelCoord.y - originPixelCoord.y) * progress;

        gameObject.x = startX;
        gameObject.y = startY;
        fleetIcon.position = { x: startX, y: startY };
      }),
    ]);
  };

  const query = [
    Has(components.Arrival),
    // Not(components.Pirate)
  ];

  defineEnterSystem(systemsWorld, query, (update) => {
    render(update);
  });

  defineExitSystem(systemsWorld, query, ({ entity }) => {
    const objIndex = entity + objIndexSuffix;

    scene.objectPool.removeGroup(objIndex);
  });
};
