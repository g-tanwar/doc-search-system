import express from "express";
import { getPdfs } from "../controllers/pdfController";
const router = express.Router();
router.get("/pdfs", getPdfs);
export default router;
