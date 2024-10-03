'use client'
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import RjForm from "@rjsf/core";
import { includes } from "lodash-es";
import { getBlockJSONFromSchemas, getBlockJSONFromUISchemas } from "@/app/functions/Controls";
import { BindingWidget } from "@/app/rjsf-widgets/binding";
import { IconPickerField, ImagePickerField, LinkField, RTEField } from "@/app/rjsf-widgets";
import validator from "@rjsf/validator-ajv8";
import { useState } from "react";
import { Checkbox, Link, MultilineText, SelectOption, SingleLineText } from "@chaibuilder/runtime/controls";

const propsSchema: RJSFSchema = { type: "object", properties: {} };
const uiSchema: UiSchema = {};

const properties = {
  name: SingleLineText({ title: "Name", default: "" }),
  area: MultilineText({ title: "Multiline", default: "" }),
  link: Link({ title: "Link", default: { href: "", type: "", target: "" } }),
  select: SelectOption({ title: "Select", options: [{ title: "Select", value: "One" }] }),
  border: Checkbox({ title: "Show Border", default: true }),
};
Object.keys(properties).forEach((key) => {
  const control = properties[key];
  if (includes(["slot", "styles"], control.type)) return;
  const propKey = key;
  propsSchema.properties[propKey] = getBlockJSONFromSchemas(control);
  uiSchema[propKey] = getBlockJSONFromUISchemas(control);
});

function RJSF() {
  const [formData] = useState({});
  return (
    <RjForm
      widgets={{
        binding: BindingWidget,
        richtext: RTEField,
        icon: IconPickerField,
        image: ImagePickerField,
      }}
      fields={{
        link: LinkField,
      }}
      idSeparator="."
      autoComplete="off"
      omitExtraData={false}
      liveOmit={false}
      liveValidate
      validator={validator}
      uiSchema={uiSchema}
      onBlur={() => { }}
      schema={propsSchema}
      formData={formData}
      onChange={() => { }}
    />
  );
}

export default RJSF;
