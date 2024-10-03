import { useCallback } from "react";
import { filter, find, first, forIn, has, startsWith } from "lodash-es";
import { generateUUID } from "../functions/Functions.ts";
import { canAcceptChildBlock } from "../functions/block-helpers.ts";
import { useSelectedBlockIds } from "./useSelectedBlockIds";
import { ChaiBlock } from "../types/ChaiBlock";
import { CoreBlock } from "../types/CoreBlock";
import { getBlockDefaultProps } from "../functions/Controls.ts";
import { SLOT_KEY } from "../constants/STRINGS.ts";
import { useBlocksStore, useBlocksStoreUndoableActions } from "../history/useBlocksStoreUndoableActions.ts";

type AddBlocks = {
  addCoreBlock: any;
  addPredefinedBlock: any;
};

export const useAddBlock = (): AddBlocks => {
  const [allBlocks] = useBlocksStore();
  const [, setSelected] = useSelectedBlockIds();
  const { addBlocks } = useBlocksStoreUndoableActions();

  const addPredefinedBlock = useCallback(
    (blocks: ChaiBlock[], parentId?: string, position?: number) => {
      // eslint-disable-next-line no-param-reassign
      for (let i = 0; i < blocks.length; i++) {
        const { _id } = blocks[i];
        // eslint-disable-next-line no-param-reassign
        blocks[i]._id = generateUUID();
        const children = filter(blocks, { _parent: _id });
        for (let j = 0; j < children.length; j++) {
          children[j]._parent = blocks[i]._id;
        }
      }
      const block = first(blocks);
      let parentBlock;
      let parentBlockId;
      if (parentId) {
        parentBlock = find(allBlocks, { _id: parentId }) as ChaiBlock;
        blocks[0]._parent = parentId;
        parentBlockId = parentId;
      }

      const canAdd = parentBlock ? canAcceptChildBlock(parentBlock?._type, block._type) : true;
      if (!canAdd && parentBlock) {
        blocks[0]._parent = parentBlock._parent;
        parentBlockId = parentBlock._parent;
      }

      addBlocks(blocks, parentBlockId, position);
      setSelected([first(blocks)?._id]);
      return first(blocks);
    },
    [allBlocks, setSelected],
  );

  const addCoreBlock = useCallback(
    (coreBlock: CoreBlock, parentId?: string | null, position?: number) => {
      if (has(coreBlock, "blocks")) {
        const blocks = coreBlock.blocks as ChaiBlock[];
        return addPredefinedBlock(blocks, parentId, position);
      }

      const blockId = generateUUID();
      const props: { [key: string]: any } = getBlockDefaultProps(coreBlock.props);
      const slots: ChaiBlock[] = [];
      forIn(props, (value: any, key) => {
        if (startsWith(value, SLOT_KEY)) {
          const slotId = value.replace(SLOT_KEY, "");
          slots.push({
            _id: slotId,
            _type: "Slot",
            _parent: blockId,
            _name: coreBlock.props[key].name,
            _styles: coreBlock.props[key].styles,
            _emptyStyles: coreBlock.props[key].emptyStyles,
          });
        }
      });

      const newBlock: ChaiBlock = {
        _type: coreBlock.type,
        _id: blockId,
        ...props,
      };
      let parentBlock;
      let parentBlockId;
      if (parentId) {
        parentBlock = find(allBlocks, { _id: parentId }) as ChaiBlock;
        newBlock._parent = parentId;
        parentBlockId = parentId;
      }

      const canAdd = canAcceptChildBlock(parentBlock?._type, newBlock._type);
      if (!canAdd && parentBlock) {
        newBlock._parent = parentBlock._parent;
        parentBlockId = parentBlock._parent;
      }
      const newBlocks: ChaiBlock[] = [newBlock, ...slots];

      addBlocks(newBlocks, parentBlockId, position);
      setSelected([newBlock._id]);
      return newBlock;
    },
    [addPredefinedBlock, allBlocks, setSelected],
  );

  return { addCoreBlock, addPredefinedBlock };
};
