import { Link } from "@react-email/components";
import { registerChaiBlock } from "@chaibuilder/runtime";
import { Link as link, SingleLineText, Styles } from "@chaibuilder/runtime/controls";
import { Link1Icon } from "@radix-ui/react-icons";
import EmptySlot from "../../web-blocks/empty-slot.tsx";

const LinkBlock = ({ blockProps, styles, href, content, target, children }: any) => {
  return (
    <Link {...blockProps} {...styles} href={href} target={target}>
      {children || content}
    </Link>
  );
};

const LinkBuilder = ({ blockProps, styles, content, children }: any) => {
  let nestedChildren = children;
  if (!children) {
    nestedChildren = <EmptySlot />;
  }
  return (
    <span {...blockProps} {...styles}>
      {nestedChildren ? nestedChildren : content}
    </span>
  );
};

registerChaiBlock(LinkBlock, {
  type: "Email/Link",
  label: "Link",
  group: "basic",
  category: "core",
  icon: Link1Icon,
  blocks: [
    {
      _id: "a",
      _type: "Link",
    },
    {
      _id: "b",
      _parent: "a",
      _type: "RawText",
      content: "I am a link.",
    },
  ],
  builderComponent: LinkBuilder,
  props: {
    content: SingleLineText({ title: "Content", default: "I am a link." }),
    link: link({ title: "Link", default: { href: "https://chaibuilder.com", target: "_blank", type: "url" } }),
    styles: Styles({ default: "font-bold text-blue-500" }),
  },
  canAcceptBlock: () => true,
});

export default LinkBlock;
