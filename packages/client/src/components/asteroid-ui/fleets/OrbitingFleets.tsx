import { useState } from "react";
import { BiSolidInvader } from "react-icons/bi";
import { FaCheck, FaShieldAlt } from "react-icons/fa";
import { BackgroundImage, BlockType } from "src/util/constants";
import { ESendType } from "src/util/web3/types";
import { ArrivalUnitStruct } from "../../../../../contracts/types/ethers-contracts/SendUnitsSystem";
import { EntityID } from "@latticexyz/recs";
import { getBlockTypeName } from "src/util/common";

const orbitingFleets = [
  {
    origin: { x: 0, y: 0 },
    type: 0,
  },
  {
    origin: { x: 40, y: -6 },
    units: [
      {
        unitType: BlockType.AegisDrone,
        count: 100,
      },
      {
        unitType: BlockType.StingerDrone,
        count: 10,
      },
    ],
    type: 1,
  },

  {
    origin: { x: 40, y: -6 },
    units: [
      {
        unitType: BlockType.AegisDrone,
        count: 100,
      },
      {
        unitType: BlockType.StingerDrone,
        count: 10,
      },
    ],
    type: 1,
  },
];

export const LabeledValue: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ children, label }) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-bold text-cyan-400">{label}</p>
      <div className="flex items-center gap-1">{children}</div>
    </div>
  );
};

export const InvasionRow = () => {
  return (
    <div className="flex items-center justify-between w-full p-2 border rounded-md border-slate-700 bg-slate-800 ">
      <div className="flex gap-1 items-center">
        <div className="rounded-md bg-rose-800 gap-1 p-1 mr-2 flex flex-col items-center w-20">
          <BiSolidInvader size={16} />
          <p className="bg-rose-900 border border-rose-500  rounded-md px-1 text-[.6rem]">
            INVADE
          </p>
        </div>
        <LabeledValue label="TARGET">
          <p>[0, 0]</p>
        </LabeledValue>
      </div>
      <div className="text-right">
        <LabeledValue label="ACTION">
          <div className="flex gap-1 text-right w-full">
            <p className="w-full">N/A</p>
          </div>
        </LabeledValue>
      </div>
    </div>
  );
};

export const ReinforcmentRow: React.FC<{
  units: ArrivalUnitStruct[] | undefined;
}> = ({ units }) => {
  const [showUnits, setShowUnits] = useState<boolean>(false);

  return (
    <div className="">
      <div className="relative flex items-center justify-between w-full p-2 border rounded-md border-slate-700 bg-slate-800 z-10">
        <div className="flex gap-1 items-center">
          <div className="rounded-md bg-green-800 gap-1 p-1 mr-2 flex flex-col items-center w-20">
            <FaShieldAlt size={16} />
            <p className="bg-green-900 border border-green-500  rounded-md px-1 text-[.6rem]">
              REINFORCE
            </p>
          </div>
          <LabeledValue label="TARGET">
            <p>[0, 0]</p>
          </LabeledValue>
        </div>
        <div className="text-right">
          <LabeledValue label="ACTION">
            <div className="flex gap-1">
              <button className="bg-cyan-700 px-2 py-1 rounded-md flex items-center gap-1 border border-cyan-500 hover:scale-105 transition-all">
                <FaCheck />
                ACCEPT UNITS
              </button>
            </div>
          </LabeledValue>
        </div>
      </div>
      {units && (
        <div className="relative border -mt-2 border-t-0 rounded-b-md pt-3 bg-slate-800/50 z-0 border-slate-600 p-1 space-y-1 flex flex-col items-end">
          {showUnits &&
            units.map((unit, index) => (
              <div
                key={index}
                className="flex gap-1 items-center w-full justify-between p-1 border border-slate-600 rounded-md bg-slate-900/70"
              >
                <div className="flex items-center gap-1">
                  <img
                    src={BackgroundImage.get(unit.unitType as EntityID)?.at(0)}
                    alt="unit"
                    className="w-5 h-5"
                  />
                  {getBlockTypeName(unit.unitType as EntityID)}
                </div>

                <p className="text-cyan-400">
                  x{Number(unit.count.toString())}
                </p>
              </div>
            ))}
          <button
            className="flex gap-1 items-center text-[.6rem] px-2"
            onClick={() => setShowUnits(!showUnits)}
          >
            {!showUnits && "+ VIEW UNITS"}
            {showUnits && "- HIDE UNITS"}
          </button>
        </div>
      )}
    </div>
  );
};

export const OrbitingFleets = () => {
  return (
    <div className="w-full text-xs space-y-2 h-96 overflow-y-auto scrollbar">
      {orbitingFleets.length === 0 && (
        <div className="w-full h-full bg-slate-800 border rounded-md border-slate-700 flex items-center justify-center font-bold">
          <p className="opacity-50">NO ORBITING FLEETS</p>
        </div>
      )}
      {orbitingFleets.length !== 0 &&
        orbitingFleets.map((fleet, index) => {
          if (fleet.type === ESendType.INVADE)
            return <InvasionRow key={index} />;
          else return <ReinforcmentRow key={index} units={fleet.units} />;
        })}
    </div>
  );
};
