import { Request, Response } from "express";
import { pool } from "../db/connect";

export const createLink = async (req: Request, res: Response) => {
  try {
    const { title, url, description } = req.body;
    const result = await pool.query(
      "INSERT INTO links (title, url, description) VALUES ($1, $2, $3) RETURNING *",
      [title, url, description || ""]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error("Create Link Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getAllLinks = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const result = await pool.query(
      "SELECT * FROM links ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [Number(limit), offset]
    );
    res.json(result.rows);
  } catch (err: any) {
    console.error("Get Links Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const updateLink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, url, description } = req.body;
    const result = await pool.query(
      "UPDATE links SET title=$1, url=$2, description=$3, updated_at=NOW() WHERE id=$4 RETURNING *",
      [title, url, description || "", id]
    );
    res.json(result.rows[0]);
  } catch (err: any) {
    console.error("Update Link Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const deleteLink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM links WHERE id=$1", [id]);
    res.json({ message: "Link deleted successfully" });
  } catch (err: any) {
    console.error("Delete Link Error:", err);
    res.status(500).json({ error: err.message });
  }
};
