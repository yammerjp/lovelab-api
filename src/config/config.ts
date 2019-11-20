import * as dotenv from "dotenv";

interface ReturnConfig {
  host: string;
  port: number;
  dialect: "postgres";
  database: string;
  user: string;
  password: string;
}
const configfunc = (): ReturnConfig => {
  dotenv.config();
  return {
    host: process.env.ENV_HOST || "localhost",
    port: parseInt(process.env.ENV_PORT ?? "5432", 10),
    dialect: "postgres",
    database: process.env.ENV_DATABASE || "database_of_lovelab",
    user: process.env.ENV_USER || "root",
    password: process.env.ENV_PASSWORD || ""
  };
};

export default configfunc;
