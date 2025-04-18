import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { InterfaceIcons } from "@primodiumxyz/assets";
import { usePersistentStore } from "@primodiumxyz/game/src/stores/PersistentStore";
import { Button } from "@/components/core/Button";
import { IconLabel } from "@/components/core/IconLabel";
import { BuildingBlueprints } from "@/components/hud/asteroid/blueprints/BuildingBlueprints";
import { useGame } from "@/hooks/useGame";

export const BlueprintPane = () => {
  const [visibleDiv, setVisibleDiv] = useState(0);
  const [arePanesExpanded, setArePanesExpanded] = useState(false);
  const game = useGame();
  const {
    hooks: { useKeybinds },
    input: { addListener },
  } = useRef(game.ASTEROID).current;
  const keybinds = useKeybinds();
  const [hideHotkeys] = usePersistentStore(useShallow((state) => [state.hideHotkeys]));

  // Shows a specific div
  const showDiv = (index: number) => {
    setVisibleDiv(index);
    setArePanesExpanded(false);
  };

  // Toggles the expand/collapse state
  const togglePanes = () => {
    setArePanesExpanded(!arePanesExpanded);
  };

  useEffect(() => {
    const cycle = addListener("Cycle", () => {
      setVisibleDiv((prev) => (prev + 1) % 4);
    });

    return () => {
      cycle.dispose();
    };
  }, [addListener]);

  const labels = ["Production", "Military", "Storage", "Infrastructure"];

  const imagePaths = [
    InterfaceIcons.CategoryProduction,
    InterfaceIcons.CategoryMilitary,
    InterfaceIcons.CategoryStorage,
    InterfaceIcons.CategoryInfra,
  ];

  return (
    <div className="flex gap-0">
      <div>
        {/* Pane */}
        <div className={`grid ${arePanesExpanded ? "grid-cols-2 xl:grid-cols-4" : "grid-cols-1"}`}>
          {labels.map(
            (label, index) =>
              // Show only the selected div or all when expanded
              (arePanesExpanded || visibleDiv === index) && (
                <div key={index} className={`flex bg-neutral border border-secondary gap-1`}>
                  <BuildingBlueprints
                    buildingTypeToShow={index}
                    active={visibleDiv === index}
                    showHighlight={arePanesExpanded && !hideHotkeys}
                  />

                  {/* Show title when expanded */}
                  {arePanesExpanded && (
                    <span
                      className={`text-sm pt-2 text-vert px-1 border-l border-secondary/50 ${
                        label === "Production"
                          ? "text-yellow-500"
                          : label === "Military"
                            ? "text-lime-600"
                            : label === "Storage"
                              ? "text-violet-400"
                              : label === "Infrastructure"
                                ? "text-sky-500"
                                : ""
                      }`}
                      style={{ writingMode: "vertical-lr" }}
                    >
                      {label}
                    </span>
                  )}
                </div>
              ),
          )}
        </div>

        {/* Toggle Expand/Collapse button ${arePanesExpanded ? 'mr-0' : 'mr-11'} */}
        <div className={`flex justify-end`}>
          <Button onClick={togglePanes} variant={"ghost"} size={"xs"} className="text-[.7rem] px-2 m-1">
            {arePanesExpanded ? "- Collapse" : "+ Expand"}
          </Button>
        </div>
      </div>

      {/* Menu Buttons (hidden when expanded) */}
      {!arePanesExpanded && (
        <div>
          {labels.map((label, index) => (
            <Button
              key={index}
              onClick={() => showDiv(index)}
              className={`flex !items-center !bg-neutral/100 !border !border-secondary py-4 w-12 ${
                index === 3 ? "rounded-br-lg" : ""
              } `}
              style={{ writingMode: "vertical-lr" }}
            >
              <IconLabel
                text={visibleDiv === index ? label : ""}
                imageUri={imagePaths[index]}
                className={`gap-2 ${
                  label === "Production"
                    ? "text-yellow-500"
                    : label === "Military"
                      ? "text-lime-600"
                      : label === "Storage"
                        ? "text-violet-400"
                        : label === "Infrastructure"
                          ? "text-sky-500"
                          : ""
                }`}
                style={{
                  writingMode: "vertical-lr",
                }}
              />
            </Button>
          ))}
          {!hideHotkeys && (
            <p className="flex text-xs kbd kbd-xs py-2 w-fit" style={{ writingMode: "vertical-lr" }}>
              {keybinds["Cycle"]?.entries().next().value[0] ?? "?"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
