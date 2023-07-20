import { primodium } from "@game/api";
import { KeybindActions } from "@game/constants";
import { EntityID, getComponentValue } from "@latticexyz/recs";
import { motion } from "framer-motion";
import React from "react";
import { useMud } from "src/context/MudContext";
import { Key } from "src/engine/lib/core/createInput";
import { world } from "src/network/world";
import { calcDims, convertToCoords } from "src/util/building";
import {
  Action,
  BackgroundImage,
  BlockIdToKey,
  KeyImages,
} from "src/util/constants";

const HotbarItem: React.FC<{
  blockType: EntityID;
  keybind: KeybindActions;
  action: Action;
}> = ({ blockType, keybind, action }) => {
  const network = useMud();
  const selectedBuilding = primodium.hooks.useSelectedBuilding();

  const keybinds = primodium.hooks.useKeybinds();

  const key = keybinds[keybind]?.entries().next().value[0] as Key;
  const keyImage = KeyImages.get(key);

  let dimensions: { width: number; height: number } | undefined;
  const buildingTypeEntity = world.entityToIndex.get(blockType);

  if (buildingTypeEntity) {
    const blueprint = getComponentValue(
      network.components.RawBlueprint,
      buildingTypeEntity
    )?.value;

    dimensions = blueprint
      ? calcDims(buildingTypeEntity, convertToCoords(blueprint))
      : undefined;
  }

  const handleSelectBuilding = () => {
    if (selectedBuilding === blockType) {
      primodium.components.selectedBuilding(network).remove();
      primodium.components.selectedAction().remove();
      return;
    }

    console.log(blockType);
    primodium.components.selectedBuilding(network).set(blockType);
    primodium.components.selectedAction().set(action);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        opacity: { duration: 0.5 },
      }}
    >
      <div
        className={`relative flex flex-col text-sm items-center cursor-pointer crt w-16 ${
          selectedBuilding === blockType ? "scale-110" : ""
        }`}
      >
        <img
          src={BackgroundImage.get(blockType)}
          onClick={handleSelectBuilding}
          className={`w-16 h-16 pixel-images border border-cyan-700 ${
            selectedBuilding === blockType
              ? " ring-4 ring-amber-400 transistion-all duration-100"
              : ""
          }`}
        />
        {selectedBuilding === blockType && (
          <motion.p
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{
              opacity: { duration: 3 },
            }}
            className="absolute flex items-center -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 px-1"
          >
            {BlockIdToKey[selectedBuilding]
              .replace(/([A-Z]+)/g, " $1")
              .replace(/([A-Z][a-z])/g, " $1")}
          </motion.p>
        )}
        {keyImage && (
          <img
            src={keyImage}
            className={`absolute -top-2 -left-2 w-8 h-8 pixel-images ${
              selectedBuilding === blockType ? "opacity-30" : ""
            }`}
          />
        )}
        {dimensions && (
          <div className="absolute bottom-0 right-0 text-xs bg-black bg-opacity-50">
            {dimensions.width}x{dimensions.height}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HotbarItem;
