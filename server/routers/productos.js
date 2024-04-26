import express from "express";
import { enableConnect } from "../DB/connection.js";
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
const connection = await enableConnect(); // Almacenamos la conexion con la base de datos

// CREATE
routerProductos.post("/create", async (req, res) => {
  try {
    const { name, price, descr, pilar, suc, stockIni } = req.body;
    await createProducto(connection, {
      name: req.body.name,
      price: req.body.price,
      descr: req.body.descr,
      pilar: req.body.pilar,
      suc: req.body.suc,
      stockIni: req.body.stockIni,
    }); // Parametros enviados por body
    res.status(201).json({
      message: "El producto se creo correctamente",
      data: name,
      price,
      pilar,
      descr,
      suc,
      stockIni,
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
    const { idProdServ } = req.body;
    const resultado = await readProdServById(connection, {
      idProdServ: req.body.idProdServ,
    }); // Parametros enviados por body
    res
      .status(202)
      .json({
        message: "Se encontro el producto.",
        data: idProdServ,
        resultado,
      }); // Status Accepted, mandamos informacion en formato JSON
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
    const { categoria } = req.body;
    const resultado = await readProdServByCategoria(connection, {
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
    const { idProdServ, name, price, descr, status, time, img } = req.body;
    const resultado = await updateProdServ(connection, {
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
      data: idProdServ,
      name,
      price,
      descr,
      status,
      time,
      img,
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
    const { idProdServ } = req.body;
    const resultado = await deleteProdServ(connection, {
      idProdServ: req.body.idProdServ,
    }); // Parametros enviados por body
    res.status(202).json({
      // Status Accepted
      message: "Se elimino correctamente el producto",
      data: idProdServ,
    }); // Enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});
