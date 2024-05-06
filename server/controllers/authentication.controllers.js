import bcryptjs from 'bcryptjs';
import JsonWebToken from 'jsonwebtoken';
import dotenv from 'dotenv';
import {methods as servicios} from '../services/mail.service.js';

dotenv.config()

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

       let consulta = 'select * from usuario where pkIdUsuario = ? or email = ?'
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
            solicitud.database.query(consulta,parametros, async (error,resultados)=>{
                if(error)
                  throw error;
                
                if(resultados.length == 0){
                    respuesta.send({busqueda_vacia:a_buscar,valor:usuarioID_o_correo});
                }
                else{
                    // usuarioID o correo concuerdan con un usario en la base de datos

                    // ahora sigue validar la contrasena con la base de datos

                    
                    let contraseña_bytes = resultados[0].pass; // contrasena en bytes desde la base de datos
                    let contraseña_no_bytes = contraseña_bytes.toString('utf-8'); //contrasena en string, pero sigue estando encriptada

                    //bcryptjs.compare() es una funcion asincrona, por lo que debemos usar el await
                    let contraseña_correcta = await bcryptjs.compare(contraseña,contraseña_no_bytes);

                    if(contraseña_correcta == false){
                        respuesta.send({contraseña_incorrecta:true});
                    }else{

                        let ingreso;

                        if(usuarioID_valido == true){
                            ingreso = resultados[0].pkIdUsuario;
                        } 
                        else {
                            ingreso = resultados[0].email;
                        } 


                        // let full_name = `${resultados[0].nombre} ${resultados[0].apellidoP} ${resultados[0].apellidoM}`;

                        // const sendingLog = await InicioSesionEmail(resultados[0].email,"token",full_name);
 
                        // console.log(sendingLog); // nos deberia imprimir la informacion acerca del envio

                        let fecha = resultados[0].fechaNac;

                        let year = fecha.getFullYear();
                        let month = fecha.getMonth();
                        let day = fecha.getDay();


                        let dia = day.toString();;
                        let mes = month.toString();
                        if(day <= 10){
                            dia = "0";
                            dia+= day.toString();
                        }
                        if(month <=10){
                            mes = "0";
                            mes+= month.toString();
                        }
                        let año = year.toString();

                        let fechaNacimiento = `${año}-${mes}-${dia}`;



                        let token = JsonWebToken.sign(
                            {
                                user:resultados[0].pkIdUsuario,
                                nombre:resultados[0].nombre,
                                paterno:resultados[0].apellidoP,
                                materno:resultados[0].apellidoM,
                                correo:resultados[0].email,
                                telefono:resultados[0].telefono,
                                contraseña:contraseña_no_bytes,  //contrasena encriptada dentro de la cookie
                                tipo:resultados[0].tipo,
                                imagen:resultados[0].img,
                                calle:resultados[0].calle,
                                colonia:resultados[0].colonia,
                                numero:resultados[0].numero,
                                postal:resultados[0].codigoPostal,
                                nacimiento:fechaNacimiento

                            },
                            process.env.JWT_SECRET,
                            {expiresIn:process.env.JWT_EXPIRATION}
                        );

                        // esto es un objeto
                        let galleta = {
                            // el expires es de tipo fecha
                            maxAge:1*1000*60*30, // 30 minutos
                            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
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
                
            )
       }

       
       
   }
}



async function register(solicitud, respuesta){

    let repetido = false;
    let consulta ='';
    let parametros = [];

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

            consulta = 'select * from usuario where email = ?';
            parametros = [email];
            solicitud.database.query(consulta,parametros,(error,resultados)=>{
                if(error){
                    throw error;
                    return;
                }
                repetido = resultados.some((usuario)=>{
                    usuario.email == email
                })
            })

            if(repetido == true){
                respuesta.send({correo_repetido:true});
            }
            else{
                // perfecto, el correo no existe
                let salt =  await bcryptjs.genSalt(5);

                //clave cryptografica de la contraseña del usuario
                let hashPassword =  await bcryptjs.hash(contraseña,salt);  // la contraseña que vamos a guardar en nuestro usuario

                consulta = 'insert into usuario values (null,?,?,?,?,?)';
                parametros = [nombre,paterno,materno,email,hashPassword];
                solicitud.database.query(consulta,parametros, async(error,resultados)=>{
                    if(error){
                        throw error;
                        return;
                    }

                    /*
                      a diferencia de un select, que nos arroja un arreglo de objetos,
                      en un insert into, nos arroja un objeto, claro si nomas es asi, 
                      ya mas posterior dependiendo de si metemos triggers u otras cosas
                      sera diferente
                    */

                    let token_register = JsonWebToken.sign(
                        {user:resultados.insertId},
                        process.env.JWT_SECRET,
                        {expiresIn:process.env.JWT_EXPIRATION}
                    );

                    // esto es un objeto
                    let galleta_register = {
                        maxAge:10000,
                        // el expires es de tipo fecha
                        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
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
                })
            }
        }
        
    }
    
}



export const methods = {
    login,
    register
}