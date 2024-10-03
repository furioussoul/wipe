import { atom, useAtom } from "jotai";

type CodeEditorProps = {
  blockId: string;
  blockProp: string;
  initialCode: string;
  placeholder?: string;
};

const codeEditorAtom = atom<CodeEditorProps | null>(null);

export const useCodeEditor = () => {
  return useAtom(codeEditorAtom);
};
