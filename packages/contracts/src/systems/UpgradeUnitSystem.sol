// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { PrimodiumSystem } from "systems/internal/PrimodiumSystem.sol";

import { OwnedBy, P_EnumToPrototype, P_MaxLevel, UnitLevel } from "codegen/index.sol";
import { LibBuilding, LibResource, LibProduction } from "codegen/Libraries.sol";
import { EUnit } from "src/Types.sol";
import { UnitKey } from "src/Keys.sol";
import { IWorld } from "codegen/world/IWorld.sol";

contract UpgradeUnitSystem is PrimodiumSystem {
  /// @notice Upgrades the specified unit for the sender
  /// @param unit The type of unit to upgrade
  function upgradeUnit(bytes32 asteroidEntity, EUnit unit) public _claimResources(asteroidEntity) {
    bytes32 playerEntity = _player();
    bytes32 unitPrototype = P_EnumToPrototype.get(UnitKey, uint8(unit));
    uint256 currentLevel = UnitLevel.get(asteroidEntity, unitPrototype);
    uint256 targetLevel = currentLevel + 1;
    require(OwnedBy.get(asteroidEntity) == playerEntity, "[UpgradeUnitSystem] asteroid not owned by player");
    require(unit != EUnit.NULL && unit != EUnit.LENGTH, "[UpgradeUnitSystem] Invalid unit");

    require(
      LibBuilding.hasRequiredBaseLevel(asteroidEntity, unitPrototype, targetLevel),
      "[UpgradeUnitSystem] MainBase level requirement not met"
    );

    require(targetLevel <= P_MaxLevel.get(unitPrototype), "[UpgradeUnitSystem] Max level reached");

    IWorld(_world()).Primodium__spendUpgradeResources(asteroidEntity, unitPrototype, targetLevel);

    UnitLevel.set(asteroidEntity, unitPrototype, targetLevel);
  }
}
