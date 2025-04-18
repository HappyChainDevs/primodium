// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { System } from "@latticexyz/world/src/System.sol";

import { WorldResourceIdLib } from "@latticexyz/world/src/WorldResourceId.sol";
import { NamespaceOwner } from "@latticexyz/world/src/codegen/index.sol";
import { IWorld } from "codegen/world/IWorld.sol";

import { EFleetStance } from "src/Types.sol";
import { ShardAsteroid, GracePeriod, CooldownEnd, FleetStance, OwnedBy, FleetMovement, P_UnitPrototypes, P_Transportables } from "src/codegen/index.sol";

/**
 * @title PrimodiumSystem
 * @dev Extension of the System contract to manage Primodium game logic.
 */
contract PrimodiumSystem is System {
  /**
   * @dev Ensures the caller is the admin of the Primodium namespace.
   */
  modifier onlyAdmin() {
    address namespaceOwner = NamespaceOwner.get(WorldResourceIdLib.encodeNamespace(bytes14("Pri_11")));
    require(namespaceOwner == _msgSender(), "[Primodium] Only admin");
    _;
  }

  /**
   * @dev Claims resources for the given asteroid entity before proceeding.
   * @param asteroidEntity The unique identifier for the asteroid.
   */
  modifier _claimResources(bytes32 asteroidEntity) {
    IWorld(_world()).Pri_11__claimResources(asteroidEntity);
    _;
  }

  /**
   * @dev Claims units for the given asteroid entity before proceeding.
   * @param asteroidEntity The unique identifier for the asteroid.
   */
  modifier _claimUnits(bytes32 asteroidEntity) {
    IWorld(_world()).Pri_11__claimUnits(asteroidEntity);
    _;
  }

  /**
   * @dev Claims points for the given asteroid entity before proceeding.
   * @param asteroidEntity The unique identifier for the asteroid.
   */

  modifier _claimShardAsteroidPoints(bytes32 asteroidEntity) {
    if (ShardAsteroid.getIsShardAsteroid(asteroidEntity)) {
      IWorld(_world()).Pri_11__claimShardAsteroidPoints(asteroidEntity);
    }
    _;
  }
  /**
   * @dev Ensures the caller is the owner of the specified fleet.
   * @param fleetEntity The unique identifier for the fleet.
   */
  modifier _onlyFleetOwner(bytes32 fleetEntity) {
    require(OwnedBy.get(OwnedBy.get(fleetEntity)) == _player(), "[Fleet] Not fleet owner");
    _;
  }

  /**
   * @dev Ensures the fleet is in orbit (has arrived) before proceeding.
   * @param fleetEntity The unique identifier for the fleet.
   */
  modifier _onlyOrbiting(bytes32 fleetEntity) {
    require(FleetMovement.getArrivalTime(fleetEntity) <= block.timestamp, "[Fleet] Fleet is not in orbit");
    _;
  }

  /**
   * @dev Ensures the fleet is not in a cooldown period before proceeding.
   * @param fleetEntity The unique identifier for the fleet.
   */
  modifier _onlyNotInCooldown(bytes32 fleetEntity) {
    require(block.timestamp >= CooldownEnd.get(fleetEntity), "[Fleet] Fleet is in cooldown");
    _;
  }

  /**
   * @dev Ensures the entity is not within a grace period before allowing combat-related actions.
   * @param entity The unique identifier for the entity (fleet or asteroid).
   */
  modifier _onlyNotInGracePeriod(bytes32 entity) {
    require(block.timestamp >= GracePeriod.get(entity), "[Fleet] Target is in grace period");
    _;
  }
  /**
   * @dev Ensures the fleet is in orbit of the specified asteroid before proceeding.
   * @param fleetEntity The unique identifier for the fleet.
   * @param asteroidEntity The unique identifier for the asteroid.
   */
  modifier _onlyOrbitingAsteroid(bytes32 fleetEntity, bytes32 asteroidEntity) {
    require(
      (FleetMovement.getArrivalTime(fleetEntity) <= block.timestamp) &&
        (FleetMovement.getDestination(fleetEntity) == asteroidEntity),
      "[Fleet] Fleet is not in orbit"
    );
    _;
  }

  /**
   * @dev Ensures two fleets are in the same orbit before proceeding.
   * @param fleetEntity The unique identifier for the first fleet.
   * @param fleetEntity2 The unique identifier for the second fleet.
   */
  modifier _onlySameOrbit(bytes32 fleetEntity, bytes32 fleetEntity2) {
    require(
      (FleetMovement.getArrivalTime(fleetEntity) <= block.timestamp) &&
        (FleetMovement.getArrivalTime(fleetEntity2) <= block.timestamp) &&
        (FleetMovement.getDestination(fleetEntity) == FleetMovement.getDestination(fleetEntity2)),
      "[Fleet] Fleets are not in orbit"
    );
    _;
  }

  /**
   * @dev Ensures the caller is the owner of the specified asteroid before proceeding.
   * @param asteroidEntity The unique identifier for the asteroid.
   */
  modifier _onlyAsteroidOwner(bytes32 asteroidEntity) {
    require(OwnedBy.get(asteroidEntity) == _player(), "[Primodium] Not asteroid owner");
    _;
  }

  /**
   * @dev Ensures the caller is the owner of the specified asteroid before proceeding.
   * @param buildingEntity The unique identifier for the asteroid.
   */
  modifier _onlyBuildingOwner(bytes32 buildingEntity) {
    require(OwnedBy.get(OwnedBy.get(buildingEntity)) == _player(), "[Primodium] Not building owner");
    _;
  }

  /**
   * @dev Validates the length of the unit counts array before proceeding.
   * @param unitCounts Array containing unit counts.
   */
  modifier _unitCountIsValid(uint256[] memory unitCounts) {
    require(unitCounts.length == P_UnitPrototypes.length(), "[Fleet] Incorrect unit array length");
    _;
  }

  /**
   * @dev Validates the length of the resource counts array before proceeding.
   * @param resourceCounts Array containing resource counts.
   */
  modifier _resourceCountIsValid(uint256[] memory resourceCounts) {
    require(resourceCounts.length == P_Transportables.length(), "[Fleet] Incorrect resource array length");
    _;
  }

  /**
   * @dev Ensures the fleet is not in any stance before proceeding.
   * @param fleetEntity The unique identifier for the fleet.
   */
  modifier _onlyNotInStance(bytes32 fleetEntity) {
    require(FleetStance.getStance(fleetEntity) == uint8(EFleetStance.NULL), "[Fleet] Fleet cannot be in stance");
    _;
  }

  /**
   * @dev Converts an address to its corresponding entity representation.
   * @param a The address to convert.
   * @return The corresponding entity representation of the address.
   */
  function addressToEntity(address a) internal pure returns (bytes32) {
    return bytes32(uint256(uint160((a))));
  }

  /**
   * @dev Converts an entity representation back to its corresponding address.
   * @param a The entity representation to convert.
   * @return The corresponding address of the entity representation.
   */
  function entityToAddress(bytes32 a) internal pure returns (address) {
    return address(uint160(uint256((a))));
  }

  /**
   * @dev Retrieves the entity representation of the current player (message sender).
   * @return The entity representation of the current player.
   */
  function _player() internal view returns (bytes32) {
    return addressToEntity(_msgSender());
  }
}
