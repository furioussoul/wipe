import { atom } from "jotai";
import { TreeApi } from "react-arborist";
import { atomWithStorage } from "jotai/utils";

export const readOnlyModeAtom: any = atom<boolean>(false);
readOnlyModeAtom.debugLabel = "readOnlyModeAtom";

export const networkModeAtom: any = atom<string>("online");
networkModeAtom.debugLabel = "networkModeAtom";

/**
 * @atom
 * Stores the id of the layer that is currently being edited
 */
export const editLayerNameAtom: any = atom(false);
editLayerNameAtom.debugLabel = "editLayerNameAtom";

export const activeLanguageAtom: any = atom("");
activeLanguageAtom.debugLabel = "activeLanguageAtom";

export const primaryLanguageAtom: any = atom("");
primaryLanguageAtom.debugLabel = "primaryLanguageAtom";

export const canvasIframeAtom: any = atom<HTMLIFrameElement | null>(null);
canvasIframeAtom.debugLabel = "canvasIframeAtom";

export const activePanelAtom = atom<string>("outline");
activePanelAtom.debugLabel = "activePanelAtom";

export const showPredefinedBlockCategoryAtom = atom("");
showPredefinedBlockCategoryAtom.debugLabel = "showPredefinedBlockCategoryAtom";

export const historyStatesAtom = atom<{ undoCount: number; redoCount: number }>({ undoCount: 0, redoCount: 0 });
historyStatesAtom.debugLabel = "historyStatesAtom";

export const inlineEditingActiveAtom = atom("");
inlineEditingActiveAtom.debugLabel = "inlineEditingActiveAtom";

export const draggingFlagAtom = atom(false);
draggingFlagAtom.debugLabel = "draggingFlagAtom";

export const treeRefAtom = atom<TreeApi<any> | null>(null);
treeRefAtom.debugLabel = "treeRefAtom";

export const canvasSettingsAtom = atom({});
canvasSettingsAtom.debugLabel = "canvasSettingsAtom";

export const aiAssistantActiveAtom = atom(false);
aiAssistantActiveAtom.debugLabel = "askAiActiveBlockAtom";

export const codeEditorOpenAtom = atom(false);
codeEditorOpenAtom.debugLabel = "codeEditorOpenAtom";

export const codeEditorHeightAtom = atomWithStorage("codeEditorHeight", 500);
codeEditorHeightAtom.debugLabel = "codeEditorHeightAtom";

export const xShowBlocksAtom = atom<string[]>([]);
xShowBlocksAtom.debugLabel = "xShowBlocksAtom";
