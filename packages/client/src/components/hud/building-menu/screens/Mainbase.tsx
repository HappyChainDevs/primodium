import { EntityID } from "@latticexyz/recs";
import { Navigator } from "src/components/core/Navigator";
import { Header } from "../widgets/Header";
import { ExpandRange } from "../widgets/ExpandRange";
import { Upgrade } from "../widgets/Upgrade";
import { MiningVessels } from "../widgets/MiningVessels";
import { SpecialTech } from "../widgets/SpecialTech";

export const MainBase: React.FC<{ building: EntityID }> = ({ building }) => {
  return (
    <Navigator.Screen title={building} className="w-fit">
      <Header building={building} />
      <Upgrade building={building} />
      <ExpandRange />
      <div className="grid grid-cols-2 w-full">
        <MiningVessels />
        <SpecialTech />
      </div>
    </Navigator.Screen>
  );
};
