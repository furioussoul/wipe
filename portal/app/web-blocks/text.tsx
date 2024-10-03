import { MultilineText } from "@chaibuilder/runtime/controls";
import { SpaceBetweenVerticallyIcon } from "@radix-ui/react-icons";
import { ChaiBlock } from "../types/ChaiBlock";

const RawTextBlock = (
  props: ChaiBlock & {
    content: string;
    inBuilder: boolean;
    blockProps: Record<string, string>;
  },
) => {
  if (props.inBuilder || props.forceWrapper) {
    return (
      <span data-ai-key={"content"} {...props.blockProps}>
        {props.content}
      </span>
    );
  }
  return `${props.content}`;
};

const Config = {
  type: "Text",
  label: "Text",
  hidden: true,
  category: "core",
  group: "typography",
  icon: SpaceBetweenVerticallyIcon,
  props: {
    content: MultilineText({ title: "Content", defaultValue: "" }),
  },
};

export { RawTextBlock as Component, Config };
