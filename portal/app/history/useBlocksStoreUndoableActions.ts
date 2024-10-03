import { useAtom } from "jotai";
import { presentBlocksAtom } from "../atoms/blocks.ts";
import { ChaiBlock } from "../types/ChaiBlock.ts";
import { useUndoManager } from "./useUndoManager.ts";
import { useBlocksStoreManager } from "./useBlocksStoreManager.ts";
import { each, first, keys, map } from "lodash-es";

export const useBlocksStore = (): [ChaiBlock[], Function] => {
  return useAtom<ChaiBlock[]>(presentBlocksAtom);
};

export const useBlocksStoreUndoableActions = () => {
  const { add } = useUndoManager();
  const [currentBlocks] = useBlocksStore();
  const {
    setNewBlocks: setBlocks,
    addBlocks: addNewBlocks,
    removeBlocks: removeExistingBlocks,
    moveBlocks: moveExistingBlocks,
    updateBlocksProps,
  } = useBlocksStoreManager();

  const setNewBlocks = (newBlocks: ChaiBlock[]) => {
    setBlocks(newBlocks);
    add({
      undo: () => setBlocks(currentBlocks),
      redo: () => setBlocks(newBlocks),
    });
  };

  const addBlocks = (newBlocks: ChaiBlock[], parent?: string, position?: number) => {
    addNewBlocks(newBlocks, parent, position);
    add({
      undo: () => removeExistingBlocks(map(newBlocks, "_id")),
      redo: () => addNewBlocks(newBlocks, parent, position),
    });
  };

  const removeBlocks = (blocks: ChaiBlock[]) => {
    const parentId = first(blocks)?._parent;
    const siblings = currentBlocks.filter((block) => (parentId ? block._parent === parentId : !block._parent));
    const position = siblings.indexOf(first(blocks));

    removeExistingBlocks(map(blocks, "_id"));
    add({
      undo: () => addNewBlocks(blocks, parentId, position),
      redo: () => removeExistingBlocks(map(blocks, "_id")),
    });
  };

  const moveBlocks = (blockIds: string[], parent: string | undefined, position: number) => {
    // Save the current positions of the blocks for undo
    const currentPositions = map(blockIds, (_id: string) => {
      const block = currentBlocks.find((block) => block._id === _id) as ChaiBlock;
      const oldParent = block._parent || null;
      const siblings = currentBlocks
        .filter((block) => (oldParent ? block._parent === oldParent : !block._parent))
        .map((block) => block._id);
      const oldPosition = siblings.indexOf(_id);
      return { _id, oldParent, oldPosition };
    });

    //if the parent and position are the same as the current parent and position, do nothing
    const firstBlock = currentPositions.find(({ _id }) => _id === blockIds[0]);
    if (firstBlock && firstBlock.oldParent === parent && firstBlock.oldPosition === position) {
      return;
    }

    moveExistingBlocks(blockIds, parent, position);
    add({
      undo: () =>
        each(currentPositions, ({ _id, oldParent, oldPosition }) => {
          moveExistingBlocks([_id], oldParent, oldPosition);
        }),
      redo: () => moveExistingBlocks(blockIds, parent, position),
    });
  };

  const updateBlocks = (blockIds: string[], props: Partial<ChaiBlock>, oldPropsState?: Partial<ChaiBlock>) => {
    let previousPropsState = [];
    if (oldPropsState) {
      previousPropsState = map(blockIds, (_id: string) => {
        return { _id, ...oldPropsState };
      });
    } else {
      const propKeys = keys(props);
      previousPropsState = map(blockIds, (_id: string) => {
        const block = currentBlocks.find((block) => block._id === _id);
        const prevProps = { _id };
        each(propKeys, (key: string) => (prevProps[key] = block[key]));
        return prevProps;
      });
    }

    updateBlocksProps(map(blockIds, (_id: string) => ({ _id, ...props })));
    add({
      undo: () => updateBlocksProps(previousPropsState),
      redo: () => updateBlocksProps(map(blockIds, (_id: string) => ({ _id, ...props }))),
    });
  };

  const updateMultipleBlocksProps = (blocks: Array<{ _id: string } & Partial<ChaiBlock>>) => {
    let previousPropsState = [];
    previousPropsState = map(blocks, (block: Partial<ChaiBlock>) => {
      const propKeys = keys(block);
      const currentBlock = currentBlocks.find((currentBlock) => currentBlock._id === block._id);
      const prevProps = {};
      each(propKeys, (key: string) => (prevProps[key] = currentBlock[key]));
      return prevProps;
    });

    updateBlocksProps(blocks);
    add({
      undo: () => updateBlocksProps(previousPropsState),
      redo: () => updateBlocksProps(blocks),
    });
  };

  const updateBlocksRuntime = (blockIds: string[], props: Record<string, any>) => {
    updateBlocksProps(map(blockIds, (_id: string) => ({ _id, ...props })));
  };

  return {
    moveBlocks,
    addBlocks,
    removeBlocks,
    updateBlocks,
    updateBlocksRuntime,
    setNewBlocks,
    updateMultipleBlocksProps,
  };
};
