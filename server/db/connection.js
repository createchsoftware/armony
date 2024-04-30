import * as mysql from "mysql2/promise.js";
import { conexionDB } from "../data/datos.js";

export const config = {
  // Configuracion para la conexion de la base de datos
  host:process.env.DB_Host,
  port:process.env.DB_port,
  database:process.env.DB_database,
  user:process.env.DB_user,
  password:process.env.DB_password,
  connectionLimit: 5000,
  charset: "utf8mb4",
};

// Establecemos conexion con la base de datos
export async function enableConnect() {
  try {
    const connection = await mysql.createConnection(config); // Creamos la conexion con la configuracion declarada anteriormente
    await connection.query("USE armony;");
    console.log("CONNECT TO DATABASE!"); // Mesaje de exito de conexion
    return connection; // Retornamos la conexion
  } catch (err) {
    // Capturamos error de conexion
    console.error("No pudo conectarse a la DB: ", err); // Mostramos error de conexion
    throw err; // Tiramos el error para detener ejecucion
  }
}

export const conexion = await enableConnect(); // almacenamos la conexion

// Cierre de conexion con la base de datos
export async function endConnection() {
  console.log("RELEASE CONNECTION");
  await conexion.end(); // Cerramos la conexion
}
