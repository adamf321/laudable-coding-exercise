import { Transcript } from "./types.js";
import { TRANSCRIPT } from "../db.js";

export class TranscriptRepository {

  /**
   * Gets the single transcript present in the "database". See models.ts for documentation on the data provided.
   */
  static getTranscript(): Transcript {
    return TRANSCRIPT;
  }

}