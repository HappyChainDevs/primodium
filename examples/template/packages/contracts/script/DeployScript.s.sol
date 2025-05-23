// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { Script } from "forge-std/Script.sol";
import { console2 } from "forge-std/Test.sol";

import { WorldRegistrationSystem } from "@latticexyz/world/src/modules/init/implementations/WorldRegistrationSystem.sol";
import { System } from "@latticexyz/world/src/System.sol";
import { ResourceId } from "@latticexyz/store/src/ResourceId.sol";
import { WorldResourceIdLib } from "@latticexyz/world/src/WorldResourceId.sol";
import { RESOURCE_SYSTEM } from "@latticexyz/world/src/worldResourceTypes.sol";
import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";

import { YourSystem } from "../src/systems/YourSystem.sol";

contract DeployYourSystem is Script {
  // the environment variables are pulled from your .env
  address worldAddress = vm.envAddress("WORLD_ADDRESS");
  uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY_ALICE");
  address playerAddress = vm.envAddress("ADDRESS_PLAYER");

  // predefine the namespace and system
  bytes14 namespace = bytes14("YourNamespace");
  bytes16 system = bytes16("YourSystem");

  // calling a script executes the run() function
  function run() external {
    StoreSwitch.setStoreAddress(worldAddress);

    // cache an instance of the WorldRegistrationSystem for the world
    WorldRegistrationSystem world = WorldRegistrationSystem(worldAddress);

    // derive the namespaceResource and systemResource from the namespace and system
    ResourceId namespaceResource = WorldResourceIdLib.encodeNamespace(bytes14(namespace));
    ResourceId systemResource = WorldResourceIdLib.encode(RESOURCE_SYSTEM, namespace, system);
    console2.log("World Address: %x", worldAddress);
    console2.log("Namespace ID: %x", uint256(ResourceId.unwrap(namespaceResource)));
    console2.log("System ID:    %x", uint256(ResourceId.unwrap(systemResource)));
    console2.log("Alice private key: %x", deployerPrivateKey);

    // writing to the chain requires us to be someone with funds to pay for gas
    // in testing, we prank(). to write to the live chain, we broadcast()
    vm.startBroadcast(deployerPrivateKey);

    // register the namespace
    world.registerNamespace(namespaceResource);

    // create the system
    YourSystem yourSystem = new YourSystem();
    console2.log("YourSystem address: ", address(yourSystem));

    // register the system
    world.registerSystem(systemResource, yourSystem, true);

    // register all functions in the system
    world.registerFunctionSelector(systemResource, "YourFunction()");
    console2.log(
      "Alice successfully registered the YourNamespace namespace, YourSystem contract, YourFunction function selector, to the Primodium world address."
    );

    // stop interacting with the chain
    vm.stopBroadcast();
  }
}
