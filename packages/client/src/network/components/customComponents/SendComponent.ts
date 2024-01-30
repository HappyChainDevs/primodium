import { Entity, Type } from "@latticexyz/recs";
import { EUnit } from "contracts/config/enums";
import { components } from "src/network/components";
import { world } from "src/network/world";
import { UnitEntityLookup, UnitEnumLookup } from "src/util/constants";
import { getUnitStats } from "src/util/unit";
import { SetupNetworkResult } from "../../types";
import { createExtendedComponent } from "./ExtendedComponent";
import { ExtendedContractComponents } from "./extendComponents";

type stats = { ATK: bigint; DEF: bigint; SPD: bigint; CRG: bigint; HP: bigint; DEC: bigint };

function createSendComponent(contractComponents: ExtendedContractComponents<SetupNetworkResult["components"]>) {
  const { Position } = contractComponents;
  const component = createExtendedComponent(world, {
    origin: Type.OptionalEntity,
    destination: Type.OptionalEntity,
    to: Type.OptionalEntity,
    count: Type.BigIntArray,
    sendType: Type.OptionalNumber,
  });

  const emptyComponent = {
    origin: undefined,
    destination: undefined,
    to: undefined,
    count: undefined,
    sendType: undefined,
  };

  const getUnitCount = (entity: Entity) => {
    if (UnitEnumLookup[entity] === undefined) throw new Error("Invalid unit entity");
    const count = component.get()?.count;
    if (!count) return 0;

    const index = UnitEnumLookup[entity] - 1;

    return count[index];
  };

  const reset = (playerEntity?: Entity) => {
    const origin = playerEntity ? (components.Home.get(playerEntity)?.value as Entity | undefined) : undefined;

    component.set({
      origin,
      destination: undefined,
      count: [],
      to: undefined,
      sendType: undefined,
    });
  };

  const removeUnit = (entity: Entity) => {
    const count = component.get()?.count;
    if (!count) return;
    const index = UnitEnumLookup[entity] - 1;
    if (index === undefined || index < 0 || index >= count.length) return;

    count[index] = 0n;

    component.update({ count });
  };

  const setOrigin = (spaceRock: Entity | undefined) => {
    if (!component.get()) reset();
    component.update({ origin: spaceRock });
  };

  const setDestination = (spaceRock: Entity | undefined) => {
    if (!component.get()) reset();
    component.update({ destination: spaceRock });
  };

  const setUnitCount = (entity: Entity, count: bigint) => {
    if (UnitEnumLookup[entity] === undefined) throw new Error("Invalid unit entity");
    if (!component.get()) reset();
    let currentCount = component.get()?.count;

    //initialize if null
    if (!currentCount) {
      (currentCount = []),
        component.set({
          ...(component.get() || emptyComponent),
          count: currentCount,
        });
      return;
    }

    const index = UnitEnumLookup[entity] - 1;
    if (index === undefined || index < 0 || index >= currentCount.length) return;

    //update existing entity
    currentCount[index] = count;
    component.update({ count: currentCount });
  };

  const getDestinationCoord = () => {
    const destination = component.get()?.destination;

    const coord = Position.get(destination);

    return coord;
  };

  const getOriginCoord = () => {
    const origin = component.get()?.origin;

    const coord = Position.get(origin);

    return coord;
  };

  const getUnits = () => {
    const unitCounts = component.get()?.count ?? [];
    return unitCounts.reduce((acc, curr, index) => {
      if (curr === 0n) return acc;
      return { ...acc, [UnitEntityLookup[(index + 1) as EUnit]]: curr };
    }, {} as Record<Entity, bigint>);
  };

  const useUnits = () => {
    component.use()?.count;
    return getUnits();
  };

  const useTotalStats = (playerEntity: Entity) => {
    const unitCounts = component.use()?.count ?? [];
    return unitCounts.reduce(
      (acc, curr, index) => {
        if (curr === 0n) return acc;
        const entity = UnitEntityLookup[(index + 1) as EUnit];
        const unitStats = getUnitStats(entity, playerEntity) as stats;

        // Iterate over the stats keys
        (Object.keys(unitStats) as Array<keyof stats>).forEach((key) => {
          if (key === "SPD") {
            //get the min speed
            acc[key] = (acc[key] ?? BigInt(Number.MAX_SAFE_INTEGER)) < unitStats[key] ? acc[key] : unitStats[key];
            return;
          }
          acc[key] = (acc[key] ?? 0n) + unitStats[key] * curr;
        });

        return acc;
      },
      {
        ATK: 0n,
        DEF: 0n,
        SPD: BigInt(Number.MAX_SAFE_INTEGER),
        MIN: 0n,
        CRG: 0n,
        HP: 0n,
        DEC: 0n,
      }
    );
  };

  return {
    ...component,
    getUnits,
    useUnits,
    getUnitCount,
    useTotalStats,
    setUnitCount,
    setOrigin,
    setDestination,
    getDestinationCoord,
    getOriginCoord,
    removeUnit,
    reset,
  };
}

export default createSendComponent;
