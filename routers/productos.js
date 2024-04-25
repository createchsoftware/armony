import express from "express";
import { enableConnect } from "../DB/connection.js";
import {
  createProducto,
  readProdServById,
  readProdServByCategoria,
  updateProdServ,
  deleteProdServ,
} from "../DB/query/queryProductos.js";
export const routerProductos = express.Router();
routerProductos.use(express.json());

const messageError = "Ha ocurrido un error al procesar tu peticion: ";
const connection = await enableConnect();

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
    });
    res.status(201).json({
      message: "El producto se creo correctamente",
      data: name,
      price,
      pilar,
      descr,
      suc,
      stockIni,
    });
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});

// READ BY ID FUNCIONAL
routerProductos.get("/read/id", async (req, res) => {
  try {
    const { idProdServ } = req.body;
    const resultado = await readProdServById(connection, {
      idProdServ: req.body.idProdServ,
    });
    const row = resultado[0];
    res
      .status(201)
      .json({ message: "Se encontro el producto.", data: idProdServ, row });
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});

// READ BY CAT
// PENDIENTE, FALTA CRUD DE CATEGORIA
routerProductos.get("/read/name", async (req, res) => {
  try {
    const { categoria } = req.body;
    const resultado = await readProdServByCategoria(connection, {
      categoria: req.body.categoria,
    });
    const row = resultado[0];
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
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
    });
    res.status(201).json({
      message: "Se actualizo exitosamente el producto",
      data: idProdServ,
      name,
      price,
      descr,
      status,
      time,
      img,
    });
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});

// DELETE FUNCIONAL
routerProductos.delete("/delete", async (req, res) => {
  try {
    const { idProdServ } = req.body;
    const resultado = await deleteProdServ(connection, {
      idProdServ: req.body.idProdServ,
    });
    res
      .status(201)
      .json({
        message: "Se elimino correctamente el producto",
        data: idProdServ,
      });
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});
