import { filter, isEmpty } from "lodash-es";
import { BlocksRendererStatic } from "./BlocksRenderer";
import { BlocksExternalDataProvider } from "./BlocksExternalDataProvider";
import { useBlocksStore } from "../../../history/useBlocksStoreUndoableActions";
import { ChaiBlock } from "../../../types/ChaiBlock";

export const StaticBlocksRenderer = () => {
  const [blocks] = useBlocksStore();

  const blocksHtml = isEmpty(blocks) ? null : (
    <BlocksExternalDataProvider>
      <BlocksRendererStatic blocks={filter(blocks, (block: ChaiBlock) => isEmpty(block._parent))} />
    </BlocksExternalDataProvider>
  );

  return <>{blocksHtml}</>;
};
