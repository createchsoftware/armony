import { endConnection } from "../connection.js";
import * as mysql from "mysql2";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

// CREATE
// FALTA ACTUALIZAR LAS LLAVER FORANEA CON INVENTARIO DENTRO DE LA DB
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
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos resultado
    endConnection(); // Cerramos conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    console.error(messageError, err);
  }
}

// READ BY ID
export async function readProductoById(connection, data) {
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
export async function readProductoByCategoria(connection, data) {
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

// UPDATE
export async function updateProducto(connection, data) {
  try {
    let updateProdQuery = "CALL updProdServ(?, ?, ?, ?, ?, ?, ?)";
    let query = mysql.format(updateProdQuery, [
      data.idProd,
      data.name,
      data.price,
      data.descr,
      data.est,
      data.tiem,
      data.img,
    ]); // Parametros
    const [rows, fields] = await connection.query(query); // Ejecutamos y guardamos valores
    endConnection(); // Cierre de conexion
    return rows[0];
  } catch (err) {
    console.error(messageError, err);
  }
}

// DELETE
export async function deleteProducto(connection, data) {
  try {
    let deleteProdQuery = "CALL delProdServ(?)";
    let query = mysql.format(deleteProdQuery, [data.idProd]); // Parametros
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
    let query = mysql.format(deleteProdCatQuery, [data.idProd, data.idCat]);
    const [rows, fields] = await connection.query(query);
    endConnection();
    return rows[0];
  } catch (err) {
    console.error(messageError, err);
  }
}
