import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db/connect";

dotenv.config();

const app = express();

// Allow all origins
app.use(cors({ origin: "*" }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("🚀 Document Search Backend Running Successfully!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
