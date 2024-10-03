import { get, map } from "lodash-es";
import { useEffect, useState } from "react";
import { useFrame } from "../../../frame";
import {
  useBrandingOptions,
  useDarkMode,
  useHighlightBlockId,
  useSelectedBlockIds,
  useSelectedStylingBlocks,
} from "../../../hooks";
import { useAtom } from "jotai";
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";
import aspectRatio from "@tailwindcss/aspect-ratio";
import getPalette from "tailwindcss-palette-generator";
import { draggedBlockAtom, dropTargetBlockIdAtom } from "../dnd/atoms";
import plugin from "tailwindcss/plugin";
// @ts-ignore

export const HeadTags = ({ model }: { model: string }) => {
  const [customTheme] = useBrandingOptions();
  const [selectedBlockIds] = useSelectedBlockIds();
  const [darkMode] = useDarkMode();
  const [highlightedId] = useHighlightBlockId();
  const [stylingBlockIds] = useSelectedStylingBlocks();
  const [draggedBlock] = useAtom(draggedBlockAtom);
  const [dropTargetId] = useAtom(dropTargetBlockIdAtom);

  const { document: iframeDoc, window: iframeWin } = useFrame();

  const [highlightedBlockStyle] = useState(iframeDoc?.getElementById("highlighted-block") as HTMLStyleElement);
  const [selectedBlockStyle] = useState<HTMLStyleElement>(
    iframeDoc?.getElementById("selected-block") as HTMLStyleElement,
  );
  const [selectedStylingBlocks] = useState<HTMLStyleElement>(
    iframeDoc?.getElementById("selected-styling-block") as HTMLStyleElement,
  );
  const [draggedBlockStyle] = useState<HTMLStyleElement>(
    iframeDoc?.getElementById("dragged-block") as HTMLStyleElement,
  );

  useEffect(() => {
    if (darkMode) iframeDoc?.documentElement.classList.add("dark");
    else iframeDoc?.documentElement.classList.remove("dark");
  }, [darkMode, iframeDoc]);

  const headingFont: string = get(customTheme, "headingFont", "DM Sans");
  const bodyFont: string = get(customTheme, "bodyFont", "DM Sans");

  useEffect(() => {
    const primary = get(customTheme, "primaryColor", "#000");
    const secondary = get(customTheme, "secondaryColor", "#FFF");
    const BG_LIGHT_MODE = get(customTheme, "bodyBgLightColor", "#fff");
    const BG_DARK_MODE = get(customTheme, "bodyBgDarkColor", "#000");
    const TEXT_DARK_MODE = get(customTheme, "bodyTextDarkColor", "#000");
    const TEXT_LIGHT_MODE = get(customTheme, "bodyTextLightColor", "#fff");

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

    const borderRadius = get(customTheme, "roundedCorners", "0");
    // @ts-ignore
    if (!iframeWin || !iframeWin.tailwind) return;
    // @ts-ignore
    iframeWin.tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          container: {
            center: true,
            padding: "1rem",
            screens: {
              "2xl": "1400px",
            },
          },
          fontFamily: {
            heading: [headingFont],
            body: [bodyFont],
          },
          borderRadius: {
            DEFAULT: `${!borderRadius ? "0" : borderRadius}px`,
          },
          colors: { ...colors, ...palette },
        },
      },

      plugins: [
        typography,
        forms,
        aspectRatio,
        plugin(function ({ addBase, theme }: any) {
          addBase({
            "h1,h2,h3,h4,h5,h6": {
              fontFamily: theme("fontFamily.heading"),
            },
            body: {
              fontFamily: theme("fontFamily.body"),
              color: theme("colors.text-light"),
              backgroundColor: theme("colors.bg-light"),
            },
            ".dark body": {
              color: theme("colors.text-dark"),
              backgroundColor: theme("colors.bg-dark"),
            },
          });
        }),
      ],
    };
  }, [customTheme, iframeWin, headingFont, bodyFont]);

  useEffect(() => {
    if (!selectedBlockStyle) return;
    selectedBlockStyle.textContent = `${map(selectedBlockIds, (id) => `[data-block-id="${id}"]`).join(",")}{
                outline: 1px solid ${selectedBlockIds.length === 1 ? "#42a1fc" : "orange"
      } !important; outline-offset: -1px;
            }`;
  }, [selectedBlockIds, selectedBlockStyle]);

  useEffect(() => {
    draggedBlockStyle.textContent = draggedBlock
      ? `[data-block-id="${draggedBlock._id}"], [data-block-id="${draggedBlock._id}"] > * { pointer-events: none !important; opacity: 0.6 !important}`
      : "";
  }, [draggedBlock, draggedBlockStyle]);

  useEffect(() => {
    if (!highlightedBlockStyle) return;
    highlightedBlockStyle.textContent = highlightedId
      ? `[data-style-id="${highlightedId}"]{ outline: 1px solid #42a1fc !important; outline-offset: -1px;}`
      : "";
  }, [highlightedId, selectedBlockIds, highlightedBlockStyle]);

  useEffect(() => {
    if (!selectedStylingBlocks) return;
    selectedStylingBlocks.textContent = `${map(stylingBlockIds, ({ id }: any) => `[data-style-id="${id}"]`).join(",")}{
                outline: 1px solid #42a1fc !important; outline-offset: -1px;
            }`;
  }, [stylingBlockIds, selectedStylingBlocks]);

  useEffect(() => {
    iframeDoc.querySelector(`#drop-target-block`).innerHTML = dropTargetId
      ? `[data-block-id="${dropTargetId}"]{ outline: 1px dashed orange !important; outline-offset: -1px;}`
      : "";
  }, [dropTargetId]);

  return (
    <>
      {(headingFont || bodyFont) && (
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?family=${headingFont
              ? `${headingFont.replace(/ /g, "+")}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900`
              : ""
            }${headingFont && bodyFont && headingFont !== bodyFont ? "&" : ""}${bodyFont && bodyFont !== headingFont
              ? `family=${bodyFont.replace(/ /g, "+")}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900`
              : ""
            }&display=swap`}
        />
      )}
    </>
  );
};
