import express from "express";
import { conexion } from "../db/connection.js";
import { logIn } from "../db/query/queryLogin.js";

// Router
export const routerLogIn = express.Router();

// Middleware
routerLogIn.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

const messageError = "Ha ocurrido un error al procesar tu peticion: ";
// const connection = await enableConnect(); // Almacenamos la conexion con la base de datos

// Log In
routerLogIn.get("/", async (req, res) => {
  try {
    const { idUser, pass } = req.body;
    const resultado = await logIn(conexion, {
      idUser: req.body.idUser,
      pass: req.body.pass,
    });
    res.status(200).json({ message: "Log In exitoso", data: resultado });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});
