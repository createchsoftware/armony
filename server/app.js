import express from "express";
import { servidor } from "./data/datos.js";


import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const _dirname = path.dirname(fileURLToPath(import.meta.url));



import {methods as authentication} from './controllers/authentication.controllers.js';
import {methods as authorization} from './middlewares/authorization.js';


import connection from "./database.js";


// Objeto de express
const app = express();

app.use(express.static(path.join(_dirname, '../client/dist')));

app.use((req, res, next) => {
  req.database = connection;
  next();
});



// Routers
// import { routerCliente } from "./routers/clientes.js";
// app.use("/api/admin/cliente", routerCliente);
// import { routerUser } from "./routers/usuarios.js";
// app.use("/api/admin/user", routerUser);
// import { routerProductos } from "./routers/productos.js";
// app.use("/api/admin/productos", routerProductos);
// import { routerServicio } from "./routers/servicios.js";
// app.use("/api/admin/servicios", routerServicio);
// import { routerEmpleado } from "./routers/empleados.js";
// app.use("/api/admin/empleado", routerEmpleado);
// import { routerProveedor } from "./routers/proveedores.js";
// app.use("/api/admin/proveedor", routerProveedor);
// import { routerSucursal } from "./routers/sucursal.js";
// app.use("/api/admin/sucursal", routerSucursal);
// import { routerCategoria } from "./routers/categoria.js";
// app.use("api/admin/categoria", routerCategoria);
// import { routerEspecialidad } from "./routers/especialidad.js"; // NOTA: NO SE A PROBADO AUN, NO FUNCIONAL
// app.use("api/admin/especialidad", routerEspecialidad);

// Middleware
app.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse




// Pagina principal
app.get("/api/admin", (req, res) => {
  res.send("Funcionando");
});

app.listen(servidor.SERVER_PORT, () => {
  console.log(`Servidor en puerto ${servidor.SERVER_PORT}`);
});


// app.get('/estado-logueado', (solicitud, respuesta) => {
//   respuesta.json({ logueado: true }); // Aquí puedes verificar el estado de logueado como lo haces en la ruta principal
// });


app.get('/', (solicitud,respuesta)=>{
  respuesta.sendFile(path.join(_dirname ,'../client/dist/index.html'));
})


app.get('/spa', authorization.verificar_cookie, (solicitud,respuesta)=>{
    respuesta.sendFile(path.join(_dirname ,'../client/dist/index.html'))
})


app.post('/api/login',authentication.login);

app.get('/api/logueado',authorization.verificar_cookie);