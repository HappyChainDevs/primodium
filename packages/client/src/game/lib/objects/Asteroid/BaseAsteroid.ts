import { Coord, Scene } from "engine/types";
import { IPrimodiumGameObject } from "../interfaces";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { AsteroidRelationship } from "../../constants/common";
import { OrbitRing } from "./OrbitRing";
import { Assets, Sprites } from "@primodiumxyz/assets";
import { AsteroidLabel } from "@/game/lib/objects/Asteroid/AsteroidLabel";

export abstract class BaseAsteroid extends Phaser.GameObjects.Container implements IPrimodiumGameObject {
  protected coord: Coord;
  protected _scene: Scene;
  protected fleetCount = 0;
  protected spawned = false;
  protected asteroidSprite: Phaser.GameObjects.Image;
  protected outlineSprite: Phaser.GameObjects.Image;
  protected asteroidLabel: AsteroidLabel;
  protected orbitRing: OrbitRing;
  protected currentLOD: number = 0;
  private circle: Phaser.GameObjects.Arc;

  constructor(args: { scene: Scene; coord: Coord; sprite: Sprites; outlineSprite: Sprites }) {
    const { scene, coord, sprite, outlineSprite } = args;
    const pixelCoord = tileCoordToPixelCoord(coord, scene.tiled.tileWidth, scene.tiled.tileHeight);
    super(scene.phaserScene, pixelCoord.x, -pixelCoord.y);

    this.outlineSprite = new Phaser.GameObjects.Image(scene.phaserScene, 0, 0, Assets.SpriteAtlas, outlineSprite);
    this.asteroidSprite = new Phaser.GameObjects.Image(scene.phaserScene, 0, 0, Assets.SpriteAtlas, sprite);
    this.asteroidLabel = new AsteroidLabel({
      scene,
      coord: { x: 0, y: 0 },
    });
    this.circle = new Phaser.GameObjects.Arc(scene.phaserScene, 0, 0, 2, 0, 360, false, 0xffffff, 0.5);
    this.orbitRing = new OrbitRing(scene, { x: 0, y: 0 });

    this.coord = coord;
    this._scene = scene;
    this.setSize(this.outlineSprite.width, this.outlineSprite.height).setInteractive();
  }

  spawn() {
    this.add([this.circle, this.asteroidSprite, this.outlineSprite, this.orbitRing, this.asteroidLabel]);
    this.spawned = true;
    this.scene.add.existing(this);
    return this;
  }

  setScale(x?: number, y?: number) {
    this.asteroidSprite.setScale(x, y);
    this.outlineSprite.setScale(x, y);
    return this;
  }

  setTilePosition(coord: Coord) {
    this.coord = coord;
    const pixelCoord = tileCoordToPixelCoord(coord, this._scene.tiled.tileWidth, this._scene.tiled.tileHeight);
    this.setPosition(pixelCoord.x, -pixelCoord.y);
    return this;
  }

  isSpawned() {
    return this.spawned;
  }

  getCoord() {
    return this.coord;
  }

  getOrbitRing() {
    return this.orbitRing;
  }

  getAsteroidLabel() {
    return this.asteroidLabel;
  }

  abstract setRelationship(relationship: AsteroidRelationship): void;

  protected setLOD(level: number) {
    if (this.currentLOD === level) return;

    this.currentLOD = level;
    let asteroidAlpha = 1;
    let asteroidLabelPosition = { x: 0, y: 0 };
    let asteroidLabelAlpha = 1;

    switch (level) {
      // LOD 0: Show asteroid and label
      case 0:
        asteroidAlpha = 1;
        asteroidLabelPosition = { x: 32, y: -16 };
        break;
      // LOD 1: Show asteroid only
      case 1:
        asteroidAlpha = 0;
        asteroidLabelPosition = { x: 0, y: 0 };
        break;
      // LOD 2: Hide asteroid and label
      case 2:
        asteroidAlpha = 0;
        asteroidLabelPosition = { x: 0, y: 0 };
        asteroidLabelAlpha = 0;
        break;
      default:
        console.warn("Invalid LOD level");
        return;
    }

    this.scene.add.tween({
      targets: [this.asteroidSprite, this.outlineSprite, this.orbitRing],
      alpha: asteroidAlpha,
      duration: 200,
      ease: "Linear",
    });

    this.scene.add.tween({
      targets: this.asteroidLabel,
      alpha: asteroidLabelAlpha,
      duration: 200,
      ease: "Linear",
    });

    this.scene.add.tween({
      targets: this.asteroidLabel,
      x: asteroidLabelPosition.x,
      y: asteroidLabelPosition.y,
      duration: 200,
      ease: "Linear",
    });
  }

  update() {
    const zoom = this._scene.camera.phaserCamera.zoom;
    this.orbitRing.update();
    this.asteroidLabel.update();
    this.circle.setScale(1 / zoom);
  }

  dispose() {
    this.destroy();
  }
}
