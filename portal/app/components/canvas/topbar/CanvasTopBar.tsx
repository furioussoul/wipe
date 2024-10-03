import React from "react";
import { round } from "lodash-es";
import { ZoomInIcon } from "@radix-ui/react-icons";
import { UndoRedo } from "./UndoRedo";
import { Separator } from "@/app/ui";
import { DarkMode } from "./DarkMode";
import { Breakpoints } from "./Breakpoints";
import { ClearCanvas } from "./ClearCanvas";
import { useBuilderProp, useCanvasZoom } from "../../../hooks";
import { AiAssistant } from "./AiAssistant";

const CanvasTopBar: React.FC = () => {
  const darkModeSupport = useBuilderProp("darkMode", true);
  const [zoom] = useCanvasZoom();

  return (
    <div className="flex h-10 items-center justify-between border-b bg-background/70 px-2">
      <div className="flex h-full space-x-2">
        <Breakpoints />
        <Separator orientation="vertical" />
        {darkModeSupport ? (
          <>
            <DarkMode />
            <Separator orientation="vertical" />
          </>
        ) : null}
        <div className="flex w-12 cursor-not-allowed items-center justify-center gap-x-1 space-x-0 font-medium text-gray-400">
          <ZoomInIcon className="h-3.5 w-3.5 flex-shrink-0" />{" "}
          <div className="text-xs leading-3">{round(zoom, 0)}%</div>
        </div>
        <Separator orientation="vertical" />
        <UndoRedo />
      </div>
      <div className="flex h-full items-center space-x-2">
        <ClearCanvas />
        <Separator orientation="vertical" />
        <AiAssistant />
      </div>
    </div>
  );
};

export { CanvasTopBar };
