const { pool } = require("./connection.js");
const mysql = require("mysql2");

// USUARIOS

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

// READ

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

module.exports = {
  createUser,
  searchUser,
};
