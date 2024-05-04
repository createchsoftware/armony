import express from "express";
import { conexion } from "../db/connection.js";
import {
  createEspecialidad,
  readEspecialidadById,
  updateEspecialidad,
  deleteEspecialidad,
} from "../db/query/queryEspecialidad.js";

// Router
export const routerEspecialidad = express.Router();
// Middleware
routerEspecialidad.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

const messageError = "Ha ocurrido un error al procesar tu peticion: ";
// const connection = await enableConnect(); // Almacenamos la conexion con la base de datos

/* NOTA: DE MOMENTO NO SE A COMPLETADO NI PROBADO LA SECCION DE ESPECIALIDAD
NO FUNCIONAL */

// CREATE FUNCIONAL
routerEspecialidad.post("/create", async (req, res) => {
  try {
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

// READ BY ID FUNCIONAL
routerEspecialidad.get("/read", async (req, res) => {
  try {
    const resultado = await readEspecialidadById(conexion, {
      idEsp: req.body.idEsp,
    }); // Parametros obtenidos por body
    res
      .status(302)
      .json({ message: "Especialidad encontrada", data: resultado }); // Status found, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); //  Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// READ BY NAME PENDIENTE
routerEspecialidad.get("/read/name", async (req, res) => {
  try {
    const resultado = await readEspecialidadById(conexion, {
      name: req.body.name,
    }); // Parametros obtenidos por body
    res
      .status(302)
      .json({ message: "Especialidad encontrada", data: resultado }); // Status found, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); //  Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// UPDATE FUNCIONAL
routerEspecialidad.patch("/update", async (req, res) => {
  try {
    const resultado = await updateEspecialidad(conexion, {
      idEsp: req.body.idEsp,
      name: req.body.name,
    });
    if (resultado.affectedRows === 0)
      // Validacion de modificacion
      res
        .status(404)
        .json({ message: `No se encontro la especialidad ${req.body.idEsp}` }); // Status Not Found, enviamos informacion en formato JSON
    res
      .status(202)
      .json({ message: "Especialidad actualizada con exito", data: resultado }); // Status Accepted, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); //  Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// DELETE FUNCIONAL
routerEspecialidad.delete("/delete", async (req, res) => {
  try {
    const { idEsp } = req.body; // Atributos para el body (Parametros para el procedimiento)
    const resultado = await deleteEspecialidad(conexion, {
      idEsp: req.body.idEsp,
    }); // Parametros obtenidos por body
    res.status(204).json({
      message: "Especialidad eliminada correctamente",
      data: resultado,
    }); // Status NO-CONTENT, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); //  Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});
