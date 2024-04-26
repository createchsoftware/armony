import express from "express";
import { conexion } from "../DB/connection.js";
import {
  createCategoria,
  deleteCategoria,
} from "../DB/query/queryCategoria.js";

export const routerCategoria = express.Router(); // Creamos router
// Middleware
routerCategoria.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

const messageError = "Ha ocurrido un error al procesar tu peticion: ";
// const conexion = await enableConnect(); // Almacenamos la conexion de la base de datos

// CREATE
routerCategoria.post("/create", async (req, res) => {
  try {
    const { pilar, name, descr } = req.body; // Atributos para el body (Parametros para el procedimiento)
    const resultado = await createCategoria(conexion, {
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
routerCategoria.delete("/delete", async (req, res) => {
  try {
    const { idCat } = req.body; // Atributos para el body (Parametros para el procedimiento)
    const resultado = await deleteCategoria(conexion, {
      idCat: req.body.idCat,
    });
    res
      .status(202)
      .json({ message: "Categoria eliminada correctamente", data: resultado });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos el mensaje al navegador
  }
});
