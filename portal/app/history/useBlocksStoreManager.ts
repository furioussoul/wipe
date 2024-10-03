import { ChaiBlock } from "../types/ChaiBlock.ts";
import { useBlocksStore } from "./useBlocksStoreUndoableActions.ts";
import { find, omit } from "lodash-es";
import { removeNestedBlocks } from "../hooks/useRemoveBlocks.ts";
import { insertBlocksAtPosition } from "./InsertBlocksAtPosition.ts";
import { moveBlocksWithChildren } from "./moveBlocksWithChildren.ts";

export const useBlocksStoreManager = () => {
  const [, setBlocks] = useBlocksStore();

  return {
    setNewBlocks: (newBlocks: ChaiBlock[]) => {
      setBlocks(newBlocks);
    },
    addBlocks: (newBlocks: ChaiBlock[], parent?: string, position?: number) => {
      setBlocks((prevBlocks) => insertBlocksAtPosition(prevBlocks, newBlocks, parent, position));
    },
    removeBlocks: (blockIds: string[]) => {
      setBlocks((prevBlocks) => removeNestedBlocks(prevBlocks, blockIds));
    },
    moveBlocks: (blockIds: string[], newParent: string | null, position: number) => {
      setBlocks((prevBlocks) => {
        let blocks = prevBlocks;
        for (let i = 0; i < blockIds.length; i++) {
          blocks = moveBlocksWithChildren(blocks, blockIds[i], newParent, position);
        }
        return blocks;
      });
    },
    updateBlocksProps: (blocks: Partial<ChaiBlock>[]) => {
      setBlocks((prevBlocks: ChaiBlock[]) => {
        const blocksIds = blocks.map((block) => block._id);
        return prevBlocks.map((block) => {
          if (blocksIds.includes(block._id)) {
            const props = find(blocks, { _id: block._id });
            return { ...block, ...omit(props, "_id") };
          }
          return block;
        });
      });
    },
  };
};
