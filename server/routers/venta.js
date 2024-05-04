import { conexion } from "../db/connection.js";
import express from "express";

// Router
export const routerVenta = express.Router();

// Middleware
routerVenta.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

// const conexion = await enableConnect(); // Almacenamos la conexion con la base de datos
const messageError = "Ha ocurrido un error al procesar tu peticion: ";

// CREATE PENDIENTE
routerVenta.post("", async (req, res) => {
  try {
    const resultado = await {}; // Parametros para el procedimiento
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// READ PENDIENTE
routerVenta.get("", async (req, res) => {
  try {
    const resultado = await {}; // Parametros para el procedimiento
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// UPDATE PENDIENTE
routerVenta.patch("", async (req, res) => {
  try {
    const resultado = await {}; // Parametros para el procedimiento
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// CANCEL PENDIENTE
routerVenta.patch("", async (req, res) => {
  try {
    const resultado = await {}; // Parametros para el procedimiento
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});
