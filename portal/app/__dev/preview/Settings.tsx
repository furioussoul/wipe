"use client";

import { useEffect, useState } from "react";
import { get } from "lodash-es";
import getPalette from "tailwindcss-palette-generator";
import { useFrame } from "@/app/frame";
import { useBrandingOptions } from "@/app/hooks";

const getTailwindConfig = (options: any, w: Window) => {
  const primary = get(options, "primaryColor", "#000");
  const secondary = get(options, "secondaryColor", "#ccc");

  const headingFont = get(options, "headingFont", "Inter");
  const bodyFont = get(options, "bodyFont", "Inter");
  const borderRadius = get(options, "roundedCorners", "0");

  const BG_LIGHT_MODE = get(options, "bodyBgLightColor", "#fff");
  const BG_DARK_MODE = get(options, "bodyBgDarkColor", "#000");
  const TEXT_LIGHT_MODE = get(options, "bodyTextLightColor", "#000");
  const TEXT_DARK_MODE = get(options, "bodyTextDarkColor", "#fff");

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
  const theme = {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: { "2xl": "1400px" },
      },
      fontFamily: { heading: [headingFont], body: [bodyFont] },
      borderRadius: { DEFAULT: `${!borderRadius ? "0px" : borderRadius}px` },
      colors: { ...palette, ...colors },
    },
  };
  return {
    darkMode: "class",
    theme: theme,
    plugins: [
      //@ts-ignore
      w.tailwind.plugin.withOptions(
        () =>
          function ({ addBase, theme }: any) {
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
          },
      ),
    ],
  };
};

export const SettingsWatcher = () => {
  const [initialized, setInitialized] = useState(false);
  const { window: w, document: d } = useFrame();
  const [projectOptions] = useBrandingOptions();
  function checkDarkmode(event: any) {
    if (event.data === "darkmode") {
      d?.documentElement.classList.add("dark");
    } else {
      d?.documentElement.classList.remove("dark");
    }
  }

  const onLoad = () => { };

  useEffect(() => {
    // @ts-ignore
    if (!w || !w.tailwind || initialized) return;
    // @ts-ignore
    w.tailwind.config = getTailwindConfig(projectOptions, w);
    // @ts-ignore
    w.AOS.init();
    setInitialized(true);
  }, [projectOptions, w, initialized]);

  useEffect(() => {
    w?.addEventListener("message", checkDarkmode);
    if (d?.readyState !== "loading") onLoad();
    d?.addEventListener("DOMContentLoaded", onLoad);
    return () => {
      d?.removeEventListener("DOMContentLoaded", onLoad);
      w?.removeEventListener("message", checkDarkmode);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};
