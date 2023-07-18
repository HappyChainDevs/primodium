import { memo, useMemo } from "react";

import { useEntityQuery } from "@latticexyz/react";
import { EntityID, Has, HasValue, getComponentValue } from "@latticexyz/recs";
import { useComponentValue } from "../hooks/useComponentValue";

import { ImageOverlay } from "react-leaflet";

import { useMud } from "../context/MudContext";
import { BackgroundImage } from "../util/constants";
import Path from "./Path";

// tileKey prop is the default terrain beneath any building on top.
function ResourceTile({
  x,
  y,
  terrain,
  resource,
  pane = "tilePane",
}: {
  x: number;
  y: number;
  terrain: EntityID;
  resource: EntityID | null;
  pane: string;
}) {
  const { world, components, singletonIndex } = useMud();

  // Get tile information
  const tilesAtPosition = useEntityQuery(
    [
      Has(components.BuildingType),
      HasValue(components.Position, { x: x, y: y }),
    ],
    { updateOnValueChange: true }
  );

  const tile = useComponentValue(
    components.BuildingType,
    tilesAtPosition.length > 0 ? tilesAtPosition[0] : singletonIndex,
    { value: "" }
  ).value;

  let buildingKey: EntityID | undefined;
  if (tilesAtPosition.length > 0 && tilesAtPosition[0] && tile) {
    buildingKey = tile as EntityID;
  }

  const path = useComponentValue(
    components.Path,
    tilesAtPosition.length > 0 ? tilesAtPosition[0] : singletonIndex
  );

  // Get the tile at the end of the conveyor path.
  const endPathTile = useComponentValue(
    components.Position,
    path
      ? world.entityToIndex.get(path.value.toString() as EntityID)
      : singletonIndex
  );

  // Get all conveyor paths that end at this tile.
  const endingConveyorPaths = useEntityQuery(
    [
      Has(components.Path),
      HasValue(components.Path, {
        value:
          tilesAtPosition.length > 0
            ? world.entities[tilesAtPosition[0]]
            : undefined,
      }),
    ],
    { updateOnValueChange: true }
  );

  // Get the conveyor path that start at this tile.
  const pathsToRender: JSX.Element[] = useMemo(() => {
    const curPathsToRender: JSX.Element[] = [];

    if (path && endPathTile) {
      // Path that starts at the current selected tile
      curPathsToRender.push(
        <Path key="curTile" startCoord={{ x, y }} endCoord={endPathTile} />
      );
    }

    endingConveyorPaths.map((item) => {
      // Paths that ends at the current tile
      const currentStartTile = getComponentValue(components.Position, item);
      if (currentStartTile) {
        curPathsToRender.push(
          <Path
            key={JSON.stringify({
              start: currentStartTile,
              end: { x, y },
            })}
            startCoord={currentStartTile}
            endCoord={{ x, y }}
          ></Path>
        );
      }
    });

    return curPathsToRender;
  }, [endPathTile, endingConveyorPaths, path, x, y]);

  //!!Used for setting an image background!!
  const terrainBackground = BackgroundImage.get(terrain as EntityID);
  const resourceBackground = BackgroundImage.get(resource as EntityID);

  return (
    <>
      {/* !!setting an image background!! */}
      {buildingKey && (
        <ImageOverlay
          className="pixel-images"
          bounds={[
            [y, x],
            [y + 1, x + 1],
          ]}
          url={BackgroundImage.get(buildingKey as EntityID)!}
          zIndex={11}
          pane={pane}
        />
      )}
      {resource && !buildingKey && (
        <ImageOverlay
          className="pixel-images"
          bounds={[
            [y, x],
            [y + 1, x + 1],
          ]}
          url={resourceBackground!}
          zIndex={11}
          pane={pane}
        />
      )}
      {!buildingKey && (
        <ImageOverlay
          className="pixel-images"
          bounds={[
            [y, x],
            [y + 1, x + 1],
          ]}
          url={terrainBackground!}
          zIndex={10}
          pane={pane}
        />
      )}
      {pathsToRender}
    </>
  );
}

export default memo(ResourceTile);
