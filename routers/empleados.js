import express from "express";
import { enableConnect } from "../DB/connection.js";
import {
  createEmpleado,
  readEmpleadoById,
  readEmpleadoByNombre,
  updateEmpleado,
  deleteEmpleadoById,
} from "../DB/query/queryEmpleado.js";

export const routerEmpleado = express.Router();
routerEmpleado.use(express.json());

const connection = await enableConnect();

const messageError = "Ha ocurrido un error al procesar tu peticion: ";

// CREATE FUNCIONAL
routerEmpleado.post("/create", async (req, res) => {
  try {
    const {
      name,
      ap,
      am,
      email,
      phone,
      pass,
      tipo,
      img,
      checkIn,
      checkOut,
      calle,
      colonia,
      numero,
    } = req.body;
    const resultado = await createEmpleado(connection, {
      name: req.body.name,
      ap: req.body.ap,
      am: req.body.am,
      email: req.body.email,
      phone: req.body.phone,
      pass: req.body.pass,
      tipo: req.body.tipo,
      img: req.body.img,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      calle: req.body.calle,
      colonia: req.body.colonia,
      numero: req.body.numero,
    }); // Parametros

    res
      .status(201)
      .json({ message: "Empleada creada exitosamente", data: resultado });
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError);
  }
});

// READ BY ID FUNCIONAL
routerEmpleado.get("/read", async (req, res) => {
  try {
    const { idEmp } = req.body;
    const resultado = await readEmpleadoById(connection, {
      idEmp: req.body.idEmp,
    });
    res
      .status(201)
      .json({ message: "Empleada encontrada con exito", data: resultado });
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError);
  }
});

// READ BY NAME FUNCIONAL
routerEmpleado.get("/read/name", async (req, res) => {
  try {
    const { name, ap, am } = req.body;
    const resultado = await readEmpleadoByNombre(connection, {
      name: req.body.name,
      ap: req.body.ap,
      am: req.body.am,
    }); // Parametros y ejecutamos la peticion
    res
      .status(201)
      .json({ message: "Se encontro el usuario", data: resultado });
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError);
  }
});

// UPDATE FUNCIONAL
routerEmpleado.patch("/update", async (req, res) => {
  try {
    const { idEmp, checkIn, checkOut, act, calle, colonia, numero } = req.body;
    const resultado = await updateEmpleado(connection, {
      idEmp: req.body.idEmp,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      act: req.body.act,
      calle: req.body.calle,
      colonia: req.body.colonia,
      numero: req.body.numero,
    });
    res.status(201).json({ message: "Empleada actualizado", data: resultado });
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError);
  }
});

// DELETE FUNCIONAL
routerEmpleado.delete("/delete", async (req, res) => {
  const { idEmp } = req.body;
  const resultado = await deleteEmpleadoById(connection, {
    idEmp: req.body.idEmp,
  });
  res
    .status(201)
    .json({ message: "Empleada eliminada correctamente", data: resultado });
});
