import { endConnection } from "../connection.js";
import * as mysql from "mysql2";
import { searchVentaProducto } from "./queryVenta.js";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

// CREATE SERVICIOS FUNCIONAL
export async function createServicios(connection, data) {
  try {
    let insertServQuery = "CALL addServicio(?, ?, ?, ?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(insertServQuery, [
      data.name,
      data.price,
      data.descr,
      data.time,
      data.pilar,
    ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecucion de query y almacenamos resultados
    endConnection(); // Cierre de conexion
    return rows; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// CREATE PRODUCTOS FUNCIONAL
/* NOTA: DEBE EXISTIR LA SUCURSAL PARA PODER HACER LA ALTA */
export async function createProducto(connection, data) {
  try {
    let insertProductoQuery = "CALL addProducto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(insertProductoQuery, [
      data.name,
      data.precioVenta,
      data.descr,
      data.pilar,
      data.suc,
      data.stockIni,
      data.proveedor,
      data.precioCompra,
      data.tipo,
      data.img,
    ]); // Parametros para el procedimiento
    const rows = await connection.query(query); // Ejecutamos query y guardamos resultado
    endConnection(); // Cerramos conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// READ BY ID FUNCIONAL
export async function readProdServById(connection, data) {
  try {
    let searchProductoId = "CALL searchProdServById(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(searchProductoId, [data.idProdServ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos resultados
    endConnection(); // Cerramos conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// READ BY CATEGORIA
export async function readProdServByCategoria(connection, data) {
  try {
    let searchProductoCategoria = "CALL searchProdServByCategoria(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(searchProductoCategoria, [data.categoria]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos los valores
    endConnection(); // Cerramos conexion
    return rows; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// READ BY PRECIO MAX PENDIENTE
export async function readProdServPrecio(connection, data) {
  try {
    let getProdServPrecio = "CALL getProductosRangoPrecio(?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(getProdServPrecio, [data.pilar, data.precio]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos los valores
    endConnection(); // Cerramos conexion
    return rows; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// READ BY A-Z OR Z-A
export async function readProdServAZ(connection, data) {
  try {
    let getProdServAZ = "CALL getProductosOrdenAlfabetico(?)";
    let query = mysql.format(getProdServAZ, [data.orden]);
    const [rows, fields] = await connection.query(query);
    endConnection();
    return rows;
  } catch (error) {}
}

// UPDATE FUNCIONAL
export async function updateProdServ(connection, data) {
  try {
    let updateProdQuery = "CALL updProdServ(?, ?, ?, ?, ?, ?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(updateProdQuery, [
      data.idProdServ,
      data.name,
      data.price,
      data.descr,
      data.status,
      data.time,
      data.img,
    ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos valores
    endConnection(); // Cierre de conexion
    return rows;
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// DELETE FUNCIONAL
export async function deleteProdServ(connection, data) {
  try {
    let deleteProdQuery = "CALL delProdServ(?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(deleteProdQuery, [data.idProdServ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y guardamos valores
    endConnection(); // Cierre de conexion
    return rows[0]; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

// DELETE PRODUCTO DE CATEGORIA (PENDIENTE)
export async function deleteProdCat(connection, data) {
  try {
    let deleteProdCatQuery = "CALL delPSCategoria(?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(deleteProdCatQuery, [data.idProdServ, data.idCat]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos los valores
    endConnection(); // Cierre de conexion
    return rows; // retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

export async function ventaProducto(connection, data) {
  try {
    let ventaOnlineProducto = "CALL addVentaProdOnline(?, ?, ?, ?, ?, ?, ? ,?)"; // Procedimiento de la base de datos
    let query = mysql.format(ventaOnlineProducto, [
      data.idCliente,
      data.nombreCompleto,
      data.phone,
      data.tarjeta,
      data.monedero,
      data.subtotal,
      data.total,
      data.impuesto,
    ]); // Parametros necesarios para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos los valores retornados
    endConnection(); // Cerramos la conexion con la base de datos
    return rows[0]; // Retornamos los valores (Se retorna un objeto)
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos los errores por consola
  }
}

export async function getProducts(pool, data) {
  try {
    // const pages=data.pages||1;/*por defecto sera pagina 1 */
    // const limit =data.limit||5;/*capacidad por defecto de 5, esto cambiara dependiendo el front */
    // const offset=(pages-1)*limit;
    const prod = `CALL getProductos(?,?)`;
    let query = mysql.format(prod, [2, data.id]);
    const [rows, fields] = await pool.query(query);
    endConnection();
    return rows[0];
  } catch (err) {
    console.log("Ha ocurrido un error al ejecutar el query: ", err);
    throw err;
  }
}

export async function getProductsAll(pool, data) {
  try {
    // const pages=data.pages||1;/*por defecto sera pagina 1 */
    // const limit =data.limit||5;/*capacidad por defecto de 5, esto cambiara dependiendo el front */
    // const offset=(pages-1)*limit;
    const prod = `CALL getProductosAll(?)`;
    let query = mysql.format(prod, [2]);
    const [rows, fields] = await pool.query(query);
    endConnection();
    return rows[0];
  } catch (err) {
    console.log("Ha ocurrido un error al ejecutar el query: ", err);
    throw err;
  }
}

export async function ventaProdOnline(connection, data) {
  let ventaOnlineProd = "CALL addVentaProdOnline(?, ?, ?, ?, ?, ?)"; // Procedimiento almacenado de la base de datos
  let query = mysql.format(ventaOnlineProd, [
    data.idCliente,
    data.tarjeta,
    data.monedero,
    data.subtotal,
    data.total,
    data.impuesto,
  ]); // Parametros requeridos para el procedimiento almacenado
  const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos los datos
  endConnection(); // Cerramos la conexion con la base de datos
  return rows; // Retornamos los valores
}

export async function productosPromo(pool, data, res) {
  try {
    const query = `SELECT *FROM  mostrarPromos`;
    const [rows, fields] = await pool.query(query);
    endConnection();
    return rows;
  } catch (err) {
    console.log("Ha ocurrido un error al ejecutar el query: ", err);
    throw err;
  }
}

// FUNCIONAL
// OBTENER LOS SERVICIOS FAVORITOS DEL CLIENTE
export async function serviciosFav(connection, data) {
  try {
    let servFav = "CALL getServiciosFav(?)"; // Procedimiento almacenado de la base de datos
    let query = mysql.format(servFav, [data.idCliente]); // Parametros para el procedimiento almacenado
    const [rows, fileds] = await connection.query(query); // Ejecutamos el query y almacenamos los valores retornados
    endConnection(); // Cerramos la conexion con la base de datos
    return rows[0]; // Retornamos los valores obtenidos
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// OBTENER PRODUCTOS FACIALES
// FUNCIONAL
export async function productosFaciales(connection) {
  try {
    let query = "CALL getProductosFaciales()"; // Query de procedimiento almacenado
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos los valores
    endConnection(); // Cerramos la conexion
    return rows[0]; // Retornamos los valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// OBTENER PRODUCTOS CORPORALES
// FUNCIONAL
export async function productosCorporales(connection) {
  try {
    let query = "CALL getProductosCorporales()"; // Query de procedimiento almacenado
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos los valores obtenidos
    endConnection(); // Cerramos la conexion
    return rows[0]; // Retornamos los valores obtenidos
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// OBTENER PRODUCTOS RELACIONADOS (FUNCIONAL)
// Productos relacionados en base a la categoria del producto
export async function productosRelacionados(connection, data) {
  try {
    let prodRela = "CALL getProdRelacionados(?)"; // Query de procedimiento almacenado de la base de datos
    let query = mysql.format(prodRela, [data.idCliente]); // Parametros para el procedimiento almacenado
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos los valores obtenidos
    endConnection(); // Cerramos la conexion con la base de datos
    return rows[0]; // Retornamos los valores obtenidos
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

export async function serviciosRelacionados(connection, data) {
  try {
    let servRelaci = "CALL getServRelacionados(?)"; // Query de procedimiento almacenado
    let query = mysql.format(servRelaci, [data.idServ]); // Pasamos lo parametros necesarios para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos los datos obtenidos
    endConnection(); // Cerramos la conexion con la base de datos
    return rows[0]; // Retornamos los servicios obtenidos
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// OBTENER PRODUCTOS CON DESCUENTO
// FUNCIONAL
export async function productosDescuento(connection, data) {
  try {
    let desc = "CALL getProductosDesc(?)"; // Query del procedimiento almacenado
    let query = mysql.format(desc, [data.id]);
    const [rows, fields] = await connection.query(query); // Ejecutamos le query y almacenamos los valores
    endConnection(); // Cerramos la conexion
    return rows[0]; // Retornamos los valores obtenidos
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}
// OBTENER PRODUCTOS CON DESCUENTO
// FUNCIONAL
export async function productosDescuentoAll(connection, data) {
  try {
    let desc = "CALL getProductosDescAll()"; // Query del procedimiento almacenado
    let query = mysql.format(desc);
    const [rows, fields] = await connection.query(query); // Ejecutamos le query y almacenamos los valores
    endConnection(); // Cerramos la conexion
    return rows[0]; // Retornamos los valores obtenidos
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// OBTENER SERVICIOS CON DESCUENTO
// FUNCIONAL
export async function serviciosDescuento(connection, data) {
  try {
    let desc = "CALL getServiciosDesc(?)"; // Query de procedimiento almacenado de la base de datos
    let query = mysql.format(desc, [data.id]); // Pasamos lo parametros necesarios para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos los resultados
    endConnection(); // Cerramos la conexion con la base de datos
    return rows[0]; // Retornamos los valores obtenidos
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

export async function favoritosGeneral(connection) {
  try {
    let query = "CALL getFavoritos()"; // Query de procedimiento almacenado
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos los valores obtenidos
    endConnection(); // Cerramos la conexion con la base de datos
    return rows[0]; // Retornamos el arreglo con los valores obtenidos
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

export async function setFavorito(connection, data) {
  try {
    let query = "CALL setProdServFav(?, ?, ?)"; // Query de procedimiento almacenado
    const [rows, fields] = await connection.query(query, [
      data.idCliente,
      data.idPS,
      data.estado,
    ]); // Ejecutamos el query y almacenamos los valores obtenidos
    endConnection(); // Cerramos la conexion con la base de datos
    return rows[0]; // Retornamos el arreglo con los valores obtenidos
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

export async function detalleVenta(connection, data) {
  try {
    const call = "CALL addDetalleVenta( ?, ?, ?, ?)";
    const [rows, fields] = await connection.query(call, [
      data.idProducto,
      data.idVenta,
      data.idPromo,
      data.cantidad,
    ]);
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

export async function processVenta(connection, data) {
  try {
    const getVenta = await searchVentaProducto(connection, {
      idCliente: data.idCliente,
    }); // Buscamos el id de la venta recien hecha y lo almacenamos
    console.log(`Se encontro la venta con id: ${getVenta[0].pkIdVenta}`);
    // Verificamos que si encontrara la venta
    if (getVenta[0].pkIdVenta !== 0 && getVenta[0].pkIdVenta !== null) {
      const resultado = await detalleVenta(connection, {
        idProducto: data.idProducto,
        idVenta: getVenta[0].pkIdVenta,
        idPromo: data.idPromo,
        cantidad: data.cantidad,
      }); // Ejecutamos el alta de la cita
      console.log("detallesVenta creada correctamente");
      return true; // Retornamos true como referencia que si se realizo la cita
    }
    return false; // Retornamos false como referencia que no se realizo la cita
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}
