import React, { CSSProperties } from "react";
import { CursorProps } from "react-arborist";

const placeholderStyle = {
  display: "flex",
  alignItems: "center",
  zIndex: 1,
};

export const DefaultCursor = React.memo(function DefaultCursor({ top, left }: CursorProps) {
  const style: CSSProperties = {
    position: "absolute",
    pointerEvents: "none",
    top: top + "px",
    left: left + "px",
    right: 0,
  };
  return (
    <div style={{ ...placeholderStyle, ...style }}>
      <div className="h-0.5 flex-1 rounded-[1px] bg-green-500"></div>
    </div>
  );
});
