import * as mysql from "mysql2";
import { endConnection } from "../connection.js";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

// CREATE FUNCIONAL
export async function createEmpleado(connection, data) {
  try {
    let insertQueryEmpleado = "CALL addEmpleado(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    let query = mysql.format(insertQueryEmpleado, [
      data.nom,
      data.ap,
      data.am,
      data.email,
      data.phone,
      data.pass,
      data.tipo,
      data.img,
      data.horaE,
      data.horaS,
    ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos el query
    endConnection(); // Cerramos conexion con la DB
    return rows[0]; // Retornamos las filas afectadas
  } catch (err) {
    console.error(messageError, err);
  }
}

export async function readEmpleadoById(connection, data) {
  try {
    let readEmpleadoIdQuery = "CALL searchEmpleadoById(?)";
    let query = mysql.format(readEmpleadoIdQuery, [data.idEmp]);
    const [rows, fields] = await connection.query(query);
    endConnection(); // Cerramos conexion con la DB
    return rows[0]; // Retornamos las filas afectadas
  } catch (err) {
    console.error(messageError, err);
  }
}

export async function readEmpleadoByNombre(connection, data) {
  try {
    let readEmpleadoNomQuery = "CALL searchEmpleadoByNombreApellido(?)";
    let query = mysql.format(readEmpleadoNomQuery, [data.nom]);
    const [rows, fields] = await connection.query(query);
    endConnection(); // Cerramos la conexion con la DB
    return rows[0]; // Regresamos las filas afectadas
  } catch (err) {
    console.error(messageError, err);
  }
}

// FALTA PROCEDIMIENTO
export async function updateEmpleado(connection, data) {
  try {
  } catch (err) {
    console.error(messageError, err);
  }
}

// FALTA PROCEDIMIENTO
export async function deleteEmpleadoById(connection, data) {
  try {
  } catch (err) {
    console.error(messageError, err);
  }
}
