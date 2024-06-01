import { endConnection } from "../connection.js";
import * as mysql from "mysql2";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

// CREATE FUNCIONAL
export async function createCategoria(connection, data) {
  try {
    let insertCateQuery = "CALL addCategoria(?, ?, ?)"; // Procedimiento de la DB
    let query = mysql.format(insertCateQuery, [
      data.pilar,
      data.name,
      data.descr,
    ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecucion de query y almacenamiento de resultado
    endConnection(); // Cierre de conexion
    return rows[0]; // Retorno de valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// READ BY ID FUNCIONAL
export async function readCategoriaById(connection, data) {
  try {
    let searchCatId = "CALL searchCategoriaById(?)"; // Procedimiento de la DB
    let query = mysql.format(searchCatId, [data.idCat]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecucion de query y almacenamiento de resultado
    endConnection(); // Cierre de conexion
    return rows[0]; // Retorno de valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// READ BY NAME FUNCIONAL
export async function readCategoriaByName(connection, data) {
  try {
    let searchCatName = "CALL searchCategoriaByNombre(?)"; // Procedimiento de la DB
    let query = mysql.format(searchCatName, [data.name]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecucion de query y almacenamiento de resultado
    endConnection(); // Cierre de conexion
    return rows; // Retorno de valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// UPDATE FUNCIONAL
export async function updateCategoria(connection, data) {
  try {
    let updateCat = "CALL updCategoria(?, ? ,? , ?)"; // Procedimiento de la DB
    let query = mysql.format(updateCat, [
      data.idCat,
      data.pilar,
      data.name,
      data.descr,
    ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecucion de query y almacenamiento de resultado
    endConnection(); // Cierre de conexion
    return rows; // Retorno de valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// DELETE FUNCIONAL
export async function deleteCategoria(connection, data) {
  try {
    let deleteCatQuery = "CALL delCategoria(?)"; // Procedimiento de la base de datos
    let query = mysql.format(deleteCatQuery, [data.idCat]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos y almacenamos valores
    endConnection(); // Cierre de conexion
    return rows; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

export async function getServicesSpa(connection) {
  try {
    let searchCatId = "CALL getServiciosSpa()"; // Procedimiento de la DB
    let query = mysql.format(searchCatId); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecucion de query y almacenamiento de resultado
    // endConnection(); // Cierre de conexion
    return rows[0]; // Retorno de valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

export async function getServicesFacial(connection) {
  try {
    let searchCatId = "CALL getServiciosFaciales()"; // Procedimiento de la DB
    let query = mysql.format(searchCatId); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecucion de query y almacenamiento de resultado
    // endConnection(); // Cierre de conexion
    return rows[0]; // Retorno de valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

export async function getServicesCorpo(connection) {
  try {
    let searchCatId = "CALL getServiciosCorporales()"; // Procedimiento de la DB
    let query = mysql.format(searchCatId); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecucion de query y almacenamiento de resultado
    // endConnection(); // Cierre de conexion
    return rows[0]; // Retorno de valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

export async function getServicesEstetica(connection) {
  try {
    let searchCatId = "CALL getServiciosEstetica()";
    let query = mysql.format(searchCatId); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecucion de query y almacenamiento de resultado
    //endConnection(); // Cierre de conexion
    return rows[0]; // Retorno de valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

/* Busca si el servicio o producto ya es favorito del cliente */
export async function isFav(connection, data) {
  try {
    let searchFav = "CALL searchInFav(?, ?)"; // Query de procedimiento almacenado de la base de datos
    let query = mysql.format(searchFav, [data.idUser, data.idProdServ]); // Parametros para el query (el idUser sera constante mientras que el idServ ira cambiando)
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos los valores (Regresa true en caso de si se favorito, caso contrario regresa un array vacio)
    endConnection(); // Cerramos la conexion con la base de datos
    return rows[0]; // Retornamos el valor obtenido
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}
