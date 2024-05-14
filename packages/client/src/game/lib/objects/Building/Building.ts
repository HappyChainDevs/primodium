import Phaser from "phaser";
import { Entity } from "@latticexyz/recs";
import { Coord } from "engine/types";
import { PrimodiumScene } from "@/game/api/scene";
import { getAssetKeyPair } from "./helpers";
import { DepthLayers } from "../../constants/common";
import { IPrimodiumGameObject } from "../interfaces";
import { Assets } from "@primodiumxyz/assets";
import { triggerPlacementAnim } from "@/game/lib/objects/Building/triggerPlacementAnim";

export class Building extends Phaser.GameObjects.Sprite implements IPrimodiumGameObject {
  private id: Entity;
  private buildingType: Entity;
  private coord: Coord;
  private _scene: PrimodiumScene;
  private level = 1n;
  private spawned = false;

  constructor(args: { id: Entity; scene: PrimodiumScene; buildingType: Entity; coord: Coord }) {
    const { id, scene, buildingType, coord } = args;
    const assetPair = getAssetKeyPair(1n, buildingType);
    const pixelCoord = scene.utils.tileCoordToPixelCoord(coord);
    super(
      scene.phaserScene,
      pixelCoord.x,
      -pixelCoord.y + scene.tiled.tileHeight,
      Assets.SpriteAtlas,
      assetPair.sprite
    );

    this.id = id;
    assetPair.animation && this.play(assetPair.animation);
    this.setOrigin(0, 1);
    this.setDepth(DepthLayers.Building - coord.y);
    this.setInteractive();

    this.buildingType = buildingType;
    this.coord = coord;
    this._scene = scene;

    //add to object pool
    this._scene.objects.building.add(id, this);
  }

  spawn() {
    //TODO: placement animation

    this.scene.add.existing(this);
    this.spawned = true;
    return this;
  }

  isSpawned() {
    return this.spawned;
  }

  triggerPlacementAnim() {
    triggerPlacementAnim(this._scene, this.id, this.coord);
  }

  getCoord() {
    return this.coord;
  }

  setCoordPosition(coord: Coord) {
    const pixelCoord = this._scene.utils.tileCoordToPixelCoord(coord);
    super.setPosition(pixelCoord.x, -pixelCoord.y + this._scene.tiled.tileHeight);
    this.coord = coord;
    return this;
  }

  setActive(active: boolean) {
    if (active) {
      this.setTint(0xffffff);
      this.anims.resume();
      return this;
    }

    this.setTint(0x777777);
    this.anims.pause();
    return this;
  }
  setLevel(level: bigint) {
    this.level = level;
    const assetPair = getAssetKeyPair(level, this.buildingType);
    this.setTexture(Assets.SpriteAtlas, assetPair.sprite);
    //TODO: level up animation
    this.anims.stop();
    assetPair.animation && this.play(assetPair.animation);

    return this;
  }

  setBuildingType(buildingType: Entity) {
    this.buildingType = buildingType;
    const assetPair = getAssetKeyPair(this.level, buildingType);
    this.setTexture(Assets.SpriteAtlas, assetPair.sprite);
    this.anims.stop();
    assetPair.animation && this.play(assetPair.animation);
    return this;
  }

  setOutline = (color: number, thickness: number, knockout = false) => {
    this.postFX?.addGlow(color, thickness, undefined, knockout);

    return this;
  };

  clearOutline = () => {
    this.postFX?.clear();

    return this;
  };

  destroy() {
    //TODO: despawn animation

    this._scene.objects.building.remove(this.id);
    super.destroy();
  }
}
