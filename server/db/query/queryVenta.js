import { endConnection } from "../connection.js";
import mysql from "mysql2";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

// PENDIENTE A PROBAR
//CREATE
export async function createVenta(connection, data) {
  try {
    let insertVentaQuery = "CALL addVenta(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"; // Procedimiento almacenado en MySQL
    let query = mysql.format(insertVentaQuery, [
      data.idCliente,
      data.tipoVenta,
      data.nombre,
      data.phone,
      data.formaPago,
      data.subtotal,
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

// GET DETALLE DE VENTA FALTA TRIGGER EN LA DB
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
// OBTIENE LA ULTIMA VENTA DEL CLIENTE
export async function searchVentaCita(connection, data) {
  try {
    let busquedaVenta = "CALL searchVentaCita(?, ?, ?)"; // Procedimiento almacenado de la base de datos
    let query = mysql.format(busquedaVenta, [
      data.idCliente,
      data.tVenta,
      data.phone,
    ]); // Parametros necesarios para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y almacenamos valores
    endConnection(); // Cerramos conexion con la base de datos
    return rows[0]; // retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// Ventas canceladas en periodo de tiempo
// PENDIENTE A PROBAR
export async function searchVentasCanceladas(connection, data) {
  try {
    let searchVC = "CALL searchVentaCancelada(?, ?)"; // Procedimiento almacenado de la base de datos
    let query = mysql.format(searchVC, [data.fechaI, data.fechaFin]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y almacenamos el resultado
    endConnection(); // Cerramos la conexion con la base de datos
    return rows; // Retornamos el resultado
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

// CANCELACION DE CITA PENDIENTE A PROBAR
export async function cancelVenta(connection, data) {
  try {
    let ventaCancelada = "CALL cancelVenta(?)"; // Procedimiento almacenado de la base de datos
    let query = mysql.format(ventaCancelada, [data.idVenta]); // Parametros necesarios para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos los resultados
    endConnection(); // Cerramos conexion con la base de datos
    return rows; // retornamos los resultados
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}


export async function searchVentaProducto(connection, data) {
  try {
    let busquedaVenta = "CALL searchVentaProducto(?)"; // Procedimiento almacenado de la base de datos
    let query = mysql.format(busquedaVenta, [
      data.idCliente
    ]); // Parametros necesarios para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y almacenamos valores
    endConnection(); // Cerramos conexion con la base de datos
    return rows[0]; // retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}


export async function createVentaSus(connection, data) {
  try {
    let insertVentaQuery = "CALL addVentaSuscripcionOnline(?, ?, ?);"; // Procedimiento almacenado en MySQL
    let query = mysql.format(insertVentaQuery, [
      data.idCliente,
      data.tarjeta,
      data.monedero
    ]); // parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos el resultado
    endConnection(); // Cierre de conexion
    return rows; // retornamos las filas afectadas
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}