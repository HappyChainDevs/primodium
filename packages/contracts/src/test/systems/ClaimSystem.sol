// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "forge-std/console.sol";

import "../PrimodiumTest.t.sol";
import { addressToEntity } from "solecs/utils.sol";

import { BuildSystem, ID as BuildSystemID } from "../../systems/BuildSystem.sol";
import { BuildPathSystem, ID as BuildPathSystemID } from "../../systems/BuildPathSystem.sol";
import { DestroyPathSystem, ID as DestroyPathSystemID } from "../../systems/DestroyPathSystem.sol";
import { ClaimFromMineSystem, ID as ClaimFromMineSystemID } from "../../systems/ClaimFromMineSystem.sol";
import { UpgradeSystem, ID as UpgradeSystemID } from "../../systems/UpgradeSystem.sol";
import { ComponentDevSystem, ID as ComponentDevSystemID } from "../../systems/ComponentDevSystem.sol";
import { PathComponent, ID as PathComponentID } from "../../components/PathComponent.sol";
import { ItemComponent, ID as ItemComponentID } from "../../components/ItemComponent.sol";
import { LevelComponent, ID as BuildingComponentID } from "../../components/LevelComponent.sol";
import { PlayerProductionComponent, ID as PlayerProductionComponentID } from "../../components/PlayerProductionComponent.sol";
import { RequiredResourcesComponent, ID as RequiredResourcesComponentID } from "../../components/RequiredResourcesComponent.sol";
import { RequiredResearchComponent, ID as RequiredResearchComponentID } from "../../components/RequiredResearchComponent.sol";
import { MaxResourceStorageComponent, ID as MaxResourceStorageComponentID } from "../../components/MaxResourceStorageComponent.sol";
import { MaxStorageComponent, ID as MaxStorageComponentID } from "../../components/MaxStorageComponent.sol";
import "../../prototypes.sol";
import { LibTerrain } from "../../libraries/LibTerrain.sol";
import { LibEncode } from "../../libraries/LibEncode.sol";
import { Coord } from "../../types.sol";

contract ClaimSystemTest is PrimodiumTest {
  constructor() PrimodiumTest() {}

  function setUp() public override {
    super.setUp();
    vm.startPrank(deployer);
    vm.stopPrank();
  }

  function testClaimOnFactory() public {
    vm.startPrank(alice);

    BuildSystem buildSystem = BuildSystem(system(BuildSystemID));
    BuildPathSystem buildPathSystem = BuildPathSystem(system(BuildPathSystemID));
    ClaimFromMineSystem claimSystem = ClaimFromMineSystem(system(ClaimFromMineSystemID));
    ItemComponent itemComponent = ItemComponent(component(ItemComponentID));

    // TEMP: tile -5, 2 has iron according to current generation seed
    Coord memory coord = getIronCoord(alice);
    assertEq(LibTerrain.getTopLayerKey(coord), IronID, "Tile should have iron");

    Coord memory mainBaseCoord = getOrigin(alice);
    Coord memory platingFactoryCoord = getCoord1(alice);

    buildSystem.executeTyped(MainBaseID, mainBaseCoord);
    console.log("built main base");
    ComponentDevSystem componentDevSystem = ComponentDevSystem(system(ComponentDevSystemID));
    componentDevSystem.executeTyped(
      RequiredResourcesComponentID,
      LibEncode.hashKeyEntity(DebugIronMineID, 1),
      abi.encode()
    );

    componentDevSystem.executeTyped(
      RequiredResourcesComponentID,
      LibEncode.hashKeyEntity(DebugIronPlateFactoryID, 1),
      abi.encode()
    );
    buildSystem.executeTyped(DebugIronPlateFactoryID, platingFactoryCoord);
    // START CLAIMING
    vm.roll(0);

    buildSystem.executeTyped(DebugIronMineID, coord);
    console.log("built IronMineID");

    buildPathSystem.executeTyped(coord, platingFactoryCoord);
    console.log("built path from IronMine to PlatingFactory");

    buildPathSystem.executeTyped(platingFactoryCoord, mainBaseCoord);
    console.log("built path from PlatingFactory to MainBase");

    vm.roll(10);

    claimSystem.executeTyped(mainBaseCoord);
    console.log("claimed from main base");
    uint256 hashedAliceIronKey = LibEncode.hashKeyEntity(IronID, addressToEntity(alice));
    uint256 hashedAliceIronPlateKey = LibEncode.hashKeyEntity(IronPlateCraftedItemID, addressToEntity(alice));
    assertTrue(itemComponent.has(hashedAliceIronPlateKey), "Alice should have IronPlate");
    assertTrue(
      !itemComponent.has(hashedAliceIronKey) || itemComponent.getValue(hashedAliceIronKey) <= 0,
      "Alice should not have any Iron"
    );
    assertEq(itemComponent.getValue(hashedAliceIronPlateKey), 20, "Alice should have 20 IronPlates");

    vm.roll(20);
    claimSystem.executeTyped(mainBaseCoord);

    assertEq(itemComponent.getValue(hashedAliceIronPlateKey), 40, "Alice should have 40 IronPlates");
    assertTrue(
      !itemComponent.has(hashedAliceIronKey) || itemComponent.getValue(hashedAliceIronKey) <= 0,
      "Alice should not have any Iron"
    );
    vm.roll(30);
    claimSystem.executeTyped(mainBaseCoord);
    assertEq(itemComponent.getValue(hashedAliceIronPlateKey), 60, "Alice should have 30 IronPlates");
    assertTrue(
      !itemComponent.has(hashedAliceIronKey) || itemComponent.getValue(hashedAliceIronKey) <= 0,
      "Alice should not have any Iron"
    );

    vm.stopPrank();
  }

  function testClaimOnFactoryUpgrade() public {
    vm.startPrank(alice);

    BuildSystem buildSystem = BuildSystem(system(BuildSystemID));
    BuildPathSystem buildPathSystem = BuildPathSystem(system(BuildPathSystemID));
    ClaimFromMineSystem claimSystem = ClaimFromMineSystem(system(ClaimFromMineSystemID));
    ItemComponent itemComponent = ItemComponent(component(ItemComponentID));

    // TEMP: tile -5, 2 has iron according to current generation seed
    Coord memory coord = getIronCoord(alice);
    assertEq(LibTerrain.getTopLayerKey(coord), IronID, "Tile should have iron");

    Coord memory mainBaseCoord = getOrigin(alice);
    Coord memory platingFactoryCoord = getCoord1(alice);

    buildSystem.executeTyped(MainBaseID, mainBaseCoord);
    console.log("built main base");

    ComponentDevSystem componentDevSystem = ComponentDevSystem(system(ComponentDevSystemID));
    componentDevSystem.executeTyped(
      RequiredResourcesComponentID,
      LibEncode.hashKeyEntity(DebugIronPlateFactoryID, 1),
      abi.encode()
    );
    console.log("removed resource requirements");
    console.log(
      RequiredResourcesComponent(component(RequiredResourcesComponentID)).has(
        LibEncode.hashKeyEntity(DebugIronPlateFactoryID, 1)
      )
    );
    buildSystem.executeTyped(DebugIronPlateFactoryID, platingFactoryCoord);
    // START CLAIMING
    vm.roll(0);

    buildSystem.executeTyped(DebugIronMineID, coord);

    console.log("built IronMineID");

    buildPathSystem.executeTyped(coord, platingFactoryCoord);
    console.log("built path from IronMine to PlatingFactory");

    buildPathSystem.executeTyped(platingFactoryCoord, mainBaseCoord);
    console.log("built path from PlatingFactory to MainBase");
    console.log(
      "Iron PLate Production is %s",
      PlayerProductionComponent(component(PlayerProductionComponentID)).getValue(
        LibEncode.hashKeyEntity(IronPlateCraftedItemID, addressToEntity(alice))
      )
    );
    vm.roll(10);

    claimSystem.executeTyped(mainBaseCoord);
    console.log("claimed from main base");
    uint256 hashedAliceIronKey = LibEncode.hashKeyEntity(IronID, addressToEntity(alice));
    uint256 hashedAliceIronPlateKey = LibEncode.hashKeyEntity(IronPlateCraftedItemID, addressToEntity(alice));
    assertTrue(itemComponent.has(hashedAliceIronPlateKey), "Alice should have IronPlate");
    assertTrue(
      !itemComponent.has(hashedAliceIronKey) || itemComponent.getValue(hashedAliceIronKey) <= 0,
      "Alice should not have any Iron"
    );
    assertEq(itemComponent.getValue(hashedAliceIronPlateKey), 20, "Alice should have 20 IronPlates");
    vm.roll(20);
    UpgradeSystem upgradeSystem = UpgradeSystem(system(UpgradeSystemID));

    componentDevSystem.executeTyped(
      RequiredResourcesComponentID,
      LibEncode.hashKeyEntity(DebugIronPlateFactoryID, 2),
      abi.encode()
    );
    upgradeSystem.executeTyped(platingFactoryCoord);
    console.log("upgraded factory");
    assertEq(itemComponent.getValue(hashedAliceIronPlateKey), 40, "Alice should have 40 IronPlates");

    vm.roll(50);
    claimSystem.executeTyped(mainBaseCoord);
    claimSystem.executeTyped(mainBaseCoord);
    console.log("claimed after factory upgrade");
    assertEq(itemComponent.getValue(hashedAliceIronPlateKey), 40, "Alice should have 40 IronPlates");
    assertTrue(
      !itemComponent.has(hashedAliceIronKey) || itemComponent.getValue(hashedAliceIronKey) <= 0,
      "Alice should not have any Iron"
    );
    upgradeSystem.executeTyped(coord);
    console.log("upgraded mine");
    vm.roll(100);
    claimSystem.executeTyped(mainBaseCoord);
    console.log("claimed after upgraded mine");
    assertEq(itemComponent.getValue(hashedAliceIronPlateKey), 240, "Alice should have 240 IronPlates");
    assertTrue(
      !itemComponent.has(hashedAliceIronKey) || itemComponent.getValue(hashedAliceIronKey) <= 0,
      "Alice should not have any Iron"
    );

    vm.stopPrank();
  }

  function testClaimOnFactoryDestroyPathFromMineToFactory() public {
    vm.startPrank(alice);

    BuildSystem buildSystem = BuildSystem(system(BuildSystemID));
    BuildPathSystem buildPathSystem = BuildPathSystem(system(BuildPathSystemID));
    ClaimFromMineSystem claimSystem = ClaimFromMineSystem(system(ClaimFromMineSystemID));
    DestroyPathSystem destroyPathSystem = DestroyPathSystem(system(DestroyPathSystemID));

    ItemComponent itemComponent = ItemComponent(component(ItemComponentID));

    // TEMP: tile -5, 2 has iron according to current generation seed
    Coord memory coord = getIronCoord(alice);
    assertEq(LibTerrain.getTopLayerKey(coord), IronID, "Tile should have iron");

    Coord memory mainBaseCoord = getOrigin(alice);
    Coord memory platingFactoryCoord = getCoord1(alice);

    buildSystem.executeTyped(MainBaseID, mainBaseCoord);
    console.log("built main base");
    ComponentDevSystem componentDevSystem = ComponentDevSystem(system(ComponentDevSystemID));
    componentDevSystem.executeTyped(
      RequiredResourcesComponentID,
      LibEncode.hashKeyEntity(DebugIronPlateFactoryID, 1),
      abi.encode()
    );
    buildSystem.executeTyped(DebugIronPlateFactoryID, platingFactoryCoord);
    // START CLAIMING
    vm.roll(0);

    componentDevSystem.executeTyped(
      RequiredResourcesComponentID,
      LibEncode.hashKeyEntity(DebugIronMineID, 1),
      abi.encode()
    );
    buildSystem.executeTyped(DebugIronMineID, coord);
    console.log("built IronMineID");

    buildPathSystem.executeTyped(coord, platingFactoryCoord);
    console.log("built path from IronMine to PlatingFactory");

    buildPathSystem.executeTyped(platingFactoryCoord, mainBaseCoord);
    console.log("built path from PlatingFactory to MainBase");

    vm.roll(10);

    claimSystem.executeTyped(mainBaseCoord);
    console.log("claimed from main base");
    uint256 hashedAliceIronKey = LibEncode.hashKeyEntity(IronID, addressToEntity(alice));
    uint256 hashedAliceIronPlateKey = LibEncode.hashKeyEntity(IronPlateCraftedItemID, addressToEntity(alice));
    assertTrue(itemComponent.has(hashedAliceIronPlateKey), "Alice should have IronPlate");
    assertTrue(
      !itemComponent.has(hashedAliceIronKey) || itemComponent.getValue(hashedAliceIronKey) <= 0,
      "Alice should not have any Iron"
    );
    assertEq(itemComponent.getValue(hashedAliceIronPlateKey), 20, "Alice should have 20 IronPlates");

    vm.roll(20);
    destroyPathSystem.executeTyped(coord);

    vm.roll(100);
    claimSystem.executeTyped(mainBaseCoord);
    assertEq(itemComponent.getValue(hashedAliceIronPlateKey), 40, "Alice should have 40 IronPlates");
    assertTrue(
      !itemComponent.has(hashedAliceIronKey) || itemComponent.getValue(hashedAliceIronKey) <= 0,
      "Alice should not have any Iron"
    );

    vm.stopPrank();
  }

  function testClaimOnFactoryDestroyPathFromFactoryToMainBase() public {
    vm.startPrank(alice);

    BuildSystem buildSystem = BuildSystem(system(BuildSystemID));
    BuildPathSystem buildPathSystem = BuildPathSystem(system(BuildPathSystemID));
    ClaimFromMineSystem claimSystem = ClaimFromMineSystem(system(ClaimFromMineSystemID));
    DestroyPathSystem destroyPathSystem = DestroyPathSystem(system(DestroyPathSystemID));

    ItemComponent itemComponent = ItemComponent(component(ItemComponentID));

    // TEMP: tile -5, 2 has iron according to current generation seed
    Coord memory coord = getIronCoord(alice);
    assertEq(LibTerrain.getTopLayerKey(coord), IronID, "Tile should have iron");

    Coord memory mainBaseCoord = getOrigin(alice);
    Coord memory platingFactoryCoord = getCoord1(alice);

    buildSystem.executeTyped(MainBaseID, mainBaseCoord);
    console.log("built main base");
    ComponentDevSystem componentDevSystem = ComponentDevSystem(system(ComponentDevSystemID));
    componentDevSystem.executeTyped(
      RequiredResourcesComponentID,
      LibEncode.hashKeyEntity(DebugIronPlateFactoryID, 1),
      abi.encode()
    );

    buildSystem.executeTyped(DebugIronPlateFactoryID, platingFactoryCoord);
    // START CLAIMING
    vm.roll(0);

    componentDevSystem.executeTyped(
      RequiredResourcesComponentID,
      LibEncode.hashKeyEntity(DebugIronMineID, 1),
      abi.encode()
    );
    buildSystem.executeTyped(DebugIronMineID, coord);
    console.log("built IronMineID");

    buildPathSystem.executeTyped(coord, platingFactoryCoord);
    console.log("built path from IronMine to PlatingFactory");

    buildPathSystem.executeTyped(platingFactoryCoord, mainBaseCoord);
    console.log("built path from PlatingFactory to MainBase");

    vm.roll(10);

    claimSystem.executeTyped(mainBaseCoord);
    console.log("claimed from main base");
    uint256 hashedAliceIronKey = LibEncode.hashKeyEntity(IronID, addressToEntity(alice));
    uint256 hashedAliceIronPlateKey = LibEncode.hashKeyEntity(IronPlateCraftedItemID, addressToEntity(alice));
    assertTrue(itemComponent.has(hashedAliceIronPlateKey), "Alice should have IronPlate");
    assertTrue(
      !itemComponent.has(hashedAliceIronKey) || itemComponent.getValue(hashedAliceIronKey) <= 0,
      "Alice should not have any Iron"
    );
    assertEq(itemComponent.getValue(hashedAliceIronPlateKey), 20, "Alice should have 20 IronPlates");

    vm.roll(20);
    destroyPathSystem.executeTyped(platingFactoryCoord);

    vm.roll(100);
    claimSystem.executeTyped(mainBaseCoord);
    assertEq(itemComponent.getValue(hashedAliceIronPlateKey), 40, "Alice should have 40 IronPlates");
    assertTrue(
      !itemComponent.has(hashedAliceIronKey) || itemComponent.getValue(hashedAliceIronKey) <= 0,
      "Alice should not have any Iron"
    );

    vm.stopPrank();
  }

  function testClaimOnBuildPath() public {
    vm.startPrank(alice);

    BuildSystem buildSystem = BuildSystem(system(BuildSystemID));
    BuildPathSystem buildPathSystem = BuildPathSystem(system(BuildPathSystemID));
    ClaimFromMineSystem claimSystem = ClaimFromMineSystem(system(ClaimFromMineSystemID));
    ItemComponent itemComponent = ItemComponent(component(ItemComponentID));

    // TEMP: tile -5, 2 has iron according to current generation seed
    Coord memory coord = getIronCoord(alice);
    assertEq(LibTerrain.getTopLayerKey(coord), IronID, "Tile should have iron");

    Coord memory mainBaseCoord = getOrigin(alice);

    buildSystem.executeTyped(MainBaseID, mainBaseCoord);
    console.log("built main base");
    // START CLAIMING
    vm.roll(0);

    buildSystem.executeTyped(DebugIronMineID, coord);
    console.log("built IronMineID");
    buildPathSystem.executeTyped(coord, mainBaseCoord);
    console.log("built path from IronMine to main base");
    PlayerProductionComponent playerProductionComponent = PlayerProductionComponent(
      component(PlayerProductionComponentID)
    );
    uint256 hashedAliceKey = LibEncode.hashKeyEntity(IronID, addressToEntity(alice));
    assertEq(playerProductionComponent.getValue(hashedAliceKey), 1, "Alice should have production 1 iron");
    vm.roll(10);
    MaxResourceStorageComponent maxResourceStorageComponent = MaxResourceStorageComponent(
      component(MaxResourceStorageComponentID)
    );
    assertTrue(maxResourceStorageComponent.has(addressToEntity(alice)), "Alice should have max resource storage");
    MaxStorageComponent maxStorageComponent = MaxStorageComponent(component(MaxStorageComponentID));
    assertTrue(maxStorageComponent.has(hashedAliceKey), "Alice should have Iron max storage");
    claimSystem.executeTyped(mainBaseCoord);
    console.log("claimed from main base");

    assertTrue(itemComponent.has(hashedAliceKey), "Alice should have iron");
    assertEq(itemComponent.getValue(hashedAliceKey), 10, "Alice should have 10 iron");

    vm.roll(20);
    claimSystem.executeTyped(mainBaseCoord);
    assertEq(itemComponent.getValue(hashedAliceKey), 20, "Alice should have 20 iron");

    vm.roll(30);
    claimSystem.executeTyped(mainBaseCoord);
    assertEq(itemComponent.getValue(hashedAliceKey), 30, "Alice should have 30 iron");

    vm.stopPrank();
  }

  function testClaimOnDestroyPath() public {
    vm.startPrank(alice);

    BuildSystem buildSystem = BuildSystem(system(BuildSystemID));
    BuildPathSystem buildPathSystem = BuildPathSystem(system(BuildPathSystemID));
    DestroyPathSystem destroyPathSystem = DestroyPathSystem(system(DestroyPathSystemID));
    ClaimFromMineSystem claimSystem = ClaimFromMineSystem(system(ClaimFromMineSystemID));
    ItemComponent itemComponent = ItemComponent(component(ItemComponentID));

    // TEMP: tile -5, 2 has iron according to current generation seed
    Coord memory coord = getIronCoord(alice);
    assertEq(LibTerrain.getTopLayerKey(coord), IronID, "Tile should have iron");

    Coord memory mainBaseCoord = getOrigin(alice);

    buildSystem.executeTyped(MainBaseID, mainBaseCoord);
    console.log("built main base");
    // START CLAIMING
    vm.roll(0);

    buildSystem.executeTyped(DebugIronMineID, coord);
    console.log("built IronMineID");
    buildPathSystem.executeTyped(coord, mainBaseCoord);
    console.log("built path from IronMine to main base");
    vm.roll(10);

    claimSystem.executeTyped(mainBaseCoord);
    console.log("claimed from main base");
    uint256 hashedAliceKey = LibEncode.hashKeyEntity(IronID, addressToEntity(alice));
    assertTrue(itemComponent.has(hashedAliceKey), "Alice should have iron");
    assertEq(itemComponent.getValue(hashedAliceKey), 10, "Alice should have 10 iron");

    destroyPathSystem.executeTyped(coord);

    vm.roll(20);
    claimSystem.executeTyped(mainBaseCoord);
    assertEq(itemComponent.getValue(hashedAliceKey), 10, "Alice should have 10 iron");
    buildPathSystem.executeTyped(coord, mainBaseCoord);
    vm.roll(30);
    claimSystem.executeTyped(mainBaseCoord);
    assertEq(itemComponent.getValue(hashedAliceKey), 20, "Alice should have 20 iron");

    vm.stopPrank();
  }

  function testClaimOnUpgrade() public {
    vm.startPrank(alice);

    LevelComponent levelComponent = LevelComponent(component(BuildingComponentID));

    BuildSystem buildSystem = BuildSystem(system(BuildSystemID));
    BuildPathSystem buildPathSystem = BuildPathSystem(system(BuildPathSystemID));
    UpgradeSystem upgradeSystem = UpgradeSystem(system(UpgradeSystemID));
    ClaimFromMineSystem claimSystem = ClaimFromMineSystem(system(ClaimFromMineSystemID));
    ItemComponent itemComponent = ItemComponent(component(ItemComponentID));

    // TEMP: tile -5, 2 has iron according to current generation seed
    Coord memory coord = getIronCoord(alice);
    assertEq(LibTerrain.getTopLayerKey(coord), IronID, "Tile should have iron");

    Coord memory mainBaseCoord = getOrigin(alice);

    buildSystem.executeTyped(MainBaseID, mainBaseCoord);
    console.log("built main base");
    // START CLAIMING
    vm.roll(0);

    buildSystem.executeTyped(DebugIronMineID, coord);
    console.log("built IronMineID");
    buildPathSystem.executeTyped(coord, mainBaseCoord);
    console.log("built path from IronMine to main base");
    vm.roll(10);

    claimSystem.executeTyped(mainBaseCoord);
    console.log("claimed from main base");
    uint256 hashedAliceKey = LibEncode.hashKeyEntity(IronID, addressToEntity(alice));
    assertTrue(itemComponent.has(hashedAliceKey), "Alice should have iron");
    assertEq(itemComponent.getValue(hashedAliceKey), 10, "Alice should have 10 iron");

    upgradeSystem.executeTyped(coord);

    assertEq(levelComponent.getValue(LibEncode.encodeCoordEntity(coord, BuildingKey)), 2, "IronMine should be level 2");
    vm.roll(20);

    claimSystem.executeTyped(mainBaseCoord);
    assertEq(itemComponent.getValue(hashedAliceKey), 30, "Alice should have 30 iron");
    upgradeSystem.executeTyped(coord);
    assertEq(levelComponent.getValue(LibEncode.encodeCoordEntity(coord, BuildingKey)), 3, "IronMine should be level 3");

    vm.roll(30);

    claimSystem.executeTyped(mainBaseCoord);
    assertEq(itemComponent.getValue(hashedAliceKey), 60, "Alice should have 60 iron");

    vm.stopPrank();
  }

  // claim two resources
  function testClaimTwoResources() public {
    vm.startPrank(alice);

    BuildSystem buildSystem = BuildSystem(system(BuildSystemID));
    BuildPathSystem buildPathSystem = BuildPathSystem(system(BuildPathSystemID));
    ClaimFromMineSystem claimSystem = ClaimFromMineSystem(system(ClaimFromMineSystemID));

    // Resource and crafted components
    ItemComponent itemComponent = ItemComponent(component(ItemComponentID));

    // TEMP: current generation seed
    Coord memory IronCoord = getIronCoord(alice);
    Coord memory CopperCoord = getCopperCoord(alice);
    assertEq(LibTerrain.getTopLayerKey(IronCoord), IronID, "Tile should have iron");
    assertEq(LibTerrain.getTopLayerKey(CopperCoord), CopperID, "Tile should have copper");

    Coord memory mainBaseCoord = getCoord2(alice);
    buildSystem.executeTyped(MainBaseID, mainBaseCoord);

    ComponentDevSystem componentDevSystem = ComponentDevSystem(system(ComponentDevSystemID));
    componentDevSystem.executeTyped(
      RequiredResourcesComponentID,
      LibEncode.hashKeyEntity(DebugIronMineID, 1),
      abi.encode()
    );
    componentDevSystem.executeTyped(
      RequiredResourcesComponentID,
      LibEncode.hashKeyEntity(DebugCopperMineID, 1),
      abi.encode()
    );

    //gain capacity for all resources so can store copper
    buildSystem.executeTyped(DebugIronMineID, IronCoord);

    buildSystem.executeTyped(DebugCopperMineID, CopperCoord);

    vm.roll(0);
    // Iron to main base
    buildPathSystem.executeTyped(IronCoord, mainBaseCoord);
    // Copper to main base
    buildPathSystem.executeTyped(CopperCoord, mainBaseCoord);
    // START CLAIMING

    vm.roll(20);

    claimSystem.executeTyped(mainBaseCoord);
    uint256 hashedAliceIronKey = LibEncode.hashKeyEntity(IronID, addressToEntity(alice));
    uint256 hashedAliceCopperKey = LibEncode.hashKeyEntity(CopperID, addressToEntity(alice));
    assertTrue(itemComponent.has(hashedAliceIronKey), "Alice should have iron");
    assertTrue(itemComponent.has(hashedAliceCopperKey), "Alice should have copper");
    assertEq(itemComponent.getValue(hashedAliceCopperKey), 60, "Alice should have 60 copper");
    assertEq(itemComponent.getValue(hashedAliceIronKey), 20, "Alice should have 20 iron");

    vm.stopPrank();
  }
}
