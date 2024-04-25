import express from "express";
import { enableConnect } from "../DB/connection.js";
import { createCategoria } from "../DB/query/queryCategoria.js";

export const routerCategoria = express.Router();
routerCategoria.use(express.json());

const messageError = "Ha ocurrido un error al procesar tu peticion: ";
const connection = await enableConnect();

// CREATE
routerCategoria.post("/create", async (req, res) => {
  try {
    const { pilar, name, descr } = req.body;
    const resultado = await createCategoria(connection, {
      pilar: req.body.pilar,
      name: req.body.name,
      descr: req.body.descr,
    });
    resultado = resultado[0];
    res
      .status(201)
      .json({ message: "Se creo correctamente la categoria", data: resultado });
  } catch (err) {
    console.error(messageError, err);
    res.send(messageError);
  }
});

// READ

// UPDATE

// DELETE
