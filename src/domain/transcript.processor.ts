import { toMinutesSeconds } from "../utils/time.utils.js";
import { Conversation, Transcript } from "./types.js";

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
   * Get the transcript in conversation format
   */
  getConversation = (): Conversation => {
    // Sort the words by timestamp in case they are not already ordered (if we can assume they are then this step could be removed)
    const words = this.transcript.words.sort((a, b) => a.startTime - b.startTime);

    const conversation: Conversation = [];

    for (const [index, word] of words.entries()) {
      const lastQuote = conversation.length ? conversation[conversation.length - 1] : null;

      if (!lastQuote || word.speaker !== lastQuote.speakerId) {
        const speaker = this.transcript.speakers.find(s => s.id === word.speaker);

        if (!speaker) throw new Error(`Speaker ${word.speaker} was not found in this transcript`)

        conversation.push({
          timestamp: toMinutesSeconds(word.startTime),
          speakerId: speaker.id,
          speakerName: speaker.name,
          quote: this.getWordWithPunctuation(index),
        });

        continue;
      }

      conversation[conversation.length - 1].quote += ` ${this.getWordWithPunctuation(index)}`;
    }

    return conversation;
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
