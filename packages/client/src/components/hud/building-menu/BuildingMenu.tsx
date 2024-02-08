import { useMemo } from "react";
import { FaArrowsAlt, FaPowerOff, FaTrash } from "react-icons/fa";
import { Button } from "src/components/core/Button";
import { Navigator } from "src/components/core/Navigator";
import { TransactionQueueMask } from "src/components/shared/TransactionQueueMask";
import { useMud } from "src/hooks";
import { useBuildingName } from "src/hooks/useBuildingName";
import { components } from "src/network/components";
import { toggleBuilding } from "src/network/setup/contractCalls/toggleBuilding";
import { Action, EntityType, TransactionQueueType } from "src/util/constants";
import { hashEntities } from "src/util/encode";
import { Basic } from "./screens/Basic";
import { BuildQueue } from "./screens/BuildQueue";
import { BuildUnit } from "./screens/BuildUnit";
import { BuildingInfo } from "./screens/BuildingInfo";
import { Demolish } from "./screens/Demolish";
import { MainBase } from "./screens/Mainbase";
import { Market } from "./screens/Market";
import { MiningVessels } from "./screens/MiningVessels";
import { Move } from "./screens/Move";
import { UnitFactory } from "./screens/UnitFactory";

export const BuildingMenu: React.FC = () => {
  const mud = useMud();
  const selectedBuilding = components.SelectedBuilding.use()?.value;

  const buildingType = useMemo(() => {
    if (!selectedBuilding) return;

    return components.BuildingType.get(selectedBuilding)?.value;
  }, [selectedBuilding]);

  const buildingName = useBuildingName(selectedBuilding);
  const active = components.IsActive.use(selectedBuilding)?.value;
  const canToggle = !components.TrainingQueue.use(selectedBuilding)?.units.length;

  if (!buildingName || !selectedBuilding) return null;

  const handleClose = () => {
    components.SelectedBuilding.remove();
    components.SelectedAction.remove();
  };

  const RenderScreen = () => {
    switch (buildingType) {
      case EntityType.MainBase:
        return <MainBase building={selectedBuilding} />;
      case EntityType.DroneFactory:
        return <UnitFactory building={selectedBuilding} />;
      case EntityType.Workshop:
        return <UnitFactory building={selectedBuilding} />;
      case EntityType.Market:
        return <Market building={selectedBuilding} />;
      default:
        return <Basic building={selectedBuilding} />;
    }
  };
  const TopBar = () => {
    if (buildingType == EntityType.MainBase) return null;
    return (
      <div className="absolute -top-2 right-0 -translate-y-full flex flex-row-reverse gap-1 p-1 border bg-neutral border border-1 border-secondary border-b-base-100">
        <Button
          tooltip="Close"
          tooltipDirection="top"
          className="btn-square btn-xs font-bold border border-secondary"
          onClick={handleClose}
        >
          x
        </Button>

        <TransactionQueueMask queueItemId={hashEntities(TransactionQueueType.Move, selectedBuilding)}>
          <Navigator.NavButton
            tooltip="Move"
            tooltipDirection="top"
            className=" btn-square btn-xs font-bold border border-secondary inline-flex"
            to="Move"
            onClick={() => components.SelectedAction.set({ value: Action.MoveBuilding })}
          >
            <FaArrowsAlt size={12} />
          </Navigator.NavButton>
        </TransactionQueueMask>

        <TransactionQueueMask queueItemId={hashEntities(TransactionQueueType.Demolish, selectedBuilding)}>
          <Navigator.NavButton
            tooltip="Demolish"
            tooltipDirection="top"
            className="btn-square btn-xs font-bold border border-error inline-flex"
            to="Demolish"
          >
            <FaTrash size={12} />
          </Navigator.NavButton>
        </TransactionQueueMask>

        <TransactionQueueMask queueItemId={hashEntities(TransactionQueueType.Toggle, selectedBuilding)}>
          <Button
            tooltip={active ? "Deactivate" : "Activate"}
            disabled={!canToggle}
            tooltipDirection="top"
            className={`btn-square btn-xs font-bold border ${active ? "border-error" : "border-success"} inline-flex`}
            onClick={() => toggleBuilding(mud, selectedBuilding)}
          >
            <FaPowerOff size={12} />
          </Button>
        </TransactionQueueMask>
      </div>
    );
  };
  return (
    <Navigator initialScreen={selectedBuilding} className="w-96 border-none p-0 relative overflow-visible">
      <TopBar />

      {/* Initial Screen */}
      <RenderScreen />
      {/* Sub Screens */}
      <Demolish building={selectedBuilding} />
      <Move building={selectedBuilding} />
      <BuildingInfo building={selectedBuilding} />
      <BuildQueue building={selectedBuilding} />
      <BuildUnit building={selectedBuilding} />
      <MiningVessels building={selectedBuilding} />
    </Navigator>
  );
};
