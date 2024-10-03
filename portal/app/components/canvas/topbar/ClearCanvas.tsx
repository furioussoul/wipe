import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { EraserIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@/app/ui";
import { useSelectedBlockIds, useSelectedStylingBlocks } from "../../../hooks";
import { useBlocksStoreUndoableActions } from "../../../history/useBlocksStoreUndoableActions";

export const ClearCanvas = () => {
  const { t } = useTranslation();
  const { setNewBlocks } = useBlocksStoreUndoableActions();
  const [, setIds] = useSelectedBlockIds();
  const [, setStyleIds] = useSelectedStylingBlocks();
  const clearCanvas = useCallback(() => {
    setNewBlocks([]);
    setIds([]);
    setStyleIds([]);
  }, [setNewBlocks]);

  return (
    <div className="flex items-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="ghost" className="flex items-center gap-x-1">
            <EraserIcon /> {t("clear")}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>{t("clear_canvas_title")}</AlertDialogTitle>
            <AlertDialogDescription>{t("clear_canvas_description")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={clearCanvas}>{t("yes")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
