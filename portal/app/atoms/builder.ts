import { atom } from "jotai";
import { ChaiBuilderEditorProps } from "../types/chaiBuilderEditorProps";

export const chaiBuilderPropsAtom = atom<Omit<
  ChaiBuilderEditorProps,
  "blocks" | "globalBlocks" | "brandingOptions"
> | null>(null);
chaiBuilderPropsAtom.debugLabel = "chaiBuilderPropsAtom";

export const chaiExternalDataAtom = atom({});
chaiExternalDataAtom.debugLabel = "chaiExternalDataAtom";
