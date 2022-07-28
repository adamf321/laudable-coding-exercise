/**
 * Convert seconds to m:ss format
 * @param seconds the time in seconds from the start of the media
 */
export const toMinutesSeconds = (seconds: number): string => {
  if (seconds < 0) throw new Error("seconds must be a positive number");

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins}:${secs < 10 ? "0" : ""}${Math.round((secs + Number.EPSILON) * 100) / 100}`;
}
