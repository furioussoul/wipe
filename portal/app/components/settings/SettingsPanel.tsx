import React, { useState } from "react";
import { isNull } from "lodash-es";
import { useTranslation } from "react-i18next";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import BlockSettings from "./BlockSettings";
import BlockStyling from "./BlockStyling";
import { useSelectedBlock } from "../../hooks";
import { ErrorBoundary } from "../ErrorBoundary";
import { BlockAttributesEditor } from "./new-panel/BlockAttributesEditor";
import { ChevronDown } from "lucide-react";

const SettingsPanel: React.FC = () => {
  const selectedBlock = useSelectedBlock();
  const { t } = useTranslation();
  const [showAttributes, setShowAttributes] = useState(true);

  if (isNull(selectedBlock))
    return (
      <div className="p-4 text-center">
        <div className="space-y-4 rounded-xl p-4">
          <MixerHorizontalIcon className="mx-auto text-3xl" />
          <h1>{t("no_block_selected_for_styling")}</h1>
        </div>
      </div>
    );

  return (
    <ErrorBoundary>
      <div className={"relative flex w-full flex-col px-2 pr-4"}>
        <BlockSettings />
        <BlockStyling />

        <div
          onClick={() => setShowAttributes(!showAttributes)}
          className="flex cursor-default items-center justify-between border-b border-gray-300 py-2 text-sm font-bold hover:bg-gray-50">
          <span>Attributes</span>
          <span>
            <ChevronDown className={"h-4 w-4 text-gray-500 " + (showAttributes ? "rotate-180" : "")} />
          </span>
        </div>
        {showAttributes && <BlockAttributesEditor />}
        <br />
        <br />
        <br />
      </div>
    </ErrorBoundary>
  );
};

export default SettingsPanel;
