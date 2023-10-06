import { Entity } from "@latticexyz/recs";
import { BlockType } from "./constants";

export type ResearchTreeType = ResearchCategoryType[];

export type ResearchCategoryType = {
  category: string;
  data: ResearchItemType[];
};

export type ResearchItemType = {
  name: string;
  id: Entity;
  description?: string;
  levels: ResearchItemLevelType[];
};

export type ResearchItemLevelType = {
  id: Entity;
  subtitle?: string;
  description: string;
};

export const MiningResearchTree: ResearchItemType = {
  name: "Mining Vessel Capacity",
  id: BlockType.MiningResearch1,
  description: "Provides Mining Vessel Capacity, allowing you to build more Mining Vessels",

  levels: [
    {
      id: BlockType.MiningResearch1,
      subtitle: "Level 1",
      description: "Provides Mining Vessel Capacity, allowing you to build more Mining Vessels",
    },
    {
      id: BlockType.MiningResearch2,
      subtitle: "Level 2",
      description: "Provides Mining Vessel Capacity, allowing you to build more Mining Vessels",
    },
    {
      id: BlockType.MiningResearch3,
      subtitle: "Level 3",
      description: "Provides Mining Vessel Capacity, allowing you to build more Mining Vessels",
    },
    {
      id: BlockType.MiningResearch4,
      subtitle: "Level 4",
      description: "Provides Mining Vessel Capacity, allowing you to build more Mining Vessels",
    },
    {
      id: BlockType.MiningResearch5,
      subtitle: "Level 5",
      description: "Provides Mining Vessel Capacity, allowing you to build more Mining Vessels",
    },
  ],
};

export const AnvilDroneUpgradeTree: ResearchItemType = {
  name: "Anvil",
  id: BlockType.AnvilDroneUpgrade1,
  description: "Upgrades the Attack and Defence attributes of Anvil Drone units.",

  levels: [
    {
      id: BlockType.AnvilDroneUpgrade1,
      subtitle: "Level 1",
      description: "Upgrades the Attack and Defence attributes of Anvil Drone units.",
    },
    {
      id: BlockType.AnvilDroneUpgrade2,
      subtitle: "Level 2",
      description: "Upgrades the Attack and Defence attributes of Anvil Drone units.",
    },
    {
      id: BlockType.AnvilDroneUpgrade3,
      subtitle: "Level 3",
      description: "Upgrades the Attack and Defence attributes of Anvil Drone units.",
    },
    {
      id: BlockType.AnvilDroneUpgrade4,
      subtitle: "Level 4",
      description: "Upgrades the Attack and Defence attributes of Anvil Drone units.",
    },
    {
      id: BlockType.AnvilDroneUpgrade5,
      subtitle: "Level 5",
      description: "Upgrades the Attack and Defence attributes of Anvil Drone units.",
    },
  ],
};

export const HammerDroneUpgradeTree: ResearchItemType = {
  name: "Hammer",
  id: BlockType.HammerDroneUpgrade1,
  description: "Upgrades the Attack and Defence attributes of Hammer Drone units.",

  levels: [
    {
      id: BlockType.HammerDroneUpgrade1,
      subtitle: "Level 1",
      description: "Upgrades the Attack and Defence attributes of Hammer Drone units.",
    },
    {
      id: BlockType.HammerDroneUpgrade2,
      subtitle: "Level 2",
      description: "Upgrades the Attack and Defence attributes of Hammer Drone units.",
    },
    {
      id: BlockType.HammerDroneUpgrade3,
      subtitle: "Level 3",
      description: "Upgrades the Attack and Defence attributes of Hammer Drone units.",
    },
    {
      id: BlockType.HammerDroneUpgrade4,
      subtitle: "Level 4",
      description: "Upgrades the Attack and Defence attributes of Hammer Drone units.",
    },
    {
      id: BlockType.HammerDroneUpgrade5,
      subtitle: "Level 5",
      description: "Upgrades the Attack and Defence attributes of Hammer Drone units.",
    },
  ],
};

export const AegisDroneUpgradeTree: ResearchItemType = {
  name: "Aegis",
  id: BlockType.AegisDroneUpgrade1,
  description: "Upgrades the Attack and Defence attributes of Aegis Drone units.",

  levels: [
    {
      id: BlockType.AegisDroneUpgrade1,
      subtitle: "Level 1",
      description: "Upgrades the Attack and Defence attributes of Aegis Drone units.",
    },
    {
      id: BlockType.AegisDroneUpgrade2,
      subtitle: "Level 2",
      description: "Upgrades the Attack and Defence attributes of Aegis Drone units.",
    },
    {
      id: BlockType.AegisDroneUpgrade3,
      subtitle: "Level 3",
      description: "Upgrades the Attack and Defence attributes of Aegis Drone units.",
    },
    {
      id: BlockType.AegisDroneUpgrade4,
      subtitle: "Level 4",
      description: "Upgrades the Attack and Defence attributes of Aegis Drone units.",
    },
    {
      id: BlockType.AegisDroneUpgrade5,
      subtitle: "Level 5",
      description: "Upgrades the Attack and Defence attributes of Aegis Drone units.",
    },
  ],
};

export const StingerDroneUpgradeTree: ResearchItemType = {
  name: "Stinger",
  id: BlockType.StingerDroneUpgrade1,
  description: "Upgrades the Attack and Defence attributes of Stinger Drone units.",

  levels: [
    {
      id: BlockType.StingerDroneUpgrade1,
      subtitle: "Level 1",
      description: "Upgrades the Attack and Defence attributes of Stinger Drone units.",
    },
    {
      id: BlockType.StingerDroneUpgrade2,
      subtitle: "Level 2",
      description: "Upgrades the Attack and Defence attributes of Stinger Drone units.",
    },
    {
      id: BlockType.StingerDroneUpgrade3,
      subtitle: "Level 3",
      description: "Upgrades the Attack and Defence attributes of Stinger Drone units.",
    },
    {
      id: BlockType.StingerDroneUpgrade4,
      subtitle: "Level 4",
      description: "Upgrades the Attack and Defence attributes of Stinger Drone units.",
    },
    {
      id: BlockType.StingerDroneUpgrade5,
      subtitle: "Level 5",
      description: "Upgrades the Attack and Defence attributes of Stinger Drone units.",
    },
  ],
};

export const MiningVesselUpgradeTree: ResearchItemType = {
  name: "Mining Vessel",
  id: BlockType.MiningVesselUpgrade1,
  description: "Increases the Mining Vessel's Mining Power by 1. ",

  levels: [
    {
      id: BlockType.MiningVesselUpgrade1,
      subtitle: "Level 1",
      description: "Increases the Mining Vessel's Mining Power by 1. ",
    },
    {
      id: BlockType.MiningVesselUpgrade2,
      subtitle: "Level 2",
      description: "Increases the Mining Vessel's Mining Power by 1. ",
    },
    {
      id: BlockType.MiningVesselUpgrade3,
      subtitle: "Level 3",
      description: "Increases the Mining Vessel's Mining Power by 1. ",
    },
    {
      id: BlockType.MiningVesselUpgrade4,
      subtitle: "Level 4",
      description: "Increases the Mining Vessel's Mining Power by 1. ",
    },
    {
      id: BlockType.MiningVesselUpgrade5,
      subtitle: "Level 5",
      description: "Increases the Mining Vessel's Mining Power by 1. ",
    },
  ],
};

export const MinutemanMarineUpgradeTree: ResearchItemType = {
  name: "Minuteman",
  id: BlockType.MinutemanMarineUpgrade1,
  description: "Increases the Minuteman Marine's stats. ",
  levels: [
    {
      id: BlockType.MinutemanMarineUpgrade1,
      subtitle: "Level 1",
      description: "Upgrades the Attack and Defence attributes of Minuteman Marines.",
    },
    {
      id: BlockType.MinutemanMarineUpgrade2,
      subtitle: "Level 2",
      description: "Upgrades the Attack and Defence attributes of Minuteman Marines.",
    },
    {
      id: BlockType.MinutemanMarineUpgrade3,
      subtitle: "Level 3",
      description: "Upgrades the Attack and Defence attributes of Minuteman Marines.",
    },
    {
      id: BlockType.MinutemanMarineUpgrade4,
      subtitle: "Level 4",
      description: "Upgrades the Attack and Defence attributes of Minuteman Marines.",
    },
    {
      id: BlockType.MinutemanMarineUpgrade5,
      subtitle: "Level 5",
      description: "Upgrades the Attack and Defence attributes of Minuteman Marines.",
    },
  ],
};

export const TridentMarineUpgradeTree: ResearchItemType = {
  name: "Trident",
  id: BlockType.TridentMarineUpgrade1,
  description: "Increases the Trident Marine's stats. ",
  levels: [
    {
      id: BlockType.TridentMarineUpgrade1,
      subtitle: "Level 1",
      description: "Upgrades the Attack and Defence attributes of Trident Marines.",
    },
    {
      id: BlockType.TridentMarineUpgrade2,
      subtitle: "Level 2",
      description: "Upgrades the Attack and Defence attributes of Trident Marines.",
    },
    {
      id: BlockType.TridentMarineUpgrade3,
      subtitle: "Level 3",
      description: "Upgrades the Attack and Defence attributes of Trident Marines.",
    },
    {
      id: BlockType.TridentMarineUpgrade4,
      subtitle: "Level 4",
      description: "Upgrades the Attack and Defence attributes of Trident Marines.",
    },
    {
      id: BlockType.TridentMarineUpgrade5,
      subtitle: "Level 5",
      description: "Upgrades the Attack and Defence attributes of Trident Marines.",
    },
  ],
};

// Research resource data should be read from getRecipe() in ../util/resource.ts

export const ResearchTree: ResearchTreeType = [
  {
    category: "Advanced Research",
    data: [MiningResearchTree],
  },
  {
    category: "Unit Upgrade Research",
    data: [
      MinutemanMarineUpgradeTree,
      TridentMarineUpgradeTree,
      AnvilDroneUpgradeTree,
      HammerDroneUpgradeTree,
      AegisDroneUpgradeTree,
      StingerDroneUpgradeTree,
      MiningVesselUpgradeTree,
    ],
  },
];

// duplicate above but for ExpansionResearch, up to level 7
export const ExpansionResearchTree: ResearchItemType = {
  name: "Expand Range",
  id: BlockType.ExpansionResearch1,
  description: "Unlocks expansion research — allows you to start expanding your base.",

  levels: [
    {
      id: BlockType.ExpansionResearch1,
      subtitle: "Level 1",
      description: "Unlocks expansion research — allows you to start expanding your base.",
    },
    {
      id: BlockType.ExpansionResearch2,
      subtitle: "Level 2",
      description: "Unlocks expansion research — allows you to start expanding your base.",
    },
    {
      id: BlockType.ExpansionResearch3,
      subtitle: "Level 3",
      description: "Unlocks expansion research — allows you to start expanding your base.",
    },
    {
      id: BlockType.ExpansionResearch4,
      subtitle: "Level 4",
      description: "Unlocks expansion research — allows you to start expanding your base.",
    },
    {
      id: BlockType.ExpansionResearch5,
      subtitle: "Level 5",
      description: "Unlocks expansion research — allows you to start expanding your base.",
    },
    {
      id: BlockType.ExpansionResearch6,
      subtitle: "Level 6",
      description: "Unlocks expansion research — allows you to start expanding your base.",
    },
    {
      id: BlockType.ExpansionResearch7,
      subtitle: "Level 7",
      description: "Unlocks expansion research — allows you to start expanding your base.",
    },
  ],
};
