// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

/* Autogenerated file. Do not edit manually. */

import { IBaseWorld } from "@latticexyz/world/src/codegen/interfaces/IBaseWorld.sol";

import { IAbandonAsteroidSystem } from "./IAbandonAsteroidSystem.sol";
import { IAllianceSystem } from "./IAllianceSystem.sol";
import { IBuildSystem } from "./IBuildSystem.sol";
import { IDestroySystem } from "./IDestroySystem.sol";
import { IMoveBuildingSystem } from "./IMoveBuildingSystem.sol";
import { IToggleBuildingSystem } from "./IToggleBuildingSystem.sol";
import { IUpgradeBuildingSystem } from "./IUpgradeBuildingSystem.sol";
import { IClaimObjectiveSystem } from "./IClaimObjectiveSystem.sol";
import { IColonySystem } from "./IColonySystem.sol";
import { ICombatSystem } from "./ICombatSystem.sol";
import { IDevSystem } from "./IDevSystem.sol";
import { IFleetClearSystem } from "./IFleetClearSystem.sol";
import { IFleetCreateSystem } from "./IFleetCreateSystem.sol";
import { IFleetLandSystem } from "./IFleetLandSystem.sol";
import { IFleetMergeSystem } from "./IFleetMergeSystem.sol";
import { IFleetRecallSystem } from "./IFleetRecallSystem.sol";
import { IFleetSendSystem } from "./IFleetSendSystem.sol";
import { IFleetStanceSystem } from "./IFleetStanceSystem.sol";
import { ITransferSystem } from "./ITransferSystem.sol";
import { IIncrementSystem } from "./IIncrementSystem.sol";
import { IPrimodiumSystem } from "./IPrimodiumSystem.sol";
import { IMarketplaceSystem } from "./IMarketplaceSystem.sol";
import { ISpawnSystem } from "./ISpawnSystem.sol";
import { IS_BattleApplyDamageSystem } from "./IS_BattleApplyDamageSystem.sol";
import { IS_BattleEncryptionResolveSystem } from "./IS_BattleEncryptionResolveSystem.sol";
import { IS_BattleRaidResolveSystem } from "./IS_BattleRaidResolveSystem.sol";
import { IS_BuildRaidableAsteroidSystem } from "./IS_BuildRaidableAsteroidSystem.sol";
import { IS_ClaimSystem } from "./IS_ClaimSystem.sol";
import { IS_CreateSecondaryAsteroidSystem } from "./IS_CreateSecondaryAsteroidSystem.sol";
import { IS_FleetClearSystem } from "./IS_FleetClearSystem.sol";
import { IS_InitAsteroidOwnerSystem } from "./IS_InitAsteroidOwnerSystem.sol";
import { IS_ProductionRateSystem } from "./IS_ProductionRateSystem.sol";
import { IS_RewardsSystem } from "./IS_RewardsSystem.sol";
import { IS_SpendResourcesSystem } from "./IS_SpendResourcesSystem.sol";
import { IS_StorageSystem } from "./IS_StorageSystem.sol";
import { IS_TransferAsteroidSystem } from "./IS_TransferAsteroidSystem.sol";
import { ITrainUnitsSystem } from "./ITrainUnitsSystem.sol";
import { IUpgradeRangeSystem } from "./IUpgradeRangeSystem.sol";
import { IUpgradeUnitSystem } from "./IUpgradeUnitSystem.sol";
import { IClaimPrimodiumSystem } from "./IClaimPrimodiumSystem.sol";
import { IClaimWormholeSystem } from "./IClaimWormholeSystem.sol";

/**
 * @title IWorld
 * @author MUD (https://mud.dev) by Lattice (https://lattice.xyz)
 * @notice This interface integrates all systems and associated function selectors
 * that are dynamically registered in the World during deployment.
 * @dev This is an autogenerated file; do not edit manually.
 */
interface IWorld is
  IBaseWorld,
  IAbandonAsteroidSystem,
  IAllianceSystem,
  IBuildSystem,
  IDestroySystem,
  IMoveBuildingSystem,
  IToggleBuildingSystem,
  IUpgradeBuildingSystem,
  IClaimObjectiveSystem,
  IColonySystem,
  ICombatSystem,
  IDevSystem,
  IFleetClearSystem,
  IFleetCreateSystem,
  IFleetLandSystem,
  IFleetMergeSystem,
  IFleetRecallSystem,
  IFleetSendSystem,
  IFleetStanceSystem,
  ITransferSystem,
  IIncrementSystem,
  IPrimodiumSystem,
  IMarketplaceSystem,
  ISpawnSystem,
  IS_BattleApplyDamageSystem,
  IS_BattleEncryptionResolveSystem,
  IS_BattleRaidResolveSystem,
  IS_BuildRaidableAsteroidSystem,
  IS_ClaimSystem,
  IS_CreateSecondaryAsteroidSystem,
  IS_FleetClearSystem,
  IS_InitAsteroidOwnerSystem,
  IS_ProductionRateSystem,
  IS_RewardsSystem,
  IS_SpendResourcesSystem,
  IS_StorageSystem,
  IS_TransferAsteroidSystem,
  ITrainUnitsSystem,
  IUpgradeRangeSystem,
  IUpgradeUnitSystem,
  IClaimPrimodiumSystem,
  IClaimWormholeSystem
{

}
