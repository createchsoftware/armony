const express = require("express");

const routerCliente = express.Router();

// CLIENTES
// CREATE
routerCliente.get("/create", (req, res) => {
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

//READ
routerCliente.get("/read", (req, res) => {
  readClientes(pool, { fkUsuario: 1 }), (result) => res.json(result);
});

routerCliente.get("/update", (req, res) => {});

routerCliente.get("/delete", (req, res) => {
  deleteClientes(pool, { idCliente: 5 }, (result) => res.json(result));
});
