import express from "express";
import { readClientesById } from "../DB/query/queryCliente.js";
import { enableConnect, conexion } from "../DB/connection.js";
import { createUser } from "../DB/query/queryUser.js";

export const routerCliente = express.Router();

const connection = conexion;
const messageError = "Ha ocurrido un error al procesar tu peticion: ";

// CLIENTES
// CREATE
routerCliente.get("/create", async (req, res) => {
  try {
    const clienteNew = await createUser(connection, {
      nombre: "julian",
      paterno: "sandoval",
      materno: "godinez",
      email: "correo@correo.com",
      phone: "1234567890",
      pass: "password",
      tipo: 3,
      img: null,
    });
    res.send(userNew);
  } catch (err) {
    console.error(messageError, err);
  }
});

// READ
// FUNCIONA
routerCliente.get("/read/:id", async (req, res) => {
  try {
    const resultado = await readClientesById(connection, {
      fkUsuario: req.params.id,
    });
    res.send(JSON.stringify(resultado));
  } catch (err) {
    console.error("Ha ocurrido un error: ", err);
    res.status(500).send("Ha ocurrido un erro al procesar tu solicitud");
  }
});

routerCliente.get("/update", (req, res) => {});

routerCliente.delete("/delete", (req, res) => {
  deleteClientes(connection, { idCliente: 5 }, (result) =>
    res.send(JSON.stringify(result))
  );
});
