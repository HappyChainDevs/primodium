import { useEffect, useMemo, useState } from "react";
import { useMud } from "./useMud";
import { LinkedAddressResult, getLinkedAddress } from "src/util/web2/getLinkedAddress";
import { components } from "src/network/components";
import { getAllianceName } from "src/util/alliance";
import { Entity } from "@latticexyz/recs";
import { entityToAddress } from "src/util/common";

export function useAccount(player?: Entity) {
  const { network } = useMud();
  const playerEntity = player ?? network.playerEntity;
  const [linkedAddress, setLinkedAddress] = useState<LinkedAddressResult>();
  const [loading, setLoading] = useState(true);
  const wETHBalance = components.WETHBalance.use(playerEntity)?.value ?? 0n;
  const alliance = components.PlayerAlliance.use(playerEntity)?.alliance;
  const allianceName = getAllianceName((alliance ?? "") as Entity);

  const address = useMemo(() => {
    if (!linkedAddress) return "...";
    return linkedAddress.ensName ?? entityToAddress(linkedAddress.address ?? playerEntity, true);
  }, [linkedAddress, playerEntity]);

  useEffect(() => {
    const getAddressObj = async () => {
      const addressObj = await getLinkedAddress(entityToAddress(playerEntity));
      setLinkedAddress(addressObj);
      setLoading(false);
    };
    getAddressObj();
  }, []);

  return {
    linkedAddress,
    wETHBalance,
    allianceName,
    address,
    loading,
  };
}
