'use client'
import { getStylesForBlocks, RenderChaiBlocks } from "@/app/render";
import { useAtom } from "jotai";
import { lsBlocksAtom, lsBrandingOptionsAtom } from "@/app/__dev/atoms-dev";
import { useEffect, useState } from "react";

function Preview() {
  const [blocks] = useAtom(lsBlocksAtom);
  const [brandingOptions] = useAtom(lsBrandingOptionsAtom);
  const [allStyles, setStyles] = useState("");

  useEffect(() => {
    (async () => {
      const styles = await getStylesForBlocks(blocks, brandingOptions, "", true);
      setStyles(styles);
    })();
  }, [blocks, brandingOptions]);

  return (
    <>
      <style>{allStyles}</style>
      <RenderChaiBlocks classPrefix={""} blocks={blocks} />
    </>
  );
}

export default Preview;
