import { cloneDeep, filter, find, flattenDeep, set } from "lodash-es";
import { useBuilderProp } from "./useBuilderProp.ts";
import { useCallback, useState } from "react";
import { useBlocksStore } from "../history/useBlocksStoreUndoableActions.ts";
import { ChaiBlock } from "../types/ChaiBlock.ts";
import { useStreamMultipleBlocksProps, useUpdateMultipleBlocksProps } from "./useUpdateBlocksProps.ts";
import { atom, useAtom } from "jotai";

function getChildBlocks(allBlocks: ChaiBlock[], blockId: string, blocks: any[]) {
  blocks.push(find(allBlocks, { _id: blockId }) as ChaiBlock);
  const children = filter(allBlocks, { _parent: blockId });
  for (const child of children) {
    blocks.push(...getBlockWithChildren(child._id, allBlocks));
  }
  return blocks;
}

const getBlockWithChildren = (blockId: string, allBlocks: ChaiBlock[]) => {
  let blocks = [];
  blocks = flattenDeep([...blocks, ...getChildBlocks(allBlocks, blockId, blocks)]);
  return blocks;
};

export const askAiProcessingAtom = atom(false);

export const useAskAi = () => {
  const [processing, setProcessing] = useAtom(askAiProcessingAtom);
  const [error, setError] = useState(null);
  const callBack = useBuilderProp("askAiCallBack", null);
  const updateBlocksWithStream = useStreamMultipleBlocksProps();
  const updateBlockPropsAll = useUpdateMultipleBlocksProps();
  const [blocks] = useBlocksStore();
  return {
    askAi: useCallback(
      async (type: "styles" | "content", blockId: string, prompt: string, onComplete?: () => void) => {
        if (!callBack) return;
        setProcessing(true);
        setError(null);
        try {
          const aiBlocks =
            type === "content"
              ? cloneDeep(getBlockWithChildren(blockId, blocks))
              : [cloneDeep(blocks.find((block) => block._id === blockId))];
          set(aiBlocks, "0._parent", null);
          const { blocks: updatedBlocks, error } = await callBack(type, prompt, aiBlocks);
          if (error) {
            setError(error);
            return;
          }
          if (type === "styles") {
            updateBlockPropsAll(updatedBlocks);
          } else {
            updateBlocksWithStream(updatedBlocks);
          }
        } catch (e) {
          setError(e);
        } finally {
          setProcessing(false);
          if (onComplete) onComplete();
        }
      },
      [callBack, setProcessing, blocks, updateBlockPropsAll, updateBlocksWithStream],
    ),
    loading: processing,
    error,
  };
};
