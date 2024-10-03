import { useCallback } from "react";
import { useBlocksStoreUndoableActions } from "../history/useBlocksStoreUndoableActions.ts";
import { ChaiBlock } from "../types/ChaiBlock.ts";
import { chunk, isString, keys, omit } from "lodash-es";

/**
 *
 */
export const useUpdateBlocksProps = () => {
  const { updateBlocks } = useBlocksStoreUndoableActions();
  return useCallback(
    (blockIds: Array<string>, props: Record<string, any>, prevPropsState?: Record<string, any>) => {
      updateBlocks(blockIds, props, prevPropsState);
    },
    [updateBlocks],
  );
};

export const useUpdateMultipleBlocksProps = () => {
  const { updateMultipleBlocksProps } = useBlocksStoreUndoableActions();
  return useCallback(
    (blocks: Array<{ _id: string } & Partial<ChaiBlock>>) => {
      updateMultipleBlocksProps(blocks);
    },
    [updateMultipleBlocksProps],
  );
};

const useFakeStreamEffect = () => {
  const { updateBlocksRuntime } = useBlocksStoreUndoableActions();
  return useCallback(
    async (id: string, block: Partial<ChaiBlock>, delay = 30) => {
      const props = keys(omit(block, ["_id"]));
      for (const prop of props) {
        const value = block[prop];
        if (isString(value)) {
          const letters = chunk(value.split(""), 12);
          let str = "";
          updateBlocksRuntime([id], { [prop]: "" });
          for (let i = 0; i < letters.length; i++) {
            str += letters[i].join("");
            updateBlocksRuntime([id], { [prop]: str });
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      }
    },
    [updateBlocksRuntime],
  );
};

export const useStreamMultipleBlocksProps = () => {
  const { updateMultipleBlocksProps } = useBlocksStoreUndoableActions();
  const streamEffect = useFakeStreamEffect();
  return useCallback(
    async (blocks: Array<{ _id: string } & Partial<ChaiBlock>>) => {
      for (const block of blocks) {
        await streamEffect(block._id, block);
      }
      updateMultipleBlocksProps(blocks);
    },
    [updateMultipleBlocksProps],
  );
};

export const useUpdateBlocksPropsRealtime = () => {
  const { updateBlocksRuntime } = useBlocksStoreUndoableActions();
  return useCallback(
    (blockIds: Array<string>, props: Record<string, any>) => {
      updateBlocksRuntime(blockIds, props);
    },
    [updateBlocksRuntime],
  );
};
