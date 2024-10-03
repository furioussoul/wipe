import { useHighlightBlockId } from "./useHighlightBlockId";
import { useSelectedBlockIds } from "./useSelectedBlockIds";
import { useSelectedStylingBlocks } from "./useSelectedStylingBlocks";
import { useSetAtom } from "jotai";
import { aiAssistantActiveAtom, historyStatesAtom } from "../atoms/ui";
import { useUndoManager } from "../history/useUndoManager.ts";
import { useAtom } from "jotai/index";

export const useBuilderReset = () => {
  const setNewState = useSetAtom(historyStatesAtom);
  const { clear } = useUndoManager();
  const [, setSelectedIds] = useSelectedBlockIds();
  const [, setHighlighted] = useHighlightBlockId();
  const [, setStylingHighlighted] = useSelectedStylingBlocks();
  const [, setAiAssistantActive] = useAtom(aiAssistantActiveAtom);
  return () => {
    setSelectedIds([]);
    setStylingHighlighted([]);
    setHighlighted("");
    clear();
    setAiAssistantActive(false);
    setNewState({ undoCount: 0, redoCount: 0 });
  };
};
