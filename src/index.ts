import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { exit } from "process";
import dbConnection from "./database/config/connection";
import errorHandler from "./middleware/errorHandler";
import logger from "./middleware/logger";
import routes from "./routes";
import "./models/associations";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./swagger/swaggerDef";

config();

const app = express();
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(logger);
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
