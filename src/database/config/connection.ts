import dotenv from "dotenv";
import pg from "pg";
import { Sequelize } from "sequelize";

dotenv.config();

let dsn: string = "";

switch (process.env.NODE_ENV) {
  case "development":
    dsn = process.env.DEV_DATABASE_URL || "";
    break;
  case "test":
    dsn = process.env.TEST_DATABASE_URL || "";
    break;
  case "production":
    dsn = process.env.DATABASE_URL || "";
    break;
  default:
    dsn = process.env.DATABASE_URL || "";
    break;
}

if (!dsn) {
  throw new Error(
    "DEV_DATABASE_URL is not defined in your environment variables.",
  );
}

const dialectOptions = {
  ssl: {
    require: false,
    rejectUnauthorized: false,
  },
};

export const sequelize: Sequelize = new Sequelize(dsn, {
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions,
  logging: console.log,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const dbConnection = async () => {
  return await sequelize.authenticate();
};

export default dbConnection;
