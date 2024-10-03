import { each, filter, find, flatten, get, isString, map, omit, set } from "lodash-es";
import { generateUUID } from "./Functions.ts";
import { ChaiBlock } from "../types/ChaiBlock";

export const nestedToFlatArray = (nestedJson: Array<ChaiBlock>, parent: string | null = null): Array<ChaiBlock> =>
  flatten(
    nestedJson.map((block: any) => {
      // eslint-disable-next-line no-param-reassign
      block = parent !== null ? { ...block, _parent: parent } : block;
      if (block.children && block.children.length) {
        const children = [...block.children];
        // eslint-disable-next-line no-param-reassign
        delete block.children;
        return flatten([block, ...nestedToFlatArray(children, block._id)]);
      }
      return block;
    }),
  );

export function duplicateBlocks(
  blocks: Partial<ChaiBlock>[],
  id: string,
  _parent: string | null,
): Partial<ChaiBlock>[] {
  const children = filter(blocks, (c) => c._parent === id);
  const newBlocks: Array<any> = [];
  for (let i = 0; i < children.length; i++) {
    const slots = getSlots(children[i]);
    if (Object.keys(slots).length > 0) {
      Object.keys(slots).forEach((key) => {
        children[i][key] = `slot:${generateUUID()}`;
      });
    }
    if (filter(blocks, { _parent: children[i]._id }).length > 0) {
      const newId = generateUUID();
      newBlocks.push({ ...children[i], oldId: children[i]._id, ...{ _id: newId, _parent } });
      newBlocks.push(flatten(duplicateBlocks(blocks, children[i]._id, newId)));
    } else {
      newBlocks.push({
        ...children[i],
        oldId: children[i]._id,
        ...{ _id: generateUUID(), _parent },
      });
    }
  }
  return flatten(newBlocks);
}

export function convertToBlocksTree(blocks: Partial<ChaiBlock>[]) {
  // Create a map to store nodes by their ids
  const idMap = {};
  blocks.forEach((item) => {
    idMap[item._id] = { ...item, children: [] };
  });

  // Create the result array to store top level nodes
  const result = [];

  blocks.forEach((item) => {
    if (item._parent) {
      // If the item has a parent, find the parent and add the node to its children
      const parent = idMap[item._parent];
      if (parent) {
        parent.children.push(idMap[item._id]);
      }
    } else {
      // If the item has no parent, it is a top level node
      result.push(idMap[item._id]);
    }
  });

  return result;
}

// eslint-disable-next-line no-underscore-dangle
export const hasChildren = (node: any): boolean => node.blockNodes && node.blockNodes.length > 0;

export const getSlots = (block: ChaiBlock) => {
  // loop over all keys and find the ones that start with slot
  const slots: any = {};
  Object.keys(block).forEach((key) => {
    // @ts-ignore
    if (isString(block[key]) && block[key].startsWith("slot")) {
      // @ts-ignore
      slots[key] = block[key].replace("slot:", "");
    }
  });
  return slots;
};

/**
 * Return the cloned array of blocks
 * @param currentBlocks
 * @param id
 * @param newParentId
 */
export const getDuplicatedBlocks = (
  currentBlocks: Partial<ChaiBlock>[],
  id: string,
  newParentId: string | null = null,
): ChaiBlock[] => {
  let block = find(currentBlocks, { _id: id }) as ChaiBlock;
  // @ts-ignore
  block = { ...block, oldId: block._id, _id: generateUUID() };

  if (newParentId) {
    // @ts-ignore
    block = { ...block, _parent: newParentId };
  }

  const blocks: ChaiBlock[] = [block];

  if (filter(currentBlocks, { _parent: id }).length > 0) {
    // @ts-ignore
    blocks.push(flatten(duplicateBlocks(currentBlocks, id, block._id)));
  }

  const newBlocks = flatten(blocks);
  return map(newBlocks, (m: ChaiBlock) => {
    const newBlock = m;
    const slots = getSlots(newBlock);
    if (Object.keys(slots).length > 0) {
      Object.keys(slots).forEach((key) => {
        const slotBlock = find(newBlocks, { oldId: slots[key].replace("slot:", "") }) as ChaiBlock;
        newBlock[key] = `slot:${slotBlock._id}`;
      });
    }
    return omit(newBlock, ["global", "oldId"]);
  }) as ChaiBlock[]; // remove all global blocks if any
};

/**
 * Important Function. Merges the global blocks into page blocks
 * @param globalBlocks
 * @param pageBlocks
 * @returns {*[]}
 */
export function mergeGlobalBlockIntoPageBlocks(globalBlocks: Array<any>, pageBlocks: Array<ChaiBlock>) {
  let newBlocks: Array<ChaiBlock> = [];
  each(pageBlocks, (pageBlock: ChaiBlock) => {
    if (pageBlock.type === "ProjectBlock") {
      const projectBlocks = get(find(globalBlocks, { block_id: pageBlock.blockId }), "blocks", []);
      if (projectBlocks.length) {
        set(projectBlocks, "0._parent", pageBlock.parent);
        newBlocks = flatten([...newBlocks, ...mergeGlobalBlockIntoPageBlocks(globalBlocks, projectBlocks)]);
      } else {
        newBlocks = [...newBlocks, ...projectBlocks];
      }
    } else {
      newBlocks.push(pageBlock);
    }
  });
  return newBlocks;
}
