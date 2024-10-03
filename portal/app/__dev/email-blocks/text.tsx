import { Text } from "@react-email/components";
import { registerChaiBlock } from "@chaibuilder/runtime";
import { MultilineText, Styles } from "@chaibuilder/runtime/controls";
import { TextIcon } from "@radix-ui/react-icons";

const TextBlock = ({ blockProps, styles, content }: any) => {
  return (
    <Text {...blockProps} {...styles}>
      {content}
    </Text>
  );
};

const TextBlockBuilder = ({ content, blockProps, styles }: any) => {
  return (
    <p {...blockProps} {...styles}>
      {content}
    </p>
  );
};

registerChaiBlock(TextBlock, {
  type: "Email/Text",
  label: "Text",
  group: "basic",
  category: "core",
  icon: TextIcon,
  builderComponent: TextBlockBuilder,
  props: {
    content: MultilineText({
      title: "Content",
      default:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.",
    }),
    styles: Styles({ default: "" }),
  },
  canAcceptBlock: (blockType: string) => ["Email/Link", "Email/RawText"].includes(blockType),
});

export default TextBlock;
