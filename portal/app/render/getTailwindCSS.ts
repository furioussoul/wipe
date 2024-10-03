import { replace, startsWith } from "lodash-es";
import { createTailwindcss } from "@mhsdesign/jit-browser-tailwindcss";
import twForms from "@tailwindcss/forms";
import twTypography from "@tailwindcss/typography";
import twAspectRatio from "@tailwindcss/aspect-ratio";
import { ChaiBlock } from "../types/ChaiBlock";
import { addPrefixToClasses } from "./functions";
import { STYLES_KEY } from "../constants/STRINGS";
import { ChaiBuilderTailwindTheme, getChaiBuilderTheme } from "../tailwind/getChaiBuilderTheme";
import { chaiBuilderPlugin } from "../tailwind";

async function getTailwindCSS(
  theme: ChaiBuilderTailwindTheme,
  markupString: string[],
  safelist: string[] = [],
  prefix: string = "",
  includeBaseStyles: boolean = false,
) {
  const tailwind = createTailwindcss({
    tailwindConfig: {
      darkMode: "class",
      safelist,
      theme: getChaiBuilderTheme(theme),
      plugins: [twForms, twTypography, twAspectRatio, chaiBuilderPlugin],
      corePlugins: { preflight: includeBaseStyles },
      ...(prefix ? { prefix: `${prefix}` } : {}),
    },
  });

  return await tailwind.generateStylesFromContent(
    ` ${includeBaseStyles ? "@tailwind base;" : ""}
      @tailwind components;
      @tailwind utilities;`,
    markupString,
  );
}

const addPrefixToBlockStyles = (blocks: ChaiBlock[], prefix: string) => {
  return blocks.map((block: any) => {
    // loop through all block keys and check if it starts with #styles:
    // if it does, then replace "#styles:" with the empty string
    const blocksStyles = {};
    Object.keys(block).forEach((key) => {
      if (startsWith(block[key], STYLES_KEY)) {
        blocksStyles[key] = addPrefixToClasses(block[key], prefix);
      }
    });
    return blocksStyles;
  });
};

const getBlocksTailwindCSS = (
  blocks: ChaiBlock[],
  theme: any,
  prefix: string = "",
  includeBaseStyles: boolean = false,
) => {
  return getTailwindCSS(
    theme,
    [replace(JSON.stringify(addPrefixToBlockStyles(blocks, prefix)), /#styles:/g, "")],
    [],
    prefix,
    includeBaseStyles,
  );
};

export const getStylesForBlocks = async (
  blocks: ChaiBlock[],
  theme: ChaiBuilderTailwindTheme | {} = {},
  classPrefix: string = "",
  includeBaseStyles: boolean = true,
): Promise<string> => {
  return await getBlocksTailwindCSS(blocks, theme, classPrefix, includeBaseStyles);
};
