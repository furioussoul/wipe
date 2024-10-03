import Editor from "@monaco-editor/react";
import { Button } from "@/app/ui";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { useCodeEditor, useSelectedBlockIds, useUpdateBlocksProps, useUpdateBlocksPropsRealtime } from "../../../hooks";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useThrottledCallback } from "@react-hookz/web";

/**
 * Try to fix the HTML code
 * @param html
 */
const sanitizeHTML = (html: string) => {
  const doc = document.createElement("div");
  doc.innerHTML = html;
  return doc.innerHTML;
};

export default function CodeEditor() {
  const { t } = useTranslation();
  const [dirty, setDirty] = useState(false);
  const [code, setCode] = useState("");
  const [codeEditor, setCodeEditor] = useCodeEditor();
  const [ids] = useSelectedBlockIds();
  const updateBlockProps = useUpdateBlocksProps();
  const updateRealTime = useUpdateBlocksPropsRealtime();
  const saveCodeContentRealTime = useThrottledCallback(
    (value: string) => {
      const html = sanitizeHTML(value);
      updateRealTime([codeEditor.blockId], { [codeEditor.blockProp]: html });
    },
    [],
    300,
  );

  const saveCodeContent = useCallback(() => {
    if (dirty) {
      const html = sanitizeHTML(code);
      updateBlockProps([codeEditor.blockId], { [codeEditor.blockProp]: html });
    }
  }, [dirty, code]);

  useEffect(() => {
    if (!ids.includes(codeEditor?.blockId)) {
      saveCodeContent();
      // @ts-ignore
      setCodeEditor(null);
    }
  }, [ids]);

  const handleClickOutside = () => {
    // @ts-ignore
    setCodeEditor(null);
  };

  return (
    <div className="h-full rounded-t-lg border-t-4 border-black bg-black text-white">
      <button onClick={handleClickOutside} className="fixed inset-0 z-[100000] cursor-default bg-gray-400/20"></button>
      <div className="relative z-[100001] h-full w-full flex-col gap-y-1">
        <div className="-mt-1 flex items-center justify-between px-2 py-2">
          <h3 className="space-x-3 text-sm font-semibold">
            <span>{t("HTML Code Editor |")}</span>
            <span className="text-xs text-gray-400">
              {t("Scripts will be only executed in preview and live mode.")}
            </span>
          </h3>
          <div className="flex gap-x-2">
            <Button
              // @ts-ignore
              onClick={() => setCodeEditor(null)}
              size={"sm"}
              variant={"destructive"}
              className={"h-6 w-fit"}>
              <Cross2Icon />
            </Button>
          </div>
        </div>
        <Editor
          onMount={(editor) => {
            editor.setValue(codeEditor.initialCode);
          }}
          onChange={(value) => {
            setDirty(true);
            setCode(value);
            saveCodeContentRealTime(value);
          }}
          height="100%"
          defaultLanguage="html"
          theme={"vs-dark"}
          defaultValue={""}
          options={{
            minimap: {
              enabled: false,
            },
          }}
        />
      </div>
    </div>
  );
}
