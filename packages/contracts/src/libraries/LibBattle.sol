// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { MULTIPLIER_SCALE } from "src/constants.sol";
import { ESendType, Arrival, EResource } from "src/Types.sol";
import { Position, DestroyedUnit, ResourceCount, UnitCount, UnitLevel, BattleResult, BattleResultData, P_UnitPrototypes, P_Unit, ArrivalCount, Home } from "codegen/index.sol";
import { NUM_UNITS } from "src/constants.sol";
import { LibUnit } from "libraries/LibUnit.sol";
import { LibSend } from "libraries/LibSend.sol";
import { ArrivalsMap } from "libraries/ArrivalsMap.sol";

library LibBattle {
  /**
   * @dev Initiates a battle between two entities and calculates the outcome.
   * @param attackerEntity The identifier of the attacker entity.
   * @param defenderEntity The identifier of the defender entity.
   * @param rockEntity The identifier of the asteroid/rock involved in the battle.
   * @param sendType The type of the battle, e.g., Raid or other.
   * @return battleResult The battle result data including units left, winner, and cargo.
   */
  function battle(
    bytes32 attackerEntity,
    bytes32 defenderEntity,
    bytes32 rockEntity,
    ESendType sendType
  ) internal returns (BattleResultData memory battleResult) {
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    battleResult.attackerUnitsLeft = new uint256[](unitPrototypes.length);
    battleResult.defenderUnitsLeft = new uint256[](unitPrototypes.length);

    (uint256[] memory attackCounts, uint256 attackPoints, uint256 cargo) = getAttackPoints(
      attackerEntity,
      rockEntity,
      sendType
    );
    (uint256[] memory defenseCounts, uint256 defensePoints) = getDefensePoints(defenderEntity, rockEntity);

    bool isAttackerWinner = attackPoints > defensePoints;

    battleResult.attacker = attackerEntity;
    battleResult.defender = defenderEntity;
    battleResult.attackerStartingUnits = attackCounts;
    battleResult.defenderStartingUnits = defenseCounts;
    battleResult.winner = isAttackerWinner ? attackerEntity : defenderEntity;
    battleResult.totalCargo = cargo;
    battleResult.rock = rockEntity;
    battleResult.timestamp = block.timestamp;

    uint256 lossRatio;
    if (isAttackerWinner) {
      lossRatio = 100 - (attackPoints == 0 ? 0 : ((defensePoints * 100) / attackPoints));

      for (uint256 i = 0; i < unitPrototypes.length; i++) {
        battleResult.attackerUnitsLeft[i] = (attackCounts[i] * lossRatio) / 100;
      }
    } else {
      lossRatio = 100 - (defensePoints == 0 ? 0 : ((attackPoints * 100) / defensePoints));
      for (uint256 i = 0; i < unitPrototypes.length; i++) {
        battleResult.defenderUnitsLeft[i] = (defenseCounts[i] * lossRatio) / 100;
      }
    }

    BattleResult.set(keccak256(abi.encode(battleResult)), battleResult);

    return battleResult;
  }

  /**
   * @dev Calculates the defense points for a defender entity and rock.
   * @param defenderEntity The identifier of the defender entity.
   * @param rockEntity The identifier of the asteroid/rock.
   * @return defenseCounts The counts of defending units.
   * @return defensePoints The total defense points.
   */
  function getDefensePoints(bytes32 defenderEntity, bytes32 rockEntity)
    internal
    view
    returns (uint256[] memory defenseCounts, uint256 defensePoints)
  {
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    defenseCounts = new uint256[](unitPrototypes.length);
    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      uint256 defenderUnitCount = UnitCount.get(rockEntity, unitPrototypes[i]);
      uint256 defenderLevel = UnitLevel.get(defenderEntity, unitPrototypes[i]);
      defensePoints += defenderUnitCount * P_Unit.get(unitPrototypes[i], defenderLevel).defense;
      defenseCounts[i] += defenderUnitCount;
    }

    if (Home.get(defenderEntity).asteroid == rockEntity) {
      defensePoints += ResourceCount.get(rockEntity, uint8(EResource.U_Defense));
      defensePoints +=
        (defensePoints * ResourceCount.get(rockEntity, uint8(EResource.M_DefenseMultiplier))) /
        MULTIPLIER_SCALE;
    }
  }

  /**
   * @dev Calculates the attack points for an attacker entity based on arrivals and send type.
   * @param attackerEntity The identifier of the attacker entity.
   * @param rockEntity The identifier of the asteroid/rock.
   * @param sendType The type of the send, e.g., Raid or other.
   * @return attackCounts The counts of attacking units.
   * @return attackPoints The total attack points.
   * @return cargo The total cargo points.
   */
  function getAttackPoints(
    bytes32 attackerEntity,
    bytes32 rockEntity,
    ESendType sendType
  )
    internal
    returns (
      uint256[] memory attackCounts,
      uint256 attackPoints,
      uint256 cargo
    )
  {
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    attackCounts = new uint256[](unitPrototypes.length);
    bytes32[] memory arrivalKeys = ArrivalsMap.keys(attackerEntity, rockEntity);
    uint256 arrivalsApplied = 0;
    for (uint256 i = 0; i < arrivalKeys.length; i++) {
      Arrival memory arrival = ArrivalsMap.get(attackerEntity, rockEntity, arrivalKeys[i]);

      if (arrival.sendType != sendType || arrival.arrivalTime > block.timestamp) continue;

      for (uint256 j = 0; j < unitPrototypes.length; j++) {
        if (arrival.unitCounts[j] == 0) continue;
        uint256 unitLevel = UnitLevel.get(attackerEntity, unitPrototypes[j]);
        attackPoints += arrival.unitCounts[j] * P_Unit.get(unitPrototypes[j], unitLevel).attack;
        cargo += arrival.unitCounts[j] * P_Unit.get(unitPrototypes[j], unitLevel).cargo;
        attackCounts[j] += arrival.unitCounts[j];
      }

      ArrivalsMap.remove(attackerEntity, rockEntity, arrivalKeys[i]);
      arrivalsApplied++;
    }
    ArrivalCount.set(attackerEntity, ArrivalCount.get(attackerEntity) - arrivalsApplied);
  }

  /**
   * @dev Updates units and utilities after a battle.
   * @param br The battle result data.
   * @param sendType The type of the send, e.g., Raid or other.
   */
  function updateUnitsAfterBattle(BattleResultData memory br, ESendType sendType) internal {
    bytes32[] memory unitTypes = P_UnitPrototypes.get();
    uint256[NUM_UNITS] memory unitCounts;
    for (uint256 i = 0; i < unitTypes.length; i++) {
      uint256 attackerUnitsLost = br.attackerStartingUnits[i] - br.attackerUnitsLeft[i];
      uint256 defenderUnitsLost = br.defenderStartingUnits[i] - br.defenderUnitsLeft[i];

      LibUnit.decreaseUnitCount(br.rock, unitTypes[i], defenderUnitsLost);
      LibUnit.updateStoredUtilities(Home.getAsteroid(br.attacker), unitTypes[i], attackerUnitsLost, false);
      LibUnit.updateStoredUtilities(Home.getAsteroid(br.defender), unitTypes[i], defenderUnitsLost, false);

      DestroyedUnit.set(br.attacker, unitTypes[i], DestroyedUnit.get(br.attacker, unitTypes[i]) + defenderUnitsLost);
      DestroyedUnit.set(br.defender, unitTypes[i], DestroyedUnit.get(br.defender, unitTypes[i]) + attackerUnitsLost);

      if (br.winner == br.attacker) {
        if (sendType == ESendType.Invade) LibUnit.increaseUnitCount(br.rock, unitTypes[i], br.attackerUnitsLeft[i]);
        else unitCounts[i] = br.attackerUnitsLeft[i];
      }
    }
    if (br.winner == br.attacker) {
      LibSend.sendUnits(
        Arrival({
          unitCounts: unitCounts,
          sendTime: block.timestamp,
          sendType: ESendType.Reinforce,
          arrivalTime: LibSend.getArrivalTime(
            Position.get(br.rock),
            Position.get(Home.getAsteroid(br.attacker)),
            br.attacker,
            unitCounts
          ),
          from: br.attacker,
          to: br.attacker,
          origin: br.rock,
          destination: Home.getAsteroid(br.attacker)
        })
      );
    }
  }
}
