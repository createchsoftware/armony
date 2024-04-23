import express from "express";
import { enableConnect } from "../DB/connection.js";
import {
  createProveedor,
  readProveedorById,
  readProveedorByName,
  updateProveedor,
  deleteProveedor,
} from "../DB/query/queryProveedor.js";

export const routerProveedor = express.Router();
routerProveedor.use(express.json());

const messageError = "Ha ocurrido un error al procesar tu peticion: ";
const connection = await enableConnect();

// USER

// CREATE
routerProveedor.post("/create", async (req, res) => {
  try {
    const resultado = await createProveedor(connection, {
      name: "Bachoco",
      phone: "1234567890",
      email: "bachoco@correo.com",
      webSite: "bachoco.com",
    });
    res
      .status(201)
      .json({ message: "Proveedor creado correctamente", data: resultado });
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});

// READ BY ID
routerProveedor.get("/read/id", async (req, res) => {
  try {
    const resultado = await readProveedorById(connection, { idProv: 1 });
    if (resultado.length === 0)
      res.status(500).send("No se encontro el usuario.");
    res.send(resultado);
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});

// READ BY NAME
routerProveedor.get("/read/name", async (req, res) => {
  try {
    const resultado = await readProveedorByName(connection, {
      nameProv: "bachoco",
    });
    if (resultado.length === 0)
      res.status(500).send("No se encontro el usuario");
    res.send(resultado);
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});

// UPDATE
routerProveedor.patch("/update", async (req, res) => {
  try {
    const resultado = await updateProveedor(connection, {
      idProv: 1,
      name: "Lala",
      phone: "0987654321",
      email: "lala@lala.com",
      webSite: "lala.com",
    });
    res.status(201).json({
      message: "Proveedor actualizado correctamente",
      data: resultado,
    });
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});

// DELETE
routerProveedor.delete("/delete", async (req, res) => {
  try {
    const resultado = await deleteProveedor(connection, { idProv: 1 });
    res.json({ message: "Proveedor eliminado correctamente" });
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});
