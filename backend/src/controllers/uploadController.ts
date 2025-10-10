import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import pdf from "pdf-parse";
import { pool } from "../db/connect";

export const handleFileUpload = async (req: Request, res: Response) => {
  try {
    const file = req.file as Express.Multer.File | undefined;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = file.path; // absolute path from multer
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await (pdf as any)(dataBuffer);
    const textContent = pdfData?.text || "";

    const fileName = file.originalname;
    const metadata = {
      size: file.size,
      mimetype: file.mimetype,
      storedName: path.basename(filePath),
    };

    // Insert into pdfs table (use JSONB cast)
    const query = `INSERT INTO pdfs (filename, filepath, text_content, metadata)
                   VALUES ($1, $2, $3, $4::jsonb) RETURNING id, created_at`;
    const values = [fileName, filePath, textContent, JSON.stringify(metadata)];

    const result = await pool.query(query, values);
    const inserted = result.rows[0];

    return res.status(201).json({
      message: "File uploaded and parsed successfully",
      id: inserted.id,
      filename: fileName,
      preview: textContent.substring(0, 300),
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
};
