import express from "express";
import { conexion } from "../db/connection.js";
import {
  createServicios,
  readProdServByCategoria,
  readProdServById,
  updateProdServ,
  deleteProdServ,
} from "../db/query/queryProductos.js";

// Router
export const routerServicio = express.Router();

// Middleware
routerServicio.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

const messageError = "Ha ocurrido un error al procesar tu peticion: ";
// const connection = await enableConnect(); // Almacenamos conexion de base de datos

// CREATE FUNCIONAL
routerServicio.post("/create", async (req, res) => {
  try {
    const resultado = await createServicios(conexion, {
      name: req.body.name,
      price: req.body.price,
      descr: req.body.descr,
      time: req.body.time,
      pilar: req.body.pilar,
    }); // Parametros obtenidos por body
    res
      .status(201)
      .json({ message: "Servicio creado exitosamente", data: resultado }); // Status Created, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// READ BY ID FUNCIONAL
routerServicio.get("/read/id", async (req, res) => {
  try {
    const resultado = await readProdServById(conexion, {
      idProdServ: req.body.idProdServ,
    }); // Parametros obtenidos por body
    if (resultado.length === 0)
      // No encontro el usuario
      res.status(404).send("No se encontro el servicio."); // Status Not Found, Enviamos informacion al navegador
    res
      .status(302)
      .json({ message: "Se encontro el servicio.", data: resultado }); // Status found, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// READ BY CAT
// PENDIENTE, FALTA CRUD DE CATEGORIA
routerServicio.get("/read/name", async (req, res) => {
  try {
    const resultado = await readProdServByCategoria(conexion, {
      categoria: req.body.categoria,
    }); // Parametros obtenidos por body
    const row = resultado[0];
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// UPDATE FUNCIONAL
routerServicio.patch("/update", async (req, res) => {
  try {
    const resultado = await updateProdServ(conexion, {
      idProdServ: req.body.idProdServ,
      name: req.body.name,
      price: req.body.price,
      descr: req.body.descr,
      status: req.body.status,
      time: req.body.time,
      img: req.body.img,
    }); // Parametros obtenidos por body
    res.status(202).json({
      message: "Se actualizo exitosamente el producto",
      data: resultado,
    }); // Status Accepted, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// DELETE FUNCIONAL
routerServicio.delete("/delete", async (req, res) => {
  try {
    const resultado = await deleteProdServ(conexion, {
      idProdServ: req.body.idProdServ,
    }); // Parametros obtenidos por body
    res.status(204).json({
      message: "Se elimino correctamente el servicio",
      data: resultado,
    }); // Status NO-CONTENT, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});
