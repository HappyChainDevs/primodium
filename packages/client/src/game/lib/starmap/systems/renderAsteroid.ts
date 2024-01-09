import { Assets, DepthLayers, EntitytoSpriteKey, SpriteKeys } from "@game/constants";
import { Entity, Has, Not, defineEnterSystem, namespaceWorld } from "@latticexyz/recs";
import { Coord } from "@latticexyz/utils";
import { Scene } from "engine/types";
import { throttleTime } from "rxjs";
import { components } from "src/network/components";
import { SetupResult } from "src/network/types";
import { singletonIndex, world } from "src/network/world";
import { entityToColor } from "src/util/color";
import { clampedIndex, entityToAddress, getRandomRange } from "src/util/common";
import { EntityType, RockRelationship } from "src/util/constants";
import { entityToPlayerName } from "src/util/name";
import { getRockRelationship } from "src/util/spacerock";
import { getLinkedAddress } from "src/util/web2/getLinkedAddress";
import {
  ObjectPosition,
  OnClick,
  OnComponentSystem,
  OnHover,
  OnOnce,
  OnRxjsSystem,
  SetValue,
  Tween,
} from "../../common/object-components/common";
import { Outline, Texture } from "../../common/object-components/sprite";
import { ObjectText } from "../../common/object-components/text";

export const renderAsteroid = (scene: Scene, mud: SetupResult) => {
  const { tileWidth, tileHeight } = scene.tilemap;
  const gameWorld = namespaceWorld(world, "game");
  const playerEntity = mud.network.playerEntity;

  const render = (entity: Entity, coord: Coord) => {
    scene.objectPool.removeGroup("asteroid_" + entity);

    //TODO - fix conversion to Entity
    const ownedBy = components.OwnedBy.get(entity, {
      value: singletonIndex,
    }).value as Entity;

    const mainBaseEntity = components.Home.get(ownedBy, {
      mainBase: "-1" as Entity,
      asteroid: "-1" as Entity,
    }).mainBase as Entity;

    const mainBaseLevel = components.Level.get(mainBaseEntity, {
      value: 1n,
    }).value;

    const asteroidObjectGroup = scene.objectPool.getGroup("asteroid_" + entity);

    const spriteScale = 0.8;

    const sharedComponents = [
      ObjectPosition({
        x: coord.x * tileWidth,
        y: -coord.y * tileHeight,
      }),
      SetValue({
        originX: 0.5,
        originY: 0.5,
        scale: spriteScale,
      }),
      Tween(scene, {
        scale: { from: spriteScale - getRandomRange(0, 0.05), to: spriteScale + getRandomRange(0, 0.05) },
        ease: "Sine.easeInOut",
        hold: getRandomRange(0, 1000),
        duration: 5000, // Duration of one wobble
        yoyo: true, // Go back to original scale
        repeat: -1, // Repeat indefinitely
      }),
      Tween(scene, {
        scrollFactorX: { from: 1 - getRandomRange(0, 0.0025), to: 1 + getRandomRange(0, 0.0025) },
        ease: "Sine.easeInOut",
        hold: getRandomRange(0, 1000),
        duration: 5000, // Duration of one wobble
        yoyo: true, // Go back to original scale
        repeat: -1, // Repeat indefinitely
      }),
      Tween(scene, {
        scrollFactorY: { from: 1 - getRandomRange(0, 0.0025), to: 1 + getRandomRange(0, 0.0025) },
        ease: "Sine.easeInOut",
        hold: getRandomRange(0, 1000),
        duration: 5000, // Duration of one wobble
        yoyo: true, // Go back to original scale
        repeat: -1, // Repeat indefinitely
      }),
    ];

    const rotationTween = Tween(scene, {
      rotation: { from: -getRandomRange(0, Math.PI / 8), to: getRandomRange(0, Math.PI / 8) },
      // ease: "Sine.easeInOut",
      hold: getRandomRange(0, 10000),
      duration: 5 * 1000, // Duration of one wobble
      yoyo: true, // Go back to original scale
      repeat: -1, // Repeat indefinitely
    });

    const asteroidObject = asteroidObjectGroup.add("Sprite");

    asteroidObject.setComponents([
      ...sharedComponents,
      rotationTween,
      Texture(
        Assets.SpriteAtlas,
        EntitytoSpriteKey[EntityType.Asteroid][
          clampedIndex(Number(mainBaseLevel) - 1, EntitytoSpriteKey[EntityType.Asteroid].length)
        ]
      ),
      SetValue({
        depth: DepthLayers.Rock,
      }),
    ]);

    const asteroidOutline = asteroidObjectGroup.add("Sprite");
    asteroidOutline.setComponents([
      ...sharedComponents,
      rotationTween,
      OnComponentSystem(components.SelectedRock, () => {
        if (components.SelectedRock.get()?.value === entity) {
          if (asteroidOutline.hasComponent(Outline().id)) return;
          asteroidOutline.setComponent(Outline({ thickness: 1.5, color: 0xffa500 }));
          return;
        }

        if (asteroidOutline.hasComponent(Outline().id)) {
          asteroidOutline.removeComponent(Outline().id);
        }
      }),
      OnComponentSystem(components.PlayerAlliance, (_, { entity: _entity }) => {
        if (ownedBy !== _entity && playerEntity !== _entity) return;

        asteroidOutline.setComponent(Texture(Assets.SpriteAtlas, getOutlineSprite(playerEntity, entity)));
      }),
      Texture(Assets.SpriteAtlas, getOutlineSprite(playerEntity, entity)),
      OnClick(scene, () => {
        components.Send.setDestination(entity);
        components.SelectedRock.set({ value: entity });
      }),
      OnHover(
        () => {
          components.HoverEntity.set({ value: entity });
        },
        () => {
          components.HoverEntity.remove();
        }
      ),
      SetValue({
        depth: DepthLayers.Rock + 1,
      }),
    ]);

    const gracePeriod = asteroidObjectGroup.add("Sprite");

    gracePeriod.setComponents([
      ...sharedComponents,
      rotationTween,
      OnComponentSystem(components.Time, (gameObject) => {
        const player = components.OwnedBy.get(entity)?.value as Entity | undefined;
        const graceTime = components.GracePeriod.get(player)?.value ?? 0n;
        const time = components.Time.get()?.value ?? 0n;

        if (time >= graceTime) {
          gameObject.alpha = 0;
        } else {
          gameObject.alpha = 0.8;
        }
      }),
      Texture(Assets.SpriteAtlas, SpriteKeys.GracePeriod),
      SetValue({
        depth: DepthLayers.Marker,
        input: null,
      }),
    ]);

    const asteroidLabel = asteroidObjectGroup.add("BitmapText");

    asteroidLabel.setComponents([
      ...sharedComponents,
      SetValue({
        originX: 0.5,
        originY: -3,
        depth: DepthLayers.Marker,
      }),
      ObjectText(entityToPlayerName(ownedBy), {
        id: "addressLabel",
        fontSize: Math.max(8, Math.min(44, 16 / scene.camera.phaserCamera.zoom)),
        color: parseInt(entityToColor(ownedBy).slice(1), 16),
      }),
      OnOnce(async (gameObject) => {
        const linkedAddress = await getLinkedAddress(entityToAddress(ownedBy));

        const name =
          linkedAddress.ensName ??
          (linkedAddress.address
            ? entityToAddress(linkedAddress.address ?? ownedBy, true)
            : entityToPlayerName(ownedBy));

        gameObject.setText(name);
        gameObject.setFontSize(Math.max(8, Math.min(44, 16 / scene.camera.phaserCamera.zoom)));
      }),
      OnRxjsSystem(
        // @ts-ignore
        scene.camera.zoom$.pipe(throttleTime(10)),
        (gameObject, zoom) => {
          const mapOpen = components.MapOpen.get()?.value ?? false;

          if (!mapOpen) return;

          const size = Math.max(8, Math.min(44, 16 / zoom));

          gameObject.setFontSize(size);
        }
      ),
    ]);
  };

  const query = [
    Has(components.Asteroid),
    Has(components.Position),
    Has(components.OwnedBy),
    Not(components.PirateAsteroid),
  ];

  defineEnterSystem(gameWorld, query, ({ entity }) => {
    const coord = components.Position.get(entity);

    if (!coord) return;

    render(entity, coord);
  });
};

const getOutlineSprite = (playerEntity: Entity, rock: Entity) => {
  const rockRelationship = getRockRelationship(playerEntity, rock);

  return SpriteKeys[
    `Asteroid${
      {
        [RockRelationship.Ally]: "Alliance",
        [RockRelationship.Enemy]: "Enemy",
        [RockRelationship.Neutral]: "Enemy",
        [RockRelationship.Self]: "Player",
      }[rockRelationship]
    }` as keyof typeof SpriteKeys
  ];
};
