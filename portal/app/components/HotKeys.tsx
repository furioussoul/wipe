import {
  Badge,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/ui";
import { KeyboardIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
import { memo } from "react";

export const HotKeys = memo(() => {
  const { t } = useTranslation();
  const keys: { [key: string]: string } = {
    "ctrl + Z": "Undo",
    "ctrl + Y": "Redo",
    "ctrl + D": "Duplicate",
  };
  const keys2: { [key: string]: string } = {
    // "ctrl + /": "Rename block",
    "ctrl + S": "Save page",
    esc: "Deselect blocks",
    del: "Delete block",
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex w-10 items-center justify-center">
              <KeyboardIcon />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("Keyboard shortcuts")}</p>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{t("Keyboard shortcuts")}</DialogTitle>
        </DialogHeader>
        <div>
          <div className="grid grid-cols-2">
            <div className={"mr-8 flex flex-col space-y-2 border-r border-gray-200"}>
              {Object.keys(keys).map((key) => {
                return (
                  <div key={key} className="flex items-center space-x-4">
                    <Badge variant={"outline"} className={"border border-gray-600 p-1 px-2"}>
                      {t(key)}
                    </Badge>
                    <div>{t(keys[key])}</div>
                  </div>
                );
              })}
            </div>
            <div className={"flex flex-col space-y-2"}>
              {Object.keys(keys2).map((key) => {
                return (
                  <div key={key} className="flex items-center space-x-4">
                    <Badge variant={"outline"} className={"border border-gray-600 p-1 px-2"}>
                      {t(key)}
                    </Badge>
                    <div>{t(keys2[key])}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});
