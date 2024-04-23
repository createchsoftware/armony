import { endConnection } from "../connection.js";
import mysql from "mysql2";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

// CREATE FUNCIONAL
export async function createProveedor(connection, data) {
  try {
    let InsertProveedorQuery = "CALL addProveedor(?, ? ,?, ?)";
    let query = mysql.format(InsertProveedorQuery, [
      data.name,
      data.phone,
      data.email,
      data.webSite,
    ]); // Parametros
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y guardamos valores
    endConnection(); // Cerramos conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    console.error(messageError, err);
  }
}

// PENDIENTE A PROBAR
// HACE FALTA PROCEDIMIENTO
export async function readProveedorById(connection, data) {
  try {
    let readProveedorByIdQuery = "CALL ";

    const [rows, fields] = await connection.query(); // Ejecutamos el query y guardamos los valores
    endConnection(); // Cerramos la conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    console.error(messageError, err);
  }
}

// PENDIENTE A PROBAR
// HACE FALTA PROCEDIMIENTO
export async function readProveedorByName(connection, data) {
  try {
  } catch (err) {
    console.error(messageError, err);
  }
}

// FUNCIONAL
export async function updateProveedor(connection, data) {
  try {
    let updateProveedorQuery = "CALL updProveedor(?, ?, ?, ?, ?)";
    let query = mysql.format(updateProveedorQuery, [
      data.idProv,
      data.name,
      data.phone,
      data.email,
      data.webSite,
    ]); // Parametros
    const [rows, fields] = await connection.query(query); // Ejecutamos query y almacenamos valores
    endConnection(); // Cerramos conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    console.error(messageError, err);
  }
}

// FUNCIONAL
export async function deleteProveedor(connection, data) {
  try {
    let deleteProveedorQuery = "CALL delProveedor(?)";
    let query = mysql.format(deleteProveedorQuery, [data.idProv]); // Parametro
    const [rows, fields] = await connection.query(query); // Ejecutamos query y almacenamos valores
    endConnection(); // Cerramos conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    console.error(messageError, err);
  }
}
