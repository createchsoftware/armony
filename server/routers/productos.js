import express from "express";
import { conexion } from "../db/connection.js";
import {
  createProducto,
  readProdServById,
  readProdServPrecio,
  readProdServAZ,
  updateProdServ,
  deleteProdServ,
  getProducts,
} from "../db/query/queryProductos.js";
import { errorUpdate } from "../auth/validaciones.js";

// Router
export const routerProductos = express.Router();

// Middleware
routerProductos.use(express.json()); //  Analiza las request entrantes con carga JSON basado en body-parse

const messageError = "Ha ocurrido un error al procesar tu peticion: ";
// const connection = await enableConnect(); // Almacenamos la conexion con la base de datos

// CREATE
routerProductos.post("/create", async (req, res) => {
  try {
    const resultado = await createProducto(conexion, {
      name: req.body.name,
      precioVenta: req.body.precioVenta,
      descr: req.body.descr,
      pilar: req.body.pilar,
      suc: req.body.suc,
      stockIni: req.body.stockIni,
      proveedor: req.body.proveedor,
      precioCompra: req.body.precioCompra,
      tipo: req.body.tipo,
      img: req.body.img,
    }); // Parametros enviados por body
    res.status(201).json({
      message: "El producto se creo correctamente",
      data: resultado,
    }); // Status Created, mandamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// READ BY ID FUNCIONAL
routerProductos.get("/read/id", async (req, res) => {
  try {
    const resultado = await readProdServById(conexion, {
      idProdServ: req.body.idProdServ,
    }); // Parametros enviados por body
    res.status(302).json({
      message: "Se encontro el producto.",
      data: resultado,
    }); // Status found, mandamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// READ BY CAT
// PENDIENTE, FALTA CRUD DE CATEGORIA
// routerProductos.get("/read/name", async (req, res) => {
//   try {
//     const resultado = await readProdServByCategoria(conexion, {
//       categoria: req.body.categoria,
//     }); // Parametros enviados por body
//     const row = resultado[0];
//   } catch (err) {
//     // Capturamos errores
//     console.error(messageError, err); // Mostramos errores por consola
//     res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
//   }
// });

// READ BY PRECIO MAX FUNCIONAL
routerProductos.get("/read/precio", async (req, res) => {
  try {
    const resultado = await readProdServPrecio(conexion, {
      pilar: req.body.pilar,
      precio: req.body.precio,
    });
    res.status(200).json({
      message: "Se encontraron los siguientes productos.",
      data: resultado,
    });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(304).send(messageError, err); // Status No-Found enviamos el error al servidor y el error al navegador
  }
});

// READ BY A-Z OR Z-A
routerProductos.get("/read/az", async (req, res) => {
  try {
    const resultado = await readProdServAZ({
      orden: req.body.orden,
    });
    res.status(200).json({ message: "Productos: ", data: resultado });
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(304).send(messageError, err); // Status No-Found enviamos el error al servidor y el error al navegador
  }
});

// UPDATE FUNCIONAL
routerProductos.patch("/update", async (req, res) => {
  try {
    const resultado = await updateProdServ(conexion, {
      idProdServ: req.body.idProdServ,
      name: req.body.name,
      price: req.body.price,
      descr: req.body.descr,
      status: req.body.status,
      time: req.body.time,
      img: req.body.img,
    }); // Parametros enviados por body
    if (errorUpdate(resultado))
      res
        .status(404)
        .send(
          `No se pudo actualizar el producto/servicio con id ${req.body.idProdServ}`
        );
    res.status(202).json({
      message: "Se actualizo exitosamente el producto",
      data: resultado,
    }); // Status Accepted, mandamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

// DELETE FUNCIONAL
routerProductos.delete("/delete", async (req, res) => {
  try {
    const resultado = await deleteProdServ(conexion, {
      idProdServ: req.body.idProdServ,
    }); // Parametros enviados por body
    res.status(204).json({
      // Status NO-CONTENT
      message: "Se elimino correctamente el producto",
      data: resultado,
    }); // Enviamos informacion en formato JSON
  } catch (err) {
    // Capturamos errores
    console.error(messageError, err); // Mostramos errores por consola
    res.status(500).send(messageError, err); // Enviamos un error INTERNAL SERVER ERROR y el error al navegador
  }
});

routerProductos.get("/getProducts", async (req, res) => {
  try {
    const resultado = await getProducts(conexion);
    res.json(resultado);
  } catch (err) {
    console.error("Ha ocurrido un error: ", err);
    res.status(500).send("Ha ocurrido un error al procesar tu solicitud");
  }
});
