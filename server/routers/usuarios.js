import express from "express";
import { enableConnect } from "../DB/connection.js";
import {
  createUser,
  deleteUserById,
  readUserById,
  readUserByNP,
  updateImgUser,
  updateInfoUser,
  updatePassUser,
} from "../DB/query/queryUser.js";

// Router
export const routerUser = express.Router();

// Middleware
routerUser.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

const messageError = "Ha ocurrido un error al procesar tu peticion: ";
const connection = await enableConnect(); // Almacenamos la conexion con la base de datos

// CREATE FUNCIONAL
routerUser.post("/create", async (req, res) => {
  try {
    const { name, ap, am, email, phone, pass, tipo, img } = req.body; // Atributos para el body (Parametros de procedimiento)
    const resultado = await createUser(connection, {
      name: req.body.name,
      ap: req.body.ap,
      am: req.body.am,
      email: req.body.email,
      phone: req.body.phone,
      pass: req.body.pass,
      tipo: req.body.tipo,
      img: req.body.img,
    }); // Parametros obtenidos por body
    resultado = JSON.stringify(resultado);
    res
      .status(201)
      .json({ message: "El usuario se creo exitosamente", data: resultado }); // Status Created, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// READ BY ID
// FUNCIONAL
routerUser.get("/read/id/:id", async (req, res) => {
  try {
    const resultado = await readUserById(connection, { idUser: req.params.id });
    if (resultado.length === 0)
      res.status(500).send("No se encontro el usuario.");
    res.status(201).json({ message: "Usuario encontrado ", data: resultado });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err);
  }
});

// READ BY NAME & LAST NAME FUNCIONAL
routerUser.get("/read/nomAp", async (req, res) => {
  try {
    const { name, ap, am } = req.body; // Atributos para el body (Parametros de procedimiento)
    const resultado = await readUserByNP(connection, {
      name: req.body.name,
      ap: req.body.ap,
      am: req.body.am,
    }); // Parametros obtenidos por body
    if (resultado.length === 0)
      res.status(500).send("No se encontro el usuario.");
    res
      .status(201)
      .json({ message: "Se encontro el usuario", data: name, ap, am });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// UPDATE FUNCIONAL
// INFO
routerUser.patch("/updateInfo/", async (req, res) => {
  try {
    const { idUser, name, ap, am, email, phone } = req.body; // Atributos para el body (Parametros de procedimiento)
    const resultado = await updateInfoUser(connection, {
      idUser: req.body.idUser,
      name: req.body.name,
      ap: req.body.ap,
      am: req.body.am,
      email: req.body.email,
      phone: req.body.phone,
    }); // Parametros obtenidos por body
    res.status(201).json({
      message: "Usuario actualizado correctamente",
      data: { idUser, name, ap, am, email, phone },
    });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// IMG FUNCIONAL
routerUser.patch("/updateImg/:id/img", async (req, res) => {
  try {
    const img = req.body;
    const idUser = req.params;
    await updateImgUser(connection, {
      idUser: req.params.id,
      newImg: req.body.img,
    }); // Parametros obtenidos por body
    res.status(201).json({
      message: "Se actualizo correctamente la imagen",
      data: idUser,
      img,
    });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// PASSWORD FUNCIONAL
routerUser.patch("/update/password", async (req, res) => {
  try {
    const { idUser, pass } = req.body; // Atributos para el body (Parametros de procedimiento)
    const usuarioNewPass = await updatePassUser(connection, {
      idUser: req.body.idUser,
      pass: req.body.pass,
    }); // Parametros obtenidos por body
    res.status(202).json({ message: "Contraseña actualizada correctamente" }); // Status Accepted, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// DELETE FUNCIONAL
routerUser.delete("/delete/:id", async (req, res) => {
  const idUsuario = req.params;
  try {
    const resultado = await deleteUserById(connection, {
      idUsuario: req.params.id,
    });
    res.status(202).json({
      message: "El usuario se elimino corectamente.",
      data: idUsuario,
    }); // Status accepted, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});
