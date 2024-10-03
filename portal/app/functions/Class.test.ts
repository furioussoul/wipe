import { each } from "lodash-es";
import { getModForCls, getMqForCls, getPropertyForClass, getPureClsName } from "./Class";
import { CLASSES_LIST } from "../constants/CLASSES_LIST";
import { convertArbitraryToTailwindClass } from "./ConvertArbitraryToTailwindClass.ts";

describe("Class functions", () => {
  test.skip("convertArbitraryToTw", () => {
    expect(convertArbitraryToTailwindClass("")).toBe("");

    expect(convertArbitraryToTailwindClass("space-x-[4px]")).toBe("space-x-1");

    //* PERCENTAGE VALUE TEST FOR [w/h]
    expect(convertArbitraryToTailwindClass("w-[50%]")).toBe("w-1/2");
    expect(convertArbitraryToTailwindClass("h-[100%]")).toBe("h-full");
    expect(convertArbitraryToTailwindClass("w-[25%]")).toBe("w-1/4");
    expect(convertArbitraryToTailwindClass("p-[20px]")).toBe("p-5");
    expect(convertArbitraryToTailwindClass("hover:h-[20%]")).toBe("hover:h-1/5");
    expect(convertArbitraryToTailwindClass("before:w-[75%]")).toBe("before:w-3/4");
    expect(convertArbitraryToTailwindClass("after:w-[40%]")).toBe("after:w-2/5");
    expect(convertArbitraryToTailwindClass("first:w-[33.33%]")).toBe("first:w-1/3");
    expect(convertArbitraryToTailwindClass("last:w-[66.67%]")).toBe("last:w-2/3");

    //* PIXEL VALUE TEST FOR  [w/h/p/m]
    expect(convertArbitraryToTailwindClass("w-[384px]")).toBe("w-96");
    expect(convertArbitraryToTailwindClass("h-[240px]")).toBe("h-60");

    expect(convertArbitraryToTailwindClass("p-[208px]")).toBe("p-52");
    expect(convertArbitraryToTailwindClass("pl-[192px]")).toBe("pl-48");
    expect(convertArbitraryToTailwindClass("pr-[176px]")).toBe("pr-44");
    expect(convertArbitraryToTailwindClass("pt-[160px]")).toBe("pt-40");
    expect(convertArbitraryToTailwindClass("pb-[128px]")).toBe("pb-32");
    expect(convertArbitraryToTailwindClass("px-[128px]")).toBe("px-32");
    expect(convertArbitraryToTailwindClass("py-[128px]")).toBe("py-32");
    expect(convertArbitraryToTailwindClass("hover:p-[64px]")).toBe("hover:p-16");
    expect(convertArbitraryToTailwindClass("disabled:p-[1px]")).toBe("disabled:p-px");
    expect(convertArbitraryToTailwindClass("first-line:p-[0px]")).toBe("first-line:p-0");

    expect(convertArbitraryToTailwindClass("m-[2px]")).toBe("m-0.5");
    expect(convertArbitraryToTailwindClass("ml-[0px]")).toBe("ml-0");
    expect(convertArbitraryToTailwindClass("mr-[1px]")).toBe("mr-px");
    expect(convertArbitraryToTailwindClass("mt-[4px]")).toBe("mt-1");
    expect(convertArbitraryToTailwindClass("mb-[10px]")).toBe("mb-2.5");
    expect(convertArbitraryToTailwindClass("mx-[16px]")).toBe("mx-4");
    expect(convertArbitraryToTailwindClass("my-[40px]")).toBe("my-10");
    expect(convertArbitraryToTailwindClass("active:m-[64px]")).toBe("active:m-16");
    expect(convertArbitraryToTailwindClass("first-letter:m-[320px]")).toBe("first-letter:m-80");

    expect(convertArbitraryToTailwindClass("max-h-[14px]")).toBe("max-h-3.5");
    expect(convertArbitraryToTailwindClass("max-h-[208px]")).toBe("max-h-52");
    expect(convertArbitraryToTailwindClass("focus:max-h-[64px]")).toBe("focus:max-h-16");

    // * REM VALUE TEST FOR  [w/h/p/m]
    expect(convertArbitraryToTailwindClass("w-[0.125rem]")).toBe("w-0.5");
    expect(convertArbitraryToTailwindClass("h-[0.25rem]")).toBe("h-1");

    expect(convertArbitraryToTailwindClass("p-[0.5rem]")).toBe("p-2");
    expect(convertArbitraryToTailwindClass("pl-[0.625rem]")).toBe("pl-2.5");
    expect(convertArbitraryToTailwindClass("pr-[1.5rem]")).toBe("pr-6");
    expect(convertArbitraryToTailwindClass("pt-[1.75rem]")).toBe("pt-7");
    expect(convertArbitraryToTailwindClass("pb-[0.875rem]")).toBe("pb-3.5");
    expect(convertArbitraryToTailwindClass("px-[20rem]")).toBe("px-80");
    expect(convertArbitraryToTailwindClass("py-[24rem]")).toBe("py-96");
    expect(convertArbitraryToTailwindClass("hover:p-[11rem]")).toBe("hover:p-44");
    expect(convertArbitraryToTailwindClass("disabled:p-[12rem]")).toBe("disabled:p-48");
    expect(convertArbitraryToTailwindClass("first-line:p-[14rem]")).toBe("first-line:p-56");

    expect(convertArbitraryToTailwindClass("m-[10rem]")).toBe("m-40");
    expect(convertArbitraryToTailwindClass("ml-[9rem]")).toBe("ml-36");
    expect(convertArbitraryToTailwindClass("mr-[8rem]")).toBe("mr-32");
    expect(convertArbitraryToTailwindClass("mt-[7rem]")).toBe("mt-28");
    expect(convertArbitraryToTailwindClass("mb-[6rem]")).toBe("mb-24");
    expect(convertArbitraryToTailwindClass("mx-[5rem]")).toBe("mx-20");
    expect(convertArbitraryToTailwindClass("my-[4rem]")).toBe("my-16");
    expect(convertArbitraryToTailwindClass("active:m-[3rem]")).toBe("active:m-12");
    expect(convertArbitraryToTailwindClass("first-letter:m-[2rem]")).toBe("first-letter:m-8");

    expect(convertArbitraryToTailwindClass("max-h-[10rem]")).toBe("max-h-40");
    expect(convertArbitraryToTailwindClass("max-h-[0.5rem]")).toBe("max-h-2");
    expect(convertArbitraryToTailwindClass("focus:max-h-[0.25rem]")).toBe("focus:max-h-1");

    //* TEST FOR MAX-WIDTH
    expect(convertArbitraryToTailwindClass("max-w-[0rem]")).toBe("max-w-0");
    expect(convertArbitraryToTailwindClass("max-w-[20rem]")).toBe("max-w-xs");
    expect(convertArbitraryToTailwindClass("max-w-[42rem]")).toBe("max-w-2xl");
    expect(convertArbitraryToTailwindClass("max-w-[1280px]")).toBe("max-w-7xl");
    expect(convertArbitraryToTailwindClass("max-w-[1024px]")).toBe("max-w-5xl");
    expect(convertArbitraryToTailwindClass("max-w-[512px]")).toBe("max-w-lg");
    expect(convertArbitraryToTailwindClass("max-w-[100%]")).toBe("max-w-full");
    expect(convertArbitraryToTailwindClass("hover:max-w-[512px]")).toBe("hover:max-w-lg");
    expect(convertArbitraryToTailwindClass("first-letter:max-w-[320px]")).toBe("first-letter:max-w-xs");
  });

  test("getMqForClass", () => {
    expect(getMqForCls("")).toEqual("");
    expect(getMqForCls("flex")).toEqual("xs");
    expect(getMqForCls("sm:flex")).toEqual("sm");
    expect(getMqForCls("sm:hover:flex")).toEqual("sm");
    expect(getMqForCls("dark:2xl:flex")).toEqual("2xl");
  });

  test("getModForClass", () => {
    expect(getModForCls("")).toEqual("");
    expect(getModForCls("flex")).toEqual("");
    expect(getModForCls("hover:flex")).toEqual("hover");
    expect(getModForCls("in-range:flex")).toEqual("in-range");
  });

  test("getPureClsName", () => {
    expect(getPureClsName("")).toEqual("");
    expect(getPureClsName("flex")).toEqual("flex");
    expect(getPureClsName("sm:flex")).toEqual("flex");
    expect(getPureClsName("dark:sm:flex")).toEqual("flex");
    expect(getPureClsName("dark:sm:hover:flex ")).toEqual("flex");
  });

  test("getPropertyForClass", () => {
    expect(getPropertyForClass("rounded-lg")).toBe("borderRadius");
    // check for all available classes
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in CLASSES_LIST) {
      each(CLASSES_LIST[key].classes, (pureCls: string) => {
        expect(getPropertyForClass(pureCls)).toBe(key);
      });
    }

    // //colors
    expect(getPropertyForClass("text-red-500")).toEqual("textColor");
    expect(getPropertyForClass("from-red-500")).toEqual("fromColor");
    expect(getPropertyForClass("via-red-500")).toEqual("viaColor");
    expect(getPropertyForClass("leading-[2px]")).toEqual("lineHeight");
  });
});
