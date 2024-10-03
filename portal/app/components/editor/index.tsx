import { ChaiBlock } from "@/app/types/ChaiBlock";
import { ChaiBuilderEditorProps } from "@/app/types/chaiBuilderEditorProps";
import ChaiBuilderCanvas from "@/app/components/canvas/static/StaticCanvas";
import ThemeOptions from "@/app/components/sidepanels/panels/theming/ThemeConfigPanel";
import Outline from "@/app/components/sidepanels/panels/outline/treeview/ListTree";
import ImportHTML from "@/app/components/sidepanels/panels/add-blocks/ImportHTML";
import BlockPropsEditor from "@/app/components/settings/BlockSettings";
import BlockStyleEditor from "@/app/components/settings/BlockStyling";
import UILibrariesPanel from "@/app/components/sidepanels/panels/add-blocks/UILibrariesPanel";
import i18n from "@/app/locales/load";

export { AISetContext, AIUserPrompt } from "@/app/components/AskAi";
export { BlockAttributesEditor } from "@/app/components/settings/new-panel/BlockAttributesEditor";
export { ChaiBuilderEditor } from "./ChaiBuilderEditor";
export { DarkMode as DarkModeSwitcher } from "@/app/components/canvas/topbar/DarkMode";
export { Breakpoints as ScreenSizes } from "@/app/components/canvas/topbar/Breakpoints";
export { UndoRedo } from "@/app/components/canvas/topbar/UndoRedo";
export {
    ChaiBuilderCanvas,
    ThemeOptions,
    Outline,
    ImportHTML,
    BlockPropsEditor,
    BlockStyleEditor,
    i18n,
    UILibrariesPanel as UILibraries,
};
export * from "@/app/hooks";
export { generateUUID as generateBlockId, cn as mergeClasses } from "@/app/functions/Functions";
export { getBlocksFromHTML } from "@/app/import-html/html-to-json";
export type { ChaiBlock, ChaiBuilderEditorProps };
