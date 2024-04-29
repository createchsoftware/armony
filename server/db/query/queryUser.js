import { endConnection } from "../connection.js";
import * as mysql from "mysql2";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

// USUARIOS
// CREATE FUNCIONAL
export async function createUser(connection, data) {
  try {
    let insertUserQuery = "CALL addCliente(?, ?, ?, ?,?, ?, ?, ?);"; // Procedimiento almacenado en MySQL
    let query = mysql.format(insertUserQuery, [
      data.name,
      data.ap,
      data.am,
      data.email,
      data.phone,
      data.pass,
      data.tipo,
      data.img,
    ]); // parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos el resultado
    endConnection(); // Cierre de conexion
    return rows[0]; // retornamos las filas afectadas
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// READ FUNCIONAL
// Busqueda por Id
export async function readUserById(connection, data) {
  try {
    let readUserQuery = "CALL searchUserById(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(readUserQuery, [data.idUser]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos resultados
    endConnection(); // Cerramos conexion con la DB
    return rows[0]; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

export async function readUserByNP(connection, data) {
  try {
    let readUserByNPQuery = "CALL searchClienteByNombreApellido(?, ?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(readUserByNPQuery, [data.name, data.ap, data.am]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos valores
    endConnection(); // Cerramos conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// DELETE FUNCIONAL
export async function deleteUserById(connection, data) {
  try {
    let deleteUserQuery = "CALL delCliente(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(deleteUserQuery, [data.idUsuario]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos resultado
    endConnection(); // Cerramos conexion con la DB
    return rows[0]; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// UPDATE

// INFO FUNCIONAL
export async function updateInfoUser(connection, data) {
  try {
    let updateInfoUserQuery = "CALL updUsuarioInfo(?, ?, ?, ?, ?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(updateInfoUserQuery, [
      data.idUser,
      data.name,
      data.ap,
      data.am,
      data.email,
      data.phone,
    ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y almacenamos los valores
    endConnection(); // Cerramos la conexion
    return rows[0]; // Retornamos los valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}
// IMG FUNCIONAL (FALTA MODULO PARA CARGA DE ARCHIVOS)
export async function updateImgUser(connection, data) {
  try {
    let updateImgUserQuery = "CALL updUsuarioImg(?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(updateImgUserQuery, [data.idUser, data.newImg]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y almacenamos resultados
    endConnection(); // Cierre de conexion
    return rows; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// PASSWORD
// FALTA PROBARLO
export async function updatePassUser(connection, data) {
  try {
    let updatePassUserQuery = "CALL updUsuarioPass(?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(updatePassUserQuery, [data.idUser, data.pass]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y almacenamos valores
    endConnection(); // Cierre de conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}
