import { endConnection } from "../connection.js";
import * as mysql from "mysql2";

// const conexion = enableConnect();
const messageError = "Ha ocurrido un error al ejecutar el query: ";

// USUARIOS
/* Funciona, pero si la password tiene encriptacion
arroja el error 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD'*/
//FALTA CERRAR CONEXION
export async function createUser(connection, data) {
  try {
    let insertUserQuery = "CALL addCliente(?, ?, ?, ?,?, ?, ?, ?);"; // Procedimiento almacenado en MySQL
    let query = mysql.format(insertUserQuery, [
      data.nom,
      data.ap,
      data.am,
      data.mail,
      data.tel,
      data.pass,
      data.tipo,
      data.img,
    ]); // parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos el resultado
    return rows; // retornamos las filas afectadas
  } catch (err) {
    console.error(messageError, err);
  }
  // endConnection(); // Cerramos la conexion
}

// READ
// Busqueda por Id
// FALTA CERRAR CONEXION
export async function readUserById(connection, data) {
  try {
    let readUserQuery = "CALL searchUserById(?)";
    let query = mysql.format(readUserQuery, [data.idUser]);
    const [rows, fields] = await connection.query(query);
    return rows[0];
  } catch (err) {
    console.error(messageError, err);
  }
  // connection.endConnection();
}

export async function readUserByNP(connection, data) {
  try {
    let readUserByNPQuery = "CALL searchClienteByNombreApellido(?)";
    let query = mysql.format(readUserByNPQuery, [data.nomAp]);
    const [rows, fields] = await connection.query(query);
    return rows[0];
  } catch (err) {
    console.error(messageError, err);
  }
}

export async function deleteUserById(connection, data) {
  try {
    let deleteUserQuery = "CALL delUsuario(?)";
    let query = mysql.format(deleteUserQuery, [data.idUsuario]);
    const [rows, fields] = await connection.query(query);
    return rows;
  } catch (err) {
    console.error(messageError, err);
  }
}

// UPDATE

// INFO
// FALTA PROBARLO
export async function updateInfoUser(connection, data) {
  try {
    let updateInfoUserQuery = "CALL updUsuarioInfo(?, ?, ?, ?, ?, ?)";
    let query = mysql.format(updateInfoUserQuery, [
      data.id,
      data.nombre,
      data.apPaterno,
      data.apMaterno,
      data.email,
      data.phone,
    ]);
    const [rows, fields] = await connection.query(query);
    return rows;
  } catch (err) {
    console.error(messageError, err);
  }
}
// IMG
// FALTA PROBARLO
export async function updateImgUser(connection, data) {
  try {
    let updateImgUserQuery = "CALL updUsuarioImg(?, ?)";
    let query = mysql.format(updateImgUserQuery, [data.idUser, data.img]);
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
    return rows;
  } catch (err) {
    console.error(messageError, err);
  }
}
