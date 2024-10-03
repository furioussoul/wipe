import { useAtomValue } from "jotai";
import { presentBlocksAtom } from "../atoms/blocks";
import { ChaiBlock } from "../types/ChaiBlock";

/**
 * useTreeData hook
 */
export const useAllBlocks = (): ChaiBlock[] => {
  console.warn("useAllBlocks is deprecated, use useBlocksStore() instead");
  return useAtomValue(presentBlocksAtom);
};
