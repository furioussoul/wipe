import * as React from "react";
import { Image, SelectOption, Styles } from "@chaibuilder/runtime/controls";
import EmptySlot from "./empty-slot";

const Component = (
  props: any & {
    children: React.ReactNode;
    styles: any;
    tag: string;
    backgroundImage: string;
    blockProps: Record<string, string>;
  },
) => {
  const { blockProps, inBuilder, backgroundImage, children, tag = "div", styles } = props;
  let nestedChildren = children;
  if (!children) {
    nestedChildren = <EmptySlot inBuilder={inBuilder} />;
  }

  let cssStyles = {};
  if (backgroundImage) {
    cssStyles = { backgroundImage: `url(${backgroundImage})` };
  }

  return React.createElement(tag, { ...blockProps, ...styles, style: cssStyles }, nestedChildren);
};

const Config = {
  type: "Box",
  label: "Box",
  category: "core",
  group: "basic",
  props: {
    styles: Styles({ default: "" }),
    tag: SelectOption({
      title: "Tag",
      default: "div",
      options: [
        { value: "div", title: "div" },
        { value: "header", title: "header" },
        { value: "footer", title: "footer" },
        { value: "section", title: "section" },
        { value: "article", title: "article" },
        { value: "aside", title: "aside" },
        { value: "main", title: "main" },
        { value: "nav", title: "nav" },
        { value: "figure", title: "figure" },
        { value: "details", title: "details" },
        { value: "summary", title: "summary" },
        { value: "dialog", title: "dialog" },
        { value: "strike", title: "strike" },
        { value: "caption", title: "caption" },
        { value: "legend", title: "legend" },
        { value: "figcaption", title: "figcaption" },
        { value: "mark", title: "mark" },
      ],
    }),
    backgroundImage: Image({ title: "Background Image" }),
  },
  canAcceptBlock: () => true,
};

export { Component, Config };
