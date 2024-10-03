import { Section } from "@react-email/components";
import { registerChaiBlock } from "@chaibuilder/runtime";
import { SelectOption } from "@chaibuilder/runtime/controls";
import { ImageIcon } from "@radix-ui/react-icons";

const SectionBlock = ({ blockProps, styles, children }: any) => {
  return (
    <Section {...blockProps} {...styles}>
      {children}
    </Section>
  );
};

registerChaiBlock(SectionBlock, {
  type: "Email/Section",
  label: "Section",
  group: "basic",
  category: "core",
  icon: ImageIcon,
  props: {
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
});
