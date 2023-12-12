import { Entity, Has, HasValue, defineComponentSystem, runQuery } from "@latticexyz/recs";
import { getUnitTrainingTime } from "src/util/trainUnits";
import { Hex } from "viem";
import { components } from "../components";
import { world } from "../world";
// import { SetupResult } from "../types";
import { ERock } from "contracts/config/enums";
import { SetupResult } from "../types";
export function createHangar(spaceRock: Entity) {
  const player = components.OwnedBy.get(spaceRock)?.value;
  console.log("owner of space rock", spaceRock.slice(0, 6), player);
  if (!player) return;
  const units: Map<Entity, bigint> = new Map();

  // get all units and find their counts on the space rock
  components.P_UnitPrototypes.get()?.value.forEach((entity) => {
    const unitCount = components.UnitCount.getWithKeys({
      player: player as Hex,
      rock: spaceRock as Hex,
      unit: entity as Hex,
    })?.value;

    if (!unitCount) return;
    const prev = units.get(entity as Entity) || 0n;
    units.set(entity as Entity, prev + unitCount);
  });
  const type = components.RockType.get(spaceRock)?.value;

  if (type == ERock.Asteroid) {
    const trainedUnclaimedUnits = getTrainedUnclaimedUnits(spaceRock);
    Array.from(trainedUnclaimedUnits).map(([unit, count]) => {
      units.set(unit as Entity, (units.get(unit as Entity) ?? 0n) + count);
    });
  }

  const value = { units: [...units.keys()], counts: [...units.values()] };
  components.Hangar.set(value, spaceRock);
  return units;
}

function getTrainedUnclaimedUnits(spaceRock: Entity) {
  const units = new Map<Entity, bigint>();
  const query = [
    Has(components.TrainingQueue),
    HasValue(components.Position, {
      parent: spaceRock,
    }),
  ];
  console.log("query", spaceRock.slice(0, 6), query);
  const buildings = runQuery(query);
  const config = components.P_GameConfig.get();
  if (!config) return units;
  buildings.forEach((building) => {
    const owner = components.OwnedBy.get(building)?.value;

    let startTime =
      components.LastClaimedAt.get(building, { value: 0n }).value -
      components.ClaimOffset.get(building, { value: 0n }).value;

    const queueUnits = components.QueueUnits.getWithKeys({ entity: building as Hex });
    if (!queueUnits || !owner || !startTime) return components.Hangar.remove(building);
    for (let i = queueUnits.front; i <= queueUnits.back; i++) {
      const update = components.QueueItemUnits.getWithKeys({ entity: building as Hex, index: i });
      if (!update) continue;

      const trainingTime = getUnitTrainingTime(owner as Entity, building, update.unitId as Entity);
      let trainedUnits = update.quantity;
      const now = components.Time.get()?.value ?? 0n;
      if (trainingTime > 0) trainedUnits = (now - startTime) / trainingTime;

      if (trainedUnits == 0n) return;

      if (trainedUnits > update.quantity) {
        trainedUnits = update.quantity;
      }
      units.set(update.unitId as Entity, trainedUnits);

      startTime += trainingTime * trainedUnits;
    }
  });
  return units;
}
export function setupHangar(mud: SetupResult) {
  const playerEntity = mud.network.playerEntity;

  const { Send, RockType, OwnedBy } = components;

  defineComponentSystem(world, Send, () => {
    const origin = Send.get()?.origin;
    const destination = Send.get()?.destination;
    if (origin) createHangar(origin);
    if (destination) createHangar(destination);
  });

  defineComponentSystem(world, components.BlockNumber, () => {
    const home = components.Home.get(playerEntity)?.asteroid;
    if (home) createHangar(home as Entity);
    const origin = Send.get()?.origin;
    const destination = Send.get()?.destination;
    if (origin && origin != home) createHangar(origin);
    if (destination && destination != home) createHangar(destination);

    // maintain hangars for all player motherlodes to track mining production
    const query = [
      Has(RockType),
      HasValue(OwnedBy, { value: playerEntity }),
      HasValue(RockType, { value: ERock.Motherlode }),
    ];

    const motherlodes = runQuery(query);
    motherlodes.forEach((motherlode) => {
      createHangar(motherlode);
    });
  });
}
