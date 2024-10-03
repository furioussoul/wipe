import { Hr } from "@react-email/components";
import { registerChaiBlock } from "@chaibuilder/runtime";
import { Styles } from "@chaibuilder/runtime/controls";
import { DividerHorizontalIcon } from "@radix-ui/react-icons";

const DividerBlock = ({ blockProps, styles }: any) => {
  return <Hr {...blockProps} {...styles} />;
};

const DividerBuilder = ({ blockProps, styles }: any) => {
  return <hr {...blockProps} {...styles} />;
};

registerChaiBlock(DividerBlock, {
  type: "Email/Divider",
  label: "Divider",
  group: "basic",
  category: "core",
  icon: DividerHorizontalIcon,
  builderComponent: DividerBuilder,
  props: {
    styles: Styles({ default: "w-full h-2" }),
  },
});

export default DividerBlock;
