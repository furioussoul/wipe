import { isVisibleAtBreakpoint } from "./isVisibleAtBreakpoint.ts"; // Adjust the import path as needed

describe("isVisibleAtBreakpoint", () => {
  test("hidden by default", () => {
    expect(isVisibleAtBreakpoint("", "md")).toBe(false);
  });

  test("hidden class has no effect", () => {
    expect(isVisibleAtBreakpoint("hidden", "md")).toBe(false);
  });

  test("block class makes visible", () => {
    expect(isVisibleAtBreakpoint("block", "md")).toBe(true);
    expect(isVisibleAtBreakpoint("md:block", "md")).toBe(true);
    expect(
      isVisibleAtBreakpoint(
        "overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6",
        "xl",
      ),
    ).toBe(true);
  });

  test("responsive classes", () => {
    const classes = "sm:block md:hidden lg:block";
    expect(isVisibleAtBreakpoint(classes, "xs")).toBe(false);
    expect(isVisibleAtBreakpoint(classes, "sm")).toBe(true);
    expect(isVisibleAtBreakpoint(classes, "md")).toBe(false);
    expect(isVisibleAtBreakpoint(classes, "lg")).toBe(true);
  });

  test("overriding classes", () => {
    expect(isVisibleAtBreakpoint("block md:hidden", "sm")).toBe(true);
    expect(isVisibleAtBreakpoint("block md:hidden", "md")).toBe(false);
    expect(isVisibleAtBreakpoint("hidden md:block", "sm")).toBe(false);
    expect(isVisibleAtBreakpoint("hidden md:block", "md")).toBe(true);
  });

  test("multiple display classes", () => {
    expect(isVisibleAtBreakpoint("block hidden flex", "md")).toBe(true);
  });

  test("all display types", () => {
    const displayTypes = ["block", "flex", "inline", "inline-block", "inline-flex", "grid", "table"];
    displayTypes.forEach((type) => {
      expect(isVisibleAtBreakpoint(type, "md")).toBe(true);
    });
  });

  test("complex scenarios", () => {
    expect(isVisibleAtBreakpoint("sm:hidden md:flex lg:hidden xl:inline-block", "xs")).toBe(false);
    expect(isVisibleAtBreakpoint("sm:hidden md:flex lg:hidden xl:inline-block", "sm")).toBe(false);
    expect(isVisibleAtBreakpoint("sm:hidden md:flex lg:hidden xl:inline-block", "md")).toBe(true);
    expect(isVisibleAtBreakpoint("sm:hidden md:flex lg:hidden xl:inline-block", "lg")).toBe(false);
    expect(isVisibleAtBreakpoint("sm:hidden md:flex lg:hidden xl:inline-block", "xl")).toBe(true);
  });

  test("invalid breakpoints are ignored", () => {
    expect(isVisibleAtBreakpoint("invalid:block md:hidden", "md")).toBe(false);
  });

  test("empty classes", () => {
    expect(isVisibleAtBreakpoint(" ", "md")).toBe(false);
  });
});
