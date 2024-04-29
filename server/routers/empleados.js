import express from "express";
import { enableConnect } from "../DB/connection.js";
import {
  createEmpleado,
  readEmpleadoById,
  readEmpleadoByNombre,
  updateEmpleado,
  deleteEmpleadoById,
} from "../DB/query/queryEmpleado.js";

// Router
export const routerEmpleado = express.Router();

// Middleware
routerEmpleado.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

const connection = await enableConnect(); // Almacenamos conexion de base de datos
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
      .status(201) // Status created
      .json({ message: "Empleada creada exitosamente", data: resultado }); // Enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// READ BY ID FUNCIONAL
routerEmpleado.get("/read", async (req, res) => {
  try {
    const { idEmp } = req.body;
    const resultado = await readEmpleadoById(connection, {
      idEmp: req.body.idEmp,
    }); // Parametros enviados por body
    res
      .status(202) // Status Accepted
      .json({ message: "Empleada encontrada con exito", data: resultado }); // Enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
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
      .status(202) // Status Accepted
      .json({ message: "Se encontro el usuario", data: resultado }); // Enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
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
    }); // Parametros por body
    res.status(202).json({ message: "Empleada actualizado", data: resultado }); // Status Accepted, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// DELETE FUNCIONAL
routerEmpleado.delete("/delete", async (req, res) => {
  try {
    const { idEmp } = req.body;
    const resultado = await deleteEmpleadoById(connection, {
      idEmp: req.body.idEmp,
    }); // Parametro por body
    res
      .status(202) // Status Accepted
      .json({ message: "Empleada eliminada correctamente", data: resultado }); // Enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});
