import { primodium } from "@game/api";
import { KeybindActions } from "@game/constants";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useMud } from "src/context/MudContext";
import HotbarBody from "./HotbarBody";
import HotbarLabel from "./HotbarLabel";
import HotbarPagination from "./HotbarPagination";
import { useHotbarContent } from "./useHotbarContent";
import wrap from "./wrap";
import { Action } from "src/util/constants";
import { useGameStore } from "src/store/GameStore";

const Hotbar: React.FC = () => {
  const hotbarContent = useHotbarContent();
  const network = useMud();
  const crtEffect = useGameStore((state) => state.crtEffect);
  const gameReady = primodium.hooks.useGameReady();
  const keybinds = primodium.hooks.useKeybinds();
  const [activeBar, setActiveBar] = useState(0);
  const activeBarRef = useRef(0);

  activeBarRef.current = activeBar;

  useEffect(() => {
    if (!gameReady) return;

    const hotkeyListener = (index: number) => {
      if (index > hotbarContent[activeBarRef.current].items.length - 1) return;

      const item = hotbarContent[activeBarRef.current].items[index];

      const building = item.blockType;

      const selectedBuilding = primodium.components
        .selectedBuilding(network)
        .get();

      if (selectedBuilding === building) {
        primodium.components.selectedBuilding(network).remove();
        primodium.components.selectedAction().remove();
        return;
      }

      primodium.components.selectedBuilding(network).set(building);
      primodium.components
        .selectedAction()
        .set(item.action ?? Action.PlaceBuilding);
    };

    let hotkeys: { dispose: () => void }[] = [];
    for (let i = 0; i < 10; i++) {
      const hotkey = primodium.input.addListener(
        KeybindActions[`Hotbar${i}` as keyof typeof KeybindActions],
        () => hotkeyListener(i)
      );

      hotkeys.push(hotkey);
    }

    const nextHotbar = primodium.input.addListener(
      KeybindActions.NextHotbar,
      () => {
        setActiveBar(wrap(activeBarRef.current + 1, hotbarContent.length));
        primodium.components.selectedBuilding(network).remove();
      }
    );

    const prevHotbar = primodium.input.addListener(
      KeybindActions.PrevHotbar,
      () => {
        setActiveBar(wrap(activeBarRef.current - 1, hotbarContent.length));
        primodium.components.selectedBuilding(network).remove();
      }
    );

    return () => {
      hotkeys.forEach((hotkey) => hotkey.dispose());
      nextHotbar.dispose();
      prevHotbar.dispose();
    };
  }, [gameReady, keybinds, hotbarContent]);

  return (
    <div className=" z-[1000] viewport-container fixed bottom-0 left-1/2 -translate-x-1/2 flex justify-center text-white drop-shadow-xl font-mono select-none">
      <div
        style={
          crtEffect
            ? {
                filter: "drop-shadow(2px 2px 0 rgb(20 184 166 / 0.4))",
                transform: "perspective(500px) rotateX(-10deg)",
                backfaceVisibility: "hidden",
              }
            : {}
        }
      >
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 200 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 200 }}
          className="flex flex-col items-center relative mb-10"
        >
          <HotbarLabel
            icon={hotbarContent[activeBar].icon}
            name={hotbarContent[activeBar].name}
          />
          <HotbarBody
            activeBar={activeBarRef.current}
            setActiveBar={setActiveBar}
          />
          {hotbarContent.length > 1 && (
            <HotbarPagination
              index={activeBar}
              className="absolute -bottom-40 left-1/2 -translate-x-1/2"
              onClick={() =>
                setActiveBar(
                  wrap(activeBarRef.current + 1, hotbarContent.length)
                )
              }
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Hotbar;
