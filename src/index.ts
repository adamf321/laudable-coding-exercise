import express, { Express, Response, Request } from "express";

const app: Express = express();
const port = 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('Laudable server is running!');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
