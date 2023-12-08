import { primodium } from "@game/api";
import { Scenes } from "@game/constants";
import { Entity } from "@latticexyz/recs";
import { Coord } from "@latticexyz/utils";
import { ESendType } from "contracts/config/enums";
import { BiSolidInvader } from "react-icons/bi";
import { FaCrosshairs, FaShieldAlt } from "react-icons/fa";
import { Badge } from "src/components/core/Badge";
import { Button } from "src/components/core/Button";
import { TransactionQueueMask } from "src/components/shared/TransactionQueueMask";
import { useMud } from "src/hooks";
import { components } from "src/network/components";
import { decodeEntity } from "src/util/encode";
import { invade } from "src/util/web3/contractCalls/invade";
import { raid } from "src/util/web3/contractCalls/raid";
import { reinforce } from "src/util/web3/contractCalls/reinforce";

export const LabeledValue: React.FC<{
  label: string;
  children?: React.ReactNode;
}> = ({ children = null, label }) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-bold text-cyan-400">{label}</p>
      <div className="flex items-center gap-1">{children}</div>
    </div>
  );
};

export const LocateButton: React.FC<{
  destination: Entity;
  coord: Coord;
}> = ({ destination, coord }) => {
  return (
    <Button
      className="btn-secondary btn-sm btn-square flex"
      onClick={async () => {
        const mapOpen = components.MapOpen.get(undefined, {
          value: false,
        }).value;

        if (!mapOpen) {
          const { transitionToScene } = primodium.api().scene;

          await transitionToScene(Scenes.Asteroid, Scenes.Starmap);
          components.MapOpen.set({ value: true });
        }

        const { pan, zoomTo } = primodium.api(Scenes.Starmap).camera;

        components.Send.setDestination(destination);

        pan(coord);

        zoomTo(2);
      }}
    >
      <FaCrosshairs />
    </Button>
  );
};

export const Fleet: React.FC<{
  arrivalEntity: Entity;
  arrivalTime: bigint;
  destination: Entity;
  sendType: ESendType;
  dontShowButton?: boolean;
}> = ({ arrivalTime, arrivalEntity, destination, sendType, dontShowButton }) => {
  const destinationPosition = components.Position.use(destination, {
    x: 0,
    y: 0,
    parent: "0" as Entity,
  });
  const timeRemaining = arrivalTime - (components.Time.use()?.value ?? 0n);

  const arrival = components.Arrival.getEntity(arrivalEntity);

  const unitTotal = arrival?.unitCounts.reduce((acc, curr) => acc + curr, 0n) ?? 0n;

  return (
    <div className="flex items-center justify-between w-full border rounded-box border-slate-700 bg-slate-800 ">
      <div className="flex gap-1 items-center">
        {sendType === ESendType.Invade && (
          <div className="rounded-box bg-rose-800 gap-1 p-1 mr-2 flex flex-col items-center w-20">
            <BiSolidInvader size={16} />
            <p className="bg-rose-900 border border-rose-500 rounded-box px-1 text-[.6rem]">INVADE</p>
          </div>
        )}
        {sendType === ESendType.Raid && (
          <div className="rounded-box bg-rose-800 gap-1 p-1 mr-2 flex flex-col items-center w-20">
            <BiSolidInvader size={16} />
            <p className="bg-rose-900 border border-rose-500 rounded-box px-1 text-[.6rem]">RAID</p>
          </div>
        )}
        {sendType === ESendType.Reinforce && (
          <div className="rounded-box bg-green-800 gap-1 p-1 mr-2 flex flex-col items-center w-20">
            <FaShieldAlt size={16} />
            <p className="bg-green-900 border border-green-500  rounded-box px-1 text-[.6rem]">REINFORCE</p>
          </div>
        )}
        <LabeledValue label={`${timeRemaining > 0 ? "IN TRANSIT" : "ORBITING"}`}>
          <p className="text-xs">
            [{destinationPosition.x},{destinationPosition.y}]
          </p>
        </LabeledValue>
      </div>
      <Badge className="text-xs flex flex-col items-center h-fit">
        <p className="text-lg leading-5">{unitTotal.toLocaleString()}</p> UNITS
      </Badge>
      <div className="text-right mr-2">
        {timeRemaining > 0 ? (
          <LabeledValue label="ETA">
            <div className="flex gap-1 text-xs">
              <p>{timeRemaining.toLocaleString()}</p>
              <span className="opacity-50">SEC</span>
            </div>
          </LabeledValue>
        ) : (
          !dontShowButton && <OrbitActionButton arrivalEntity={arrivalEntity} sendType={sendType} />
        )}
      </div>
    </div>
  );
};

export const OrbitActionButton: React.FC<{
  arrivalEntity: Entity;
  sendType: ESendType;
}> = ({ arrivalEntity, sendType }) => {
  const network = useMud().network;

  const action = sendType == ESendType.Invade ? invade : sendType == ESendType.Raid ? raid : reinforce;

  const { key } = decodeEntity(components.MapItemArrivals.metadata.keySchema, arrivalEntity);
  return (
    <TransactionQueueMask queueItemId={key as Entity}>
      <Button
        className={`btn-sm rounded-box ${
          sendType == ESendType.Reinforce ? "big-green-800" : "bg-rose-800"
        } gap-1 flex flex-col items-center w-20`}
        onClick={() => {
          action(arrivalEntity, network);
        }}
      >
        {sendType === ESendType.Invade && "INVADE"}
        {sendType === ESendType.Raid && "RAID"}
        {sendType === ESendType.Reinforce && "REINFORCE"}
      </Button>
    </TransactionQueueMask>
  );
};
