import { Request, Response } from "express";
import { pool } from "../db/connect";

export const createFAQ = async (req: Request, res: Response) => {
  try {
    const { title, content, tags } = req.body;
    const result = await pool.query(
      "INSERT INTO faqs (title, content, tags) VALUES ($1, $2, $3) RETURNING *",
      [title, content, tags || []]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error("Create FAQ Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getAllFAQs = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const result = await pool.query(
      "SELECT * FROM faqs ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [Number(limit), offset]
    );
    res.json(result.rows);
  } catch (err: any) {
    console.error("Get FAQs Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const updateFAQ = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    const result = await pool.query(
      "UPDATE faqs SET title=$1, content=$2, tags=$3, updated_at=NOW() WHERE id=$4 RETURNING *",
      [title, content, tags || [], id]
    );
    res.json(result.rows[0]);
  } catch (err: any) {
    console.error("Update FAQ Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const deleteFAQ = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM faqs WHERE id=$1", [id]);
    res.json({ message: "FAQ deleted successfully" });
  } catch (err: any) {
    console.error("Delete FAQ Error:", err);
    res.status(500).json({ error: err.message });
  }
};
