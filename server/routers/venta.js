import { conexion } from "../db/connection.js";
import express from "express";
import { createVenta, searchVentaCita } from "../db/query/queryVenta.js";
import {
  createCitas,
  duracionTotal,
  stringATiempo
} from "../db/query/queryCitas.js";

import {createVentaSus} from "../db/query/queryVenta.js";



// Router
export const routerVenta = express.Router();

// Middleware
routerVenta.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

// const conexion = await enableConnect(); // Almacenamos la conexion con la base de datos
const messageError = "Ha ocurrido un error al procesar tu peticion: ";

// CREATE FUNCIONAL
routerVenta.post("/create", async (req, res) => {
  try {
    const resultado = await createVenta(conexion, {
      idCliente: req.body.idCliente,
      tipoVenta: req.body.tipoVenta,
      nombre: req.body.nombre,
      phone: req.body.phone,
      tipoPago: req.body.tipoPago,
      total: req.body.total,
      impuesto: req.body.impuesto,
      estado: req.body.estado,
      fechaEntregado: req.body.fechaEntregado,
    }); // Parametros para el procedimiento
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

routerVenta.post("/cita", async (req, res) => {
  try {
    let fechaCita;
    let horaFin;
    const datosCita = {
      idVenta: "",
      idCliente: 30,
      idEmp: 31,
      idServ: 17,
      idPilar: 2,
      nombre: "Hector",
      phone: "6867433967",
      tarjeta: "875609894583",
      fecha: "2024-05-07",
      horaI: "19:00:00",
      horaF: "",
      descr: "Prueba de componente",
      estado: "pendiente",
      monedero: 0.0,
      estadoPago: "pagada",
      subTotal: 450,
      total: 670,
      impuesto: 0.08,
    };

    // Alta de venta
    const resultado = await createVentaCita(conexion, {
      idCliente: datosCita.idCliente,
      nombre: datosCita.nombre,
      phone: datosCita.phone,
      tarjeta: datosCita.tarjeta,
      monedero: datosCita.monedero,
      estadoPago: datosCita.estadoPago,
      subTotal: datosCita.subTotal,
      total: datosCita.total,
      impuesto: datosCita.impuesto,
    });
    // const minutos = stringATiempo(duracion[0].tiempo); // Convertimos los minutos a enteros

    res
      .status(200)
      .json({ message: "Venta creada con exito.", data: resultado });
    // if (resultado.length !== 0) {
    //   const cita = await createCitas(conexion, {
    //     idVenta: folioVenta[0].pkIdVenta,
    //     idEmp: req.body.idEmp,
    //     pilar: req.body.pilar,
    //     servicio: req.body.servicio,
    //     fechaCita: req.body.fechaCita,
    //     horaI: req.body.horaI,
    //     horaF: horaFin,
    //     descr: req.body.descr,
    //     estado: req.body.estado,
    //   });

    // }
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// READ FUNCIONAL OBTIENE LA ULTIMA VENTA
routerVenta.get("/read", async (req, res) => {
  try {
    const resultado = await searchVentaCita(conexion, {
      idCliente: req.body.idCliente,
      tVenta: req.body.tVenta,
      phone: req.body.phone,
    }); // Parametros para el procedimiento

    res
      .status(200)
      .json({ message: "Venta encontrada", data: resultado[0].pkIdVenta });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

routerVenta.get("/pruebas/:idServ", async (req, res) => {
  try {
    const resultado = await duracionTotal(conexion, {
      idServ: req.params.idServ,
    });
    res
      .status(200)
      .json({ message: "La duracion total es: ", data: resultado });
    console.log(typeof resultado);
    console.log(resultado[0].tiempo);
    const minutos = stringATiempo("13:45:00"); // Convertimos los minutos a enteros
    console.log(minutos);
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// UPDATE PENDIENTE
routerVenta.patch("", async (req, res) => {
  try {
    const resultado = await {}; // Parametros para el procedimiento
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// CANCEL PENDIENTE
routerVenta.patch("", async (req, res) => {
  try {
    const resultado = await {}; // Parametros para el procedimiento
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});


routerVenta.post("/createVentaSus", async (req, res) => {
  try {
    const resultado = await createVentaSus(conexion, {
      idCliente: req.body.idCliente,
      tarjeta: req.body.tarjeta,
      monedero: req.body.monedero
    });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
})
