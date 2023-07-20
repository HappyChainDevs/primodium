import { Perlin } from "@latticexyz/noise";
import { addCoords } from "@latticexyz/phaserx";
import {
  EntityID,
  Has,
  HasValue,
  Metadata,
  World,
  removeComponent,
  runQuery,
} from "@latticexyz/recs";
import { Coord } from "@latticexyz/utils";
import { Options, StringComponent } from "./Component";
import {
  getBuildingsOfTypeInRange,
  getTilesOfTypeInRange,
} from "src/util/tile";
import { Position } from "../clientComponents";

class MarkerTypeComponent<M extends Metadata> extends StringComponent<M> {
  constructor(world: World, options?: Options<M>) {
    super(world, options);
  }

  public target = async (
    tile: EntityID,
    type: EntityID,
    origin: Coord,
    range: number,
    excludeRange: number = 0,
    offset: Coord = { x: 0, y: 0 },
    perlin: Perlin
  ) => {
    const tiles = getTilesOfTypeInRange(
      origin,
      tile,
      range,
      excludeRange,
      perlin
    );

    const buildings = getBuildingsOfTypeInRange(origin, tile, range);

    //handle terrain
    for (const tile of tiles) {
      Position.set(addCoords(tile, offset), type);
    }

    //handle buildings
    for (const building of buildings) {
      Position.set(addCoords(building, offset), type);
    }
  };

  public getByCoord = (coord: Coord) => {
    const entities = runQuery([Has(this.component), HasValue(Position, coord)]);

    return entities;
  };

  public removeAllAtCoord = (coord: Coord) => {
    const entities = runQuery([HasValue(Position, coord), Has(this.component)]);

    const entityIndex = entities.values().next().value;

    removeComponent(this.component, entityIndex);
  };
}

export default MarkerTypeComponent;
