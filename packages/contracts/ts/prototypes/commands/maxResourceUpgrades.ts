import { StaticAbiType } from "@latticexyz/schema-type";
import { MUDEnums } from "../../../config/enums";
import encodeBytes32 from "../../../config/util/encodeBytes32";

export const upgradesByLevel = (name: string, upgrades: Record<number, Record<string, number>>) =>
  Object.entries(upgrades).reduce((prev, [level, upgrades]) => {
    const upgradesObject = Object.entries(upgrades).reduce((prev, [resource, max]) => {
      prev[`MainBase${resource}L${level}Upgrade`] = {
        keys: [
          { [encodeBytes32(name)]: "bytes32" },
          { [MUDEnums.EResource.indexOf(resource)]: "uint8" },
          { [level]: "uint32" },
        ],
        tables: { P_ByLevelMaxResourceUpgrades: { value: max } },
      };
      return prev;
    }, {} as Record<string, { keys: { [x: string]: StaticAbiType }[]; tables: { P_ByLevelMaxResourceUpgrades: { value: number } } }>);
    return { ...prev, ...upgradesObject };
  }, {});

export const getResourceValue = (resourceValue: { [x: string]: number }) => {
  const [resource, amount] = Object.entries(resourceValue)[0];
  return { resource: MUDEnums.EResource.indexOf(resource), amount };
};

export const getResourceValues = (resourceValues: Record<string, number>) => {
  // unzip the array
  const [resources, amounts] = Object.entries(resourceValues).reduce(
    (acc, [resource, amount]) => {
      acc[0].push(MUDEnums.EResource.indexOf(resource));
      acc[1].push(amount);
      return acc;
    },
    [[], []] as [number[], number[]]
  );
  return { resources, amounts };
};

export const upgradesToList = (upgrades: Record<string, number>) => {
  return Object.keys(upgrades).map((resource) => MUDEnums.EResource.indexOf(resource));
};

export const idsToPrototypes = (ids: string[]) =>
  ids
    .map((building, i) => ({
      [i]: {
        P_EnumToPrototype: { value: encodeBytes32(building) },
      },
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
