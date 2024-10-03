import { CopyIcon, TrashIcon, ScissorsIcon, CardStackPlusIcon, CardStackIcon } from "@radix-ui/react-icons";
import React, { useCallback } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/app/ui";
import {
  useCopyBlockIds,
  useCutBlockIds,
  useDuplicateBlocks,
  usePasteBlocks,
  useRemoveBlocks,
  useSelectedBlock,
  useSelectedBlockIds,
} from "../../../../hooks";
import { canDeleteBlock, canDuplicateBlock } from "../../../../functions/block-helpers";

const CopyPasteBlocks = () => {
  const [selectedIds] = useSelectedBlockIds();
  const { canPaste, pasteBlocks } = usePasteBlocks();
  const [, setCopiedBlockIds] = useCopyBlockIds();

  const selectedBlock = useSelectedBlock();

  return (
    <>
      <ContextMenuItem
        // @ts-ignore
        disabled={!canDuplicateBlock(selectedBlock?._type)}
        onClick={() => setCopiedBlockIds(selectedIds)}
        className="flex items-center gap-x-4 text-xs">
        <CopyIcon /> Copy
      </ContextMenuItem>
      {canPaste(selectedIds[0]) && (
        <ContextMenuItem
          // @ts-ignore
          className="flex items-center gap-x-4 text-xs"
          onClick={() => {
            pasteBlocks(selectedIds);
          }}>
          <CardStackIcon /> Paste
        </ContextMenuItem>
      )}
    </>
  );
};

const CutBlocks = () => {
  const [selectedIds] = useSelectedBlockIds();
  const [, setCutBlockIds] = useCutBlockIds();

  return (
    <ContextMenuItem
      // @ts-ignore

      className="flex items-center gap-x-4 text-xs"
      onClick={() => setCutBlockIds(selectedIds)}>
      <ScissorsIcon /> Cut
    </ContextMenuItem>
  );
};

const RemoveBlocks = () => {
  const [selectedIds] = useSelectedBlockIds();
  const removeBlocks = useRemoveBlocks();
  const selectedBlock = useSelectedBlock();

  return (
    <ContextMenuItem
      // @ts-ignore
      disabled={!canDeleteBlock(selectedBlock?._type)}
      className="flex items-center gap-x-4 text-xs"
      onClick={() => removeBlocks(selectedIds)}>
      <TrashIcon /> Remove
    </ContextMenuItem>
  );
};

const BlockContextMenuContent = () => {
  const [selectedIds] = useSelectedBlockIds();
  const duplicateBlocks = useDuplicateBlocks();
  const selectedBlock = useSelectedBlock();

  const duplicate = useCallback(() => {
    duplicateBlocks(selectedIds);
  }, [selectedIds, duplicateBlocks]);

  return (
    <ContextMenuContent className="text-xs">
      <ContextMenuItem
        disabled={!canDuplicateBlock(selectedBlock?._type)}
        className="flex items-center gap-x-4 text-xs"
        onClick={duplicate}>
        <CardStackPlusIcon /> Duplicate
      </ContextMenuItem>
      <CutBlocks />
      <CopyPasteBlocks />
      <RemoveBlocks />
    </ContextMenuContent>
  );
};

export const BlockContextMenu = ({ children }: { children: React.ReactNode | null; id: any }) => {
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
        <BlockContextMenuContent />
      </ContextMenu>
    </>
  );
};
