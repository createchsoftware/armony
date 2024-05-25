import mysql from "mysql2";
import { endConnection } from "../connection.js";

export async function addCarrito(connection, data) {
  try {
    const call = "CALL addCarrito(?,?,?)";
    const query = mysql.format(call, [data.idCliente, data.IdProducto, 1]);
    await connection.query(query);
  } catch (err) {
    console.log("Ha ocurrido un error al ejecutar el query: ", err);
    throw err;
  }
}

export async function delCarrito(connection, data) {
  try {
    const call = "CALL delCarrito(?,?)"; // Procedimiento almacenado de la base de datos
    const query = mysql.format(call, [data.idCliente, data.IdProducto]); // Parametros necesarios para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y almacenamos los valores resultantes
    endConnection(); // Cerramos la conexion con la base de datos
    return rows; // Retornamos los valores obtenidos en base al query
  } catch (err) {
    console.log("Ha ocurrido un error al ejecutar el query: ", err);
    throw err;
  }
}

export async function getCarritoCliente(connection, data) {
  try {
    const call = "CALL getCarritoCliente(?)"; // Procedimiento almacenado de la base de datos
    const query = mysql.format(call, data.idCliente); // Parametros necesarios para el procedimiento
    const [rows, fieds] = await connection.query(query); // Ejecutamos query y almacenamos los valores resultantes
    endConnection(); // Cerramos la conexion con la base de datos
    return rows; // Retornamos los valores obtenidos en base al query
  } catch (err) {
    console.log("Ha ocurrido un error al ejecutar el query: ", err);
    throw err;
  }
}


//este funcion sera para actualizar la cantidad de producto ene la carrito
export async function modifyCarrito(connection, data) {
  try {
    const call = "CALL updCarrito(?,?,?)";
    const query = mysql.format(call, [data.idCliente, data.IdProducto,data.cantidad]);
    await connection.query(query);
  } catch (err) {
    console.log("Ha ocurrido un error al ejecutar el query: ", err);
    throw err;
  }
}
