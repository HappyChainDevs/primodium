// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { PrimodiumSystem } from "systems/internal/PrimodiumSystem.sol";
import { IWorld } from "solecs/System.sol";
import { addressToEntity, getAddressById } from "solecs/utils.sol";

import { PositionComponent, ID as PositionComponentID } from "components/PositionComponent.sol";
import { ReversePositionComponent, ID as ReversePositionComponentID } from "components/ReversePositionComponent.sol";
import { AsteroidTypeComponent, ID as AsteroidTypeComponentID } from "components/AsteroidTypeComponent.sol";
import { ArrivalsSizeComponent, ID as ArrivalsSizeComponentID } from "components/ArrivalsSizeComponent.sol";
import { ItemComponent, ID as ItemComponentID } from "components/ItemComponent.sol";
import { MaxMovesComponent, ID as MaxMovesComponentID } from "components/MaxMovesComponent.sol";
import { OwnedByComponent, ID as OwnedByComponentID } from "components/OwnedByComponent.sol";
import { GameConfigComponent, ID as GameConfigComponentID, SingletonID } from "components/GameConfigComponent.sol";
import { UnitsComponent, ID as UnitsComponentID } from "components/UnitsComponent.sol";
import { PirateComponent, ID as PirateComponentID } from "components/PirateComponent.sol";
import { IOnEntitySubsystem } from "../interfaces/IOnEntitySubsystem.sol";
import { ID as S_UpdatePlayerSpaceRockSystem } from "./S_UpdatePlayerSpaceRockSystem.sol";
import { LibSend } from "libraries/LibSend.sol";
import { LibMath } from "libraries/LibMath.sol";
import { LibEncode } from "libraries/LibEncode.sol";
import { LibMotherlode } from "libraries/LibMotherlode.sol";
import { LibPirateAsteroid } from "libraries/LibPirateAsteroid.sol";

import { ESendType, ESpaceRockType, Coord, Arrival, ArrivalUnit } from "src/types.sol";

uint256 constant ID = uint256(keccak256("system.SendUnits"));

// resolves stack too deep error
struct SendArgs {
  ArrivalUnit[] arrivalUnits;
  ESendType sendType;
  Coord originPosition;
  Coord destinationPosition;
  uint256 to;
}

contract SendUnitsSystem is PrimodiumSystem {
  constructor(IWorld _world, address _components) PrimodiumSystem(_world, _components) {}

  function execute(bytes memory args) public override returns (bytes memory) {
    SendArgs memory sendArgs = abi.decode(args, (SendArgs));

    PirateComponent pirateComponent = PirateComponent(getC(PirateComponentID));
    ReversePositionComponent reversePositionComponent = ReversePositionComponent(getC(ReversePositionComponentID));
    uint256 destination = reversePositionComponent.getValue(LibEncode.encodeCoord(sendArgs.destinationPosition));
    if (pirateComponent.has(sendArgs.to)) {
      require(
        OwnedByComponent(getC(OwnedByComponentID)).getValue(destination) ==
          LibPirateAsteroid.getPersonalPirate(addressToEntity(msg.sender)),
        "you cannot send units to a non personal pirate"
      );
    }

    uint256 origin = reversePositionComponent.getValue(LibEncode.encodeCoord(sendArgs.originPosition));
    IOnEntitySubsystem(getAddressById(world.systems(), S_UpdatePlayerSpaceRockSystem)).executeTyped(msg.sender, origin);

    if (!reversePositionComponent.has(LibEncode.encodeCoord(sendArgs.destinationPosition))) {
      LibMotherlode.createMotherlode(world, sendArgs.destinationPosition);
    }

    uint256 playerEntity = addressToEntity(msg.sender);
    checkMovementRules(origin, destination, playerEntity, sendArgs.to, sendArgs.sendType);

    bool anyUnitsSent = false;
    for (uint256 i = 0; i < sendArgs.arrivalUnits.length; i++) {
      if (sendArgs.arrivalUnits[i].count == 0) continue;
      LibMath.subtract(
        UnitsComponent(getC(UnitsComponentID)),
        LibEncode.hashEntities(uint256(sendArgs.arrivalUnits[i].unitType), playerEntity, origin),
        sendArgs.arrivalUnits[i].count
      );
      anyUnitsSent = true;
    }
    uint256 arrivalBlock = LibSend.getArrivalBlock(
      world,
      sendArgs.originPosition,
      sendArgs.destinationPosition,
      playerEntity,
      sendArgs.arrivalUnits
    );

    Arrival memory arrival = Arrival({
      units: sendArgs.arrivalUnits,
      sendType: sendArgs.sendType,
      arrivalBlock: arrivalBlock,
      from: playerEntity,
      to: sendArgs.to,
      origin: origin,
      destination: destination
    });

    LibSend.sendUnits(world, arrival);
    return abi.encode(arrival);
  }

  function checkMovementRules(
    uint256 origin,
    uint256 destination,
    uint256 playerEntity,
    uint256 to,
    ESendType sendType
  ) internal view {
    OwnedByComponent ownedByComponent = OwnedByComponent(getC(OwnedByComponentID));
    AsteroidTypeComponent asteroidTypeComponent = AsteroidTypeComponent(getC(AsteroidTypeComponentID));
    /*
    Space rock movement rules:
      1. You can only move from an asteroid if it is yours. 
      2. You can only move from a motherlode to your asteroid. 
      3. You cannot move between motherlodes.
      4. You can only invade an enemy.
      5. You can only reinforce yourself on a motherlode.
      6. You must be under the max move count.
    */
    require(
      asteroidTypeComponent.has(origin) && asteroidTypeComponent.has(destination),
      "[SendUnitsSystem] Must travel between asteroids or motherlodes"
    );
    ESpaceRockType originType = ESpaceRockType(asteroidTypeComponent.getValue(origin));
    ESpaceRockType destinationType = ESpaceRockType(asteroidTypeComponent.getValue(destination));
    if (sendType == ESendType.REINFORCE || sendType == ESendType.RAID)
      require(
        ownedByComponent.has(destination),
        "[SendUnitsSystem] Reinforce and raid destinations must be a owned by player."
      );

    uint256 moveCount = LibMath.getSafe(ArrivalsSizeComponent(getC(ArrivalsSizeComponentID)), playerEntity);
    uint32 maxMoveCount = LibMath.getSafe(MaxMovesComponent(getC(MaxMovesComponentID)), playerEntity);

    require(
      moveCount < maxMoveCount,
      "[SendUnitsSystem] You have reached your max move count. Build or upgrade your starmapper to make more moves."
    );

    require(origin != destination, "[SendUnitsSystem] Origin and destination cannot be the same.");

    if (originType == ESpaceRockType.ASTEROID) {
      require(
        ownedByComponent.getValue(origin) == playerEntity,
        "[SendUnitsSystem] You can only move from an asteroid you own."
      );
    }

    if (destinationType == ESpaceRockType.MOTHERLODE) {
      require(originType != ESpaceRockType.MOTHERLODE, "[SendUnitsSystem] You cannot move between motherlodes.");
    }

    if (sendType == ESendType.INVADE) {
      require(playerEntity != to, "you cannot invade yourself");
      require(destinationType == ESpaceRockType.MOTHERLODE, "you can only invade a motherlode");
    } else if (sendType == ESendType.RAID) {
      require(playerEntity != to, "you cannot raid yourself");
      require(destinationType == ESpaceRockType.ASTEROID, "you can only raid a motherlode");
    } else if (sendType == ESendType.REINFORCE) {
      require(ownedByComponent.getValue(destination) == to, "you can only reinforce the current owner of a motherlode");
    }
  }

  function executeTyped(
    ArrivalUnit[] calldata arrivalUnits,
    ESendType sendType,
    Coord memory origin,
    Coord memory destination,
    uint256 to
  ) public returns (bytes memory) {
    return execute(abi.encode(SendArgs(arrivalUnits, sendType, origin, destination, to)));
  }
}
