
import "react-quill/dist/quill.snow.css";
import "@/app/index.css";
import { DevTools } from "jotai-devtools";
import i18n from "@/app/locales/load";
import { FlagsProvider } from "flagged";
import { useEffect, useMemo } from "react";
import { omit } from "lodash-es";
import { FEATURE_TOGGLES } from "@/app/utils/FEATURE_TOGGLES";
import { chaiBuilderPropsAtom } from "@/app/atoms/builder";
import { ErrorBoundary } from "@/app/components/ErrorBoundary";
import { RootLayout } from "@/app/components/RootLayout";
import { builderStore } from "@/app/atoms/store";
import { Toaster } from "@/app/ui";
import { useBrandingOptions, useBuilderReset } from "@/app/hooks";
import { ChaiBuilderEditorProps } from "@/app/types/chaiBuilderEditorProps";
import { dataProvidersAtom } from "@/app/hooks/usePageDataProviders";
import { useBlocksStore } from "@/app/history/useBlocksStoreUndoableActions";
import { MobileMessage } from "./MobileMessage";
import { setDebugLogs } from "@/app/functions/logging";
import { syncBlocksWithDefaults } from "@chaibuilder/runtime";

const ChaiBuilderComponent = (props: ChaiBuilderEditorProps) => {
  const [, setAllBlocks] = useBlocksStore();
  const [, setBrandingOptions] = useBrandingOptions();
  const reset = useBuilderReset();
  const RootLayoutComponent = useMemo(() => props.customRootLayout || RootLayout, [props.customRootLayout]);

  useEffect(() => {
    builderStore.set(
      // @ts-ignore
      chaiBuilderPropsAtom,
      omit(props, ["blocks", "subPages", "brandingOptions", "dataProviders", "customRootLayout"]),
    );
  }, [props]);

  useEffect(() => {
    builderStore.set(dataProvidersAtom, props.dataProviders || []);
  }, [props.dataProviders]);

  useEffect(() => {
    // @ts-ignore
    setAllBlocks(syncBlocksWithDefaults(props.blocks || []) as ChaiBlock[]);
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.blocks]);

  useEffect(() => {
    i18n.changeLanguage(props.locale || "en");
  }, [props.locale]);

  useEffect(() => {
    setDebugLogs(props.showDebugLogs);
  }, [props.showDebugLogs]);

  useEffect(() => {
    setBrandingOptions(props.brandingOptions);
  }, [props.brandingOptions, setBrandingOptions]);

  return <RootLayoutComponent />;
};

/**
 * ChaiBuilder is the main entry point for the Chai Builder Studio.
 * @param props
 * @constructor
 */
const ChaiBuilderEditor = (props: ChaiBuilderEditorProps) => {
  const _flags = props._flags || {};
  return (
    <ErrorBoundary>
      <FlagsProvider features={{ ...FEATURE_TOGGLES, ..._flags }}>
        <DevTools />
        <ChaiBuilderComponent {...props} />
      </FlagsProvider>
      <Toaster />
    </ErrorBoundary>
  );
};

export { ChaiBuilderEditor };
