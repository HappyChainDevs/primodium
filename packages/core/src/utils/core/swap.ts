import { Entity } from "@primodiumxyz/reactive-tables";
import { ResourceEnumLookup } from "@/lib";
import { Tables } from "@/lib/types";

export function createSwapUtils(tables: Tables) {
  /**
   * (Market) Gets the amount of out resource given an amount of in resource
   *
   * @param inAmount Unscaled amount of in resource
   * @param path Array of entities representing the path of the swap
   * @returns
   */
  function getOutAmount(inAmount: bigint, path: Entity[]): bigint {
    return getPathResult(inAmount, path);
  }

  /**
   * (Market) Gets the amount of in resource given an amount of out resource
   *
   * @param inAmount Unscaled amount of in resource
   * @param path Array of entities representing the path of the swap
   * @returns
   */
  function getInAmount(outAmount: bigint, path: Entity[]): bigint {
    return getPathResult(outAmount, path.reverse(), true);
  }

  function getPathResult(inAmount: bigint, path: Entity[], backwards = false) {
    if (path.length < 2 || inAmount == 0n) return 0n;
    let amountReceived = inAmount;
    for (let i = 0; i < path.length - 1; i++) {
      amountReceived = _swap(path[i], path[i + 1], amountReceived, backwards);
    }
    return amountReceived;
  }

  function _swap(resourceIn: Entity, resourceOut: Entity, amountIn: bigint, backwards = false) {
    const [resourceA, resourceB] = getResourcePair(resourceIn, resourceOut);
    const reserves = tables.Reserves.getWithKeys({
      resourceA: ResourceEnumLookup[resourceA],
      resourceB: ResourceEnumLookup[resourceB],
    });
    if (!reserves?.amountA || !reserves?.amountB) return 0n;

    const [reserveIn, reserveOut] =
      resourceA === resourceIn ? [reserves.amountA, reserves.amountB] : [reserves.amountB, reserves.amountA];
    const amountOut = getOutAmountTrade(amountIn, reserveIn, reserveOut, backwards);
    return amountOut;
  }

  // Assuming P_MarketplaceConfig.getSlippageThousandths() is a function that returns a BigNumber
  function getOutAmountTrade(amountIn: bigint, reserveIn: bigint, reserveOut: bigint, backwards = false): bigint {
    const fee = tables.P_MarketplaceConfig.get()?.feeThousandths ?? 0n;
    const amountInWithFee = amountIn * (1000n - (backwards ? -fee : fee));
    const numerator = amountInWithFee * reserveOut;
    const denominator = reserveIn * 1000n + amountInWithFee;

    return numerator / denominator;
  }

  function getResourcePair(entityA: Entity, entityB: Entity) {
    const resourceA = ResourceEnumLookup[entityA];
    const resourceB = ResourceEnumLookup[entityB];
    return resourceA < resourceB ? [entityA, entityB] : [entityB, entityA];
  }

  return {
    getOutAmount,
    getInAmount,
  };
}
