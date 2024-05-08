import { tileCoordToPixelCoord } from "@latticexyz/phaserx";
import { useMemo } from "react";
import { Widget } from "@/components/core/Widget";
import { useGame } from "@/hooks/useGame";
import { components } from "@/network/components";
import { GlassCard } from "@/components/core/Card";
import { InterfaceIcons } from "@primodiumxyz/assets";

import { AsteroidMenu } from "@/components/hud/starbelt/asteroid-menu/AsteroidMenu";
import { entityToRockName } from "@/util/name";
import { Mode } from "@/util/constants";

export const AsteroidMenuPopup = () => {
  const game = useGame();
  const selectedAsteroid = components.SelectedRock.use()?.value;
  const position = components.Position.use(selectedAsteroid);
  const mapOpen = components.SelectedMode.use()?.value === Mode.Starmap;

  const coord = useMemo(() => {
    const { config } = game.STARMAP;

    if (!position) return { x: 0, y: 0 };

    const pixelCoord = tileCoordToPixelCoord(position, config.tilemap.tileWidth, config.tilemap.tileHeight);

    return { x: pixelCoord.x, y: -pixelCoord.y };
  }, [game, position]);

  if (!selectedAsteroid || !mapOpen) return null;

  return (
    <Widget
      title={`${entityToRockName(selectedAsteroid)}`}
      id="asteroid-target"
      scene={"STARMAP"}
      defaultCoord={coord}
      defaultPinned
      draggable
      defaultVisible
      origin="top-left"
      minOpacity={1}
      topBar
      popUp
      noBorder
      icon={InterfaceIcons.Crosshairs}
    >
      <GlassCard direction={"bottom"}>
        <AsteroidMenu selectedRock={selectedAsteroid} />
      </GlassCard>
    </Widget>
  );
};
