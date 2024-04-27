import express from "express";
import { conexion } from "../DB/connection.js";
import {
  createProducto,
  readProdServById,
  readProdServByCategoria,
  updateProdServ,
  deleteProdServ,
} from "../DB/query/queryProductos.js";

// Router
export const routerProductos = express.Router();

// Middleware
routerProductos.use(express.json()); //  Analiza las request entrantes con carga JSON basado en body-parse

const messageError = "Ha ocurrido un error al procesar tu peticion: ";
// const connection = await enableConnect(); // Almacenamos la conexion con la base de datos

// CREATE
routerProductos.post("/create", async (req, res) => {
  try {
    await createProducto(conexion, {
      name: req.body.name,
      price: req.body.price,
      descr: req.body.descr,
      pilar: req.body.pilar,
      suc: req.body.suc,
      stockIni: req.body.stockIni,
    }); // Parametros enviados por body
    res.status(201).json({
      message: "El producto se creo correctamente",
      data: resultado,
    }); // Status Created, mandamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// READ BY ID FUNCIONAL
routerProductos.get("/read/id", async (req, res) => {
  try {
    const resultado = await readProdServById(conexion, {
      idProdServ: req.body.idProdServ,
    }); // Parametros enviados por body
    res.status(302).json({
      message: "Se encontro el producto.",
      data: resultado,
    }); // Status found, mandamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// READ BY CAT
// PENDIENTE, FALTA CRUD DE CATEGORIA
routerProductos.get("/read/name", async (req, res) => {
  try {
    const resultado = await readProdServByCategoria(conexion, {
      categoria: req.body.categoria,
    }); // Parametros enviados por body
    const row = resultado[0];
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// UPDATE FUNCIONAL
routerProductos.patch("/update", async (req, res) => {
  try {
    const resultado = await updateProdServ(conexion, {
      idProdServ: req.body.idProdServ,
      name: req.body.name,
      price: req.body.price,
      descr: req.body.descr,
      status: req.body.status,
      time: req.body.time,
      img: req.body.img,
    }); // Parametros enviados por body
    res.status(202).json({
      message: "Se actualizo exitosamente el producto",
      data: resultado,
    }); // Status Accepted, mandamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// DELETE FUNCIONAL
routerProductos.delete("/delete", async (req, res) => {
  try {
    const resultado = await deleteProdServ(conexion, {
      idProdServ: req.body.idProdServ,
    }); // Parametros enviados por body
    res.status(204).json({
      // Status NO-CONTENT
      message: "Se elimino correctamente el producto",
      data: resultado,
    }); // Enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});
