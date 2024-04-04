/*Aqui se codificaran los posibles querys a utilizar como lo puede ser
las consultas, altas, bajas, modificacion (CRUD)*/
const { pool } = require("./connection.js");
const mysql = require("mysql2");

//CLIENTES

// CREATE

//Funciona
const createUser = (pool, data, callback) => {
  let insertUserQuery = "CALL addUser(?, ?, ?, ?);"; // Procedimiento almacenado en MySQL
  let query = mysql.format(insertUserQuery, [
    data.email,
    data.telefono,
    data.pass,
    data.tipo,
  ]); // Parametros del query
  pool.query(query, (err, result) => {
    //Ejecucion del query
    if (err) throw err;
    callback(result);
  });
  pool.end();
};

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
const readClientes = (pool, callback) => {};

// Funciona
const searchUser = (pool, data, callback) => {
  let idUser = mysql.format("SELECT searchUser(?)", [data.usuario]);
  pool.query(idUser, (err, result) => {
    if (err) throw err;
    if (result === undefined) console.log("No se encontro el id");
    callback(result); //Retorna al usuario o undefined en caso de no encontrarlo o ya exista
    pool.end();
  });
};

// UPDATE
const updateClientes = (pool, callback) => {};
// DELETE
const deleteClientes = (pool, callback) => {};
//PRODUCTOS

//CITAS

module.exports = {
  createClientes,
  createUser,
  searchUser,
};
