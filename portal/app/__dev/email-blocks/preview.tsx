import { Preview } from "@react-email/components";
import { registerChaiBlock } from "@chaibuilder/runtime";
import { MultilineText } from "@chaibuilder/runtime/controls";

const PreviewBlock = ({ blockProps, styles, children }: any) => {
  return (
    <Preview {...blockProps} {...styles}>
      {children}
    </Preview>
  );
};

const PreviewBuilder = ({ blockProps, styles, content }: any) => {
  return (
    <div {...blockProps} {...styles}>
      {content}
    </div>
  );
};

registerChaiBlock(PreviewBlock, {
  type: "Email/Preview",
  label: "Preview",
  group: "basic",
  category: "core",
  builderComponent: PreviewBuilder,
  canAcceptBlock: () => true,
  canDuplicate: () => false,
  props: {
    content: MultilineText({ default: "Preview content", title: "Content" }),
  },
});

export default PreviewBlock;
