// @ts-nochecks
'use client'
import React, { useEffect, useMemo, useRef, useState } from "react";
import { first, isEmpty } from "lodash-es";
import { useAtom } from "jotai";
import {
  useBuilderProp,
  useCanvasWidth,
  useHighlightBlockId,
  usePreviewMode,
  useSelectedBlock,
  useSelectedBlockIds,
  useSelectedStylingBlocks,
} from "../../../hooks";
import { IframeInitialContent } from "../IframeInitialContent";
import { canvasIframeAtom, networkModeAtom } from "../../../atoms/ui";
import { useCanvasScale } from "./useCanvasScale";
import { Canvas, getElementByDataBlockId } from "./Canvas";
import { ChaiFrame } from "../../../frame";
import { KeyboardHandler } from "../KeyboarHandler";
import { BlockActionsStatic } from "../BlockFloatingActions";
import { HeadTags } from "./HeadTags";
import { Skeleton } from "@/app/ui";
import { ChaiBlock } from "../../../types/ChaiBlock";
import { StaticBlocksRenderer } from "./StaticBlocksRenderer";
import { Provider } from "react-wrap-balancer"; // const FrameComponent = Frame.default;

const getElementByStyleId = (doc: any, styleId: string): HTMLElement =>
  doc.querySelector(`[data-style-id="${styleId}"]`) as HTMLElement;

const StaticCanvas = (): React.JSX.Element => {
  const [networkMode] = useAtom(networkModeAtom);
  const [preview] = usePreviewMode();
  const [width] = useCanvasWidth();
  const [, setIds] = useSelectedBlockIds();
  const selectedBlock: any = useSelectedBlock();
  const [, highlight] = useHighlightBlockId();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const scale = useCanvasScale(dimension);
  const [initialWidth, setInitialWidth] = useState(0);
  const [selectedElements, setSelectedElements] = useState<HTMLElement[]>([]);
  const [, setSelectedStyleElements] = useState<HTMLElement[] | null[]>([]);
  const [, setCanvasIframe] = useAtom(canvasIframeAtom);
  const [stylingBlocks, setStylingBlocks] = useSelectedStylingBlocks();
  const loadingCanvas = useBuilderProp("loading", false);
  const htmlDir = useBuilderProp("htmlDir", "ltr");

  useEffect(() => {
    const { clientWidth, clientHeight } = wrapperRef.current as HTMLDivElement;
    setDimension({ width: clientWidth, height: clientHeight });
    if (initialWidth === 0) {
      setInitialWidth(clientWidth);
    }
  }, [wrapperRef, width, initialWidth]);

  const isInViewport = (element: HTMLElement, offset = 0) => {
    const { top } = element.getBoundingClientRect();
    return top + offset >= 0 && top - offset <= window.innerHeight;
  };

  useEffect(() => {
    if (selectedBlock && selectedBlock.type !== "Multiple" && iframeRef.current) {
      const blockElement = getElementByDataBlockId(iframeRef.current.contentDocument, selectedBlock._id);
      if (blockElement) {
        if (!isInViewport(blockElement)) {
          iframeRef.current?.contentWindow?.scrollTo({ top: blockElement.offsetTop, behavior: "smooth" });
        }
        setSelectedElements([blockElement]);
      }
    }
  }, [selectedBlock]);

  useEffect(() => {
    if (!isEmpty(stylingBlocks) && iframeRef.current) {
      const selectedStyleElement = getElementByStyleId(
        iframeRef.current.contentDocument,
        (first(stylingBlocks) as { id: string }).id,
      );
      if (selectedStyleElement) {
        setSelectedStyleElements([selectedStyleElement]);
      } else {
        setSelectedStyleElements([null]);
      }
    } else {
      setSelectedStyleElements([null]);
    }
  }, [stylingBlocks]);

  const iframeContent: string = useMemo(() => {
    let initialHTML = IframeInitialContent;
    initialHTML = initialHTML.replace("__HTML_DIR__", htmlDir);
    if (networkMode === "offline") {
      initialHTML = initialHTML.replace(
        "https://old.chaibuilder.com/offline/tailwind.cdn.js",
        "/offline/tailwind.cdn.js",
      );
      initialHTML = initialHTML.replace("https://unpkg.com/aos@next/dist/aos.css", "/offline/aos.css");
      initialHTML = initialHTML.replace("https://unpkg.com/aos@next/dist/aos.js", "/offline/aos.js");
    }
    return initialHTML;
  }, [networkMode]);

  return (
    <div
      onClick={() => {
        setIds([]);
        setStylingBlocks([]);
      }}
      onMouseLeave={() => setTimeout(() => highlight(""), 300)}
      className="relative mx-auto h-full w-full overflow-hidden"
      style={initialWidth > 0 && !isEmpty(scale) ? { width: preview ? "100%" : initialWidth } : {}}
      ref={wrapperRef}>
      {/*// @ts-ignore*/}
      <ChaiFrame
        contentDidMount={() => setCanvasIframe(iframeRef.current as HTMLIFrameElement)}
        ref={iframeRef as any}
        id="canvas-iframe"
        style={{ width: `${width}px`, ...scale }}
        className="relative mx-auto box-content h-full max-w-full shadow-lg transition-all duration-300 ease-linear"
        initialContent={iframeContent}>
        <KeyboardHandler />
        <BlockActionsStatic
          block={selectedBlock as unknown as ChaiBlock}
          selectedBlockElement={first(selectedElements)}
        />
        <HeadTags model="page" />
        <Provider>
          <Canvas>
            {loadingCanvas ? (
              <div className="h-full p-4">
                <Skeleton className="h-full" />
              </div>
            ) : (
              <StaticBlocksRenderer />
            )}
          </Canvas>
        </Provider>
        <br />

        <div
          id="placeholder"
          className="pointer-events-none absolute z-[99999] max-w-full bg-green-500 transition-transform"
        />
      </ChaiFrame>
    </div>
  );
};

export default StaticCanvas;
