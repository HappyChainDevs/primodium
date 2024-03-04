import { useEffect, useState } from "react";
import { adjustDecimals } from "src/util/number";
import { Button } from "./Button";
import { usePrimodium } from "src/hooks/usePrimodium";
import { Scenes } from "@game/constants";

export const NumberInput: React.FC<{
  startingValue?: number;
  min?: number;
  max?: number;
  toFixed?: number;
  reset?: boolean;
  onChange: (val: number) => void;
}> = ({ startingValue, min = 0, max = Infinity, onChange, toFixed = 0, reset }) => {
  const [count, setCount] = useState<string>((startingValue || min).toString());
  const primodium = usePrimodium();
  const input = primodium.api(Scenes.UI).input;
  const input2 = primodium.api(Scenes.Asteroid).input;
  const input3 = primodium.api(Scenes.Starmap).input;

  const minString = min.toString();
  const maxString = max.toString();

  // this is breaking the rules of react
  useEffect(() => {
    if (reset) {
      setCount(String((startingValue || min).toFixed(toFixed)));
    }
  }, [reset, startingValue, min, toFixed]);

  const handleUpdate = (newCount: string) => {
    newCount = adjustDecimals(newCount, toFixed);
    // const allZeroes = newCount.split("").every((digit) => digit == "0");

    if (isNaN(Number(newCount))) {
      setCount("");
      onChange(min);
      return;
    }

    let countNum = Number(newCount);

    if (countNum > max) {
      countNum = max;
      newCount = maxString;
    } else if (countNum < min) {
      countNum = min;
      newCount = minString;
    }

    setCount(newCount);
    onChange(countNum);
  };

  return (
    <div className={`flex my-2 relative`}>
      <Button
        className={`${Number(count) >= max ? "opacity-50" : ""} btn-xs btn-ghost`}
        disabled={Number(count) <= min}
        onClick={(e) => {
          e?.preventDefault();
          handleUpdate(Math.max(min, count == "" ? 0 : Number(count) - 1).toString());
        }}
      >
        -
      </Button>
      <input
        type="number"
        className={`bg-transparent text-center w-fit outline-none border-b border-pink-900 ${
          Number(count) > max ? "text-error" : ""
        }`}
        value={count}
        placeholder={min.toString()}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          handleUpdate(e.target.value);
        }}
        onFocus={() => {
          input.disableInput();
          input2.disableInput();
          input3.disableInput();
        }}
        onBlur={() => {
          input.enableInput();
          input2.enableInput();
          input3.enableInput();
        }}
        min={0}
        max={max}
      />
      <Button
        className={`${Number(count) >= max ? "opacity-50" : ""} btn-xs btn-ghost`}
        disabled={Number(count) >= max}
        onClick={(e) => {
          e?.preventDefault();
          handleUpdate(Math.min(max, count == "" ? min + 1 : Number(count) + 1).toString());
        }}
      >
        +
      </Button>
      {max !== Infinity && (
        <div className="absolute right-1/2 -bottom-1/2 translate-x-1/2 translate-y-1/2">
          <Button
            className={`${Number(count) >= max ? "opacity-50" : ""} btn-xs btn-ghost  opacity-50`}
            disabled={Number(count) >= max}
            onClick={() => handleUpdate(max.toString())}
          >
            max
          </Button>
        </div>
      )}
    </div>
  );
};
