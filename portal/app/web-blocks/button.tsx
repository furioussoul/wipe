import * as React from "react";
import { ButtonIcon } from "@radix-ui/react-icons";
import { Icon, Numeric, SelectOption, SingleLineText, Styles } from "@chaibuilder/runtime/controls";
import { ChaiBlock } from "../types/ChaiBlock";

const Component = (
  block: ChaiBlock & {
    blockProps: Record<string, string>;
    styles: Record<string, string>;
  },
) => {
  const { blockProps, iconSize, icon, content, iconPos, styles, children } = block;
  const _icon = icon;

  const child = children || (
    <>
      <span data-ai-key="content">{content}</span>
      {_icon && (
        <div
          style={{ width: iconSize + "px" }}
          className={iconPos + " " + (iconPos === "order-first" ? "mr-2" : "ml-2") || ""}
          dangerouslySetInnerHTML={{ __html: _icon }}
        />
      )}
    </>
  );
  return React.createElement(
    "button",
    {
      ...blockProps,
      ...styles,
      type: "button",
    },
    child,
  );
};

const Config = {
  type: "Button",
  label: "Button",
  category: "core",
  icon: ButtonIcon,
  group: "basic",
  props: {
    content: SingleLineText({ title: "Label", default: "Button" }),
    styles: Styles({ default: "text-white bg-primary px-4 py-2 rounded-global flex items-center" }),
    icon: Icon({ title: "Icon", default: `` }),
    iconSize: Numeric({ title: "Icon Size", default: 24 }),
    iconPos: SelectOption({
      title: "Icon Position",
      default: "order-last",
      options: [
        { title: "Start", value: "order-first" },
        { title: "End", value: "order-last" },
      ],
    }),
  },
};

export { Component, Config };
