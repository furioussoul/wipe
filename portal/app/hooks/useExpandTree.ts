import { atom, useAtom, useAtomValue } from "jotai";
import { find, first, flatten, get, isEmpty, isString } from "lodash-es";
import { useEffect } from "react";
import { presentBlocksAtom } from "../atoms/blocks";
import { ChaiBlock } from "../types/ChaiBlock";
import { useSelectedBlockIds } from "./useSelectedBlockIds";

/**
 * Traverse the components array to find all the parent nodes
 * of the given component
 * @param blocks
 * @param id
 * @returns {unknown[]}
 */
const getParentNodeIds = (blocks: ChaiBlock[], id: string | null | undefined): string[] => {
  const ids: string[] = [];
  let block = find(blocks, { _id: id }) as ChaiBlock;
  let parent: string | undefined | null = get(block, "_parent", "");
  while (isString(parent) && !isEmpty(parent)) {
    ids.push(block?._parent as string);
    block = find(blocks, { _id: parent }) as ChaiBlock;
    parent = block?._parent;
  }
  return flatten(ids);
};
export const expandedIdsAtom = atom<string[]>([]);

export const useExpandTree = () => {
  const [ids] = useSelectedBlockIds();
  const pageBlocks = useAtomValue(presentBlocksAtom);
  const [, setExpandedIds] = useAtom(expandedIdsAtom);
  useEffect(() => {
    let expandedIds: string[] = [];
    const id = first(ids);
    if (isString(id)) {
      expandedIds = [id, ...getParentNodeIds(pageBlocks, id)];
    }
    setExpandedIds(expandedIds);
  }, [ids, pageBlocks, setExpandedIds]);
};

export const useExpandedIds = (): string[] => useAtomValue(expandedIdsAtom);
