import { endConnection, enableConnect } from "../connection.js";
import * as mysql from "mysql2";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

// CREATE FUNCIONAL
export async function createEspecialidad(connection, data) {
  try {
    enableConnect();
    let insertEspQuery = "CALL addEspecialidades(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(insertEspQuery, [data.name]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecucion y almacenamos los valores
    endConnection(); // Cierre de conexion
    return rows; // Retorno de valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// READ BY ID FUNCIONAL
export async function readEspecialidadById(connection, data) {
  try {
    enableConnect();
    let readEspIdQuery = "CALL searchEspecialidadById(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(readEspIdQuery, [data.idEsp]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y almacenamos resultados
    endConnection(); // Cierre de conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// READ BY NAME PENDIENTE
export async function readEspecialidadByName(connection, data) {
  try {
    let readEspNameQuery = "CALL searchEspecialidadByNombre(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(readEspNameQuery, [data.name]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y almacenamos resultados
    endConnection(); // Cierre de conexion
    return rows; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// UPDATE FUNCIONAL
export async function updateEspecialidad(connection, data) {
  try {
    let updaEspQuery = "CALL updEspecialidades(?, ?)";
    let query = mysql.format(updaEspQuery, [data.idEsp, data.name]);
    const [rows, fields] = await connection.query(query);
    endConnection();
    return rows;
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// DELETE FUNCIONAL
export async function deleteEspecialidad(connection, data) {
  try {
    let deleteEspQuery = "CALL delEspecialidades(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(deleteEspQuery, [data.idEsp]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y almacenamos resultados
    endConnection(); // Cierre de conexion
    return rows; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}
