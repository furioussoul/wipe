import { intersection } from "lodash-es";
import { getBgImageValue, getBreakpointValue } from "./Functions.ts";

test("get background image css property value", () => {
  expect(getBgImageValue("")).toBe("");
  expect(getBgImageValue("https://picsum.photos/300")).toBe("url('https://picsum.photos/300')");
  expect(getBgImageValue("linear-gradient(red, yellow);")).toBe("linear-gradient(red, yellow)");
});

const getBlockGroups = (fullList: string[], fromDb: string[]) => ["Global", ...intersection(fromDb, fullList)];

test("merge block groups in order", () => {
  const groups: string[] = [
    "Global",
    "layouts",
    "navigation",
    "hero",
    "content",
    "features",
    "forms",
    "blog",
    "pricing",
    "stats",
    "steps",
    "faq",
    "team",
    "testimonials",
    "call_to_action",
    "footers",
  ];
  const fromDb = ["navigation", "footers"];
  expect(getBlockGroups(groups, fromDb)).toEqual(["Global", "navigation", "footers"]);
});

describe("getBreakpointValue", () => {
  test("returns correct breakpoint value for various widths", () => {
    expect(getBreakpointValue(1600)).toBe("2XL");
    expect(getBreakpointValue(1300)).toBe("XL");
    expect(getBreakpointValue(1100)).toBe("LG");
    expect(getBreakpointValue(800)).toBe("MD");
    expect(getBreakpointValue(650)).toBe("SM");
    expect(getBreakpointValue(600)).toBe("XS");
  });

  test("returns 'XS' for width less than 640", () => {
    expect(getBreakpointValue(500)).toBe("XS");
  });

  test("returns '2XL' for width equal to 1536", () => {
    expect(getBreakpointValue(1536)).toBe("2XL");
  });

  test("returns 'XS' for width equal to 640", () => {
    expect(getBreakpointValue(640)).toBe("SM");
  });
});

describe("getBgImageValue", () => {
  test("returns empty string when value is empty", () => {
    expect(getBgImageValue("")).toBe("");
  });

  test("returns url format when value starts with http", () => {
    expect(getBgImageValue("https://example.com")).toBe("url('https://example.com')");
  });

  test("returns value without semicolon when value does not start with http", () => {
    expect(getBgImageValue("linear-gradient(red, yellow);")).toBe("linear-gradient(red, yellow)");
  });

  test("returns value as is when value does not start with http and has no semicolon", () => {
    expect(getBgImageValue("linear-gradient(red, yellow)")).toBe("linear-gradient(red, yellow)");
  });
});
