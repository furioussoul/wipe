import { Container } from "@react-email/components";
import { registerChaiBlock } from "@chaibuilder/runtime";
import EmptySlot from "../../web-blocks/empty-slot.tsx";

const ContainerBlock = ({ blockProps, styles, children, inBuilder }) => {
  let nestedChildren = children;
  if (!children) {
    nestedChildren = <EmptySlot inBuilder={inBuilder} />;
  }
  return (
    <Container {...blockProps} {...styles}>
      {nestedChildren}
    </Container>
  );
};

registerChaiBlock(ContainerBlock, {
  type: "Email/Container",
  label: "Container",
  group: "basic",
  category: "core",
  canAcceptBlock: () => true,
  canMove: () => true,
  canDelete: () => false,
  canDuplicate: () => false,
  canBeNested: (parentType?: string) => !parentType,
});
