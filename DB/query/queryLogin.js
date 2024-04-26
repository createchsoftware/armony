import { endConnection } from "../connection.js";
import * as mysql from "mysql2";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

export async function logIn(connection, data) {
  try {
    let loginQuery = "CALL logIn(?, ?)";
    let query = mysql.format(loginQuery, [data.idUser, data.passw]);
    const [rows, fields] = await connection.query(query);
    endConnection();
    return rows;
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}
