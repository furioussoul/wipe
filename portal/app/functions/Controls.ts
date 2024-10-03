import { each, forIn, get, has, includes, isEmpty, map, set } from "lodash-es";
import {
  ChaiControlDefinition,
  ControlDefinition,
  ListControlDefinition,
  ModelControlDefinition,
  StylesControlDefinition,
} from "@chaibuilder/runtime/controls";
import { generateUUID } from "./Functions.ts";
import { I18N_KEY, SLOT_KEY } from "../constants/STRINGS.ts";

export const getBlockJSONFromUISchemas = (control: ChaiControlDefinition) => {
  switch (control.type) {
    case "singular":
      return (control as ControlDefinition).uiSchema;
    case "model":
      // eslint-disable-next-line no-case-declarations
      const { properties: modelProperties } = control as ModelControlDefinition;
      // eslint-disable-next-line no-case-declarations
      const modelProps: Record<string, any> = {};
      Object.keys(modelProperties).forEach((key) => {
        // eslint-disable-next-line no-shadow
        const control = modelProperties[key];
        if (includes(["slot", "styles"], control.type)) return;
        const propKey = key;
        modelProps[propKey] = getBlockJSONFromUISchemas(control);
      });
      return modelProps;
    case "list":
      // eslint-disable-next-line no-case-declarations
      const { itemProperties } = control as ListControlDefinition;
      // eslint-disable-next-line no-case-declarations
      const listProps: { items: Record<string, any> } = {
        items: {},
      };
      Object.keys(itemProperties).forEach((key) => {
        // eslint-disable-next-line no-shadow
        const control = itemProperties[key];
        if (includes(["slot", "styles"], control.type)) return;
        const propKey = key;
        listProps.items[propKey] = getBlockJSONFromUISchemas(control);
      });
      return listProps;
    default:
      return {};
  }
};

export const getBlockJSONFromSchemas = (control: ChaiControlDefinition) => {
  switch (control.type) {
    case "singular":
      return (control as ControlDefinition).schema;
    case "model":
      // eslint-disable-next-line no-case-declarations
      const { properties: modelProperties, title: modelTitle } = control as ModelControlDefinition;
      // eslint-disable-next-line no-case-declarations
      const modelProps: Record<string, any> = {
        title: modelTitle,
        type: "object",
        properties: {},
      };
      Object.keys(modelProperties).forEach((key) => {
        // eslint-disable-next-line no-shadow
        const control = modelProperties[key];
        if (includes(["slot", "styles"], control.type)) return;
        const propKey = key;
        modelProps.properties[propKey] = getBlockJSONFromSchemas(control);
      });
      return modelProps;
    case "list":
      // eslint-disable-next-line no-case-declarations
      const { itemProperties, title: listTitle } = control as ListControlDefinition;
      // eslint-disable-next-line no-case-declarations
      const listProps: Record<string, any> = {
        title: listTitle,
        type: "array",
        items: {
          type: "object",
          properties: {},
        },
      };
      Object.keys(itemProperties).forEach((key) => {
        // eslint-disable-next-line no-shadow
        const control = itemProperties[key];
        if (includes(["slot", "styles"], control.type)) return;
        const propKey = key;
        listProps.items.properties[propKey] = getBlockJSONFromSchemas(control);
        set(listProps.items, "title", get(control, "itemTitle", `${listTitle} item`));
      });
      return listProps;
    default:
      return {};
  }
};

export const getBlockDefaultProps = (propDefinitions: { [key: string]: ChaiControlDefinition }) => {
  if (!propDefinitions) {
    return {};
  }
  const defaultProps: Record<string, any> = {};
  Object.keys(propDefinitions).forEach((key) => {
    defaultProps[key] = getBlockDefaultProp(propDefinitions[key]);
  });
  return defaultProps;
};

const getListDefaults = (control: ListControlDefinition) => {
  if (isEmpty(control.default)) return [];
  const { itemProperties } = control;
  return map(control.default, (item: any) => {
    const i = { ...item };
    forIn(item, (_value: any, key: string) => {
      if (has(itemProperties, key) && get(itemProperties[key], "i18n", false)) {
        i[key] = I18N_KEY;
      }
    });
    return i;
  });
};

export const getBlockDefaultProp = (control: ChaiControlDefinition) => {
  switch (control.type) {
    case "styles":
      return (control as StylesControlDefinition).default;
    case "slot":
      return `${SLOT_KEY}${generateUUID()}`;
    case "singular":
      // eslint-disable-next-line no-case-declarations
      const { schema } = control as ControlDefinition;
      return get(schema, "default", "");
    case "model":
      return getBlockDefaultProps((control as ModelControlDefinition).properties);
    case "list":
      return getListDefaults(control as ListControlDefinition);
    default:
      return "";
  }
};

export const getBlockDefaultTranslations = (
  propDefinitions: Record<string, ChaiControlDefinition>,
  blockId: string,
  primaryLang: string,
  path: string[] = [],
) => {
  let defaultTranslations = {};
  Object.keys(propDefinitions).forEach((key) => {
    defaultTranslations = {
      ...defaultTranslations,
      ...getBlockDefaultTranslation(propDefinitions[key], blockId, primaryLang, [...path, key]),
    };
  });
  return defaultTranslations;
};

const getListTranslations = (control: ListControlDefinition, blockId: string, primaryLang: string, path: string[]) => {
  if (isEmpty(control.default)) return [];
  const translations: Record<string, string> = {};
  const { itemProperties } = control;
  each(control.default, (item: any, index: number) => {
    const i = { ...item };
    forIn(item, (value: any, key: string) => {
      if (has(itemProperties, key) && get(itemProperties[key], "i18n", false)) {
        if (get(value, "i18n", false)) {
          forIn(value, (v: any, k: string) => {
            if (k === "i18n") return;
            translations[`${k}:${blockId}:${[...path, index, key].join(".")}`] = v;
          });
        } else {
          translations[`${primaryLang}:${blockId}:${[...path, index, key].join(".")}`] = value;
        }
      }
    });
    return i;
  });
  return translations;
};

const getSingleTranslation = (control: ControlDefinition, blockId: string, primaryLang: string, path: string[]) => {
  const {
    schema: { default: defaultValue },
  } = control;
  if (get(defaultValue, "i18n", false)) {
    const translations: Record<string, string> = {};
    forIn(defaultValue, (value: any, key: string) => {
      if (key === "i18n") return;
      translations[`${key}:${blockId}:${path.join(".")}`] = value;
    });
    return translations;
  }
  return { [`${primaryLang}:${blockId}:${path.join(".")}`]: defaultValue };
};

export const getBlockDefaultTranslation = (
  control: ChaiControlDefinition,
  blockId: string,
  primaryLang: string,
  path: string[],
) => {
  switch (control.type) {
    case "styles":
    case "slot":
      return {};
    case "singular":
      return getSingleTranslation(control as ControlDefinition, blockId, primaryLang, path);
    case "model":
      return getBlockDefaultTranslations((control as ModelControlDefinition).properties, blockId, primaryLang, path);
    case "list":
      return getListTranslations(control as ListControlDefinition, blockId, primaryLang, path);
    default:
      return "";
  }
};

export const convertDotNotationToObject = (key: string, value: any) => {
    const result = {};
    set(result, key, value);
    return result;
}
