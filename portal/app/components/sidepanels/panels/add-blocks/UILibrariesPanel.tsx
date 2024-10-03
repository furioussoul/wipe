import { capitalize, first, get, groupBy, has, isEmpty, map, noop, values } from "lodash-es";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useAddBlock,
  useBuilderProp,
  useHighlightBlockId,
  useSelectedBlockIds,
  useTranslation,
} from "../../../../hooks";
import { syncBlocksWithDefaults, useChaiBlocks } from "@chaibuilder/runtime";
import { Loader } from "lucide-react";
import { atom, useAtom } from "jotai";

import { activePanelAtom } from "../../../../atoms/ui";
import { cn } from "../../../../functions/Functions";
import { CaretRightIcon } from "@radix-ui/react-icons";
import { ScrollArea, Skeleton, Tooltip, TooltipContent, TooltipTrigger } from "@/app/ui";
import { OUTLINE_KEY } from "../../../../constants/STRINGS";
import { UILibrary, UiLibraryBlock } from "../../../../types/chaiBuilderEditorProps";
import { ChaiBlock } from "../../../../types/ChaiBlock";
import { atomWithStorage } from "jotai/utils";
import { UILibrariesSelect } from "./UiLibrariesSelect";

import { draggedBlockAtom } from "../../../canvas/dnd/atoms";
import clsx from "clsx";
import { useFeature } from "flagged";

const BlockCard = ({
  block,
  closePopover,
  library,
}: {
  library: UILibrary;
  // TODO: I think it should be "block: UiLibraryBlock | ChaiBuilderBlock"
  block: UiLibraryBlock;
  closePopover: () => void;
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const getUILibraryBlock = useBuilderProp("getUILibraryBlock", noop);
  const { addCoreBlock, addPredefinedBlock } = useAddBlock();
  const [ids, setSelected] = useSelectedBlockIds();
  const [, setHighlighted] = useHighlightBlockId();
  const name = get(block, "name", get(block, "label"));
  const dnd = useFeature("dnd");
  const [, setDraggedBlock] = useAtom(draggedBlockAtom);

  const isTopLevelSection = (block: ChaiBlock) => {
    const isPageSection = has(block, "styles_attrs.data-page-section");
    return block._type === "Box" && isPageSection;
  };

  const addBlock = useCallback(
    async (e: any) => {
      e.stopPropagation();
      if (has(block, "component")) {
        addCoreBlock(block, first(ids));
        closePopover();
        return;
      }
      setIsAdding(true);
      const uiBlocks = await getUILibraryBlock(library, block);
      let parent = first(ids);
      if (isTopLevelSection(first(uiBlocks))) {
        parent = null;
      }
      if (!isEmpty(uiBlocks)) addPredefinedBlock(syncBlocksWithDefaults(uiBlocks), parent);
      closePopover();
    },
    [block],
  );

  const handleDragStart = async (ev) => {
    const uiBlocks = await getUILibraryBlock(library, block);
    let parent = first(ids);
    if (isTopLevelSection(first(uiBlocks))) {
      parent = null;
    }

    if (!isEmpty(uiBlocks)) {
      const convertedBlock = { blocks: uiBlocks, uiLibrary: true, parent: parent };
      ev.dataTransfer.setData("text/plain", JSON.stringify(convertedBlock));

      if (block.preview) {
        const img = new Image();
        img.src = block.preview;
        img.onload = () => {
          ev.dataTransfer.setDragImage(img, 0, 0);
        };
      } else {
        ev.dataTransfer.setDragImage(new Image(), 0, 0);
      }

      //@ts-ignore
      setDraggedBlock(convertedBlock);
      setTimeout(() => {
        setSelected([]);
        setHighlighted(null);
        closePopover();
      }, 200);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          onClick={isAdding ? () => { } : addBlock}
          draggable={dnd ? "true" : "false"}
          onDragStart={handleDragStart}
          className={clsx(
            "relative mt-2 cursor-pointer overflow-hidden rounded-md border border-gray-300 bg-white duration-200 hover:border-blue-500 hover:shadow-xl",
          )}>
          {isAdding && (
            <div className="absolute flex h-full w-full items-center justify-center bg-black/70">
              <Loader className="animate-spin" size={15} color="white" />
              <span className="pl-2 text-sm text-white">Adding...</span>
            </div>
          )}
          {block.preview ? (
            <img src={block.preview} className="min-h-[25px] w-full rounded-md" alt={name} />
          ) : (
            <div className="flex h-20 items-center justify-center rounded-md border border-border border-gray-300 bg-gray-200">
              <p className="max-w-xs text-center text-sm text-gray-700">{name}</p>
            </div>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
};

const libraryBlocksAtom = atom<{ [uuid: string]: { loading: boolean; blocks: any[] } }>({});

const useLibraryBlocks = (library?: UILibrary) => {
  const [libraryBlocks, setLibraryBlocks] = useAtom(libraryBlocksAtom);
  const getBlocks = useBuilderProp("getUILibraryBlocks", noop);
  const blocks = get(libraryBlocks, `${library?.uuid}.blocks`, []);
  const isLoading = get(libraryBlocks, `${library?.uuid}.loading`, false);
  useEffect(() => {
    (async () => {
      if (isLoading || blocks.length > 0 || !library) return;
      setLibraryBlocks((prev) => ({ ...prev, [library?.uuid]: { loading: true, blocks: [] } }));
      const libraryBlocks: UiLibraryBlock[] = await getBlocks(library);
      setLibraryBlocks((prev) => ({ ...prev, [library?.uuid]: { loading: false, blocks: libraryBlocks || [] } }));
    })();
  }, [library, blocks, isLoading]);

  return { data: blocks, isLoading };
};

const selectedLibraryAtom = atomWithStorage<string | null>("_selectedLibrary", null);
const UILibrarySection = () => {
  const [selectedLibrary, setLibrary] = useAtom(selectedLibraryAtom);
  const uiLibraries = useBuilderProp("uiLibraries", []);
  const registeredBlocks = useChaiBlocks();
  const customBlocks = values(registeredBlocks).filter((block) => block.category === "custom");

  const library = uiLibraries.find((library) => library.uuid === selectedLibrary) || first(uiLibraries);
  const { data: libraryBlocks, isLoading } = useLibraryBlocks(library);

  const mergedGroups = groupBy([...libraryBlocks, ...customBlocks], "group");
  const [selectedGroup, setGroup] = useState("Hero");
  const [, setActivePanel] = useAtom(activePanelAtom);
  const blocks = get(mergedGroups, selectedGroup, []);
  const { t } = useTranslation();
  const timeoutRef = useRef(null);

  const handleMouseEnter = (group: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    timeoutRef.current = setTimeout(() => {
      if (!timeoutRef.current) return;
      setGroup(group);
    }, 300);
  };

  if (isLoading) return <Skeleton className="h-full w-full" />;

  return (
    <>
      <div className="relative flex h-full max-h-full w-[460px] flex-col overflow-hidden bg-background">
        {library?.uuid ? (
          <div className="sticky top-0 flex h-fit flex-col">
            <div className="mb-2 flex flex-col justify-between rounded-md bg-background/30 p-1">
              <h1 className="flex w-full flex-col items-baseline truncate px-1 text-sm font-semibold xl:flex-col">
                <UILibrariesSelect library={library?.uuid} setLibrary={setLibrary} uiLibraries={uiLibraries} />
              </h1>
            </div>
          </div>
        ) : null}
        <div className={"flex h-[95%] border-t border-gray-300 pt-2"}>
          <div className={"flex h-full w-40 flex-col gap-1 px-1"}>
            {React.Children.toArray(
              map(mergedGroups, (_groupedBlocks, group) => (
                <div
                  onMouseEnter={() => handleMouseEnter(group)}
                  onMouseLeave={() => clearTimeout(timeoutRef.current)}
                  key={group}
                  onClick={() => setGroup(group)}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between rounded-md p-1 text-sm transition-all ease-in-out hover:bg-gray-200",
                    group === selectedGroup ? "bg-blue-500 text-white hover:bg-blue-600" : "",
                  )}>
                  <span>{capitalize(group)}</span>
                  <CaretRightIcon className="ml-2 h-5 w-5" />
                </div>
              )),
            )}
          </div>
          <ScrollArea
            onMouseEnter={() => (timeoutRef.current ? clearTimeout(timeoutRef.current) : null)}
            className="z-10 -mt-2 flex h-full max-h-full w-[300px] flex-col gap-2 border-l border-gray-300 transition-all ease-linear">
            <div className="sticky top-0 z-30 border-b border-gray-300 bg-gray-200 p-2 text-[9px] font-light leading-3 text-gray-500">
              {t("Click on a block to add it to the page")}
            </div>
            <div className="flex flex-col gap-2 px-2">
              {React.Children.toArray(
                blocks.map((block: UiLibraryBlock) => (
                  <BlockCard block={block} library={library} closePopover={() => setActivePanel(OUTLINE_KEY)} />
                )),
              )}
            </div>
            <br />
            <br />
            <br />
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

const UILibrariesPanel = () => {
  return <UILibrarySection />;
};

export default UILibrariesPanel;
