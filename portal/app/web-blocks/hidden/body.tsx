import * as React from "react";
import { Image, Styles } from "@chaibuilder/runtime/controls";

const BodyBlock = (
  props: any & {
    children: React.ReactNode;
    styles: any;
    tag: string;
    backgroundImage: string;
    blockProps: Record<string, string>;
  },
) => {
  const { blockProps, backgroundImage, children, styles } = props;

  let cssStyles = {};
  if (backgroundImage) {
    cssStyles = { backgroundImage: `url(${backgroundImage})` };
  }

  return React.createElement("div", { ...blockProps, ...styles, style: cssStyles }, children);
};

const Config = {
  type: "Body",
  label: "Body",
  category: "core",
  group: "basic",
  hidden: true,
  props: {
    styles: Styles({ default: "font-body antialiased" }),
    backgroundImage: Image({ title: "Background Image" }),
  },
  canAcceptBlock: () => true,
  canDelete: () => false,
  canMove: () => false,
  canDuplicate: () => false,
};

export { BodyBlock as Component, Config };
