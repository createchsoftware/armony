import { endConnection } from "../connection.js";
import * as mysql from "mysql2";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

// CREATE FUNCIONAL
export async function createSucursal(connection, data) {
  try {
    let insertSucursalQuery = "CALL addSucursal(?, ?, ?, ?, ?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(insertSucursalQuery, [
      data.calle,
      data.colonia,
      data.numero,
      data.cp,
      data.apertura,
      data.cierre,
    ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecucion y almacenado de valores
    endConnection(); // Cierre de conexion
    return rows[0]; // Retorno de valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// READ BY ID FUNCIONAL
export async function readSucursalById(connection, data) {
  try {
    let searchSucurIdQuery = "CALL searchSucursalById(?)"; // Procedimiento de la base de datos
    let query = mysql.format(searchSucurIdQuery, [data.idSuc]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecucion de query y almacenamos resultado
    endConnection(); // Cierre de conexion
    return rows[0]; // Retorno de valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// READ BY ADDRESS FUNCIONAL
export async function readSucursalByAddr(connection, data) {
  try {
    let searchSucurByAddr = "CALL searchSucursalByDireccion(?, ?, ?)"; // Procedimiento de la DB
    let query = mysql.format(searchSucurByAddr, [
      data.calle,
      data.colonia,
      data.numero,
    ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecucion de query y almacenamiento de valores
    endConnection(); // Cierre de conexion
    return rows[0]; // Retorno de valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// UPDATE FUNCIONAL
export async function updateSucursal(connection, data) {
  try {
    let updateSucursalQuery = "CALL updSucursal(?, ?, ?, ?, ?, ?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(updateSucursalQuery, [
      data.idSuc,
      data.calle,
      data.colonia,
      data.numero,
      data.cp,
      data.apertura,
      data.cierre,
    ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y almacenamos valores
    endConnection(); // Cierre de conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// DELETE FUNCIONAL
export async function deleteSucursal(connection, data) {
  try {
    let deleteSucur = "CALL delSucursal(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(deleteSucur, [data.idSuc]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y almacenamos valores
    endConnection(); // Cierre de conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}
