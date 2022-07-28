import express, { Express, Response, Request } from "express";
import { Service } from "./domain/service.js";
import { getFormattedClips } from "./utils/api.formatter.js";
import { toMinutesSeconds } from "./utils/time.utils.js";

const app: Express = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Laudable server is running!");
});

app.get("/conversation", (req: Request, res: Response) => {
  const service = new Service();
  const videoUrl = req.query.media_url;

  if (!videoUrl || typeof videoUrl !== "string") throw new Error("media_url is a required parameter");

  res.json({
    conversation: getFormattedClips(service.getConversation(videoUrl)),
  });
});

app.get("/clips", (req: Request, res: Response) => {
  const service = new Service();

  const videoUrl = req.query.media_url;
  const startTime = Number(req.query.start_time);
  const endTime = Number(req.query.end_time);

  if (!videoUrl || typeof videoUrl !== "string") throw new Error("media_url is a required parameter");
  if (!startTime || isNaN(startTime)) throw new Error("start_time is a required parameter");
  if (!endTime || isNaN(endTime)) throw new Error("end_time is a required parameter");

  res.json({
    clips: getFormattedClips(service.getClips(videoUrl, startTime, endTime)),
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
