import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const dburl: string = process.env.DEV_DATABASE_URL || "";
console.log("Iri gu connectinga... kuri:", dburl);

if (!dburl) {
  throw new Error("DEV_DATABASE_URL is not defined in your environment variables.");
}

const dialectOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
};

export const sequelizeConnection: Sequelize = new Sequelize(dburl, {
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

const connectToDatabase = async () => {
  try {
    await sequelizeConnection.authenticate();
    console.log('Connection to database established successfully.');
    return sequelizeConnection;
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    throw err;
  }
};

export default connectToDatabase;
