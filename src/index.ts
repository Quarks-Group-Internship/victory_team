import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { exit } from "process";
import dbConnection from "./database/config/connection";
import errorHandler from "./middleware/errorHandler";
import logger from "./middleware/logger";
import routes from "./routes";

config();

const app = express();

app.use(cors());
app.use(logger);
app.use(express.json());

app.use("/", routes);

app.use(errorHandler);

dbConnection()
  .then(() => {
    console.log("[Database] Connected to the database.");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error("[Database] Unable to connect to the database:", err.message);
    exit(1);
  });
