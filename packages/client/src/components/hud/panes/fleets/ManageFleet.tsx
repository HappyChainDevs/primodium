import { Scenes } from "@game/constants";
import { Entity } from "@latticexyz/recs";
import { EFleetStance } from "contracts/config/enums";
import { FC, useMemo } from "react";
import { Button } from "src/components/core/Button";
import { Modal } from "src/components/core/Modal";
import { TransactionQueueMask } from "src/components/shared/TransactionQueueMask";
import { useMud } from "src/hooks";
import { useFullResourceCounts } from "src/hooks/useFullResourceCount";
import { usePrimodium } from "src/hooks/usePrimodium";
import { useUnitCounts } from "src/hooks/useUnitCount";
import { components } from "src/network/components";
import { disbandFleet } from "src/network/setup/contractCalls/fleetDisband";
import { landFleet } from "src/network/setup/contractCalls/fleetLand";
import { clearFleetStance, setFleetStance } from "src/network/setup/contractCalls/fleetStance";
import { formatResourceCount } from "src/util/number";
import { ResourceIcon } from "../../modals/fleets/ResourceIcon";
import { FleetEntityHeader } from "./FleetHeader";
import { useFleetNav } from "./Fleets";

const ManageFleet: FC<{ fleetEntity: Entity }> = ({ fleetEntity }) => {
  const mud = useMud();
  const api = usePrimodium().api(Scenes.Starmap);
  const scene = api.scene.getScene(Scenes.Starmap);

  const { BackButton, NavButton } = useFleetNav();

  const units = useUnitCounts(fleetEntity);
  const resources = useFullResourceCounts(fleetEntity);

  const totalUnits = useMemo(() => [...units.values()].reduce((acc, cur) => acc + cur, 0n), [units]);
  const totalResources = useMemo(
    () => [...resources.values()].reduce((acc, cur) => acc + cur.resourceCount, 0n),
    [resources]
  );
  const time = components.Time.use()?.value ?? 0n;
  const movement = components.FleetMovement.use(fleetEntity);

  // const destination = components.FleetMovement.getWithKeys({ entity: fleetEntity as Hex })?.destination;
  // const fleetsOnAsteroidQuery = [Has(components.IsFleet), HasValue(components.FleetMovement, { destination })];
  // const fleetsOnAsteroid = useEntityQuery(fleetsOnAsteroidQuery);
  // const time = components.Time.use()?.value ?? 0n;
  // const followableFleets = fleetsOnAsteroid.filter((entity) => {
  //   if (entity == fleetEntity) return false;
  //   const movement = components.FleetMovement.get(entity);
  //   if ((movement?.arrivalTime ?? 0n) > time) return false;
  //   const stance = components.FleetStance.get(entity);
  //   return stance?.stance != 0;
  // });

  const activeStance = components.FleetStance.use(fleetEntity);
  const cannotDoAnything = totalUnits <= 0n || !movement || movement.arrivalTime > time;

  const handleDefend = () => {
    const position = movement?.destination as Entity;
    if (!position) return;
    if (activeStance?.stance == EFleetStance.Defend) clearFleetStance(mud, fleetEntity);
    else setFleetStance(mud, fleetEntity, EFleetStance.Defend, position);
  };

  const handleBlock = () => {
    const position = movement?.destination as Entity;
    if (!position) return;
    if (activeStance?.stance == EFleetStance.Block) clearFleetStance(mud, fleetEntity);
    else setFleetStance(mud, fleetEntity, EFleetStance.Block, position);
  };

  // const handleFollow = (target: Entity) => {
  //   if (activeStance?.stance == EFleetStance.Follow && activeStance?.target == target)
  //     clearFleetStance(mud, fleetEntity);
  //   setFleetStance(mud, fleetEntity, EFleetStance.Follow, target);
  // };
  return (
    <div className="w-full h-full flex flex-col gap-2 p-2">
      {/*Header*/}
      <div className="flex items-center justify-between gap-2 w-full uppercase font-bold text-xs text-left">
        <p className="opacity-50">Manage Fleet</p>
      </div>

      <div className="grid grid-cols-4 gap-2 h-full overflow-hidden">
        {/* Left Side */}
        <div className="col-span-3 flex flex-col gap-2 h-full relative">
          <div className="bg-base-100 p-4">
            <FleetEntityHeader entity={fleetEntity} />
          </div>
          <div className="flex-1 flex flex-col bg-base-100 p-4 gap-2">
            <p className="uppercase text-xs opacity-50 font-bold">UNITS</p>
            {units.size > 0 ? (
              <div className="grid grid-cols-4 grid-rows-2 gap-2">
                {[...units.entries()].map(([unit, count]) => {
                  if (count <= 0n) return null;
                  return (
                    <ResourceIcon key={`unit-${unit}`} resource={unit as Entity} amount={count.toString()} size="sm" />
                  );
                })}
              </div>
            ) : (
              <p className="w-full h-full grid place-items-center text-xs uppercase font-bold">No Units</p>
            )}

            <NavButton
              className="btn-primary btn-xs w-fit self-end"
              goto="transfer"
              from={movement?.destination as Entity}
              to={fleetEntity}
              onClick={() =>
                movement?.destination && components.ActiveRock.set({ value: movement.destination as Entity })
              }
            >
              Transfer Units
            </NavButton>
          </div>
          <div className="flex-1 flex flex-col bg-base-100 p-4 gap-2">
            <p className="uppercase text-xs opacity-50 font-bold">RESOURCES</p>
            {resources.size > 0 ? (
              <div className="flex-1 flex flex-col bg-base-100 p-4 grid grid-cols-4 grid-rows-2 gap-2">
                {[...resources.entries()].map(([resource, data]) => {
                  if (data.resourceCount <= 0n) return null;
                  return (
                    <ResourceIcon
                      key={`resource-${resource}`}
                      resource={resource as Entity}
                      amount={formatResourceCount(resource as Entity, data.resourceCount)}
                      size="sm"
                    />
                  );
                })}
              </div>
            ) : (
              <p className="w-full h-full grid place-items-center text-xs uppercase font-bold">No Resources</p>
            )}
            <NavButton
              className="btn-primary btn-xs w-fit self-end"
              goto="transfer"
              from={movement?.destination as Entity}
              to={fleetEntity}
              onClick={() =>
                movement?.destination && components.ActiveRock.set({ value: movement.destination as Entity })
              }
            >
              Transfer Resources
            </NavButton>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex flex-col grow col-span-1 overflow-hidden gap-2">
          <TransactionQueueMask
            queueItemId={"FleetStance" as Entity}
            className="bg-base-100 flex flex-col p-4 gap-1 overflow-hidden h-full"
          >
            <div className="bg-neutral uppercase text-sm font-bold text-center">STANCE</div>
            <div className="flex items-center gap-1 uppercase font-bold">
              DEFEND
              {activeStance?.stance == EFleetStance.Defend && (
                <p className="opacity-50 text-xs font-bold uppercase">(active)</p>
              )}
            </div>
            <p className="italic opacity-50 text-xs">Use this fleet{"'"}s units to defend this space rock</p>
            <Button className="btn btn-primary btn-sm" onClick={handleDefend} disabled={cannotDoAnything}>
              {activeStance?.stance == EFleetStance.Defend ? "STOP DEFENDING" : "DEFEND"}
            </Button>
            <div className="flex items-center gap-1 uppercase font-bold">
              BLOCK
              {activeStance?.stance == EFleetStance.Block && (
                <p className="opacity-50 text-xs font-bold uppercase">(active)</p>
              )}
            </div>
            <p className="italic opacity-50 text-xs">Stop other fleets from leaving this space rock</p>
            <Button className="btn btn-primary btn-sm" onClick={handleBlock} disabled={cannotDoAnything}>
              {activeStance?.stance == EFleetStance.Block ? "STOP BLOCKING" : "BLOCK"}
            </Button>
            {/* <div className="flex items-center gap-1 uppercase font-bold">
              FOLLOW
              {activeStance?.stance == EFleetStance.Follow && (
                <p className="opacity-50 text-xs font-bold uppercase">(active)</p>
              )}
            </div> */}
            {/* <p className="italic opacity-50 text-xs">Automatically move whenever another fleet moves</p> */}
            {/* <div className="flex flex-col overflow-y-auto scrollbar h-full">
              {followableFleets.length > 0 ? (
                followableFleets.map((target, i) => (
                  <div
                    className="w-full p-2 bg-neutral flex justify-between items-center"
                    key={`follow-${target}-${i}`}
                    onMouseEnter={() => components.HoverEntity.set({ value: target as Entity })}
                    onMouseLeave={() => components.HoverEntity.remove()}
                  >
                    <p className="text-sm font-bold">{entityToRockName(target)}</p>
                    <Button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleFollow(target)}
                      disabled={totalUnits <= 0n}
                    >
                      {activeStance?.target === target ? "UN" : ""}FOLLOW
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-error font-bold uppercase text-xs">No fleets to follow</div>
              )}
            </div> */}
          </TransactionQueueMask>
          <div className="flex flex-col gap-2">
            <Modal.CloseButton
              className="btn btn-primary btn-sm"
              disabled={cannotDoAnything}
              onClick={() => {
                if (!scene) return;
                components.Attack.reset();
                components.Send.setOrigin(fleetEntity);
                api.util.openMap();
              }}
            >
              SEND
            </Modal.CloseButton>

            <Modal.CloseButton
              className="btn btn-primary btn-sm"
              disabled={cannotDoAnything}
              onClick={async () => {
                if (!scene) return;
                components.Send.reset();
                components.Attack.setOrigin(fleetEntity);
                await api.util.openMap();

                const fleetDestinationEntity = components.FleetMovement.get(fleetEntity)?.destination as Entity;
                if (!fleetDestinationEntity) return;
                const fleetDestinationPosition = components.Position.get(fleetDestinationEntity);
                if (!fleetDestinationPosition) return;
                api.camera.pan(fleetDestinationPosition);
              }}
            >
              ATTACK
            </Modal.CloseButton>
            <TransactionQueueMask queueItemId={"landFleet" as Entity}>
              <Button
                className="btn btn-primary btn-sm w-full"
                onClick={() => movement?.destination && landFleet(mud, fleetEntity, movement.destination as Entity)}
                disabled={totalUnits <= 0n}
              >
                LAND
              </Button>
            </TransactionQueueMask>
            <TransactionQueueMask queueItemId={"disband" as Entity}>
              <Button
                className="btn btn-error btn-sm w-full"
                disabled={totalUnits + totalResources <= 0n}
                onClick={() => disbandFleet(mud, fleetEntity)}
              >
                DISBAND
              </Button>
            </TransactionQueueMask>
          </div>
        </div>
      </div>
      <BackButton className="self-start">BACK</BackButton>
    </div>
  );
};

export default ManageFleet;
