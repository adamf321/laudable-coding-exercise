import { TranscriptRepository } from "./repository.js";
import { TranscriptProcessor } from "./transcript.processor.js";
import { Conversation } from "./types.js";

/**
 * This service provides the entry point for consumers to interact with the domain.
 */
export class Service {
  getConversation(videoUrl: string): Conversation {
    const transcript = TranscriptRepository.getTranscript();

    if (transcript.videoUrl !== videoUrl) throw new Error(`Video url not found: ${videoUrl}`);

    const tp = new TranscriptProcessor(transcript);

    return tp.getConversation();
  }
}