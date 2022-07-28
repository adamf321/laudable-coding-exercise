import { TranscriptRepository } from "./repository.js";
import { TranscriptProcessor } from "./transcript.processor.js";
import { Conversation } from "./types.js";

/**
 * This service provides the entry point for consumers to interact with the domain.
 */
export class Service {
  /**
   * Get a full conversation transcript
   * @param videoUrl The URL of the video
   */
  getConversation(videoUrl: string): Conversation {
    const transcript = TranscriptRepository.getTranscript();

    if (transcript.videoUrl !== videoUrl) throw new Error(`Video url not found: ${videoUrl}`);

    const tp = new TranscriptProcessor(transcript);

    return tp.getConversation();
  }

  /**
   * Gets a partial conversation ("clip") from the transcript.
   * Note: used a separate method here instead of overloading getConversation to be explicit about how to get a "clip", which is the business term 
   * @param videoUrl  The URL of the video
   * @param startTime The start time offset in seconds
   * @param endTime   The end time offset in seconds
   * @returns 
   */
  getClip(videoUrl: string, startTime: number, endTime: number): Conversation {
    const transcript = TranscriptRepository.getTranscript();

    if (transcript.videoUrl !== videoUrl) throw new Error(`Video url not found: ${videoUrl}`);

    const tp = new TranscriptProcessor(transcript);

    return tp.getConversation(startTime, endTime);
  }
}
