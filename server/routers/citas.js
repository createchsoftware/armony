import express from "express";
import { conexion } from "../db/connection.js";
import {
  horasDisponibles,
  createCitas,
  duracionTotal,
  stringATiempo,
  horaFinal,
  ventaCita,
} from "../db/query/queryCitas.js";
import { searchVentaCita } from "../DB/query/queryVenta.js";

// Router
export const routerCitas = express.Router();

// Middleware
routerCitas.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

// const conexion = await enableConnect(); // Almacenamos conexion de base de datos
const messageError = "Ha ocurrido un error al procesar tu peticion: ";

// CREATE POR PROBAR
routerCitas.post("/create/:id", async (req, res) => {
  try {
    const datosCita = {
      idVenta: "",
      idCliente: req.params.id,
      idEmp: 37,
      idServ: 2,
      idPilar: 2,
      nombre: "Julian David Sandoval Godinez",
      phone: "6864503452",
      tarjeta: "5696324506590956",
      fecha: "2024-12-17",
      horaI: "14:00:00",
      horaF: "",
      descr: "Prueba de componente",
      estado: "pendiente",
      monedero: 0,
      estadoPago: "pagada",
      subTotal: 450,
      total: 670,
      impuesto: 0.08,
    }; // Campos requeridos para la cita
    var duracion = await duracionTotal(conexion, {
      idServ: datosCita.idServ,
    }); // Obtenemos el tiempo de duracion del servicio en String
    datosCita.horaF = horaFinal(datosCita.horaI, duracion[0].tiempo); // Obtenemos la hora en la que finaliza la cita y la almacenamos

    const ventaCitaOnline = await ventaCita(conexion, {
      idCliente: datosCita.idCliente,
      nombre: datosCita.nombre,
      phone: datosCita.phone,
      tarjeta: datosCita.tarjeta,
      monedero: datosCita.monedero,
      estadoPago: datosCita.estadoPago,
      subTotal: datosCita.subTotal,
      total: datosCita.total,
      impuesto: datosCita.impuesto,
    }); // Pasamos parametros necesarios para el procedimiento y ejecutmamos

    // Buscamos el id de la venta que se acaba de realizar
    const venta = await searchVentaCita(conexion, {
      idCliente: datosCita.idCliente,
      tVenta: "cita",
      phone: datosCita.phone,
    });
    console.log("Contenido de venta: ", venta);
    let resultado;
    // Verificamos que la venta se haya hecho correctamente
    if (venta[0].pkIdVenta !== 0 && venta[0].pkIdVenta !== null) {
      // Se hizo la venta correctamente
      resultado = await createCitas(conexion, {
        idVenta: venta[0].pkIdVenta,
        idEmp: datosCita.idEmp,
        idPilar: datosCita.idPilar,
        idServ: datosCita.idServ,
        fecha: datosCita.fecha,
        horaI: datosCita.horaI,
        horaF: datosCita.horaF,
        descr: datosCita.descr,
        estado: datosCita.estado,
      }); // Pasamos parametros al procedimiento y lo ejecutamos (Alta de cita)
      res
        .status(200)
        .json({ message: "Cita creada correctamente", data: resultado }); // Enviamos resultado al navegador
    } else
      [res.status(400).send("Ha ocurrido un error con el pago, " + resultado)]; // No se realizo el pago correctamente y lo enviamos al navegador
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
      nombre: req.body.nombre,
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
    res.status(200).json({
      message: "La venta de cita fue hecha con exito",
      data: resultado,
    });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

routerCitas.get("/disponibles/:idServ/:idEmp/:fecha", async (req, res) => {
  try {
    const resultado = await horasDisponibles(conexion, {
      fecha: req.params.fecha,
      idEmp: req.params.idEmp,
      idServ: req.params.idServ,
    });

    const horario = [];
    var i;
    for (i = 0; i < resultado.length; i++) {
      horario[i] = resultado[i].hora_disponible;
    }
    res.status(200).json({
      message: "Horas disponibles: ",
      data: horario,
    });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});
