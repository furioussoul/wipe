import { get, map } from "lodash-es";
import { DesktopIcon, LaptopIcon, MobileIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import clsx from "clsx";
import { SettingsWatcher } from "./Settings";
import { Frame } from "@/app/frame/Frame";
import { useBlocksStore } from "@/app/history/useBlocksStoreUndoableActions";
import { useBrandingOptions } from "@/app/hooks";
import { Button } from "../../ui";
import ReactDOM from "react-dom/server";
import { RenderChaiBlocks } from "../../render";

interface BreakpointItemType {
  content: string;
  icon: any;
  title: string;
  width: number;
}
interface BreakpointCardProps extends BreakpointItemType {
  currentWidth: number;
  setIframeWidth: Function;
}

const WEB_BREAKPOINTS: BreakpointItemType[] = [
  {
    title: "mobile_xs_title",
    content: "mobile_xs_content",
    icon: <MobileIcon />,
    width: 400,
  },

  {
    title: "tablet_md_title",
    content: "tablet_md_content",
    icon: <MobileIcon />,
    width: 800,
  },

  {
    title: "desktop_xl_title",
    content: "desktop_xl_content",
    icon: <LaptopIcon />,
    width: 1200,
  },
  {
    title: "large_desktop_2xl_title",
    content: "large_desktop_2xl_content",
    icon: <DesktopIcon />,
    width: 1600,
  },
];

const getFonts = (options: any) => {
  const headingFont = get(options, "headingFont", "Inter");
  const bodyFont = get(options, "bodyFont", "Inter");
  if (headingFont === bodyFont)
    return `<link href="https://fonts.googleapis.com/css2?family=${headingFont.replace(" ", "+")}:wght@400;500;600;700&display=swap" rel="stylesheet">`;

  return `
    <link href="https://fonts.googleapis.com/css2?family=${headingFont.replace(" ", "+")}:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=${bodyFont.replace(" ", "+")}:wght@400;500;600;700&display=swap" rel="stylesheet">
  `;
};

export const IframeInitialContent = (fonts: string, html: string): string => `<!doctype html>
<html class="scroll-smooth h-full no-scrollbar overflow-y-auto" x-data="{darkMode: 'light'}"
      x-bind:class="{'dark': darkMode === 'dark' || (darkMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    ${fonts}
    <style type="text/css">
    html { height: 100%; overflow:auto; }
    body { height: 100%; }
    body{   -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none;
            -moz-user-select: none;-ms-user-select: none; user-select: none; }
    html{ -ms-overflow-style: none;  /* IE and Edge */ scrollbar-width: none;  /* Firefox */
    }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .frame-root .frame-content { height: 100%; }
    </style>   
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
    <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio"></script>
  </head>
  <body class="font-body antialiased h-full">
    <div class="frame-root h-full">
    ${html}
    </div>  
    <script src="//unpkg.com/alpinejs" defer></script>
    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
    <script>
      AOS.init();
      function addClickEventToLinks() {
        document.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', function(event) {
            event.preventDefault();
          });
        });
      }
      // Initialize the observer
      const observer = new MutationObserver((mutationsList) => {
        mutationsList.forEach(mutation => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            addClickEventToLinks();
          }
        });
      });
      // Start observing the document body for added nodes
      observer.observe(document.body, { childList: true, subtree: true });
      // Call the function once in case links are already present
      addClickEventToLinks();
    </script>
  </body>
</html>`;

const BreakpointCard = ({ currentWidth, width, icon, setIframeWidth }: BreakpointCardProps) => {
  return (
    <Button
      className={clsx(width === currentWidth && "text-white", "border")}
      onClick={() => setIframeWidth(width)}
      variant={width === currentWidth ? "default" : "ghost"}>
      {icon}
    </Button>
  );
};

const PreviewWeb = () => {
  const [blocks] = useBlocksStore();
  const [brandingOptions] = useBrandingOptions();
  const [localBlocks] = useState(blocks);

  const [width, setWidth] = useState(1200);

  const setIframeWidth = (newWidth: number) => setWidth(newWidth);
  const html = ReactDOM.renderToString(<RenderChaiBlocks blocks={localBlocks} />);
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-gray-100">
      <div className="flex h-16 items-center justify-center border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-center gap-0.5 rounded-md">
          {map(WEB_BREAKPOINTS, (bp: BreakpointItemType) => (
            <BreakpointCard {...bp} setIframeWidth={setIframeWidth} key={bp.title} currentWidth={width} />
          ))}
        </div>
      </div>
      <Frame
        style={{ width: `${width}px` }}
        className="no-scrollbar mx-auto h-full overflow-y-auto border bg-white"
        initialContent={IframeInitialContent(getFonts(brandingOptions), html)}>
        <SettingsWatcher />
        <div></div>
      </Frame>
    </div>
  );
};
export default PreviewWeb;
