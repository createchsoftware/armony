import express from "express";
import { enableConnect } from "../DB/connection.js";
import {
  createServicios,
  readProdServByCategoria,
  readProdServById,
  updateProdServ,
  deleteProdServ,
} from "../DB/query/queryProductos.js";

export const routerServicio = express.Router();
routerServicio.use(express.json());

const messageError = "Ha ocurrido un error al procesar tu peticion: ";
const connection = await enableConnect();

// CREATE FUNCIONAL
routerServicio.post("/create", async (req, res) => {
  try {
    const { name, price, descr, time, pilar } = req.body;
    const resultado = await createServicios(connection, {
      name: req.body.name,
      price: req.body.price,
      descr: req.body.descr,
      time: req.body.time,
      pilar: req.body.pilar,
    });
    res
      .status(201)
      .json({ message: "Servicio creado exitosamente", data: resultado });
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError);
  }
});

// READ BY ID FUNCIONAL
routerServicio.get("/read/id", async (req, res) => {
  try {
    const { idProdServ } = req.body;
    const resultado = await readProdServById(connection, {
      idProdServ: req.body.idProdServ,
    });
    if (resultado.length === 0)
      res.status(500).send("No se encontro el servicio.");
    res
      .status(201)
      .json({ message: "Se encontro el servicio.", data: resultado });
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});

// READ BY CAT
// PENDIENTE, FALTA CRUD DE CATEGORIA
routerServicio.get("/read/name", async (req, res) => {
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
routerServicio.patch("/update", async (req, res) => {
  try {
    const { idProdeServ, name, price, descr, status, time, img } = req.body;
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
      data: resultado,
    });
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});

// DELETE FUNCIONAL
routerServicio.delete("/delete", async (req, res) => {
  try {
    const { idProdServ } = req.body;
    const resultado = await deleteProdServ(connection, {
      idProdServ: req.body.idProdServ,
    });
    res.status(201).json({
      message: "Se elimino correctamente el servicio",
      data: resultado,
    });
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});
