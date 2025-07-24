import dbConnection from "./database/config/connection";

dbConnection().then(() => {
    console.log("[Database] Connected to the database.");
}).catch((err) => {
    console.error("[Database] Unable to connect to the database:", err);
});
