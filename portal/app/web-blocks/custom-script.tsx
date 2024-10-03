import { Code } from "@chaibuilder/runtime/controls";
import { ChaiBlock } from "../types/ChaiBlock";
import { DiJavascript } from "react-icons/di";

const CustomScript = (
  props: ChaiBlock & {
    script: string;
  },
) => {
  const { scripts, inBuilder, blockProps } = props;
  if (inBuilder) return <div {...blockProps}></div>;
  return <div dangerouslySetInnerHTML={{ __html: scripts }}></div>;
};

const Config = {
  type: "CustomScript",
  label: "Custom Script",
  category: "core",
  icon: DiJavascript,
  group: "advanced",
  props: {
    scripts: Code({
      title: "Script",
      default: "",
      placeholder: "<script>console.log('Hello, world!');</script>",
    }),
  },
  canAcceptBlock: () => false,
};

export { CustomScript as Component, Config };
