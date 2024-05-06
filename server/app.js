import express from "express";
import { servidor } from "./data/datos.js";
import cookieParser from 'cookie-parser';



import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const _dirname = path.dirname(fileURLToPath(import.meta.url));



import {methods as authentication} from './controllers/authentication.controllers.js';
import {methods as authorization} from './middlewares/authorization.js';
import {methods as createAccount} from "./controllers/createAccount.controllers.js";
import {methods as editarPerfil} from "./controllers/editarPerfil.controllers.js";
import InsertUser from "./middlewares/register.js";


import connection from "./database.js";





// Objeto de express
const app = express();

app.use(express.static(path.join(_dirname, '../client/dist')));
app.use(cookieParser())

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


app.get('/spa/signUp/Patologia', authorization.no_logeado, (solicitud,respuesta)=>{
  respuesta.sendFile(path.join(_dirname,'../client/dist/index.html'));
});


//usar le middleware para verificar si no esta logueado
app.get("/spa/signUp", authorization.no_logeado, (req,res)=>{
  res.sendFile(path.join(_dirname,'../client/dist/index.html'));
});

app.get("/spa/signUp/Contrasena",authorization.no_logeado, (req,res)=>{
  res.sendFile(path.join(_dirname,'../client/dist/index.html'));
});

app.get("/spa/resetPassword", InsertUser, (solicitud,respuesta)=>{
  respuesta.sendFile(path.join(_dirname,'../client/dist/index.html'));
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


app.get('/spa', (solicitud,respuesta)=>{
    respuesta.sendFile(path.join(_dirname ,'../client/dist/index.html'))
})


app.post('/api/login',authentication.login);  //verificar que el usuario hizo login

app.get('/api/logueado',authorization.verificar_cookie);

app.post('/api/step1', createAccount.paso1);

app.post('/api/step2', createAccount.paso2);

app.post('/api/step3', createAccount.paso3);


app.post('/api/editarPerfil', editarPerfil.change_data);






//seccion del perfil
        app.get('/perfil', authorization.logeado, (solicitud,respuesta)=>{
          respuesta.sendFile(path.join(_dirname ,'../client/dist/index.html'))
        })

        app.get('/perfil/informacion', authorization.logeado, (solicitud,respuesta)=>{
          respuesta.sendFile(path.join(_dirname ,'../client/dist/index.html'))
        })

        app.get('/perfil/seguridad', authorization.logeado, (solicitud,respuesta)=>{
          respuesta.sendFile(path.join(_dirname ,'../client/dist/index.html'))
        })


        app.get('/perfil/monedero', authorization.logeado, (solicitud,respuesta)=>{
          respuesta.sendFile(path.join(_dirname ,'../client/dist/index.html'))
        })


        app.get('/perfil/direcciones', authorization.logeado, (solicitud,respuesta)=>{
          respuesta.sendFile(path.join(_dirname ,'../client/dist/index.html'))
        })
        
        app.get('/perfil/suscripciones', authorization.logeado, (solicitud,respuesta)=>{
          respuesta.sendFile(path.join(_dirname ,'../client/dist/index.html'))
        })

        app.get('/perfil/tarjetas', authorization.logeado, (solicitud,respuesta)=>{
          respuesta.sendFile(path.join(_dirname ,'../client/dist/index.html'))
        })

        app.get('/editar-perfil', authorization.logeado, (solicitud,respuesta)=>{
          respuesta.sendFile(path.join(_dirname ,'../client/dist/index.html'))
        })












app.get('/api/step1.5',(solicitud,respuesta)=>{

  let consulta = "select * from patologia";
  
  solicitud.database.query(consulta,async (error,resultados)=>{
    if(error)
      throw error;

    if(resultados.length == 0){
        //respuesta.send({busqueda_vacia:true});
       
    }else{
        //contruir un arreglo mas limpio
        let arreglo = [];
        for(let indice in resultados){
          arreglo.push([resultados[indice].pregunta,parseInt(indice)+1]);
        }
        
        respuesta.json(arreglo);
       
    }
    
});


})

