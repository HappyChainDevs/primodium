import { Entity } from "@latticexyz/recs";
import { tileCoordToPixelCoord } from "engine/lib/util/coords";
import { Coord } from "engine/types";
import { IPrimodiumGameObject } from "@/game/lib/objects/interfaces";
import { PrimodiumScene } from "@/game/api/scene";
import { renderAsteroid } from "@/game/lib/render/renderAsteroid";
import { initializeSecondaryAsteroids } from "@/game/scenes/starmap/systems/utils/initializeSecondaryAsteroids";

// Create a wrapper for the future asteroid at its coord, to prevent rendering it on launch and causing stutter
// This will be called in the enter system (basically on initial load), create this basic object at the coords, which when
// entering the visible chunk will be spawned, effectively creating the actual asteroid, which will be rendered as well
// This is nothing more than delaying the creation of the asteroid to the first time it needs to be rendered
export class DeferredRenderContainer extends Phaser.GameObjects.Container implements IPrimodiumGameObject {
  private id: Entity;
  private coord: Coord;
  private _scene: PrimodiumScene;
  private spawnsSecondary: boolean;

  constructor(args: { id: Entity; scene: PrimodiumScene; coord: Coord; spawnsSecondary: boolean }) {
    const { id, scene, coord, spawnsSecondary } = args;
    const pixelCoord = tileCoordToPixelCoord(coord, scene.tiled.tileWidth, scene.tiled.tileHeight);
    super(scene.phaserScene, pixelCoord.x, -pixelCoord.y);

    this.id = id;
    this.coord = coord;
    this._scene = scene;
    this.spawnsSecondary = spawnsSecondary;

    this._scene.objects.deferredRenderContainer.add(id, this, true);
  }

  spawn() {
    const asteroid = renderAsteroid({
      scene: this._scene,
      entity: this.id,
      coord: this.coord,
      addEventHandlers: true,
    });

    if (this.spawnsSecondary) initializeSecondaryAsteroids(this.id, this.coord);
    if (!asteroid) return undefined;

    // we need to manually spawn and set the asteroid, since at this point (during `onEnterChunk`) the visible chunks were not yet updated
    // meaning that it might not consider the asteroid visible yet, so it won't actually enter it
    if (!asteroid.isSpawned()) asteroid.spawn();
    asteroid.setActive(true).setVisible(true);

    // we don't need this object anymore: remove, destroy and decrement the count since it won't do it when exiting the chunk as it will not exist anymore
    this._scene.objects.deferredRenderContainer.remove(this.id, true, true);

    return asteroid;
  }

  isSpawned() {
    return false;
  }
}

export const renderDeferredAsteroid = (args: {
  scene: PrimodiumScene;
  entity: Entity;
  coord: Coord;
  spawnsSecondary: boolean;
}) => {
  const { scene, entity, coord, spawnsSecondary } = args;
  return new DeferredRenderContainer({ id: entity, scene, coord, spawnsSecondary });
};
