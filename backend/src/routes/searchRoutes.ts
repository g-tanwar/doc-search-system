import express, { Request, Response } from "express";
import { pool } from "../db/connect";

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    if (!query) return res.status(400).json({ error: "Query parameter missing" });

    const sql = `
      SELECT id, filename, text_content, created_at
      FROM pdfs
      WHERE text_content ILIKE $1
      ORDER BY created_at DESC;
    `;
    const values = [`%${query}%`];
    const result = await pool.query(sql, values);

    res.status(200).json({ results: result.rows });
  } catch (err: any) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
