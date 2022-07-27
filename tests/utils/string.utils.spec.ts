import { addLeadingZeroes } from "../../src/utils/string.utils";

describe("Add leading zeroes", () => {
  test("for single digit with total length 2", () => {
    expect(addLeadingZeroes(6, 2)).toEqual("06");
  });

  test("for single digit with total length 1", () => {
    expect(addLeadingZeroes(6, 1)).toEqual("6");
  });

  test("for double digits with total length 2", () => {
    expect(addLeadingZeroes(62, 2)).toEqual("62");
  });

  test("for double digits with total length 1", () => {
    expect(addLeadingZeroes(62, 1)).toEqual("62");
  });

  test("for double digits with total length 10", () => {
    expect(addLeadingZeroes(62, 10)).toEqual("0000000062");
  });

  test("with total length 0", () => {
    expect(addLeadingZeroes(2, 0)).toEqual("2");
  });

  test("with total length -1", () => {
    expect(addLeadingZeroes(2, -1)).toEqual("2");
  });

  test("with 0", () => {
    expect(addLeadingZeroes(0, 2)).toEqual("00");
  });

  test("with decimal no padding", () => {
    expect(addLeadingZeroes(0.8, 1)).toEqual("0.8");
  });

  test("with decimal and padding", () => {
    expect(addLeadingZeroes(0.8, 4)).toEqual("00.8");
  });
});
