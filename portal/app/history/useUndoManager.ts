import UndoManager from "undo-manager";
import { useEffect } from "react";
import { noop } from "lodash-es";
import { useAtom } from "jotai";
import { builderSaveStateAtom } from "../hooks/useSavePage.ts";
import { useBuilderProp } from "../hooks";

const undoManager = new UndoManager();
undoManager.setLimit(50);

const useUndoManager = () => {
  const [, setSaveState] = useAtom(builderSaveStateAtom);
  const emitSaveState = useBuilderProp("onSaveStateChange", noop);
  useEffect(() => {
    undoManager.setCallback(() => {
      setSaveState("UNSAVED");
      emitSaveState("UNSAVED");
    });
    return () => {
      undoManager.setCallback(noop);
    };
  }, []);

  return {
    add: undoManager.add,
    undo: undoManager.undo,
    redo: undoManager.redo,
    hasRedo: undoManager.hasRedo,
    hasUndo: undoManager.hasUndo,
    clear: undoManager.clear,
  };
};

export { useUndoManager };
