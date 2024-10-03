// @ts-nocheck
import { each, filter, find, first, flatten, get, map, set } from "lodash-es";
import { ChaiBlock } from "../types/ChaiBlock.ts";
import { convertToBlocksTree } from "./Blocks.ts";

/**
 * IMPORTANT: This is a very fragile code. Not automation tested but works perfectly
 * DO NOT EDIT this code before adding tests
 * FIXME: Add tests
 * @type {FlatToNested}
 */
export function getBlocksTree(blocks: Partial<ChaiBlock>[]) {
  return convertToBlocksTree(blocks);
}

const nestedToFlatArray = (nestedJson: any, parent: any) =>
  flatten(
    nestedJson.map((block: ChaiBlock) => {
      // eslint-disable-next-line no-param-reassign
      block = parent ? { ...block, _parent: parent } : { ...block };
      if (block.children) {
        const children = [...block.children];
        // eslint-disable-next-line no-param-reassign
        delete block.children;
        return flatten([block, ...nestedToFlatArray(children, block._id)]);
      }
      return block;
    }),
  );

function setProjectBlocksInMemory(nodes: any, initial = false) {
  for (let i = 0; i < nodes.length; i++) {
    const element = nodes[i];
    if (element.global && !initial) {
      // eslint-disable-next-line no-param-reassign
      nodes[i] = {
        type: "GlobalBlock",
        blockId: element.blockId,
        _parent: get(element, "_parent", null),
        _id: element._id,
      };
    } else if (element.children && element.children.length) {
      setProjectBlocksInMemory(element.children);
    }
  }
}

function getInnerBlocks(flatArr: ChaiBlock[]) {
  let blocks: ChaiBlock[] = [];
  let pBlocks = filter(flatArr, { type: "GlobalBlock" });
  if (pBlocks.length > 0) {
    pBlocks = map(pBlocks, getPBlocks);
    each(pBlocks, (pBlock: ChaiBlock[]) => {
      blocks = [...blocks, ...getSingleBlock(pBlock)];
    });
  }
  return blocks;
}

function getSingleBlock(flatArray: ChaiBlock[]) {
  let blocks: ChaiBlock[] = [];
  const parent = get(first(flatArray), "_parent", null);
  set(first(flatArray), "_parent", null);
  const block = [flatToNestedInstance.convert(clone(flatArray))];
  setProjectBlocksInMemory(block, true);
  let flat = nestedToFlatArray(block, flatArray[0]._id);
  flat = set(flat, "0._parent", parent);
  blocks = [...blocks, flat, ...getInnerBlocks(flat)];
  return blocks;
}

function getPBlocks(block: ChaiBlock) {
  const rootBlock = find(FLAT_ARRAY, { _id: block._id });
  if (!rootBlock) return [];
  const blocks = [rootBlock];
  const children = filter(FLAT_ARRAY, { _parent: block._id });
  if (children.length) {
    return flatten([...blocks, ...flatten(map(children, getPBlocks))]);
  }
  return flatten(blocks);
}

const clone = (obj: any) => JSON.parse(JSON.stringify(obj));

let FLAT_ARRAY: ChaiBlock[] = [];

export function splitPageBlocks(allPageBlocks: any[]) {
  FLAT_ARRAY = allPageBlocks;
  const clonedTree = getBlocksTree(clone(allPageBlocks));
  setProjectBlocksInMemory(clonedTree);
  const pageBlocks = nestedToFlatArray(clonedTree, null);
  const globalBlocks = getInnerBlocks(pageBlocks);
  const mappedBlocks = {};
  each(globalBlocks, (projectBlock: ChaiBlock) => set(mappedBlocks, first(projectBlock).blockId, projectBlock));
  return [pageBlocks, mappedBlocks];
}
