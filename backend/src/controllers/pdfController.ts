import { Request, Response } from "express";
import { pool } from "../db/connect";

export const getPdfs = async (_req: Request, res: Response) => {
  try {
    const { rows } = await pool.query("SELECT id, filename, created_at FROM pdfs ORDER BY created_at DESC LIMIT 100");
    res.json(rows);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
