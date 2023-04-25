import { Component, EntityID, EntityIndex, Type } from "@latticexyz/recs";
import useResourceCount from "../../hooks/useResourceCount";
import { BackgroundImage } from "../../util/constants";

export default function ResourceLabel({
  entityIndex,
  name,
  resourceId,
  resourceComponent,
}: {
  icon?: any;
  entityIndex?: EntityIndex;
  name: string;
  resourceId: EntityID;
  resourceComponent: Component<
    { value: Type.Number },
    { contractId: string },
    undefined
  >;
}) {
  const resourceCount = useResourceCount(resourceComponent, entityIndex);
  const resourceIcon = BackgroundImage.get(resourceId);

  if (resourceCount > 0) {
    return (
      <div className="flex mb-1">
        <p className="w-24">{resourceCount}</p>
        <img className="w-4 h-4 my-auto" src={resourceIcon}></img>
        <p className=" ml-2 my-auto">{name}</p>
      </div>
    );
  } else {
    return <></>;
  }
}
