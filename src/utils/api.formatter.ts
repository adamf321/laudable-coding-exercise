import { Clip } from "../domain/types.js";
import { toMinutesSeconds } from "./time.utils.js";

type ApiClip = {
  timestamp: string;
  range: string;
  speaker_name: string;
  quote: string;
}

export function getFormattedClips(conversation: Clip[]): ApiClip[] {
  return conversation.map((c: Clip) => ({
    timestamp: toMinutesSeconds(c.startTime),
    range: `${toMinutesSeconds(c.startTime)}-${toMinutesSeconds(c.endTime)}`,
    speaker_name: c.speakerName,
    quote: c.quote,
  }));
}
