import * as mysql from "mysql2";
import { endConnection } from "../connection.js";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

// CREATE FUNCIONAL
export async function createEmpleado(connection, data) {
  try {
    let insertQueryEmpleado =
      "CALL addEmpleado(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    let query = mysql.format(insertQueryEmpleado, [
      data.name,
      data.ap,
      data.am,
      data.email,
      data.phone,
      data.pass,
      data.tipo,
      data.img,
      data.checkIn,
      data.checkOut,
      data.calle,
      data.colonia,
      data.numero,
    ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos el query
    endConnection(); // Cerramos conexion con la DB
    return rows[0]; // Retornamos las filas afectadas
  } catch (err) {
    console.error(messageError, err);
  }
}
// READ BY ID FUNCIONAL
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

// READ BY NAME FUNCIONAL
export async function readEmpleadoByNombre(connection, data) {
  try {
    let readEmpleadoNomQuery = "CALL searchEmpleadoByNombreApellido(?, ?, ?)";
    let query = mysql.format(readEmpleadoNomQuery, [
      data.name,
      data.ap,
      data.am,
    ]);
    const [rows, fields] = await connection.query(query);
    endConnection(); // Cerramos la conexion con la DB
    return rows; // Regresamos las filas afectadas
  } catch (err) {
    console.error(messageError, err);
  }
}

// FALTA PROCEDIMIENTO
export async function updateEmpleado(connection, data) {
  try {
    let updateEmpQuery = "CALL updEmpleado(?, ?, ?, ?, ?, ?, ?)";
    let query = mysql.format(updateEmpQuery, [
      data.idEmp,
      data.checkIn,
      data.checkOut,
      data.act,
      data.calle,
      data.colonia,
      data.numero,
    ]);
    const [rows, fields] = await connection.query(query);
    endConnection();
    return rows[0];
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
