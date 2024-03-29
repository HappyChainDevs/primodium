import { useEffect } from "react";
import { usePrimodium } from "src/hooks/usePrimodium";
import { getRandomRange } from "src/util/common";
import { IconLabel } from "./IconLabel";
import { Loader } from "./Loader";
import { Tooltip } from "./Tooltip";
import { AudioKeys } from "src/game/lib/constants/assets/audio";
import { KeybindActions } from "src/game/lib/constants/keybinds";

export const Button: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e?: React.MouseEvent | undefined) => void;
  onPointerEnter?: (e?: React.PointerEvent) => void;
  onPointerLeave?: (e?: React.PointerEvent) => void;
  disabled?: boolean;
  selected?: boolean;
  loading?: boolean;
  tooltip?: string;
  tooltipDirection?: "right" | "left" | "top" | "bottom";
  mute?: boolean;
  clickSound?: AudioKeys;
  keybind?: KeybindActions;
}> = ({
  children,
  className,
  style,
  onClick,
  onPointerEnter,
  onPointerLeave,
  disabled,
  selected = false,
  loading = false,
  tooltip,
  tooltipDirection = "top",
  mute = false,
  clickSound = AudioKeys.Confirm2,
  keybind,
}) => {
  const primodium = usePrimodium();
  const api = primodium.api("UI");

  useEffect(() => {
    if (!keybind || !api || disabled) return;

    const callback = () => {
      onClick && onClick();
      !mute &&
        api.audio.play(clickSound, "ui", {
          detune: getRandomRange(-100, 100),
        });
    };

    const listener = api.input.addListener(keybind, callback);

    return () => {
      listener.dispose();
    };
  }, [keybind, api, clickSound, mute, disabled, onClick]);

  return (
    <Tooltip text={tooltip} direction={tooltipDirection}>
      <button
        style={style}
        onClick={(e) => {
          !mute &&
            api?.audio.play(clickSound, "ui", {
              detune: getRandomRange(-100, 100),
            });

          onClick?.(e);
        }}
        disabled={disabled}
        onPointerEnter={() => {
          !mute &&
            api?.audio.play(AudioKeys.DataPoint2, "ui", {
              volume: 0.1,
              detune: getRandomRange(-200, 200),
            });

          onPointerEnter?.();
        }}
        onPointerLeave={onPointerLeave}
        className={`btn join-item inline pointer-events-auto font-bold outline-none h-fit bg-opacity-50 ${className} ${
          selected ? "border-accent z-10 bg-base-100" : ""
        }`}
      >
        {loading && <Loader />}
        {!loading && children}
      </button>
    </Tooltip>
  );
};

export const IconButton: React.FC<{
  imageUri: string;
  text?: string;
  hideText?: boolean;
  className?: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
  loading?: boolean;
  tooltipText?: string;
  tooltipDirection?: "right" | "left" | "top" | "bottom";
  mute?: boolean;
  clickSound?: AudioKeys;
}> = ({
  imageUri,
  text = "",
  hideText = false,
  className,
  onClick,
  disabled,
  selected = false,
  loading = false,
  tooltipDirection = "right",
  tooltipText,
  mute = false,
  clickSound = AudioKeys.Confirm2,
  onDoubleClick,
}) => {
  const primodium = usePrimodium();
  const { audio } = primodium.api();
  return (
    <Tooltip text={tooltipText} direction={tooltipDirection}>
      <button
        onClick={() => {
          !mute &&
            audio.play(clickSound, "ui", {
              detune: getRandomRange(-100, 100),
            });
          onClick && onClick();
        }}
        disabled={disabled}
        onDoubleClick={onDoubleClick}
        onPointerEnter={() => {
          !mute &&
            audio.play(AudioKeys.DataPoint2, "ui", {
              volume: 0.1,
              detune: getRandomRange(-200, 200),
            });
        }}
        className={`btn join-item inline gap-1 pointer-events-auto font-bold outline-none bg-opacity-50 ${className} ${
          disabled ? "opacity-50 !pointer-events-auto" : ""
        } ${selected ? "border-accent z-10 bg-base-100" : ""} `}
      >
        {loading && <Loader />}
        {!loading && <IconLabel imageUri={imageUri} text={text} hideText={hideText} />}
      </button>
    </Tooltip>
  );
};
