import { useCallback, useMemo } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import { cloneDeep, filter, get as getProp, get, includes, isEmpty, map, without } from "lodash-es";
import { atomWithStorage } from "jotai/utils";
import { presentBlocksAtom } from "../atoms/blocks";
import { ChaiBlock } from "../types/ChaiBlock";
import { getBlockComponent } from "@chaibuilder/runtime";
import { ChaiControlDefinition } from "@chaibuilder/runtime/controls";

/**
 * Core selected  ids atom
 */
const selectedBlockIdsAtom = atom<Array<string>>([]);
selectedBlockIdsAtom.debugLabel = "selectedBlockIdsAtom";

/**
 * Derived atoms
 */
const selectedBlocksAtom = atom<ChaiBlock[]>((get) => {
  const blocks = get(presentBlocksAtom);
  const blockIds = get(selectedBlockIdsAtom);
  return map(
    filter(blocks, ({ _id }: { _id: string }) => includes(blockIds, _id)),
    (block) => ({ ...block }),
  );
});
selectedBlocksAtom.debugLabel = "selectedBlocksAtom";

/**
 *
 */
export const selectedBlockAtom = atom((get) => {
  const blocks = get(selectedBlocksAtom);
  if (blocks.length === 0) {
    return null;
  }
  if (blocks.length === 1) {
    return blocks[0] as ChaiBlock;
  }
});
selectedBlockAtom.debugLabel = "selectedBlockAtom";

// FIXME: This is a hacky way to check if the selected blocks are flex children
// const areFlexChild = (classes: string) => classes.match(/flex( |$)/g) !== null;
// const areGridChild = (classes: string) => classes.match(/grid( |$)/g) !== null;
const getParentId = (block: ChaiBlock | {}) => getProp(block, "_parent", null);

export const selectedBlocksParentsAtom = atom((get) => {
  const selectedBlocks = get(selectedBlocksAtom);
  const parentIds = map(selectedBlocks, getParentId);
  return filter(get(presentBlocksAtom), (block: ChaiBlock) => includes(parentIds, block._id)) as ChaiBlock[];
});
selectedBlocksParentsAtom.debugLabel = "selectedBlocksParentsAtom";

export const selectedBlockFlexChildAtom = atom(() => {
  return false;
  // FIXME: Loop over keys to check if any key is styles and has flex in it
  // const styleBlock = first(get(selectedStylingBlocksAtom)) as TStyleBlock;
  // if (!styleBlock) {
  //   return false;
  // }
  // const block = find(get(presentBlocksAtom), { _id: styleBlock.blockId });
  // const parentBlock = find(get(presentBlocksAtom), { _id: block._parent });
  // if (!parentBlock) return false;
  // return areFlexChild(getProp(parentBlock, styleBlock.prop, `${STYLES_KEY},`));
});
selectedBlockFlexChildAtom.debugLabel = "selectedBlockFlexChildAtom";

export const selectedBlockGridChildAtom = atom(() => {
  return false;
  // FIXME: Loop over keys to check if any key is styles and has flex in it
  // const styleBlock = first(get(selectedStylingBlocksAtom)) as TStyleBlock;
  // if (!styleBlock) {
  //   return false;
  // }
  // const block = find(get(presentBlocksAtom), { _id: styleBlock.blockId });
  // const parentBlock = find(get(presentBlocksAtom), { _id: block._parent });
  // if (!parentBlock) return false;
  // return areGridChild(getProp(parentBlock, styleBlock.prop, `${STYLES_KEY},`));
});
selectedBlockGridChildAtom.debugLabel = "selectedBlockGridChildAtom";

export const styleStateAtom: any = atom<string>("");
styleStateAtom.debugLabel = "styleStateAtom";

export const styleBreakpointAtom = atomWithStorage<string>("styleBreakpoint", "xs");
styleBreakpointAtom.debugLabel = "styleBreakpointAtom";

/**
 * Hook to get selected block ids
 */
export const useSelectedBlocksDisplayChild = () => ({
  flexChild: useAtomValue(selectedBlockFlexChildAtom),
  gridChild: useAtomValue(selectedBlockGridChildAtom),
});

/**
 * useSelectedBlock hook
 */
//@ts-ignore
export const useSelectedBlock = () => useAtomValue<ChaiBlock>(selectedBlockAtom);

export const selectedBlockHierarchy = atom((get) => {
  const selectedBlock = get(selectedBlockAtom);
  const allBlocks = get(presentBlocksAtom);
  let block = selectedBlock;
  const blocks = [selectedBlock];
  do {
    const parentBlock = allBlocks.find(({ _id }) => _id === block?._parent);
    block = parentBlock;
    if (parentBlock) blocks.push(parentBlock);
  } while (block?._parent);

  return blocks;
});

/**
 * TODO: Add test cases for this hook
 */
export const useSelectedBlockHierarchy = () => {
  return useAtomValue(selectedBlockHierarchy);
};

export const useSelectedBlockCanvasSetting = () => {
  const allParentBlocks = useSelectedBlockHierarchy();
  return useMemo(() => {
    for (let i = 0; i < allParentBlocks.length; i++) {
      const coreBlock = getBlockComponent(allParentBlocks[i]._type);
      const settings = cloneDeep(get(coreBlock, "blockState", {})) as { [key: string]: ChaiControlDefinition };
      if (!isEmpty(settings)) return { settings, block: allParentBlocks[i] };
    }
    return {};
  }, [allParentBlocks]);
};

export const useSelectedBlockCustomStylingStates = () => {
  const allParentBlocks = useSelectedBlockHierarchy();
  return useMemo<Record<string, string>>(() => {
    let customStylingStates = {};
    for (let i = 0; i < allParentBlocks.length; i++) {
      const coreBlock = getBlockComponent(allParentBlocks[i]._type);
      const states = get(coreBlock, "customStylingStates", {});
      customStylingStates = { ...customStylingStates, ...states };
    }
    return customStylingStates;
  }, [allParentBlocks]);
};

/**
 *
 */
export const useSelectedBlockIds = (): [Array<string>, Function, Function] => {
  const [blockIds, setBlockIds] = useAtom(selectedBlockIdsAtom);

  const toggleSelectedBlockId = useCallback(
    (blockId: string) => {
      setBlockIds((prevIds) => {
        const newBlockIds: Array<string> = includes(prevIds, blockId)
          ? without(prevIds, blockId)
          : [...prevIds, blockId];

        return newBlockIds;
      });
    },
    [setBlockIds],
  );

  return [blockIds, setBlockIds, toggleSelectedBlockId];
};
