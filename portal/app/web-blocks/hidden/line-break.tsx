import * as React from "react";
import { Styles } from "@chaibuilder/runtime/controls";
import { SpaceBetweenVerticallyIcon } from "@radix-ui/react-icons";
import { ChaiBlock } from "../../types/ChaiBlock";

const LineBreakComponent = (props: ChaiBlock & { styles: any; blockProps: Record<string, string> }) => {
  const { blockProps, styles } = props;
  return React.createElement("br", { ...blockProps, ...styles });
};

const Config = {
  type: "LineBreak",
  label: "Line Break",
  category: "core",
  group: "basic",
  hidden: true,
  icon: SpaceBetweenVerticallyIcon,
  props: {
    styles: Styles({ default: "" }),
  },
};

export { LineBreakComponent as Component, Config };
