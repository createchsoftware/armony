import express from "express";
import { conexion } from "../db/connection.js";
import {
  createCategoria,
  deleteCategoria,
  readCategoriaById,
  readCategoriaByName,
  updateCategoria,
} from "../db/query/queryCategoria.js";

export const routerCategoria = express.Router(); // Creamos router
// Middleware
routerCategoria.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

const messageError = "Ha ocurrido un error al procesar tu peticion: ";
// const conexion = await enableConnect(); // Almacenamos la conexion de la base de datos

// CREATE FUNCIONAL
routerCategoria.post("/create", async (req, res) => {
  try {
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

// READ BY ID FUNCIONAL
routerCategoria.get("/read", async (req, res) => {
  try {
    const resultado = await readCategoriaById(conexion, {
      idCat: req.body.idCat,
    });
    res.status(302).json({
      message: `Se encontro la categoria con id ${req.body.idCat}`,
      data: resultado,
    }); // Status found, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// READ BY NAME FUNCIONAL
routerCategoria.get("/read/name", async (req, res) => {
  try {
    const resultado = await readCategoriaByName(conexion, {
      name: req.body.name,
    });
    res.status(302).json({
      message: `Se encontro la categoria con id ${req.body.name}`,
      data: resultado,
    }); // Status found, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// UPDATE FUNCIONAL
routerCategoria.patch("/update", async (req, res) => {
  try {
    const resultado = await updateCategoria(conexion, {
      idCat: req.body.idCat,
      pilar: req.body.pilar,
      name: req.body.name,
      descr: req.body.descr,
    });
    res.status(202).json({
      message: "Categoria modificada exitosamente",
      data: resultado,
    }); // Status Accepted, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// DELETE FUNCIONAL
routerCategoria.delete("/delete", async (req, res) => {
  try {
    const resultado = await deleteCategoria(conexion, {
      idCat: req.body.idCat,
    });
    res
      .status(204)
      .json({ message: "Categoria eliminada correctamente", data: resultado }); // Status NO-CONTENT, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos el mensaje al navegador
  }
});
