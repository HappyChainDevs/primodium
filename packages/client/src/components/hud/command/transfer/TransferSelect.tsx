import { useEntityQuery } from "@latticexyz/react";
import { Entity, Has, HasValue } from "@latticexyz/recs";
import { InterfaceIcons } from "@primodiumxyz/assets";
import { Button } from "src/components/core/Button";
import { useMud } from "src/hooks";
import { components } from "src/network/components";
import { entityToFleetName, entityToRockName } from "@/util/name";
import { getAsteroidImage } from "@/util/asteroid";
import { usePrimodium } from "@/hooks/usePrimodium";
import { useTransfer } from "@/hooks/providers/TransferProvider";
import { cn } from "@/util/client";
import { Card } from "@/components/core/Card";
import { useEffect } from "react";

export const TransferSelect = <NewFleet extends boolean | undefined = false>({
  handleSelect,
  showNewFleet,
  hideNotOwned,
}: {
  handleSelect: NewFleet extends true ? (entity: Entity | "newFleet") => void : (entity: Entity) => void;
  showNewFleet?: NewFleet;
  hideNotOwned?: boolean;
}) => {
  const { left, right } = useTransfer();
  const activeEntities = [left, right];
  const rockEntity = components.ActiveRock.use()?.value;
  if (!rockEntity) throw new Error("No active rock");
  const query = [Has(components.IsFleet), HasValue(components.FleetMovement, { destination: rockEntity })];
  const time = components.Time.use()?.value ?? 0n;
  const playerEntity = useMud().playerAccount.entity;
  const fleetsOnRock = [...useEntityQuery(query)].filter((entity) => {
    const arrivalTime = components.FleetMovement.get(entity)?.arrivalTime ?? 0n;
    if (arrivalTime > time) return false;
    if (!hideNotOwned) return true;

    const fleetOwnerRock = components.OwnedBy.get(entity)?.value as Entity | undefined;
    const fleetOwnerPlayer = components.OwnedBy.get(fleetOwnerRock)?.value;
    return fleetOwnerPlayer == playerEntity;
  });

  const handleSelectWithNewFleet = handleSelect as (entity: Entity | "newFleet") => void;

  return (
    <Card className="w-full h-full overflow-hidden">
      <div className="grid grid-cols-3 gap-2 w-full overflow-scroll">
        <SelectOption
          entity={rockEntity}
          disabled={activeEntities.includes(rockEntity)}
          onSelect={() => handleSelect(rockEntity)}
        />

        {fleetsOnRock.map((fleet) => (
          <SelectOption
            key={`fleet-option-${fleet}`}
            entity={fleet}
            disabled={activeEntities.includes(fleet)}
            onSelect={() => handleSelect(fleet)}
          />
        ))}
        {showNewFleet == true &&
          new Array(30)
            .fill(null)
            .map((_, i) => (
              <SelectOption
                key={i}
                entity={"newFleet"}
                disabled={activeEntities.includes("newFleet")}
                onSelect={() => handleSelectWithNewFleet("newFleet")}
              />
            ))}
      </div>
    </Card>
  );
};

const SelectOption = ({
  entity,
  onSelect,
  disabled,
}: {
  entity: Entity | "newFleet";
  onSelect: () => void;
  selected?: boolean;
  disabled?: boolean;
}) => {
  const primodium = usePrimodium();
  const isFleet = entity !== "newFleet" && components.IsFleet.has(entity);
  const content = entity === "newFleet" ? "New Fleet" : isFleet ? entityToFleetName(entity) : entityToRockName(entity);

  const imgSrc =
    entity === "newFleet" ? InterfaceIcons.Add : isFleet ? InterfaceIcons.Fleet : getAsteroidImage(primodium, entity);
  useEffect(() => () => components.HoverEntity.remove(), []);
  return (
    <Button
      disabled={disabled}
      variant="neutral"
      size="content"
      onClick={onSelect}
      onMouseEnter={() => entity !== "newFleet" && components.HoverEntity.set({ value: entity })}
      onMouseLeave={() => components.HoverEntity.remove()}
      className={cn(`flex w-full aspect-square flex-col gap-2 items-center`)}
    >
      <img src={imgSrc} className="w-6" />
      <span className="text-pretty">{content}</span>
    </Button>
  );
};
