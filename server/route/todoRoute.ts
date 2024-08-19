import express, { Express, Request, Response } from "express";
import { Router } from "express";
import connectionPool from "../utils/db";

const todoRoute = Router();

todoRoute
  .get("/", async (req: Request, res: Response) => {
    try {
      const data = await connectionPool.query("select * from todos");

      if (!data.rows[0]) {
        return res.status(404).json({ message: "Not Found" });
      }
      let sortData: unknown[] = data.rows.sort((a, b) => a.id - b.id);
      return res.status(200).json({ data: sortData });
    } catch {
      return res
        .status(400)
        .json({ message: "Error conneciton from database" });
    }
  })
  .put("/", async (req: Request, res: Response) => {
    const { id, title, set_time, status } = req.body;
    try {
      await connectionPool.query(
        `update todos set title = $1 ,status = $2, set_time = $3 where id = $4`,
        [title, status, set_time, id]
      );

      return res.status(200).json({ data: "update success" });
    } catch {
      return res
        .status(400)
        .json({ message: "Error conneciton from database" });
    }
  });

export default todoRoute;
