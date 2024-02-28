// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

/* Autogenerated file. Do not edit manually. */

import { IBaseWorld } from "@latticexyz/world/src/codegen/interfaces/IBaseWorld.sol";

import { IAllianceSystem } from "./IAllianceSystem.sol";
import { IBuildSystem } from "./IBuildSystem.sol";
import { IClaimObjectiveSystem } from "./IClaimObjectiveSystem.sol";
import { IDelegationSystem } from "./IDelegationSystem.sol";
import { IDestroySystem } from "./IDestroySystem.sol";
import { IDevSystem } from "./IDevSystem.sol";
import { IFleetCombatSystem } from "./IFleetCombatSystem.sol";
import { IFleetCreateSystem } from "./IFleetCreateSystem.sol";
import { IFleetDisbandSystem } from "./IFleetDisbandSystem.sol";
import { IFleetLandSystem } from "./IFleetLandSystem.sol";
import { IFleetMergeSystem } from "./IFleetMergeSystem.sol";
import { IFleetMoveSystem } from "./IFleetMoveSystem.sol";
import { IFleetRecallSystem } from "./IFleetRecallSystem.sol";
import { IFleetStanceSystem } from "./IFleetStanceSystem.sol";
import { IFleetTransferSystem } from "./IFleetTransferSystem.sol";
import { IIncrementSystem } from "./IIncrementSystem.sol";
import { IFleetBaseSystem } from "./IFleetBaseSystem.sol";
import { IPrimodiumSystem } from "./IPrimodiumSystem.sol";
import { IMarketplaceSystem } from "./IMarketplaceSystem.sol";
import { IMoveBuildingSystem } from "./IMoveBuildingSystem.sol";
import { ISpawnSystem } from "./ISpawnSystem.sol";
import { IS_BattleApplyDamageSystem } from "./IS_BattleApplyDamageSystem.sol";
import { IS_BattleEncryptionResolveSystem } from "./IS_BattleEncryptionResolveSystem.sol";
import { IS_BattleRaidResolveSystem } from "./IS_BattleRaidResolveSystem.sol";
import { IS_ClaimSystem } from "./IS_ClaimSystem.sol";
import { IS_CreateSecondaryAsteroidSystem } from "./IS_CreateSecondaryAsteroidSystem.sol";
import { IS_FleetResetIfNoUnitsLeftSystem } from "./IS_FleetResetIfNoUnitsLeftSystem.sol";
import { IS_FleetResolvePirateAsteroidSystem } from "./IS_FleetResolvePirateAsteroidSystem.sol";
import { IS_InitializeSpaceRockOwnershipSystem } from "./IS_InitializeSpaceRockOwnershipSystem.sol";
import { IS_ProductionRateSystem } from "./IS_ProductionRateSystem.sol";
import { IS_RewardsSystem } from "./IS_RewardsSystem.sol";
import { IS_SpawnPirateAsteroidSystem } from "./IS_SpawnPirateAsteroidSystem.sol";
import { IS_SpendResourcesSystem } from "./IS_SpendResourcesSystem.sol";
import { IS_StorageSystem } from "./IS_StorageSystem.sol";
import { IS_TransferSpaceRockOwnershipSystem } from "./IS_TransferSpaceRockOwnershipSystem.sol";
import { IToggleBuildingSystem } from "./IToggleBuildingSystem.sol";
import { ITrainUnitsSystem } from "./ITrainUnitsSystem.sol";
import { IUpgradeBuildingSystem } from "./IUpgradeBuildingSystem.sol";
import { IUpgradeRangeSystem } from "./IUpgradeRangeSystem.sol";
import { IUpgradeUnitSystem } from "./IUpgradeUnitSystem.sol";

/**
 * @title IWorld
 * @notice This interface integrates all systems and associated function selectors
 * that are dynamically registered in the World during deployment.
 * @dev This is an autogenerated file; do not edit manually.
 */
interface IWorld is
  IBaseWorld,
  IAllianceSystem,
  IBuildSystem,
  IClaimObjectiveSystem,
  IDelegationSystem,
  IDestroySystem,
  IDevSystem,
  IFleetCombatSystem,
  IFleetCreateSystem,
  IFleetDisbandSystem,
  IFleetLandSystem,
  IFleetMergeSystem,
  IFleetMoveSystem,
  IFleetRecallSystem,
  IFleetStanceSystem,
  IFleetTransferSystem,
  IIncrementSystem,
  IFleetBaseSystem,
  IPrimodiumSystem,
  IMarketplaceSystem,
  IMoveBuildingSystem,
  ISpawnSystem,
  IS_BattleApplyDamageSystem,
  IS_BattleEncryptionResolveSystem,
  IS_BattleRaidResolveSystem,
  IS_ClaimSystem,
  IS_CreateSecondaryAsteroidSystem,
  IS_FleetResetIfNoUnitsLeftSystem,
  IS_FleetResolvePirateAsteroidSystem,
  IS_InitializeSpaceRockOwnershipSystem,
  IS_ProductionRateSystem,
  IS_RewardsSystem,
  IS_SpawnPirateAsteroidSystem,
  IS_SpendResourcesSystem,
  IS_StorageSystem,
  IS_TransferSpaceRockOwnershipSystem,
  IToggleBuildingSystem,
  ITrainUnitsSystem,
  IUpgradeBuildingSystem,
  IUpgradeRangeSystem,
  IUpgradeUnitSystem
{

}
