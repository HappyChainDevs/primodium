import { Entity } from "@latticexyz/recs";
import { formatUnits, parseUnits } from "viem";
import { getResourceDecimals } from "./resource";

// For analytics or human-scale user parameters (e.g. building levels) that are known to never exceed the range of a number
export function bigintToNumber(value: bigint | number) {
  if (value >= Number.MIN_SAFE_INTEGER && value <= Number.MAX_SAFE_INTEGER) {
    return Number(value);
  } else {
    return 0;
  }
}

export function adjustDecimals(num: string, toFixed: number): string {
  const parts = num.split(".");
  if (parts.length > 2) throw new Error("Invalid number");
  if (parts.length === 2 && parts[1].length > toFixed) {
    parts[1] = parts[1].substring(0, toFixed);
  }
  return toFixed == 0 ? parts[0] : parts.join(".");
}

function getDecimals(num: number, max = 3) {
  const parts = num.toString().split(".");
  const digits = parts[1] ? (parts[1].length > max ? max : parts[1].length) : 0;
  return num.toFixed(digits);
}

type FormatOptions = { fractionDigits?: number; short?: boolean; showZero?: boolean; notLocale?: boolean };

export const bigintMax = (a: bigint, b: bigint) => (a > b ? a : b);
export const bigintMin = (a: bigint, b: bigint) => (a < b ? a : b);
export const formatResourceCount = (resource: Entity, amountRaw: bigint, formatOptions?: FormatOptions) => {
  const decimals = getResourceDecimals(resource);

  const formatted = Number(formatUnits(amountRaw, decimals));
  return formatNumber(formatted, formatOptions);
};

export const parseResourceCount = (resource: Entity, amount: string) => {
  const units = getResourceDecimals(resource);

  return parseUnits(amount, units);
};

export function formatNumber(num: number | bigint, options?: FormatOptions): string {
  const digits = options?.fractionDigits === undefined ? 0 : options.fractionDigits;
  if (num === 0 || num === 0n) return options?.showZero ? "0" : "--";

  const shorten = (n: number): string => {
    const units = ["", "K", "M", "B", "T"];
    let unitIndex = 0;
    while (n >= 1000 && unitIndex < units.length - 1) {
      n /= 1000;
      unitIndex++;
    }
    return getDecimals(n, digits) + units[unitIndex];
  };

  if (typeof num === "number") {
    if (options?.short) return shorten(num);

    const fixedNum = num.toFixed(digits);

    if (num < 1) {
      // Return the fixedNum directly for very small numbers to avoid exponential notation
      return fixedNum.replace(/(\.\d*?[1-9])0+$|\.0*$/, "$1");
    } else {
      return options?.notLocale ? parseFloat(fixedNum).toString() : parseFloat(fixedNum).toLocaleString();
    }
  } else if (typeof num === "bigint") {
    if (options?.short) return shorten(Number(num));
    return options?.notLocale ? num.toString() : num.toLocaleString();
  }
  return "";
}

export function formatTime(seconds: number): string {
  if (seconds < 0) return "00:00:00";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}
