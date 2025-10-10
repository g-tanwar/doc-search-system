import express from "express";
import cors from "cors";
import { initDB } from "./db/initDB";
import dotenv from "dotenv";
import uploadRoutes from "./routes/uploadRoutes";
import fs from "fs";
import path from "path";
import pdfRoutes from "./routes/pdfRoutes";



dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", uploadRoutes);
app.use("/api", pdfRoutes);

initDB();

app.get("/api", (req, res) => {
  console.log("📩 Received GET / request from:", req.ip);
  res.send("🚀 Document Search System Backend is Running!");
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

const UPLOADS_DIR = path.resolve(__dirname, "../../uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  console.log(`✅ Created uploads dir: ${UPLOADS_DIR}`);
}
