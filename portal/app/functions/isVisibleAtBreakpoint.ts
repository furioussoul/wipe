type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Checks if a given class string is visible at a given breakpoint
 * important: The default assumption is that the block is hidden
 * @param classes
 * @param breakpoint
 */
const isVisibleAtBreakpoint = (classes: string, breakpoint: Breakpoint): boolean => {
  const breakpoints: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "2xl"];
  const breakpointIndex = breakpoints.indexOf(breakpoint);

  const classArray = classes.split(" ");

  // Initialize all breakpoints as hidden
  let visibilityState = new Array(breakpoints.length).fill(false);

  for (const cls of classArray) {
    let [prefix, baseClass] = cls.split(":");

    if (!baseClass) {
      baseClass = prefix;
      prefix = "xs"; // No prefix means it applies from the smallest breakpoint
    }

    const classBreakpointIndex = breakpoints.indexOf(prefix as Breakpoint);

    if (classBreakpointIndex <= breakpointIndex) {
      const visibilityClasses = ["block", "flex", "inline", "inline-block", "inline-flex", "grid", "table"];
      const hiddenClasses = ["hidden"];

      if (visibilityClasses.includes(baseClass)) {
        for (let i = classBreakpointIndex; i < breakpoints.length; i++) {
          visibilityState[i] = true;
        }
      } else if (hiddenClasses.includes(baseClass)) {
        for (let i = classBreakpointIndex; i < breakpoints.length; i++) {
          visibilityState[i] = false;
        }
      }
      // Classes that don't affect visibility are ignored
    }
  }

  // Return the visibility state for the current breakpoint
  return visibilityState[breakpointIndex];
};

export { isVisibleAtBreakpoint };
