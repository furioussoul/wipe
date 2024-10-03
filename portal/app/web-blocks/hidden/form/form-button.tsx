import { ButtonIcon } from "@radix-ui/react-icons";
import { Icon, SelectOption, SingleLineText, Styles } from "@chaibuilder/runtime/controls";
import { generateUUID } from "../../../functions/Functions";
import { ChaiBlock } from "../../../types/ChaiBlock";

const FormButtonBlock = (
  block: ChaiBlock & {
    blockProps: Record<string, string>;
    styles: Record<string, string>;
    inputStyles: Record<string, string>;
  },
) => {
  const { blockProps, inBuilder, label, styles, inputStyles, icon, iconPos } = block;
  const fieldId = generateUUID();

  // alpine js attrs
  const attrs = {
    "x-bind:disabled": "formLoading",
  };

  return (
    <button
      id={fieldId}
      {...attrs}
      {...inputStyles}
      {...styles}
      {...(blockProps || {})}
      type={inBuilder ? "button" : "submit"}>
      {label}
      {icon && <span className={iconPos} dangerouslySetInnerHTML={{ __html: icon }} />}
    </button>
  );
};

const Config = {
  type: "FormButton",
  label: "Submit Button",
  category: "core",
  icon: ButtonIcon,
  group: "form",
  hidden: true,
  props: {
    label: SingleLineText({ title: "Label", default: "Submit" }),
    styles: Styles({
      default: "text-white bg-primary disabled:bg-gray-400 px-4 py-2 rounded-global flex items-center gap-x-2",
    }),
    icon: Icon({ title: "Icon", default: "" }),
    iconPos: SelectOption({
      title: "Icon Position",
      default: "order-last",
      options: [
        { title: "Start", value: "order-first" },
        { title: "End", value: "order-last" },
      ],
    }),
  },
};

export { FormButtonBlock as Component, Config };
