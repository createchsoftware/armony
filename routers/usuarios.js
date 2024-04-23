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
    res.send(JSON.stringify(resultado));
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});

// READ BY NAME & LAST NAME
// PENDIENTE (FALLA EN LA DB)
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
    res.status(500).send(messageError, err);
  }
});

// UPDATE
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

// IMG
routerUser.patch("/updateImg/:id/img", async (req, res) => {
  try {
    const img = req.body.img;
    const usuarioImgNew = await updateImgUser(connection, {
      idUser: req.params.id,
      newImg: img,
    });
    res.status(200).send(usuarioImgNew);
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});

// PASSWORD
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

// DELETE
// FUNCIONA
routerUser.delete("/delete/:id", async (req, res) => {
  try {
    const resultado = await deleteUserById(connection, {
      idUsuario: req.params.id,
    });
    res.send(resultado);
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});
