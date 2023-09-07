import {
  Component,
  Entity,
  Layers,
  Metadata,
  Schema,
  Type,
  World,
  hasComponent,
  setComponent,
} from "@latticexyz/recs";
import { flatten, truncate } from "lodash";
import { useEffect, useState } from "react";
import { ComponentEditor } from "./ComponentEditor";
import {
  Collapse,
  ComponentBrowserButton,
  EntityEditorContainer,
} from "./StyledComponents";
import { SetContractComponentFunction } from "./types";

function replaceLotsOf0sWithEllipses(str: string) {
  return str.replace(/0{10,}/g, "...");
}

export const EntityEditor = ({
  entityId,
  layers,
  setContractComponentValue,
  devHighlightComponent,
  world,
  clearDevHighlights,
}: {
  entityId: Entity;
  layers: Layers;
  setContractComponentValue?: SetContractComponentFunction<Schema>;
  devHighlightComponent: Component<{ value: Type.OptionalNumber }>;
  world: World;
  clearDevHighlights: () => void;
}) => {
  const [opened, setOpened] = useState(false);

  const [entityComponents, setEntityComponents] = useState<
    Component<Schema, Metadata, unknown>[]
  >([]);
  useEffect(() => {
    if (opened) {
      const allComponents = flatten(
        Object.values(layers).map((layer) => Object.values(layer.components))
      );
      const components = allComponents.filter((c) => hasComponent(c, entityId));
      setEntityComponents(components);
    }
  }, [opened, world, entityId, setEntityComponents]);

  return (
    <EntityEditorContainer
      onMouseEnter={() => {
        clearDevHighlights();
        setComponent(devHighlightComponent, entityId, {
          value: undefined,
        });
      }}
      onMouseLeave={() => clearDevHighlights()}
    >
      <div onClick={() => setOpened(!opened)} style={{ cursor: "pointer" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ color: "white" }}>
            Entity {truncate(replaceLotsOf0sWithEllipses(entityId))}
          </h3>
          <ComponentBrowserButton
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(entityId);
            }}
          >
            Click to copy Entity ID
          </ComponentBrowserButton>
        </div>
        <ComponentBrowserButton onClick={() => setOpened(!opened)}>
          {opened ? <>&#9660;</> : <>&#9654;</>}
        </ComponentBrowserButton>
      </div>
      <Collapse aria-hidden={opened ? "false" : "true"} opened={String(opened)}>
        {[...entityComponents.values()]
          .filter((c) => c.id !== devHighlightComponent.id)
          .map((c) => (
            <ComponentEditor
              key={`component-editor-${entityId}-${c.id}`}
              entity={entityId}
              component={c}
              layers={layers}
              setContractComponentValue={setContractComponentValue}
            />
          ))}
      </Collapse>
    </EntityEditorContainer>
  );
};
