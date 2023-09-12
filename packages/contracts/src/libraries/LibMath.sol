// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { PositionData } from "codegen/Tables.sol";
import { Trigonometry as Trig } from "trig/src/Trigonometry.sol";
import { ABDKMath64x64 as Math } from "abdk/ABDKMath64x64.sol";

library LibMath {
  /// @notice Calculates the absolute value of an int32 input
  /// @dev Returns the non-negative integer counterpart of the input
  /// @param input The integer whose absolute value is to be calculated
  /// @return int32 The absolute value of the input integer
  function abs(int32 input) internal pure returns (int32) {
    return input < 0 ? -input : input;
  }

  /// @notice Finds the minimum value between two uint32 numbers
  /// @dev Compares num1 and num2 and returns the smaller number
  /// @param num1 The first number to be compared
  /// @param num2 The second number to be compared
  /// @return uint32 The smaller of num1 and num2
  function min(uint32 num1, uint32 num2) internal pure returns (uint32) {
    return num1 < num2 ? num1 : num2;
  }

  /// @notice Finds the maximum value between two uint32 numbers
  /// @dev Compares num1 and num2 and returns the larger number
  /// @param num1 The first number to be compared
  /// @param num2 The second number to be compared
  /// @return uint32 The larger of num1 and num2
  function max(uint32 num1, uint32 num2) internal pure returns (uint32) {
    return num1 > num2 ? num1 : num2;
  }

  /// @notice Calculates position based on distance and direction
  /// @dev Converts angle to radians and calculates x, y coords
  /// @param _distance Distance to asteroid
  /// @param direction Direction angle in degrees
  /// @return position Calculated position
  function getPositionByVector(uint32 _distance, uint32 direction)
    internal
    pure
    returns (PositionData memory)
  {
    direction = direction % 360;
    bool flip = direction >= 180;
    direction = direction % 180;
    uint256 angleDegsTimes10000 = direction * 1745;

    uint256 angleRads = angleDegsTimes10000 * 1e13 + Trig.TWO_PI;

    int256 newX = Trig.cos(angleRads) * int32(_distance);
    int256 newY = Trig.sin(angleRads) * int32(_distance);
    int32 x = int32((newX / 1e18));
    int32 y = int32((newY / 1e18));
    return PositionData({ x: flip ? -x : x, y: flip ? -y : y, parent: 0 });
  }

  /// @notice Calculates distance for asteroid based on asteroid count
  /// @dev Uses the formula 260 * ln((asteroidCount + 105) / 10) - 580
  /// @param asteroidCount Number of asteroids
  /// @return uint32 Calculated distance
  function getDistance(uint32 asteroidCount) internal pure returns (uint32) {
    int128 value = Math.add(Math.fromUInt(asteroidCount), Math.fromUInt(105));
    value = Math.div(value, Math.fromUInt(10));
    value = Math.ln(value);
    uint256 integer = Math.mulu(value, 260);
    return uint32(integer - 580);
  }

  /// @notice Determines asteroid's direction based on asteroid count
  /// @dev Uses the asteroid count to find direction angle
  /// @param asteroidCount Number of asteroids
  /// @return uint32 Calculated direction
  function getDirection(uint32 asteroidCount) internal pure returns (uint32) {
    uint32 countMod27 = asteroidCount % 27;
    uint32 countMod3 = asteroidCount % 3;
    uint32 generalDirection = asteroidCount % 4;
    return generalDirection * 90 + countMod3 * 30 + countMod27;
  }
}
