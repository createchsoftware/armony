import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import {methods as servicios} from "../services/mail.service.js";
import mysql from "mysql2";


const regex_email = /^\S+@(gmail|hotmail|icloud|outlook)\.(com)$/;
const regex_lada = /\d{2}/;
const regex_telefono =/^\d{7}$/;
const regex_n_a = /^[a-zA-Zá-úñ]{3,17}$/;


async function change_data(solicitud,respuesta){


    if(solicitud.headers.cookie == undefined){
        //el usuario ya no esta logueado
        respuesta.send({logueado:false});
    }
    else{
        //verificar que la cookie naruto sea la que exista
        let galletas = solicitud.headers.cookie.split("; ");
        let galleta = galletas.find(galleta => galleta.startsWith("Naruto_cookie="));

        if(galleta){
            //significa que la galleta naruto existe

            galleta = galleta.slice(14);

            let decodificada = await jsonwebtoken.verify(galleta, process.env.JWT_SECRET); // decodificar galleta 1

            let C_L = decodificada.user;

            let cuerpo = solicitud.body; //cuerpo es un objeto

            let campos_incorrectos = [];
        
            let paramteros = [];
        
            let consulta = "update usuario set ";

            let buzon = '';
        
        
            //datos del usuario
        
            if(cuerpo['nombre']){
                if(!regex_n_a.test(cuerpo['nombre'][0]))
                    campos_incorrectos.push(cuerpo['nombre'][1]);
                else{
                    consulta+="nombre = ?,";
                    paramteros.push(cuerpo['nombre'][0]);
                }
            }
        
            if(cuerpo['paterno']){
                if(!regex_n_a.test(cuerpo['paterno'][0]))
                    campos_incorrectos.push(cuerpo['paterno'][1]);
                else{
                    consulta+="apellidoP = ?,";
                    paramteros.push(cuerpo['paterno'][0]);
                }
            }
        
            if(cuerpo['materno']){
                if(!regex_n_a.test(cuerpo['materno'][0]))
                    campos_incorrectos.push(cuerpo['materno'][1]);
                else{
                    consulta+="apellidoM = ?,";
                    paramteros.push(cuerpo['materno'][0]);
                }
            }
        
            if(cuerpo['correo']){
                if(!regex_email.test(cuerpo['correo'][0]))
                    campos_incorrectos.push(cuerpo['correo'][1]);
                else{
                    consulta+="email= ?,";
                    buzon = cuerpo['correo'][0];
                    paramteros.push(cuerpo['correo'][0]);
                }
            }
        
            if(cuerpo['telefono']){
                if(!regex_telefono.test(cuerpo['telefono'][0]))
                    campos_incorrectos.push(cuerpo['telefono'][1]);
                else{
                    consulta+="telefono= ?,";
                    paramteros.push(cuerpo['telefono'][0]);
                }
            }

            if(cuerpo['imagen']){
                consulta+="img= ?,";
                paramteros.push(cuerpo['imagen'][0]);
            }
        
        
            //direccion
            if(cuerpo['numero']){
                if(cuerpo['numero'][0].length > 4)
                    campos_incorrectos.push(cuerpo['numero'][1]);
                else{
                    consulta+="numero= ?,";
                    paramteros.push(cuerpo['numero'][0]);
                }
            }
        
            if(cuerpo['codigoP']){
                if(cuerpo['codigoP'][0].length > 5)
                    campos_incorrectos.push(cuerpo['codigoP'][1]);
                else{
                    consulta+="codigoPostal = ?,";
                    paramteros.push(cuerpo['codigoP'][0]);
                }
            }

            if(cuerpo['calle']){
                consulta+="calle= ?,";
                paramteros.push(cuerpo['calle'][0]);
            }

            if(cuerpo['colonia']){
                consulta+="colonia= ?,";
                paramteros.push(cuerpo['colonia'][0]);
            }


            

            try{

                if(cuerpo['mes'] && cuerpo['dia'] && cuerpo['año']){

                    let mes = cuerpo['mes'];
                    let dia = cuerpo['dia'];
                    let año = cuerpo['año'];

                    let fecha = new Date(`${mes[0]}/${dia[0]}/${año[0]}`);

                    if(isNaN(fecha.getTime())){

                        console.log("NAAAAAANNNNN");

                        campos_incorrectos.push(dia[1]);
                        campos_incorrectos.push(mes[1]);
                        campos_incorrectos.push(año[1]);
                    }
                    else{
                        let newStringFecha = `${año[0]}-${mes[0]}-${dia[0]}`;
                        consulta+="fechaNac = ?,"
                        paramteros.push(newStringFecha);
                    }
                }
                else{
                    if(cuerpo['mes'] || cuerpo['dia'] || cuerpo['año']){

                        console.log("debes de llenar todos los campos");
                        campos_incorrectos.push("dia");  // el id del input
                        campos_incorrectos.push("mes");  // el id del input
                        campos_incorrectos.push("año");  // el id del input
                    }
                    //si no se cumplio el if de arriba es porque simplemente no se hizo una modificacion

                }
                
                
            }catch(error){


                console.log("errrrrorrrr");
                campos_incorrectos.push("dia");  // el id del input
                campos_incorrectos.push("mes");  // el id del input
                campos_incorrectos.push("año");  // el id del input
            }

            
        
            if(campos_incorrectos.length > 0 ){
                console.log(campos_incorrectos);
                respuesta.send({incorrectos:campos_incorrectos});
            }
            else{

                // significa que no hubo campos incorrectos

                let consult = "select nombre from usuario where email = ?"
                //verificar que el correo no este repetido


                console.log("pasaste la etapa de datos incorrectos");
                console.log("buzon");
                let insercion_exitosa = new Promise(async (resolve, reject) => {
                    await solicitud.database.query(mysql.format(consult, buzon))
                        if(resultados.length > 0){
                            console.log("al parecer si hubo una coincidencia");
                            resolve(false);
                        }
                        else{
                            console.log("perfecto, no hubo coincidencias")
                            resolve(true);  // lo correcto es que no haya coincidencias, osea que la longitud debe ser 0
                        }
                      
                });

                let primer_resultado_mysql = await insercion_exitosa

                if( primer_resultado_mysql == true){

                    consulta = consulta.slice(0, -1); // cortamos el ultimo ,
                    consulta+= ' where pkIdUsuario = ?';
                    
                    paramteros.push(decodificada.user);
            
                    console.log(paramteros);
                    console.log(consulta);
            
                    let insercion_exitosa2 = new Promise(async (resolve, reject) => {
                        await solicitud.database.query(mysql.format(consulta, paramteros))
                            resolve(true);
                    });

                    try{

                        let segundo_resultado_mysql = await insercion_exitosa2;

                        if(segundo_resultado_mysql == true){

                            respuesta.clearCookie('Naruto_cookie', { path: '/' }); 

                            //toca jalar la informacion
                            let ultima_consulta = 'select * from usuario where pkIdUsuario = ?';

                            let [fields] = await solicitud.database.query(ultima_consulta, C_L)

                                let contraseña_bytes = fields[0].pass; // contrasena en bytes desde la base de datos
                                let contraseña_no_bytes = contraseña_bytes.toString('utf-8'); //contrasena en string, pero sigue estando encriptada
                                

                                // toca levantar una nueva Naruto_cookie
                                let token = jsonwebtoken.sign(
                                    {
                                        user:C_L,
                                        nombre:fields[0].nombre,
                                        paterno:fields[0].apellidoP,
                                        materno:fields[0].apellidoM,
                                        correo:fields[0].email,
                                        telefono:fields[0].telefono,
                                        contraseña:contraseña_no_bytes,  // contrasena encriptada detro de la cookie
                                        tipo:1,
                                        imagen:fields[0].img,
                                        calle:fields[0].calle,
                                        colonia:fields[0].colonia,
                                        numero:fields[0].numero,
                                        postal:fields[0].codigoPostal,
                                        nacimiento:fields[0].fechaNac
            
                                    },
                                    process.env.JWT_SECRET,
                                    {expiresIn:process.env.JWT_EXPIRATION}
                                );

                                let galleta = {
                                    maxAge:1*1000*60*30, // 30 minutos
                                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                                    path:'/'
                                }
            
                                respuesta.cookie("Naruto_cookie",token,galleta);





                                if(buzon.length > 0 &&   buzon!=fields[0].email){
                                    //toca mandar correo
                                    let full_name = `${fields[0].nombre} ${fields[0].apellidoP} ${fields[0].apellidoM}`;
                                    let sending = await servicios.Cambio_de_correo("token",full_name,fields[0].pkIdUsuario,fields[0].email);
                                    console.log(sending);
                                    respuesta.send({redirect:'/perfil/informacion'});
                                }
                                else{
                                    console.log("como no modificaste tu correo, no se te mandara nada");
                                    respuesta.send({redirect:'/perfil/informacion'});
                                }


                                // si los correos son iguales, significa que el usuario no cambio de correo
                                // si buzon no tiene nada, logico sera diferente a nuestro correo, por eso verificamos el length de la variable buzon
                                
                        }
                        else{
                            console.log("el error raro del try catch");
                            respuesta.send({no_step:true});
                        }

                    }catch(error){
                        throw error;
                    }

                }
                else{
                    respuesta.send({correo_existente:true})
                }
                
        
            }


        }
        else{
            //algo paso, el usuario ya no esta logueado, por lo que todo se cancela
            respuesta.send({logueado:false});
        }
    }


    

    
}




export const methods ={
    change_data
}