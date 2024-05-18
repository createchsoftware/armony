import express from "express";
import { servidor } from "./data/datos.js";
import cookieParser from 'cookie-parser';
import https from "https";

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const _dirname = path.dirname(fileURLToPath(import.meta.url));

import {methods as authentication} from './controllers/authentication.controllers.js';
import {methods as authorization} from './middlewares/authorization.js';
import {methods as createAccount} from "./controllers/createAccount.controllers.js";
import {methods as editarPerfil} from "./controllers/editarPerfil.controllers.js";
import {methods as perfil} from "./controllers/perfil-data.controllers.js";
import InsertUser from "./middlewares/register.js";

import { conexion } from "./db/connection.js";

const keyPath = path.join(__dirname, '/ssl/private.key');
const certPath = path.join(__dirname, '/ssl/certificate.crt');

// Objeto de express
const app = express();

app.use(express.static(path.join(_dirname, '../client/dist')));
app.use(cookieParser())

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
app.use("/api/admin/categoria", routerCategoria);
import { routerEspecialidad } from "./routers/especialidad.js"; // NOTA: NO SE A PROBADO AUN, NO FUNCIONAL
app.use("api/admin/especialidad", routerEspecialidad);

import { routerFavoritos } from "./routers/favoritos.js"; 
app.use("/api/admin/favoritos", routerFavoritos);
import { routerCitas } from "./routers/citas.js"; 
app.use("/api/admin/citas", routerCitas);

// Middleware
app.use(express.json()); // Analiza las request entrantes con carga JSON basado en body-parse

// Pagina principal
app.get("/api/admin", (req, res) => {
  res.send("Funcionando");
});

// app.get('/estado-logueado', (solicitud, respuesta) => {
//   respuesta.json({ logueado: true }); // Aquí puedes verificar el estado de logueado como lo haces en la ruta principal
// });


app.post('/api/login',authentication.login);  //verificar que el usuario hizo login

app.get('/api/logueado',authorization.verificar_cookie);

app.get('/api/logout',authentication.logout); 

app.post('/api/step1', createAccount.paso1);

app.post('/api/step2', createAccount.paso2);

app.post('/api/step3', createAccount.paso3);

app.post('/api/deleteCard', perfil.deleteTarjeta);

app.post('/api/editarPerfil', editarPerfil.change_data);

app.post('/api/tarjeta-nueva', perfil.InsertarTarjeta);

app.get('/api/pedidos', perfil.getPedidos);

app.get('/perfil/pedidos', authorization.logeado);

app.get('/perfil',authorization.logeado );

app.get('/perfil/monedero', authorization.logeado);

app.get('/perfil/monedero/agregarSaldo',authorization.logeado);

app.get('/perfil/informacion',authorization.logeado);

app.get('/perfil/tarjetas', authorization.logeado);

app.get('/perfil/tarjetas/registroTarjeta', authorization.logeado);

app.get('/perfil/movimientos', authorization.logeado);

app.get('/perfil/historial', authorization.logeado);

app.get('/api/patologias', authorization.Patologias);

app.get('/api/tarjetas/1.5', perfil.getTarjetas);

app.get('/api/transacciones', perfil.getTransacciones);

app.get('/api/monedero', perfil.getMonedero);

app.post('/api/recargaSaldo', perfil.Insert_to_Monedero);

app.get('/spa/signUp/Confirmacion', InsertUser);


app.get('/api/step1.5',async (solicitud,respuesta)=>{

  let consulta = "select * from patologia";
  
  let [fields] = await solicitud.database.query(consulta)
  if(fields.length == 0){
        respuesta.send({busqueda_vacia:true});
       
    }else{
        //contruir un arreglo mas limpio
        let arreglo = [];
        for(let indice in fields){
          arreglo.push([fields[indice].pregunta,parseInt(indice)+1]);
        }
        
        respuesta.json(arreglo);
       
    }
    
});

app.get('*', (solicitud,respuesta)=>{
  respuesta.sendFile(path.join(_dirname ,'../client/dist/index.html'));
})


if (servidor.PRODUCTION) {
  https.createServer({
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
  }, app).listen(443, () => {
    console.log(`Servidor en puerto 443: HTTPS`);
  });

  app.use((req, res) => {
    res.redirect(`https://${req.headers.host}${req.url}`);
  });
}

let puerto = (servidor.PRODUCTION ? servidor.PROD_SERVER_HOST : servidor.SERVER_HOST);

app.listen(servidor.PRODUCTION ? 80 : servidor.SERVER_PORT,
           puerto, () => {
  console.log(`Servidor en puerto ${puerto}: HTTP`);
});