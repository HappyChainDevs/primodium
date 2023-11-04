import { Entity } from "@latticexyz/recs";
import { FaInfoCircle } from "react-icons/fa";
import { Badge } from "src/components/core/Badge";
import { SecondaryCard } from "src/components/core/Card";
import { Navigator } from "src/components/core/Navigator";
import { ResourceIconTooltip } from "src/components/shared/ResourceIconTooltip";
import { useRockDefense } from "src/hooks/useRockDefense";
import { components } from "src/network/components";
import { EntityType, ResourceImage } from "src/util/constants";
import { Hex } from "viem";

export const Header: React.FC<{ entity: Entity; name: string; imageUri: string }> = ({ entity, name, imageUri }) => {
  const defense = useRockDefense(entity);
  const playerEntity = components.OwnedBy.useWithKeys({ entity: entity as Hex })?.value;
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
                  playerEntity={playerEntity as Entity}
                  amount={defense.points}
                  resource={EntityType.Defense}
                  scale={1n}
                  image={ResourceImage.get(EntityType.Defense) ?? ""}
                  validate={false}
                  fontSize={"sm"}
                />
              </Badge>
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
