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
      const lastSegment = conversation.length ? conversation[conversation.length - 1] : null;

      if (!lastSegment || word.speaker !== lastSegment.speakerId) {
        const speaker = this.transcript.speakers.find(s => s.id === word.speaker);

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
  private getWordWithPunctuation = (index: number): string => this.fullTextWordArray[index];
}
