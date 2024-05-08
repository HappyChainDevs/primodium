import { Coord } from "@latticexyz/utils";
import { SceneApi } from "@/game/api/scene";
import { BaseAsteroid } from "./BaseAsteroid";
import { getSecondaryOutlineSprite, getSecondarySprite } from "./helpers";
import { Entity } from "@latticexyz/recs";
import { AsteroidRelationship } from "../../constants/common";

export class SecondaryAsteroid extends BaseAsteroid {
  private maxLevel: bigint;
  constructor(args: {
    id: Entity;
    scene: SceneApi;
    coord: Coord;
    resourceType: Entity;
    maxLevel: bigint;
    relationship: AsteroidRelationship;
  }) {
    const { id, scene, coord, resourceType, maxLevel, relationship = "Neutral" } = args;
    super({
      id,
      scene,
      coord,
      sprite: getSecondarySprite(resourceType, maxLevel),
      outlineSprite: getSecondaryOutlineSprite(relationship, maxLevel),
    });

    this._scene = scene;
    this.maxLevel = maxLevel;
    this.getAsteroidLabel().setBaseScale(0.75);
  }

  spawn() {
    super.spawn();
    this.setLOD(2, true);
    return this;
  }

  // setRelationship(relationship: AsteroidRelationship) {
  //   this.outlineSprite.setTexture(getSecondaryOutlineSprite(relationship, this.maxLevel));
  // }

  update() {
    super.update();
    const zoom = this._scene.camera.phaserCamera.zoom;
    const minZoom = this._scene.config.camera.minZoom;
    const maxZoom = this._scene.config.camera.maxZoom;

    // Normalize the zoom level
    const normalizedZoom = (zoom - minZoom) / (maxZoom - minZoom);

    if (normalizedZoom >= 0.1) {
      this.setLOD(0);
      return;
    }
    if (normalizedZoom >= 0.05) {
      this.setLOD(1);
      return;
    }
    if (normalizedZoom >= 0) {
      this.setLOD(2);
      return;
    }
  }
}
