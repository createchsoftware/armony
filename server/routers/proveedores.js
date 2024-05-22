import express from "express";
import { conexion } from "../db/connection.js";
import {
  createProveedor,
  readProveedorById,
  readProveedorByName,
  updateProveedor,
  deleteProveedor,
} from "../db/query/queryProveedor.js";

// Router
export const routerProveedor = express.Router();

// Middleware
routerProveedor.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

const messageError = "Ha ocurrido un error al procesar tu peticion: ";
// const connection = await enableConnect(); // Almacenamos la conexion con la base de datos

// CREATE FUNCIONAL
routerProveedor.post("/create", async (req, res) => {
  try {
    const resultado = await createProveedor(conexion, {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      webSite: req.body.webSite,
    }); // // Atributos para el body (Parametros de procedimiento)
    res
      .status(201)
      .json({ message: "Proveedor creado correctamente", data: resultado }); // Status Created, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// READ BY ID FUNCIONAL
routerProveedor.get("/read/:id", async (req, res) => {
  try {
    const resultado = await readProveedorById(conexion, {
      idProv: req.params.id,
    }); // Atributo obtenido por la url
    res
      .status(302)
      .json({ message: "Se encontro el proveedor", data: resultado }); // Status found, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// READ BY NAME FUNCIONAL
routerProveedor.get("/search/name", async (req, res) => {
  try {
    const resultado = await readProveedorByName(conexion, {
      nameProv: req.body.nameProv,
    }); // // Atributos para el body (Parametros de procedimiento)
    // if (resultado.length === 0)
    //   // no encontro un proveedor
    //   res.status(500).send("No se encontro el proveedor"); // Enviamos un error INTERNAL SERVER ERRRO y el mensaje al navegador
    res
      .status(302)
      .json({ message: "Se encontro el proveedor", data: resultado }); // Status found, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// UPDATE FUNCIONAL
routerProveedor.patch("/update", async (req, res) => {
  try {
    const resultado = await updateProveedor(conexion, {
      idProv: req.body.idProv,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      webSite: req.body.webSite,
    }); // // Atributos para el body (Parametros de procedimiento)
    res.status(202).json({
      message: "Proveedor actualizado correctamente",
      data: resultado,
    }); // Status Accepted, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// DELETE FUNCIONAL
routerProveedor.delete("/delete", async (req, res) => {
  try {
    const resultado = await deleteProveedor(conexion, {
      idProv: req.body.idProv,
    }); // // Atributos para el body (Parametros de procedimiento)
    res
      .status(204)
      .json({ message: "Proveedor eliminado correctamente", data: resultado }); // Status NO-CONTENT, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});
