import express from "express";
import { conexion } from "../db/connection.js";
import {
  createSucursal,
  updateSucursal,
  readSucursalByAddr,
  readSucursalById,
  deleteSucursal,
} from "../db/query/querySucursal.js";

// Router
export const routerSucursal = express.Router();

// Middleware
routerSucursal.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

const messageError = "Ha ocurrido un error al procesar tu peticion: ";

// CREATE FUNCIONAL
routerSucursal.post("/create", async (req, res) => {
  try {
    const resultado = await createSucursal(conexion, {
      calle: req.body.calle,
      colonia: req.body.colonia,
      numero: req.body.numero,
      cp: req.body.cp,
      apertura: req.body.apertura,
      cierre: req.body.cierre,
    }); // Parametros obtenidos del body (atributos)
    res
      .status(201)
      .json({ message: "Sucursal creada correctamente", data: resultado }); // Status Created, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// READ BY ID FUNCIONAL
routerSucursal.get("/read/id", async (req, res) => {
  try {
    await readSucursalById(conexion, { idSuc: req.body.idSuc }); // Parametros obtenidos del body (atributos)
    res
      .status(302)
      .json({ message: "Se encontro la sucursal", data: resultado }); //Status found, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// READ BY ADDRESS FUNCIONAL
routerSucursal.get("/read/address", async (req, res) => {
  try {
    const resultado = await readSucursalByAddr(conexion, {
      calle: req.body.calle,
      colonia: req.body.colonia,
      numero: req.body.numero,
    }); // Parametros obtenidos del body (atributos)
    res.status(302).json({
      message: "Se encontro la sucursal",
      data: resultado,
    }); // Status found, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// UPDATE FUNCIONAL
routerSucursal.patch("/update", async (req, res) => {
  try {
    const resultado = await updateSucursal(conexion, {
      idSuc: req.body.idSuc,
      calle: req.body.calle,
      colonia: req.body.colonia,
      numero: req.body.numero,
      cp: req.body.cp,
      apertura: req.body.apertura,
      cierre: req.body.cierre,
    }); // Parametros obtenidos del body (atributos)
    res.status(202).json({
      message: "Sucursal actualizada correctamente",
      data: resultado,
    }); // Status accepted, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// DELETE FUNCIONAL
routerSucursal.delete("/delete", async (req, res) => {
  try {
    const resultado = await deleteSucursal(conexion, {
      idSuc: req.body.idSuc,
    }); // Parametros obtenidos del body (atributos)
    res.status(204).json({
      message: "Se elimino correctamente la sucursal",
      data: req.body.idSuc,
      resultado,
    }); // Status NO-CONTENT, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});
