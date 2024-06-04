import mysql from "mysql2";
import { endConnection } from "../connection.js";

export async function addfavorito(connection, data) {
  try {
    const call = "CALL addFavorito(?,?)";
    const query = mysql.format(call, [data.idCliente, data.IdProducto]);
    const [rows, fields] = await connection.query(query);
    endConnection(); // Cerramos la conexion con la BD
    return rows;
  } catch (err) {
    console.log("Ha ocurrido un error al ejecutar el query: ", err);
    throw err;
  }
}

export async function delFavorito(connection, data) {
  try {
    const call = "CALL delFav(?,?)"; // Procedimiento almacenado de la base de datos
    const query = mysql.format(call, [data.idCliente, data.IdProducto]); // Parametros necesarios para el procedimiento
    const [rows, fields] = await connection.query(query);
    endConnection(); // Cerramos la conexion con la BD
    return rows; // Cerramos la conexion con la base de datos
  } catch (err) {
    console.log("Ha ocurrido un error al ejecutar el query: ", err);
    throw err;
  }
}

export async function ProductFavoritosbyId(connection, data) {
  try {
    const call = "CALL getFavoritosProductosCliente(?)"; // Procedimiento almacenado de la base de datos
    const query = mysql.format(call, data.idCliente); // Parametros necesarios para el procedimiento
    const [rows, fieds] = await connection.query(query); // Ejecutamos query y almacenamos los valores resultantes
    endConnection(); // Cerramos la conexion con la base de datos
    return rows[0]; // Retornamos los valores obtenidos en base al query
  } catch (err) {
    console.log("Ha ocurrido un error al ejecutar el query: ", err);
    throw err;
  }
}

export async function ServiceFavoritosbyId(connection, data) {
  try {
    const call = "CALL getFavoritosServiciosCliente(?)"; // Procedimiento almacenado de la base de datos
    const query = mysql.format(call, data.idCliente); // Parametros necesarios para el procedimiento
    const [rows, fieds] = await connection.query(query); // Ejecutamos query y almacenamos los valores resultantes
    endConnection(); // Cerramos la conexion con la base de datos
    return rows[0]; // Retornamos los valores obtenidos en base al query
  } catch (err) {
    console.log("Ha ocurrido un error al ejecutar el query: ", err);
    throw err;
  }
}

export async function ServiceFavoritosSpa(connection) {
  try {
    const call = "CALL getFavoritosSpa()"; // Procedimiento almacenado de la base de datos
    const query = mysql.format(call); // Parametros necesarios para el procedimiento
    const [rows, fieds] = await connection.query(query); // Ejecutamos query y almacenamos los valores resultantes
    endConnection(); // Cerramos la conexion con la base de datos
    return rows[0]; // Retornamos los valores obtenidos en base al query
  } catch (err) {
    console.log("Ha ocurrido un error al ejecutar el query: ", err);
    throw err;
  }
}

export async function ServiceFavoritosEstetica(connection) {
  try {
    const call = "CALL getFavoritosEstetica()"; // Procedimiento almacenado de la base de datos
    const query = mysql.format(call); // Parametros necesarios para el procedimiento
    const [rows, fieds] = await connection.query(query); // Ejecutamos query y almacenamos los valores resultantes
    endConnection(); // Cerramos la conexion con la base de datos
    return rows[0]; // Retornamos los valores obtenidos en base al query
  } catch (err) {
    console.log("Ha ocurrido un error al ejecutar el query: ", err);
    throw err;
  }
}

export async function FavoritosbyId(connection, data) {
  try {
    const call = "CALL getFavoritosCliente(?)"; // Procedimiento almacenado de la base de datos
    const query = mysql.format(call, data.idCliente); // Parametros necesarios para el procedimiento
    const [rows, fieds] = await connection.query(query); // Ejecutamos query y almacenamos los valores resultantes
    endConnection(); // Cerramos la conexion con la base de datos
    return rows[0]; // Retornamos los valores obtenidos en base al query
  } catch (err) {
    console.log("Ha ocurrido un error al ejecutar el query: ", err);
    throw err;
  }
}


export async function invertirFav(connection, data) {
  try {
    const call = "CALL favoritoCliente(?,?)"; // Procedimiento almacenado de la base de datos
    const query = mysql.format(call, [data.idCliente, data.IdProducto]); // Parametros necesarios para el procedimiento
    const [rows, fields] = await connection.query(query);
    endConnection(); // Cerramos la conexion con la BD
    return rows; // Cerramos la conexion con la base de datos
  } catch (err) {
    console.log("Ha ocurrido un error al ejecutar el query: ", err);
    throw err;
  }
}
