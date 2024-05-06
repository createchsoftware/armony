import express from "express";
import { enableConnect } from "../db/connection.js";
import { createCategoria } from "../db/query/queryCategoria.js";

export const routerCategoria = express.Router(); // Creamos router
// Middleware
routerCategoria.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

const messageError = "Ha ocurrido un error al procesar tu peticion: ";
const connection = await enableConnect(); // Almacenamos la conexion de la base de datos

// CREATE
routerCategoria.post("/create", async (req, res) => {
  try {
    const { pilar, name, descr } = req.body;
    const resultado = await createCategoria(connection, {
      pilar: req.body.pilar,
      name: req.body.name,
      descr: req.body.descr,
    }); // Parametros por body
    res
      .status(201) // Status creado
      .json({ message: "Se creo correctamente la categoria", data: resultado }); // Enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// READ

// UPDATE

// DELETE
