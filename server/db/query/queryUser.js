import { endConnection, conexion } from "../connection.js";
import * as mysql from "mysql2";
import { API_IMG } from "../../data/datos.js";
import fetch from "node-fetch";

const messageError = "Ha ocurrido un error al ejecutar el query: ";
const BASE_URL = "https://api.imgbb.com/1/upload";

// USUARIOS
// CREATE FUNCIONAL
export async function createUser(connection, data) {
  try {
    let insertUserQuery =
      "CALL addCliente(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"; // Procedimiento almacenado en MySQL
    let query = mysql.format(insertUserQuery, [
      data.name,
      data.ap,
      data.am,
      data.email,
      data.phone,
      data.pass,
      data.tipo,
      data.img,
      data.calle,
      data.colonia,
      data.numero,
      data.cp,
    ]); // parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos el resultado
    endConnection(); // Cierre de conexion
    return rows[0]; // retornamos las filas afectadas
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// READ FUNCIONAL
// Busqueda por Id
export async function readUserById(connection, data) {
  try {
    let readUserQuery = "CALL searchUserById(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(readUserQuery, [data.idUser]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos resultados
    endConnection(); // Cerramos conexion con la DB
    return rows[0]; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// READ BY NAME
export async function readUserByNP(connection, data) {
  try {
    let readUserByNPQuery = "CALL searchClienteByNombreApellido(?, ?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(readUserByNPQuery, [data.name, data.ap, data.am]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos valores
    endConnection(); // Cerramos conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// DELETE FUNCIONAL
export async function deleteUserById(connection, data) {
  try {
    let deleteUserQuery = "CALL delCliente(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(deleteUserQuery, [data.idUsuario]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos resultado
    endConnection(); // Cerramos conexion con la DB
    return rows[0]; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// UPDATE

// INFO FUNCIONAL
export async function updateInfoUser(connection, data) {
  try {
    let updateInfoUserQuery =
      "CALL updUsuarioInfo(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(updateInfoUserQuery, [
      data.idUser,
      data.name,
      data.ap,
      data.am,
      data.email,
      data.phone,
      data.calle,
      data.colonia,
      data.numero,
      data.cp,
    ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y almacenamos los valores
    endConnection(); // Cerramos la conexion
    return rows[0]; // Retornamos los valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}
// IMG FUNCIONAL (FALTA MODULO PARA CARGA DE ARCHIVOS)
export async function updateImgUser(connection, data) {
  try {
    let updateImgUserQuery = "CALL updUsuarioImg(?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(updateImgUserQuery, [data.idUser, data.newImg]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y almacenamos resultados
    endConnection(); // Cierre de conexion
    return rows; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// PASSWORD
// FALTA PROBARLO
export async function updatePassUser(connection, data) {
  try {
    let updatePassUserQuery = "CALL updUsuarioPass(?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(updatePassUserQuery, [data.idUser, data.pass]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y almacenamos valores
    endConnection(); // Cierre de conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// PENDIENTE A PROBAR
// Carga de imagenes
async function postImage(connection, img, idUser) {
  /* El parametro de img es la imagen cargada desde el front*/
  // Armamos la url
  let url = BASE_URL + `key ${API_IMG.KEY_API_IMG}&name=${img.name}`;
  let resData;
  const data = new FormData(); // Creamos un objeto para interactuar con la API externa
  data.append("image", img); // Introducimos la imagen en el campo image

  try {
    const res = await fetch(url, {
      method: "POST",
      body: data,
    }); // Insercion al host de imagenes mediante su url armada anteriormente y la informacion dentro de data
    resData = await res.json(); // Convertimos la data en formato json
  } catch (err) {
    console.error("Ha ocurrido un error al cargar la imagen ", err);
  }

  try {
    // Actualizamos la imagen del usuario en la base de datos
    await updateImgUser(conexion, { idUser: idUser, newImg: resData.data.url }); // Se guarda la referencia del host en la base de datos
  } catch (err) {
    console.error("Ha ocurrido un error al actualizar la base de datos: ", err);
  }
}
