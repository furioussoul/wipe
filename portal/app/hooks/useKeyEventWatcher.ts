import { useHotkeys } from "react-hotkeys-hook";
import { useSelectedBlockIds } from "./useSelectedBlockIds";
import { useRemoveBlocks } from "./useRemoveBlocks";
import { useDuplicateBlocks } from "./useDuplicateBlocks";
import { useUndoManager } from "../history/useUndoManager.ts";
import { useCutBlockIds } from "./useCutBlockIds.ts";
import { useCopyBlockIds } from "./useCopyBlockIds.ts";
import { usePasteBlocks } from "./usePasteBlocks.ts";

export const useKeyEventWatcher = (doc?: Document) => {
  const [ids, setIds] = useSelectedBlockIds();
  const removeBlocks = useRemoveBlocks();
  const duplicateBlocks = useDuplicateBlocks();
  const { undo, redo } = useUndoManager();
  const [, setCutBlockIds] = useCutBlockIds();
  const [, setCopyBlockIds] = useCopyBlockIds();
  const { canPaste, pasteBlocks } = usePasteBlocks();

  useHotkeys("ctrl+z,command+z", () => undo(), {}, [undo]);
  useHotkeys("ctrl+y,command+y", () => redo(), {}, [redo]);
  useHotkeys("ctrl+x,command+x", () => setCutBlockIds(ids), {}, [ids, setCutBlockIds]);
  useHotkeys("ctrl+c,command+c", () => setCopyBlockIds(ids), {}, [ids, setCopyBlockIds]);
  useHotkeys(
    "ctrl+v,command+v",
    () => {
      if (canPaste(ids[0])) {
        pasteBlocks(ids);
      }
    },
    {},
    [ids, canPaste, pasteBlocks],
  );

  const options = doc ? { document: doc } : {};
  useHotkeys("esc", () => setIds([]), options, [setIds]);
  useHotkeys("ctrl+d,command+d", () => duplicateBlocks(ids), { ...options, preventDefault: true }, [
    ids,
    duplicateBlocks,
  ]);
  useHotkeys(
    "del, backspace",
    (event: any) => {
      event.preventDefault();
      removeBlocks(ids);
    },
    options,
    [ids, removeBlocks],
  );
};
