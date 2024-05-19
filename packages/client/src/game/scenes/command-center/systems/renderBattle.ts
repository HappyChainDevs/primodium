import { Entity, defineComponentSystem, namespaceWorld } from "@latticexyz/recs";
import { PrimodiumScene } from "@/game/api/scene";
import { components } from "src/network/components";
import { world } from "src/network/world";
import { BaseAsteroid } from "@/game/lib/objects/Asteroid/BaseAsteroid";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { addCoords } from "engine/lib/util/coords";
// import { entityToFleetName, entityToRockName } from "src/util/name";

const OFFSET = 1000;
export const renderBattle = (scene: PrimodiumScene) => {
  const systemsWorld = namespaceWorld(world, "systems");
  const { BattleResult } = components;

  const attackAnimation = async (entity: Entity, attacker: Entity, defender: Entity, attackerWinner?: boolean) => {
    // const attackerPosition = scene.objects.fleet.get(attacker)?.getTileCoord() ?? { x: 0, y: 0 };
    const battleResult = components.BattleResult.get(entity);
    const defenderIsFleet = !!components.IsFleet.get(defender)?.value;

    const attackerObj = scene.objects.fleet.get(attacker);
    const defenderObj = defenderIsFleet ? scene.objects.fleet.get(defender) : scene.objects.asteroid.get(defender);

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

    //defenderObj.fireAt(attackerPosition);
    const battleRender = scene.phaserScene.add
      .timeline([
        {
          at: 0,
          run: () => {
            components.BattleTarget.remove();
            components.FleetMovement.pauseUpdates(attacker);
            components.BattleTarget.pauseUpdates(singletonEntity);
            if (defenderIsFleet) components.FleetMovement.pauseUpdates(defender);
            if (!defenderIsFleet) (defenderObj as BaseAsteroid).getFleetsContainer().pauseRotation();
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
            //EXPLODE THE LOSER!
            scene.fx.emitExplosion(attackerWinner ? defenderPosition : attackerPosition, "md");

            const offset = { x: 0, y: -20 };
            scene.fx.emitFloatingText(addCoords(offset, attackerWinner ? defenderPosition : attackerPosition), "LOST", {
              color: 0xff0000,
            });
            scene.fx.emitFloatingText(addCoords(offset, attackerWinner ? attackerPosition : defenderPosition), "WON");
            components.FleetMovement.resumeUpdates(attacker);
            components.BattleTarget.resumeUpdates(singletonEntity);
            if (defenderIsFleet) components.FleetMovement.resumeUpdates(defender);
            if (!defenderIsFleet) (defenderObj as BaseAsteroid).getFleetsContainer().resumeRotation();
            battleRender.destroy();
          },
        },
      ])
      .play();

    // get the attacker fleet

    // get the defender fleet or asteroid

    // get the ally fleets

    // do attacker animation

    // do defender animation

    // do allies animaton

    //play the explosion animation

    // const isFleet = components.IsFleet.get(defender)?.value;
    // const position = isFleet
    //   ? scene.objects.fleet.get(defender)?.getTileCoord() ?? { x: 0, y: 0 }
    //   : components.Position.get(defender);

    // const playerEntity = components.Account.get()?.value;
    // const attackerRock = components.FleetMovement.get(attacker)?.destination as Entity;
    // if (!position || !playerEntity) return;
    // components.BattleRender.set({ value: attackerRock });
    // const { emitExplosion, fireMissile } = scene.fx;
    // const offsetMs = 50;
    // const numMissiles = 5;
    // const distance = getDistance(attackerPosition, position);
    // const missileDuration = (distance * 10000) / 40;

    // const offenseMissiles = new Array(numMissiles).fill(0).map((_, i) => {
    //   const delay = i * offsetMs;
    //   return { at: delay, run: () => fireMissile(attackerPosition, position, { duration: missileDuration }) };
    // });
    // const defenseDelay = 300;
    // const defenseMissiles = new Array(numMissiles).fill(0).map((_, i) => {
    //   const delay = i * offsetMs + defenseDelay;
    //   return { at: delay, run: () => fireMissile(position, attackerPosition, { duration: missileDuration }) };
    // });

    // const animationRuntime = defenseDelay + missileDuration + offsetMs * 5;

    // const runExplosion = () => {
    //   emitExplosion(attackerWinner ? position : attackerPosition, "sm");
    //   const defenderPlayer = getPlayerOwner(defender);
    //   const attackerPlayer = getPlayerOwner(attacker);
    //   if (defenderPlayer === playerEntity || attackerPlayer === playerEntity) {
    //     const { shake } = scene.camera;
    //     shake();
    //     battleNotification({ entity });
    //   }
    // };
    // const clearRender = () => components.BattleRender.clear();
    // components.FleetMovement.pauseUpdates(attacker);
    // if (isFleet) components.FleetMovement.pauseUpdates(defender);

    // scene.phaserScene.add
    //   .timeline([
    //     ...offenseMissiles,
    //     ...defenseMissiles,
    //     { at: animationRuntime * 0.8, run: runExplosion },
    //     { at: animationRuntime * 1.2, run: clearRender },
    //     {
    //       at: animationRuntime * 1.2,
    //       run: () => {
    //         components.FleetMovement.resumeUpdates(attacker);
    //         if (isFleet) components.FleetMovement.resumeUpdates(defender);
    //       },
    //     },
    //   ])
    //   .play();
  };

  // function battleNotification(update: { entity: Entity }) {
  //   const now = components.Time.get()?.value ?? 0n;
  //   if (now === 0n) return;

  //   const battle = components.Battle.get(update.entity);

  //   if (!battle) return;

  //   if (battle.timestamp + 30n < now) return;

  //   const playerEntity = components.Account.get()?.value;
  //   const attackerRock = components.OwnedBy.get(battle.attacker)?.value as Entity | undefined;
  //   const attackerRockOwner = components.OwnedBy.get(attackerRock)?.value;
  //   const defenderIsFleet = components.IsFleet.get(battle.defender)?.value;
  //   const defenderRock = defenderIsFleet
  //     ? (components.OwnedBy.get(battle.defender)?.value as Entity | undefined)
  //     : battle.defender;
  //   const defenderRockOwner = components.OwnedBy.get(defenderRock)?.value;

  //   const winner = battle.winner;
  //   if (defenderRock && attackerRockOwner === playerEntity) {
  //     const defenderName = defenderIsFleet ? entityToFleetName(battle.defender) : entityToRockName(defenderRock);
  //     battle.attacker === winner
  //       ? scene.notify("success", `Victory! You attacked ${defenderName} and won! View details in the battle report.`)
  //       : scene.notify("error", `Defeat! You attacked ${defenderName} and lost! View details in the battle report.`);
  //   } else if (attackerRock && defenderRockOwner === playerEntity) {
  //     battle.defender === winner
  //       ? scene.notify(
  //           "success",
  //           `Victory! You defended against ${entityToFleetName(
  //             battle.attacker
  //           )} and won! View details in the battle report.`
  //         )
  //       : scene.notify(
  //           "error",
  //           `Defeat! You defended against ${entityToFleetName(
  //             battle.attacker
  //           )} and lost! View details in the battle report .`
  //         );
  //   }
  // }

  defineComponentSystem(systemsWorld, BattleResult, (update) => {
    const now = components.Time.get()?.value ?? 0n;

    const battle = components.Battle.get(update.entity);

    if (!battle) return;

    if (battle.timestamp + 30n < now) return;

    const destination = components.Position.get(battle.rock as Entity);
    if (!destination) return;

    attackAnimation(update.entity, battle.attacker, battle.defender, battle.attacker === battle.winner);
  });
};
