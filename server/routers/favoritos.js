import express from "express";
export const routerFavoritos = express.Router();
import { horasWithoutSeconds } from "../db/query/queryCitas.js";
import {
  addfavorito,
  delFavorito,
  ProductFavoritosbyId,
  ServiceFavoritosbyId,
  ServiceFavoritosEstetica,
  ServiceFavoritosSpa,
  FavoritosbyId,
  invertirFav,
  invertirFavEmp,
  getFavEmp
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

// FUNCIONAL
// OBTIENE LOS SERVICIOS FAVORITOS DEL CLIENTE
routerFavoritos.get("/ServiceFavoritosSpa/:id", async (req, res) => {
  try {
    const resultado = await ServiceFavoritosSpa(conexion, {
      id: req.params.id,
    });
    const horario = [];
    let servicios = [];
    for (let i = 0; i < resultado.length; i++) {
      horario[i] = resultado[i].tiempo;
    }
    const horasMostrar = await horasWithoutSeconds(horario); // Horas con formato HH:MM
    for (let i = 0; i < resultado.length; i++) {
      servicios[i] = {
        descripcion: resultado[i].descripcion,
        estado: resultado[i].estado,
        img: resultado[i].img,
        nombre: resultado[i].nombre,
        pkIdPS: resultado[i].pkIdPS,
        precio: resultado[i].precio,
        tiempo: horasMostrar[i],
        valoracion: resultado[i].valoracion,
        favorito: resultado[i].favorito,
      };
    }
    res.status(202).json(servicios);
  } catch (err) {
    res.status(500).send({ error: "Hubo un problema", err });
  }
});

// FUNCIONAL
// OBTIENE LOS SERVICIOS FAVORITOS DEL CLIENTE
routerFavoritos.get("/ServiceFavoritosEstetica/:id", async (req, res) => {
  try {
    const resultado = await ServiceFavoritosEstetica(conexion, {
      id: req.params.id,
    });
    const horario = [];
    let servicios = [];
    for (let i = 0; i < resultado.length; i++) {
      horario[i] = resultado[i].tiempo;
    }
    const horasMostrar = await horasWithoutSeconds(horario); // Horas con formato HH:MM
    for (let i = 0; i < resultado.length; i++) {
      servicios[i] = {
        descripcion: resultado[i].descripcion,
        estado: resultado[i].estado,
        img: resultado[i].img,
        nombre: resultado[i].nombre,
        pkIdPS: resultado[i].pkIdPS,
        precio: resultado[i].precio,
        tiempo: horasMostrar[i],
        valoracion: resultado[i].valoracion,
        favorito: resultado[i].favorito,
      };
    }
    res.status(202).json(servicios);
  } catch (err) {
    res.status(500).send({ error: "Hubo un problema", err });
  }
});

routerFavoritos.get("/FavoritosbyId/:id", async (req, res) => {
  try {
    const resultado = await FavoritosbyId(conexion, {
      idCliente: req.params.id,
    });
    res.send(JSON.stringify(resultado));
  } catch (err) {
    res.status(500).send({ error: "Hubo un problema", err });
  }
});

routerFavoritos.post("/invertirFav", async (req, res) => {
  try {
    const data = req.body;
    await invertirFav(conexion, data);
    res.status(201).send({ message: "Se elimino con exito" });
  } catch (err) {
    res.status(500).send({ error: "Hubo un problema", err });
  }
});

routerFavoritos.post("/invertirFavEmp", async (req, res) => {
  try {
    const data = req.body;
    await invertirFavEmp(conexion, data);
    res.status(201).send({ message: "Se elimino con exito" });
  } catch (err) {
    res.status(500).send({ error: "Hubo un problema", err });
  }
});

routerFavoritos.get("/EmpFavoritosbyId/:id", async (req, res) => {
  try {
    const resultado = await getFavEmp(conexion, {
      idCliente: req.params.id,
    });
    res.send(JSON.stringify(resultado));
  } catch (err) {
    res.status(500).send({ error: "Hubo un problema", err });
  }
});