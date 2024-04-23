import { endConnection } from "../connection.js";
import * as mysql from "mysql2";

// connection.createPool(config);
const messageError = "Ha ocurrido un error al ejecutar el query: ";
// CREATE
//Funciona (SE CREA UN CLIENTE A LA HORA DE CREAR UN USUARIO)

// READ
// Busqueda por id (FUNCIONA)
export async function readClientesById(connection, data) {
  try {
    let readClientesQuery = "CALL searchClienteById(?)";
    let query = mysql.format(readClientesQuery, [data.fkUsuario]); // Parametros
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos resultados
    endConnection(); // Cerramos la conexion con la DB
    return rows[0]; // Retornamos resultado
  } catch (err) {
    console.error(messageError, err);
  }
  // conexion.end();
}

// UPDATE
export const updateClientes = (connection, callback) => {
  let updateClientesQuery = "CALL";
};
// DELETE
// AL ELIMINAR UN USUARIO SE BORRA UN CLIENTE
