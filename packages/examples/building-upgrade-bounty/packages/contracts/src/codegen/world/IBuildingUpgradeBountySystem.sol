// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

/* Autogenerated file. Do not edit manually. */

import { PositionData } from "./../index.sol";

/**
 * @title IBuildingUpgradeBountySystem
 * @dev This interface is automatically generated from the corresponding system contract. Do not edit manually.
 */
interface IBuildingUpgradeBountySystem {
  function upgrade_bounty__depositBounty(PositionData memory coord) external payable returns (uint256 bountyValue);

  function upgrade_bounty__withdrawBounty(PositionData memory coord) external;

  function upgrade_bounty__upgradeForBounty(
    address bountyPublisher,
    PositionData memory coord
  ) external returns (bytes32);
}
