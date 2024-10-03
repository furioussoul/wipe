import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/ui";
import { cn } from "../../../../functions/Functions";
import { useTranslation } from "react-i18next";
import { UILibrary } from "../../../../types/chaiBuilderEditorProps";

export function UILibrariesSelect({
  uiLibraries,
  library,
  setLibrary,
}: {
  library?: string;
  uiLibraries: UILibrary[];
  setLibrary: (library: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  if (!library) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-x-2">
          <span>{t("Choose Library")}</span>
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between">
            {library ? uiLibraries.find((uiLibrary) => uiLibrary.uuid === library)?.name : t("Select library")}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search library..." className="h-9" />
          <CommandList>
            <CommandEmpty>No library found.</CommandEmpty>
            <CommandGroup>
              {uiLibraries.map((uiLibrary) => (
                <CommandItem
                  key={uiLibrary.uuid}
                  value={uiLibrary.uuid}
                  onSelect={(currentValue) => {
                    setLibrary(currentValue);
                    setOpen(false);
                  }}>
                  {uiLibrary.name}
                  <CheckIcon
                    className={cn("ml-auto h-4 w-4", library === uiLibrary.uuid ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
