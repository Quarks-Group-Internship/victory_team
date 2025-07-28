/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
const pg = require("pg");

module.exports = {
  development: {
    use_env_variable: "DEV_DATABASE_URL",
    dialect: "postgres",
    dialectModule: pg,
    dialectOptions: {
      ssl: false,
    },
  },
  test: {
    use_env_variable: "TEST_DATABASE_URL",
    dialect: "postgres",
    dialectModule: pg,
    dialectOptions: {
      ssl: false,
    },
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectModule: pg,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
  },
};
