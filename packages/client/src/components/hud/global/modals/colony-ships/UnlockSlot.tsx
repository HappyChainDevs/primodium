import { bigIntMin } from "@latticexyz/common/utils";
import React, { useEffect, useMemo, useState } from "react";
import { Hex } from "viem";

import { formatResourceCount, parseResourceCount, ResourceEnumLookup } from "@primodiumxyz/core";
import { useColonySlots, useColonySlotsCostMultiplier, useCore, useResourceCount } from "@primodiumxyz/core/react";
import { Entity } from "@primodiumxyz/reactive-tables";
import { Button } from "@/components/core/Button";
import { CapacityBar } from "@/components/core/CapacityBar";
import { SecondaryCard } from "@/components/core/Card";
import { IconLabel } from "@/components/core/IconLabel";
import { NumberInput } from "@/components/core/NumberInput";
import { TransactionQueueMask } from "@/components/shared/TransactionQueueMask";
import { useContractCalls } from "@/hooks/useContractCalls";
import { EntityToResourceImage } from "@/util/image";

export const UnlockSlot: React.FC<{
  playerEntity: Entity;
  buildingEntity: Entity;
  asteroidEntity: Entity;
  className?: string;
  index: number;
}> = ({ asteroidEntity, buildingEntity, playerEntity, className = "" }) => {
  const { utils } = useCore();
  const colonySlotsData = useColonySlots(playerEntity);
  const { payForColonySlot } = useContractCalls();
  const [activeResource, setActiveResource] = useState<Entity | null>(null);
  const [activeResourceCount, setActiveResourceCount] = useState("0");

  const max = useMemo(() => {
    if (!activeResource) return 0;
    const resourceData = utils.getResourceCount(activeResource, asteroidEntity);
    if (!resourceData) return 0;
    const resourceCosts = colonySlotsData.resourceCosts[activeResource];
    const resourcesLeft = resourceCosts.cost - resourceCosts.paid;
    const resourceCount = resourceData.resourceCount;
    const ret = bigIntMin(resourcesLeft, resourceCount);
    return Number(formatResourceCount(activeResource, ret, { notLocale: true, showZero: true }));
  }, [activeResource, asteroidEntity, colonySlotsData.resourceCosts]);

  useEffect(() => {
    setActiveResourceCount("0");
  }, [activeResource]);

  const handleSubmit = () => {
    if (!activeResource) return;
    payForColonySlot(buildingEntity, {
      [activeResource]: BigInt(parseResourceCount(activeResource, activeResourceCount)),
    });
    setActiveResourceCount("0");
  };
  return (
    <SecondaryCard className={`flex flex-col gap-2 justify-center items-center ${className}`}>
      {Object.entries(colonySlotsData.resourceCosts).map(([resource], i) => (
        <SlotResourceDisplay
          key={`slot-resource-${i}`}
          playerEntity={playerEntity}
          asteroidEntity={asteroidEntity}
          resource={resource as Entity}
          onClick={() => setActiveResource(resource as Entity)}
          active={activeResource === resource}
        />
      ))}

      {activeResource && <NumberInput count={activeResourceCount} max={max} onChange={setActiveResourceCount} />}
      {!activeResource && <NumberInput count={"0"} max={0} />}

      <TransactionQueueMask queueItemId={"pay" as Entity}>
        <Button variant="primary" size="sm" disabled={activeResourceCount == "0"} onClick={handleSubmit}>
          Pay
        </Button>
      </TransactionQueueMask>
    </SecondaryCard>
  );
};

const SlotResourceDisplay: React.FC<{
  active?: boolean;
  playerEntity: Entity;
  asteroidEntity: Entity;
  resource: Entity;
  onClick?: () => void;
}> = ({ active, asteroidEntity, playerEntity, resource, onClick }) => {
  const { tables } = useCore();
  const resourceCount = useResourceCount(resource, asteroidEntity)?.resourceCount;

  const config = tables.P_ColonySlotsConfig.use() ?? tables.P_ColonySlotsConfig.get();
  if (!config) throw new Error("No colony slots config found");
  const index = config?.resources.findIndex((r) => r === ResourceEnumLookup[resource]);
  const paid =
    tables.ColonySlotsInstallments.useWithKeys({
      playerEntity: playerEntity as Hex,
      resourceIndex: BigInt(index),
    })?.amounts ?? 0n;

  const costMultiplier = useColonySlotsCostMultiplier(playerEntity);
  const cost = config.amounts[index] * costMultiplier;
  const complete = cost == paid;

  let content = "";
  if (complete) content = "COMPLETE";
  else content = `${formatResourceCount(resource, paid)} / ${formatResourceCount(resource, cost, { short: true })}`;
  return (
    <Button size="content" onClick={onClick} className={`w-full gap-1 ${active ? "ring ring-secondary" : ""}`}>
      <IconLabel imageUri={EntityToResourceImage[resource] ?? ""} text={content} />
      <CapacityBar className="w-full" current={paid} max={cost} segments={20} />
      {!complete && (
        <p className="self-end text-xs opacity-50">Available: {formatResourceCount(resource, resourceCount ?? 0n)}</p>
      )}
    </Button>
  );
};
