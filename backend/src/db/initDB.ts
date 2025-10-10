import { pool } from "./connect";
import fs from "fs";
import path from "path";

export const initDB = async () => {
  try {
    const schemaPath = path.join(__dirname, "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");
    await pool.query(schema);
    console.log("✅ Database initialized successfully");
  } catch (err) {
    console.error("❌ Error initializing DB:", err);
  }
};
