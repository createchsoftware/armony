import bcryptjs from 'bcryptjs';
import JsonWebToken from 'jsonwebtoken';
import dotenv from 'dotenv';
import {methods as servicios} from '../services/mail.service.js';
import mysql from "mysql2";

dotenv.config()

const regex_email = /^\S+@(gmail\.com|hotmail\.com|outlook\.com|icloud.com|itmexicali\.edu\.mx|bc\.conalep\.edu\.mx|cecytebc\.edu\.mx|miprepacetis(75|18)\.mx|cobachbc\.edu\.mx|)$/;
const regex_usuarioID = /^\d{1,5}$/;
const regex_intento_de_correo = /@|\.com|\.edu|\.mx|gmail|hotmail|outlook|icloud/;


async function login(solicitud,respuesta){

    console.log("login en proceso");


   let parametros = [];
   let usuarioID_o_correo = solicitud.body.user_or_email;
   let contraseña = solicitud.body.password;

   let campos_faltantes=[];

   if(!usuarioID_o_correo || usuarioID_o_correo==''){
    campos_faltantes.push('Te falta llenar el campo ID o correo');
   }

   if(!contraseña || contraseña==''){
    campos_faltantes.push('Te falta poner tu contraseña');
   }

   if(campos_faltantes.length > 0){
       respuesta.send({campos_vacios:campos_faltantes});
   }
   else{

       let campos_invalidos = [];

       let consulta = 'select * from usuario where pkIdUsuario = ? or email = ?'
       parametros = [usuarioID_o_correo,usuarioID_o_correo];

       // primero validar el ID o el correo

       let usuarioID_valido = regex_usuarioID.test(usuarioID_o_correo);
       let correo_valido = regex_email.test(usuarioID_o_correo);


       if(usuarioID_valido == false && correo_valido == false){

           if(regex_intento_de_correo.test(usuarioID_o_correo) == true){
            // el usuario estaba intentando escribir un correo
            campos_invalidos.push('tu correo electronico no es un correo valido');
           }
           else{
            //puede ser que el usuario estaba intentando poner un id
            let m = usuarioID_o_correo;
            let l = m.length;

            m = m.replace(/\D/g,''); // eliminar todos los caracteres que no sean numeros
            if(m.length > (l/2)){
                campos_invalidos.push("el numero que ingresaste no es un ID valido");
            }
            else{
                campos_invalidos.push('Por favor, ingrese un ID o un Correo valido');
            }
           }

       }

       if(campos_invalidos.length > 0){
        //hubo campos invalidos
        return respuesta.send({campos_invalidos:campos_invalidos});
       }
       else{

            // segundo buscar al usuario o el email
            
            let [fields] = await solicitud.database.query(mysql.format(consulta,parametros))

                if(fields.length == 0){
                    if(correo_valido == true){
                        return respuesta.send({mensaje:`no existe una cuenta con el correo ${usuarioID_o_correo}`});
                    }
                    else{
                        return respuesta.send({mensaje:`no existe una cuenta con el ID ${usuarioID_o_correo}`});
                    }
                }
                else{
                    // usuarioID o correo concuerdan con un usario en la base de datos

                    // ahora sigue validar la contrasena con la base de datos

                    //vamos a obtener la contrasena
                    let search = 'call getInfoUsuario(?)';
                    let [fields_contraseña] = await solicitud.database.query(mysql.format(search,[fields[0].pkIdUsuario]));
                    
                    let contraseña_bytes = fields_contraseña[0][0].password; // contrasena en bytes desde la base de datos
                    let contraseña_no_bytes = contraseña_bytes.toString('utf-8'); //contrasena en string, pero sigue estando encriptada

                    //bcryptjs.compare() es una funcion asincrona, por lo que debemos usar el await
                    let contraseña_correcta = await bcryptjs.compare(contraseña,contraseña_no_bytes);

                    if(contraseña_correcta == false){
                        return respuesta.send({contraseña_incorrecta:'La contraseña es incorrecta'});
                    }else{

                        let ingreso;

                        if(usuarioID_valido == true){
                            ingreso = fields[0].pkIdUsuario;
                        } 
                        else {
                            ingreso = fields[0].email;
                        } 

                        let fecha = fields[0].fechaNac;

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
                                user:fields[0].pkIdUsuario,
                                nombre:fields[0].nombre,
                                paterno:fields[0].apellidoP,
                                materno:fields[0].apellidoM,
                                correo:fields[0].email,
                                telefono:fields[0].telefono,
                                contraseña:contraseña_no_bytes,  //contrasena encriptada dentro de la cookie
                                tipo:fields[0].tipo,
                                imagen:fields[0].img,
                                calle:fields[0].calle,
                                colonia:fields[0].colonia,
                                numero:fields[0].numero,
                                postal:fields[0].codigoPostal,
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

                        return respuesta.send({redirect:'/admin'});

                    }
                }
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
            let [fields] = solicitud.database.query(mysql.format(consulta,parametros))
            
                repetido = fields.some((usuario)=>{
                    usuario.email == email
                })
            }

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
                let [fields] = await solicitud.database.query(mysql.format(consulta,parametros))
                    /*
                      a diferencia de un select, que nos arroja un arreglo de objetos,
                      en un insert into, nos arroja un objeto, claro si nomas es asi, 
                      ya mas posterior dependiendo de si metemos triggers u otras cosas
                      sera diferente
                    */

                    let token_register = JsonWebToken.sign(
                        {user:fields.insertId},
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

                    const sending = await CrearCuentaEmail(email,"token",full_name,fields.insertId);

                    console.log(sending); // nos deberia imprimir la informacion acerca del envio

                    respuesta.send({redirect:'/admin'});
                }
            }
        }


        async function logout(solicitud,respuesta){
            await respuesta.clearCookie("Naruto_cookie");
            await respuesta.redirect('/');
        }
        


export const methods = {
    login,
    logout,
    register
}