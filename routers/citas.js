import express from "express";
import { conexion } from "../DB/connection.js";
import { horasDisponibles, horasDipoArray } from "../DB/query/queryCitas.js";

// Router
export const routerCitas = express.Router();

// Middleware
routerCitas.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

// const conexion = await enableConnect(); // Almacenamos conexion de base de datos
const messageError = "Ha ocurrido un error al procesar tu peticion: ";

routerCitas.get("/disponibles", async (req, res) => {
  try {
    const resultado = await horasDisponibles(conexion, {
      idServ: req.body.idServ,
      idEmp: req.body.idEmp,
      fechaCita: req.body.fecha,
    });
    const horas = await horasDipoArray(resultado);
    console.table(horas);
    res.status(200).json({ message: "Horas disponibles: ", data: horas });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});
