import express from "express";
import { enableConnect } from "../DB/connection.js";
import {
  createSucursal,
  updateSucursal,
  readSucursalByAddr,
  readSucursalById,
  deleteSucursal,
} from "../DB/query/querySucursal.js";

// Router
export const routerSucursal = express.Router();

// Middleware
routerSucursal.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

const messageError = "Ha ocurrido un error al procesar tu peticion: ";
const connection = await enableConnect(); // Almacenamos la conexion con la base de datos

// CREATE FUNCIONAL
routerSucursal.post("/create", async (req, res) => {
  try {
    const { calle, colonia, numero, cp, apertura, cierre } = req.body; // Atributos para el body (Parametros de procedimiento)
    const resultado = await createSucursal(connection, {
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
    const { idSuc } = req.body; // Atributos para el body (Parametros de procedimiento)
    await readSucursalById(connection, { idSuc: req.body.idSuc }); // Parametros obtenidos del body (atributos)
    res.status(202).json({ message: "Se encontro la sucursal", data: idSuc }); //Status accepted, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// READ BY ADDRESS FUNCIONAL
routerSucursal.get("/read/address", async (req, res) => {
  try {
    const { calle, colonia, numero } = req.body; // Atributos para el body (Parametros de procedimiento)
    const resultado = await readSucursalByAddr(connection, {
      calle: req.body.calle,
      colonia: req.body.colonia,
      numero: req.body.numero,
    }); // Parametros obtenidos del body (atributos)
    res.status(202).json({
      message: "Se encontro la sucursal",
      data: resultado,
    }); // Status accepted, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// UPDATE FUNCIONAL
routerSucursal.patch("/update", async (req, res) => {
  try {
    const { idSuc, calle, colonia, numero, cp, apertura, cierre } = req.body; // Atributos para el body (Parametros de procedimiento)
    const resultado = await updateSucursal(connection, {
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
    const { idSuc } = req.body; // Atributos para el body (Parametros de procedimiento)
    const resultado = await deleteSucursal(connection, {
      idSuc: req.body.idSuc,
    }); // Parametros obtenidos del body (atributos)
    res.status(202).json({
      message: "Se elimino correctamente la sucursal",
      data: idSuc,
      resultado,
    }); // Status Accepted, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});
