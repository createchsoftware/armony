import { endConnection } from "../connection.js";
import * as mysql from "mysql2";

// connection.createPool(config);

// CREATE
//Funciona
export const createClientes = (connection, data, callback) => {
  let insertClientQuery = "CALL addCliente(?, ?, ?, ?)";
  let query = mysql.format(insertClientQuery, [
    data.usuario,
    data.nombre,
    data.paterno,
    data.materno,
  ]);
  connection.query(query, (err, result) => {
    if (err) throw err;
    callback(result);
  });
  endConnection();
};

// READ
// Busqueda por id
// FALTA CERRAR CONEXION
export async function readClientesById(connection, data) {
  try {
    let readClientesQuery = "CALL searchClienteById(?)";
    let query = mysql.format(readClientesQuery, [data.fkUsuario]);
    const [rows, fields] = await connection.query(query);
    return rows;
  } catch (err) {
    console.error("Ocurrio un error ejecutando el query", err);
  }
  conexion.end();
}

// UPDATE
export const updateClientes = (connection, callback) => {
  let updateClientesQuery = "CALL";
};
// DELETE
export const deleteClientes = (connection, data, callback) => {
  let deleteClientesQuery = "CALL delUsuario(?)";
  let query = mysql.format(deleteClientesQuery, [data.idCliente]);
  conexion.query(query, (err, result) => {
    if (err) throw err;
    callback(result);
  });
  conexion.end();
};
