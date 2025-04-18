import { encodeKey } from "@latticexyz/protocol-parser/internal";
import { Hex } from "viem";

import { ExecuteFunctions } from "@primodiumxyz/core";
import { ContractTable, ContractTableDef, Entity, Properties } from "@primodiumxyz/reactive-tables";
import {
  encodeField,
  entityToHexKeyTuple,
  SchemaToPrimitives,
  StaticAbiType,
  uuid,
} from "@primodiumxyz/reactive-tables/utils";

export function createDevCalls({ execute }: ExecuteFunctions) {
  async function removeTable<tableDef extends ContractTableDef = ContractTableDef>(
    table: ContractTable<tableDef>,
    entity: Entity,
  ) {
    const tableId = table.id as Hex;
    const key = entityToHexKeyTuple(entity);

    await execute({
      functionName: "Pri_11__devDeleteRecord",
      args: [tableId, key],
      withSession: true,
      txQueueOptions: {
        id: entity,
      },
    });
  }

  async function setTableValue<tableDef extends ContractTableDef = ContractTableDef>(
    table: ContractTable<tableDef>,
    keys: SchemaToPrimitives<ContractTable<tableDef>["metadata"]["abiKeySchema"]>,
    newValues: Partial<Properties<ContractTable<tableDef>["propertiesSchema"]>>,
  ) {
    const tableId = table.id as Hex;
    const schema = Object.keys(table.metadata.abiPropertiesSchema);
    const key = encodeKey(table.metadata.abiKeySchema, keys);

    return Object.entries(newValues).forEach(async ([name, value]) => {
      const type = table.metadata.abiPropertiesSchema[name] as StaticAbiType;
      const data = encodeField(type, value);
      const schemaIndex = schema.indexOf(name);
      await execute({
        functionName: "Pri_11__devSetField",
        args: [tableId, key, schemaIndex, data],
        withSession: true,
        txQueueOptions: {
          id: uuid(),
          force: true,
        },
      });
    });
  }

  return {
    removeTable,
    setTableValue,
  };
}
