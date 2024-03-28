import { Entity } from "@latticexyz/recs";
import { Badge } from "src/components/core/Badge";
import { IconLabel } from "src/components/core/IconLabel";
import { Loader } from "src/components/core/Loader";
import { AccountDisplay } from "src/components/shared/AccountDisplay";
import { useAsteroidStrength } from "src/hooks/useAsteroidStrength";
import { useFullResourceCount, useFullResourceCounts } from "src/hooks/useFullResourceCount";
import { useInGracePeriod } from "src/hooks/useInGracePeriod";
import { useSyncStatus } from "src/hooks/useSyncStatus";
import { components } from "src/network/components";
import { getAsteroidDescription } from "src/util/asteroid";
import { EntityType, Keys, ResourceImage } from "src/util/constants";
import { hashEntities } from "src/util/encode";
import { entityToRockName } from "src/util/name";
import { formatResourceCount, formatTime, formatTimeShort } from "src/util/number";
import { getMoveLength } from "src/util/send";
import { getCanSend, getFleetUnitCounts } from "src/util/unit";
import { Card } from "../../core/Card";
import { HealthBar } from "../HealthBar";

export const AsteroidHover: React.FC<{ entity: Entity }> = ({ entity }) => {
  const { loading } = useSyncStatus(hashEntities(Keys.SELECTED, entity));
  const name = entityToRockName(entity);
  const wormhole = components.Asteroid.get(entity)?.wormhole;
  const desc = getAsteroidDescription(entity);
  const { inGracePeriod, duration } = useInGracePeriod(entity, loading);
  const { resourceCount: encryption, resourceStorage: maxEncryption } = useFullResourceCount(
    EntityType.Encryption,
    entity,
    loading
  );

  const ownedBy = components.OwnedBy.use(entity)?.value as Entity | undefined;
  const { strength, maxStrength } = useAsteroidStrength(entity, loading);

  const position = components.Position.use(entity);
  console.log("position: ", position.x, position.y);
  if (loading)
    return (
      <Card className="relative flex items-center justify-center w-56 h-24 px-auto uppercase font-bold">
        <Loader />
        Loading Data
      </Card>
    );

  return (
    <Card className="ml-5 w-60 relative">
      <div className="absolute top-0 left-0 w-full h-full topographic-background-sm opacity-50 " />
      <div className="flex flex-col gap-1 z-10">
        <div className="grid grid-cols-2 gap-1">
          <div className="flex gap-1 items-center">
            <IconLabel imageUri="/img/icons/asteroidicon.png" className={`pixel-images w-3 h-3 bg-base-100`} />
            <p className="text-sm font-bold uppercase">{name}</p>
          </div>
          <AsteroidEta entity={entity} />
        </div>

        <div className="flex gap-1">
          <div className="flex bg-primary uppercase font-bold border border-secondary/50 gap-2 text-xs p-1 items-center h-4 max-w-48">
            {ownedBy ? <AccountDisplay className="w-12" noColor player={ownedBy} raw /> : "DROID INFESTED"}
          </div>
        </div>
        <div className="flex gap-1">
          <div className="flex bg-neutral uppercase font-bold border border-secondary/50 gap-2 text-xs p-1 items-center h-4">
            {desc.size}
          </div>
          <div className="flex bg-neutral uppercase font-bold border border-secondary/50 gap-2 text-xs p-1 items-center h-4">
            {desc.type}
          </div>
          {wormhole && (
            <div className="flex rainbow-bg uppercase text-neutral font-bold border border-secondary/50 gap-2 text-xs p-1 items-center h-4">
              WORMHOLE
            </div>
          )}
        </div>
        {inGracePeriod && (
          <div className="flex bg-success/25 font-bold border border-success/50 gap-2 text-xs p-1 items-center h-4 w-fit">
            <IconLabel imageUri="/img/icons/graceicon.png" className={`pixel-images w-3 h-3`} />
            {formatTimeShort(duration)}
          </div>
        )}
        {!inGracePeriod && (
          <>
            <div className="grid grid-cols-2 gap-1">
              <Badge className="w-full text-xs text-accent bg-base-100 p-1 border border-secondary">
                <HealthBar
                  imgUrl={ResourceImage.get(EntityType.Encryption) ?? ""}
                  health={Number(formatResourceCount(EntityType.Encryption, encryption, { notLocale: true }))}
                  maxHealth={Number(formatResourceCount(EntityType.Encryption, maxEncryption, { notLocale: true }))}
                />
              </Badge>
              <Badge className="w-full text-xs text-accent bg-base-100 p-1 border border-secondary">
                <HealthBar
                  imgUrl={ResourceImage.get(EntityType.HP) ?? ""}
                  health={Number(formatResourceCount(EntityType.HP, strength, { notLocale: true, showZero: true }))}
                  maxHealth={Number(
                    formatResourceCount(EntityType.HP, maxStrength, { notLocale: true, showZero: true })
                  )}
                />
              </Badge>
            </div>
            <AsteroidResources entity={entity} />
          </>
        )}
      </div>
    </Card>
  );
};

const AsteroidEta = ({ entity }: { entity: Entity }) => {
  const playerEntity = components.Account.use()?.value;
  const originFleet = components.Send.use()?.originFleet;
  const originFleetRock = components.FleetMovement.use(originFleet)?.destination as Entity;
  const originPosition = components.Position.use(originFleetRock);
  const destinationPosition = components.Position.use(entity);
  const moveLength =
    originPosition && destinationPosition && originFleet && playerEntity
      ? getMoveLength(
          originPosition,
          destinationPosition,
          playerEntity,
          Object.fromEntries(getFleetUnitCounts(originFleet))
        )
      : 0;
  const isTarget = moveLength > 0 && originFleet && getCanSend(originFleet, entity);
  if (!isTarget) return <></>;

  return (
    <div className="flex font-bold items-center justify-center uppercase text-xs pulse bg-base-100 border border-primary px-1 w-fit">
      ETA {formatTime(moveLength)}
    </div>
  );
};

const ResourceDisplay = ({ type, count }: { type: Entity; count: bigint }) => {
  if (count == 0n) return null;
  return (
    <IconLabel
      key={`show-resource-${type}`}
      imageUri={ResourceImage.get(type) ?? ""}
      text={formatResourceCount(type, count, { short: true })}
    />
  );
};

const AsteroidResources = ({ entity }: { entity: Entity }) => {
  const resources = useFullResourceCounts(entity);
  return (
    <div className="text-xs grid grid-cols-3 gap-1 divide-x divide-primary/50 pt-1 border-t border-t-primary/50">
      <div className="uppercase font-bold flex flex-col gap-1 p-1">
        {[EntityType.Iron, EntityType.Copper, EntityType.Lithium].map((type) => (
          <ResourceDisplay key={`type-${type}`} type={type} count={resources.get(type)?.resourceCount ?? 0n} />
        ))}
      </div>
      <div>
        {[EntityType.IronPlate, EntityType.PVCell, EntityType.Alloy].map((type) => (
          <ResourceDisplay key={`type-${type}`} type={type} count={resources.get(type)?.resourceCount ?? 0n} />
        ))}
      </div>
      <div>
        {[EntityType.Titanium, EntityType.Platinum, EntityType.Iridium, EntityType.Kimberlite].map((type) => (
          <ResourceDisplay key={`type-${type}`} type={type} count={resources.get(type)?.resourceCount ?? 0n} />
        ))}
      </div>
    </div>
  );
};
