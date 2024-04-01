import { Entity } from "@latticexyz/recs";
import { EResource } from "contracts/config/enums";
import { useMemo } from "react";
import { components } from "src/network/components";
import { EntityType, ResourceEntityLookup, SPEED_SCALE } from "src/util/constants";
import { hashEntities } from "src/util/encode";

export const useWormholeResource = (): { resource: Entity; timeUntilNextResource: bigint } => {
  const wormholeData = components.Wormhole.use();
  const wormholeConfig = components.P_WormholeConfig.use();
  const time = components.Time.use()?.value ?? 0n;

  return useMemo(() => {
    if (!wormholeData || !wormholeConfig) return { resource: EntityType.NULL, timeUntilNextResource: 0n };
    const storedTurn = wormholeData.turn;
    const worldSpeed = components.P_GameConfig.get()?.worldSpeed ?? 0n;

    const turnDuration = (wormholeConfig.turnDuration * SPEED_SCALE) / worldSpeed;
    const expectedTurn = (time - wormholeConfig.initTime) / turnDuration;

    const timeUntilNextResource = wormholeConfig.initTime + (expectedTurn + 1n) * turnDuration - time;
    const resourceEntity = ResourceEntityLookup[wormholeData.resource as EResource];
    if (storedTurn === expectedTurn) return { timeUntilNextResource, resource: resourceEntity };
    return { timeUntilNextResource, resource: getRandomResource(wormholeData.hash as Entity, resourceEntity) };
  }, [time, wormholeConfig, wormholeData]);
};

function getRandomResource(seed: Entity, prevResource: Entity) {
  const transportableLength = components.P_Transportables.get()?.value.length ?? 0;
  let resource = EntityType.NULL;
  do {
    seed = hashEntities(seed);
    const resourceIndex = Number(BigInt(seed) % BigInt(transportableLength));
    resource = ResourceEntityLookup[resourceIndex as EResource];
  } while (resource == prevResource);
  return resource;
}
