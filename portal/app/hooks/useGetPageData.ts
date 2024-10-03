import { useCallback } from "react";
import { map, omit } from "lodash-es";
import { useBrandingOptions } from "./useBrandingOptions";
import { useCurrentPage } from "./useCurrentPage";
import { splitPageBlocks } from "../functions/split-blocks";
import { useBlocksStore } from "../history/useBlocksStoreUndoableActions.ts";
import { ChaiBlock } from "../types/ChaiBlock.ts";

export const useGetPageData = () => {
  const [projectOptions] = useBrandingOptions();
  const { currentPage } = useCurrentPage();
  const [presentBlocks] = useBlocksStore();

  return useCallback(() => {
    const blocks = map(presentBlocks, (block: ChaiBlock) =>
      omit(block, ["expanded", "order", "title", "siblings", "tempClasses"]),
    );
    const [pageFilteredBlocks = []] = splitPageBlocks(blocks);
    return {
      currentPage,
      blocks: pageFilteredBlocks,
    };
  }, [projectOptions, currentPage, presentBlocks]);
};
