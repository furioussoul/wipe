import { useBuilderProp } from "./useBuilderProp";

export const useUILibraryBlocks = () => {
  const uiLibraries = useBuilderProp("uiLibraries", []);
  return { data: uiLibraries, isLoading: false };
};
