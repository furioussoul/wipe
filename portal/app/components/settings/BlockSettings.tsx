import { IChangeEvent } from "@rjsf/core";
import { capitalize, cloneDeep, debounce, each, get, isEmpty, keys, map } from "lodash-es";
import { useBuilderProp, useSelectedBlock, useUpdateBlocksProps, useUpdateBlocksPropsRealtime } from "../../hooks";
import { ChaiControlDefinition } from "@chaibuilder/runtime/controls";
import DataBindingSetting from "../../rjsf-widgets/data-binding";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/ui";
import { useCallback, useMemo, useState } from "react";
import { getBlockComponent } from "@chaibuilder/runtime";
import { JSONForm } from "./JSONForm";
import { CanvasSettings } from "./CanvasSettings";
import { convertDotNotationToObject } from "../../functions/Controls";

/**
 *
 * @returns Block Setting
 */
export default function BlockSettings() {
  const selectedBlock = useSelectedBlock() as any;
  const updateBlockPropsRealtime = useUpdateBlocksPropsRealtime();
  const updateBlockProps = useUpdateBlocksProps();
  const coreBlock = getBlockComponent(selectedBlock?._type);
  const formData = { ...selectedBlock };
  const [prevFormData, setPrevFormData] = useState(formData);
  const dataBindingSupported = useBuilderProp("dataBindingSupport", false);

  const updateProps = ({ formData: newData }: IChangeEvent, id?: string, oldState?: any) => {
    if (id && prevFormData?._id === selectedBlock._id) {
      const path = id.replace("root.", "") as string;
      updateBlockProps([selectedBlock._id], { [path]: get(newData, path) } as any, oldState);
    }
  };

  const debouncedCall = useCallback(
    debounce(({ formData }, id, oldPropState) => {
      updateProps({ formData } as IChangeEvent, id, oldPropState);
      setPrevFormData(formData);
    }, 1500),
    [selectedBlock?._id],
  );

  const updateRealtime = ({ formData: newData }: IChangeEvent, id?: string) => {
    if (id) {
      const path = id.replace("root.", "") as string;
      updateBlockPropsRealtime(
        [selectedBlock._id],
        convertDotNotationToObject(path, get(newData, path.split("."))) as any,
      );
      debouncedCall({ formData: newData }, id, { [path]: get(prevFormData, path) });
    }
  };

  const bindingProps = keys(get(formData, "_bindings", {}));

  const staticContentProperties = useMemo(() => {
    const controls = cloneDeep(get(coreBlock, "props", {})) as { [key: string]: ChaiControlDefinition };
    if (!dataBindingSupported) return controls;
    each(bindingProps, (key: string) => delete controls[key]);
    return controls;
  }, [coreBlock, bindingProps, dataBindingSupported]);

  return (
    <div className="overflow-x-hidden">
      {dataBindingSupported ? (
        <Accordion type="multiple" defaultValue={["STATIC", "BINDING"]} className="h-full w-full">
          <AccordionItem value="BINDING">
            <AccordionTrigger className="bg-gray-100 px-3 py-2 text-xs hover:no-underline">
              <div className="flex items-center gap-x-2">
                <div
                  className={`h-[8px] w-[8px] rounded-full ${!isEmpty(get(selectedBlock, "_bindings", {})) ? "bg-blue-500" : "bg-gray-300"
                    }`}
                />
                Data Binding
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-4">
              <DataBindingSetting
                bindingData={get(selectedBlock, "_bindings", {})}
                onChange={(_bindings) => {
                  updateProps({ formData: { _bindings } } as IChangeEvent, "root._bindings");
                }}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="STATIC">
            <AccordionTrigger className="bg-gray-100 px-3 py-2 text-xs hover:no-underline">
              <div className="flex items-center gap-x-2">
                <div className={`h-[8px] w-[8px] rounded-full bg-blue-500`} />
                Static Content
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              {!isEmpty(bindingProps) ? (
                <div className="mx-4 mb-1 mt-0 rounded-sm border border-orange-500 bg-orange-100 p-1 text-xs text-orange-500">
                  Data binding is set for <b>{map(bindingProps, capitalize).join(", ")}</b>{" "}
                  {bindingProps.length === 1 ? "property" : "properties"}. Remove data binding to edit static content.
                </div>
              ) : null}
              <JSONForm
                id={selectedBlock?._id}
                onChange={updateRealtime}
                formData={formData}
                properties={staticContentProperties}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <JSONForm
          id={selectedBlock?._id}
          onChange={updateRealtime}
          formData={formData}
          properties={staticContentProperties}
        />
      )}
      <CanvasSettings />
    </div>
  );
}
