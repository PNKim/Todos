import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoute from "./route/todoRoute";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/todo", todoRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
