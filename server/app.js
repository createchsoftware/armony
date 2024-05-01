import express from "express";
import { servidor } from "./data/datos.js";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const _dirname = path.dirname(fileURLToPath(import.meta.url));

import { methods as authentication } from './controllers/authentication.controllers.js';
import { methods as authorization } from './middlewares/authorization.js';

import { conexion } from "./db/connection.js";

// Objeto de express
const app = express();

app.use(express.static(path.join(_dirname, '../client/dist')));

app.use((req, res, next) => {
  req.database = conexion;
  next();
});

// Routers
import { routerCliente } from "./routers/clientes.js";
app.use("/api/admin/cliente", routerCliente);
import { routerUser } from "./routers/usuarios.js";
app.use("/api/admin/user", routerUser);
import { routerProductos } from "./routers/productos.js";
app.use("/api/admin/productos", routerProductos);
import { routerServicio } from "./routers/servicios.js";
app.use("/api/admin/servicios", routerServicio);
import { routerEmpleado } from "./routers/empleados.js";
app.use("/api/admin/empleado", routerEmpleado);
import { routerProveedor } from "./routers/proveedores.js";
app.use("/api/admin/proveedor", routerProveedor);
import { routerSucursal } from "./routers/sucursal.js";
app.use("/api/admin/sucursal", routerSucursal);
import { routerCategoria } from "./routers/categoria.js";
app.use("api/admin/categoria", routerCategoria);
import { routerEspecialidad } from "./routers/especialidad.js"; // NOTA: NO SE A PROBADO AUN, NO FUNCIONAL
app.use("api/admin/especialidad", routerEspecialidad);
import { routerCitas } from "./routers/citas.js";
app.use("/api/admin/citas", routerCitas);
import { routerFavoritos } from "./routers/favoritos.js";
app.use("/api/admin/favoritos", routerFavoritos);

// Middleware
app.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

app.post("/api/login", authentication.login);

app.get("/api/logout", authentication.logout);

app.get("/api/logueado", authorization.verificar_cookie);

// Pagina principal
app.get("/api/admin", async (req, res) => {
  await res.send("Funcionando");
});

app.get("*", async (req, res) =>{
  await res.sendFile(path.join(_dirname ,'../client/dist/index.html'));
})

app.listen(servidor.SERVER_PORT, () => {
  console.log(`Servidor en puerto ${servidor.SERVER_PORT}`);
});
