import express from "express";
import { readClientesById } from "../DB/query/queryCliente.js";
import { enableConnect } from "../DB/connection.js";
import { createUser } from "../DB/query/queryUser.js";

// Router
export const routerCliente = express.Router();

// Middleware
routerCliente.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

const connection = await enableConnect(); // Almacenamos la conexion con la base de datos
const messageError = "Ha ocurrido un error al procesar tu peticion: ";

// CLIENTES

// READ
// FUNCIONA
routerCliente.get("/read/:id", async (req, res) => {
  try {
    const resultado = await readClientesById(connection, {
      fkUsuario: req.params.id,
    }); // Parametros de ruta
    res
      .status(201)
      .json({ message: "Se encontro el usuario.", data: resultado });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

routerCliente.get("/update", (req, res) => {});

routerCliente.delete("/delete", (req, res) => {
  deleteClientes(connection, { idCliente: 5 }, (result) =>
    res.send(JSON.stringify(result))
  );
});
