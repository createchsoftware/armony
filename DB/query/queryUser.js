import { endConnection } from "../connection.js";
import * as mysql from "mysql2";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

// USUARIOS
// CREATE FUNCIONAL
export async function createUser(connection, data) {
  try {
    let insertUserQuery = "CALL addCliente(?, ?, ?, ?,?, ?, ?, ?);"; // Procedimiento almacenado en MySQL
    let query = mysql.format(insertUserQuery, [
      data.nom,
      data.ap,
      data.am,
      data.email,
      data.tel,
      data.pass,
      data.tipo,
      data.img,
    ]); // parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos el resultado
    endConnection();
    return rows[0]; // retornamos las filas afectadas
  } catch (err) {
    console.error(messageError, err);
  }
}

// READ FUNCIONAL
// Busqueda por Id
export async function readUserById(connection, data) {
  try {
    let readUserQuery = "CALL searchUserById(?)";
    let query = mysql.format(readUserQuery, [data.idUser]); // Parametros
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos resultados
    endConnection(); // Cerramos conexion con la DB
    return rows[0]; // Retornamos valores
  } catch (err) {
    console.error(messageError, err);
  }
}

export async function readUserByNP(connection, data) {
  try {
    let readUserByNPQuery = "CALL searchClienteByNombreApellido(?)";
    let query = mysql.format(readUserByNPQuery, [data.nomAp]); // Parametros
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos valores
    endConnection(); // Cerramos conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    console.error(messageError, err);
  }
}

export async function deleteUserById(connection, data) {
  try {
    let deleteUserQuery = "CALL delUsuario(?)";
    let query = mysql.format(deleteUserQuery, [data.idUsuario]); // Parametros
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos resultado
    endConnection(); // Cerramos conexion con la DB
    return rows[0]; // Retornamos valores
  } catch (err) {
    console.error(messageError, err);
  }
}

// UPDATE

// INFO FUNCIONAL
export async function updateInfoUser(connection, data) {
  try {
    let updateInfoUserQuery = "CALL updUsuarioInfo(?, ?, ?, ?, ?, ?)";
    let query = mysql.format(updateInfoUserQuery, [
      data.idUser,
      data.name,
      data.ap,
      data.am,
      data.email,
      data.phone,
    ]); // Parametros
    const [rows, fields] = await connection.query(query); // Ejecutamos query y almacenamos los valores
    endConnection(); // Cerramos la conexion
    return rows[0]; // Retornamos los valores
  } catch (err) {
    console.error(messageError, err);
  }
}
// IMG
// FALTA PROBARLO
export async function updateImgUser(connection, data) {
  try {
    let updateImgUserQuery = "CALL updUsuarioImg(?, ?)";
    let query = mysql.format(updateImgUserQuery, [data.idUser, data.newImg]);
    const [rows, fields] = await connection.query(query);
    return rows;
  } catch (err) {
    console.error(messageError, err);
  }
}

// PASSWORD
// FALTA PROBARLO
export async function updatePassUser(connection, data) {
  try {
    let updatePassUserQuery = "CALL updUsuarioPass(?, ?)";
    let query = mysql.format(updatePassUserQuery, [data.idUser, data.pass]);
    const [rows, fields] = await connection.query(query);
    return rows[0];
  } catch (err) {
    console.error(messageError, err);
  }
}
