import * as pg from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  host: process.env.ENV_HOST,
  port: parseInt(process.env.ENV_PORT ?? "5432", 10),
  database: process.env.ENV_DATABASE,
  user: process.env.ENV_USER,
  password: process.env.ENV_PASSWORD
});

export default pool;
