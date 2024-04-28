import express from "express";
import { readClientesById } from "../DB/query/queryCliente.js";
import { conexion } from "../DB/connection.js";
import {
  createCliente,
  addPatoCliente,
  updatePatoCliente,
  deletePatoCliente,
} from "../DB/query/queryCliente.js";
// Router
export const routerCliente = express.Router();

// Middleware
routerCliente.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

// const conexion = await enableConnect(); // Almacenamos la conexion con la base de datos
const messageError = "Ha ocurrido un error al procesar tu peticion: ";

// CREATE CLIENTE
routerCliente.post("/create", async (req, res) => {
  try {
    const resultado = await createCliente(conexion, {
      name: req.body.name,
      ap: req.body.ap,
      am: req.body.am,
      email: req.body.email,
      phone: req.body.phone,
      pass: req.body.pass,
      tipo: req.body.tipo,
      img: req.body.img,
      calle: req.body.calle,
      colonia: req.body.colonia,
      numero: req.body.numero,
      cp: req.body.cp,
    });
    res.status(201).json({
      message: "Se creo el usuario con patologia.",
      data: resultado,
    });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// CREATE CLIENTE-PATO FUNCIONAL
routerCliente.post("/create/cliente_patologia", async (req, res) => {
  try {
    const resultado = await addPatoCliente(conexion, {
      idCliente: req.body.idCliente,
      idPato: req.body.idPato,
      descr: req.body.descr,
    });
    res.status(201).json({
      message: "Se creo el usuario con patologia.",
      data: resultado,
    });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// READ
// FUNCIONA
routerCliente.get("/read", async (req, res) => {
  try {
    const resultado = await readClientesById(conexion, {
      idCliente: req.body.idCliente,
    }); // Parametros de ruta
    res
      .status(302)
      .json({ message: "Se encontro el usuario.", data: resultado }); // Status found, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// UPDATE
routerCliente.get("/update", (req, res) => {});

// UPDATE CLIENTE-PATO FUNCIONAL
routerCliente.patch("/update/cliente_patologia", async (req, res) => {
  try {
    const resultado = await updatePatoCliente(conexion, {
      idCliente: req.body.idCliente,
      idPato: req.body.idPato,
      descr: req.body.descr,
    });
    res.status(202).json({
      message: "Se actualizo el usuario con patologia.",
      data: resultado,
    }); // Status Accepted, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// DELETE CLIENTE-PATO FUNCIONAL
routerCliente.delete("/delete/cliente_patologia", async (req, res) => {
  try {
    const resultado = await deletePatoCliente(conexion, {
      idCliente: req.body.idCliente,
      idPato: req.body.idPato,
    });
    res.status(204).json({
      message: "Se elimino el usuario con patologia.",
      data: resultado,
    }); // Status NO-CONTENT, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});
