import { atomWithStorage } from "jotai/utils";

export const lsBlocksAtom = atomWithStorage("chai-builder-blocks", []);
export const lsBrandingOptionsAtom = atomWithStorage("chai-builder-branding-options", {});
export const lsAiContextAtom = atomWithStorage("chai-builder-ai-context", "");
export const lsProvidersAtom = atomWithStorage("chai-builder-providers", []);

export const lsEmailBlocksAtom = atomWithStorage("chai-builder-blocks-email", []);
