import {
  Entity,
  Has,
  HasValue,
  defineComponentSystem,
  defineEnterSystem,
  defineExitSystem,
  defineUpdateSystem,
  namespaceWorld,
  runQuery,
} from "@latticexyz/recs";

import { components } from "@/network/components";
import { world } from "@/network/world";
import { Building } from "@/game/lib/objects/Building";
import { removeRaidableAsteroid } from "@/game/scenes/starmap/systems/utils/initializeSecondaryAsteroids";
import { DepthLayers } from "@/game/lib/constants/common";
import { PrimodiumScene } from "@/game/api/scene";
import { Action, EntityType } from "@/util/constants";
import { getBuildingBottomLeft } from "@/util/building";
import { hashEntities } from "@/util/encode";
import { isDomInteraction } from "@/util/canvas";
import { EMap } from "contracts/config/enums";

//TODO: Temp system implementation. Logic be replaced with state machine instead of direct obj manipulation
export const renderBuilding = (scene: PrimodiumScene) => {
  const systemsWorld = namespaceWorld(world, "systems");
  const spectateWorld = namespaceWorld(world, "game_spectate");
  const { objects } = scene;

  defineComponentSystem(systemsWorld, components.ActiveRock, async ({ value }) => {
    //sleep 1 second to allow for building to be removed
    if (!value[0] || value[0]?.value === value[1]?.value) return;

    const activeRock = value[0]?.value as Entity;

    world.dispose("game_spectate");

    // Wait for a few seconds for initial buildings to be entered into the query and placed, so we don't trigger
    // the build anim for them
    let initialBuildingsPlaced = false;
    setTimeout(() => (initialBuildingsPlaced = true), 3000);

    // Find old buildings that have this asteroid as parent
    const positionQuery = [
      HasValue(components.Position, {
        parentEntity: value[0]?.value,
      }),
      Has(components.BuildingType),
      Has(components.IsActive),
      Has(components.Level),
    ];

    // Find old buildings that have the previous active asteroid as parent
    const oldPositionQuery = [
      HasValue(components.Position, {
        parentEntity: value[1]?.value,
      }),
      Has(components.BuildingType),
      Has(components.IsActive),
      Has(components.Level),
    ];

    // Dispose of buildings on the previous active asteroid
    for (const entity of runQuery(oldPositionQuery)) {
      const building = objects.building.get(entity);
      if (building) {
        building.destroy();
      }
    }

    const render = ({ entity, showLevelAnimation = false }: { entity: Entity; showLevelAnimation?: boolean }) => {
      if (objects.building.has(entity)) {
        const building = objects.building.get(entity);
        if (!building) return;
        building.setLevel(components.Level.get(entity)?.value ?? 1n, !showLevelAnimation);
        building.setActive(components.IsActive.get(entity)?.value ?? true);

        // at this point, we might be moving a building, so update its position
        const origin = components.Position.get(entity);
        const buildingPrototype = components.BuildingType.get(entity)?.value as Entity | undefined;
        if (!origin || !buildingPrototype) return;
        const tileCoord = getBuildingBottomLeft(origin, buildingPrototype);
        building.setCoordPosition(tileCoord);
        building.setDepth(DepthLayers.Building - tileCoord.y * 5);
        // trigger anim since the building was just moved
        if (!showLevelAnimation) building.triggerPlacementAnim();

        return;
      }

      const buildingType = components.BuildingType.get(entity)?.value as Entity | undefined;

      if (!buildingType) return;

      //remove droid base if mainbase exists
      if (buildingType === EntityType.MainBase) {
        const droidBaseEntity = hashEntities(activeRock, EntityType.DroidBase);
        const droidBaseActive = components.IsActive.get(droidBaseEntity)?.value;
        components.Position.remove(droidBaseEntity);
        components.BuildingType.remove(droidBaseEntity);
        components.Level.remove(droidBaseEntity);
        components.IsActive.remove(droidBaseEntity);
        components.OwnedBy.remove(droidBaseEntity);
        // if droidbaseactive is defined, remove raidable asteroid. if not, it means it was already removed
        if (droidBaseActive && components.Asteroid.get(activeRock)?.mapId === EMap.Common) {
          removeRaidableAsteroid(activeRock);
        }
      }

      if (buildingType === EntityType.WormholeBase) {
        const wormholeEntity = hashEntities(activeRock, EntityType.Wormhole);
        components.Position.remove(wormholeEntity);
        components.BuildingType.remove(wormholeEntity);
        components.Level.remove(wormholeEntity);
        components.IsActive.remove(wormholeEntity);
        components.OwnedBy.remove(wormholeEntity);
      }

      const origin = components.Position.get(entity);
      if (!origin) return;
      const tilePosition = getBuildingBottomLeft(origin, buildingType);

      const building = new Building({ id: entity, scene, buildingType, coord: tilePosition })
        .setLevel(components.Level.get(entity)?.value ?? 1n, true)
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, (pointer: Phaser.Input.Pointer) => {
          if (pointer.getDuration() > 250 || isDomInteraction(pointer, "up")) return;
          components.SelectedBuilding.set({
            value: entity,
          });
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
          const action = components.SelectedAction.get()?.value;
          // remove annoying tooltips when moving or placing buildings
          if (action !== Action.MoveBuilding && action !== Action.PlaceBuilding) {
            components.HoverEntity.set({
              value: entity,
            });
          }

          if (components.SelectedBuilding.get()?.value === entity) return;

          building.setOutline(0x808080, 3);
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
          components.HoverEntity.remove();

          if (components.SelectedBuilding.get()?.value === entity) return;

          building.clearOutline();
        });

      // buildings.set(entity, building);
      // trigger the build anim if it's a new placement (not initializing)
      if (initialBuildingsPlaced) building.triggerPlacementAnim();
    };

    // handle selectedBuilding changes
    defineComponentSystem(spectateWorld, components.SelectedBuilding, ({ value }) => {
      if (value[0]?.value === value[1]?.value) return;

      const newBuilding = objects.building.get(value[0]?.value as Entity);
      if (newBuilding) {
        newBuilding.clearOutline();
        newBuilding.setOutline(0x00ffff, 3);
      }

      const oldBuilding = objects.building.get(value[1]?.value as Entity);
      if (oldBuilding) oldBuilding.clearOutline();
    });

    defineEnterSystem(spectateWorld, positionQuery, render);
    defineUpdateSystem(spectateWorld, positionQuery, ({ entity, component }) =>
      render({ entity, showLevelAnimation: component.id === components.Level.id })
    );

    defineExitSystem(spectateWorld, positionQuery, ({ entity }) => {
      const building = objects.building.get(entity);
      if (building) building.demolish();
    });
  });
};
