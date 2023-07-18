import { primodium } from "@game/api";
import { KeybindActions } from "@game/constants";
import { Key } from "@latticexyz/phaserx";
import { motion } from "framer-motion";
import { KeyImages } from "src/util/constants";
import HotbarItem from "./HotbarItem";
import hotbarContent from "./hotbarContent";
import wrap from "./wrap";

const HotbarBody: React.FC<{
  activeBar: number;
  setActiveBar: (activeBar: number) => void;
}> = ({ activeBar, setActiveBar }) => {
  const keybinds = primodium.hooks.useKeybinds();
  const prevKey = keybinds[KeybindActions.PrevHotbar]?.entries().next()
    .value[0] as Key;
  const nextKey = keybinds[KeybindActions.NextHotbar]?.entries().next()
    .value[0] as Key;

  const prevKeyImage = KeyImages.get(prevKey);
  const nextKeyImage = KeyImages.get(nextKey);
  return (
    <motion.div className="flex items-center space-x-2">
      {prevKeyImage && (
        <div
          className="relative cursor-pointer crt scale-x-[-1] "
          onClick={() =>
            setActiveBar(wrap(activeBar - 1, hotbarContent.length))
          }
        >
          <img
            src="/img/buttons/chevron.png"
            className="pixel-images w-8 border border-cyan-400 "
          />
          <img
            src={prevKeyImage}
            className="absolute w-8 h-8 pixel-images scale-x-[-1] "
          />
        </div>
      )}
      <div
        className={`flex space-x-3 relative bg-slate-900/90 border-2 p-3 border-cyan-600 crt`}
      >
        {hotbarContent[activeBar].buildings.map((tile, index) => {
          return (
            <HotbarItem
              key={index}
              blockType={tile.blockType}
              keybind={tile.keybind}
            />
          );
        })}
      </div>
      {nextKeyImage && (
        <div
          className="relative cursor-pointer crt"
          onClick={() =>
            setActiveBar(wrap(activeBar + 1, hotbarContent.length))
          }
        >
          <img
            src="/img/buttons/chevron.png"
            className="pixel-images w-8 border border-cyan-600"
          />
          <img src={nextKeyImage} className="absolute w-8 h-8 pixel-images" />
        </div>
      )}
    </motion.div>
  );
};

export default HotbarBody;
