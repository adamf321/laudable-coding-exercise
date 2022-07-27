import express, { Express, Response, Request } from "express";
import { TranscriptProcessor } from "./models/transcript.processor.js";
import { TranscriptRepository } from "./models/repository.js";

const app: Express = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Laudable server is running!");
});

app.get("/conversation", (req: Request, res: Response) => {
  const transcript = TranscriptRepository.getTranscript();
  const tp = new TranscriptProcessor(transcript);

  res.json(tp.getConversation());
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
