import * as mysql from "mysql2/promise.js";
import { conexionDB } from "../data/datos.js";

export const config = {
  host: conexionDB.HOST,
  port: conexionDB.PORT,
  database: conexionDB.DATABASE,
  user: conexionDB.USER,
  password: conexionDB.PASSWORD,
  connectionLimit: 5000,
  charset: "utf8mb4",
};

export async function enableConnect() {
  try {
    const connection = await mysql.createConnection(config);
    console.log("CONNECT TO DATABASE!");
    return connection;
  } catch (err) {
    console.error("No pudo conectarse a la DB: ", err);
    throw err;
  }
}

// NO FUNCIONA, NO CIERRA LA CONEXION
export async function endConnection() {
  await console.log("RELEASE CONNECTION");
  await connection.end();
}
