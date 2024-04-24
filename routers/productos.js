import express from "express";
import { enableConnect } from "../DB/connection.js";
import { createProducto } from "../DB/query/queryProductos.js";
export const routerProductos = express.Router();
routerProductos.use(express.json());

const messageError = "Ha ocurrido un error al procesar tu peticion: ";
const connection = await enableConnect();

// CREATE
routerProductos.post("/create", async (req, res) => {
  try {
    const { name, price, descr, pilar, suc, stockIni } = req.body;
    const resultado = await createProducto(connection, {
      name: req.body.name,
      price: req.body.price,
      descr: req.body.descr,
      pilar: req.body.pilar,
      suc: req.body.suc,
      stockIni: req.body.stockIni,
    });
    resultado = JSON.stringify(resultado);
    res
      .status(201)
      .json({ message: "El producto se creo correctamente", data: resultado });
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});

// READ BY ID
routerProductos.get("/read/id", async (req, res) => {
  try {
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});

// READ BY NAME
routerProductos.get("/read/name", async (req, res) => {
  try {
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});

// UPDATE
routerProductos.patch("/update", async (req, res) => {
  try {
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});

// DELETE
routerProductos.delete("/delete", async (req, res) => {
  try {
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});
