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
    const { id, set_time, status } = req.body;
    try {
      await connectionPool.query(
        `update todos set status = $1, set_time = $2 where id = $3`,
        [status, set_time, id]
      );

      return res.status(200).json({ data: "update success" });
    } catch {
      return res
        .status(400)
        .json({ message: "Error conneciton from database" });
    }
  })
  .post("/", async (req: Request, res: Response) => {
    const { title } = req.body;
    try {
      await connectionPool.query(
        `insert into todos (title, status) values ($1, $2)`,
        [title, "incompleted"]
      );

      return res.status(200).json({ data: "add todo success" });
    } catch {
      return res
        .status(400)
        .json({ message: "Error conneciton from database" });
    }
  })
  .delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await connectionPool.query(`delete from todos where id = $1`, [id]);

      return res.status(200).json({ data: "delete success" });
    } catch {
      return res
        .status(400)
        .json({ message: "Error conneciton from database" });
    }
  });

export default todoRoute;
