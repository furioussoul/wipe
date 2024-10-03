import * as React from "react";
import { GroupIcon } from "@radix-ui/react-icons";
import { RichText, SingleLineText, Styles } from "@chaibuilder/runtime/controls";
import EmptySlot from "../../empty-slot";
import { ChaiBlock } from "../../../types/ChaiBlock";

const FormBlock = (
  props: ChaiBlock & {
    children: React.ReactNode;
    styles: any;
    tag: string;
    inBuilder: boolean;
    blockProps: Record<string, string>;
  },
) => {
  const { blockProps, errorMessage, name, _type, successMessage, action, styles, children } = props;
  let nestedChildren = children;
  if (!children) {
    nestedChildren = <EmptySlot />;
  }

  const alpineAttrs = {
    "x-data": "useForm",
    "x-on:submit.prevent": "post",
  };
  const formResponseAttr = {
    "x-html": "formResponse",
    ":class": "{'text-red-500': formStatus === 'ERROR', 'text-green-500': formStatus === 'SUCCESS'}",
  };
  return (
    <form
      {...alpineAttrs}
      data-error={errorMessage}
      data-success={successMessage}
      method={"post"}
      action={action}
      {...blockProps}
      {...styles}>
      <div {...formResponseAttr}></div>
      <input name={"formname"} type={"hidden"} value={name || _type} />
      {nestedChildren}
    </form>
  );
};

const Config = {
  type: "Form",
  label: "Form",
  category: "core",
  icon: GroupIcon,
  group: "form",
  hidden: true,
  props: {
    styles: Styles({ default: "" }),
    action: SingleLineText({
      title: "Submit URL",
      default: "/api/form/submit",
    }),
    errorMessage: RichText({
      title: "Error Message",
      default: "Something went wrong. Please try again",
    }),
    successMessage: RichText({
      title: "Success Message",
      default: "Thank you for your submission.",
    }),
  },
  canAcceptBlock: () => true,
};

export { FormBlock as Component, Config };
