import express from "express";
import multer from "multer";
import path from "path";
import { handleFileUpload } from "../controllers/uploadController";

const router = express.Router();

const UPLOADS_DIR = path.resolve(__dirname, "../../uploads");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const safeName = `${Date.now()}-${file.originalname.replace(/\s+/g,'_')}`;
    cb(null, safeName);
  },
});

// Accept only PDFs (optional)
const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files are allowed") as any, false);
  };
  

const upload = multer({ storage, fileFilter });

router.post("/upload", upload.single("file"), handleFileUpload);

export default router;
