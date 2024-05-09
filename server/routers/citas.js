import express from "express";
import { conexion } from "../DB/connection.js";
import {
  horasDisponibles,
  horasDipoArray,
  createCitas,
  ventaCita,
} from "../DB/query/queryCitas.js";

// Router
export const routerCitas = express.Router();

// Middleware
routerCitas.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

// const conexion = await enableConnect(); // Almacenamos conexion de base de datos
const messageError = "Ha ocurrido un error al procesar tu peticion: ";

// CREATE FUNCIONAL
routerCitas.post("/create", async (req, res) => {
  try {
    const resultado = await createCitas(conexion, {
      idVenta: req.body.idVenta,
      idEmp: req.body.idEmp,
      idPilar: req.body.idPilar,
      idServ: req.body.idServ,
      fecha: req.body.fecha,
      horaI: req.body.horaI,
      horaF: req.body.horaF,
      descr: req.body.descr,
      estado: req.body.estado,
    });
    res
      .status(200)
      .json({ message: "Cita creada correctamente", data: resultado });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

routerCitas.post("/venta", async (req, res) => {
  try {
    const resultado = await ventaCita(conexion, {
      pilar: req.body.pilar,
      idCliente: req.body.idCliente,
      name: req.body.name,
      phone: req.body.phone,
      tarjeta: req.body.tarjeta,
      monedero: req.body.monedero,
      estadoPago: req.body.estadoPago,
      servicio: req.body.servicio,
      idEmp: req.body.idEmp,
      fechaPago: req.body.fechaPago,
      horaPago: req.body.horaPago,
      descr: req.body.descr,
      subTotal: req.body.subTotal,
      total: req.body.total,
      impuesto: req.body.impuesto,
    });
    res
      .status(200)
      .json({
        message: "La venta de cita fue hecha con exito",
        data: resultado,
      });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

routerCitas.get("/disponibles", async (req, res) => {
  try {
    const resultado = await horasDisponibles(conexion, {
      idServ: req.body.idServ,
      idEmp: req.body.idEmp,
      fechaCita: req.body.fecha,
    });
    const horas = await horasDipoArray(resultado);
    console.table(horas);
    res.status(200).json({ message: "Horas disponibles: ", data: horas });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});
