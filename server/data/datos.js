import dotenv from "dotenv";
dotenv.config();

/* NOTA: Se utilizan datos de archivo .env */

// Configuracion de la base de datos
export const conexionDB = {
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  DATABASE: process.env.DB_NAME,
  PASSWORD: process.env.DB_PASSWORD,
  USER: process.env.DB_USER
};

// Configuracion del servidor
export const servidor = {
  PRODUCTION: process.env.PRODUCTION,
  PROD_SERVER_HOST: process.env.PROD_SERVER_HOST,
  SERVER_HOST: process.env.SERVER_HOST,
  SERVER_PORT: process.env.SERVER_PORT
};

// Configuracion de JWT
export const jwt = {
  SECRET: process.env.JWT_SECRET,
  EXPIRATION: process.env.JWT_EXPIRATION,
  COOKIE_EXPIRES: process.env.JWT_COOKIE_EXPIRES
};
