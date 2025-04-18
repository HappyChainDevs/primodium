import { Entity } from "@primodiumxyz/reactive-tables";
import { useCore } from "@/react/hooks/useCore";

/**
 * Retrieves the owner of the given entity. If the entity is a fleet, it returns the owner of the fleet. If the entity
 * is not a fleet, it returns the owner of the entity itself.
 *
 * @param entity - The entity for which to retrieve the owner.
 * @returns The owner of the entity, or undefined if there is no owner.
 */
export const usePlayerOwner = (entity?: Entity) => {
  const { tables } = useCore();

  const isFleet = tables.IsFleet.use(entity)?.value;
  const owner = tables.OwnedBy.use(entity)?.value;
  const rockEntity = isFleet ? owner : entity;
  if (!entity) return undefined;
  return tables.OwnedBy.use(rockEntity as Entity)?.value as Entity | undefined;
};
