// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "forge-std/console.sol";
import { Deploy } from "../Deploy.sol";
import { MudTest } from "std-contracts/test/MudTest.t.sol";
import { addressToEntity } from "solecs/utils.sol";
import { BuildSystem, ID as BuildSystemID } from "../../systems/BuildSystem.sol";
import { UpgradeSystem, ID as UpgradeSystemID } from "../../systems/UpgradeSystem.sol";
import { DebugAcquireResourcesSystem, ID as DebugAcquireResourcesSystemID } from "../../systems/DebugAcquireResourcesSystem.sol";

import { OwnedByComponent, ID as OwnedByComponentID } from "../../components/OwnedByComponent.sol";
import { LevelComponent, ID as BuildingComponentID } from "../../components/LevelComponent.sol";
import { PathComponent, ID as PathComponentID } from "../../components/PathComponent.sol";
import { RequiredResourcesComponent, ID as RequiredResourcesComponentID } from "../../components/RequiredResourcesComponent.sol";
import { ItemComponent, ID as ItemComponentID } from "../../components/ItemComponent.sol";
import "../../prototypes.sol";
import { Coord } from "../../types.sol";
import { LibEncode } from "../../libraries/LibEncode.sol";
import { LibMath } from "../../libraries/LibMath.sol";
import { BuildingKey } from "../../prototypes.sol";
import { ResourceValue, ResourceValues } from "../../types.sol";

contract UpgradeSystemTest is MudTest {
  constructor() MudTest(new Deploy()) {}

  function setUp() public override {
    super.setUp();
    vm.startPrank(deployer);

    vm.stopPrank();
  }

  function testFailUpgradeNonUpgradableBuilding() public {
    vm.startPrank(alice);
    Coord memory coord = Coord({ x: 0, y: 0 });

    BuildSystem buildSystem = BuildSystem(system(BuildSystemID));
    UpgradeSystem upgradeSystem = UpgradeSystem(system(UpgradeSystemID));
    buildSystem.executeTyped(DebugSimpleBuildingNoReqsID, coord);
    upgradeSystem.executeTyped(coord);
    vm.stopPrank();
  }

  function testUpgradeToMaxLevel() public {
    vm.startPrank(alice);
    Coord memory coord = Coord({ x: 0, y: 0 });
    LevelComponent levelComponent = LevelComponent(component(BuildingComponentID));
    BuildSystem buildSystem = BuildSystem(system(BuildSystemID));
    UpgradeSystem upgradeSystem = UpgradeSystem(system(UpgradeSystemID));
    buildSystem.executeTyped(DebugIronMineNoTileReqID, coord);
    assertEq(levelComponent.getValue(LibEncode.encodeCoordEntity(coord, BuildingKey)), 1, "building should be level 1");
    upgradeSystem.executeTyped(coord);
    assertEq(levelComponent.getValue(LibEncode.encodeCoordEntity(coord, BuildingKey)), 2, "building should be level 2");
    upgradeSystem.executeTyped(coord);
    assertEq(levelComponent.getValue(LibEncode.encodeCoordEntity(coord, BuildingKey)), 3, "building should be level 3");
    vm.stopPrank();
  }

  function testFailUpgradeMaxLevelReached() public {
    vm.startPrank(alice);
    Coord memory coord = Coord({ x: 0, y: 0 });
    LevelComponent levelComponent = LevelComponent(component(BuildingComponentID));
    BuildSystem buildSystem = BuildSystem(system(BuildSystemID));
    UpgradeSystem upgradeSystem = UpgradeSystem(system(UpgradeSystemID));
    buildSystem.executeTyped(DebugIronMineNoTileReqID, coord);
    assertEq(levelComponent.getValue(LibEncode.encodeCoordEntity(coord, BuildingKey)), 1, "building should be level 1");
    upgradeSystem.executeTyped(coord);
    assertEq(levelComponent.getValue(LibEncode.encodeCoordEntity(coord, BuildingKey)), 2, "building should be level 2");
    upgradeSystem.executeTyped(coord);
    assertEq(levelComponent.getValue(LibEncode.encodeCoordEntity(coord, BuildingKey)), 3, "building should be level 3");
    upgradeSystem.executeTyped(coord);
    //should fail
    vm.stopPrank();
  }

  function testUpgrade() public {
    vm.startPrank(alice);

    Coord memory coord = Coord({ x: 0, y: 0 });

    BuildSystem buildSystem = BuildSystem(system(BuildSystemID));
    UpgradeSystem upgradeSystem = UpgradeSystem(system(UpgradeSystemID));
    DebugAcquireResourcesSystem debugAcquireResourcesSystem = DebugAcquireResourcesSystem(
      system(DebugAcquireResourcesSystemID)
    );

    LevelComponent levelComponent = LevelComponent(component(BuildingComponentID));
    RequiredResourcesComponent requiredResourcesComponent = RequiredResourcesComponent(
      component(RequiredResourcesComponentID)
    );
    console.log("building MainBase");
    bytes memory blockEntity = buildSystem.executeTyped(MainBaseID, coord);
    console.log("MainBase built");
    uint256 blockEntityID = abi.decode(blockEntity, (uint256));
    console.log("get built MainBase entity id ");
    assertTrue(levelComponent.has(blockEntityID), "MainBase entity id should have building component");
    assertTrue(levelComponent.getValue(blockEntityID) == 1, "MainBase entity id should be level 1");
    console.log("upgrading MainBase to level 2");
    ResourceValues memory requiredResources = requiredResourcesComponent.getValue(
      LibEncode.hashKeyEntity(MainBaseID, 2)
    );
    for (uint256 i = 0; i < requiredResources.resources.length; i++) {
      console.log(
        "MainBase level 2 requires resource: %s of amount %s",
        requiredResources.resources[i],
        requiredResources.values[i]
      );
      debugAcquireResourcesSystem.executeTyped(requiredResources.resources[i], requiredResources.values[i]);
      console.log("%s of amount %s provided to player", requiredResources.resources[i], requiredResources.values[i]);
    }
    upgradeSystem.executeTyped(coord);
    assertTrue(levelComponent.getValue(blockEntityID) == 2);

    vm.stopPrank();
  }

  function testFailUpgradeResourceRequirementsNotMet() public {
    vm.startPrank(alice);

    Coord memory coord = Coord({ x: 0, y: 0 });

    BuildSystem buildSystem = BuildSystem(system(BuildSystemID));
    UpgradeSystem upgradeSystem = UpgradeSystem(system(UpgradeSystemID));
    LevelComponent levelComponent = LevelComponent(component(BuildingComponentID));

    bytes memory blockEntity = buildSystem.executeTyped(MainBaseID, coord);
    uint256 blockEntityID = abi.decode(blockEntity, (uint256));
    assertTrue(levelComponent.has(blockEntityID));
    assertTrue(levelComponent.getValue(blockEntityID) == 1);

    upgradeSystem.executeTyped(coord);
    vm.stopPrank();
  }
}
