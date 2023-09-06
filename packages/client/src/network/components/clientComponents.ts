import { Type } from "@latticexyz/recs";
import { world } from "../world";
import {
  createExtendedBoolComponent,
  createExtendedComponent,
  createExtendedCoordComponent,
  createExtendedEntityComponent,
  createExtendedNumberComponent,
} from "./customComponents/ExtendedComponent";

// todo: organize these alphabetically
export const BlockNumber = createExtendedComponent(
  world,
  {
    value: Type.BigInt,
    avgBlockTime: Type.Number, //seconds
  },
  {
    id: "BlockNumber",
  }
);
export const Account = createExtendedEntityComponent(world, { id: "Account" });

export const GameReady = createExtendedBoolComponent(world, { id: "GameReady" });
export const DoubleCounter = createExtendedNumberComponent(world, {
  id: "DoubleCounter",
});
export const SelectedTile = createExtendedCoordComponent(world, { id: "SelectedTile" });
export const HoverTile = createExtendedCoordComponent(world, { id: "HoverTile" });
export const SelectedBuilding = createExtendedComponent(world, { value: Type.Entity }, { id: "SelectedBuilding" });
export const SelectedAction = createExtendedNumberComponent(world, {
  id: "SelectedAction",
});

// export const Marker = createExtendedMarkerComponent(world, {
//   id: "MarkerTypeComponent",
// });

export const ActiveAsteroid = createExtendedComponent(world, { value: Type.Entity }, { id: "ActiveAsteroid" });

// export const Send = createExtendedSendComponent(world);

export const TrainingQueue = createExtendedComponent(
  world,
  {
    units: Type.EntityArray,
    counts: Type.NumberArray,
    progress: Type.NumberArray,
    timeRemaining: Type.NumberArray,
  },
  {
    id: "TrainingQueue",
  }
);

export const Hangar = createExtendedComponent(
  world,
  {
    units: Type.EntityArray,
    counts: Type.NumberArray,
  },
  {
    id: "Hangar",
  }
);

export const Leaderboard = createExtendedComponent(
  world,
  {
    players: Type.EntityArray,
    playerRank: Type.Number,
    scores: Type.NumberArray,
  },
  {
    id: "Leaderboard",
  }
);

// export const Battle = BattleComponent();

// export const NotificationQueue = NotificationQueueComponent();

export const BattleReport = createExtendedComponent(
  world,
  {
    show: Type.Boolean,
    battle: Type.OptionalEntity,
  },
  {
    id: "Battle",
  }
);

export default {
  Account,
  ActiveAsteroid,
  BlockNumber,
  GameReady,
  DoubleCounter,
  SelectedTile,
  HoverTile,
  SelectedBuilding,
  SelectedAction,
  TrainingQueue,
  Hangar,
  Leaderboard,
  BattleReport,
};
