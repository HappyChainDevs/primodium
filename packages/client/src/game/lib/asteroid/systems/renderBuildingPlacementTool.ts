import { Assets, DepthLayers, EntityIDtoAnimationKey, EntitytoSpriteKey, SpriteKeys } from "@game/constants";
import { tileCoordToPixelCoord } from "@latticexyz/phaserx";
import {
  ComponentUpdate,
  Entity,
  Has,
  HasValue,
  defineEnterSystem,
  defineExitSystem,
  defineUpdateSystem,
  namespaceWorld,
} from "@latticexyz/recs";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { Scene } from "engine/types";
import { toast } from "react-toastify";
import { components } from "src/network/components";
import { buildBuilding } from "src/network/setup/contractCalls/buildBuilding";
import { MUD } from "src/network/types";
import { world } from "src/network/world";
import { getBuildingDimensions, getBuildingOrigin, validateBuildingPlacement } from "src/util/building";
import { getBlockTypeName } from "src/util/common";
import { Action, BuildingEnumLookup } from "src/util/constants";
import { getRecipe, hasEnoughResources } from "src/util/recipe";
import { ObjectPosition, OnClick, SetValue } from "../../common/object-components/common";
import { Animation, Outline, Texture } from "../../common/object-components/sprite";

export const renderBuildingPlacementTool = (scene: Scene, mud: MUD) => {
  const { tileWidth, tileHeight } = scene.tilemap;
  const gameWorld = namespaceWorld(world, "game");
  const objIndexSuffix = "_buildingPlacement";

  const query = [
    Has(components.HoverTile),
    HasValue(components.SelectedAction, {
      value: Action.PlaceBuilding,
    }),
  ];

  const render = (update: ComponentUpdate) => {
    const objIndex = update.entity + objIndexSuffix;
    const selectedBuilding = components.SelectedBuilding.get()?.value;

    const tileCoord = components.HoverTile.get();

    if (!tileCoord || !selectedBuilding) return;

    const pixelCoord = tileCoordToPixelCoord(tileCoord, tileWidth, tileHeight);

    scene.objectPool.remove(objIndex);

    const buildingTool = scene.objectPool.get(objIndex, "Sprite");

    const sprite = EntitytoSpriteKey[selectedBuilding][0];
    const animation = EntityIDtoAnimationKey[selectedBuilding]
      ? EntityIDtoAnimationKey[selectedBuilding][0]
      : undefined;

    const buildingDimensions = getBuildingDimensions(selectedBuilding);

    const hasEnough = hasEnoughResources(getRecipe(selectedBuilding, 1n));
    const playerEntity = components.Account.get()?.value;
    const validPlacement = validateBuildingPlacement(
      tileCoord,
      selectedBuilding,
      (components.Home.get(playerEntity)?.asteroid as Entity | undefined) ?? singletonEntity
    );

    buildingTool.setComponents([
      ObjectPosition(
        {
          x: pixelCoord.x,
          y: -pixelCoord.y + buildingDimensions.height * tileHeight,
        },
        !validPlacement ? DepthLayers.Building : DepthLayers.Building - tileCoord.y + buildingDimensions.height
      ),
      SetValue({
        alpha: 0.9,
        originY: 1,
        tint: hasEnough ? 0xffffff : 0xff0000,
      }),
      Texture(Assets.SpriteAtlas, sprite ?? SpriteKeys.IronMine1),
      animation ? Animation(animation) : undefined,
      Outline({
        thickness: 3,
        color: hasEnough && validPlacement ? undefined : 0xff0000,
      }),
      OnClick(
        scene,
        (_, pointer) => {
          //remove tooltip on right click
          if (pointer?.rightButtonDown()) {
            components.SelectedAction.remove();
            return;
          }

          if (!hasEnough || !validPlacement) {
            if (!hasEnough) toast.error("Not enough resources to build " + getBlockTypeName(selectedBuilding));
            if (!validPlacement) toast.error("Cannot place building here");
            scene.camera.phaserCamera.shake(200, 0.001);
            return;
          }

          const buildingOrigin = getBuildingOrigin(tileCoord, selectedBuilding);
          if (!buildingOrigin) return;

          buildBuilding(mud, BuildingEnumLookup[selectedBuilding], buildingOrigin);
          components.SelectedAction.remove();
          components.SelectedBuilding.remove();
        },
        true
      ),
    ]);
  };

  defineEnterSystem(gameWorld, query, (update) => {
    render(update);

    console.info("[ENTER SYSTEM](renderBuildingPlacement) Building placement tool has been added");
  });

  defineUpdateSystem(gameWorld, query, render);

  defineExitSystem(gameWorld, query, (update) => {
    const objIndex = update.entity + objIndexSuffix;

    scene.objectPool.remove(objIndex);

    console.info("[EXIT SYSTEM](renderBuildingPlacement) Building placement tool has been removed");
  });
};
