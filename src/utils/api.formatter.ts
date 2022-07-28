import { Clip } from "../domain/types.js";
import { toMinutesSeconds } from "./time.utils.js";

type ApiClip = {
  timestamp: string; // Start time in m:ss format
  range: string; // start and end time in mm:ss-m:ss format
  speaker_name: string;
  quote: string;
}

/**
 * Convert an array of clips into an array of api formatted clips
 * @param clips 
 */
export function getFormattedClips(clips: Clip[]): ApiClip[] {
  return clips.map((c: Clip) => ({
    timestamp: toMinutesSeconds(c.startTime),
    range: `${toMinutesSeconds(c.startTime)}-${toMinutesSeconds(c.endTime)}`,
    speaker_name: c.speakerName,
    quote: c.quote,
  }));
}
