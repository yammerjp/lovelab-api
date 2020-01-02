import * as dotenv from "dotenv";

interface ReturnConfig {
  host: string;
  port: number;
  dialect: "postgres";
  database: string;
  user: string;
  password: string;
}

const configfunc = (): ReturnConfig | null => {
  dotenv.config();

  if (
    process.env.POSTGRES_HOST === undefined ||
    process.env.POSTGRES_PORT === undefined ||
    process.env.POSTGRES_DATABASE_UNROOT === undefined ||
    process.env.POSTGRES_USER_UNROOT === undefined ||
    process.env.POSTGRES_PASSWORD_UNROOT === undefined
  ) {
    return null;
  }

  const returnConfig: ReturnConfig = {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    dialect: "postgres",
    database: process.env.POSTGRES_DATABASE_UNROOT,
    user: process.env.POSTGRES_USER_UNROOT,
    password: process.env.POSTGRES_PASSWORD_UNROOT
  };
  return returnConfig;
};

export default configfunc;
