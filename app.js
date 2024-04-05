const express = require("express");
const mysql = require("mysql2");
const app = express();
const { servidor, conexionDB } = require("./data/datos.js");
const SERVER_PORT = servidor.SERVER_PORT;
const { createClientes, createUser, searchUser } = require("./DB/querys.js");
// const { pool, getConnection } = require("./DB/connection.js");

// Middleware
app.use(express.json());

// Proximo cambio a pool de conexiones
const pool = mysql.createConnection({
  host: conexionDB.HOST,
  port: conexionDB.PORT,
  database: conexionDB.DATABASE,
  user: conexionDB.USER,
  password: conexionDB.PASSWORD,
});

pool.connect((err) => {
  if (err) throw err;
  console.log("CONNECT TO DATABASE!");
});

app.get("/", (req, res) => {});

app.get("/api/create", (req, res) => {
  createClientes(
    pool,
    {
      usuario: 1,
      nombre: "julian",
      paterno: "sandoval",
      materno: "godinez",
    },
    (result) => {
      res.json(result);
    }
  );
});

app.get("/api/user", (req, res) => {
  createUser(
    pool,
    {
      email: "a21490545@itmexicali.edu.mx",
      telefono: "686456789",
      pass: "contra",
      tipo: 1,
    },
    (result) => {
      res.json(result);
    }
  );
});

app.get("/api/read", (req, res) => {
  searchUser(pool, { usuario: 4 }, (result) => {
    console.log("El id es: " + JSON.stringify(result[0]));
    res.json(result);
  });
});

app.get("/api/update", (req, res) => {});

app.get("/api/delete", (req, res) => {});

app.listen(servidor.SERVER_PORT, () => {
  console.log(`Servidor en puerto ${servidor.SERVER_PORT}`);
});
