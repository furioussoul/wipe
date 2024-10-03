export function getOrientation(target: HTMLElement): "vertical" | "horizontal" {
  const computedStyle = window.getComputedStyle(target);
  const display = computedStyle.display;

  if (display === "flex" || display === "inline-flex") {
    const flexDirection = computedStyle.flexDirection;

    return flexDirection === "column" || flexDirection === "column-reverse" ? "vertical" : "horizontal";
  } else if (display === "grid") {
    const gridAutoFlow = computedStyle.gridAutoFlow;
    const gridTemplateRows = computedStyle.gridTemplateRows;
    const gridTemplateColumns = computedStyle.gridTemplateColumns;

    // If the grid auto flow is set to column or the grid has more rows than columns, it's vertical.
    if (gridAutoFlow.includes("column") || gridTemplateRows.split(" ").length > gridTemplateColumns.split(" ").length) {
      return "vertical";
    } else {
      return "horizontal";
    }
  } else if (display === "block" || display === "inline-block") {
    // For block and inline-block, we assume vertical by default, though this might depend on other CSS properties.
    return "vertical";
  }

  return "horizontal";
}
