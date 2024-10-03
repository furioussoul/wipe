import { ChaiBlock } from "./ChaiBlock";

export type PredefinedBlock = {
  uuid: string;
  name: string;
  preview: string;
  blocks?: ChaiBlock[];
  html?: string;
};

export type ChaiPage = {
  uuid?: string;
  page_name?: string;
  blocks: ChaiBlock[];
  custom_code: string;
  seo_data: Record<string, string>;
  slug: string;
  translations: Record<string, Record<string, string>>;
};

export type StylingAttributes = {
  className: string;
  "data-block-parent": string;
  "data-style-id": string;
  "data-style-prop": string;
};

export type ThemeConfiguration = {
  bodyTextLightColor?: string;
  bodyTextDarkColor?: string;
  bodyBgLightColor?: string;
  bodyBgDarkColor?: string;
};
