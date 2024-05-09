import express from "express";
import { conexion } from "../db/connection.js";
import {
  createPato,
  readPatoById,
  readPatoByName,
  updatePato,
  deletePato,
} from "../db/query/queryPatologias.js";

// Router
export const routerPatologias = express.Router();

// Middleware
routerPatologias.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

const messageError = "Ha ocurrido un error al procesar tu peticion: ";

// CREATE FUNCIONA
routerPatologias.post("/create", async (req, res) => {
  try {
    const resultado = await createPato(conexion, {
      name: req.body.name,
      question: req.body.question,
    }); // Parametros obtenidos por body
    res.status(201).json({ message: "Patologia creada correctamente" }); // Status Created, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// READ BY ID FUNCIONA
routerPatologias.get("/read", async (req, res) => {
  try {
    const resultado = await readPatoById(conexion, {
      idPato: req.body.idPato,
    }); // Parametros obtenidos por body
    res
      .status(302)
      .json({ message: "Patologia encontrada correctamente", data: resultado }); // Status found, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// READ BY NAME FUNCIONA
routerPatologias.get("/read/name", async (req, res) => {
  try {
    const resultado = await readPatoByName(conexion, {
      name: req.body.name,
    }); // Parametros obtenidos por body
    res
      .status(302)
      .json({ message: "Patologia encontrada correctamente", data: resultado }); // Status found, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// UPDATE FUNCIONA
routerPatologias.patch("/update", async (req, res) => {
  try {
    const resultado = await updatePato(conexion, {
      idPato: req.body.idPato,
      name: req.body.name,
      question: req.body.question,
    }); // Parametros obtenidos por body
    res.status(202).json({
      message: "Patologia actualizada correctamente",
      data: resultado,
    }); // Status Accepted, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// DELETE FUNCIONA
routerPatologias.delete("/delete", async (req, res) => {
  try {
    const resultado = await deletePato(conexion, {
      idPato: req.body.idPato,
    }); // Parametros obtenidos por body
    res
      .status(204)
      .json({ message: "Patologia eliminada correctamente", data: resultado }); // Status NO-CONTENT, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});
