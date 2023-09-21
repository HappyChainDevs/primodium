import { EntityID } from "@latticexyz/recs";
import {
  Arrival,
  HasCompletedObjective,
  Level,
  OwnedBy,
  P_BuildingCountRequirement,
  P_HasBuiltBuilding,
  P_RaidRequirement,
  P_RequiredResources,
  P_RequiredUtility,
  P_UnitRequirement,
  Position,
} from "src/network/components/chainComponents";
import { Account, BlockNumber } from "src/network/components/clientComponents";
import { ESendType } from "src/util/web3/types";
import { BiSolidInvader } from "react-icons/bi";
import { FaShieldAlt } from "react-icons/fa";
import { SingletonID } from "@latticexyz/network";
import { useGameStore } from "src/store/GameStore";
import { invade, raid, recall, reinforce } from "src/util/web3";
import { useMud } from "src/hooks/useMud";
import { useState } from "react";
import { getIndex } from "src/util/arrival";

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

export const ClaimObjectiveButton: React.FC<{
  entity: EntityID;
  objectiveEntity: EntityID;
}> = ({ entity, objectiveEntity }) => {
  const network = useMud();

  const levelRequirement = Level.use(objectiveEntity);
  const objectiveClaimedRequirement =
    HasCompletedObjective.use(objectiveEntity);

  const hasBuiltBuildingRequirement = P_HasBuiltBuilding.use(objectiveEntity);
  const buildingCountRequirement =
    P_BuildingCountRequirement.use(objectiveEntity);
  const raidRequirement = P_RaidRequirement.use(objectiveEntity);

  const resourceRequirement = P_RequiredResources.use(objectiveEntity);
  const utilityRequirement = P_RequiredUtility.use(objectiveEntity);
  const unitRequirement = P_UnitRequirement.use(objectiveEntity);

  const canClaiem = useMemo(() => {}, [
    levelRequirement,
    objectiveClaimedRequirement,
    hasBuiltBuildingRequirement,
    buildingCountRequirement,
    raidRequirement,
    buildingCountRequirement,
    resourceRequirement,
    resourceRequirement,
    utilityRequirement,
    unitRequirement,
  ]);
  const destinationOwner = OwnedBy.use(destination)?.value;
  const player = Account.use()?.value ?? SingletonID;
  const transactionLoading = useGameStore((state) => state.transactionLoading);

  const isNeutral = destinationOwner === player || !destinationOwner;

  const index = getIndex(entity);
  return (
    <button
      disabled={transactionLoading || index === undefined}
      className={`border p-1 rounded-md hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
        isNeutral || sendType === ESendType.REINFORCE
          ? "bg-cyan-700 border-cyan-500"
          : "bg-rose-800 border-rose-600"
      } ${transactionLoading ? "opacity-50 pointer-events-none" : ""} `}
      onClick={() => {
        switch (sendType) {
          case ESendType.INVADE:
            invade(destination, network);
            return;
          case ESendType.RAID:
            raid(destination, network);
            return;
          case ESendType.REINFORCE:
            if (!isNeutral || outgoing) {
              recall(destination, network);
              return;
            }

            if (index == undefined) return;
            reinforce(destination, index, network);
        }
      }}
    >
      {isNeutral &&
        (sendType === ESendType.REINFORCE
          ? !outgoing
            ? "ACCEPT"
            : "RECALL"
          : "LAND")}
      {!isNeutral && (sendType === ESendType.REINFORCE ? "RECALL" : "ATTACK")}
    </button>
  );
};

export const Objective: React.FC<{
  arrivalEntity: EntityID;
  arrivalBlock: string;
  destination: EntityID;
  sendType: ESendType;
  outgoing: boolean;
}> = ({ arrivalBlock, arrivalEntity, destination, sendType, outgoing }) => {
  const blockNumber = BlockNumber.use()?.value;

  const destinationPosition = Position.use(destination, {
    x: 0,
    y: 0,
    parent: "0" as EntityID,
  });
  const arrivalTime = Number(arrivalBlock) - (blockNumber ?? 0);

  return (
    <div className="flex items-center justify-between w-full border rounded-md border-slate-700 bg-slate-800 ">
      <div className="flex gap-1 items-center">
        {sendType === ESendType.INVADE && (
          <div className="rounded-md bg-rose-800 gap-1 p-1 mr-2 flex flex-col items-center w-20">
            <BiSolidInvader size={16} />
            <p className="bg-rose-900 border border-rose-500  rounded-md px-1 text-[.6rem]">
              INVADE
            </p>
          </div>
        )}
        {sendType === ESendType.RAID && (
          <div className="rounded-md bg-rose-800 gap-1 p-1 mr-2 flex flex-col items-center w-20">
            <BiSolidInvader size={16} />
            <p className="bg-rose-900 border border-rose-500  rounded-md px-1 text-[.6rem]">
              RAID
            </p>
          </div>
        )}
        {sendType === ESendType.REINFORCE && (
          <div className="rounded-md bg-green-800 gap-1 p-1 mr-2 flex flex-col items-center w-20">
            <FaShieldAlt size={16} />
            <p className="bg-green-900 border border-green-500  rounded-md px-1 text-[.6rem]">
              REINFORCE
            </p>
          </div>
        )}
        <LabeledValue label={`${arrivalTime > 0 ? "IN-TRANSIT" : "ORBITING"}`}>
          <p>
            [{destinationPosition.x}, {destinationPosition.y}]
          </p>
        </LabeledValue>
      </div>
      <div className="text-right mr-2">
        {arrivalTime > 0 ? (
          <LabeledValue label="ETA">
            <div className="flex gap-1">
              <p>{arrivalTime}</p>
              <span className="opacity-50">BLOCKS</span>
            </div>
          </LabeledValue>
        ) : (
          <ClaimObjectiveButton
            entity={arrivalEntity}
            destination={destination}
            sendType={sendType}
            outgoing={outgoing}
          />
        )}
      </div>
    </div>
  );
};

export const UnclaimedObjective: React.FC<{ user: EntityID }> = ({ user }) => {
  const fleets = Arrival.use({
    from: user,
  });

  return (
    <div className="w-full text-xs space-y-2 h-full overflow-y-auto">
      {fleets.length === 0 ? (
        <div className="w-full bg-slate-800 border rounded-md border-slate-700 flex items-center justify-center h-12 font-bold">
          <p className="opacity-50">NO OUTGOING FLEETS</p>
        </div>
      ) : (
        fleets.map((fleet, i) => {
          if (!fleet) return null;
          return (
            <Objective
              key={i}
              arrivalEntity={fleet.entity}
              arrivalBlock={fleet.arrivalBlock}
              destination={fleet.destination}
              sendType={fleet.sendType}
              outgoing={true}
            />
          );
        })
      )}
    </div>
  );
};

export const ClaimedObjective: React.FC<{ user: EntityID }> = ({ user }) => {
  const fleets = Arrival.use({
    to: user,
    sendType: ESendType.REINFORCE,
  });

  return (
    <div className="w-full text-xs space-y-2 h-full overflow-y-auto">
      {fleets.length === 0 ? (
        <div className="w-full bg-slate-800 border rounded-md border-slate-700 flex items-center justify-center h-12 font-bold">
          <p className="opacity-50">NO REINFORCEMENT FLEETS</p>
        </div>
      ) : (
        fleets.map((fleet, i) => {
          if (!fleet) return null;
          return (
            <Objective
              key={i}
              arrivalEntity={fleet.entity}
              arrivalBlock={fleet.arrivalBlock}
              destination={fleet.destination}
              sendType={fleet.sendType}
              outgoing={false}
            />
          );
        })
      )}
    </div>
  );
};

export const UserFleets: React.FC<{ user: EntityID }> = ({ user }) => {
  const [index, setIndex] = useState<number>(0);

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex items-center justify-center gap-2">
        <button
          className={`border  p-1 rounded-md text-sm hover:scale-105 transition-all ${
            index === 0 ? "border-cyan-700 bg-slate-800" : "border-slate-700"
          }`}
          onClick={() => setIndex(0)}
        >
          Outgoing
        </button>
        <button
          className={`border  p-1 rounded-md text-sm hover:scale-105 transition-all ${
            index === 1 ? "border-cyan-700 bg-slate-800" : "border-slate-700"
          }`}
          onClick={() => setIndex(1)}
        >
          Reinforcements
        </button>
      </div>

      {index === 0 && <UnclaimedObjective user={user} />}
      {index === 1 && <ClaimedObjective user={user} />}
    </div>
  );
};
