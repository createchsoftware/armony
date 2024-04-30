import express from "express";
import { enableConnect } from "../db/connection.js";
import {
  createEspecialidad,
  readEspecialidadById,
} from "../db/query/queryEspecialidad.js";

// Router
export const routerEspecialidad = express.Router();
// Middleware
routerEspecialidad.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

const messageError = "Ha ocurrido un error al procesar tu peticion: ";
const connection = await enableConnect(); // Almacenamos la conexion con la base de datos

/* NOTA: DE MOMENTO NO SE A COMPLETADO NI PROBADO LA SECCION DE ESPECIALIDAD
NO FUNCIONAL */

// CREATE
routerEspecialidad.post("/create", async (req, res) => {
  try {
    const { idEsp } = req.body;
    const resultado = await createEspecialidad(connection, {
      idEsp: req.body.idEsp,
    });
    res
      .status(201)
      .json({ message: "Especialidad creada correctamente", data: resultado });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); //  Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});
// READ BY ID
routerEspecialidad.get("/read", async (req, res) => {
  try {
    const { idEsp } = req.body;
    const resultado = await readEspecialidadById(connection, {
      idEsp: req.body.idEsp,
    });
    res
      .status(201)
      .json({ message: "Especialidad encontrada", data: resultado });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); //  Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// UPDATE
routerEspecialidad.patch("/update", async (req, res) => {
  try {
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); //  Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// DELETE
routerEspecialidad.delete("/delete", async (req, res) => {
  try {
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); //  Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});
