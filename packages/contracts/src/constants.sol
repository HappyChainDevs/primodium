// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

// Terrain
enum Biome {
  Mountains,
  Desert,
  Forest,
  Savanna
}

uint256 constant GodID = 0x60D;

int32 constant STRUCTURE_CHUNK = 5;
int32 constant STRUCTURE_CHUNK_CENTER = STRUCTURE_CHUNK / 2 + 1;

int32 constant CHUNK = 16;
