import express from "express";
import { enableConnect } from "../DB/connection.js";
import {
  createEmpleado,
  readEmpleadoById,
  readEmpleadoByNombre,
} from "../DB/query/queryEmpleado.js";

export const routerEmpleado = express.Router();
routerEmpleado.use(express.json());

const connection = await enableConnect();

const messageError = "Ha ocurrido un error al procesar tu peticion: ";

routerEmpleado.get("/create", async (req, res) => {
  try {
    const horaE = new Date();
    const horaF = new Date();
    horaE.setHours(12, 0, 0);
    horaF.setHours(8, 0, 0);
    const resultado = await createEmpleado(connection, {
      nom: "Armando",
      ap: "Armendariz",
      am: "Magaña",
      email: "armando@correo.com",
      phone: "1234567890",
      pass: "armandoArmendariz",
      tipo: 1,
      img: null,
      horaE: horaE,
      horaS: horaF,
    });
    res.send(resultado);
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError);
  }
});

// READ FUNCIONAL
routerEmpleado.get("/read", async (req, res) => {
  try {
    const resultado = await readEmpleadoById(connection, { idEmp: 14 });
    res.send(resultado);
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError);
  }
});
