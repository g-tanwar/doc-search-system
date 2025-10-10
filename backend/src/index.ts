import express from "express";
import cors from "cors";
import { initDB } from "./db/initDB";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

initDB();

app.get("/api", (req, res) => {
  console.log("📩 Received GET / request from:", req.ip);
  res.send("🚀 Document Search System Backend is Running!");
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
