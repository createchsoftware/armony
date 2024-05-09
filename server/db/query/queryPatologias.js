import { endConnection } from "../connection.js";
import * as mysql from "mysql2";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

// CREATE FUNCIONA
export async function createPato(connection, data) {
  try {
    let insertPatoQuery = "CALL addPatologia(?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(insertPatoQuery, [data.name, data.question]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecucion y almacenado de valores
    endConnection(); // Cierre de conexion
    return rows[0]; // Retorno de valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// READ BY ID FUNCIONA
export async function readPatoById(connection, data) {
  try {
    let searchPatoQuery = "CALL searchPatologiaById(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(searchPatoQuery, [data.idPato]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecucion y almacenado de valores
    endConnection(); // Cierre de conexion
    return rows[0]; // Retorno de valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// READ BY NAME FUNCIONA
export async function readPatoByName(connection, data) {
  try {
    let searchPatoQuery = "CALL searchPatologiaByNombre(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(searchPatoQuery, [data.name]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecucion y almacenado de valores
    endConnection(); // Cierre de conexion
    return rows[0]; // Retorno de valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// UPDATE FUNCIONA
export async function updatePato(connection, data) {
  try {
    let updatePatoQuery = "CALL updPatologia(?, ?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(updatePatoQuery, [
      data.idPato,
      data.name,
      data.question,
    ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecucion y almacenado de valores
    endConnection(); // Cierre de conexion
    return rows; // Retorno de valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// DELETE FUNCIONA
export async function deletePato(connection, data) {
  try {
    let deletePatoQuery = "CALL delPatologia(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(deletePatoQuery, [data.idPato]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecucion y almacenado de valores
    endConnection(); // Cierre de conexion
    return rows[0]; // Retorno de valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}
