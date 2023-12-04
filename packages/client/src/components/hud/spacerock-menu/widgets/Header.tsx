import { primodium } from "@game/api";
import { Scenes } from "@game/constants";
import { Entity } from "@latticexyz/recs";
import { ERock } from "contracts/config/enums";
import { FaEye, FaInfoCircle } from "react-icons/fa";
import { Badge } from "src/components/core/Badge";
import { Button } from "src/components/core/Button";
import { SecondaryCard } from "src/components/core/Card";
import { Navigator } from "src/components/core/Navigator";
import { ResourceIconTooltip } from "src/components/shared/ResourceIconTooltip";
import { useRockDefense } from "src/hooks/useRockDefense";
import { components } from "src/network/components";
import { EntityType, ResourceImage } from "src/util/constants";
import { Hex } from "viem";

export const Header: React.FC<{ spaceRock: Entity; name: string; imageUri: string }> = ({
  spaceRock,
  name,
  imageUri,
}) => {
  const defense = useRockDefense(spaceRock);
  console.log("spaceRock", spaceRock);
  const playerEntity = components.OwnedBy.useWithKeys({ entity: spaceRock as Hex })?.value;
  const { transitionToScene } = primodium.api().scene;

  return (
    <SecondaryCard className="w-full">
      <div className="flex items-center gap-4">
        <img src={imageUri} className={`pixel-images rounded-box bg-gray-900 p-2 border border-secondary`} />

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Badge className=" text-md py-4 rounded-box font-bold">{name}</Badge>
            {defense.points !== 0n && !!playerEntity && (
              <Badge className="py-4 bg-transparent border-secondary">
                <ResourceIconTooltip
                  direction="bottom"
                  short={true}
                  name={"Defense"}
                  spaceRock={spaceRock}
                  amount={defense.points}
                  resource={EntityType.Defense}
                  image={ResourceImage.get(EntityType.Defense) ?? ""}
                  validate={false}
                  fontSize={"sm"}
                  fractionDigits={1}
                />
              </Badge>
            )}
            {components.RockType.get(spaceRock)?.value === ERock.Asteroid && (
              <Button
                className="btn-sm"
                tooltip="spectate"
                onClick={async () => {
                  components.SpectateAccount.set({ value: playerEntity as Entity });
                  await transitionToScene(Scenes.Starmap, Scenes.Asteroid, 0);
                  components.MapOpen.set({ value: false });
                }}
              >
                <FaEye />
              </Button>
            )}
          </div>
          <Navigator.NavButton to="SpaceRockInfo" className="btn-xs btn-ghost flex gap-2 w-fit opacity-75">
            <FaInfoCircle /> view more info
          </Navigator.NavButton>
        </div>
      </div>
    </SecondaryCard>
  );
};
