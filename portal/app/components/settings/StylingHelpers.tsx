import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  ScrollArea,
} from "@/app/ui";
import { useAddClassesToBlocks, useSelectedBlock, useSelectedStylingBlocks } from "../../hooks";
import { getBlockComponent, useGlobalStylingPresets } from "@chaibuilder/runtime";
import { capitalize, first, get, has, isEmpty, keys, startCase } from "lodash-es";
import { useTranslation } from "react-i18next";
import { CaretDownIcon } from "@radix-ui/react-icons";

export const StylingHelpers = () => {
  const selectedBlock = useSelectedBlock() as any;
  const [stylingBlocks] = useSelectedStylingBlocks();
  const { t } = useTranslation();
  const globalPresets = useGlobalStylingPresets();
  const addClassesToBlocks = useAddClassesToBlocks();
  const coreBlock = getBlockComponent(selectedBlock._type);
  const propKey = get(first(stylingBlocks), "prop");
  const presets = get(coreBlock.props, `${propKey}.presets`, {});

  if (isEmpty(globalPresets) && (!has(coreBlock, "props") || isEmpty(presets))) {
    return null;
  }

  const applyPreset = (preset: any) => {
    const sanitizedPreset = preset
      .trim()
      .toLowerCase()
      .replace(/ +(?= )/g, "")
      .split(" ");
    addClassesToBlocks([selectedBlock._id], sanitizedPreset, true);
  };

  return (
    <div className="h-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="px-4">
            <Button variant="default" className="w-full" size="sm">
              {t("Apply Presets")}
              <CaretDownIcon />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-h-80 w-56">
          <ScrollArea className="no-scrollbar h-full">
            {!isEmpty(presets) ? (
              <>
                <DropdownMenuLabel>
                  {coreBlock.type} {t("presets")}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {keys(presets).map((key: string) => (
                    <DropdownMenuItem className="group text-xs" onClick={() => applyPreset(presets[key])}>
                      {capitalize(startCase(t(key)))}
                      <DropdownMenuShortcut className="invisible hover:font-bold hover:text-blue-600 group-hover:visible">
                        {t("apply")}
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </>
            ) : null}
            {!isEmpty(globalPresets) ? (
              <>
                <DropdownMenuLabel>{t("Global presets")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {keys(globalPresets).map((key: string) => (
                    <DropdownMenuItem className="group text-xs" onClick={() => applyPreset(globalPresets[key])}>
                      {capitalize(startCase(t(key)))}
                      <DropdownMenuShortcut className="invisible hover:font-bold hover:text-blue-600 group-hover:visible">
                        {t("apply")}
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </>
            ) : null}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
