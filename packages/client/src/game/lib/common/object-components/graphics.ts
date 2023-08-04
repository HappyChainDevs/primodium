import { Coord } from "@latticexyz/utils";
import { GameObjectComponent } from "engine/types";

const drawPath = (
  gameObject: Phaser.GameObjects.Graphics,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  color: number,
  lineWidth: number
) => {
  gameObject.lineStyle(lineWidth, color, 0.7);
  gameObject.moveTo(0, 0);
  gameObject.lineTo(0, endY - startY);
  gameObject.lineTo(endX - startX, endY - startY);
  gameObject.stroke();
};

export const GraphicsManhattanPath = (
  desitination: Coord
): GameObjectComponent<"Graphics"> => {
  return {
    id: "manhattan-line",
    once: (gameObject) => {
      drawPath(
        gameObject,
        gameObject.x,
        gameObject.y,
        desitination.x,
        desitination.y,
        0xffffff,
        1.5
      );
    },
  };
};
