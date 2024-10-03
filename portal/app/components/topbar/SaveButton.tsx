import { useMemo } from "react";
import { Button } from "@/app/ui";
import { useBuilderProp, useSavePage, useTranslation } from "../../hooks";
import { FaCircleCheck } from "react-icons/fa6";

export const SaveButton = () => {
  const { savePage, saveState } = useSavePage();
  const { t } = useTranslation();
  const hideButton = useBuilderProp("hideSaveButton", false);

  const classes = useMemo(() => {
    switch (saveState) {
      case "SAVING":
        return "animate-pulse bg-gray-300 text-gray-900";
      case "SAVED":
        return "bg-green-500 text-white hover:bg-green-600 hover:text-white";
      default:
        return "bg-gray-200 text-gray-500 hover:bg-gray-100";
    }
  }, [saveState]);

  if (hideButton) {
    return null;
  }

  const button = (
    <Button
      disabled={saveState === "SAVING"}
      onClick={(e) => {
        e.preventDefault();
        savePage();
      }}
      className={`flex h-auto w-fit items-center gap-x-2 rounded-full p-1.5 px-3 ${classes}`}
      size="sm"
      variant="outline">
      <FaCircleCheck className={"text-lg"} />
      <span className={"text-sm"}>
        {saveState === "SAVING" ? "Saving..." : saveState === "SAVED" ? t("Saved") : t("Unsaved")}
      </span>
    </Button>
  );
  return <div className="flex items-center">{button}</div>;
};
