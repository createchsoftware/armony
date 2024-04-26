import express from "express";
import { conexion } from "../DB/connection.js";
import {
  createEspecialidad,
  readEspecialidadById,
  deleteEspecialidad,
} from "../DB/query/queryEspecialidad.js";

// Router
export const routerEspecialidad = express.Router();
// Middleware
routerEspecialidad.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

const messageError = "Ha ocurrido un error al procesar tu peticion: ";
// const connection = await enableConnect(); // Almacenamos la conexion con la base de datos

/* NOTA: DE MOMENTO NO SE A COMPLETADO NI PROBADO LA SECCION DE ESPECIALIDAD
NO FUNCIONAL */

// CREATE PENDIENTE
routerEspecialidad.post("/create", async (req, res) => {
  try {
    const { name } = req.body; // Atributos para el body (Parametros de procedimiento)
    const resultado = await createEspecialidad(conexion, {
      name: req.body.name,
    }); // Parametros obtenidos por body
    res
      .status(201)
      .json({ message: "Especialidad creada correctamente", data: resultado }); // Status created, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); //  Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});
// READ BY ID PENDIENTE
routerEspecialidad.get("/read", async (req, res) => {
  try {
    const { idEsp } = req.body; // Atributos para el body (Parametros de procedimiento)
    const resultado = await readEspecialidadById(conexion, {
      idEsp: req.body.idEsp,
    }); // Parametros obtenidos por body
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

// DELETE PENDIENTE
routerEspecialidad.delete("/delete", async (req, res) => {
  try {
    const { idEsp } = req.body; // Atributos para el body (Parametros para el procedimiento)
    const resultado = await deleteEspecialidad(conexion, {
      idEsp: req.body.idEsp,
    }); // Parametros obtenidos por body
    res.status(200).json({
      message: "Especialidad eliminada correctamente",
      data: resultado,
    }); // Status , enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); //  Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});
