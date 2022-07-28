import { toMinutesSeconds } from "../../src/utils/time.utils";

describe("Converts seconds to m:ss", () => {
  test("for 0s", () => {
    expect(toMinutesSeconds(0)).toEqual("0:00");
  });

  test("for 1s", () => {
    expect(toMinutesSeconds(1)).toEqual("0:01");
  });

  test("for 59s", () => {
    expect(toMinutesSeconds(59)).toEqual("0:59");
  });

  test("for 60s", () => {
    expect(toMinutesSeconds(60)).toEqual("1:00");
  });

  test("for 61s", () => {
    expect(toMinutesSeconds(61)).toEqual("1:01");
  });

  test("for 10m", () => {
    expect(toMinutesSeconds(600)).toEqual("10:00");
  });

  test("for non-integer seconds less than 10", () => {
    expect(toMinutesSeconds(1.96)).toEqual("0:01.96");
  });

  test("for non-integer seconds greater than 10", () => {
    expect(toMinutesSeconds(21.96)).toEqual("0:21.96");
  });

  test("for many decimal places", () => {
    expect(toMinutesSeconds(21.96758493)).toEqual("0:21.97");
  });

  test("fails for negative seconds", () => {
    expect(() => toMinutesSeconds(-1)).toThrow();
  });
});
