import { SecondaryCard } from "src/components/core/Card";
import { Navigator } from "src/components/core/Navigator";
import { Range } from "src/components/core/Range";
import { Toggle } from "src/components/core/Toggle";
import { useSettingsStore } from "src/game/stores/SettingsStore";

export const GeneralSettings = () => {
  const [uiScale, setUiScale] = useSettingsStore((state) => [state.uiScale, state.setUiScale]);
  const [allowHackerModal, toggleAllowHackerModal] = useSettingsStore((state) => [
    state.allowHackerModal,
    state.toggleAllowHackerModal,
  ]);

  return (
    <Navigator.Screen title="general" className="flex-grow">
      <div className="w-full h-full">
        <SecondaryCard className="w-full space-y-5 grow">
          <div>
            <p className="text-xs opacity-50 font-bold pb-1">UI SCALE</p>
            <Range
              min={50}
              max={200}
              defaultValue={uiScale * 100}
              // className="range-accent"
              onChange={(e) => {
                setUiScale(e / 100);
              }}
            />
          </div>
          <div className="">
            <div className="text-xs opacity-50 font-bold pb-1">
              PRESS <p className="kbd">~</p> TO OPEN HACKER PANE
            </div>
            <Toggle onToggle={toggleAllowHackerModal} defaultChecked={allowHackerModal} />
          </div>
        </SecondaryCard>
      </div>

      <Navigator.BackButton className="mt-2" />
    </Navigator.Screen>
  );
};
