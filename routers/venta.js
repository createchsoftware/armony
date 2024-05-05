import { conexion } from "../DB/connection.js";
import express from "express";
import { createVenta } from "../DB/query/queryVenta.js";

// Router
export const routerVenta = express.Router();

// Middleware
routerVenta.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

// const conexion = await enableConnect(); // Almacenamos la conexion con la base de datos
const messageError = "Ha ocurrido un error al procesar tu peticion: ";

// CREATE PENDIENTE
routerVenta.post("/create", async (req, res) => {
  try {
    const resultado = await createVenta(conexion, {
      idCliente: req.body.idCliente,
      tipoVenta: req.body.Venta,
      nombre: req.body.nombre,
      phone: req.body.phone,
      tipoPago: req.body.tipoPago,
      total: req.body.total,
      impuesto: req.body.impuesto,
      estado: req.body.estado,
      fechaEntregado: req.body.fechaEntregado,
    }); // Parametros para el procedimiento
    res
      .status(200)
      .json({ message: "Compra realizada con exito", data: resultado });
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
