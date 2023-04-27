import { World } from "@latticexyz/recs";
import {
  defineBoolComponent,
  defineNumberComponent,
  defineCoordComponent,
} from "@latticexyz/std-client";

export function defineComponents(world: World) {
  return {
    Counter: defineNumberComponent(world, {
      metadata: {
        contractId: "component.Counter",
      },
    }),
    Position: defineCoordComponent(world, {
      metadata: {
        contractId: "component.Position",
      },
    }),
    Tile: defineNumberComponent(world, {
      metadata: {
        contractId: "component.Tile",
      },
    }),
    Path: defineNumberComponent(world, {
      metadata: {
        contractId: "component.Path",
      },
    }),
    OwnedBy: defineNumberComponent(world, {
      metadata: {
        contractId: "component.OwnedBy",
      },
    }),
    Item: defineNumberComponent(world, {
      metadata: {
        contractId: "component.Item",
      },
    }),
    LastBuiltAt: defineNumberComponent(world, {
      metadata: {
        contractId: "component.LastBuiltAt",
      },
    }),
    LastClaimedAt: defineNumberComponent(world, {
      metadata: {
        contractId: "component.LastClaimedAt",
      },
    }),
    BolutiteResource: defineNumberComponent(world, {
      metadata: {
        contractId: "component.BolutiteResource",
      },
    }),
    CopperResource: defineNumberComponent(world, {
      metadata: {
        contractId: "component.CopperResource",
      },
    }),
    IridiumResource: defineNumberComponent(world, {
      metadata: {
        contractId: "component.IridiumResource",
      },
    }),
    IronResource: defineNumberComponent(world, {
      metadata: {
        contractId: "component.IronResource",
      },
    }),
    KimberliteResource: defineNumberComponent(world, {
      metadata: {
        contractId: "component.KimberliteResource",
      },
    }),
    LithiumResource: defineNumberComponent(world, {
      metadata: {
        contractId: "component.LithiumResource",
      },
    }),
    OsmiumResource: defineNumberComponent(world, {
      metadata: {
        contractId: "component.OsmiumResource",
      },
    }),
    TitaniumResource: defineNumberComponent(world, {
      metadata: {
        contractId: "component.TitaniumResource",
      },
    }),
    TungstenResource: defineNumberComponent(world, {
      metadata: {
        contractId: "component.TungstenResource",
      },
    }),
    UraniniteResource: defineNumberComponent(world, {
      metadata: {
        contractId: "component.UraniniteResource",
      },
    }),
    // debug craft resource
    BulletCrafted: defineNumberComponent(world, {
      metadata: {
        contractId: "component.BulletCrafted",
      },
    }),

    // Research Components
    CopperResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.CopperResearch",
      },
    }),
    LithiumResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.LithiumResearch",
      },
    }),
    TitaniumResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.TitaniumResearch",
      },
    }),
    OsmiumResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.OsmiumResearch",
      },
    }),
    TungstenResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.TungstenResearch",
      },
    }),
    IridiumResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.IridiumResearch",
      },
    }),
    KimberliteResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.KimberliteResearch",
      },
    }),

    PlatingFactoryResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.PlatingFactoryResearch",
      },
    }),
    BasicBatteryFactoryResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.BasicBatteryFactoryResearch",
      },
    }),
    KineticMissileFactoryResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.KineticMissileFactoryResearch",
      },
    }),
    ProjectileLauncherResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.ProjectileLauncherResearch",
      },
    }),
    HardenedDrillResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.HardenedDrillResearch",
      },
    }),
    DenseMetalRefineryResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.DenseMetalRefineryResearch",
      },
    }),
    AdvancedBatteryFactoryResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.AdvancedBatteryFactoryResearch",
      },
    }),
    HighTempFoundryResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.HighTempFoundryResearch",
      },
    }),
    PrecisionMachineryFactoryResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.PrecisionMachineryFactoryResearch",
      },
    }),
    IridiumDrillbitFactoryResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.IridiumDrillbitFactoryResearch",
      },
    }),
    PrecisionPneumaticDrillResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.PrecisionPneumaticDrillResearch",
      },
    }),
    PenetratorFactoryResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.PenetratorFactoryResearch",
      },
    }),
    PenetratingMissileFactoryResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.PenetratingMissileFactoryResearch",
      },
    }),
    MissileLaunchComplexResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.MissileLaunchComplexResearch",
      },
    }),
    HighEnergyLaserFactoryResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.HighEnergyLaserFactoryResearch",
      },
    }),
    ThermobaricWarheadFactoryResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.ThermobaricWarheadFactoryResearch",
      },
    }),
    ThermobaricMissileFactoryResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.ThermobaricMissileFactoryResearch",
      },
    }),
    KimberliteCatalystFactoryResearch: defineBoolComponent(world, {
      metadata: {
        contractId: "component.KimberliteCatalystFactoryResearch",
      },
    }),

    // Crafted Components
    IronPlateCrafted: defineNumberComponent(world, {
      metadata: {
        contractId: "component.IronPlateCrafted",
      },
    }),
    BasicPowerSourceCrafted: defineNumberComponent(world, {
      metadata: {
        contractId: "component.BasicPowerSourceCrafted",
      },
    }),
    KineticMissileCrafted: defineNumberComponent(world, {
      metadata: {
        contractId: "component.KineticMissileCrafted",
      },
    }),
    RefinedOsmiumCrafted: defineNumberComponent(world, {
      metadata: {
        contractId: "component.RefinedOsmiumCrafted",
      },
    }),
    AdvancedPowerSourceCrafted: defineNumberComponent(world, {
      metadata: {
        contractId: "component.AdvancedPowerSourceCrafted",
      },
    }),
    PenetratingWarheadCrafted: defineNumberComponent(world, {
      metadata: {
        contractId: "component.PenetratingWarheadCrafted",
      },
    }),
    PenetratingMissileCrafted: defineNumberComponent(world, {
      metadata: {
        contractId: "component.PenetratingMissileCrafted",
      },
    }),
    TungstenRodsCrafted: defineNumberComponent(world, {
      metadata: {
        contractId: "component.TungstenRodsCrafted",
      },
    }),
    IridiumCrystalCrafted: defineNumberComponent(world, {
      metadata: {
        contractId: "component.IridiumCrystalCrafted",
      },
    }),
    IridiumDrillbitCrafted: defineNumberComponent(world, {
      metadata: {
        contractId: "component.IridiumDrillbitCrafted",
      },
    }),
    LaserPowerSourceCrafted: defineNumberComponent(world, {
      metadata: {
        contractId: "component.LaserPowerSourceCrafted",
      },
    }),
    ThermobaricWarheadCrafted: defineNumberComponent(world, {
      metadata: {
        contractId: "component.ThermobaricWarheadCrafted",
      },
    }),
    ThermobaricMissileCrafted: defineNumberComponent(world, {
      metadata: {
        contractId: "component.ThermobaricMissileCrafted",
      },
    }),
    KimberliteCrystalCatalystCrafted: defineNumberComponent(world, {
      metadata: {
        contractId: "component.KimberliteCrystalCatalystCrafted",
      },
    }),

    // starter pack initialized
    StarterPackInitialized: defineBoolComponent(world, {
      metadata: {
        contractId: "component.StarterPackInitialized",
      },
    }),
  };
}

export function defineOffChainComponents(world: World) {
  return {
    DoubleCounter: defineNumberComponent(world, {
      metadata: {},
      id: "DoubleCounter",
    }),
  };
}
