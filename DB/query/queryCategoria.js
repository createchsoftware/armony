import { endConnection } from "../connection.js";
import * as mysql from "mysql2";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

// CREATE
export async function createCategoria(connection, data) {
  try {
    let insertCateQuery = "CALL addCategoria(?, ?, ?)"; // Procedimiento de la DB
    let query = mysql.format(insertCateQuery, [
      data.pilar,
      data.name,
      data.descr,
    ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecucion de query y almacenamiento de resultado
    endConnection(); // Cierre de conexion
    return rows[0]; // Retorno de valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// READ
export async function readCategoriaById(connection, data) {
  try {
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// UPDATE
export async function updateCategoria(connection, data) {
  try {
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// DELETE
export async function deleteCategoria(connection, data) {
  try {
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}
