import { Scenes } from "@game/constants";
import { useEntityQuery } from "@latticexyz/react";
import { Entity, Has, HasValue } from "@latticexyz/recs";
import { Button } from "src/components/core/Button";
import { SecondaryCard } from "src/components/core/Card";
import { Widget } from "src/components/core/Widget";
import { ResourceIconTooltip } from "src/components/shared/ResourceIconTooltip";
import { useMud } from "src/hooks";
import { usePrimodium } from "src/hooks/usePrimodium";
import { components } from "src/network/components";
import { getSpaceRockInfo, getSpaceRockName } from "src/util/asteroid";
import { getBlockTypeName } from "src/util/common";
import { EntityType, ResourceImage } from "src/util/constants";
import { entityToRockName } from "src/util/name";

export const LabeledValue: React.FC<{
  label: string;
  children?: React.ReactNode;
}> = ({ children = null, label }) => {
  return (
    <div className="flex flex-col gap-1 w-fit">
      <p className="text-xs font-bold text-accent">{label}</p>
      <div className="flex items-center gap-1">{children}</div>
    </div>
  );
};

const Asteroid: React.FC<{ asteroid: Entity }> = ({ asteroid }) => {
  const {
    components,
    playerAccount: { entity: playerEntity },
  } = useMud();
  const primodium = usePrimodium();
  const { position, imageUri, encryption } = getSpaceRockInfo(primodium, asteroid);
  const description = getSpaceRockName(asteroid);
  const home = components.Home.use(playerEntity)?.value === asteroid;
  const active = components.ActiveRock.use()?.value === asteroid;
  const selected = components.SelectedRock.use()?.value === asteroid;

  return (
    <Button
      className={`row-span-1 flex flex-col p-2 items-center text-xs bg-base-100 flex-nowrap border-secondary ${
        selected ? "drop-shadow-hard ring-2 ring-warning" : ""
      }`}
      onClick={async () => {
        const mapOpen = components.MapOpen.get(undefined, {
          value: false,
        }).value;

        if (!mapOpen) {
          const { transitionToScene } = primodium.api().scene;

          await transitionToScene(Scenes.Asteroid, Scenes.Starmap);
          components.MapOpen.set({ value: true });
        }

        const { pan, zoomTo } = primodium.api(Scenes.Starmap).camera;

        components.SelectedRock.set({ value: asteroid });

        pan({
          x: position.x,
          y: position.y,
        });

        zoomTo(2);
      }}
    >
      <div className="flex flex-col items-center gap-1">
        <img src={imageUri} className=" w-12 h-12 p-2 bg-neutral border border-secondary" />
        <div className="flex flex-col h-fit text-xs gap-1">
          <div className="flex gap-1 items-center justify-center"></div>
          <p className="font-bold -mt-3 bg-secondary">{entityToRockName(asteroid)}</p>
          <p className="w-26 text-center wrap font-thin">{description}</p>
        </div>
      </div>
      <hr className="w-full border border-secondary/25" />
      {home && <div className="absolute top-0 left-0 px-1 bg-info text-[.6rem]">home</div>}
      {active && <div className="absolute top-0 right-0 px-1 bg-neutral text-[.6rem]">active</div>}
      <ResourceIconTooltip
        resource={EntityType.Encryption}
        amount={encryption}
        spaceRock={asteroid}
        image={ResourceImage.get(EntityType.Encryption) ?? ""}
        name={getBlockTypeName(EntityType.Encryption)}
      />
    </Button>
  );
};

export const _OwnedAsteroids: React.FC = () => {
  const {
    playerAccount: { entity: playerEntity },
  } = useMud();

  const query = [HasValue(components.OwnedBy, { value: playerEntity }), Has(components.Asteroid)];
  const asteroids = useEntityQuery(query);

  return (
    <div className="p-2 max-h-96 overflow-y-auto scrollbar">
      {asteroids.length === 0 && (
        <SecondaryCard className="w-full h-full flex text-xs items-center justify-center font-bold">
          <p className="opacity-50 uppercase">you control no asteroids</p>
        </SecondaryCard>
      )}
      <div className="grid grid-cols-2 gap-1">
        {asteroids.map((entity) => {
          return <Asteroid key={entity} asteroid={entity} />;
        })}
      </div>
    </div>
  );
};

export const OwnedAsteroids = () => {
  const { components } = useMud();
  const mapOpen = components.MapOpen.use()?.value;

  if (!mapOpen) return null;

  return (
    <Widget
      id="owned_asteroids"
      title="Owned Asteroids"
      defaultLocked
      draggable
      persist
      scene={Scenes.Asteroid}
      defaultCoord={{ x: 0, y: 0 }}
    >
      <_OwnedAsteroids />
    </Widget>
  );
};
