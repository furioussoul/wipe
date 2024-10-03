import { useAtomValue } from "jotai";
import { get } from "lodash-es";
import { chaiBuilderPropsAtom } from "../atoms/builder";
import { ChaiBuilderEditorProps } from "../types/chaiBuilderEditorProps";

type ExcludedBuilderProps = "blocks" | "subPages" | "brandingOptions" | "dataProviders";

export const useBuilderProp = <T>(
  propKey:
    | keyof Omit<ChaiBuilderEditorProps, ExcludedBuilderProps>
    | "sideBarComponents.top"
    | "sideBarComponents.bottom"
    | "topBarComponents.left"
    | "topBarComponents.right"
    | "topBarComponents.center"
    | "languages",
  defaultValue: T = undefined,
): T => {
  const builderProps = useAtomValue(chaiBuilderPropsAtom);
  return get(builderProps, propKey, defaultValue);
};
