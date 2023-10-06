import { useEffect, useState } from "react";
import { BlockNumber } from "src/network/components/clientComponents";
import { getRecipe, hasEnoughResources } from "src/util/resource";

export const useHasEnoughResources = (recipe: ReturnType<typeof getRecipe>, count = 1) => {
  const [enoughResources, setEnoughResources] = useState(false);
  const { value: blockNumber } = BlockNumber.use(undefined, {
    value: 0,
    avgBlockTime: 1,
  });

  useEffect(() => {
    setEnoughResources(hasEnoughResources(recipe, count));
  }, [blockNumber, recipe, count]);

  return enoughResources;
};
