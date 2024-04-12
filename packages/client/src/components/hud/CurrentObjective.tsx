import { EObjectives } from "contracts/config/enums";
import { useEffect, useState } from "react";
import { FaGift, FaMapPin } from "react-icons/fa";
import { KeybindActions } from "src/game/lib/constants/keybinds";
import { useMud } from "src/hooks";
import { components } from "src/network/components";
import { clampedIndex, getEntityTypeName } from "src/util/common";
import { ObjectiveEntityLookup } from "src/util/constants";
import { Objectives } from "src/util/objectives/objectives";
import { Hex } from "viem";
import { Badge } from "../core/Badge";
import { Card } from "../core/Card";
import { IconLabel } from "../core/IconLabel";
import { Modal } from "../core/Modal";
import { Widget } from "../core/Widget";
import { ObjectivesScreen } from "./modals/objectives/ObjectivesScreen";

const tutorialObjectives = [
  EObjectives.BuildIronMine,
  EObjectives.BuildCopperMine,
  EObjectives.BuildIronPlateFactory,
  EObjectives.UpgradeMainBase,
  EObjectives.ExpandBase,
];

export const CurrentObjective = () => {
  const {
    playerAccount: { entity: playerEntity },
  } = useMud();
  const [currentStep, setCurrentStep] = useState(0);
  const objectiveEntity =
    ObjectiveEntityLookup[tutorialObjectives[clampedIndex(currentStep, tutorialObjectives.length)]];
  const claimed =
    components.CompletedObjective.useWithKeys({ entity: playerEntity as Hex, objective: objectiveEntity as Hex })
      ?.value ?? false;
  const completedEntities = Object.values(ObjectiveEntityLookup).filter((objective) => {
    const claimed =
      components.CompletedObjective.getWithKeys({ entity: playerEntity as Hex, objective: objective as Hex })?.value ??
      false;

    return claimed;
  }).length;
  const totalEntities = Object.values(ObjectiveEntityLookup).length;

  useEffect(() => {
    // Function to find the next unclaimed objective
    const findNextUnclaimedObjective = () => {
      return tutorialObjectives.findIndex((objective) => {
        const objectiveEntity = ObjectiveEntityLookup[objective];
        const isClaimed =
          components.CompletedObjective.getWithKeys({
            entity: playerEntity as Hex,
            objective: objectiveEntity as Hex,
          })?.value ?? false;
        return !isClaimed;
      });
    };

    const nextUnclaimedIndex = findNextUnclaimedObjective();

    setCurrentStep(nextUnclaimedIndex);
  }, [claimed, playerEntity]);

  if (currentStep === -1)
    return (
      <Modal title="objectives">
        <Modal.Button className="border-secondary flex p-3 flex-col w-fit">
          <IconLabel imageUri="img/icons/objectiveicon.png" className="text-sm" text="EARN OBJECTIVES" />
          <p className="opacity-60 text-xs">
            {completedEntities} / {totalEntities} completed
          </p>
        </Modal.Button>
        <Modal.Content className="w-[50rem] h-[60rem]">
          <ObjectivesScreen />
        </Modal.Content>
      </Modal>
    );

  return (
    <Widget
      id="objectives"
      title="objectives"
      icon="/img/icons/objectiveicon.png"
      hotkey={KeybindActions.Objectives}
      defaultCoord={{ x: 69, y: 420 }}
      defaultLocked
      lockable
      defaultVisible
      origin="center-left"
      scene={"UI"}
      minOpacity={0.6}
      draggable
      persist
    >
      <div className="flex flex-col items-center">
        <Card className="flex flex-col justify-center border-t-0 border-secondary rounded-t-none w-fit !p-0">
          <div className="flex flex-col p-1 bg-opacity-50">
            <div className="flex gap-1 items-center p-1">
              <FaMapPin className="text-accent" />
              <p className="font-bold">{getEntityTypeName(objectiveEntity)}</p>
            </div>
            <hr className="border-secondary/50" />
            <div className="flex gap-1 text-right justify-end px-2 border-secondary/50 p-1 w-72">
              <p className="text-xs text-success text-left normal-case font-normal">
                {Objectives.get(tutorialObjectives[currentStep])?.description ?? "A Primodium objective."}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center w-full px-2 py-1 bg-base-100 border-t border-secondary/25">
            <Modal>
              <Modal.Button className={`btn-xs flex items-center justify-center gap-1 text-accent`}>
                <FaGift /> {"Claim"}
              </Modal.Button>
              <Modal.Content className="w-[50rem] h-[60rem]">
                <ObjectivesScreen highlight={objectiveEntity} />
              </Modal.Content>
            </Modal>

            <Badge className="text-xs text-secondary">
              {currentStep + 1} / {totalEntities}
            </Badge>
          </div>
        </Card>
      </div>
    </Widget>
  );
};
