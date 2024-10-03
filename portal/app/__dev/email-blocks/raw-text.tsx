import { registerChaiBlock } from "@chaibuilder/runtime";
import { MultilineText } from "@chaibuilder/runtime/controls";
import { TextIcon } from "@radix-ui/react-icons";

const TextBlock = ({ content }: any) => {
  return content;
};

const TextBlockBuilder = ({ content, blockProps }: any) => {
  return <span {...blockProps}>{content}</span>;
};

registerChaiBlock(TextBlock, {
  type: "Email/RawText",
  label: "Raw Text",
  group: "basic",
  category: "core",
  icon: TextIcon,
  hidden: true,
  builderComponent: TextBlockBuilder,
  props: {
    content: MultilineText({
      title: "Content",
      default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. ",
    }),
  },
});

export default TextBlock;
