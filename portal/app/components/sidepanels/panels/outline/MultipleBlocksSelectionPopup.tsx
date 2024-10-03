import { useTranslation } from "react-i18next";
import { CircleBackslashIcon, ClipboardIcon, ScissorsIcon, TrashIcon } from "@radix-ui/react-icons";
import { useCopyBlockIds, useCutBlockIds, useRemoveBlocks, useSelectedBlockIds } from "../../../../hooks";
import { Button, Card } from "@/app/ui";

export const MultipleBlocksSelectionPopup = () => {
  const { t } = useTranslation();
  const [selectedIds, setSelectedIds] = useSelectedBlockIds();
  const [cutIds, setCutIds] = useCutBlockIds();
  const [copyIds, setCopyIds] = useCopyBlockIds();
  const removeBlocks = useRemoveBlocks();
  const { length } = selectedIds;

  if (length <= 1 || cutIds.length > 0 || copyIds.length > 0) {
    return null;
  }

  return (
    <Card className="fixed bottom-10 left-1/2 z-50 mx-auto max-w-xl -translate-x-1/2 rounded-xl p-5 shadow-2xl">
      <p className="mb-2 text-sm">{t("blocks_selected", { length })}</p>

      <div className="flex w-full justify-between">
        <div className="items-stretch space-x-3 sm:flex">
          <Button
            variant="outline"
            onClick={() => setCutIds(selectedIds)}
            size="sm"
            className="flex items-center gap-x-4 border">
            <ScissorsIcon /> {t("cut")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCopyIds(selectedIds)}
            className="flex items-center gap-x-4 border">
            <ClipboardIcon /> {t("copy")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => removeBlocks(selectedIds)}
            className="flex items-center gap-x-4 border">
            <TrashIcon /> {t("delete")}
          </Button>
          <Button
            variant="outline"
            onClick={() => setSelectedIds([])}
            size="sm"
            className="flex items-center gap-x-4 border">
            <CircleBackslashIcon /> {t("clear_selection")}
          </Button>
        </div>
      </div>
    </Card>
  );
};
