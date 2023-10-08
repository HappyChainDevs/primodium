import { SingletonID } from "@latticexyz/network";
import { FaArrowRight } from "react-icons/fa";
import { SecondaryCard } from "src/components/core/Card";
import { Navigator } from "src/components/core/Navigator";
import { useFleetMoves } from "src/hooks/useFleetMoves";
import { OwnedBy } from "src/network/components/chainComponents";
import { Account, Hangar, Send } from "src/network/components/clientComponents";
import { ESendType } from "src/util/web3/types";

export const Invade: React.FC = () => {
  const player = Account.use(undefined, {
    value: SingletonID,
  }).value;
  const origin = Send.get()?.origin;
  const destination = Send.get()?.destination;
  const units = Hangar.use(origin, {
    units: [],
    counts: [],
  }).units;
  const ownedBy = OwnedBy.get(destination, {
    value: SingletonID,
  }).value;
  const fleetMoves = useFleetMoves();

  return (
    <SecondaryCard
      className={`w-full flex-row items-center gap-2 justify-between ${
        units.length === 0 || ownedBy === player || !fleetMoves ? "opacity-20" : "0"
      }`}
    >
      <img src="/img/icons/attackicon.png" className="w-8 h-8" />
      <p className="uppercase text-xs font-bold">invade</p>
      <Navigator.NavButton
        to="Send"
        className="btn-sm w-fit btn-error"
        disabled={units.length === 0 || ownedBy === player || !fleetMoves}
        onClick={() => Send.update({ sendType: ESendType.INVADE })}
      >
        <FaArrowRight />
      </Navigator.NavButton>
    </SecondaryCard>
  );
};
