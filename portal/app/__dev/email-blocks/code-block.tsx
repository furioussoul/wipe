import { CodeBlock } from "@react-email/components";
import { registerChaiBlock } from "@chaibuilder/runtime";
import { Checkbox, MultilineText, SelectOption, SingleLineText, Styles } from "@chaibuilder/runtime/controls";
import { CodeSandboxLogoIcon } from "@radix-ui/react-icons";

const CustomCodeBlock = ({ blockProps, styles, code, lineNumbers, theme, language }: any) => {
  return (
    <CodeBlock {...blockProps} {...styles} code={code} linenumbers={lineNumbers} theme={theme} language={language} />
  );
};

const CodeBlockBuilder = ({ blockProps, styles, code }: any) => {
  return (
    <div {...blockProps} {...styles}>
      <code>{code}</code>
    </div>
  );
};

registerChaiBlock(CustomCodeBlock, {
  type: "Email/CodeBlock",
  label: "Code Block",
  group: "basic",
  category: "core",
  hidden: true,
  icon: CodeSandboxLogoIcon,
  builderComponent: CodeBlockBuilder,
  props: {
    styles: Styles({ default: "" }),
    code: MultilineText({ title: "Code", default: "console.log('Hello, world!');" }),
    theme: SingleLineText({ title: "Theme", default: "dracula" }),
    lineNumbers: Checkbox({
      title: "Line number",
      default: false,
    }),
    language: SelectOption({
      title: "Language",
      default: "javascript",
      binding: false,
      options: [
        { value: "javascript", title: "JavaScript" },
        { value: "html", title: "HTML" },
        { value: "css", title: "CSS" },
        //add more options
      ],
    }),
  },
});

export default CustomCodeBlock;
