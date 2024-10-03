'use client'
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { lsAiContextAtom, lsBlocksAtom, lsBrandingOptionsAtom } from "@/app/__dev/atoms-dev";
import PreviewWeb from "./__dev/preview/WebPreview";
import { ChaiBlock, ChaiBuilderEditor } from "@/app/components/editor";
import { loadWebBlocks } from "./web-blocks";
import { getBlocksFromHTML } from "@/app/import-html/html-to-json";
import { useState } from "react";
import { UILibrary, UiLibraryBlock } from "@/app/types/chaiBuilderEditorProps";
import axios from "axios";
import './index.css'

loadWebBlocks();

const PreviewMessage = () => {
  const { t } = useTranslation();
  return (
    <div className={"text-sm font-normal"}>
      {t("dev_mode_message")}{" "}
      <a target={"_blank"} className="text-orange-500 underline" href={"/preview"}>
        /preview
      </a>{" "}
      {t("to_see_page_preview")}
    </div>
  );
};

function ChaiBuilderDefault() {
  const [blocks] = useAtom(lsBlocksAtom);
  const [brandingOptions] = useAtom(lsBrandingOptionsAtom);
  const [aiContext, setAiContext] = useAtom(lsAiContextAtom);
  const [uiLibraries] = useState([
    { uuid: "community-blocks", name: "Community blocks", url: "https://chaibuilder.com/chaiblocks" },
  ]);
  return (
    <ChaiBuilderEditor
      unsplashAccessKey={process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}
      showDebugLogs={true}
      autoSaveSupport={false}
      previewComponent={PreviewWeb}
      topBarComponents={{ left: [PreviewMessage] }}
      blocks={blocks}
      brandingOptions={brandingOptions}
      onSave={async ({ blocks, providers, brandingOptions }: any) => {
        localStorage.setItem("chai-builder-blocks", JSON.stringify(blocks));
        localStorage.setItem("chai-builder-providers", JSON.stringify(providers));
        localStorage.setItem("chai-builder-branding-options", JSON.stringify(brandingOptions));
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return true;
      }}
      saveAiContextCallback={async (aiContext: string) => {
        setAiContext(aiContext);
        return true;
      }}
      aiContext={aiContext}
      askAiCallBack={async (type: "styles" | "content", prompt: string, blocks: ChaiBlock[]) => {
        console.log("askAiCallBack", type, prompt, blocks);
        return new Promise((resolve) => resolve({ error: new Error("Not implemented") }));
      }}
      getUILibraryBlock={async (uiLibrary: UILibrary, uiLibBlock: UiLibraryBlock) => {
        const response = await fetch(uiLibrary.url + "/blocks/" + uiLibBlock.path);
        const html = await response.text();
        const htmlWithoutChaiStudio = html.replace(/---([\s\S]*?)---/g, "");
        return getBlocksFromHTML(`${htmlWithoutChaiStudio}`) as ChaiBlock[];
      }}
      getUILibraryBlocks={async (uiLibrary: UILibrary) => {
        try {
          const response = await axios.get(uiLibrary.url + "/blocks.json");
          const blocks = await response.data;
          return blocks.map((b) => ({ ...b, preview: uiLibrary.url + b.preview }));
        } catch (error) {
          return [];
        }
      }}
      uiLibraries={uiLibraries}
    />
  );
}

export default ChaiBuilderDefault;
