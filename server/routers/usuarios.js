import express from "express";
import { enableConnect } from "../db/connection.js";
import {
  createUser,
  deleteUserById,
  readUserById,
  readUserByNP,
  updateImgUser,
  updateInfoUser,
  updatePassUser,
} from "../db/query/queryUser.js";

export const routerUser = express.Router();

const messageError = "Ha ocurrido un error al procesar tu peticion: ";
const connection = await enableConnect(); // PENDIENTE A PROBAR
// USER
// CREATE
// FUNCIONAL
routerUser.post("/create", async (req, res) => {
  try {
    // const { nombre, ap, am, mail, tel, pass, tipo } = req.body;
    const resultado = await createUser(connection, {
      nom: "Brandon",
      ap: "Badillo",
      am: "Jimenez",
      mail: "a21490524@itmexicali.edu.mx",
      tel: "6864567890",
      pass: "4rM0nyS3cure!",
      tipo: 1,
      img: null,
    });
    res.send(resultado);
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError);
  }
});

// READ BY ID
// FUNCIONAL
routerUser.get("/read/id/:id", async (req, res) => {
  try {
    const resultado = await readUserById(connection, { idUser: req.params.id });
    if (resultado.length === 0)
      res.status(500).send("No se encontro el usuario.");
    res.send(JSON.stringify(resultado));
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError);
  }
});

// READ BY NAME & LAST NAME
routerUser.get("/read/nomAp/:nomAp", async (req, res) => {
  try {
    const resultado = await readUserByNP(connection, {
      nomAp: req.params.nomAp,
    });
    if (resultado.length === 0)
      res.status(500).send("No se encontro el usuario.");
    res.status(200).send(JSON.stringify(resultado));
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError);
  }
});

// UPDATE
// INFO
routerUser.put("/updateInfo/", async (req, res) => {
  try {
    const usuarioNew = req.body;
    const resultado = await updateInfoUser(connection, usuarioNew);
    res.status(200).send(resultado);
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError);
  }
});

// IMG
routerUser.patch("/updateImg/:id/img", async (req, res) => {
  try {
    datos = req.body;
    const usuarioImgNew = await updateImgUser(connection, datos);
    res.status(200).send(usuarioImgNew);
  } catch (err) {
    console.error(messageError);
    res.status(500).send(messageError);
  }
});

// PASSWORD
routerUser.patch("/update/password", async (req, res) => {
  try {
    pass = req.body;
    const usuarioNewPass = await updatePassUser(connection, pass);
    res.status(200).send(usuarioNewPass);
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError);
  }
});

// DELETE
// Pendiente a resolver
routerUser.delete("/delete", async (req, res) => {
  try {
    const resultado = await deleteUserById(connection, { idUsuario: 6 });
    res.send("Usuario eliminado: ", resultado);
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError);
  }
});
