import { Column, Row } from "@react-email/components";
import { registerChaiBlock } from "@chaibuilder/runtime";
import { SelectOption, Styles } from "@chaibuilder/runtime/controls";
import { ImageIcon } from "@radix-ui/react-icons";
import EmptySlot from "../../web-blocks/empty-slot.tsx";

const RowBlock = ({ blockProps, styles, children }: any) => {
  return (
    <Row {...blockProps} {...styles}>
      {children}
    </Row>
  );
};

registerChaiBlock(RowBlock, {
  type: "Email/Row",
  label: "Row",
  group: "basic",
  category: "core",
  icon: ImageIcon,
  blocks: [
    { _type: "Email/Row", _id: "a" },
    { _type: "Email/Column", _id: "b", _parent: "a" },
  ],
  props: {
    styles: Styles({ default: "" }),
  },
  canAcceptBlock: (type: string) => type === "Email/Column",
});

const ColumnBlock = ({ blockProps, styles, children, align }: any) => {
  let nestedChildren = children;
  if (!children) {
    nestedChildren = <EmptySlot />;
  }

  return (
    <Column {...blockProps} {...styles} align={align}>
      {nestedChildren}
    </Column>
  );
};

registerChaiBlock(ColumnBlock, {
  type: "Email/Column",
  label: "Column",
  group: "basic",
  category: "core",
  icon: ImageIcon,
  props: {
    styles: Styles({ default: "" }),
    align: SelectOption({
      title: "Align",
      default: "",
      options: [
        { value: "", title: "None" },
        { value: "left", title: "left" },
        { value: "center", title: "center" },
        { value: "right", title: "right" },
      ],
    }),
  },
  canAcceptBlock: () => true,
  canBeNested: (type: string) => type === "Email/Row",
});
