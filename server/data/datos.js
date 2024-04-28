import dotenv from "dotenv";
dotenv.config();

/* NOTA: Se utilizan datos de archivo .env */

// Configuracion de la base de datos
export const conexionDB = {
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  DATABASE: process.env.DB_DATABASE,
  PASSWORD: process.env.DB_PASSWORD,
  USER: process.env.DB_USER,
};

// Configuracion del servidor
export const servidor = {
  SERVER_HOST: process.env.SERVER_HOST,
  SERVER_PORT: process.env.SERVER_PORT,
};
