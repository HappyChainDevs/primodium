pragma solidity >=0.8.0;
import "forge-std/console.sol";

import { Deploy } from "../Deploy.sol";
import { MudTest } from "std-contracts/test/MudTest.t.sol";

import { addressToEntity, entityToAddress } from "solecs/utils.sol";
import { Coord } from "std-contracts/components/CoordComponent.sol";
import { BuildSystem, ID as BuildSystemID } from "../../systems/BuildSystem.sol";
import { BuildPathSystem, ID as BuildPathSystemID } from "../../systems/BuildPathSystem.sol";
import { DestroyPathSystem, ID as DestroyPathSystemID } from "../../systems/DestroyPathSystem.sol";
import { ClaimFromMineSystem, ID as ClaimFromMineSystemID } from "../../systems/ClaimFromMineSystem.sol";
import { UpgradeSystem, ID as UpgradeSystemID } from "../../systems/UpgradeSystem.sol";
import { DestroySystem, ID as DestroySystemID } from "../../systems/DestroySystem.sol";
import { DebugRemoveBuildingRequirementsSystem, ID as DebugRemoveBuildingRequirementsSystemID } from "../../systems/DebugRemoveBuildingRequirementsSystem.sol";
import { DebugRemoveUpgradeRequirementsSystem, ID as DebugRemoveUpgradeRequirementsSystemID } from "../../systems/DebugRemoveUpgradeRequirementsSystem.sol";
import { DebugAquireStorageForAllResourcesSystem, ID as DebugAquireStorageForAllResourcesSystemID } from "../../systems/DebugAquireStorageForAllResourcesSystem.sol";
import { PathComponent, ID as PathComponentID } from "../../components/PathComponent.sol";
import { ItemComponent, ID as ItemComponentID } from "../../components/ItemComponent.sol";
import { BuildingComponent, ID as BuildingComponentID } from "../../components/BuildingComponent.sol";
import { MineComponent, ID as MineComponentID } from "../../components/MineComponent.sol";
import { StorageCapacityComponent, ID as StorageCapacityComponentID } from "../../components/StorageCapacityComponent.sol";
// import { MainBaseID, DebugNodeID, RegolithID, IronID, LithiumMinerID } from "../../prototypes/Tiles.sol";

import { MainBaseID } from "../../prototypes/Tiles.sol";
import { DebugCopperMineID, DebugIronMineID, DebugIronPlateFactoryID, DebugStorageBuildingID } from "../../libraries/LibDebugInitializer.sol";
import { WaterID, RegolithID, SandstoneID, AlluviumID, BiofilmID, BedrockID, AirID, CopperID, LithiumID, IronID, TitaniumID, IridiumID, OsmiumID, TungstenID, KimberliteID, UraniniteID, BolutiteID } from "../../prototypes/Tiles.sol";
import { IronPlateCraftedItemID } from "../../prototypes/Keys.sol";
import { BuildingKey } from "../../prototypes/Keys.sol";
import { LibTerrain } from "../../libraries/LibTerrain.sol";
import { LibEncode } from "../../libraries/LibEncode.sol";
import { LibStorage } from "../../libraries/LibStorage.sol";
import { Coord } from "../../types.sol";

contract Storage is MudTest {
  constructor() MudTest(new Deploy()) {}

  function setUp() public override {
    super.setUp();
    vm.startPrank(deployer);
    vm.stopPrank();
  }

  function testStorage() public {
    vm.startPrank(alice);

    BuildSystem buildSystem = BuildSystem(system(BuildSystemID));
    BuildPathSystem buildPathSystem = BuildPathSystem(system(BuildPathSystemID));
    ClaimFromMineSystem claimSystem = ClaimFromMineSystem(system(ClaimFromMineSystemID));
    ItemComponent itemComponent = ItemComponent(component(ItemComponentID));
    StorageCapacityComponent storageComponent = StorageCapacityComponent(component(StorageCapacityComponentID));
    // TEMP: tile -5, 2 has iron according to current generation seed
    Coord memory coord = Coord({ x: -5, y: 2 });
    assertEq(LibTerrain.getTopLayerKey(coord), IronID, "Tile should have iron");

    Coord memory mainBaseCoord = Coord({ x: 0, y: 0 });

    buildSystem.executeTyped(MainBaseID, mainBaseCoord);
    console.log("built main base");
    // START CLAIMING
    vm.roll(0);

    buildSystem.executeTyped(DebugIronMineID, coord);
    console.log("built IronMineID");
    buildPathSystem.executeTyped(coord, mainBaseCoord);
    console.log("built path from IronMine to main base");

    uint256 ironCapacity = LibStorage.getAvailableSpaceInStorageForResource(
      storageComponent,
      itemComponent,
      addressToEntity(alice),
      IronID
    );
    console.log("alice has ironCapacity of %s", ironCapacity);

    vm.roll(ironCapacity);
    claimSystem.executeTyped(coord);
    uint256 hashedAliceKey = LibEncode.hashKeyEntity(IronID, addressToEntity(alice));
    assertTrue(itemComponent.has(hashedAliceKey), "Alice should have iron");
    assertEq(itemComponent.getValue(hashedAliceKey), ironCapacity, "Alice should have max storage capacity iron");

    vm.roll(10);
    claimSystem.executeTyped(mainBaseCoord);
    console.log("claimed from main base after capacity full");
    assertEq(itemComponent.getValue(hashedAliceKey), ironCapacity, "Alice should have max storage capacity iron");

    vm.roll(20);
    claimSystem.executeTyped(mainBaseCoord);
    console.log("claimed from main base after capacity full");
    assertEq(itemComponent.getValue(hashedAliceKey), ironCapacity, "Alice should have max storage capacity iron");

    vm.roll(30);
    claimSystem.executeTyped(mainBaseCoord);
    console.log("claimed from main base after capacity full");
    assertEq(itemComponent.getValue(hashedAliceKey), ironCapacity, "Alice should have max storage capacity iron");

    vm.stopPrank();
  }

  function testStorageAfterUpgrade() public {
    vm.startPrank(alice);

    BuildSystem buildSystem = BuildSystem(system(BuildSystemID));
    BuildPathSystem buildPathSystem = BuildPathSystem(system(BuildPathSystemID));
    ClaimFromMineSystem claimSystem = ClaimFromMineSystem(system(ClaimFromMineSystemID));
    ItemComponent itemComponent = ItemComponent(component(ItemComponentID));
    StorageCapacityComponent storageComponent = StorageCapacityComponent(component(StorageCapacityComponentID));
    // TEMP: tile -5, 2 has iron according to current generation seed
    Coord memory coord = Coord({ x: -5, y: 2 });
    assertEq(LibTerrain.getTopLayerKey(coord), IronID, "Tile should have iron");

    Coord memory mainBaseCoord = Coord({ x: 0, y: 0 });

    buildSystem.executeTyped(MainBaseID, mainBaseCoord);
    console.log("built main base");
    uint256 ironCapacity = LibStorage.getEntityStorageCapacityForResource(
      storageComponent,
      addressToEntity(alice),
      IronID
    );
    console.log("alice has ironCapacity of %s", ironCapacity);
    // START CLAIMING
    uint256 currBlockNum = 0;
    vm.roll(0);

    buildSystem.executeTyped(DebugIronMineID, coord);
    console.log("built IronMineID");
    buildPathSystem.executeTyped(coord, mainBaseCoord);
    console.log("built path from IronMine to main base");

    console.log("alice has ironCapacity of %s", ironCapacity);

    currBlockNum += ironCapacity;
    vm.roll(currBlockNum);

    claimSystem.executeTyped(coord);
    uint256 hashedAliceKey = LibEncode.hashKeyEntity(IronID, addressToEntity(alice));
    assertTrue(itemComponent.has(hashedAliceKey), "Alice should have iron");
    assertEq(itemComponent.getValue(hashedAliceKey), ironCapacity, "Alice should have max storage capacity iron");

    currBlockNum += 10;
    vm.roll(currBlockNum);

    claimSystem.executeTyped(mainBaseCoord);
    console.log("claimed from main base after capacity full %s", itemComponent.getValue(hashedAliceKey));
    assertEq(itemComponent.getValue(hashedAliceKey), ironCapacity, "Alice should have max storage capacity iron");

    UpgradeSystem upgradeSystem = UpgradeSystem(system(UpgradeSystemID));
    DebugRemoveUpgradeRequirementsSystem removeUpgradeRequirementsSystem = DebugRemoveUpgradeRequirementsSystem(
      system(DebugRemoveUpgradeRequirementsSystemID)
    );
    removeUpgradeRequirementsSystem.executeTyped(MainBaseID);
    upgradeSystem.executeTyped(mainBaseCoord);
    uint256 newIronCapacity = LibStorage.getEntityStorageCapacityForResource(
      storageComponent,
      addressToEntity(alice),
      IronID
    );
    console.log("alice has newIronCapacity of %s", newIronCapacity);
    currBlockNum += 10;
    vm.roll(currBlockNum);

    claimSystem.executeTyped(mainBaseCoord);
    console.log("claimed from main base before new capacity full %s", itemComponent.getValue(hashedAliceKey));
    assertEq(
      itemComponent.getValue(hashedAliceKey),
      ironCapacity + 10,
      "Alice should have 10 more then its last capacity"
    );

    assertTrue(newIronCapacity > ironCapacity, "new capacity should be greater then old capacity");
    currBlockNum += newIronCapacity;
    currBlockNum -= ironCapacity;
    currBlockNum -= 20;
    vm.roll(currBlockNum);

    claimSystem.executeTyped(mainBaseCoord);
    console.log("claimed from main base before new capacity full %s", itemComponent.getValue(hashedAliceKey));
    assertEq(
      itemComponent.getValue(hashedAliceKey),
      newIronCapacity - 10,
      "Alice should have 10 less then max storage capacity iron"
    );

    currBlockNum += 10;
    vm.roll(currBlockNum);

    claimSystem.executeTyped(mainBaseCoord);
    console.log("claimed from main base after new capacity full %s", itemComponent.getValue(hashedAliceKey));
    assertEq(itemComponent.getValue(hashedAliceKey), newIronCapacity, "Alice should have max storage capacity iron");

    currBlockNum += 10;
    vm.roll(currBlockNum);
    claimSystem.executeTyped(mainBaseCoord);
    console.log("claimed from main base after new capacity full %s", itemComponent.getValue(hashedAliceKey));
    assertEq(itemComponent.getValue(hashedAliceKey), newIronCapacity, "Alice should have max storage capacity iron");

    vm.stopPrank();
  }

  function testStorageAfterDestroy() public {
    vm.startPrank(alice);

    BuildSystem buildSystem = BuildSystem(system(BuildSystemID));
    BuildPathSystem buildPathSystem = BuildPathSystem(system(BuildPathSystemID));
    ClaimFromMineSystem claimSystem = ClaimFromMineSystem(system(ClaimFromMineSystemID));
    ItemComponent itemComponent = ItemComponent(component(ItemComponentID));
    StorageCapacityComponent storageComponent = StorageCapacityComponent(component(StorageCapacityComponentID));
    // TEMP: tile -5, 2 has iron according to current generation seed
    Coord memory coord = Coord({ x: -5, y: 2 });
    assertEq(LibTerrain.getTopLayerKey(coord), IronID, "Tile should have iron");

    Coord memory mainBaseCoord = Coord({ x: 0, y: 0 });

    buildSystem.executeTyped(MainBaseID, mainBaseCoord);
    console.log("built main base");
    uint256 ironCapacity = LibStorage.getEntityStorageCapacityForResource(
      storageComponent,
      addressToEntity(alice),
      IronID
    );
    console.log("alice has ironCapacity of %s", ironCapacity);
    // START CLAIMING
    uint256 currBlockNum = 0;
    vm.roll(0);

    buildSystem.executeTyped(DebugIronMineID, coord);
    console.log("built IronMineID");
    buildPathSystem.executeTyped(coord, mainBaseCoord);
    console.log("built path from IronMine to main base");

    console.log("alice has ironCapacity of %s", ironCapacity);

    currBlockNum += ironCapacity;
    vm.roll(currBlockNum);

    claimSystem.executeTyped(coord);
    uint256 hashedAliceKey = LibEncode.hashKeyEntity(IronID, addressToEntity(alice));
    assertTrue(itemComponent.has(hashedAliceKey), "Alice should have iron");
    assertEq(itemComponent.getValue(hashedAliceKey), ironCapacity, "Alice should have max storage capacity iron");

    Coord memory storageBuildingCoord = Coord({ x: 1, y: 1 });
    buildSystem.executeTyped(DebugStorageBuildingID, storageBuildingCoord);
    uint256 newIronCapacity = LibStorage.getEntityStorageCapacityForResource(
      storageComponent,
      addressToEntity(alice),
      IronID
    );
    console.log("after building storage building alice has newIronCapacity of %s", newIronCapacity);
    assertTrue(newIronCapacity > ironCapacity, "new capacity should be greater then old capacity");
    currBlockNum += newIronCapacity;
    currBlockNum -= ironCapacity;
    vm.roll(currBlockNum);

    claimSystem.executeTyped(mainBaseCoord);
    console.log("claimed from main base after new capacity full %s", itemComponent.getValue(hashedAliceKey));
    assertEq(
      itemComponent.getValue(hashedAliceKey),
      newIronCapacity,
      "Alice should have 10 less then max storage capacity iron"
    );

    DestroySystem destroySystem = DestroySystem(system(DestroySystemID));
    destroySystem.executeTyped(storageBuildingCoord);
    console.log("destroyed storage building");
    uint256 afterDestroyIronCapacity = LibStorage.getEntityStorageCapacityForResource(
      storageComponent,
      addressToEntity(alice),
      IronID
    );

    console.log("after destroying storage building alice has Iron capacity of %s", afterDestroyIronCapacity);
    console.log(
      "after destroying storage building alice has Iron amount of  %s",
      itemComponent.getValue(hashedAliceKey)
    );
    assertTrue(afterDestroyIronCapacity < newIronCapacity, "after destroy capacity should be less then before");
    assertEq(
      itemComponent.getValue(hashedAliceKey),
      afterDestroyIronCapacity,
      "Alice should have lost excess iron from storage decrease"
    );
    vm.stopPrank();
  }
}
