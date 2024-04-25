import express from "express";
import { enableConnect } from "../DB/connection.js";
import {
  createSucursal,
  updateSucursal,
  readSucursalByAddr,
  readSucursalById,
  deleteSucursal,
} from "../DB/query/querySucursal.js";

export const routerSucursal = express.Router();
routerSucursal.use(express.json());

const messageError = "Ha ocurrido un error al procesar tu peticion: ";
const connection = await enableConnect();

// CREATE FUNCIONAL
routerSucursal.post("/create", async (req, res) => {
  try {
    const { calle, colonia, numero, cp, apertura, cierre } = req.body;
    const resultado = await createSucursal(connection, {
      calle: req.body.calle,
      colonia: req.body.colonia,
      numero: req.body.numero,
      cp: req.body.cp,
      apertura: req.body.apertura,
      cierre: req.body.cierre,
    });
    res
      .status(201)
      .json({ message: "Sucursal creada correctamente", data: resultado });
  } catch (err) {
    console.error(messageError, err);
  }
});

// READ BY ID FUNCIONAL
routerSucursal.get("/read/id", async (req, res) => {
  try {
    const { idSuc } = req.body;
    await readSucursalById(connection, { idSuc: req.body.idSuc });
    res.status(201).json({ message: "Se encontro la sucursal", data: idSuc });
  } catch (err) {
    console.error(messageError, err);
  }
});

// READ BY ADDRESS FUNCIONAL
routerSucursal.get("/read/address", async (req, res) => {
  try {
    const { calle, colonia, numero } = req.body;
    await readSucursalByAddr(connection, {
      calle: req.body.calle,
      colonia: req.body.colonia,
      numero: req.body.numero,
    });
    res.status(201).json({
      message: "Se encontro la sucursal",
      data: calle,
      colonia,
      numero,
    });
  } catch (err) {
    console.error(messageError, err);
  }
});

// UPDATE FUNCIONAL
routerSucursal.patch("/update", async (req, res) => {
  try {
    const { idSuc, calle, colonia, numero, cp, apertura, cierre } = req.body;
    await updateSucursal(connection, {
      idSuc: req.body.idSuc,
      calle: req.body.calle,
      colonia: req.body.colonia,
      numero: req.body.numero,
      cp: req.body.cp,
      apertura: req.body.apertura,
      cierre: req.body.cierre,
    });
    res.status(201).json({
      message: "Sucursal actualizada correctamente",
      data: calle,
      colonia,
      numero,
      cp,
      apertura,
      cierre,
    });
  } catch (err) {
    console.error(messageError, err);
  }
});

// DELETE FUNCIONAL
routerSucursal.delete("/delete", async (req, res) => {
  try {
    const { idSuc } = req.body;
    await deleteSucursal(connection, {
      idSuc: req.body.idSuc,
    });
    res
      .status(201)
      .json({ message: "Se elimino correctamente la sucursal", data: idSuc });
  } catch (err) {
    console.error(messageError, err);
  }
});
