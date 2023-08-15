import { EntityID } from "@latticexyz/recs";
import { BlockType } from "../util/constants";

export const ASSET_PACK = "/assets/pack.json";
export namespace AsteroidMap {
  export const TILE_HEIGHT = 16;
  export const TILE_WIDTH = 16;
  export const RENDER_INTERVAL = 30;
  export const ANIMATION_INTERVAL = 200;
  export const KEY = "ASTEROID_MAP";

  export enum Scenes {
    Root = "ROOT",
    Main = "MAIN",
  }

  export enum Assets {
    SpriteAtlas = "sprite-atlas",
    ResourceTileset = "resource-tileset",
    TerrainTileset = "terrain-tileset",
  }

  export enum Tilesets {
    Terrain = "Terrain",
    Resource = "Resource",
  }

  export enum DepthLayers {
    Terrain = 0,
    Building = 10,
    Path = 20,
    Tooltip = 30,
    Marker = 40,
  }

  export enum TerrainTilekeys {
    Air,
    Alluvium,
    Bedrock,
    Biofilm,
    Regolith,
    Sandstone,
    Water,
  }

  export enum ResourceTilekeys {
    Bolutite,
    Copper,
    Iridium,
    Iron,
    Kimberlite,
    Lithium,
    Osmium,
    Titanium,
    Tungsten,
    Uraninite,
  }

  export const TileKeys = { ...TerrainTilekeys, ...ResourceTilekeys };

  export enum TileAnimationKeys {
    Water = "Water",
  }

  export enum SpriteKeys {
    Mainbase1 = "sprites/mainbase/level1/bigmainbase-level1-0.png",
    Mainbase2 = "sprites/mainbase/level2/bigmainbase-level2-0.png",
    Mainbase3 = "sprites/mainbase/level3/bigmainbase-level3-0.png",
    Mainbase4 = "sprites/mainbase/level4/bigmainbase-level4-0.png",
    Mainbase5 = "sprites/mainbase/level5/bigmainbase-level5-0.png",

    IronMine1 = "sprites/ironmine/level1/iron-miner-0.png",
    IronMine2 = "sprites/ironmine/level2/iron-miner-level2-0.png",
    IronMine3 = "sprites/ironmine/level3/iron-miner-level3-0.png",

    CopperMine1 = "sprites/coppermine/level1/copper-miner-0.png",
    CopperMine2 = "sprites/coppermine/level2/copper-miner-level2-0.png",
    CopperMine3 = "sprites/coppermine/level3/copper-miner-level3-0.png",

    LithiumMine1 = "sprites/lithiummine/level1/lithium-miner-0.png",
    LithiumMine2 = "sprites/lithiummine/level2/lithium-miner-level2-0.png",
    LithiumMine3 = "sprites/lithiummine/level3/lithium-miner-level3-0.png",

    StorageUnit1 = "sprites/storageunit/level1/storagefacility-level1-0.png",
    StorageUnit2 = "sprites/storageunit/level2/storagefacility-level2-0.png",

    IronPlateFactory1 = "sprites/ironplatefactory/level1/platingfactory-level1-0.png",
    IronPlateFactory2 = "sprites/ironplatefactory/level2/platingfactory-level2-0.png",

    AlloyFactory1 = "sprites/alloyfactory/level1/alloyfactory-level1-0.png",

    PropulsionFuelFactory = "sprites/propulsionfuelfactory/propulsionfuelfactory-0.png",

    SolarPanel1 = "sprites/solarpanel/level1/solarpanel-level1-0.png",
    SolarPanel2 = "sprites/solarpanel/level2/solarpanel-level2-0.png",

    PhotovoltaicCellFactory1 = "sprites/pvcfactory/level1/pvcfactory-level1-0.png",
    PhotovoltaicCellFactory2 = "sprites/pvcfactory/level2/pvcfactory-level2-0.png",

    Node = "sprites/node/node-0.png",
    BasicMiner = "sprites/minerdrill/minerdrill-0.png",
    Miner = "sprites/miner/miner.png",
    BasicBatteryFactory = "sprites/basicbatteryfactory/basicbatteryfactory-0.png",
    AdvancedBatteryFactory = "sprites/advancedbatteryfactory/advancedbatteryfactory-0.png",
    BulletFactory = "sprites/bulletfactory/bulletfactory.png",
    DenseMetalRefinery = "sprites/densemetalrefinery/densemetalrefinery-0.png",
    HardenedDrill = "sprites/hardeneddrill/hardeneddrill-0.png",
    HighTempFoundry = "sprites/hightempfoundry/hightempfoundry-0.png",
    IridiumDrillBitFactory = "sprites/iridiumdrillbitfactory/iridiumdrillbitfactory-0.png",
    KimberliteCatalyst = "sprites/kimberlitecatalyst/kimberlitecatalyst-0.png",
    KineticMissileFactory = "kineticmissilefactory/kineticmissilefactory.png",
    LaserFactory = "sprites/laserfactory/laserfactory-0.png",
    MissileLaunchComplex = "sprites/missilelaunchcomplex/missilelaunchcomplex-0.png",
    PlatingFactory = "sprites/platingfactory/platingfactory-0.png",
    PrecisionMachineryFactory = "sprites/precisionmachineryfactory/precisionmachineryfactory-0.png",
    PrecisionPneumaticDrill = "sprites/precisionpneumaticdrill/precisionpneumaticdrill-0.png",
    ProjectileLauncher = "sprites/projectilelauncher/projectilelauncher.png",
    Silo = "sprites/silo/silo.png",
    ThermobaricMissileFactory = "sprites/thermobaricmissilefactory/thermobaricmissilefactory.png",
    ThermobaricWarheadFactory = "sprites/thermobaricwarheadfactory/thermobaricwarheadfactory.png",
  }

  export enum AnimationKeys {
    IronMine1 = "ironmine/level1",
    IronMine2 = "ironmine/level2",

    CopperMine1 = "coppermine/level1",
    CopperMine2 = "coppermine/level2",

    LithiumMine1 = "lithiummine/level1",
    LithiumMine2 = "lithiummine/level2",

    StorageUnit1 = "storageunit/level1",
    StorageUnit2 = "storageunit/level2",

    IronPlateFactory1 = "ironplatefactory/level1",
    IronPlateFactory2 = "ironplatefactory/level2",

    AlloyFactory1 = "alloyfactory/level1",

    PhotovoltaicCellFactory1 = "pvcfactory/level1",
    PhotovoltaicCellFactory2 = "pvcfactory/level2",

    Node = "node",
    AdvancedBatteryFactory = "advancedbatteryfactory",
    BasicBatteryFactory = "basicbatteryfactory",
    BasicMiner = "minerdrill",
    DenseMetalRefinery = "densemetalrefinery",
    HardenedDrill = "hardeneddrill",
    Hightempfoundry = "hightempfoundry",
    IridiumDrillbitFactory = "iridiumdrillbitfactory",
    KimberliteCatalyst = "kimberlitecatalyst",
    LaserFactory = "laserfactory",
    MissileLaunchComplex = "missilelaunchcomplex",
    PlatingFactory = "platingfactory",
    PrecisionMachineryFactory = "precisionmachineryfactory",
    PrecisionPneumaticDrill = "precisionpneumaticdrill",
  }

  export const EntityIdtoTilesetId = {
    [BlockType.Air]: TileKeys.Air,
    [BlockType.Iron]: TileKeys.Iron,
    [BlockType.Biofilm]: TileKeys.Biofilm,
    [BlockType.Sandstone]: TileKeys.Sandstone,
    [BlockType.Water]: TileKeys.Water,
    [BlockType.Bedrock]: TileKeys.Bedrock,
    [BlockType.Regolith]: TileKeys.Regolith,
    [BlockType.Copper]: TileKeys.Copper,
    [BlockType.Lithium]: TileKeys.Lithium,
    [BlockType.Titanium]: TileKeys.Titanium,
    [BlockType.Osmium]: TileKeys.Osmium,
    [BlockType.Tungsten]: TileKeys.Tungsten,
    [BlockType.Iridium]: TileKeys.Iridium,
    [BlockType.Kimberlite]: TileKeys.Kimberlite,
    [BlockType.Uraninite]: TileKeys.Uraninite,
    [BlockType.Bolutite]: TileKeys.Bolutite,
  };

  export const TerrainTilesetIdToEntityId: {
    [key: number]: EntityID;
  } = {
    [TileKeys.Air]: BlockType.Air,
    [TileKeys.Biofilm]: BlockType.Biofilm,
    [TileKeys.Sandstone]: BlockType.Sandstone,
    [TileKeys.Water]: BlockType.Water,
    [TileKeys.Bedrock]: BlockType.Bedrock,
    [TileKeys.Regolith]: BlockType.Regolith,
  };

  export const EntityIDtoSpriteKey = {
    [BlockType.MainBase]: [
      SpriteKeys.Mainbase1,
      SpriteKeys.Mainbase2,
      SpriteKeys.Mainbase3,
      SpriteKeys.Mainbase4,
      SpriteKeys.Mainbase5,
    ],

    [BlockType.IronMine]: [
      SpriteKeys.IronMine1,
      SpriteKeys.IronMine2,
      SpriteKeys.IronMine3,
    ],
    [BlockType.CopperMine]: [
      SpriteKeys.CopperMine1,
      SpriteKeys.CopperMine2,
      SpriteKeys.CopperMine3,
    ],
    [BlockType.LithiumMine]: [SpriteKeys.BasicMiner],
    [BlockType.StorageUnit]: [SpriteKeys.Node],

    [BlockType.StorageUnit]: [SpriteKeys.StorageUnit1, SpriteKeys.StorageUnit2],
    [BlockType.IronPlateFactory]: [
      SpriteKeys.IronPlateFactory1,
      SpriteKeys.IronPlateFactory2,
    ],
    [BlockType.AlloyFactory]: [SpriteKeys.AlloyFactory1],
    [BlockType.PhotovoltaicCellFactory]: [
      SpriteKeys.PhotovoltaicCellFactory1,
      SpriteKeys.PhotovoltaicCellFactory2,
    ],
    [BlockType.PropulsionFuelFactory]: [SpriteKeys.PropulsionFuelFactory],
    [BlockType.SolarPanel]: [SpriteKeys.SolarPanel1, SpriteKeys.SolarPanel2],
    [BlockType.PropulsionFuelFactory]: [SpriteKeys.PropulsionFuelFactory],

    [BlockType.Node]: [SpriteKeys.Node],

    [BlockType.Miner]: [SpriteKeys.Miner],
    [BlockType.BasicBatteryFactory]: [SpriteKeys.BasicBatteryFactory],
    [BlockType.AdvancedBatteryFactory]: [SpriteKeys.AdvancedBatteryFactory],
    [BlockType.BulletFactory]: [SpriteKeys.BulletFactory],
    [BlockType.DenseMetalRefinery]: [SpriteKeys.DenseMetalRefinery],
    [BlockType.HardenedDrill]: [SpriteKeys.HardenedDrill],
    [BlockType.HighTempFoundry]: [SpriteKeys.HighTempFoundry],
    [BlockType.IridiumDrillbitFactory]: [SpriteKeys.IridiumDrillBitFactory],
    [BlockType.KimberliteCatalystFactory]: [SpriteKeys.KimberliteCatalyst],
    [BlockType.KineticMissileFactory]: [SpriteKeys.KineticMissileFactory],
    [BlockType.HighEnergyLaserFactory]: [SpriteKeys.LaserFactory],
    [BlockType.MissileLaunchComplex]: [SpriteKeys.MissileLaunchComplex],
    [BlockType.PlatingFactory]: [SpriteKeys.PlatingFactory],
    [BlockType.PrecisionMachineryFactory]: [
      SpriteKeys.PrecisionMachineryFactory,
    ],
    [BlockType.PrecisionPneumaticDrill]: [SpriteKeys.PrecisionPneumaticDrill],
    [BlockType.ProjectileLauncher]: [SpriteKeys.ProjectileLauncher],
    [BlockType.Silo]: [SpriteKeys.Silo],
    [BlockType.ThermobaricMissileFactory]: [
      SpriteKeys.ThermobaricMissileFactory,
    ],
    [BlockType.ThermobaricWarheadFactory]: [
      SpriteKeys.ThermobaricWarheadFactory,
    ],
  };

  // Array index corresponds to lvl
  export const EntityIDtoAnimationKey = {
    [BlockType.Node]: [AnimationKeys.Node],
    [BlockType.IronMine]: [AnimationKeys.IronMine1, AnimationKeys.IronMine2],
    [BlockType.CopperMine]: [
      AnimationKeys.CopperMine1,
      AnimationKeys.CopperMine2,
    ],
    [BlockType.LithiumMine]: [
      AnimationKeys.LithiumMine1,
      AnimationKeys.LithiumMine2,
    ],
    [BlockType.StorageUnit]: [undefined, AnimationKeys.StorageUnit2],
    [BlockType.IronPlateFactory]: [
      AnimationKeys.IronPlateFactory1,
      AnimationKeys.IronPlateFactory2,
    ],
    [BlockType.AlloyFactory]: [AnimationKeys.AlloyFactory1],
    [BlockType.PhotovoltaicCellFactory]: [
      AnimationKeys.PhotovoltaicCellFactory1,
      AnimationKeys.PhotovoltaicCellFactory2,
    ],
    [BlockType.Miner]: [AnimationKeys.BasicMiner],
    [BlockType.BasicBatteryFactory]: [AnimationKeys.BasicBatteryFactory],
    [BlockType.AdvancedBatteryFactory]: [AnimationKeys.AdvancedBatteryFactory],
    [BlockType.BulletFactory]: [AnimationKeys.BasicBatteryFactory],
    [BlockType.DenseMetalRefinery]: [AnimationKeys.DenseMetalRefinery],
    [BlockType.HardenedDrill]: [AnimationKeys.HardenedDrill],
    [BlockType.HighTempFoundry]: [AnimationKeys.Hightempfoundry],
    [BlockType.IridiumDrillbitFactory]: [AnimationKeys.IridiumDrillbitFactory],
    [BlockType.KimberliteCatalystFactory]: [AnimationKeys.KimberliteCatalyst],
    [BlockType.HighEnergyLaserFactory]: [AnimationKeys.LaserFactory],
    [BlockType.MissileLaunchComplex]: [AnimationKeys.MissileLaunchComplex],
    [BlockType.PrecisionMachineryFactory]: [
      AnimationKeys.PrecisionMachineryFactory,
    ],
    [BlockType.PrecisionPneumaticDrill]: [
      AnimationKeys.PrecisionPneumaticDrill,
    ],
  };
}

export namespace BeltMap {
  export const KEY = "BELT_MAP";

  export enum Scenes {
    Root = "ROOT",
    Main = "MAIN",
  }

  export enum Assets {
    GridTileset = "grid-tileset",
  }

  export enum Tilesets {
    Grid = "Grid",
  }
}

export enum KeybindActions {
  Up,
  Down,
  Left,
  Right,
  Center,
  Base,
  Hotbar1,
  Hotbar2,
  Hotbar3,
  Hotbar4,
  Hotbar5,
  Hotbar6,
  Hotbar7,
  Hotbar8,
  Hotbar9,
  Hotbar0,
  Marker1,
  Marker2,
  Marker3,
  Marker4,
  ZoomIn,
  ZoomOut,
  RightClick,
  LeftClick,
  Research,
  Inventory,
  Mute,
  MainMenu,
  Esc,
  Debug,
  DeleteBuilding,
  DeletePath,
  Modifier,
  ToggleUI,
  NextHotbar,
  PrevHotbar,
}
