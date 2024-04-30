import express from "express";
import { servidor } from "./data/datos.js";

// Objeto de express
const app = express();
// app.use(express.static(path.join(__dirname,'./armony/client/main/public')))

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

// Pagina principal
app.get("/api/admin", (req, res) => {
  res.send("Funcionando");
});

// app.use('/',(req,res)=>{
//   res.sendFile(path.join(__dirname,'./armony/client/main/public','index.html'))
// })


// app.get('/about',(req,res)=>{
//   res.render(path.join(__dirname,'./armony/client/main/public','about.html'))
// })




app.listen(servidor.SERVER_PORT, () => {
  console.log(`Servidor en puerto ${servidor.SERVER_PORT}`);
});
