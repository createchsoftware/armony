import express from "express";
export const routerFavoritos = express.Router();
import {
  addfavorito,
  delFavorito,
  ProductFavoritosbyId,
  ServiceFavoritosbyId,
} from "../db/query/queryFavoritos.js";
import { conexion } from "../db/connection.js";

routerFavoritos.use(express.json()); // Middleware

//funcional
routerFavoritos.post("/addfavorito", async (req, res) => {
  try {
    const data = req.body;
    await addfavorito(conexion, data);
    res.status(202).send({ message: "Se anadio con exito" });
    conexion.end();
  } catch (err) {
    res.status(500).send({ error: "Hubo un problema", err });
  }
});

//funcional
routerFavoritos.post("/delFavorito", async (req, res) => {
  try {
    const data = req.body;
    await delFavorito(conexion, data);
    res.status(201).send({ message: "Se elimino con exito" });
  } catch (err) {
    res.status(500).send({ error: "Hubo un problema", err });
  }
});

// FUNCIONAL
// OBTIENE LOS PRODUCTOS FAVORITOS DEL CLIENTE
routerFavoritos.get("/ProductFavoritosbyId/:id", async (req, res) => {
  try {
    const resultado = await ProductFavoritosbyId(conexion, {
      idCliente: req.params.id,
    });
    res.send(JSON.stringify(resultado));
  } catch (err) {
    res.status(500).send({ error: "Hubo un problema", err });
  }
});

// FUNCIONAL
// OBTIENE LOS SERVICIOS FAVORITOS DEL CLIENTE
routerFavoritos.get("/ServiceFavoritosbyId/:id", async (req, res) => {
  try {
    const resultado = await ServiceFavoritosbyId(conexion, {
      idCliente: req.params.id,
    });
    res.send(JSON.stringify(resultado));
  } catch (err) {
    res.status(500).send({ error: "Hubo un problema", err });
  }
});
