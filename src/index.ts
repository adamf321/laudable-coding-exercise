import express, { Express, Response, Request } from "express";
import { Service } from "./domain/service.js";

const app: Express = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Laudable server is running!");
});

app.get("/conversation", (req: Request, res: Response) => {
  const service = new Service();
  const videoUrl = req.query.media_url;

  if (!videoUrl || typeof videoUrl !== "string") throw new Error("media_url is a required parameter");

  res.json(service.getConversation(videoUrl));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
