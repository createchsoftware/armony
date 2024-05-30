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
  productosPromo,
  productosFaciales,
  serviciosFav,
  productosCorporales,
  productosRelacionados,
  productosDescuento,
  serviciosDescuento,
  serviciosRelacionados,
  ventaProdOnline,
  favoritosGeneral,
  processVenta,
  setFavorito,
} from "../db/query/queryProductos.js";
import { horasWithoutSeconds } from "../db/query/queryCitas.js";
import { errorUpdate } from "../auth/validaciones.js";
import { isFav } from "../db/query/queryCategoria.js";

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

routerProductos.get("/ProductsPromo", async (req, res) => {
  try {
    const resultado = await productosPromo(conexion);
    res.json(resultado);
  } catch (err) {
    console.error("Ha ocurrido un error: ", err);
    res.status(500).send("Ha ocurrido un error al procesar tu solicitud");
  }
});

// OBTIENE LOS SERVICIOS FAVORITOS DEL USUARIO
// FUNCIONAL
routerProductos.get("/serviciosFav/:id", async (req, res) => {
  try {
    const resultado = await serviciosFav(conexion, {
      idCliente: req.params.id,
    });
    const horario = [];
    let servicios = resultado;
    let i;
    for (i = 0; i < resultado.length; i++) {
      horario[i] = resultado[i].tiempo;
    }
    const horasMostrar = await horasWithoutSeconds(horario);
    for (i = 0; i < resultado.length; i++) {
      servicios[i].tiempo = horasMostrar[i];
      servicios[i].favorito = true;
    }
    res.status(202).json(servicios);
  } catch (err) {
    console.error("Ha ocurrido un error: ", err);
    res.status(500).send("Ha ocurrido un error al procesar tu solicitud");
  }
});

// OBTIENE LOS PRODUCTOS DE CATEGORIA FACIAL
// FUNCIONAL
routerProductos.get("/faciales", async (req, res) => {
  try {
    const resultado = await productosFaciales(conexion);
    res.status(200).json({ message: "Productos faciales: ", data: resultado });
  } catch (err) {
    console.error("Ha ocurrido un error: ", err);
    res.status(500).send("Ha ocurrido un error al procesar tu solicitud");
  }
});

// OBTIENE LOS PRODUCTOS DE CATEGORIA CORPORAL
// FUNCIONAL
routerProductos.get("/corporales", async (req, res) => {
  try {
    const resultado = await productosCorporales(conexion);
    res
      .status(200)
      .json({ message: "Productos corporales: ", data: resultado });
  } catch (err) {
    console.error("Ha ocurrido un error: ", err);
    res.status(500).send("Ha ocurrido un error al procesar tu solicitud");
  }
});

// OBTIENE LOS PRODUCTOS RELACIONADOS A X PRODUCTO (EN BASE A LA CATEGORIA)
// FUNCIONAL
routerProductos.get("/relacionados/:id", async (req, res) => {
  try {
    const resultado = await productosRelacionados(conexion, {
      idCliente: req.params.id,
    });
    res
      .status(200)
      .json({ message: "Productos relacionados: ", data: resultado });
  } catch (err) {
    console.error("Ha ocurrido un error: ", err);
    res.status(500).send("Ha ocurrido un error al procesar tu solicitud");
  }
});

routerProductos.get("/servicios/relacionados/:id", async (req, res) => {
  try {
    const resultado = await serviciosRelacionados(conexion, {
      idServ: req.params.id,
    });
    res.status(200).json(resultado);
  } catch (err) {
    console.error("Ha ocurrido un error: ", err);
    res.status(500).send("Ha ocurrido un error al procesar tu solicitud");
  }
});

// OBTENER LOS PRODUCTOS CON DESCUENTO
// FUNCIONAL
routerProductos.get("/descuento", async (req, res) => {
  try {
    const resultado = await productosDescuento(conexion);
    res
      .status(200)
      .json({ message: "Los productos con descuento son : ", data: resultado });
  } catch (err) {
    console.error("Ha ocurrido un error: ", err);
    res.status(500).send("Ha ocurrido un error al procesar tu solicitud");
  }
});

// OBTENER LOS SERVICIOS CON DESCUENTO
// FUNCIONAL
routerProductos.get("/servicios/descuento/:id", async (req, res) => {
  try {
    let servicios = [];
    let horario = [];
    let favo;
    let favUser;
    const resultado = await serviciosDescuento(conexion);
    for (let i = 0; i < resultado.length; i++) {
      horario[i] = resultado[i].tiempo;
    }
    const horasMostrar = await horasWithoutSeconds(horario); // Horas con formato HH:MM
    for (let i = 0; i < resultado.length; i++) {
      favo = await isFav(conexion, {
        idUser: req.params.id,
        idProdServ: resultado[0].pkIdPS,
      });
      favUser = (await (favo && favo.length > 0)) ? true : false;
      servicios[i] = {
        descripcion: resultado[i].descripcion,
        estado: resultado[i].estado,
        img: resultado[i].img,
        nombre: resultado[i].nombre,
        pkIdPS: resultado[i].pkIdPS,
        precio: resultado[i].precio,
        tiempo: horasMostrar[i],
        valoracion: resultado[i].valoracion,
        favorito: favUser,
      };
    }
    res.status(202).json(servicios);
  } catch (err) {
    console.error("Ha ocurrido un error: ", err);
    res.status(500).send("Ha ocurrido un error al procesar tu solicitud");
  }
});

routerProductos.post("/createVentaProduct", async (req, res) => {
  try {
    const resultado = await ventaProdOnline(conexion, {
      idCliente: req.body.idCliente,
      tarjeta: req.body.tarjeta,
      monedero: req.body.monedero,
      subtotal: req.body.subtotal,
      total: req.body.total,
      impuesto: req.body.impuesto,
    }); // Parametros enviados por body
    res.status(201).json({
      message: "se realizo la compra con exito",
      data: resultado,
    });
  } catch (err) {
    console.error(messageError, err);
    res.status(500).send(messageError, err);
  }
});

routerProductos.post("/detallesventa", async (req, res) => {
  // Datos de prueba de cita
  const datosCita = {
    idCliente: req.body.id,
    idProducto: req.body.idProducto,
    idPromo: req.body.idPromo,
    cantidad: req.body.cantidad,
  };
  const resultado = await processVenta(conexion, datosCita);
  resultado === true
    ? res
        .status(200)
        .json({ message: "venta creada exitosamente", data: resultado })
    : res.status(400).json({ message: "Ocurrio un error: ", resultado });
});

routerProductos.get("/favoritos", async (req, res) => {
  const resultado = await favoritosGeneral(conexion);
  res.status(202).json(resultado);
});

routerProductos.post("/setFavorito", async (req, res) => {
  const data = {
    idCliente: req.body.id,
    idPS: req.body.idPS,
    estado: req.body.estado,
  };
  const resultado = await setFavorito(conexion, data);
  res.status(202).json(resultado);
});
