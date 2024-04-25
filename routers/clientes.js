import express from "express";
import { readClientesById } from "../DB/query/queryCliente.js";
import { enableConnect, conexion } from "../DB/connection.js";
import { createUser } from "../DB/query/queryUser.js";

export const routerCliente = express.Router();

const connection = conexion;
const messageError = "Ha ocurrido un error al procesar tu peticion: ";

// CLIENTES

// READ
// FUNCIONA
routerCliente.get("/read/:id", async (req, res) => {
  try {
    const resultado = await readClientesById(connection, {
      fkUsuario: req.params.id,
    });
    resultado = resultado[0];
    res
      .status(201)
      .json({ message: "Se encontro el usuario.", data: resultado });
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError);
  }
});

routerCliente.get("/update", (req, res) => {});

routerCliente.delete("/delete", (req, res) => {
  deleteClientes(connection, { idCliente: 5 }, (result) =>
    res.send(JSON.stringify(result))
  );
});
