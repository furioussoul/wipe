import { CursorTextIcon } from "@radix-ui/react-icons";
import { RichText, Styles } from "@chaibuilder/runtime/controls";
import { ChaiBlock } from "../types/ChaiBlock";

/**
 * Heading component
 * @param props
 * @constructor
 */
const RichTextBlock = (
  props: ChaiBlock & {
    blockProps: Record<string, string>;
    styles: Record<string, string>;
  },
) => {
  const { blockProps, content, styles } = props;
  // eslint-disable-next-line react/no-danger
  return (
    <div className="max-w-full">
      <div
        data-ai-key="content"
        data-ai-type={"richtext"}
        {...blockProps}
        {...styles}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

const Config = {
  type: "RichText",
  label: "Rich Text",
  category: "core",
  icon: CursorTextIcon,
  group: "typography",
  props: {
    styles: Styles({ default: "" }),
    content: RichText({
      title: "Content",
      default: "<p>This is a rich text block. You can add text, and other content here.</p>",
    }),
  },
};

export { RichTextBlock as Component, Config };
