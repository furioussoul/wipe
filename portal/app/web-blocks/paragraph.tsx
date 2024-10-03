import * as React from "react";
import { TextIcon } from "@radix-ui/react-icons";
import { MultilineText, Styles } from "@chaibuilder/runtime/controls";
import { isNull } from "lodash-es";

/**
 * Heading component
 * @param props
 * @constructor
 */
const ParagraphBlock = (
  props: any & {
    blockProps: Record<string, string>;
    styles: Record<string, string>;
    children: React.ReactNode;
  },
) => {
  const { blockProps, styles, content } = props;

  if (!isNull(props.children)) return React.createElement("p", { ...styles, ...blockProps }, props.children);

  // eslint-disable-next-line react/no-danger
  return React.createElement("p", {
    ...styles,
    ...blockProps,
    "data-ai-key": "content",
    "data-ai-type": "html",
    dangerouslySetInnerHTML: { __html: content },
  });
};

const Config = {
  type: "Paragraph",
  label: "Paragraph",
  category: "core",
  icon: TextIcon,
  group: "typography",
  props: {
    styles: Styles({ default: "" }),
    content: MultilineText({
      title: "Content",
      default:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
    }),
  },
  canAcceptBlock: (type) => type === "Span" || type === "Link" || type === "Text",
};

export { ParagraphBlock as Component, Config };
