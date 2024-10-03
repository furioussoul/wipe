import { atom } from "jotai";
import { ChaiBlock } from "@/app/types/ChaiBlock";

export const draggedBlockAtom = atom<ChaiBlock | null>(null);

export const dropTargetBlockIdAtom = atom<string | null>(null);
