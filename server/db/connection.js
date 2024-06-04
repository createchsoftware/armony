import * as mysql from "mysql2/promise.js";
import { conexionDB } from "../data/datos.js";

export const config = {
  // Configuracion para la conexion de la base de datos
  host: conexionDB.HOST,
  port: conexionDB.PORT,
  database: conexionDB.DATABASE,
  user: conexionDB.USER,
  password: conexionDB.PASSWORD,
  connectionLimit: 30,
  charset: "utf8mb4",
};

// Variable que almacenara la base de datos
let pool;

// Establecemos conexion con la base de datos
export async function enableConnect() {
  try {
    pool = mysql.createPool(config); // Creamos la conexion con la configuracion declarada anteriormente
    await pool.query("USE armony;");
    console.log("CONNECT TO DATABASE!");
    return pool; // Retornamos la conexion
  } catch (err) {
    // Capturamos error de conexion
    throw err; // Tiramos el error para detener ejecucion
  }
}

/* Realizamos la conexion con la base de datos capturando cualquier error y mostrandolo por consola*/
enableConnect().catch((err) => {
  console.error(err);
});
// Cierre de conexion con la base de datos
export async function endConnection() {
  if (pool) {
    console.log("RELEASE CONNECTION");
    await pool.releaseConnection();
  }
}

/* Exportamos la variable pool con el nombre conexion para evitar
  incongruencias en el resto del codigo*/
export { pool as conexion };
