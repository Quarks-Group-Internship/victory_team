import dotenv from 'dotenv';
import pg from 'pg';
import { Sequelize } from 'sequelize';

dotenv.config();

const dsn: string = process.env.DEV_DATABASE_URL || "";

if (!dsn) {
  throw new Error("DEV_DATABASE_URL is not defined in your environment variables.");
}

const dialectOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
};

export const sequelize: Sequelize = new Sequelize(dsn, {
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions,
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const dbConnection = async () => await sequelize.authenticate();

export default dbConnection;
