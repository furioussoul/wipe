import { useThrottledCallback } from "@react-hookz/web";
import { atom, useAtom } from "jotai";
import { useGetPageData } from "./useGetPageData";
import { useBuilderProp } from "./useBuilderProp";
import { usePageDataProviders } from "./usePageDataProviders.ts";
import { useBrandingOptions } from "./useBrandingOptions.ts";
import { noop } from "lodash-es";

export const builderSaveStateAtom = atom<"SAVED" | "UNSAVED" | "SAVING">("SAVED"); // SAVING
builderSaveStateAtom.debugLabel = "builderSaveStateAtom";

export const useSavePage = () => {
  const [saveState, setSaveState] = useAtom(builderSaveStateAtom);
  const onSavePage = useBuilderProp("onSavePage", async (_args) => {});
  const onSave = useBuilderProp("onSave", async (_args) => {});
  const onSaveStateChange = useBuilderProp("onSaveStateChange", noop);
  const getPageData = useGetPageData();
  const [providers] = usePageDataProviders();
  const [brandingOptions] = useBrandingOptions();

  const savePage = useThrottledCallback(
    async () => {
      setSaveState("SAVING");
      onSaveStateChange("SAVING");
      const pageData = getPageData();
      await onSavePage({ blocks: pageData.blocks, providers });
      await onSave({ blocks: pageData.blocks, providers, brandingOptions, themeConfiguration: brandingOptions });
      setTimeout(() => {
        setSaveState("SAVED");
        onSaveStateChange("SAVED");
      }, 100);
      return true;
    },
    [getPageData, setSaveState, brandingOptions, onSave, onSaveStateChange],
    3000, // save only every 5 seconds
  );

  return { savePage, saveState, setSaveState };
};
