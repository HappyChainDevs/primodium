import { BlockType } from "../../util/constants";
import BuildingContentBox from "./BuildingBox";
import BuildingIconButton from "./building-icons/BuildingIconButton";
import { SelectedAction } from "src/network/components/clientComponents";

function ChooseDebugMenu({
  title,
  setMenuOpenIndex,
}: {
  title: string;
  setMenuOpenIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const closeMenuHelper = () => {
    SelectedAction.remove();
    setMenuOpenIndex(-1);
  };

  return (
    <BuildingContentBox>
      <p className="text-lg font-bold mb-3">{title}</p>
      <div className="grid grid-cols-4 h-40 gap-y-3 overflow-y-scroll scrollbar">
        <BuildingIconButton
          label="Debug Iron Mine"
          blockType={BlockType.DebugIronMine}
        />
        <BuildingIconButton
          label="Debug Iron Plate Factory"
          blockType={BlockType.DebugIronPlateFactory}
        />
        <BuildingIconButton
          label="Debug Storage Building"
          blockType={BlockType.DebugStorageBuilding}
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

export default ChooseDebugMenu;
