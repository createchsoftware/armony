import express from "express";
import { servidor } from "./data/datos.js";
import cors from "cors";
/*import * as path from 'path';
import { fileURLToPath } from 'url';*/
const app = express();

/*const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);*/

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

// Middleware
app.use(express.json());

app.get("/api/admin", (req, res) => {
  res.send("Funcionando");
  console.log("Abriendo API en navegador");
}); // Pagina principal

app.use(cors())

app.listen(servidor.SERVER_PORT, () => {
  console.log(`Servidor en puerto ${servidor.SERVER_PORT}`);
});
