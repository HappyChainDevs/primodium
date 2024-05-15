import { Coord } from "engine/types";
import { PrimodiumScene } from "@/game/api/scene";
import { BaseAsteroid } from "./BaseAsteroid";
import { DepthLayers } from "@/game/lib/constants/common";
import { Entity } from "@latticexyz/recs";
import { LODs } from "@/game/lib/objects/Asteroid/helpers";
import { Animations, Sprites } from "@primodiumxyz/assets";

export class ShardAsteroid extends BaseAsteroid {
  constructor(args: { id: Entity; scene: PrimodiumScene; coord: Coord }) {
    const { id, scene, coord } = args;
    super({ id, scene, coord, sprite: Sprites.Shard, outlineSprite: Sprites.AegisDrone });
    this.asteroidSprite.postFX?.addShine();
    this.asteroidLabel.setProperties({
      emblemSprite: Sprites.ShardIcon,
      nameLabel: "Shard",
      nameLabelColor: 0xffc0cb,
      ownerLabel: "shard",
    });
    this.setDepth(DepthLayers.Marker);
    this.setScale(0.75);
  }

  spawn() {
    super.spawn();
    return this;
  }

  getLod(zoom: number) {
    if (zoom >= 0.75) {
      return LODs.FullyShow;
    }
    if (zoom >= 0) {
      return LODs.ShowLabelOnly;
    }

    return 0;
  }

  explode() {
    console.log("ShardAsteroid.explode");
    const animation = Animations.ShardExplosionDefault;
    this.asteroidSprite.anims.stop();
    this.asteroidSprite.play(animation);
  }
}
