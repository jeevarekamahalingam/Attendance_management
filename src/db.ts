import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
});

(async () => {
  try {
    await pool.connect();
    console.log("DB is connected");
  } catch (err) {
    console.error("DB connection error:", err);
  }
})();

export default pool;