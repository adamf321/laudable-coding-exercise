/**
 * Add leading zeroes to a number, e.g. 1 becomes "01" with totalLength = 2
 * @param num the number
 * @param totalLength the total length including leading zeroes
 */
export const addLeadingZeroes = (num: number, totalLength: number): string => {
  return String(num).padStart(totalLength, "0");
}
