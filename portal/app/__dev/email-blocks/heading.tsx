import { Heading } from "@react-email/components";
import { registerChaiBlock } from "@chaibuilder/runtime";
import { SelectOption, SingleLineText, Styles } from "@chaibuilder/runtime/controls";
import { HeadingIcon } from "@radix-ui/react-icons";

const HeadingBlock = ({ level, blockProps, styles, content }: any) => {
  return (
    <Heading as={level} {...blockProps} {...styles}>
      {content}
    </Heading>
  );
};

const HeadingBuilder = ({ blockProps, styles, content }: any) => {
  return (
    <h1 {...blockProps} {...styles}>
      {content}
    </h1>
  );
};

registerChaiBlock(HeadingBlock, {
  type: "Email/Heading",
  label: "Heading",
  group: "basic",
  category: "core",
  icon: HeadingIcon,
  builderComponent: HeadingBuilder,
  props: {
    content: SingleLineText({ title: "Content", default: "Enter your heading here..." }),
    styles: Styles({ default: "text-xl" }),
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
  },
  canAcceptBlock: (blockType: string) => ["Email/Link", "Email/RawText"].includes(blockType),
});

export default HeadingBlock;
