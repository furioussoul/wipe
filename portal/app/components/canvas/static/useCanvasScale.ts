import { useCanvasWidth, useCanvasZoom } from "../../../hooks";
import { useCallback, useEffect, useState } from "react";

export const useCanvasScale = (dimension: { height: number; width: number }) => {
  const [canvasWidth] = useCanvasWidth();
  const [, setZoom] = useCanvasZoom();
  const [scale, setScale] = useState({});
  const updateScale = useCallback(() => {
    const { width, height } = dimension;
    if (width < canvasWidth) {
      const newScale: number = parseFloat((width / canvasWidth).toFixed(2).toString());
      let heightObj = {};
      const scaledHeight = height * newScale;
      if (height) {
        heightObj = {
          // Eureka! This is the formula to calculate the height of the scaled element. Thank you ChatGPT 4
          height: 100 + ((height - scaledHeight) / scaledHeight) * 100 + "%",
        };
      }
      setScale({
        position: "relative",
        top: 0,
        transform: `scale(${newScale})`,
        transformOrigin: "top left",
        ...heightObj,
        maxWidth: "none",
      });

      setZoom(newScale * 100);
    } else {
      setScale({});
      setZoom(100);
    }
  }, [canvasWidth, dimension, setZoom]);

  useEffect(() => {
    updateScale();
  }, [canvasWidth, dimension, setZoom, updateScale]);

  return scale;
};
