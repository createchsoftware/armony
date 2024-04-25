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

export const routerUser = express.Router();
routerUser.use(express.json());

const messageError = "Ha ocurrido un error al procesar tu peticion: ";
const connection = await enableConnect();

// USER
// CREATE
// FUNCIONAL
routerUser.post("/create", async (req, res) => {
  try {
    const { name, ap, am, email, phone, pass, tipo, img } = req.body;
    const resultado = await createUser(connection, {
      name: req.body.name,
      ap: req.body.ap,
      am: req.body.am,
      email: req.body.email,
      phone: req.body.phone,
      pass: req.body.pass,
      tipo: req.body.tipo,
      img: req.body.img,
    });
    resultado = JSON.stringify(resultado);
    res
      .status(201)
      .json({ message: "El usuario se creo exitosamente", data: resultado });
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
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
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});

// READ BY NAME & LAST NAME FUNCIONAL
routerUser.get("/read/nomAp", async (req, res) => {
  try {
    const { name, ap, am } = req.body; // Parametros para el body
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
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});

// UPDATE FUNCIONAL
// INFO
routerUser.patch("/updateInfo/", async (req, res) => {
  try {
    const { idUser, name, ap, am, email, phone } = req.body;
    const resultado = await updateInfoUser(connection, {
      idUser: req.body.idUser,
      name: req.body.name,
      ap: req.body.ap,
      am: req.body.am,
      email: req.body.email,
      phone: req.body.phone,
    });
    res.status(201).json({
      message: "Usuario actualizado correctamente",
      data: { idUser, name, ap, am, email, phone },
    });
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
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
    });
    res.status(201).json({
      message: "Se actualizo correctamente la imagen",
      data: idUser,
      img,
    });
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});

// PASSWORD FUNCIONAL
routerUser.patch("/update/password", async (req, res) => {
  try {
    const { idUser, pass } = req.body;
    const usuarioNewPass = await updatePassUser(connection, {
      idUser: req.body.idUser,
      pass: req.body.pass,
    });
    res.status(201).json({ message: "Contraseña actualizada correctamente" });
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});

// DELETE FUNCIONAL
routerUser.delete("/delete/:id", async (req, res) => {
  const idUsuario = req.params;
  try {
    const resultado = await deleteUserById(connection, {
      idUsuario: req.params.id,
    });
    res.status(201).json({
      message: "El usuario se elimino corectamente.",
      data: idUsuario,
    });
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});
