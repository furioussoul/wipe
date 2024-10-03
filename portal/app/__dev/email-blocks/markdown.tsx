import { Markdown } from "@react-email/components";
import { registerChaiBlock } from "@chaibuilder/runtime";
import { MultilineText } from "@chaibuilder/runtime/controls";

const MarkdownBlock = ({ blockProps, content }) => {
  return <Markdown children={content} {...blockProps}></Markdown>;
};

registerChaiBlock(MarkdownBlock, {
  type: "Email/Markdown",
  label: "Markdown",
  group: "basic",
  category: "core",
  props: {
    content: MultilineText({ default: "# This is a ~~strikethrough~~", title: "Markdown" }),
  },
});

export default MarkdownBlock;
