import * as React from "react";
import { useState } from "react";
import { forEach, get, isEmpty, map, set } from "lodash-es";
import {
  useSelectedBlock,
  useSelectedStylingBlocks,
  useUpdateBlocksProps,
  useUpdateBlocksPropsRealtime,
} from "../../../hooks";
import AttrsEditor from "./AttrsEditor";

export const BlockAttributesEditor = React.memo(() => {
  const block = useSelectedBlock();
  const [attributes, setAttributes] = useState([] as Array<{ key: string; value: string }>);
  const [selectedStylingBlock] = useSelectedStylingBlocks();
  const updateBlockPropsRealtime = useUpdateBlocksPropsRealtime();
  const updateBlockProps = useUpdateBlocksProps();

  const attrKey = `${get(selectedStylingBlock, "0.prop")}_attrs`;

  React.useEffect(() => {
    const _attributes = map(get(block, attrKey), (value, key) => ({ key, value }));
    if (!isEmpty(_attributes)) setAttributes(_attributes as any);
    else setAttributes([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [get(block, attrKey)]);

  const updateAttributes = React.useCallback(
    (updatedAttributes: any = []) => {
      const _attrs = {};
      forEach(updatedAttributes, (item) => {
        if (!isEmpty(item.key)) {
          set(_attrs, item.key, item.value);
        }
      });
      updateBlockProps([get(block, "_id")], { [attrKey]: _attrs });
    },
    [block, updateBlockPropsRealtime, attrKey],
  );

  return (
    <div className="flex-col gap-y-2">
      <div className="flex flex-col">
        <div>
          <AttrsEditor preloadedAttributes={attributes} onAttributesChange={updateAttributes} />
        </div>
      </div>
    </div>
  );
});
