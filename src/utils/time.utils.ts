import { addLeadingZeroes } from "./string.utils.js";

/**
 * Convert seconds to m:ss format
 * @param seconds the time in seconds from the start of the media
 */
export const toMinutesSeconds = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);  
  const secs = seconds % 60;

  return `${mins}:${addLeadingZeroes(secs, 2)}`;
}
