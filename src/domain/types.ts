export type Transcript = {
  videoUrl: string; // The URL to the video
  speakers: Speaker[]; // Array of speakers present in this video
  fullText: string; // The text of the call, including all punctuation
  words: Word[]; // A word-by-word breakdown of the call (see the Word type below)
}

export type Speaker = {
  id: number; // The ID of the speaker
  name: string; // The name of the speaker
}

export type Word = {
  value: string; // The word
  speaker: number; // The ID of the speaker who said this word
  startTime: number; // The start time (in seconds since the start of the call) of this word
  endTime: number; // The end time (in seconds since the start of the call) of this word
}

export type Clip = {
  startTime: number; // The time this clip starts, as an offset in seconds
  endTime: number; // The time this clip ends, as an offset in seconds
  speakerId: number; // The ID of the speaker
  speakerName: string; // The name of the speaker
  quote: string; // What they said
};
