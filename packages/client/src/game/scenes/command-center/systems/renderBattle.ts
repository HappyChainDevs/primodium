import { Entity, defineComponentSystem, namespaceWorld } from "@latticexyz/recs";
import { PrimodiumScene } from "@/game/api/scene";
import { components } from "src/network/components";
import { world } from "src/network/world";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { addCoords } from "@primodiumxyz/engine/lib/util/coords";
import { Mode } from "@/util/constants";
import { battleNotification } from "@/network/systems/setupBattleNotifications";

const OFFSET = 1000;
export const renderBattle = (scene: PrimodiumScene) => {
  const systemsWorld = namespaceWorld(world, "systems");
  const { BattleResult } = components;

  const attackAnimation = async (entity: Entity, attacker: Entity, defender: Entity, attackerWinner?: boolean) => {
    const battleResult = components.BattleResult.get(entity);
    const defenderIsFleet = !!components.IsFleet.get(defender)?.value;
    const selectedRock = components.SelectedRock.get()?.value;

    const attackerObj = scene.objects.fleet.get(attacker);
    const defenderObj = defenderIsFleet ? scene.objects.fleet.get(defender) : scene.objects.asteroid.get(defender);
    const rockObj = scene.objects.asteroid.get(selectedRock ?? singletonEntity);

    if (!attackerObj || !defenderObj) return;

    const attackerPosition = attackerObj.getPixelCoord();
    const defenderPosition = defenderObj.getPixelCoord();

    const defenderAnimationStart = 2000;
    const defenderAllies = battleResult?.targetAllies
      .map((ally, i) => {
        const defenderFleet = scene.objects.fleet.get(ally as Entity);

        if (!defenderFleet) return null;

        return {
          at: defenderAnimationStart + OFFSET * i,
          run: () => {
            defenderFleet.fireAt(attackerPosition);
          },
        };
      })
      .filter((item) => item !== null) as Phaser.Types.Time.TimelineEventConfig[];

    components.BattleTarget.remove();
    components.FleetMovement.pauseUpdates(attacker);
    components.IsFleetEmpty.pauseUpdates(attacker);
    components.BattleTarget.blockUpdates(singletonEntity);
    components.SelectedMode.blockUpdates(singletonEntity);
    if (defenderIsFleet) {
      components.FleetMovement.pauseUpdates(defender);
      components.IsFleetEmpty.pauseUpdates(defender);
    }
    rockObj?.getFleetsContainer().pauseRotation();

    const battleRender = scene.phaserScene.add
      .timeline([
        {
          at: 0,
          run: () => {
            attackerObj.fireAt(defenderPosition);
          },
        },
        ...(defenderAllies ?? []),
        {
          at: defenderAnimationStart + OFFSET * defenderAllies.length + (defenderAllies.length ? OFFSET : 0),
          run: () => {
            defenderObj.fireAt(attackerPosition);
          },
        },
        {
          at: defenderAnimationStart + OFFSET * defenderAllies.length + OFFSET + 500,
          run: () => {
            const offset = { x: 0, y: -20 };
            scene.fx.emitFloatingText(addCoords(offset, attackerWinner ? defenderPosition : attackerPosition), "LOST", {
              color: 0xff0000,
            });
            scene.fx.emitFloatingText(addCoords(offset, attackerWinner ? attackerPosition : defenderPosition), "WON");
            rockObj?.getFleetsContainer().resumeRotation();
          },
        },
        {
          at: defenderAnimationStart + OFFSET * defenderAllies.length + OFFSET + 1000,
          run: () => {
            battleRender.destroy();
            components.FleetMovement.resumeUpdates(attacker);
            components.IsFleetEmpty.resumeUpdates(attacker);
            components.BattleTarget.unblockUpdates(singletonEntity);
            components.SelectedMode.unblockUpdates(singletonEntity);
            if (defenderIsFleet) {
              components.FleetMovement.resumeUpdates(defender);
              components.IsFleetEmpty.resumeUpdates(defender);
            }

            battleNotification(entity);
          },
        },
      ])
      .play();
  };

  defineComponentSystem(systemsWorld, BattleResult, (update) => {
    const now = components.Time.get()?.value ?? 0n;

    const battle = components.Battle.get(update.entity);

    if (!battle) return;

    if (battle.timestamp + 30n < now) return;

    //only render for selected rock in command view
    if (
      components.SelectedMode.get()?.value !== Mode.CommandCenter ||
      components.SelectedRock.get()?.value !== battle.rock
    )
      return;

    attackAnimation(update.entity, battle.attacker, battle.defender, battle.attacker === battle.winner);
  });
};
