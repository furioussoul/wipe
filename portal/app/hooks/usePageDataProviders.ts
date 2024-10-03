import { atom, useAtom } from "jotai";

export const dataProvidersAtom = atom([]);
dataProvidersAtom.debugLabel = "dataProvidersAtom";

export const usePageDataProviders = () => {
  return useAtom(dataProvidersAtom);
};
