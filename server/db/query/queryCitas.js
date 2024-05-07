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
    let insertVentaCita =
      "CALL addVentaCitaOnline(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    let query = mysql.format(insertVentaCita, [
      data.pilar,
      data.idCliente,
      data.name,
      data.phone,
      data.tarjeta,
      data.monedero,
      data.estadoPago,
      data.servicio,
      data.idEmp,
      data.fechaPago,
      data.horaPago,
      data.descr,
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

// READ
export async function readCitas(connection, data) {
  try {
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// UPDATE
export async function updateCita(connection, data) {
  try {
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// DELETE
export async function deleteCita(connection, data) {
  try {
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// OBTENER HORAS DISPONIBLES
export async function horasDisponibles(connection, data) {
  try {
    horasNoDispo = await horasOcupadas(connection, data);

    let horasDispoQuery = "CALL getHorasOcupadas(?, ?, ?)";
    let query = mysql.format(horasDispoQuery, [
      data.idServ,
      data.idEmp,
      data.fechaCita,
    ]);
    const [rows, fields] = await connection.query(query);
    endConnection();
    return rows[0];
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}

// HORAS DISPONIBLES => ARRAY
export async function horasDipoArray(data) {
  try {
    let horasArr = [[], []]; // En el primer arreglo se guarda la hora y en el segundo la info de la cita
    let horas = data; // Almacenamos las horas disponibles obtenidas de la funcion horasDisponibles
    for (let i = 0; i < horas.length; i++) {
      // Iteramos hasta el final del arreglo llenandolo en el arreglo de horas disponibles
      horasArr[i] = horas[i];
      horasArr[i][i] = null;
    }
    console.log(horasArr);
    return horasArr;
  } catch (err) {
    // Capturamos errores de ejecucion de query
    console.error(messageError, err); // Mostramos errores por consola
  }
}
