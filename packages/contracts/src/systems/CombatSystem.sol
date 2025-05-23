// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { IWorld } from "codegen/world/IWorld.sol";
import { UnitCount, ResourceCount, IsFleet, BattleResult, BattleResultData, GracePeriod, OwnedBy, CooldownEnd } from "codegen/index.sol";
import { PrimodiumSystem } from "systems/internal/PrimodiumSystem.sol";
import { LibCombat } from "libraries/LibCombat.sol";
import { LibCombatAttributes } from "libraries/LibCombatAttributes.sol";
import { LibFleet } from "libraries/fleet/LibFleet.sol";
import { EResource } from "src/Types.sol";
import { ColonyShipPrototypeId } from "codegen/Prototypes.sol";

/**
 * @title CombatSystem
 * @dev Handles combat interactions within the Primodium game, extending PrimodiumSystem functionalities.
 */
contract CombatSystem is PrimodiumSystem {
  /**
   * @notice Initiates an attack from an entity (fleet or asteroid) on another entity (fleet or asteroid).
   * @dev Determines the type of attack based on the attacker and target entities and delegates to the appropriate internal function.
   * @param entity The unique identifier of the attacking entity.
   * @param targetEntity The unique identifier of the target entity.
   */
  function attack(bytes32 entity, bytes32 targetEntity) public {
    if (IsFleet.get(entity)) {
      if (IsFleet.get(targetEntity)) {
        fleetAttackFleet(entity, targetEntity);
      } else {
        fleetAttackAsteroid(entity, targetEntity);
      }
    } else {
      asteroidAttackFleet(entity, targetEntity);
    }
  }

  /**
   * @dev Handles a fleet attacking another fleet.
   * @param fleetEntity The unique identifier of the attacking fleet.
   * @param targetFleet The unique identifier of the target fleet.
   */
  function fleetAttackFleet(
    bytes32 fleetEntity,
    bytes32 targetFleet
  )
    private
    _onlyFleetOwner(fleetEntity)
    _onlyNotInCooldown(fleetEntity)
    _onlyNotInGracePeriod(targetFleet)
    _onlyNotInStance(fleetEntity)
    _onlySameOrbit(fleetEntity, targetFleet)
  {
    (bytes32 battleEntity, BattleResultData memory battleResult) = LibCombat.attack(fleetEntity, targetFleet);

    afterBattle(battleEntity, battleResult);
  }

  /**
   * @dev Handles a fleet attacking an asteroid.
   * @param fleetEntity The unique identifier of the attacking fleet.
   * @param targetAsteroid The unique identifier of the target asteroid.
   */
  function fleetAttackAsteroid(
    bytes32 fleetEntity,
    bytes32 targetAsteroid
  )
    private
    _onlyFleetOwner(fleetEntity)
    _onlyNotInCooldown(fleetEntity)
    _onlyNotInStance(fleetEntity)
    _onlyNotInGracePeriod(targetAsteroid)
    _onlyOrbitingAsteroid(fleetEntity, targetAsteroid)
    _claimResources(targetAsteroid)
    _claimUnits(targetAsteroid)
    _claimShardAsteroidPoints(targetAsteroid)
  {
    (bytes32 battleEntity, BattleResultData memory battleResult) = LibCombat.attack(fleetEntity, targetAsteroid);
    afterBattle(battleEntity, battleResult);
  }

  function asteroidAttackFleet(
    bytes32 asteroidEntity,
    bytes32 targetFleet
  )
    private
    _onlyNotInGracePeriod(targetFleet)
    _onlyAsteroidOwner(asteroidEntity)
    _onlyOrbitingAsteroid(targetFleet, asteroidEntity)
    _claimResources(asteroidEntity)
    _claimUnits(asteroidEntity)
  {
    (bytes32 battleEntity, BattleResultData memory battleResult) = LibCombat.attack(asteroidEntity, targetFleet);
    afterBattle(battleEntity, battleResult);
  }

  function afterBattle(bytes32 battleEntity, BattleResultData memory battleResult) internal {
    bool isAggressorWinner = battleResult.winnerEntity == battleResult.aggressorEntity;

    bool isAggressorFleet = IsFleet.get(battleResult.aggressorEntity);

    bool isTargetFleet = IsFleet.get(battleResult.targetEntity);
    bytes32 defendingPlayerEntity = isTargetFleet
      ? OwnedBy.get(OwnedBy.get(battleResult.targetEntity))
      : OwnedBy.get(battleResult.targetEntity);

    bool decrypt = isAggressorFleet && UnitCount.get(battleResult.aggressorEntity, ColonyShipPrototypeId) > 0;
    bool isRaid = isAggressorWinner && (isTargetFleet || !decrypt);
    bool isDecryption = !isRaid && isAggressorWinner && !isTargetFleet && decrypt;

    uint256 initTargetHp;
    if (isAggressorFleet) {
      initTargetHp = LibCombatAttributes.getHpWithAllies(battleResult.targetEntity);
    }

    IWorld world = IWorld(_world());
    if (battleResult.targetDamage > 0)
      world.Pri_11__applyDamage(
        battleEntity,
        defendingPlayerEntity,
        battleResult.aggressorEntity,
        battleResult.targetDamage
      );

    if (isRaid) {
      world.Pri_11__battleRaidResolve(battleEntity, battleResult.aggressorEntity, battleResult.targetEntity);
    }
    if (isDecryption) {
      //in decryption we resolve encryption first so the fleet decryption unit isn't lost before decrypting
      world.Pri_11__resolveBattleEncryption(battleEntity, battleResult.targetEntity, battleResult.aggressorEntity);
      if (ResourceCount.get(battleResult.targetEntity, uint8(EResource.R_Encryption)) == 0) {
        if (OwnedBy.get(battleResult.targetEntity) != bytes32(0)) {
          world.Pri_11__transferAsteroid(battleResult.targetEntity, _player());
        } else {
          world.Pri_11__initAsteroidOwner(battleResult.targetEntity, _player());
        }
      }
    }
    world.Pri_11__applyDamage(battleEntity, _player(), battleResult.targetEntity, battleResult.aggressorDamage);

    if (isAggressorFleet) {
      uint256 damageDealtToTarget;
      if (OwnedBy.get(battleResult.targetEntity) == _player()) {
        damageDealtToTarget = initTargetHp;
      } else {
        damageDealtToTarget = initTargetHp - LibCombatAttributes.getHpWithAllies(battleResult.targetEntity);
      }

      CooldownEnd.set(
        battleResult.aggressorEntity,
        block.timestamp + LibCombat.getCooldownTime(damageDealtToTarget, decrypt)
      );
    }

    // if asteroid was conquered and a colony ship was not yet destroyed in battle, destroy one now.
    if (isDecryption) {
      world.Pri_11__resolveConquerColonyShip(battleResult.targetEntity, battleResult.aggressorEntity);
    }
  }
}
