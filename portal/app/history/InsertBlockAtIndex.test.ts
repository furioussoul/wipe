import { insertBlocksAtPosition } from "./InsertBlocksAtPosition.ts";

const BLOCK_1 = { _id: "1" };

const BLOCK_2 = { _id: "2" };
const BLOCK_2_1 = { _id: "2_1", _parent: "2" };
const BLOCK_2_2 = { _id: "2_2", _parent: "2" };
const BLOCK_2_ALL = [BLOCK_2, BLOCK_2_1, BLOCK_2_2];

const BLOCK_3 = { _id: "3" };
// const BLOCK_3_1 = { _id: "3_1", _parent: "3" };
// const BLOCK_3_2 = { _id: "3_2", _parent: "3" };
// const BLOCK_3_ALL = [BLOCK_3, BLOCK_3_1, BLOCK_3_2];

describe("insertBlocksAtPosition", () => {
  test("insertBlocksAtPosition", () => {
    expect(insertBlocksAtPosition([], [BLOCK_1])).toEqual([BLOCK_1]);
    expect(insertBlocksAtPosition([BLOCK_1], [BLOCK_2, BLOCK_2_1])).toEqual([BLOCK_1, BLOCK_2, BLOCK_2_1]);

    expect(insertBlocksAtPosition([BLOCK_1, ...BLOCK_2_ALL], [BLOCK_3], "2", 1)).toEqual([
      BLOCK_1,
      BLOCK_2,
      BLOCK_2_1,
      BLOCK_3,
      BLOCK_2_2,
    ]);

    expect(insertBlocksAtPosition([BLOCK_1, BLOCK_2], [BLOCK_3], undefined, 1)).toEqual([BLOCK_1, BLOCK_3, BLOCK_2]);
    expect(insertBlocksAtPosition([BLOCK_1, ...BLOCK_2_ALL], [BLOCK_3], "2")).toEqual([
      BLOCK_1,
      BLOCK_2,
      BLOCK_2_1,
      BLOCK_2_2,
      BLOCK_3,
    ]);
  });
});
