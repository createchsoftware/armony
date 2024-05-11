import { endConnection } from "../connection.js";
import mysql from "mysql2";
import { createCitas } from "./queryCitas.js";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

//CREATE PENDIENTE
export async function createVenta(connection, data) {
  try {
    let insertVentaQuery = "CALL addVenta(?, ?, ?, ?, ?, ?, ?, ?, ?);"; // Procedimiento almacenado en MySQL
    let query = mysql.format(insertVentaQuery, [
      data.idCliente,
      data.tipoVenta,
      data.nombre,
      data.phone,
      data.formaPago,
      data.total,
      data.impuesto,
      data.estado,
      data.fechaEntregado,
    ]); // parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos el resultado
    endConnection(); // Cierre de conexion
    return rows; // retornamos las filas afectadas
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// GET DETALLE DE VENTA PENDIENTE
export async function detalleVenta(connection, data) {
  try {
    let getVenta = "CALL getDetallesVenta(?);"; // Procedimiento almacenado en MySQL
    let query = mysql.format(getVenta, [data.idVenta]); // parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos el resultado
    endConnection(); // Cierre de conexion
    return rows[0]; // retornamos las filas afectadas
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// READ VENTA
export async function searchVentaCita(connection, data) {
  try {
    let busquedaVenta = "CALL searchVentaCita(?, ?)";
    let query = mysql.format(busquedaVenta, [data.idCliente, data.fechaVenta]);
    const [rows, fields] = await connection.query(query);
    endConnection();
    return rows[0];
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// UPDATE PENDIENTE (FALTA PROCEDIMIENTO)
export async function updateVenta(connection, data) {
  try {
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// DELETE PENDIENTE (MODIFICAR PROCEDIMIENTO)
export async function deleteVenta(connection, data) {
  try {
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}
