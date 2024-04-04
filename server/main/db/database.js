import * as mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function startConection() {
  //await console.log(process.env.DB_HOST);
  //console.log(data.host);
  console.log("Conexión con la base de datos iniciada.");
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit : 5000 // Medidas drasticas
  });
}
  
export async function endConection(db) {
  await console.log("Conexión con la base de datos finalizada.");
  await db.end();
}

export async function getProductos(data) {
  let db = await startConection();
  let prod = await db.execute(
    `SELECT getProducto("${data}");`
  );
  await endConection(db);
  prod = parseData(prod);
  return await prod;
}

export async function getServicios(data) {
  let db = await startConection();
  let prod = await db.execute(
    `SELECT getServicio("${data.servicio}", "${data.pilar}");`
  );
  await endConection(db);
  prod = parseData(prod);
  return await prod;
}

export async function addCategoria(data) {
  let db = await startConection();
  let res = await db.execute(
    `CALL addCategoria(${data.pilar}, ${data.nom}, ${data.desc});`
  );
  await endConection(db);
  return await prod;
}

export async function addUser(data) {
  let db = await startConection();
  let res = await db.execute(
    `CALL addUser(${data.email}, ${data.tel}, ${data.pass}, ${data.tipo});`
  );
  await endConection(db);
  return await prod;
}

export async function addCliente(data) {
  let db = await startConection();
  let res = await db.execute(
    `CALL addCliente(${data.user}, ${data.nom}, ${data.ap}, ${data.am});`
  );
  await endConection(db);
  return await prod;
}

export async function addEmpleado(data) {
  let db = await startConection();
  let res = await db.execute(
    `CALL addEmpleado(${data.user}, ${data.nom}, ${data.ap}, ${data.am}, ${data.horaE}, ${data.horaS});`
  );
  await endConection(db);
  return await prod;
}

export async function addFav(data) {
  let db = await startConection();
  let res = await db.execute(
    `CALL addFav(${data.cliente}, ${data.ps});`
  );
  await endConection(db);
  return await prod;
}

export async function addProducto(data) {
  let db = await startConection();
  let res = await db.execute(
    `CALL addProducto(${data.nom}, ${data.precio}, ${data.desc}, ${data.pilar});`
  );
  await endConection(db);
  return await prod;
}

export async function addServicio(data) {
  let db = await startConection();
  let res = await db.execute(
    `CALL addServicio(${data.nom}, ${data.precio}, ${data.desc}, ${data.tiempo}, ${data.categoria}, ${data.pilar});`
  );
  await endConection(db);
  return await prod;
}

export async function addServEmp(data) {
  let db = await startConection();
  let res = await db.execute(
    `CALL addServEmp(${data.empleado}, ${data.servicio});`
  );
  await endConection(db);
  return await prod;
}

export async function addValProdServ(data) {
  let db = await startConection();
  let res = await db.execute(
    `CALL addValProdServ(${data.cliente}, ${data.ps}, ${data.fecha}, ${data.hora}, ${data.comentario}, ${data.valoracion});`
  );
  await endConection(db);
  return await prod;
}

export async function addValSucursal(data) {
  let db = await startConection();
  let res = await db.execute(
    `CALL addValSucursal(${data.cliente}, ${data.sucursal}, ${data.fecha}, ${data.hora}, ${data.comentario}, ${data.valoracion});`
  );
  await endConection(db);
  return await prod;
}

export async function addValEmpleado(data) {
  let db = await startConection();
  let res = await db.execute(
    `CALL addValSucursal(${data.cliente}, ${data.empleado}, ${data.fecha}, ${data.hora}, ${data.comentario}, ${data.valoracion});`
  );
  await endConection(db);
  return await prod;
}

export async function delFav(data) {
  let db = await startConection();
  let res = await db.execute(
    `CALL delFav(${data.cliente}, ${data.producto});`
  );
  await endConection(db);
  return await prod;
}

export async function delServEmp(data) {
  let db = await startConection();
  let res = await db.execute(
    `CALL delServEmp(${data.empleado}, ${data.servicio});`
  );
  await endConection(db);
  return await prod;
}

async function parseData(data) {
  return data[0][0];
}
