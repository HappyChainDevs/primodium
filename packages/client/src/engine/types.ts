import { Coord } from "@latticexyz/utils";
import { GameObjectClasses } from "./constants";
import { createObjectPool } from "./lib/core/createObjectPool";
import { Animation } from "@latticexyz/phaserx/dist/types";
import { createGame } from "./lib/core/createGame";
import { createScene } from "./lib/core/createScene";
import { createAnimatedTilemap } from "@latticexyz/phaserx";
import { Assets } from "../game/constants";

export type Game = Awaited<ReturnType<typeof createGame>>;
export type Scene = Awaited<ReturnType<typeof createScene>>;

export type CameraConfig = {
  pinchSpeed: number;
  wheelSpeed: number;
  minZoom: number;
  maxZoom: number;
  dragSpeed: number;
  defaultZoom: number;
};

export type GameConfig = Phaser.Types.Core.GameConfig;

export type TilesetConfig = {
  [x: string]: {
    key: Assets;
    tileWidth: number;
    tileHeight: number;
    extrusion?: number;
  };
};

export interface SceneConfig {
  key: string;
  assetPackUrl: string;
  camera: {
    minZoom: number;
    maxZoom: number;
    pinchSpeed: number;
    scrollSpeed: number;
    defaultZoom: number;
    dragSpeed: number;
  };
  animations?: Animation<any>[];
  cullingChunkSize: number;
  tilemap: {
    tileAnimations?: TileAnimation[];
    chunkSize: number;
    tileWidth: number;
    tileHeight: number;
    tilesets: TilesetConfig;
    layerConfig: Parameters<typeof createAnimatedTilemap>[0]["layerConfig"];
    backgroundTile: [number, ...number[]];
    animationInterval: number;
  };
}

export interface TileAnimation {
  key: string;
  frames: number[];
}

export type GameObjectTypes = typeof GameObjectClasses;
export type GameObject<Type extends keyof GameObjectTypes> = InstanceType<
  GameObjectTypes[Type]
>;

/**
 * @id: Unique id of the component to handle updating the same component
 * @now: Use for things like visual effects that are only relevant in this moment
 * @once: Use for setting parameters that should be set when initializing
 * @update: Use for adding update functions that are called at every game tick
 */
export type GameObjectComponent<Type extends keyof GameObjectTypes> = {
  id: string;
  now?: GameObjectFunction<Type>;
  once?: GameObjectFunction<Type>;
  update?: GameObjectFunction<Type>;
};

export declare type ObjectPool = ReturnType<typeof createObjectPool>;

export type GameObjectFunction<Type extends keyof GameObjectTypes> = (
  gameObject: GameObject<Type>,
  time: number,
  delta: number
) => Promise<void> | void;

export type EmbodiedEntity<Type extends keyof GameObjectTypes> = {
  setComponent: (component: GameObjectComponent<Type>) => void;
  hasComponent: (id: string) => boolean;
  removeComponent: (id: string, stop?: boolean) => void;
  spawn: () => void;
  despawn: () => void;
  position: Coord;
  id: string;
  setCameraFilter: (filter: number) => void;
  type: Type;
};
