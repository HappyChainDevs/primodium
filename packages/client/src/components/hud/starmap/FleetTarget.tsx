import { Scenes } from "@game/constants";
import { Entity } from "@latticexyz/recs";
import { useMemo, useRef } from "react";
import { useMud } from "src/hooks";
import { usePrimodium } from "src/hooks/usePrimodium";
import { useSpaceRock } from "src/hooks/useSpaceRock";
import { components } from "src/network/components";
import { clearFleetStance } from "src/network/setup/contractCalls/fleetStance";
import { getCanAttackSomeone, getFleetPixelPosition, getFleetStats } from "src/util/unit";
import { Button } from "../../core/Button";
import { IconLabel } from "../../core/IconLabel";
import { Modal } from "../../core/Modal";
import { Fleets } from "../panes/fleets/Fleets";
import { Marker } from "src/components/core/Marker";

// this component assumes the fleet is owned by the player
export const _FleetTarget: React.FC<{ fleet: Entity; position: Entity }> = ({ fleet, position }) => {
  const mapOpen = components.MapOpen.use()?.value ?? false;
  const selectingAttackDestination = !!components.Attack.use()?.originFleet;
  const selectingDestination = !!components.Send.use()?.originFleet || selectingAttackDestination;
  const stats = getFleetStats(fleet);
  const spaceRockData = useSpaceRock(position);
  const mud = useMud();
  const primodium = usePrimodium();
  const {
    scene: { getScene },
  } = useRef(primodium.api(Scenes.Starmap)).current;

  const coord = useMemo(() => {
    const scene = getScene(Scenes.Starmap);

    if (!scene) return { x: 0, y: 0 };

    return getFleetPixelPosition(scene, fleet);
  }, [fleet, getScene]);

  const disableAttack = useMemo(
    () => selectingDestination || stats.attack === 0n || !getCanAttackSomeone(fleet),
    [selectingDestination, stats.attack, fleet]
  );

  const stance = components.FleetStance.use(fleet)?.stance;

  if (!mapOpen || !position) return <></>;

  return (
    <Marker id={"fleet-target"} scene={Scenes.Starmap} coord={coord}>
      <div className="w-14 h-14 border-2 border-error flex items-center justify-center bg-transparent">
        <div className="absolute top-0 right-0 translate-x-full w-36">
          <Button
            disabled={disableAttack}
            onClick={() => components.Attack.setOrigin(fleet)}
            className="btn-ghost btn-xs text-xs text-accent bg-rose-900 border border-l-0 border-secondary/50"
          >
            <IconLabel imageUri="/img/icons/weaponryicon.png" text="Attack" />
          </Button>
        </div>
        {!!stance && (
          <div className="absolute bottom-0 right-0 translate-x-full w-36">
            <Button
              onClick={() => clearFleetStance(mud, fleet)}
              className="btn-ghost btn-xs text-xs text-accent bg-rose-900 border border-l-0 border-secondary/50"
            >
              <IconLabel imageUri="/img/icons/moveicon.png" text="Clear Stance" />
            </Button>
          </div>
        )}

        {!stance && (
          <div className="absolute bottom-0 right-0 translate-x-full w-36">
            <Button
              onClick={() => components.Send.setOrigin(fleet)}
              className="btn-ghost btn-xs text-xs text-accent bg-rose-900 border border-l-0 border-secondary/50"
            >
              <IconLabel imageUri="/img/icons/moveicon.png" text={spaceRockData.isBlocked ? "Blocked" : "Move"} />
            </Button>
          </div>
        )}
        <div className="absolute bottom-0 left-0 -translate-x-full">
          <Button
            className="btn-ghost btn-xs text-xs text-accent bg-neutral border border-r-0 pl-2 border-secondary/50 w-28 transition-[width] duration-200"
            onClick={() => {
              components.Send.reset();
              components.Attack.reset();
              !selectingDestination && components.SelectedFleet.remove();
            }}
          >
            <IconLabel imageUri="/img/icons/returnicon.png" text={selectingDestination ? "CANCEL" : "CLOSE"} />
          </Button>
        </div>
        <div className="absolute top-0 left-0 -translate-x-full">
          <Modal>
            <Modal.Button
              onClick={() => components.ActiveRock.set({ value: position as Entity })}
              disabled={selectingDestination}
              className="btn-ghost btn-xs text-xs text-accent bg-neutral border border-r-0 pl-2 border-secondary/50 w-28 transition-[width] duration-200"
            >
              <IconLabel imageUri="/img/icons/settingsicon.png" text={"MANAGE"} />
            </Modal.Button>
            <Modal.Content className="w-3/4 h-4/5">
              <Fleets initialState="manageFleet" fleetEntity={fleet} />
            </Modal.Content>
          </Modal>
        </div>
      </div>
    </Marker>
  );
};

export const FleetTarget = () => {
  const activeFleet = components.SelectedFleet.use()?.value;
  const position = components.FleetMovement.use(activeFleet as Entity)?.destination;
  if (!activeFleet || !position) return <></>;
  return <_FleetTarget fleet={activeFleet as Entity} position={position as Entity} />;
};
