const dotenv = require("dotenv");
dotenv.config();

const conexionDB = {
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  DATABASE: process.env.DB_DATABASE,
  PASSWORD: process.env.DB_PASSWORD,
  USER: process.env.DB_USER,
};

const servidor = {
  SERVER_HOST: process.env.SERVER_HOST,
  SERVER_PORT: process.env.SERVER_PORT,
};

module.exports = { conexionDB, servidor };
