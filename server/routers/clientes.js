import express from "express";
import {
  createClientes,
  readClientesById,
  deleteClientes,
} from "../db/query/queryCliente.js";
import { enableConnect } from "../db/connection.js";

export const routerCliente = express.Router();

// CLIENTES
// CREATE
routerCliente.get("/create", (req, res) => {
  createClientes(
    connection,
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
routerCliente.get("/read", async (req, res) => {
  try {
    const connection = await enableConnect();
    const resultado = await readClientesById(connection, { fkUsuario: 1 });
    res.send(JSON.stringify(resultado));
  } catch (err) {
    console.error("Ha ocurrido un error: ", err);
    res.status(500).send("Ha ocurrido un erro al procesar tu solicitud");
  }
});

routerCliente.get("/update", (req, res) => {});

routerCliente.delete("/delete", (req, res) => {
  deleteClientes(connection, { idCliente: 5 }, (result) =>
    res.send(JSON.stringify(result))
  );
});
