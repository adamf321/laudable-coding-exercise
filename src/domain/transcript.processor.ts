import { Clip, Transcript } from "./types.js";

/**
 * Class to represent a transcript with methods that can be run on it
 */
export class TranscriptProcessor {
  private transcript: Transcript;
  private fullTextWordArray: string[];

  constructor(transcript: Transcript) {
    this.transcript = transcript;
    this.fullTextWordArray = this.transcript.fullText.split(" "); // Do this once here so we can use it in getWordWithPunctuation
  }

  /**
   * Get the clips for this transcript
   * @param start Start getting the conversation from this point (in seconds)
   * @param end   Stop getting the conversation beyond this point (in seconds)
   */
  getClips = (startTime: number = 0, endTime: number = Infinity): Clip[] => {
    // Sort the words by timestamp in case they are not already ordered (if we can assume they are then this step could be removed)
    const words = this.transcript.words.sort((a, b) => a.startTime - b.startTime);

    const clips: Clip[] = [];

    for (const [index, word] of words.entries()) {
      // Check for invalid words
      if (word.startTime < 0 || word.endTime < word.startTime) throw new Error(`${word} has invalid start/end time`);

      // Skip words that end before the startTime
      if (word.endTime < startTime) continue;

      // Exit the loop if the word starts after the endTime (all subsequent words will also start after the endTime)
      if (word.startTime > endTime) break;

      const lastQuote = clips.length ? clips[clips.length - 1] : null;

      if (!lastQuote || word.speaker !== lastQuote.speakerId) { // Start a new clip if the conditions are met
        const speaker = this.transcript.speakers.find(s => s.id === word.speaker);

        if (!speaker) throw new Error(`Speaker ${word.speaker} was not found in this transcript`)

        clips.push({
          startTime:word.startTime,
          endTime: word.endTime,
          speakerId: speaker.id,
          speakerName: speaker.name,
          quote: this.getWordWithPunctuation(index),
        });

        continue;
      }

      clips[clips.length - 1].quote += ` ${this.getWordWithPunctuation(index)}`;
      clips[clips.length - 1].endTime = word.endTime;
    }

    return clips;
  }

  /**
   * Returns the full word with punctuation (the words array strips out punctuation so we use this to get it back)
   * @param index The index of the word in the full text of the transcript
   */
  private getWordWithPunctuation = (index: number): string => {
    const word = this.fullTextWordArray[index];
    if (!word) throw new Error(`Word at index ${index} not found in the fullText of this transcript`);
    return word;
  }
}
