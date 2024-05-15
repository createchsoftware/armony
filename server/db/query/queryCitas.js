import { endConnection } from "../connection.js";
import mysql from "mysql2";
import { readEmpleadoById } from "./queryEmpleado.js";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

// CREATE
export async function createCitas(connection, data) {
  try {
    let insertCita = "CALL addCita(?, ?, ?, ?, ?, ?, ?, ?, ?)";
    let query = mysql.format(insertCita, [
      data.idVenta,
      data.idEmp,
      data.idPilar,
      data.idServ,
      data.fecha,
      data.horaI,
      data.horaF,
      data.descr,
      data.estado,
    ]);
    const [rows, fields] = await connection.query(query);
    endConnection();
    return rows;
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// VENTA CITAS
export async function ventaCita(connection, data) {
  try {
    let insertVentaCita = "CALL addVentaCitaOnline(?, ?, ?, ?, ?, ?, ?, ?, ?)";
    let query = mysql.format(insertVentaCita, [
      data.idCliente,
      data.nombre,
      data.phone,
      data.tarjeta,
      data.monedero,
      data.estadoPago,
      data.subTotal,
      data.total,
      data.impuesto,
    ]);
    const [rows, fields] = await connection.query(query);
    endConnection();
    return rows;
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// READ BY ID
export async function readCitasById(connection, data) {
  try {
    let readCitaIdQuery = "CALL searchCitaById(?)"; // Procedimiento almacenado de la base de datos
    let query = mysql.format(readCitaIdQuery, [data.idCita]); // Parametros necesarios para la base de datos
    const [rows, fields] = await connection.query(query); // Ejecutamos query y almacenamos valores
    endConnection(); // Cerramos conexion con la base de datos
    return rows[0]; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// READ BY FECHA
export async function readCitasByDate(connection, data) {
  try {
    let readCitaDateQuery = "CALL searchCitaByFecha(?)"; // Procedimiento almacenado de la base de datos
    let query = mysql.format(readCitaDateQuery, [data.fecha]); // Parametros necesarios para la base de datos
    const [rows, fields] = await connection.query(query); // Ejecutamso query y almacenamos valores de la base de datos
    endConnection(); // Cerramos conexion con la base de datos
    return rows; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// READ BY STATUS
export async function readCitasByStatus(connection, data) {
  try {
    let readCitaStatusQuery = "CALL searchCitaByStatus(?)"; // Procedimiento almacenado de la base de datos
    let query = mysql.format(readCitaStatusQuery, [data.status]); // Parametros necesarios para la base de datos
    const [rows, fields] = await connection.query(query); // Ejecutamso query y almacenamos valores de la base de datos
    endConnection(); // Cerramos conexion con la base de datos
    return rows; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// UPDATE
export async function updateCita(connection, data) {
  try {
    let updateCitaQuery = "CALL updCita(?, ?, ?, ?, ?)"; // Procedimiento almacenado de la DB
    let query = mysql.format(updateCitaQuery, [
      data.idVenta,
      data.idEmp,
      data.nuevaFecha,
      data.horaI,
      data.descr,
    ]); // Parametros necesarios para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos valores
    endConnection(); // Cerramos conexion con la base de datos
    return rows; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

export async function updateCitaStaus(connection, data) {
  try {
    let updateStatus = "CALL updCitaEstado(?, ?)"; // Procedimiento almacenado de la base de datos
    let query = mysql.format(updateStatus, [data.idVenta, data.status]); // Agregamos los parametros necesarios al procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y almacenamos valores
    endConnection(); // Cerramos la conexion
    return rows; // Retornamos valores
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// DELETE
export async function deleteCita(connection, data) {
  try {
    let cancelarCita = "CALL delCita(?)"; // Procedimiento almacenado de la base de datos
    let query = mysql.format(cancelarCita, [data.idCita]); // Parametros necesarios para el procedimiento
    const [rows, fields] = await connection.query(query);
    endConnection(); // Cerramos la conexion con la BD
    return rows;
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// OBTENER HORAS DISPONIBLES
export async function horasDisponibles(connection, data) {
  try {
    let horasDispoQuery = "CALL getHorasDisponiblesV2(?, ?, ?)"; // Procedimiento almacenado
    let query = mysql.format(horasDispoQuery, [
      data.fecha,
      data.idEmp,
      data.idServ,
    ]); // Parametros para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos query y almacenamos valores
    endConnection(); // Cerramos la conexion
    return rows[0]; // Retornamos el resultado que es un array
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// FUNCIONAL
// Obtener duracion de servicio
export async function duracionTotal(connection, data) {
  try {
    let duracionTotalQuery = "CALL duracionTotalServ(?)"; // Procedimiento almacenado de la base de datos
    let query = mysql.format(duracionTotalQuery, [data.idServ]); // Parametros necesarios para el procedimiento
    const [rows, fields] = await connection.query(query); // Ejecutamos el query y almacenamos los resultados
    return rows[0]; // Retornamos los resultado
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// FUNCIONAL
// Convertir string a minutos
export function stringATiempo(tiempo) {
  let minutos;
  const tiempoString = tiempo.split(":"); // Dividimos el string en base a : el cual creara un array [HH:MM:SS]
  if (tiempoString[0] !== "00") {
    // Verificamos si el servicio dura >= 1
    minutos = 60 * parseInt(tiempoString[0]); // Convertimos las horas a int y las agregamos a minutos
    if (tiempoString[1] !== "00")
      // Verificamos si los minutos son > a 0
      minutos += parseInt(tiempoString[1]); // Convertimos los minutos a int y las agregamos a minutos
    return minutos;
  }
  minutos = parseInt(tiempoString[1]); // Accedemos al segundo campo (minutos) y lo convertimos en un entero
  return minutos; // Retornamos los minutos
}

// FUNCIONAL
export function horaFinal(horaI, duracion) {
  // Calcula la hora en la que finaliza una cita
  let horaF = [0, 0, "00"];
  let total;
  let minutos;
  const inicio = horaI.split(":"); // Dividimos las horas y minutos de la hora inicial
  const final = stringATiempo(duracion); // Convertimos la duracion en int y almacenamos en final
  // Almacenamos las horas y minutos en horasF
  if (final % 60 === 0) {
    // Hora(s) exacta
    horaF[0] = final / 60 + parseInt(inicio[0]);
  } else {
    // Horas con minutos
    // Math.trunc solo tomara el valor entero
    horaF[0] = Math.trunc(final / 60) + parseInt(inicio[0]); // Obtenemos las horas y las sumamos, las convertimos en un string y asignamos a la seccion de horas de horasF
    minutos = final - Math.trunc(final / 60) * 60; // Obtenemos los minutos
    horaF[1] = minutos; // Convertimos los minutos en un string y asignamos a la seccion de minutos de horasF
  }
  minutos = parseInt(inicio[1]) + horaF[1]; // Sumamos los minutos

  if (minutos % 60 === 0) {
    // Verificamos si la suma de los minutos aumenta en horas exactas
    horaF[0] += minutos / 60; // Sumamos las horas
    horaF[1] = "00"; // Reiniciamos los minutos a 0
    total = horaF.join(":"); // Juntamos el array de horaF con un : entre cada elemento dando asi el formato de horas
    return total; // Retornamos la hora final
  } else if (minutos >= 1) {
    // Aumenta en horas con minutos
    horaF[1] = 0; // Reiniciamos los minutos a 0
    horaF[0] += Math.trunc(minutos / 60); // Sumamos las horas
    horaF[1] += minutos - Math.trunc(minutos / 60) * 60; // Sumamos los minutos restantes
  }
  total = horaF.join(":"); // Juntamos el array de horaF con un : entre cada elemento dando asi el formato de horas
  return total; // Retornamos la hora final
}
