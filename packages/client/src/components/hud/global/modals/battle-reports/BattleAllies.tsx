import { useMemo, useState } from "react";
import { Hex } from "viem";

import { InterfaceIcons } from "@primodiumxyz/assets";
import { entityToFleetName, entityToRockName } from "@primodiumxyz/core";
import { useCore } from "@primodiumxyz/core/react";
import { Entity } from "@primodiumxyz/reactive-tables";
import { Button } from "@/components/core/Button";
import { UnitStatus } from "@/components/hud/global/modals/battle-reports/UnitStatus";

type Participant = {
  entity: Hex;

  units: Record<
    string,
    {
      level: bigint;
      unitsAtStart: bigint;
      casualties: bigint;
    }
  >;
};

export const BattleAllies = ({ allies }: { allies: (Participant | undefined)[] }) => {
  const [openAlly, setOpenAlly] = useState<Entity | null>(null);

  const openAllyData = useMemo(() => {
    if (!openAlly) return;
    return allies.find((ally) => ally && ally.entity === openAlly);
  }, [openAlly, allies]);

  if (allies.length === 0) return;
  return (
    <div className="flex w-full gap-4">
      <p className="w-1/3 pt-2 text-xs font-bold text-accent text-right">ALLIES</p>
      <div className="flex flex-col w-2/3 gap-1">
        <div className="grid grid-cols-4 gap-1">
          {allies.map(
            (ally, i) =>
              !!ally && (
                <Ally
                  key={`ally-${ally}-${i}`}
                  entity={ally.entity as Entity}
                  selected={openAlly === ally.entity}
                  onClick={() => (openAlly === ally.entity ? setOpenAlly(null) : setOpenAlly(ally.entity as Entity))}
                />
              ),
          )}
        </div>
        {openAllyData && <UnitStatus data={openAllyData.units} />}
      </div>
    </div>
  );
};

const Ally = ({ selected, entity, onClick }: { selected: boolean; entity: Entity; onClick?: () => void }) => {
  const { tables } = useCore();
  const isFleet = tables.IsFleet.use(entity)?.value;
  return (
    <Button
      onClick={onClick}
      size="content"
      className={`flex bg-black/10 border text-xs justify-center items-center gap-2 p-1 w-full border-secondary/50`}
      selected={selected}
    >
      <img src={isFleet ? InterfaceIcons.Fleet : InterfaceIcons.Asteroid} className="w-6" />
      {isFleet ? entityToFleetName(entity, true) : entityToRockName(entity)}
    </Button>
  );
};
