import { Entity } from "@latticexyz/recs";
import { useMemo } from "react";
import { Button } from "src/components/core/Button";
import { SecondaryCard } from "src/components/core/Card";
import { IconLabel } from "src/components/core/IconLabel";
import { Navigator } from "src/components/core/Navigator";
import { useMud } from "src/hooks";
import { useBuildingInfo } from "src/hooks/useBuildingInfo";
import { useBuildingName } from "src/hooks/useBuildingName";
import { components } from "src/network/components";
import { demolishBuilding } from "src/network/setup/contractCalls/demolishBuilding";
import { getBlockTypeName } from "src/util/common";
import { ResourceImage, ResourceType } from "src/util/constants";
import { getFullResourceCount } from "src/util/resource";

export const Demolish: React.FC<{ building: Entity }> = ({ building }) => {
  const mud = useMud();

  const name = useBuildingName(building);
  const {
    production,
    position: { parentEntity },
  } = useBuildingInfo(building);

  if (!parentEntity) throw new Error("[Demolish] Building has no parentEntity");
  const blockingResource = production.find((production) => {
    if (production.type !== ResourceType.Utility) return false;
    const { resourceCount } = getFullResourceCount(production.resource, parentEntity as Entity);
    return resourceCount < production.amount;
  });

  const Content = useMemo(
    () => () =>
      !blockingResource ? (
        <p>
          Are you sure you want to demolish <br />
          <b>{name}</b>?
        </p>
      ) : (
        <div>
          You cannot demolish this building. <br />
          <IconLabel
            text=""
            hideText
            imageUri={ResourceImage.get(blockingResource.resource) ?? ""}
            tooltipDirection={"left"}
            tooltipText={getBlockTypeName(blockingResource.resource)}
            className="mx-2 w-5"
          />
          will drop below zero.
        </div>
      ),
    [name, blockingResource]
  );
  return (
    <Navigator.Screen title="Demolish">
      <SecondaryCard className="space-y-3 items-center text-center w-full pt-6">
        <Content />

        <div className="flex gap-2">
          <Button
            disabled={!!blockingResource}
            className="btn-error btn-sm"
            onClick={() => {
              demolishBuilding(mud, building);
              components.SelectedBuilding.remove();
            }}
          >
            Demolish
          </Button>
          <Navigator.BackButton className="btn-sm border-secondary" />
        </div>
      </SecondaryCard>
    </Navigator.Screen>
  );
};
