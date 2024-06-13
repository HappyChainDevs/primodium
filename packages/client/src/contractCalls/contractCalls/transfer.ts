import { Entity } from "@primodiumxyz/reactive-tables";
import { EObjectives } from "contracts/config/enums";
import { makeObjectiveClaimable } from "src/util/objectives/makeObjectiveClaimable";
import { ampli } from "src/ampli";
import { Core, AccountClient, bigintToNumber, getSystemId } from "@primodiumxyz/core";
import { ExecuteFunctions } from "@/contractCalls/txExecute/createExecute";
import { parseReceipt } from "@/contractCalls/parseReceipt";

export const createTransferCalls = (
  { tables, utils }: Core,
  { playerAccount }: AccountClient,
  { execute }: ExecuteFunctions
) => {
  const metadata = {
    id: "TRANSFER",
  } as const;

  const transfer = async (left: Entity, right: Entity, deltas: Map<Entity, bigint>) => {
    if ([...deltas.values()].every((count) => count == 0n)) return;
    const unitCounts = utils.toUnitCountArray(deltas);
    const resourceCounts = utils.toTransportableResourceArray(deltas);

    const allCounts = [...resourceCounts, ...unitCounts];
    const allSameSign = allCounts.every((count) => count >= 0n) || allCounts.every((count) => count <= 0n);

    if (!allSameSign) {
      await transferTwoWay(left, right, {
        unitCounts: unitCounts,
        resourceCounts: resourceCounts,
      });
      return;
    }

    await transferOneWay(left, right, {
      unitCounts: unitCounts,
      resourceCounts: resourceCounts,
    });
  };

  const transferOneWay = async (
    left: Entity,
    right: Entity,
    {
      unitCounts,
      resourceCounts,
    }: {
      unitCounts: bigint[];
      resourceCounts: bigint[];
    }
  ) => {
    const activeAsteroid = tables.ActiveRock.get()?.value;
    const anyNegative = unitCounts?.some((count) => count < 0n) || resourceCounts?.some((count) => count < 0n);

    let from = left;
    let to = right;
    if (anyNegative) {
      from = right;
      to = left;
      unitCounts?.forEach((count, i) => (unitCounts[i] = -count));
      resourceCounts?.forEach((count, i) => (resourceCounts[i] = -count));
    }
    const fromIsAsteroid = tables.Asteroid.has(from);
    const toIsAsteroid = tables.Asteroid.has(to);

    const claimableObjective = fromIsAsteroid ? EObjectives.TransferFromAsteroid : EObjectives.TransferFromFleet;

    if (resourceCounts.every((count) => count == 0n)) {
      const functionName = fromIsAsteroid
        ? "Pri_11__transferUnitsFromAsteroidToFleet"
        : toIsAsteroid
        ? "Pri_11__transferUnitsFromFleetToAsteroid"
        : "Pri_11__transferUnitsFromFleetToFleet";
      await execute(
        {
          functionName,
          systemId: getSystemId("TransferSystem"),
          args: [from, to, unitCounts],
          withSession: true,
        },
        metadata,
        (receipt) => {
          activeAsteroid && makeObjectiveClaimable(playerAccount.entity, claimableObjective);

          const commonProperties = {
            spaceRock: from,
            spaceRockTo: to,
            unitCounts: unitCounts.map((unitCount) => bigintToNumber(unitCount)),
            ...parseReceipt(receipt),
          };

          if (fromIsAsteroid) {
            ampli.systemTransferSystemPrimodiumTransferUnitsFromAsteroidToFleet(commonProperties);
          } else if (toIsAsteroid) {
            ampli.systemTransferSystemPrimodiumTransferUnitsFromFleetToAsteroid(commonProperties);
          } else {
            ampli.systemTransferSystemPrimodiumTransferUnitsFromFleetToFleet(commonProperties);
          }
        }
      );
    } else if (unitCounts.every((count) => count == 0n)) {
      const functionName = fromIsAsteroid
        ? "Pri_11__transferResourcesFromAsteroidToFleet"
        : toIsAsteroid
        ? "Pri_11__transferResourcesFromFleetToAsteroid"
        : "Pri_11__transferResourcesFromFleetToFleet";
      await execute(
        {
          functionName,
          systemId: getSystemId("TransferSystem"),
          args: [from, to, resourceCounts],
          withSession: true,
        },
        metadata,
        (receipt) => {
          activeAsteroid && makeObjectiveClaimable(playerAccount.entity, claimableObjective);

          const commonProperties = {
            spaceRock: from,
            spaceRockTo: to,
            resourceCounts: resourceCounts.map((resourceCount) => bigintToNumber(resourceCount)),
            ...parseReceipt(receipt),
          };

          if (fromIsAsteroid) {
            ampli.systemTransferSystemPrimodiumTransferResourcesFromAsteroidToFleet(commonProperties);
          } else if (toIsAsteroid) {
            ampli.systemTransferSystemPrimodiumTransferResourcesFromFleetToAsteroid(commonProperties);
          } else {
            ampli.systemTransferSystemPrimodiumTransferResourcesFromFleetToFleet(commonProperties);
          }
        }
      );
    } else {
      const functionName = fromIsAsteroid
        ? "Pri_11__transferUnitsAndResourcesFromAsteroidToFleet"
        : toIsAsteroid
        ? "Pri_11__transferUnitsAndResourcesFromFleetToAsteroid"
        : "Pri_11__transferUnitsAndResourcesFromFleetToFleet";
      await execute(
        {
          functionName,
          systemId: getSystemId("TransferSystem"),
          args: [from, to, unitCounts, resourceCounts],
          withSession: true,
        },
        metadata,
        (receipt) => {
          activeAsteroid && makeObjectiveClaimable(playerAccount.entity, claimableObjective);

          const commonProperties = {
            spaceRock: from,
            spaceRockTo: to,
            unitCounts: unitCounts.map((unitCount) => bigintToNumber(unitCount)),
            resourceCounts: resourceCounts.map((resourceCount) => bigintToNumber(resourceCount)),
            ...parseReceipt(receipt),
          };

          if (fromIsAsteroid) {
            ampli.systemTransferSystemPrimodiumTransferUnitsAndResourcesFromAsteroidToFleet(commonProperties);
          } else if (toIsAsteroid) {
            ampli.systemTransferSystemPrimodiumTransferUnitsAndResourcesFromFleetToAsteroid(commonProperties);
          } else {
            ampli.systemTransferSystemPrimodiumTransferUnitsAndResourcesFromFleetToFleet(commonProperties);
          }
        }
      );
    }
  };
  const transferTwoWay = async (
    left: Entity,
    right: Entity,
    {
      unitCounts,
      resourceCounts,
    }: {
      unitCounts: bigint[];
      resourceCounts: bigint[];
    }
  ) => {
    const noUnits = unitCounts.every((count) => count == 0n);
    const noResources = resourceCounts.every((count) => count == 0n);
    if (noUnits && noResources) return;
    if (noResources) {
      return await execute(
        {
          functionName: "Pri_11__transferUnitsTwoWay",
          systemId: getSystemId("TransferTwoWaySystem"),
          args: [left, right, unitCounts],
          withSession: true,
        },
        metadata,
        (receipt) => {
          ampli.systemTransferTwoWaySystemPrimodiumTransferUnitsTwoWay({
            spaceRock: left,
            spaceRockTo: right,
            unitCounts: unitCounts.map((unitCount) => bigintToNumber(unitCount)),
            ...parseReceipt(receipt),
          });
        }
      );
    }
    if (noUnits) {
      return await execute(
        {
          functionName: "Pri_11__transferResourcesTwoWay",
          systemId: getSystemId("TransferTwoWaySystem"),
          args: [left, right, resourceCounts],
          withSession: true,
        },
        metadata,
        (receipt) => {
          ampli.systemTransferTwoWaySystemPrimodiumTransferResourcesTwoWay({
            spaceRock: left,
            spaceRockTo: right,
            resourceCounts: resourceCounts.map((resourceCount) => bigintToNumber(resourceCount)),
            ...parseReceipt(receipt),
          });
        }
      );
    }

    await execute(
      {
        functionName: "Pri_11__transferUnitsAndResourcesTwoWay",
        systemId: getSystemId("TransferTwoWaySystem"),
        args: [left, right, unitCounts, resourceCounts],
        withSession: true,
      },
      metadata,
      (receipt) => {
        ampli.systemTransferTwoWaySystemPrimodiumTransferUnitsAndResourcesTwoWay({
          spaceRock: left,
          spaceRockTo: right,
          unitCounts: unitCounts.map((unitCount) => bigintToNumber(unitCount)),
          resourceCounts: resourceCounts.map((resourceCount) => bigintToNumber(resourceCount)),
          ...parseReceipt(receipt),
        });
      }
    );
  };

  return transfer;
};
