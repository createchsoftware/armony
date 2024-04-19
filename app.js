const express = require("express");
const mysql = require("mysql2");
const app = express();
const { servidor, conexionDB } = require("./data/datos.js");
const SERVER_PORT = servidor.SERVER_PORT;
const {
  createClientes,
  readClientes,
  createUser,
  searchUser,
  deleteClientes,
} = require("./DB/querys.js");
// const { pool, getConnection } = require("./DB/connection.js");

// Middleware
app.use(express.json());

// Routers
const routerCliente = express.Router();
app.use("/api/admin/cliente", routerCliente);
const routerUser = express.Router();
app.use("/api/admin/user", routerUser);
const routerProductos = express.Router();
app.use("/api/admin/productos", routerProductos);
const routerServicios = express.Router();
app.use("/api/admin/servicios", routerServicios);
const routerEmpleados = express.Router();
app.use("/api/admin/empleados", routerEmpleados);

// Proximo cambio a pool de conexiones
// const pool = mysql.createPool({
//   host: conexionDB.HOST,
//   port: conexionDB.PORT,
//   database: conexionDB.DATABASE,
//   user: conexionDB.USER,
//   password: conexionDB.PASSWORD,
// });

// conexionDB.pool.getConnection((err) => {
//   if (err) throw err;
//   console.log("CONNECT TO DATABASE");
// });

// pool.getConnection((err) => {
//   if (err) throw err;
//   console.log("CONNECT TO DATABASE!");
// });

app.get("/api/admin", (req, res) => {}); // Pagina principal

app.listen(servidor.SERVER_PORT, () => {
  console.log(`Servidor en puerto ${servidor.SERVER_PORT}`);
});
