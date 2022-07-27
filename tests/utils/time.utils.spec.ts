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

  test("fails for negative seconds", () => {
    expect(() => toMinutesSeconds(-1)).toThrow();
  });

  test("fails for decimal seconds", () => {
    expect(() => toMinutesSeconds(1.8)).toThrow();
  });
});
