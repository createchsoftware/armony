import bcryptjs from 'bcryptjs';
import JsonWebToken from 'jsonwebtoken';
import { jwt } from "../data/datos.js";
import CrearCuentaEmail from '../services/mail.service.js';

const regex_email = /.+@(gmail|hotmail|icloud|outlook)\.com/;
const regex_usuarioID = /\d{1,5}/;

async function login(solicitud,respuesta){

   let parametros = [];
   let usuarioID_o_correo = solicitud.body.user_or_email;
   let contraseña = solicitud.body.password;

   if(!usuarioID_o_correo || !contraseña){
       respuesta.send({campos_vacios:true});
   }
   else{

       let consulta = `SELECT * FROM usuario WHERE pkIdUsuario = ? OR email = "?"`
       parametros = [usuarioID_o_correo,usuarioID_o_correo];

       // primero validar el ID o el correo

       let usuarioID_valido = regex_usuarioID.test(usuarioID_o_correo);
       let correo_valido = regex_email.test(usuarioID_o_correo);

       if(usuarioID_valido == false && correo_valido == false){
           respuesta.send({campos_incorrectos:true});
       }
       else{
            let a_buscar;
            if(correo_valido == true) a_buscar = "correo";
            else a_buscar = "usuario";

            // segundo buscar al usuario o el email
            let [results] = await solicitud.database.query(consulta, parametros);
                
                if(results.length == 0){
                    respuesta.send({busqueda_vacia:a_buscar,valor:usuarioID_o_correo});
                }
                else{
                    // usuarioID o correo concuerdan con un usario en la base de datos

                    // ahora sigue validar la contrasena con la base de datos

                    //bcryptjs.compare() es una funcion asincrona, por lo que debemos usar el await

                    let contraseña_correcta = await bcryptjs.compare(contraseña, Buffer.from(results[0].pass, 'hex').toString('utf8'));

                    if(contraseña_correcta == false){
                        respuesta.send({contraseña_incorrecta:true});
                    }else{

                        let ingreso;

                        if(usuarioID_valido == true){
                            ingreso = results[0].pkIdUsuario;
                        } 
                        else {
                            ingreso = results[0].email;
                        } 


                        // let full_name = `${resultados[0].nombre} ${resultados[0].apellidoP} ${resultados[0].apellidoM}`;

                        // const sendingLog = await InicioSesionEmail(resultados[0].email,"token",full_name);
 
                        // console.log(sendingLog); // nos deberia imprimir la informacion acerca del envio

                        let token = JsonWebToken.sign(
                            {user:ingreso},
                            jwt.SECRET,
                            {expiresIn:jwt.EXPIRATION}
                        );

                        // esto es un objeto
                        let galleta = {
                            // el expires es de tipo fecha
                            maxAge:2592000,
                            expires: new Date(Date.now() + jwt.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                            path:'/'
                        }


                        /*
                            la funcion cookie recibe 3 parametros:
                            ---> el nombre de la cookie
                            ---> La informacion del token ya sea en string o en formato JSON,
                                 dentro de la informacion podemos poner lo que queramos
                            ---> las opciones de la cookie
                        */
                        respuesta.cookie("Naruto_cookie",token,galleta);

                        respuesta.send({redirect:'/admin'});

                    }
                }
       }
       
   }
}

async function logout(solicitud,respuesta){
    await respuesta.clearCookie("Naruto_cookie");
    await respuesta.redirect('/');
}



async function register(solicitud, respuesta){

    let repetido = false;
    let consulta ='';
    let parametros = [];

    const salt = await bcryptjs.genSalt(5);

    console.log("mensaje para comprobar que se ejecute");


    let nombre = solicitud.body.nombre;
    let paterno = solicitud.body.paterno;
    let materno = solicitud.body.materno;
    let email = solicitud.body.email;
    let contraseña = solicitud.body.contraseña;

    

    if(!nombre || !paterno || !materno || !email || !contraseña){
        respuesta.send({campos_vacios:true})
    }
    else {

        
        // comprobar si el correo cumple con el regex
        let valido = regex_email.test(email);

        if(valido == false){
            respuesta.send({correo_valido:false});
        }
        else{
            // el correo valido si cumple con el regex, ahora sigue verificar si el correo no esta repetido

            consulta = 'SELECT * FROM usuarios WHERE correo = ?';
            parametros = [email];
            let [results] = solicitud.database.query(consulta, parametros)
                
                repetido = results.some((usuario)=>{
                    usuario.email == email
                })

            if(repetido == true){
                respuesta.send({correo_repetido:true});
            }
            else{
                // perfecto, el correo no existe

                //clave cryptografica de la contraseña del usuario
                let hashPassword = await bcryptjs.hash(contraseña, salt);  // la contraseña que vamos a guardar en nuestro usuario

                consulta = 'INSERT INTO usuarios VALUES (null,?,?,?,?,?)';
                parametros = [nombre,paterno,materno,email,hashPassword];

                let [results] = solicitud.database.query(consulta, parametros)
                
                if (results.length > 0) {
                    /*
                      a diferencia de un select, que nos arroja un arreglo de objetos,
                      en un insert into, nos arroja un objeto, claro si nomas es asi, 
                      ya mas posterior dependiendo de si metemos triggers u otras cosas
                      sera diferente
                    */

                    let token_register = JsonWebToken.sign(
                        {user:resultados.insertId},
                        jwt.SECRET,
                        {expiresIn:jwt.EXPIRATION}
                    );

                    // esto es un objeto
                    let galleta_register = {
                        maxAge:2592000,
                        // el expires es de tipo fecha
                        expires: new Date(Date.now() + jwt.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        path:'/'

                        /*
                          cua
                        */
                    };

                    // nomre:string   value:string
                    respuesta.cookie("Naruto_cookie",token_register,galleta_register);

                    


                    // recibe la email a la que queremos enviar, no desde donde se manda
                    // el nombre completo, y el ID del usuario desde la base de datos

                    let full_name = `${nombre} ${paterno} ${materno}`;

                    const sending = await CrearCuentaEmail(email,"token",full_name,resultados.insertId);

                    console.log(sending); // nos deberia imprimir la informacion acerca del envio

                    respuesta.send({redirect:'/admin'});
                }
            }
        }
        
    }
    
}



export const methods = {
    login,
    logout,
    register
}