import { useCallback } from "react";
import { has, noop } from "lodash-es";
import { useAddBlock } from "./useAddBlock";
import { useBuilderProp } from "./useBuilderProp";

type DroppedBlock = {
  block: any;
  relativeIndex: number;
  dropTargetId: string | number;
};

export const useAddBlockByDrop = () => {
  const { addCoreBlock } = useAddBlock();
  const getExternalPredefinedBlock = useBuilderProp("getExternalPredefinedBlock", noop);
  return useCallback(
    async (options: DroppedBlock) => {
      const { block: droppedBlock, dropTargetId, relativeIndex } = options;
      if (has(droppedBlock, "format")) {
        const uiBlocks = await getExternalPredefinedBlock(droppedBlock);
        return addCoreBlock({ blocks: uiBlocks }, dropTargetId === 0 ? null : dropTargetId, relativeIndex);
      }
      return addCoreBlock(droppedBlock, dropTargetId === 0 ? null : dropTargetId, relativeIndex);
    },
    [addCoreBlock],
  );
};
