import { get } from "lodash-es";
import getPalette from "tailwindcss-palette-generator";

export type ChaiBuilderTailwindTheme<T extends Record<string, unknown> = {}> = {
  primaryColor: string;
  secondaryColor: string;
  headingFont: string;
  bodyFont: string;
  roundedCorners: string;
  bodyBgLightColor: string;
  bodyBgDarkColor: string;
  bodyTextLightColor: string;
  bodyTextDarkColor: string;
} & T;

export const getChaiBuilderTheme = (theme: ChaiBuilderTailwindTheme) => {
  const primary = get(theme, "primaryColor", "#000");
  const secondary = get(theme, "secondaryColor", "#ccc");

  const headingFont = get(theme, "headingFont", "Inter");
  const bodyFont = get(theme, "bodyFont", "Inter");
  const borderRadius = get(theme, "roundedCorners", "0");

  const BG_LIGHT_MODE = get(theme, "bodyBgLightColor", "#fff");
  const BG_DARK_MODE = get(theme, "bodyBgDarkColor", "#000");
  const TEXT_LIGHT_MODE = get(theme, "bodyTextLightColor", "#000");
  const TEXT_DARK_MODE = get(theme, "bodyTextDarkColor", "#fff");

  const palette = getPalette([
    { color: primary, name: "primary" },
    { color: secondary, name: "secondary" },
  ]);
  const colors: Record<string, string> = {
    "bg-light": BG_LIGHT_MODE,
    "bg-dark": BG_DARK_MODE,
    "text-dark": TEXT_DARK_MODE,
    "text-light": TEXT_LIGHT_MODE,
  };
  return {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1400px" },
    },
    fontFamily: { heading: [headingFont], body: [bodyFont] },
    borderRadius: { DEFAULT: `${!borderRadius ? "0px" : borderRadius}px` },
    colors: { ...palette, ...colors },
  };
};
