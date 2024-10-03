import { filter, find, includes, isEmpty } from "lodash-es";
import { useCallback } from "react";
import { useSelectedBlockIds } from "./useSelectedBlockIds";
import { ChaiBlock } from "../types/ChaiBlock";
import { useBlocksStore, useBlocksStoreUndoableActions } from "../history/useBlocksStoreUndoableActions.ts";

export const removeNestedBlocks = (blocks: ChaiBlock[], blockIds: Array<string>): ChaiBlock[] => {
  const _blockIds: Array<string> = [];
  const _blocks = filter(blocks, (block: ChaiBlock) => {
    if (includes(blockIds, block._id) || includes(blockIds, block._parent)) {
      _blockIds.push(block._id);
      return false;
    }
    return true;
  });

  if (!isEmpty(_blockIds)) return removeNestedBlocks(_blocks, _blockIds);
  return _blocks;
};

export const useRemoveBlocks = () => {
  const [presentBlocks] = useBlocksStore();
  const [ids, setSelectedIds] = useSelectedBlockIds();
  const { setNewBlocks } = useBlocksStoreUndoableActions();

  return useCallback(
    (blockIds: Array<string>) => {
      const parentBlockId = find(presentBlocks, { _id: blockIds[0] })?._parent || null;
      setNewBlocks(removeNestedBlocks(presentBlocks, blockIds));
      setTimeout(() => setSelectedIds(parentBlockId ? [parentBlockId] : []), 200);
    },
    [presentBlocks, setSelectedIds, ids],
  );
};
