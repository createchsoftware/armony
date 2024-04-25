import { endConnection } from "../connection.js";
import * as mysql from "mysql2";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

// CREATE SERVICIOS FUNCIONAL
export async function createServicios(connection, data) {
  try {
    let insertServQuery = "CALL addServicio(?, ?, ?, ?, ?)";
    let query = mysql.format(insertServQuery, [
      data.name,
      data.price,
      data.descr,
      data.time,
      data.pilar,
    ]);
    const rows = await connection.query(query);
    endConnection();
    return rows;
  } catch (err) {
    console.error(messageError, err);
  }
}

// CREATE PRODUCTOS FUNCIONAL
/* NOTA: DEBE EXISTIR LA SUCURSAL PARA PODER HACER LA ALTA */
export async function createProducto(connection, data) {
  try {
    let insertProductoQuery = "CALL addProducto(?, ?, ?, ?, ?, ?)";
    let query = mysql.format(insertProductoQuery, [
      data.name,
      data.price,
      data.descr,
      data.pilar,
      data.suc,
      data.stockIni,
    ]); // Parametros
    const rows = await connection.query(query); // Ejecutamos query y guardamos resultado
    endConnection(); // Cerramos conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    console.error(messageError, err);
  }
}

// READ BY ID FUNCIONAL
export async function readProdServById(connection, data) {
  try {
    let searchProductoId = "CALL searchProdServById(?)";
    let query = mysql.format(searchProductoId, [data.idProdServ]); // Parametros
    const [rows, fields] = await connection.query(query); // Ejecutamos y guardamos resultados
    endConnection(); // Cerramos conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    console.error(messageError, err);
  }
}

// READ BY CATEGORIA
export async function readProdServByCategoria(connection, data) {
  try {
    let searchProductoCategoria = "CALL searchProdServByCategoria(?)";
    let query = mysql.format(searchProductoCategoria, [data.categoria]); // Parametros
    const [rows, fields] = await connection.query(query); // Ejecutamos y guardamos los valores
    endConnection(); // Cerramos conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    console.error(messageError, err);
  }
}

// UPDATE FUNCIONAL
export async function updateProdServ(connection, data) {
  try {
    let updateProdQuery = "CALL updProdServ(?, ?, ?, ?, ?, ?, ?)";
    let query = mysql.format(updateProdQuery, [
      data.idProdServ,
      data.name,
      data.price,
      data.descr,
      data.status,
      data.time,
      data.img,
    ]); // Parametros
    const [rows, fields] = await connection.query(query); // Ejecutamos y guardamos valores
    endConnection(); // Cierre de conexion
    return rows[0];
  } catch (err) {
    console.error(messageError, err);
  }
}

// DELETE FUNCIONAL
export async function deleteProdServ(connection, data) {
  try {
    let deleteProdQuery = "CALL delProdServ(?)";
    let query = mysql.format(deleteProdQuery, [data.idProdServ]); // Parametros
    const [rows, fields] = await connection.query(query); // Ejecutamos y guardamos valores
    endConnection(); // Cierre de conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    console.error(messageError, err);
  }
}

// DELETE PRODUCTO DE CATEGORIA
export async function deleteProdCat(connection, data) {
  try {
    let deleteProdCatQuery = "CALL delPSCategoria(?, ?)";
    let query = mysql.format(deleteProdCatQuery, [data.idProdServ, data.idCat]);
    const [rows, fields] = await connection.query(query);
    endConnection();
    return rows[0];
  } catch (err) {
    console.error(messageError, err);
  }
}
