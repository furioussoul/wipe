import { useAtom } from "jotai";
import { canvasSettingsAtom } from "../atoms/ui.ts";

export const useCanvasSettings = () => {
  return useAtom(canvasSettingsAtom);
};
