import { endConnection } from "./connection.js";
import mysql from "mysql2";

const messageError = "Ha ocurrido un error al ejecutar el query: ";

export async function createProducto(connection, data) {
  try {
  } catch (err) {
    console.error(messageError, err);
  }
}

export async function readProductoById(connection, data) {
  try {
  } catch (err) {
    console.error(messageError, err);
  }
}

export async function readProductoByName(connection, data) {
  try {
  } catch (err) {
    console.error(messageError, err);
  }
}

export async function updateProducto(connection, data) {
  try {
  } catch (err) {
    console.error(messageError, err);
  }
}

export async function deleteProducto(connection, data) {
  try {
  } catch (err) {
    console.error(messageError, err);
  }
}
