import { useAtom } from "jotai";
import { first, has, isFunction, omit } from "lodash-es";
import { createElement } from "react";
import { BoxIcon } from "@radix-ui/react-icons";
import { activePanelAtom } from "../../../../atoms/ui";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/app/ui";
import { useAddBlock, useHighlightBlockId, useSelectedBlockIds } from "../../../../hooks";
import { syncBlocksWithDefaults } from "@chaibuilder/runtime";
import { OUTLINE_KEY } from "../../../../constants/STRINGS";
import { draggedBlockAtom } from "../../../canvas/dnd/atoms";
import { useFeature } from "flagged";

export const CoreBlock = ({ block }: { block: any }) => {
  const [, setDraggedBlock] = useAtom(draggedBlockAtom);
  const { type, icon, label } = block;
  const { addCoreBlock, addPredefinedBlock } = useAddBlock();
  const [ids, setSelected] = useSelectedBlockIds();
  const [, setHighlighted] = useHighlightBlockId();
  const [, setActivePanel] = useAtom(activePanelAtom);
  const addBlockToPage = () => {
    if (has(block, "blocks")) {
      const blocks = isFunction(block.blocks) ? block.blocks() : block.blocks;
      addPredefinedBlock(syncBlocksWithDefaults(blocks), first(ids));
    } else {
      addCoreBlock(block, first(ids));
    }
    setActivePanel(OUTLINE_KEY);
  };
  const dnd = useFeature("dnd");
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={addBlockToPage}
            type="button"
            onDragStart={(ev) => {
              ev.dataTransfer.setData("text/plain", JSON.stringify(omit(block, ["component", "icon"])));
              ev.dataTransfer.setDragImage(new Image(), 0, 0);
              // @ts-ignore
              setDraggedBlock(omit(block, ["component", "icon"]));
              setTimeout(() => {
                setSelected([]);
                setHighlighted(null);
                setActivePanel(OUTLINE_KEY);
              }, 200);
            }}
            draggable={dnd ? "true" : "false"}
            className={
              "cursor-pointer space-y-2 rounded-lg border border-border p-3 text-center hover:bg-slate-300/50"
            }>
            {createElement(icon || BoxIcon, { className: "w-4 h-4 mx-auto" })}
            <p className="text-xs">{label || type}</p>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label || type}</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
};
