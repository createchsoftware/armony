import { endConnection } from "../connection.js";
import * as mysql from "mysql2";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

// CREATE
//Funciona (SE CREA UN CLIENTE A LA HORA DE CREAR UN USUARIO)

// READ
// Busqueda por id (FUNCIONA)
export async function readClientesById(connection, data) {
  try {
    let readClientesQuery = "CALL searchClienteById(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(readClientesQuery, [data.fkUsuario]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos resultados
    endConnection(); // Cerramos la conexion con la DB
    return rows[0]; // Retornamos resultado
  } catch (err) {
    // Capturamos en caso de error de ejecucion de query
    console.error(messageError, err); // mostramos el error
  }
}

// UPDATE
// PROCEDIMIENTO ALMACENADO PENDIENTE
export const updateClientes = (connection, callback) => {
  try {
    let updateClientesQuery = "CALL";
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos erroes por consola
  }
};
// DELETE
// AL ELIMINAR UN USUARIO SE BORRA UN CLIENTE
