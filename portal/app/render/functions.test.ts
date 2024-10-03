import { addPrefixToClasses, convertToBlocks } from "./functions";
import { ChaiBlock } from "../types/ChaiBlock";

// Test addPrefixToClasses function
describe("addPrefixToClasses", () => {
  it("should prefix classes without states or media queries", () => {
    const classes = "bg-red-500 text-white";
    const prefix = "test-";
    const expectedClasses = "test-bg-red-500 test-text-white";
    expect(addPrefixToClasses(classes, prefix)).toBe(expectedClasses);
  });

  it("should prefix classes with states or media queries", () => {
    const classes = "hover:bg-red-500 dark:text-white";
    const prefix = "test-";
    const expectedClasses = "hover:test-bg-red-500 dark:test-text-white";
    expect(addPrefixToClasses(classes, prefix)).toBe(expectedClasses);
  });
});

// Test convertToBlocks function
describe("convertToBlocks", () => {
  it("should return an empty array when given an empty string", () => {
    expect(convertToBlocks("")).toEqual([]);
  });

  it("should return an error block when given invalid JSON", () => {
    const invalidJson = "some invalid json";
    const expectedErrorBlock: ChaiBlock = {
      _type: "Paragraph",
      _id: "error",
      content: "Invalid JSON. Please check the JSON string.",
    };
    expect(convertToBlocks(invalidJson)).toEqual([expectedErrorBlock]);
  });

  it("should filter out blocks with _type starting with @chai/", () => {
    const jsonString = JSON.stringify([
      { _type: "@chai/type", _id: "1", content: "Block 1" },
      { _type: "Paragraph", _id: "2", content: "Block 2" },
    ]);
    const expectedBlocks: ChaiBlock[] = [{ _type: "Paragraph", _id: "2", content: "Block 2" }];
    expect(convertToBlocks(jsonString)).toEqual(expectedBlocks);
  });

  it("should return all blocks if none starts with @chai", () => {
    const jsonString = JSON.stringify([
      { _type: "Paragraph", _id: "1", content: "Block 1" },
      { _type: "Header", _id: "2", content: "Block 2" },
    ]);
    const expectedBlocks: ChaiBlock[] = [
      { _type: "Paragraph", _id: "1", content: "Block 1" },
      { _type: "Header", _id: "2", content: "Block 2" },
    ];
    expect(convertToBlocks(jsonString)).toEqual(expectedBlocks);
  });
});
