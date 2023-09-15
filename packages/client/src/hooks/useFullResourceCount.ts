import { useEntityQuery } from "@latticexyz/react";
import { EntityID, Has, HasValue, EntityIndex } from "@latticexyz/recs";
import { useMemo } from "react";
import {
  AsteroidType,
  OwnedBy,
  Item,
  P_MaxStorage,
  Production,
  LastClaimedAt,
  OccupiedUtilityResource,
  MaxUtility,
  P_WorldSpeed,
} from "src/network/components/chainComponents";
import {
  BlockNumber,
  Account,
  Hangar,
} from "src/network/components/clientComponents";
import { world } from "src/network/world";
import { mineableResources, getMotherlodeResource } from "src/util/resource";
import { getUnitStats } from "src/util/trainUnits";
import { ESpaceRockType } from "src/util/web3/types";
import useResourceCount from "./useResourceCount";
import { ResourceType, SPEED_SCALE } from "src/util/constants";
import { SingletonID } from "@latticexyz/network";

export function useFullResourceCount(
  resourceID: EntityID,
  type = ResourceType.Resource
) {
  const { value: blockNumber } = BlockNumber.use(undefined, {
    value: 0,
    avgBlockTime: 1,
  });
  const player = Account.use()?.value;
  const query = [
    Has(AsteroidType),
    HasValue(OwnedBy, { value: player }),
    HasValue(AsteroidType, { value: ESpaceRockType.Motherlode }),
  ];

  const motherlodes = useEntityQuery(query);

  const block = BlockNumber.use()?.value;
  // todo: only update whenever any motherlode's hangar changes. I cannot figure this out rn so im using block

  //****production****//

  const worldSpeed = P_WorldSpeed.use(SingletonID)?.value ?? SPEED_SCALE;

  //motherlode//
  const motherlodeProduction = useMemo(() => {
    if (!mineableResources.includes(resourceID)) return 0;
    return motherlodes.reduce((prev: number, motherlodeIndex: EntityIndex) => {
      const entity = world.entities[motherlodeIndex];
      const resource = getMotherlodeResource(entity);

      const hangar = Hangar.get(entity);

      if (!hangar || resource?.resource !== resourceID) return prev;

      let total = 0;
      for (let i = 0; i < hangar.units.length; i++) {
        total += getUnitStats(hangar.units[i]).MIN * hangar.counts[i];
      }
      return prev + total;
    }, 0);
  }, [motherlodes, resourceID, block]);

  //buildings//
  const buildingProduction = useResourceCount(Production, resourceID);

  //total//
  const production = useMemo(() => {
    return buildingProduction + motherlodeProduction;
  }, [buildingProduction, motherlodeProduction]);

  const resourceCount = useResourceCount(
    ResourceType.Resource === type ? Item : OccupiedUtilityResource,
    resourceID
  );
  const maxStorage = useResourceCount(
    ResourceType.Resource === type ? P_MaxStorage : MaxUtility,
    resourceID
  );
  //****claiming****//

  //motherlode//
  const resourcesToClaimFromMotherlode = useMemo(() => {
    if (!mineableResources.includes(resourceID)) return 0;
    return motherlodes.reduce((prev: number, motherlodeIndex: EntityIndex) => {
      const entity = world.entities[motherlodeIndex];
      const resource = getMotherlodeResource(entity);

      const hangar = Hangar.get(entity);

      if (!hangar || resource?.resource !== resourceID) return prev;
      const lastClaimedAt = LastClaimedAt.get(entity)?.value ?? 0;

      let total = 0;
      for (let i = 0; i < hangar.units.length; i++) {
        total += getUnitStats(hangar.units[i]).MIN * hangar.counts[i];
      }
      return (
        prev +
        total * (((blockNumber - lastClaimedAt) * SPEED_SCALE) / worldSpeed)
      );
    }, 0);
  }, [motherlodes, resourceID, block, resourceCount]);

  //building//
  const buildingProductionLastClaimedAt = useResourceCount(
    LastClaimedAt,
    resourceID
  );
  const resourcesToClaimFromBuilding = useMemo(() => {
    const toClaim =
      ((blockNumber - buildingProductionLastClaimedAt) *
        buildingProduction *
        SPEED_SCALE) /
      worldSpeed;
    if (toClaim > maxStorage - resourceCount) return maxStorage - resourceCount;
    return toClaim;
  }, [buildingProductionLastClaimedAt, blockNumber]);

  //total//
  const resourcesToClaim = useMemo(() => {
    const totalUnclaimed =
      resourcesToClaimFromBuilding + resourcesToClaimFromMotherlode;
    if (totalUnclaimed > maxStorage - resourceCount)
      return maxStorage - resourceCount;
    return totalUnclaimed;
  }, [resourcesToClaimFromBuilding, resourcesToClaimFromMotherlode]);

  return { resourceCount, resourcesToClaim, maxStorage, production };
}
