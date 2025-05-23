// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

import { ExpansionPrototypeId, BuildingPrototypeId, UnitPrototypeId, ObjectivesPrototypeId, FleetStancePrototypeId } from "codegen/Prototypes.sol";

bytes32 constant BuildingTileKey = bytes32("building:tile");
bytes32 constant AllianceKey = bytes32("alliance");
bytes32 constant FleetKey = bytes32("fleet");
bytes32 constant FleetOwnedByKey = bytes32("fleet.key");
bytes32 constant FleetIncomingKey = bytes32("fleet.incoming");
bytes32 constant FleetOutgoingKey = bytes32("fleet.outgoing");

bytes32 constant AsteroidOwnedByKey = bytes32("asteroid.key");

bytes32 constant FleetStanceKey = FleetStancePrototypeId;
bytes32 constant ExpansionKey = ExpansionPrototypeId;
bytes32 constant BuildingKey = BuildingPrototypeId;
bytes32 constant UnitKey = UnitPrototypeId;
bytes32 constant ObjectiveKey = ObjectivesPrototypeId;
