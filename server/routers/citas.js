import express from "express";
import { conexion } from "../db/connection.js";
import {
  horasDisponibles,
  updateCita,
  updateCitaStatus,
  ventaCita,
  getCitasByEstado,
  horasWithoutSeconds,
  citaOnline,
} from "../db/query/queryCitas.js";
import { searchVentaCita } from "../db/query/queryVenta.js";

// Router
export const routerCitas = express.Router();

// Middleware
routerCitas.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

// const conexion = await enableConnect(); // Almacenamos conexion de base de datos
const messageError = "Ha ocurrido un error al procesar tu peticion: ";

// CREATE POR PROBAR
// routerCitas.post("/create/:id", async (req, res) => {
//   try {
//     const datosCita = {
//       idVenta: "",
//       idCliente: req.params.id,
//       idEmp: 37,
//       idServ: 2,
//       idPilar: 2,
//       nombre: "Julian David Sandoval Godinez",
//       phone: "6864503452",
//       tarjeta: "5696324506590956",
//       fecha: "2024-12-17",
//       horaI: "14:00:00",
//       horaF: "",
//       descr: "Prueba de componente",
//       estado: "pendiente",
//       monedero: 0,
//       estadoPago: "pagada",
//       subTotal: 450,
//       total: 670,
//       impuesto: 0.08,
//     }; // Campos requeridos para la cita
//     let duracion = await duracionTotal(conexion, {
//       idServ: datosCita.idServ,
//     }); // Obtenemos el tiempo de duracion del servicio en String
//     datosCita.horaF = horaFinal(datosCita.horaI, duracion[0].tiempo); // Obtenemos la hora en la que finaliza la cita y la almacenamos

//     const ventaCitaOnline = await ventaCita(conexion, {
//       idCliente: datosCita.idCliente,
//       nombre: datosCita.nombre,
//       phone: datosCita.phone,
//       tarjeta: datosCita.tarjeta,
//       monedero: datosCita.monedero,
//       estadoPago: datosCita.estadoPago,
//       subTotal: datosCita.subTotal,
//       total: datosCita.total,
//       impuesto: datosCita.impuesto,
//     }); // Pasamos parametros necesarios para el procedimiento y ejecutmamos

//     // Buscamos el id de la venta que se acaba de realizar
//     const venta = await searchVentaCita(conexion, {
//       idCliente: datosCita.idCliente,
//       tVenta: "cita",
//       phone: datosCita.phone,
//     });
//     let resultado;
//     // Verificamos que la venta se haya hecho correctamente
//     if (venta[0].pkIdVenta !== 0 && venta[0].pkIdVenta !== null) {
//       // Se hizo la venta correctamente
//       resultado = await createCitas(conexion, {
//         idVenta: venta[0].pkIdVenta,
//         idEmp: datosCita.idEmp,
//         idPilar: datosCita.idPilar,
//         idServ: datosCita.idServ,
//         fecha: datosCita.fecha,
//         horaI: datosCita.horaI,
//         horaF: datosCita.horaF,
//         descr: datosCita.descr,
//         estado: datosCita.estado,
//       }); // Pasamos parametros al procedimiento y lo ejecutamos (Alta de cita)
//       res
//         .status(200)
//         .json({ message: "Cita creada correctamente", data: resultado }); // Enviamos resultado al navegador
//     } else
//       [res.status(400).send("Ha ocurrido un error con el pago, " + resultado)]; // No se realizo el pago correctamente y lo enviamos al navegador
//   } catch (err) {
//     // Capturamos errores
//     console.error(messageError, err); // Mostramos errores por consola
//     res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
//   }
// });

// CITA ONLINE (PENDIENTE A PROBRAR)
routerCitas.post("/Online/:id", async (req, res) => {
  // Datos de prueba de cita
  const datosCita = {
    idVenta: "", //
    idCliente: req.params.id,
    idEmp: req.body.idEmp,
    idServ: req.body.idServ,
    idPilar: req.body.idPilar,
    nombre: req.body.nombre,
    phone: req.body.phone,
    tarjeta: req.body.tarjeta,
    fecha: req.body.fecha,
    horaI: req.body.horaI,
    horaF: "", //
    descr: req.body.descr,
    estado: req.body.estado,
    monedero: req.body.monedero,
    estadoPago: req.body.estadoPago,
    subTotal: req.body.subTotal,
    total: req.body.total,
    impuesto: req.body.impuesto,
    promo: req.body.promo,
  };
  const resultado = await citaOnline(conexion, datosCita);
  resultado === true
    ? res
        .status(200)
        .json({ message: "Cita creada correctamente", data: resultado })
    : res.status(400).json({ message: "Ocurrio un error: ", resultado });
});

routerCitas.post("/venta", async (req, res) => {
  try {
    const resultado = await ventaCita(conexion, {
      idCliente: req.body.idCliente,
      nombre: req.body.nombre,
      phone: req.body.phone,
      tarjeta: req.body.tarjeta,
      monedero: req.body.monedero,
      estadoPago: req.body.estadoPago,
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
    let i;
    for (i = 0; i < resultado.length; i++) {
      horario[i] = resultado[i].hora_disponible;
    }
    const horasMostrar = await horasWithoutSeconds(horario); // Horas con formato HH:MM
    res.status(200).json(horasMostrar);
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// Modificacion de las citas
routerCitas.patch("/modify", async (req, res) => {
  try {
    const newDatosCita = {
      idCita: 20,
      idEmp: 34,
      nuevaFecha: "2024-12-30",
      horaIn: "14:45:00",
      descr: "Prueba de update de cita",
    };
    const resultado = await updateCita(conexion, {
      idCita: newDatosCita.idCita,
      idEmp: newDatosCita.idEmp,
      nuevaFecha: newDatosCita.nuevaFecha,
      horaI: newDatosCita.horaIn,
      descr: newDatosCita.descr,
    });
    if (resultado.affectedRows === 1)
      res
        .status(200)
        .json({ message: "Cita actualizada correctamente", resultado });
    else
      res
        .status(400)
        .json({ message: "Ocurrio un error al actualizar la cita" });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

//Cancelacion de citas
routerCitas.patch("/status/:idCita", async (req, res) => {
  try {
    const statusCita = {
      idCita: req.params.idCita,
      status: req.body.estado,
    };
    const resultado = await updateCitaStatus(conexion, {
      idCita: statusCita.idCita,
      status: statusCita.status,
    });
    if (resultado.affectedRows === 1)
      res
        .status(200)
        .json({ message: "Cita actualizada correctamente", resultado });
    else
      res
        .status(400)
        .json({ message: "Ocurrio un error al actualizar la cita" });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

routerCitas.get("/citasPendientes/:idCliente/:Estado", async (req, res) => {
  try {
    const citas = await getCitasByEstado(conexion, {
      id: req.params.idCliente,
      estado: req.params.Estado,
    });
    res.status(200).json(citas);
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError);
  }
});
