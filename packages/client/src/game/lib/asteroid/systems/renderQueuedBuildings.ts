import { tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { ComponentUpdate, Has, HasValue, Entity } from "@latticexyz/recs";
import { defineEnterSystem, defineExitSystem, namespaceWorld } from "@latticexyz/recs";
import { Scene } from "engine/types";
import { TransactionQueueType } from "src/util/constants";
import { world } from "src/network/world";
import { components } from "src/network/components";
import { ObjectPosition, OnExitSystem, SetValue } from "../../common/object-components/common";
import { ObjectText } from "../../common/object-components/text";
import { getBuildingDimensions } from "src/util/building";
import { Assets, DepthLayers, SpriteKeys } from "@game/constants";
import { Texture } from "../../common/object-components/sprite";

export const renderQueuedBuildings = (scene: Scene) => {
  const { tileWidth, tileHeight } = scene.tilemap;
  const gameWorld = namespaceWorld(world, "game");
  const objIndexSuffix = "_buildingQueued";

  const query = [
    Has(components.TransactionQueue),
    HasValue(components.TransactionQueue, {
      type: TransactionQueueType.Build,
    }),
  ];

  const render = ({ entity }: ComponentUpdate) => {
    const objIndex = entity + objIndexSuffix;
    const metadata = components.TransactionQueue.getMetadata<TransactionQueueType.Build>(entity);

    if (!metadata) return;

    scene.objectPool.remove(objIndex);
    const constructionGroup = scene.objectPool.getGroup(objIndex);

    const pixelCoord = tileCoordToPixelCoord(metadata.coord, tileWidth, tileHeight);
    const dimensions = getBuildingDimensions(metadata.buildingType);

    const constructionSprite = SpriteKeys[
      `Construction${dimensions.height}x${dimensions.width}` as keyof typeof SpriteKeys
    ] as SpriteKeys | undefined;

    if (!constructionSprite) return;

    const textRenderObject = constructionGroup.add("Text");
    const spriteRenderObject = constructionGroup.add("Sprite");

    textRenderObject.setComponents([
      ObjectPosition(
        {
          x: pixelCoord.x + (tileWidth * dimensions.width) / 2,
          y: -pixelCoord.y + (tileHeight * dimensions.height) / 2,
        },
        DepthLayers.Marker
      ),
      SetValue({
        originY: 0.5,
        originX: 0.5,
        alpha: 0.5,
      }),
      //update text when item on queued is popped
      OnExitSystem([Has(components.TransactionQueue)], () => {
        textRenderObject.setComponent(
          ObjectText(getQueuePositionString(entity), {
            align: "center",
            fontSize: 16,
            backgroundColor: "black",
            color: "cyan",
          })
        );
      }),
      ObjectText(getQueuePositionString(entity), {
        align: "center",
        fontSize: 16,
        backgroundColor: "black",
        color: "cyan",
      }),
    ]);

    spriteRenderObject.setComponents([
      ObjectPosition(
        {
          x: pixelCoord.x,
          y: -pixelCoord.y + dimensions.height * tileHeight,
        },
        DepthLayers.Building - metadata.coord.y + dimensions.height
      ),
      SetValue({
        originY: 1,
      }),
      Texture(Assets.SpriteAtlas, constructionSprite),
    ]);
  };

  defineEnterSystem(gameWorld, query, (update) => {
    render(update);

    console.info("[ENTER SYSTEM](transaction queued)");
  });

  defineExitSystem(gameWorld, query, (update) => {
    const objIndex = update.entity + objIndexSuffix;

    scene.objectPool.removeGroup(objIndex);

    console.info("[EXIT SYSTEM](transaction completed)");
  });
};

const getQueuePositionString = (entity: Entity) => {
  const position = components.TransactionQueue.getIndex(entity);

  return position > 0 ? position.toString() : "*";
};
