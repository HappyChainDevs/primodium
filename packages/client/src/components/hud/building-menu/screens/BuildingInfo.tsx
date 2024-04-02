import { Entity } from "@latticexyz/recs";
import { Badge } from "src/components/core/Badge";
import { SecondaryCard } from "src/components/core/Card";
import { Navigator } from "src/components/core/Navigator";
import { ResourceIconTooltip } from "src/components/shared/ResourceIconTooltip";
import { useBuildingInfo } from "src/hooks/useBuildingInfo";
import { getEntityTypeName } from "src/util/common";
import { RESOURCE_SCALE, ResourceImage } from "src/util/constants";

const DataLabel: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => {
  return (
    <SecondaryCard className="text-xs gap-2 w-full">
      <p className="text-xs opacity-75 mb-1 uppercase">{label}</p>
      <div className="flex flex-wrap gap-1">{children}</div>
    </SecondaryCard>
  );
};

export const BuildingInfo: React.FC<{ building: Entity }> = ({ building }) => {
  const buildingInfo = useBuildingInfo(building);
  if (!buildingInfo) return null;
  const {
    buildingType,
    level,
    maxLevel,
    position,
    production,
    upgrade,
    requiredDependencies,
    unitProductionMultiplier,
    storages,
  } = buildingInfo;

  return (
    <Navigator.Screen title="BuildingInfo" className="w-full gap-1">
      <DataLabel label="building type">
        <b>{getEntityTypeName(buildingType as Entity)}</b>
      </DataLabel>
      <div className="grid grid-cols-3 w-full gap-1">
        <DataLabel label="level">
          <b>{level.toString()}</b>
        </DataLabel>
        <DataLabel label="max level">
          <b>{maxLevel.toString()}</b>
        </DataLabel>
        <DataLabel label="coord">
          <b>
            [{position.x}, {position.y}]
          </b>
        </DataLabel>
      </div>
      {(production.length !== 0 || upgrade?.production.length !== 0) && (
        <div className="grid grid-cols-2 w-full gap-1">
          <DataLabel label="PRODUCTION">
            {!production.length ? (
              <b>N/A</b>
            ) : (
              production.map(({ resource, amount, type }) => (
                <Badge className="text-xs gap-2" key={`production-${resource}`}>
                  <ResourceIconTooltip
                    name={getEntityTypeName(resource)}
                    image={ResourceImage.get(resource) ?? ""}
                    resource={resource}
                    amount={amount}
                    resourceType={type}
                    fractionDigits={3}
                  />
                </Badge>
              ))
            )}
          </DataLabel>
          <DataLabel label="next level production">
            {!upgrade?.production.length || level === maxLevel ? (
              <b>N/A</b>
            ) : (
              upgrade?.production.map(({ resource, amount, type }) => (
                <Badge className="text-xs gap-2" key={`next-production-${resource}`}>
                  <ResourceIconTooltip
                    name={getEntityTypeName(resource)}
                    image={ResourceImage.get(resource) ?? ""}
                    resource={resource}
                    amount={amount}
                    resourceType={type}
                    fractionDigits={3}
                  />
                </Badge>
              ))
            )}
          </DataLabel>
        </div>
      )}
      {(requiredDependencies.length !== 0 || (!!upgrade && upgrade.requiredDependencies.length !== 0)) && (
        <div className="grid grid-cols-2 w-full gap-1 ">
          <DataLabel label="resource usage">
            {!requiredDependencies.length ? (
              <b>N/A</b>
            ) : (
              requiredDependencies.map(({ resource, amount, type }) => (
                <Badge className="text-xs gap-2" key={`production-${resource}`}>
                  <ResourceIconTooltip
                    name={getEntityTypeName(resource)}
                    image={ResourceImage.get(resource) ?? ""}
                    resource={resource}
                    amount={amount}
                    resourceType={type}
                    fractionDigits={3}
                  />
                </Badge>
              ))
            )}
          </DataLabel>
          <DataLabel label="next level resource Usage">
            {!upgrade?.requiredDependencies.length || level === maxLevel ? (
              <b>N/A</b>
            ) : (
              upgrade?.requiredDependencies.map(({ resource, amount, type }) => (
                <Badge className="text-xs gap-2" key={`next-production-${resource}`}>
                  <ResourceIconTooltip
                    fractionDigits={3}
                    name={getEntityTypeName(resource)}
                    image={ResourceImage.get(resource) ?? ""}
                    resource={resource}
                    amount={amount}
                    resourceType={type}
                  />
                </Badge>
              ))
            )}
          </DataLabel>
        </div>
      )}
      {unitProductionMultiplier !== undefined && (
        <div className="grid grid-cols-2 w-full gap-1 ">
          <DataLabel label="unit prod speed">
            <b>x{(unitProductionMultiplier / RESOURCE_SCALE).toString()}</b>
          </DataLabel>
          <DataLabel label="next level unit prod speed">
            {!upgrade?.nextLevelUnitProductionMultiplier || level === maxLevel ? (
              <b>N/A</b>
            ) : (
              <b>x{(Number(upgrade?.nextLevelUnitProductionMultiplier) / Number(RESOURCE_SCALE)).toString()}</b>
            )}
          </DataLabel>
        </div>
      )}
      {storages && storages.length !== 0 && (
        <div className="grid grid-cols-1 w-full gap-1">
          <DataLabel label="storage">
            {storages.map((storage) => {
              return (
                <Badge key={storage.resource} className="text-xs gap-2">
                  <ResourceIconTooltip
                    fractionDigits={3}
                    name={getEntityTypeName(storage.resource)}
                    image={ResourceImage.get(storage.resource) ?? ""}
                    resource={storage.resource}
                    amount={storage.amount}
                    resourceType={storage.resourceType}
                    direction="top"
                    short
                  />
                </Badge>
              );
            })}
          </DataLabel>
          <DataLabel label="next level storage">
            {!upgrade?.storages || upgrade?.storages.length === 0 ? (
              <b>N/A</b>
            ) : (
              upgrade?.storages.map((storage) => {
                return (
                  <Badge key={storage.resource} className="text-xs gap-2">
                    <ResourceIconTooltip
                      fractionDigits={3}
                      name={getEntityTypeName(storage.resource)}
                      image={ResourceImage.get(storage.resource) ?? ""}
                      resource={storage.resource}
                      amount={storage.amount}
                      resourceType={storage.resourceType}
                      direction="top"
                      short
                    />
                  </Badge>
                );
              })
            )}
          </DataLabel>
        </div>
      )}
      <Navigator.BackButton />
    </Navigator.Screen>
  );
};
