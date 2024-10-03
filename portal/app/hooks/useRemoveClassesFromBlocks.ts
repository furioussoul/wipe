import { useCallback } from "react";
import { atom, useSetAtom } from "jotai";
import { each, filter, first, get as getProp, includes, map } from "lodash-es";
import { pageBlocksAtomsAtom } from "../atoms/blocks";
import { selectedStylingBlocksAtom, TStyleBlock } from "./useSelectedStylingBlocks";
import { ChaiBlock } from "../types/ChaiBlock";
import { getSplitClasses } from "../import-html/general";
import { STYLES_KEY } from "../constants/STRINGS.ts";
import { useBlocksStoreUndoableActions } from "../history/useBlocksStoreUndoableActions.ts";

export const removeClassFromBlocksAtom: any = atom(null, (get, _set, { blockIds, fullClasses }) => {
  const styleBlock = first(get(selectedStylingBlocksAtom)) as TStyleBlock;
  const blockAtoms = filter(get(pageBlocksAtomsAtom), (blockAtom) =>
    // @ts-ignore
    blockIds.includes(get(blockAtom)._id),
  );

  return map(blockAtoms, (blockAtom) => {
    const block: ChaiBlock = get(blockAtom as any);
    const nonDynamicClasses: string[] = fullClasses;
    // eslint-disable-next-line prefer-const
    let { classes, baseClasses } = getSplitClasses(getProp(block, styleBlock.prop, "styles:,"));

    each(nonDynamicClasses, (fullCls: string) => {
      const escapedClass = fullCls.replace(/[\[\]\/\\{}()*+?.^$|]/g, "\\$&");
      const regEx = new RegExp(`(^| )${escapedClass}($| )`, "g");
      classes = classes.replace(regEx, " ").replace(/  +/g, " ").trim();
      const mq = first(fullCls.split(":"));
      if (includes(["2xl", "xl", "lg", "md", "sm"], mq)) {
        nonDynamicClasses.push((fullCls.split(":").pop() as string).trim());
      }
    });

    each(nonDynamicClasses, (fullCls: string) => {
      const regEx = new RegExp(`(^| )${fullCls.replace("[", "\\[").replace("]", "\\]")}($| )`, "g");
      baseClasses = baseClasses.replace(regEx, " ").replace(/  +/g, " ").trim();
    });

    return {
      ids: [block._id],
      props: {
        [styleBlock.prop]: `${STYLES_KEY}${baseClasses},${classes}`,
      },
    };
  });
});

export const useRemoveClassesFromBlocks = (): Function => {
  const { updateBlocks } = useBlocksStoreUndoableActions();
  const removeClassesFromBlocks = useSetAtom(removeClassFromBlocksAtom);
  return useCallback(
    (blockIds: Array<string>, fullClasses: Array<string>) => {
      const blocks = removeClassesFromBlocks({ blockIds, fullClasses });
      updateBlocks(blockIds, blocks[0].props);
    },
    [removeClassesFromBlocks],
  );
};
