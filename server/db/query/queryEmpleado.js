import * as mysql from "mysql2";
import { endConnection } from "../connection.js";
import { get } from "https";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

// CREATE FUNCIONAL
export async function createEmpleado(connection, data) {
  try {
    let insertQueryEmpleado =
      "CALL addEmpleado(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"; // Procedimiento almacenado de la DB
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
      data.cp,
    ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos resultados
    endConnection(); // Cerramos conexion con la DB
    return rows[0]; // Retornamos las filas afectadas
  } catch (err) {
    // Capturamos error de query en caso de suceder
    console.error(messageError, err); // Mostramos el error
  }
}
// READ BY ID FUNCIONAL
export async function readEmpleadoById(connection, data) {
  try {
    let readEmpleadoIdQuery = "CALL searchEmpleadoById(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(readEmpleadoIdQuery, [data.idEmp]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamso query y almacenamos resultados
    endConnection(); // Cerramos conexion con la DB
    return rows[0]; // Retornamos las filas afectadas
  } catch (err) {
    // Capturamos el error de query en caso de suceder
    console.error(messageError, err); // Mostramos el error por consola
  }
}

// READ BY NAME FUNCIONAL
export async function readEmpleadoByNombre(connection, data) {
  try {
    let readEmpleadoNomQuery = "CALL searchEmpleadoByNombreApellido(?, ?, ?)"; // Procedimiento de la DB
    let query = mysql.format(readEmpleadoNomQuery, [
      data.name,
      data.ap,
      data.am,
    ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos resultados
    endConnection(); // Cerramos la conexion con la DB
    return rows[0]; // Regresamos las filas afectadas
  } catch (err) {
    // Capturamos error de query en caso que exista
    console.error(messageError, err); // Mostramos el error por consola
  }
}

// READ EMPLEADOS ACTIVOS (FUNCIONAL)
export async function readEmpAct(connection, data) {
  try {
    let searchEmpAct = "CALL searchEmpAct(?)"; // Procedimiento de la DB
    let query = mysql.format(searchEmpAct, [data.activo]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos y almacenamos valores
    return rows; // Retornamos valores
  } catch (err) {
    // Capturamos errores de query en caso que exista
    console.error(messageError, err); // Mostramos el error por consola
  }
}

// UPDATE FUNCIONAL
export async function updateEmpleado(connection, data) {
  try {
    let updateEmpQuery = "CALL updEmpleado(?, ?, ?, ?, ?, ?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(updateEmpQuery, [
      data.idEmp,
      data.checkIn,
      data.checkOut,
      data.act,
      data.calle,
      data.colonia,
      data.numero,
    ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecucion de query y almacenamiento de datos
    endConnection(); // Cierre de conexion
    return rows; // Retornamos valores
  } catch (err) {
    // Capturamos error de ejecucion de query en caso que exista
    console.error(messageError, err); // Mostramos el error por consola
  }
}

// DELETE FUNCIONAL
export async function deleteEmpleadoById(connection, data) {
  try {
    let deleteEmpQuery = "CALL delEmpleado(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(deleteEmpQuery, [data.idEmp]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecucion de query y almacenamiento de datos
    endConnection(); // Cierre de conexion
    return rows; // Retorno de valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores de query por consola
  }
}

export async function getEmpServicio(connection, data) {
  try {
    let getEmps = "CALL getEmpDeServicio(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(getEmps, [data.idEmp]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecucion de query y almacenamiento de datos
    endConnection(); // Cierre de conexion
    return rows[0]; // Retorno de valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores de query por consola
  }
}

// FUNCIONAL
export async function getEmpFav(connection, data) {
  try {
    let getEF = "CALL getEmpFav(?)"; // Query para procedimiento almacenado de la base de datos
    let query = mysql.format(getEF, [data.idCliente]); // Parametros para el procedimiento almacenado
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos los resultados obtenidos
    endConnection(); // Cerramos la conexion
    return rows[0]; // Retornamos los valores obtenidos
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores de query por consola
  }
}
