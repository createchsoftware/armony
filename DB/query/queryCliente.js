const { pool } = require("./connection.js");
const mysql = require("mysql2");

// CREATE

//Funciona
const createClientes = (pool, data, callback) => {
  if (
    searchUser(pool, data, callback) != undefined ||
    searchUser(pool, data, callback) === -1
  ) {
    // Nos aseguramos que el usuario sea nuevo y exista
    let insertClientQuery = "CALL addCliente(?, ?, ?, ?)";
    let query = mysql.format(insertClientQuery, [
      data.usuario,
      data.nombre,
      data.paterno,
      data.materno,
    ]);
    pool.query(query, (err, result) => {
      if (err) throw err;
      callback(result);
    });
    pool.end();
    return;
  }
  console.log("El usuario no se encontro o ya existe");
  pool.end();
  return;
};

// READ
const readClientes = (pool, data, callback) => {
  let readClientesQuery = "CALL searchClientes(?)";
  let query = mysql.format(readClientesQuery, [data.fkUsuario]);
  pool.query(query, (err, result) => {
    if (err) throw err;
    callback(result);
  });
  pool.release();
};

// UPDATE
const updateClientes = (pool, callback) => {
  let updateClientesQuery = "CALL";
};
// DELETE
const deleteClientes = (pool, data, callback) => {
  let deleteClientesQuery = "CALL delCliente(?)";
  let query = mysql.format(deleteClientesQuery, [data.idCliente]);
  pool.query(query, (err, result) => {
    if (err) throw err;
    callback(result);
  });
  pool.release();
};

module.exports = {
  createClientes,
  readClientes,
  deleteClientes,
};
