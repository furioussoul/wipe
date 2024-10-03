import * as React from "react";
import { HeadingIcon } from "@radix-ui/react-icons";
import { MultilineText, SelectOption, Styles } from "@chaibuilder/runtime/controls";
import { ChaiBlock } from "../types/ChaiBlock";

/**
 * Heading component
 * @param props
 * @constructor
 */
const HeadingBlock = (
  props: ChaiBlock & {
    level: string;
    blockProps: Record<string, string>;
    styles: Record<string, string>;
  },
) => {
  const { blockProps, styles, content, level = "h1", children = null } = props;

  if (children) return React.createElement(level, { ...styles, ...blockProps }, children);

  return React.createElement(level, {
    ...styles,
    ...blockProps,
    "data-ai-key": "content",
    "data-ai-type": "html",
    dangerouslySetInnerHTML: { __html: content },
  });
};

const Config = {
  type: "Heading",
  label: "Heading",
  category: "core",
  icon: HeadingIcon,
  group: "typography",
  props: {
    level: SelectOption({
      title: "Level",
      default: "h1",
      binding: false,
      options: [
        { value: "h1", title: "h1" },
        { value: "h2", title: "h2" },
        { value: "h3", title: "h3" },
        { value: "h4", title: "h4" },
        { value: "h5", title: "h5" },
        { value: "h6", title: "h6" },
      ],
    }),
    styles: Styles({ default: "text-3xl" }),
    content: MultilineText({ title: "Content", default: "Heading goes here" }),
  },
  canAcceptBlock: (type) => type === "Span" || type === "Text",
};

export { HeadingBlock as Component, Config };
