import express from "express";
import multer from "multer";
import path from "path";
import { handleFileUpload } from "../controllers/uploadController";

const router = express.Router();

// Folder to store uploaded PDFs
const UPLOADS_DIR = path.resolve(__dirname, "../../uploads");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const safeName = `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;
    cb(null, safeName);
  },
});

// Allowed PDF MIME types
const allowedMimes = [
  "application/pdf",
  "application/x-pdf",
  "application/acrobat",
  "applications/vnd.pdf",
  "text/pdf",
  "text/x-pdf",
];

// File filter to accept only PDFs
const fileFilter = (_req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false); // reject file without throwing TS error
  }
};

// Initialize multer with storage and file filter
const upload = multer({ storage, fileFilter });

// POST route to upload PDF
router.post("/upload", upload.single("file"), handleFileUpload);

export default router;
