import express from "express";
import { conexion } from "../db/connection.js";
import {
  createEmpleado,
  readEmpleadoById,
  readEmpleadoByNombre,
  readEmpAct,
  updateEmpleado,
  deleteEmpleadoById,
  getEmpServicio,
  getEmpFav,
} from "../db/query/queryEmpleado.js";

// Router
export const routerEmpleado = express.Router();

// Middleware
routerEmpleado.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

// const conexion = await enableConnect(); // Almacenamos conexion de base de datos
const messageError = "Ha ocurrido un error al procesar tu peticion: ";

// CREATE FUNCIONAL
routerEmpleado.post("/create", async (req, res) => {
  try {
    const resultado = await createEmpleado(conexion, {
      name: req.body.name,
      ap: req.body.ap,
      am: req.body.am,
      email: req.body.email,
      phone: req.body.phone,
      pass: req.body.pass,
      tipo: req.body.tipo,
      img: req.body.img,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      calle: req.body.calle,
      colonia: req.body.colonia,
      numero: req.body.numero,
      cp: req.body.cp,
    }); // Parametros obtenidos por body
    res
      .status(201) // Status created
      .json({ message: "Empleada creada exitosamente", data: resultado }); // Enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// FUNCIONAL
// READ BY ID FUNCIONAL
routerEmpleado.get("/read", async (req, res) => {
  try {
    const resultado = await readEmpleadoById(conexion, {
      idEmp: req.body.idEmp,
    }); // Parametros enviados por body
    res
      .status(302) // Status found
      .json({
        message: "Empleada encontrada con exito",
        data: resultado,
      }); // Enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// FUNCIONAL
// READ BY NAME FUNCIONAL
routerEmpleado.get("/read/name", async (req, res) => {
  try {
    const resultado = await readEmpleadoByNombre(conexion, {
      name: req.body.name,
      ap: req.body.ap,
      am: req.body.am,
    }); // Parametros y ejecutamos la peticion
    res
      .status(302) // Status found
      .json({ message: "Se encontro el usuario", data: resultado }); // Enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// FUNCIONAL
// READ EMPLEADOS ACTIVOS/NO-ACTIVOS
routerEmpleado.get("/activo/:act", async (req, res) => {
  try {
    const resultado = await readEmpAct(conexion, {
      activo: req.params.act,
    });
    req.params.act === 1
      ? res.status(200).json({
          message: "Se encontraron los siguientes empleados activos: ",
          data: resultado,
        })
      : res.status(200).json({
          message: "Se encontraron los siguiente empleados inactivos: ",
          data: resultado,
        });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// UPDATE FUNCIONAL
routerEmpleado.patch("/update", async (req, res) => {
  try {
    const resultado = await updateEmpleado(conexion, {
      idEmp: req.body.idEmp,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      act: req.body.act,
      calle: req.body.calle,
      colonia: req.body.colonia,
      numero: req.body.numero,
    }); // Parametros por body
    res.status(202).json({ message: "Empleada actualizado", data: resultado }); // Status Accepted, enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// DELETE FUNCIONAL
routerEmpleado.delete("/delete", async (req, res) => {
  try {
    const resultado = await deleteEmpleadoById(conexion, {
      idEmp: req.body.idEmp,
    }); // Parametro por body
    res
      .status(204) // Status NO-CONTENT
      .json({ message: "Empleada eliminada correctamente", data: resultado }); // Enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

routerEmpleado.get("/getEmpServicio/:idEmp", async (req, res) => {
  try {
    const resultado = await getEmpServicio(conexion, {
      idEmp: req.params.idEmp,
    }); // Parametro por body
    const emps = [];
    var i;
    for (i = 0; i < resultado.length; i++) {
      emps[i] = resultado[i];
    }
    res.json(emps); // Enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// Obtiene los empleados favoritos del cliente
// FUNCIONAL
routerEmpleado.get("/favoritos/:id", async (req, res) => {
  try {
    const resultado = await getEmpFav(conexion, {
      idCliente: req.params.id,
    });
    res.status(200).json({ message: "Empleados favoritos: ", data: resultado });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});
