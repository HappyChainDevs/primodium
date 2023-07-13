import { removeComponent } from "@latticexyz/recs";
import { useCallback } from "react";
import { useMud } from "src/context/MudContext";
import { singletonIndex } from "src/network/world";
import { BlockType } from "../../util/constants";
import BuildingContentBox from "./BuildingBox";
import BuildingIconButton from "./building-icons/BuildingIconButton";

function ChooseFactoryMenu({
  title,
  setMenuOpenIndex,
}: {
  title: string;
  setMenuOpenIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const network = useMud();
  const {
    offChainComponents: { SelectedAction },
  } = network;

  const closeMenuHelper = useCallback(() => {
    removeComponent(SelectedAction, singletonIndex);
    setMenuOpenIndex(-1);
  }, []);

  return (
    <BuildingContentBox>
      <p className="text-lg font-bold mb-3">{title}</p>
      <div className="grid grid-cols-4 h-40 gap-y-3 overflow-y-scroll scrollbar">
        <BuildingIconButton
          label="Storage Unit"
          blockType={BlockType.StorageUnit}
        />
        <BuildingIconButton
          label="Iron Plate Factory"
          blockType={BlockType.IronPlateFactory}
        />
      </div>
      <button
        onClick={closeMenuHelper}
        className="absolute bottom-4 text-center right-4 h-10 w-36 bg-teal-600 hover:bg-teal-700 font-bold rounded text-sm"
      >
        <p className="inline-block">Other Buildings</p>
      </button>
    </BuildingContentBox>
  );
}

export default ChooseFactoryMenu;
