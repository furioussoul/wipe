import React, { useEffect, useState } from "react";
import { filter, first, groupBy, includes, isEmpty, map, reject, uniq, values } from "lodash-es";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  ScrollArea,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/app/ui";
import { CoreBlock } from "./CoreBlock";
import { showPredefinedBlockCategoryAtom } from "../../../../atoms/ui";
import { useBuilderProp } from "../../../../hooks";
import ImportHTML from "./ImportHTML";
import { useChaiBlocks } from "@chaibuilder/runtime";
import { cn } from "../../../../functions/Functions";

const AddBlocksPanel = ({ className, showHeading = true }: { showHeading?: boolean; className?: string }) => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<string>("core");
  const [active, setActive] = useState<string>("basic");
  const allChaiBlocks = useChaiBlocks();
  const [, setCategory] = useAtom(showPredefinedBlockCategoryAtom);
  const importHTMLSupport = useBuilderProp("importHTMLSupport", true);
  const filterChaiBlock = useBuilderProp("filterChaiBlock", () => true);
  const chaiBlocks = filter(allChaiBlocks, filterChaiBlock);

  const groupedBlocks = groupBy(chaiBlocks, "category") as Record<string, any[]>;
  const uniqueTypeGroup = uniq(map(groupedBlocks.core, "group"));

  // * setting active tab if not already selected from current unique list
  useEffect(() => {
    if (!includes(uniqueTypeGroup, active) && !isEmpty(uniqueTypeGroup) && !isEmpty(active)) {
      setActive(first(uniqueTypeGroup) as string);
    }
  }, [uniqueTypeGroup, active]);

  return (
    <div className={cn("flex h-full w-full flex-col overflow-hidden", className)}>
      {showHeading ? (
        <div className="mb-2 flex flex-col justify-between rounded-md bg-background/30 p-1">
          <h1 className="flex flex-col items-baseline px-1 text-xl font-semibold xl:flex-col">{t("add_block")}</h1>
          <span className="p-0 text-xs font-light leading-3 opacity-80 xl:pl-1">
            {tab === "html" ? t("enter_paste_tailwind_html") : t("click_to_add_block")}
          </span>
        </div>
      ) : null}

      <Tabs
        onValueChange={(_tab) => {
          setCategory("");
          setTab(_tab);
        }}
        value={tab}
        className={cn("h-max", !importHTMLSupport ? "hidden" : "")}>
        <TabsList className={"grid w-full " + (importHTMLSupport ? "grid-cols-2" : "grid-cols-1")}>
          <TabsTrigger value="core">{t("Blocks")}</TabsTrigger>
          {importHTMLSupport ? <TabsTrigger value="html">{t("import")}</TabsTrigger> : null}
        </TabsList>
      </Tabs>
      {tab === "core" && (
        <ScrollArea className="-mx-1.5 h-[calc(100vh-156px)] overflow-y-auto">
          <div className="mt-2 w-full">
            {React.Children.toArray(
              map(uniqueTypeGroup, (group: string) =>
                reject(filter(values(groupedBlocks.core), { group }), { hidden: true }).length ? (
                  <Accordion type="single" value={group} collapsible className="w-full">
                    <AccordionItem value={group}>
                      <AccordionTrigger className="rounded-md bg-gray-100 px-4 py-2 capitalize">
                        {group}
                      </AccordionTrigger>
                      <AccordionContent className="p-3">
                        <div className="grid grid-cols-3 gap-2">
                          {React.Children.toArray(
                            reject(filter(values(groupedBlocks.core), { group }), { hidden: true }).map((block) => (
                              <CoreBlock block={block} />
                            )),
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : null,
              ),
            )}
          </div>
        </ScrollArea>
      )}
      {tab === "html" && importHTMLSupport ? <ImportHTML /> : null}
    </div>
  );
};

export default AddBlocksPanel;
