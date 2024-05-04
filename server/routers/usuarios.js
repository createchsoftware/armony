import express from "express";
import { conexion } from "../db/connection.js";
import {
  createUser,
  deleteUserById,
  readUserById,
  readUserByNP,
  updateImgUser,
  updateInfoUser,
  updatePassUser,
} from "../db/query/queryUser.js";

// Router
export const routerUser = express.Router();

// Middleware
routerUser.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

const messageError = "Ha ocurrido un error al procesar tu peticion: ";

// CREATE FUNCIONAL
routerUser.post("/create", async (req, res) => {
  try {
    const resultado = await createUser(conexion, {
      name: req.body.name,
      ap: req.body.ap,
      am: req.body.am,
      email: req.body.email,
      phone: req.body.phone,
      pass: req.body.pass,
      tipo: req.body.tipo,
      img: req.body.img,
      calle: req.body.calle,
      colonia: req.body.colonia,
      numero: req.body.numero,
      cp: req.body.cp,
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
    const resultado = await readUserById(conexion, { idUser: req.params.id });
    if (resultado.length === 0)
      res.status(204).send("No se encontro el usuario.");
    res.status(302).json({ message: "Usuario encontrado ", data: resultado }); // Status found, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err);
  }
});

// READ BY NAME & LAST NAME FUNCIONAL
routerUser.get("/read/nomAp", async (req, res) => {
  try {
    const resultado = await readUserByNP(conexion, {
      name: req.body.name,
      ap: req.body.ap,
      am: req.body.am,
    }); // Parametros obtenidos por body
    if (resultado.length === 0)
      res.status(500).send("No se encontro el usuario.");
    res
      .status(302)
      .json({ message: "Se encontro el usuario", data: resultado }); // Status Found, enviamos informacion en formato JSON
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
    const resultado = await updateInfoUser(conexion, {
      idUser: req.body.idUser,
      name: req.body.name,
      ap: req.body.ap,
      am: req.body.am,
      email: req.body.email,
      phone: req.body.phone,
      calle: req.body.calle,
      colonia: req.body.colonia,
      numero: req.body.numero,
      cp: req.body.cp,
    }); // Parametros obtenidos por body
    res.status(202).json({
      message: "Usuario actualizado correctamente",
      data: resultado,
    }); // Status Accepted, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// IMG FUNCIONAL
routerUser.patch("/updateImg/:id/img", async (req, res) => {
  try {
    const idUser = req.params;
    await updateImgUser(conexion, {
      idUser: req.params.id,
      newImg: req.body.img,
    }); // Parametros obtenidos por body
    res.status(2002).json({
      message: "Se actualizo correctamente la imagen",
      data: idUser,
      img,
    }); // Status Accepted, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// PASSWORD FUNCIONAL
routerUser.patch("/update/password", async (req, res) => {
  try {
    const usuarioNewPass = await updatePassUser(conexion, {
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
    const resultado = await deleteUserById(conexion, {
      idUsuario: req.params.id,
    });
    res.status(204).json({
      message: "El usuario se elimino corectamente.",
      data: idUsuario,
    }); // Status NO CONTENT, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});
