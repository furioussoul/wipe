import { useAtomValue } from "jotai";
import { readOnlyModeAtom } from "../atoms/ui";

export const useReadOnlyMode = () => useAtomValue(readOnlyModeAtom);
