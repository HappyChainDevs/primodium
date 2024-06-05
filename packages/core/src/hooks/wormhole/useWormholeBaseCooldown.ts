import { Entity } from "@latticexyz/recs";
import { useMemo } from "react";
import { useCore } from "@/hooks/useCore";

export const useWormholeBaseCooldown = (
  wormholeBaseEntity: Entity
): { inCooldown: boolean; cooldownEnd: bigint; timeLeft: bigint } => {
  const { components } = useCore();
  const time = components.Time.use()?.value ?? 0n;
  const cooldownEnd = components.CooldownEnd.use(wormholeBaseEntity)?.value ?? 0n;
  return useMemo(
    () => ({ inCooldown: time < cooldownEnd, cooldownEnd, timeLeft: cooldownEnd > time ? cooldownEnd - time : 0n }),
    [time, cooldownEnd]
  );
};
