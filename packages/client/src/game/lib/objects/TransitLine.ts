import Phaser from "phaser";

import { PixelCoord } from "engine/types";
import { PrimodiumScene } from "@/game/api/scene";
import { Fleet } from "./Fleet";
import { Entity } from "@latticexyz/recs";
import { TargetLine } from "@/game/lib/objects/TargetLine";

export class TransitLine extends TargetLine {
  private id: Entity;
  private start;
  private end;
  private fleet: Fleet | undefined;

  constructor(args: { id: Entity; scene: PrimodiumScene; start: PixelCoord; end: PixelCoord }) {
    const { id, scene, start, end } = args;
    super(scene, start, end, 0x6ad9d9);

    this.setAlpha(0.25);
    this.start = start;
    this.end = end;

    this.id = id;

    this._scene.objects.transitLine.add(id, this, false);
  }

  setFleet(fleet: Fleet) {
    //make sure the fleet is detached from any other container
    fleet.detach();
    fleet.reset();
    this.fleet = fleet;
    this._setFleetAngleAndPos();
    this.fleet.activateBurn();
    this.fleet.hideStanceIcon();

    return this;
  }

  update() {
    this.fleet?.setScale(Math.max(1, 1 / this._scene.camera.phaserCamera.zoom));
    super.update();
  }

  setCoordinates(start: PixelCoord, end: PixelCoord) {
    this.start = start;
    this.end = end;
    this._setFleetAngleAndPos();
    super.setCoordinates(start, end);
  }

  setFleetProgress(progress: number) {
    if (!this.fleet) return;

    this.scene.tweens.killTweensOf(this.fleet);

    if (progress === 1) {
      this.fleet.setPosition(
        this.start.x + (this.end.x - this.start.x) * progress,
        this.start.y + (this.end.y - this.start.y) * progress
      );
      return;
    }

    this.scene.add.tween({
      targets: this.fleet,
      duration: 500,
      ease: (v: number) => Phaser.Math.Easing.Stepped(v, 5),
      x: this.start.x + (this.end.x - this.start.x) * progress,
      y: this.start.y + (this.end.y - this.start.y) * progress,
    });
  }

  destroy(anim = false) {
    this._scene.objects.transitLine.remove(this.id);

    if (!anim) super.destroy();

    this.scene.add.tween({
      targets: this,
      alpha: 0,
      duration: 200,
      onStart: () => {
        this.setActive(false);
      },
      onComplete: () => {
        super.destroy();
      },
    });
  }

  private _setFleetAngleAndPos() {
    if (!this.fleet) return;

    const angle = Phaser.Math.RadToDeg(Math.atan2(this.end.y - this.start.y, this.end.x - this.start.x)) - 90;
    this.fleet.setAngle(angle);
    this.fleet.setPosition(this.start.x, this.start.y);
  }
}
