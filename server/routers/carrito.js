import express from "express";
export const routerFavoritos = express.Router();
import {
    addCarrito,
  delCarrito,
  getCarritoCliente,
  modifyCarrito
} from "../db/query/queryCarrito.js";
import { conexion } from "../db/connection.js";

routerFavoritos.use(express.json()); // Middleware

//funcional
routerFavoritos.post("/addCarrito", async (req, res) => {
  try {
    const data = req.body;
    await addCarrito(conexion, data);
    res.status(202).send({ message: "Se anadio con exito" });
    conexion.end();
  } catch (err) {
    res.status(500).send({ error: "Hubo un problema", err });
  }
});

//funcional
routerFavoritos.post("/delCarrito", async (req, res) => {
  try {
    const data = req.body;
    await delCarrito(conexion, data);
    res.status(201).send({ message: "Se elimino con exito" });
  } catch (err) {
    res.status(500).send({ error: "Hubo un problema", err });
  }
});

// FUNCIONAL
// OBTIENE LOS PRODUCTOS DEL CARRITO DEL CLIENTE
routerFavoritos.get("/getCarritoCliente/:id", async (req, res) => {
  try {
    const resultado = await getCarritoCliente(conexion, {
      idCliente: req.params.id,
    });
    res.send(JSON.stringify(resultado));
  } catch (err) {
    res.status(500).send({ error: "Hubo un problema", err });
  }
});


routerFavoritos.patch("/modifyCarrito", async (req, res) => {
  try {
  await modifyCarrito(conexion, {
      idCliente: req.body.idCliente,
      idProducto:req.body.idProducto,
      Cantidad:req.body.Cantidad
    });
    res.status(202).send({message:"se actualizo correctamente"});
  } catch (err) {
    res.status(500).send({ error: "Hubo un problema", err });
  }
});

