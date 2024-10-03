import { CodeInline } from "@react-email/components";
import { registerChaiBlock } from "@chaibuilder/runtime";
import { MultilineText, Styles } from "@chaibuilder/runtime/controls";
import { CodeSandboxLogoIcon } from "@radix-ui/react-icons";

const CustomCodeBlock = ({ blockProps, styles, code }: any) => {
  return (
    <CodeInline {...blockProps} {...styles}>
      {code}
    </CodeInline>
  );
};

const CodeBlockBuilder = ({ blockProps, styles, code }: any) => {
  return (
    <code {...blockProps} {...styles}>
      {code}
    </code>
  );
};

registerChaiBlock(CustomCodeBlock, {
  type: "Email/CodeInline",
  label: "Code Inline",
  group: "basic",
  category: "core",
  icon: CodeSandboxLogoIcon,
  builderComponent: CodeBlockBuilder,
  props: {
    styles: Styles({ default: "" }),
    code: MultilineText({ title: "Code", default: "console.log('Hello, world!');" }),
  },
});
