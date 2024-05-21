import { endConnection } from "../connection.js";
import mysql from "mysql2";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

// CREATE FUNCIONAL
export async function createProveedor(connection, data) {
  try {
    let InsertProveedorQuery = "CALL addProveedor(?, ? ,?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(InsertProveedorQuery, [
      data.name,
      data.phone,
      data.email,
      data.webSite,
    ]); // Parametross para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y guardamos valores
    endConnection(); // Cerramos conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// FUNCIONAL
export async function readProveedorById(connection, data) {
  try {
    let readProveedorByIdQuery = "CALL searchProveedorById(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(readProveedorByIdQuery, [data.idProv]);
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y guardamos los valores
    endConnection(); // Cerramos la conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// PENDIENTE A PROBAR
export async function readProveedorByName(connection, data) {
  try {
    let searchByName = "CALL searchProveedorByNombre(?)"; // Procediento almacenado de la base de datos
    let query = mysql.format(searchByName, [data.nameProv]); // Parametros necesarios para el procedimiento almacenado
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos valores obtenidos
    endConnection(); // Cerramos conexion con la base de datos
    return rows[0]; // Retornamos valores obtenidos
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// UPDATE FUNCIONAL
export async function updateProveedor(connection, data) {
  try {
    let updateProveedorQuery = "CALL updProveedor(?, ?, ?, ?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(updateProveedorQuery, [
      data.idProv,
      data.name,
      data.phone,
      data.email,
      data.webSite,
    ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y almacenamos valores
    endConnection(); // Cerramos conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// DELETE FUNCIONAL
export async function deleteProveedor(connection, data) {
  try {
    let deleteProveedorQuery = "CALL delProveedor(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(deleteProveedorQuery, [data.idProv]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y almacenamos valores
    endConnection(); // Cerramos conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}
