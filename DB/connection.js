const mysql = require("mysql2");
const { conexionDB } = require("../data/datos.js");

// Sintaxion para la conexion de pruebas con la BD
const pool = mysql.createPool({
  host: conexionDB.HOST,
  port: conexionDB.PORT,
  database: conexionDB.NAME,
  user: conexionDB.USER,
  password: conexionDB.PASSWORD,
});

const getConnection = (callback) => {
  pool.getConnection((err, connection) => {
    callback(err, connection);
  });
};

module.exports = { pool, getConnection };
