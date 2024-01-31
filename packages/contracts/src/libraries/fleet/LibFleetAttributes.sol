// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { EResource } from "src/Types.sol";
import { FleetMovement, P_Transportables, UnitCount, P_Unit, P_UnitData, UnitLevel, ResourceCount, OwnedBy, P_UnitPrototypes } from "codegen/index.sol";
import { LibFleet } from "libraries/fleet/LibFleet.sol";
import { FleetsMap } from "libraries/fleet/FleetsMap.sol";
import { LibFleetStance } from "libraries/fleet/LibFleetStance.sol";
import { FleetsMap } from "libraries/fleet/FleetsMap.sol";
import { FleetKey, FleetOwnedByKey, FleetIncomingKey, FleetStanceKey } from "src/Keys.sol";

import { WORLD_SPEED_SCALE, UNIT_SPEED_SCALE } from "src/constants.sol";
import { EResource, EFleetStance } from "src/Types.sol";

library LibFleetAttributes {
  function getAttackWithFollowers(bytes32 fleetId) internal view returns (uint256 attack) {
    attack = getAttack(fleetId);
    bytes32[] memory followerFleetIds = LibFleetStance.getFollowerFleets(fleetId);
    for (uint8 i = 0; i < followerFleetIds.length; i++) {
      attack += getAttack(followerFleetIds[i]);
    }
  }

  function getAttacksWithFollowers(
    bytes32 fleetId
  ) internal view returns (uint256 attack, uint256[] memory attacks, uint256 totalAttack) {
    bytes32[] memory followerFleetIds = LibFleetStance.getFollowerFleets(fleetId);

    attacks = new uint256[](followerFleetIds.length);

    attack = getAttack(fleetId);
    totalAttack += attack;
    for (uint8 i = 0; i < followerFleetIds.length; i++) {
      attacks[i] = getAttack(followerFleetIds[i]);
      totalAttack += attacks[i];
    }
  }

  function getDefenseWithFollowers(bytes32 fleetId) internal view returns (uint256 defense) {
    defense = getDefense(fleetId);
    bytes32[] memory followerFleetIds = LibFleetStance.getFollowerFleets(fleetId);
    for (uint8 i = 0; i < followerFleetIds.length; i++) {
      defense += getDefense(followerFleetIds[i]);
    }
  }

  function getDefensesWithFollowers(
    bytes32 fleetId
  ) internal view returns (uint256 defense, uint256[] memory defenses, uint256 totalDefense) {
    bytes32[] memory followerFleetIds = LibFleetStance.getFollowerFleets(fleetId);

    defenses = new uint256[](followerFleetIds.length);

    defense = getDefense(fleetId);
    totalDefense += defense;

    for (uint8 i = 0; i < followerFleetIds.length; i++) {
      defenses[i] = getDefense(followerFleetIds[i]);
      totalDefense += defenses[i];
    }
  }

  function getHpWithFollowers(
    bytes32 fleetId
  ) internal view returns (uint256 hp, uint256[] memory hps, uint256 totalHp) {
    hp = getHp(fleetId);
    bytes32[] memory followerFleetIds = LibFleetStance.getFollowerFleets(fleetId);
    hps = new uint256[](followerFleetIds.length);
    totalHp = hp;
    for (uint8 i = 0; i < followerFleetIds.length; i++) {
      hps[i] = getHp(followerFleetIds[i]);
      totalHp += hps[i];
    }
  }

  function getSpeedWithFollowers(bytes32 fleetId) internal view returns (uint256 speed) {
    speed = getSpeed(fleetId);
    bytes32[] memory followerFleetIds = LibFleetStance.getFollowerFleets(fleetId);
    for (uint8 i = 0; i < followerFleetIds.length; i++) {
      uint256 followerSpeed = getSpeed(followerFleetIds[i]);
      if (followerSpeed < speed) speed = followerSpeed;
    }
  }

  function getCargoWithFollowers(bytes32 fleetId) internal view returns (uint256 cargo) {
    cargo = getCargo(fleetId);
    bytes32[] memory followerFleetIds = LibFleetStance.getFollowerFleets(fleetId);
    for (uint8 i = 0; i < followerFleetIds.length; i++) {
      cargo += getCargo(followerFleetIds[i]);
    }
  }

  function getOccupiedCargoWithFollowers(bytes32 fleetId) internal view returns (uint256 occupiedCargo) {
    occupiedCargo = getOccupiedCargo(fleetId);
    bytes32[] memory followerFleetIds = LibFleetStance.getFollowerFleets(fleetId);
    for (uint8 i = 0; i < followerFleetIds.length; i++) {
      occupiedCargo += getOccupiedCargo(followerFleetIds[i]);
    }
  }

  function getFreeCargoSpaceWithFollowers(
    bytes32 fleetId
  ) internal view returns (uint256 freeCargoSpace, uint256[] memory freeCargoSpaces, uint256 totalFreeCargoSpace) {
    bytes32[] memory followerFleetIds = LibFleetStance.getFollowerFleets(fleetId);
    freeCargoSpaces = new uint256[](followerFleetIds.length);
    freeCargoSpace = getFreeCargoSpace(fleetId);
    totalFreeCargoSpace = freeCargoSpace;
    for (uint8 i = 0; i < followerFleetIds.length; i++) {
      freeCargoSpaces[i] = getFreeCargoSpace(followerFleetIds[i]);
      totalFreeCargoSpace += freeCargoSpaces[i];
    }
  }

  function getResourceCountsWithFollowers(
    bytes32 fleetId
  ) internal view returns (uint256[] memory resourceCounts, uint256 totalResources) {
    bytes32[] memory followerFleetIds = LibFleetStance.getFollowerFleets(fleetId);
    uint8[] memory transportables = P_Transportables.get();
    resourceCounts = new uint256[](transportables.length);
    for (uint256 i = 0; i < transportables.length; i++) {
      resourceCounts[i] = ResourceCount.get(fleetId, transportables[i]);
      for (uint8 j = 0; j < followerFleetIds.length; j++) {
        resourceCounts[i] += ResourceCount.get(followerFleetIds[j], transportables[i]);
      }
      totalResources += resourceCounts[i];
    }
  }

  function getAttack(bytes32 fleetId) internal view returns (uint256 attack) {
    bytes32 ownerSpaceRock = OwnedBy.get(fleetId);
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    for (uint8 i = 0; i < unitPrototypes.length; i++) {
      uint256 unitCount = UnitCount.get(fleetId, unitPrototypes[i]);
      if (unitCount == 0) continue;
      uint256 unitLevel = UnitLevel.get(ownerSpaceRock, unitPrototypes[i]);
      attack += P_Unit.getAttack(unitPrototypes[i], unitLevel) * unitCount;
    }
  }

  function getDefense(bytes32 fleetId) internal view returns (uint256 defense) {
    bytes32 ownerSpaceRock = OwnedBy.get(fleetId);
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    for (uint8 i = 0; i < unitPrototypes.length; i++) {
      uint256 unitCount = UnitCount.get(fleetId, unitPrototypes[i]);
      if (unitCount == 0) continue;
      uint256 unitLevel = UnitLevel.get(ownerSpaceRock, unitPrototypes[i]);
      defense += P_Unit.getDefense(unitPrototypes[i], unitLevel) * unitCount;
    }
  }

  function getHp(bytes32 fleetId) internal view returns (uint256 hp) {
    bytes32 ownerSpaceRock = OwnedBy.get(fleetId);
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    for (uint8 i = 0; i < unitPrototypes.length; i++) {
      uint256 unitCount = UnitCount.get(fleetId, unitPrototypes[i]);
      if (unitCount == 0) continue;
      uint256 unitLevel = UnitLevel.get(ownerSpaceRock, unitPrototypes[i]);
      hp += P_Unit.getHp(unitPrototypes[i], unitLevel) * unitCount;
    }
  }

  function getDecryption(
    bytes32 fleetId
  ) internal view returns (bytes32 unitWithDecryptionPrototype, uint256 decryption) {
    bytes32 ownerSpaceRock = OwnedBy.get(fleetId);
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    for (uint8 i = 0; i < unitPrototypes.length; i++) {
      uint256 unitCount = UnitCount.get(fleetId, unitPrototypes[i]);
      if (unitCount == 0) continue;
      uint256 unitLevel = UnitLevel.get(ownerSpaceRock, unitPrototypes[i]);
      uint256 unitDecryption = P_Unit.getDecryption(unitPrototypes[i], unitLevel);
      if (unitDecryption == 0) continue;
      else if (decryption == 0 || unitDecryption > decryption) {
        decryption = unitDecryption;
        unitWithDecryptionPrototype = unitPrototypes[i];
      }
    }
  }

  function getSpeed(bytes32 fleetId) internal view returns (uint256 speed) {
    bytes32 ownerSpaceRock = OwnedBy.get(fleetId);
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    for (uint8 i = 0; i < unitPrototypes.length; i++) {
      uint256 unitCount = UnitCount.get(fleetId, unitPrototypes[i]);
      if (unitCount == 0) continue;
      uint256 unitLevel = UnitLevel.get(ownerSpaceRock, unitPrototypes[i]);
      uint256 unitSpeed = P_Unit.getSpeed(unitPrototypes[i], unitLevel);
      if (speed == 0) speed = unitSpeed;
      else if (speed > unitSpeed) speed = unitSpeed;
    }
  }

  function getCargo(bytes32 fleetId) internal view returns (uint256 cargo) {
    bytes32 ownerSpaceRock = OwnedBy.get(fleetId);
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    cargo = 0;
    for (uint8 i = 0; i < unitPrototypes.length; i++) {
      uint256 unitCount = UnitCount.get(fleetId, unitPrototypes[i]);
      if (unitCount == 0) continue;
      uint256 unitLevel = UnitLevel.get(ownerSpaceRock, unitPrototypes[i]);
      cargo += P_Unit.getCargo(unitPrototypes[i], unitLevel) * unitCount;
    }
  }

  function getFreeCargoSpace(bytes32 fleetId) internal view returns (uint256) {
    uint256 totalCargo = getCargo(fleetId);
    uint256 occupiedCargo = getOccupiedCargo(fleetId);
    return totalCargo - occupiedCargo;
  }

  function getOccupiedCargo(bytes32 fleetId) internal view returns (uint256 totalStoredResources) {
    uint8[] memory transportables = P_Transportables.get();
    totalStoredResources = 0;
    for (uint8 i = 0; i < transportables.length; i++) {
      totalStoredResources += ResourceCount.get(fleetId, transportables[i]);
    }
    return totalStoredResources;
  }

  function getResourceCounts(bytes32 fleetId) internal view returns (uint256[] memory resourceCounts) {
    uint8[] memory transportables = P_Transportables.get();
    resourceCounts = new uint256[](transportables.length);
    for (uint256 i = 0; i < transportables.length; i++) {
      resourceCounts[i] = ResourceCount.get(fleetId, transportables[i]);
    }
    return resourceCounts;
  }
}
