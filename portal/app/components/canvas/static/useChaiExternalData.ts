import { useAtom } from "jotai";
import { chaiExternalDataAtom } from "../../../atoms/builder";

export const useChaiExternalData = () => useAtom(chaiExternalDataAtom);
