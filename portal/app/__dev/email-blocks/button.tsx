import { Button } from "@react-email/components";
import { registerChaiBlock } from "@chaibuilder/runtime";
import { Link, SingleLineText, Styles } from "@chaibuilder/runtime/controls";

const ButtonBlock = ({ blockProps, styles, link, content }: any) => {
  return (
    <Button {...blockProps} {...styles} href={link.href}>
      {content}
    </Button>
  );
};

const ButtonBuilder = ({ blockProps, styles, content }: any) => {
  return (
    <button type={"button"} {...blockProps} {...styles}>
      {content}
    </button>
  );
};

registerChaiBlock(ButtonBlock, {
  type: "Email/Button",
  label: "Button",
  group: "basic",
  category: "core",
  builderComponent: ButtonBuilder,
  props: {
    content: SingleLineText({ title: "Content", default: "Click me" }),
    link: Link({ title: "Link", default: { href: "https://chaibuilder.com", target: "_blank", type: "url" } }),
    styles: Styles({ default: "bg-primary text-white px-4 py-2 rounded-md" }),
  },
});

export default ButtonBlock;
