import express from "express";
import mysql from "mysql2";
import { enableConnect, endConnection } from "./DB/connection.js";
import { servidor } from "./data/datos.js";
const app = express();

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
app.use("/api/admin/empleados", routerEmpleado);
import { routerProveedor } from "./routers/proveedores.js";
app.use("/api/admin/proveedor", routerProveedor);
import { routerSucursal } from "./routers/sucursal.js";
app.use("/api/admin/sucursal", routerSucursal);

// Middleware
app.use(express.json());

app.get("/api/admin", (req, res) => {
  res.send("Funcionando");
}); // Pagina principal

app.listen(servidor.SERVER_PORT, () => {
  console.log(`Servidor en puerto ${servidor.SERVER_PORT}`);
});
