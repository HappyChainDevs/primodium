import { Entity } from "@latticexyz/recs";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { FaHandshake, FaHandshakeSlash } from "react-icons/fa";
import { useMud } from "src/hooks";
import { useFleetMoves } from "src/hooks/useFleetMoves";
import { usePrimodium } from "src/hooks/usePrimodium";
import { components } from "src/network/components";
import { getBuildingImage } from "src/util/building";
import { EntityType, ResourceImage } from "src/util/constants";
import { getAsteroidImage } from "src/util/asteroid";
import { Button } from "../core/Button";
import { IconLabel } from "../core/IconLabel";
import { Modal } from "../core/Modal";
import { Tooltip } from "../core/Tooltip";
import { AccountDisplay } from "../shared/AccountDisplay";
import { Account } from "../transfer/Account";

export const Profile = () => {
  const {
    playerAccount: { entity: playerEntity },
    sessionAccount,
  } = useMud();
  const primodium = usePrimodium();
  const delegate = sessionAccount?.entity;
  const asteroid = components.Home.use(playerEntity)?.value as Entity | undefined;
  const mainBase = components.Home.use(asteroid)?.value;
  const mainbaseLevel = components.Level.use(mainBase as Entity)?.value ?? 1n;
  const fleetMoves = useFleetMoves();
  const mapOpen = components.MapOpen.use()?.value ?? false;
  const buildingImage = getBuildingImage(primodium, (mainBase ?? singletonEntity) as Entity);

  return (
    <div className="flex flex-row">
      <Button className="flex flex-col justify-end border-t-0 border-secondary rounded-t-none ml-2 w-24 h-[6.3rem] p-0">
        <IconLabel
          imageUri={mapOpen ? getAsteroidImage(primodium, (asteroid ?? singletonEntity) as Entity) : buildingImage}
          className="text-2xl scale-125 pt-3 pb-2"
        />
        <div className="bg-base-100 w-full rounded-box rounded-t-none p-1 border-t border-secondary">
          {!mapOpen && (
            <>
              <span className="text-accent">LVL.</span>
              {mainbaseLevel.toString()}
            </>
          )}
          {mapOpen && (
            <div className="flex justify-center items-center gap-1 w-full items-center">
              <IconLabel
                imageUri={ResourceImage.get(EntityType.FleetMoves) ?? ""}
                text={fleetMoves.toString()}
                tooltipText="Fleet Moves"
              />
              <span className="text-accent">LEFT</span>
            </div>
          )}
        </div>
      </Button>
      <div>
        <div className="flex flex-col p-1 bg-opacity-50 bg-neutral backdrop-blur-md rounded-box rounded-l-none rounded-t-none text-sm border border-secondary border-l-0">
          <div className="flex gap-2 items-center justify-center">
            <AccountDisplay player={playerEntity} />{" "}
          </div>
          <hr className="border-secondary/50" />
        </div>
        <Modal title="account">
          <Modal.Button className="btn-xs btn-ghost flex gap-2 m-auto text-accent mt-1 w-full">
            <Tooltip text={`${delegate ? "" : "not"} delegating`} direction="bottom">
              <div>
                {delegate ? (
                  <FaHandshake className="text-success w-4 h-4" />
                ) : (
                  <FaHandshakeSlash className="text-error w-4 h-4" />
                )}
              </div>
            </Tooltip>
            <p>MANAGE ACCOUNT</p>
          </Modal.Button>
          <Modal.Content className="w-[40rem] h-[50rem]">
            <Account />
          </Modal.Content>
        </Modal>
      </div>
    </div>
  );
};
