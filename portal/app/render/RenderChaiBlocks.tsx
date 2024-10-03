import React from "react";
import { each, filter, get, has, includes, isEmpty, isString, keys, memoize, omit } from "lodash-es";
import { twMerge } from "tailwind-merge";
import { ChaiBlock } from "../types/ChaiBlock";
import { SLOT_KEY, STYLES_KEY } from "../constants/STRINGS";
import { getBlockComponent } from "@chaibuilder/runtime";
import { addPrefixToClasses } from "./functions";

const getSlots = (block: ChaiBlock) => {
  // loop over all keys and find the ones that start with slot
  const slots: { [key: string]: string[] } = {};
  Object.keys(block).forEach((key) => {
    if (isString(block[key]) && block[key].startsWith(SLOT_KEY)) {
      slots[key] = block[key].replace(SLOT_KEY, "").split(",");
    }
  });
  return slots;
};

const generateClassNames = memoize((styles: string, classPrefix: string) => {
  const stylesArray = styles.replace(STYLES_KEY, "").split(",");
  const classes = twMerge(stylesArray[0], stylesArray[1]);
  if (classPrefix === "") return classes.replace(STYLES_KEY, "").trim();
  // split classes by space and add prefix to each class
  return addPrefixToClasses(classes, classPrefix).replace(STYLES_KEY, "").trim();
});

function getElementAttrs(block: ChaiBlock, key: string) {
  const attrs = get(block, `${key}_attrs`, {}) as Record<string, string>;
  if (has(attrs, "data-ai-key")) {
    delete attrs["data-ai-key"];
  }
  const attrsKeys = keys(attrs).join(" ");
  if (includes(attrsKeys, "x-show") && !includes(attrsKeys, "x-transition")) {
    attrs["x-transition"] = "";
  }
  return attrs;
}

function getStyleAttrs(block: ChaiBlock, classPrefix: string) {
  const styles: { [key: string]: { className: string } } = {};
  Object.keys(block).forEach((key) => {
    if (isString(block[key]) && block[key].startsWith(STYLES_KEY)) {
      const classes = generateClassNames(block[key], classPrefix);
      styles[key] = {
        className: classes,
        ...getElementAttrs(block, key),
      };
    }
  });
  return styles;
}

function applyBindings(block: ChaiBlock, chaiData: any): ChaiBlock {
  const bindings = get(block, "_bindings", {});
  if (isEmpty(bindings)) return { ...block };
  each(bindings, (value, key) => {
    if (isString(value) && get(chaiData, value, null)) {
      block[key] = get(chaiData, value, null);
    }
  });
  return block;
}
export function RenderChaiBlocks({
  blocks,
  parent,
  classPrefix = "",
  externalData = {},
  blockModifierCallback,
}: {
  blocks: ChaiBlock[];
  parent?: string;
  classPrefix?: string;
  externalData?: Record<string, any>;
  blockModifierCallback?: (block: ChaiBlock) => ChaiBlock;
}) {
  const allBlocks = blocks;
  const getStyles = (block: ChaiBlock) => getStyleAttrs(block, classPrefix);
  const filteredBlocks = parent
    ? filter(blocks, { _parent: parent })
    : filter(blocks, (block) => isEmpty(block._parent));
  return (
    <>
      {React.Children.toArray(
        filteredBlocks.map((block: ChaiBlock, index: number) => {
          const slots = getSlots(block);
          const attrs: any = {};
          if (!isEmpty(slots)) {
            Object.keys(slots).forEach((key) => {
              attrs[key] = React.Children.toArray(
                slots[key].map((slotId: string) => (
                  <RenderChaiBlocks
                    externalData={externalData}
                    classPrefix={classPrefix}
                    blocks={allBlocks}
                    parent={slotId}
                  />
                )),
              );
            });
          }
          const blocks = filter(allBlocks, { _parent: block._id });
          attrs.children =
            blocks.length > 0 ? (
              <RenderChaiBlocks
                externalData={externalData}
                classPrefix={classPrefix}
                parent={block._id}
                blocks={allBlocks}
              />
            ) : null;

          const blockDefinition = getBlockComponent(block._type);
          if (blockDefinition !== null) {
            let syncedBlock: ChaiBlock = block;
            // @ts-ignore
            const Component: React.FC<any> = (blockDefinition as { component: React.FC<ChaiBlock> }).component;
            syncedBlock = { ...(blockDefinition as any).defaults, ...block };
            if (blockModifierCallback) {
              syncedBlock = blockModifierCallback(syncedBlock);
            }
            return React.createElement(
              Component,
              omit(
                {
                  blockProps: {},
                  inBuilder: false,
                  ...syncedBlock,
                  index,
                  ...applyBindings(block, externalData),
                  ...getStyles(syncedBlock),
                  ...attrs,
                },
                ["_parent"],
              ),
            );
          }

          return <noscript>{block._type} not found</noscript>;
        }),
      )}
    </>
  );
}
