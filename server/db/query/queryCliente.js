import { endConnection } from "../connection.js";
import * as mysql from "mysql2";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

// CREATE
export async function createCliente(connection, data) {
  try {
    let insertClienteQuery =
      "CALL addCliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"; // Procedimiento almacenado en MySQL
    let query = mysql.format(insertClienteQuery, [
      data.name,
      data.ap,
      data.am,
      data.email,
      data.phone,
      data.pass,
      data.tipo,
      data.img,
      data.calle,
      data.colonia,
      data.numero,
      data.cp,
      data.apodo,
    ]); // parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos el resultado
    endConnection(); // Cierre de conexion
    return rows[0]; // retornamos las filas afectadas
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// READ
// Busqueda por id (FUNCIONA)
export async function readClientesById(connection, data) {
  try {
    let readClientesQuery = "CALL searchClienteById(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(readClientesQuery, [data.idCliente]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos resultados
    endConnection(); // Cerramos la conexion con la DB
    return rows[0]; // Retornamos resultado
  } catch (err) {
    // Capturamos en caso de error de ejecucion de query
    console.error(messageError, err); // mostramos el error
  }
}

// UPDATE
// PROCEDIMIENTO ALMACENADO PENDIENTE
export const updateClientes = (connection, callback) => {
  try {
    let updateClientesQuery = "CALL";
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos erroes por consola
  }
};

// UPDATE APODO
export async function updateApodo(connection, data) {
  try {
    let updateApodo = "CALL updClienteApodo(?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(updateApodo, [data.idCliente, data.apodo]); // Parametros para el procedimiento

    const [rows, fields] = await connection.query(query); // Ejecutamos los querys y guardamos resultados
    endConnection(); // Cerramos conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos erroes por consola
  }
}

// DELETE
// AL ELIMINAR UN USUARIO SE BORRA UN CLIENTE

//CREATE PATOLOGICA CLIENTE
export async function addPatoCliente(connection, data) {
  try {
    let addPCQuery = "CALL addClientePato(?, ?, ?)";
    let query = mysql.format(addPCQuery, [
      data.idCliente,
      data.idPato,
      data.descr,
    ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos resultados
    endConnection(); // Cerramos conexion con la DB
    return rows; // Retornamos las filas afectadas
  } catch (err) {
    // Capturamos error de query en caso de suceder
    console.error(messageError, err); // Mostramos el error
  }
}

// UPDATE PATOLOGIA CLIENTE
export async function updatePatoCliente(connection, data) {
  try {
    let updatePCQuery = "CALL updClientePato(?, ?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(updatePCQuery, [
      data.idCliente,
      data.idPato,
      data.descr,
    ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos resultados
    endConnection(); // Cerramos conexion con la DB
    return rows; // Retornamos las filas afectadas
  } catch (err) {
    // Capturamos error de query en caso de suceder
    console.error(messageError, err); // Mostramos el error
  }
}

// DELETE PATOLOGIA CLIENTE
export async function deletePatoCliente(connection, data) {
  try {
    let deletePCQuery = "CALL delClientePato(?,?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(deletePCQuery, [data.idCliente, data.idPato]);
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos resultados
    endConnection(); // Cerramos conexion con la DB
    return rows; // Retornamos las filas afectadas
  } catch (err) {
    // Capturamos error de query en caso de suceder
    console.error(messageError, err); // Mostramos el error
  }
}


export async function searchStatusSus(connection, data) {
  try {
    let Query = "CALL getSuscripcionEstadoCliente(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(Query, [data.idCliente]);
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos resultados
    endConnection(); // Cerramos conexion con la DB
    return rows[0]; // Retornamos las filas afectadas
  } catch (err) {
    // Capturamos error de query en caso de suceder
    console.error(messageError, err); // Mostramos el error
  }
}



