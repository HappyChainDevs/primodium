pragma solidity >=0.8.0;
import { PrimodiumSystem, IWorld, addressToEntity, getAddressById } from "./internal/PrimodiumSystem.sol";

import { ID as TrainUnitsSystemID } from "./TrainUnitsSystem.sol";

import { IOnSubsystem } from "../interfaces/IOnSubsystem.sol";
import { IOnEntitySubsystem } from "../interfaces/IOnEntitySubsystem.sol";
import { UnitsComponent, ID as UnitsComponentID } from "../components/UnitsComponent.sol";
import { UnitProductionOwnedByComponent, ID as UnitProductionOwnedByComponentID } from "../components/UnitProductionOwnedByComponent.sol";
import { UnitProductionQueueComponent, ID as UnitProductionQueueComponentID, ResourceValue } from "../components/UnitProductionQueueComponent.sol";
import { UnitProductionQueueIndexComponent, ID as UnitProductionQueueIndexComponentID } from "../components/UnitProductionQueueIndexComponent.sol";
import { UnitProductionLastQueueIndexComponent, ID as UnitProductionLastQueueIndexComponentID } from "../components/UnitProductionLastQueueIndexComponent.sol";
import { LastClaimedAtComponent, ID as LastClaimedAtComponentID } from "../components/LastClaimedAtComponent.sol";

import { LibUnits } from "../libraries/LibUnits.sol";
import { LibEncode } from "../libraries/LibEncode.sol";
import { LibMath } from "../libraries/LibMath.sol";

uint256 constant ID = uint256(keccak256("system.S_ClaimUnitsFromBuilding"));

contract S_ClaimUnitsFromBuildingSystem is IOnEntitySubsystem, PrimodiumSystem {
  constructor(IWorld _world, address _components) PrimodiumSystem(_world, _components) {}

  function execute(bytes memory args) public override returns (bytes memory) {
    (address playerAddress, uint256 buildingEntity) = abi.decode(args, (address, uint256));
    require(
      msg.sender == getAddressById(world.systems(), TrainUnitsSystemID) || msg.sender == playerAddress,
      "S_ClaimUnitsFromBuildingSystem: Only TrainUnitsSystem, or the player themself can call this function"
    );

    uint256 playerEntity = addressToEntity(playerAddress);

    LibUnits.claimUnitsFromBuilding(world, buildingEntity, playerEntity);
  }

  function executeTyped(address playerAddress, uint256 buildingEntity) public returns (bytes memory) {
    return execute(abi.encode(playerAddress, buildingEntity));
  }
}
