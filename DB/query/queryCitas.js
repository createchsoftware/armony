import { endConnection } from "./connection.js";
import mysql from "mysql2";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

export async function createCitas(connection, data) {
  try {
  } catch (err) {
    console.error(messageError, err);
  }
}

export async function readCitas(connection, data) {
  try {
  } catch (err) {
    console.error(messageError, err);
  }
}

export async function updateCita(connection, data) {
  try {
  } catch (err) {
    console.error(messageError, err);
  }
}

export async function deleteCita(connection, data) {
  try {
  } catch (err) {
    console.error(messageError, err);
  }
}
