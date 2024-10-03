import { DropdownMenuIcon } from "@radix-ui/react-icons";
import { get, map } from "lodash-es";
import { Checkbox, List, SingleLineText, Styles } from "@chaibuilder/runtime/controls";
import { ChaiBlock } from "../../../types/ChaiBlock";
import { generateUUID } from "../../../functions/Functions";

const SelectBlock = (
  block: ChaiBlock & {
    blockProps: Record<string, string>;
    styles: Record<string, string>;
    inputStyles: Record<string, string>;
    required: boolean;
    options: { label: string; value: string }[];
  },
) => {
  const {
    blockProps,
    fieldName,
    label,
    placeholder,
    styles,
    inputStyles,
    required,
    showLabel,
    _multiple = false,
  } = block;
  const fieldId = generateUUID();

  if (!showLabel) {
    return (
      <select
        id={fieldId}
        {...styles}
        {...blockProps}
        required={required}
        multiple={_multiple as boolean}
        name={fieldName}>
        <option value="" disabled selected hidden>
          {placeholder}
        </option>
        {map(block.options, (option) => (
          <option
            selected={get(option, "selected", false)}
            key={option.value}
            value={option.value}
            dangerouslySetInnerHTML={{ __html: option.label }}
          />
        ))}
      </select>
    );
  }

  return (
    <div {...styles}>
      {showLabel && <label htmlFor={fieldId}>{label}</label>}
      <select {...inputStyles} id={fieldId} required={required} multiple={_multiple as boolean} name={fieldName}>
        <option value="" disabled selected hidden>
          {placeholder}
        </option>
        {map(block.options, (option) => (
          <option
            key={option.value}
            selected={get(option, "selected", false)}
            value={option.value}
            dangerouslySetInnerHTML={{ __html: option.label }}
          />
        ))}
      </select>
    </div>
  );
};

const Config = {
  type: "Select",
  label: "Select",
  category: "core",
  icon: DropdownMenuIcon,
  group: "form",
  hidden: true,
  props: {
    styles: Styles({ default: "" }),
    fieldName: SingleLineText({ title: "Field Name", default: "select" }),
    showLabel: Checkbox({ title: "Show label", default: true }),
    inputStyles: Styles({ default: "w-full p-1" }),
    label: SingleLineText({ title: "Label", default: "Label" }),
    placeholder: SingleLineText({
      title: "Placeholder",
      default: "Placeholder",
    }),
    required: Checkbox({ title: "Required", default: false }),
    _multiple: Checkbox({ title: "Multiple Choice", default: false }),
    options: List({
      title: "Options",
      itemProperties: {
        label: SingleLineText({ title: "Label", default: "" }),
        value: SingleLineText({ title: "Value", default: "" }),
      },
    }),
  },
};

export { SelectBlock as Component, Config };
