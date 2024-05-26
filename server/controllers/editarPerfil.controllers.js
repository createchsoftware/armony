import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import {methods as servicios} from "../services/mail.service.js";
import mysql from "mysql2";


const regex_email = /^\S+@(gmail\.com|hotmail\.com|outlook\.com|icloud.com|itmexicali\.edu\.mx|bc\.conalep\.edu\.mx|cecytebc\.edu\.mx|miprepacetis(75|18)\.mx|cobachbc\.edu\.mx|)$/;
const regex_telefono =/^\+?\d{1,2}(-?| )(\d{9,10}|\d{2,3} \d{7}|\d{2,3} \d{3} \d{4}|\d{2,3}-\d{7}|\d{2,3}-\d{3}-\d{4})$/;
const regex_n_a = /^[a-zA-Zá-úñ]{3,17}$/;
const regex_postal = /^\d{5}$/;


async function change_data(solicitud,respuesta){

    console.log('se ejecuto el controller del back');


    if(solicitud.headers.cookie == undefined){
        //el usuario ya no esta logueado
        respuesta.send({redirect:'/'});
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

            let cuerpo = solicitud.body; //cuerpo es el objeto que contiene formData

            let campos_incorrectos = [];
        
            let paramteros = [];
        
            let consulta = "update usuario set ";

            let buzon = '';
            let sms = '';
        
        
            //datos del usuario
        
            if(cuerpo['nombre']){
                if(!regex_n_a.test(cuerpo['nombre']))
                    campos_incorrectos.push([cuerpo['nombre_id'],'tu nombre no es valido']);
                else{
                    consulta+="nombre = ?,";
                    paramteros.push(cuerpo['nombre']);
                }
            }
        
            if(cuerpo['paterno']){
                if(!regex_n_a.test(cuerpo['paterno']))
                    campos_incorrectos.push([cuerpo['paterno_id'],'tu apellido paterno no es valido']);
                else{
                    consulta+="apellidoP = ?,";
                    paramteros.push(cuerpo['paterno']);
                }
            }
        
            if(cuerpo['materno']){
                if(!regex_n_a.test(cuerpo['materno']))
                    campos_incorrectos.push([cuerpo['materno_id'],'tu apellido materno no es valido']);
                else{
                    consulta+="apellidoM = ?,";
                    paramteros.push(cuerpo['materno']);
                }
            }
        
            if(cuerpo['correo']){
                if(!regex_email.test(cuerpo['correo']))
                    campos_incorrectos.push([cuerpo['correo_id'],'tu correo no es un correo valido']);
                else{
                    consulta+="email= ?,";
                    buzon = cuerpo['correo'];
                    paramteros.push(cuerpo['correo']);
                }
            }
        
            if(cuerpo['telefono']){
                let phone = cuerpo['telefono'];

                if(!regex_telefono.test(phone))
                    campos_incorrectos.push([cuerpo['telefono_id'],'tu telefono no es un telefono valido']);
                else{
                    consulta+="telefono= ?,";
                    phone = phone.replace('\+','');
                    phone = phone.replace(/-/g,'');
                    phone = phone.replace(/ /g,'');

                    sms = phone;
                    paramteros.push(phone);
                }
            }


            let imagen = solicitud.file;

            if(imagen != undefined){
                consulta+="img= ?,";
                paramteros.push(imagen.filename);
            }
        
        
            //direccion
            if(cuerpo['numero']){
                if(cuerpo['numero'].length > 4)
                    campos_incorrectos.push([cuerpo['numero_id'],'el numero de tu casa es incorrecto']);
                else{
                    consulta+="numero= ?,";
                    paramteros.push(cuerpo['numero']);
                }
            }
        
            if(cuerpo['codigo_postal']){
                if(!regex_postal.test(cuerpo['codigo_postal']))
                    campos_incorrectos.push([cuerpo['codigo_postal_id'],'tu codigo postal debe tener 5 digitos']);
                else{
                    consulta+="codigoPostal = ?,";
                    paramteros.push(cuerpo['codigo_postal']);
                }
            }

            if(cuerpo['calle']){
                consulta+="calle= ?,";
                paramteros.push(cuerpo['calle']);
            }

            if(cuerpo['colonia']){
                consulta+="colonia= ?,";
                paramteros.push(cuerpo['colonia']);
            }


            

            try{

                if(cuerpo['mes'] && cuerpo['dia'] && cuerpo['año']){

                    let mes = cuerpo['mes'];
                    let dia = cuerpo['dia'];
                    let año = cuerpo['año'];

                    let fecha = new Date(`${mes}/${dia}/${año}`);

                    if(isNaN(fecha.getTime())){
                        campos_incorrectos.push(['dia','']);
                        campos_incorrectos.push(['mes','']);
                        campos_incorrectos.push(['año','']);
                    }
                    else{
                        let newStringFecha = `${año}-${mes}-${dia}`;
                        consulta+="fechaNac = ?,"
                        paramteros.push(newStringFecha);
                    }
                }
                else{
                    if(cuerpo['mes'] || cuerpo['dia'] || cuerpo['año']){
                        campos_incorrectos.push(["dia",'']);  // el id del input
                        campos_incorrectos.push(["mes",'']);  // el id del input
                        campos_incorrectos.push(["año",'']);  // el id del input
                    }
                    //si no se cumplio el if de arriba es porque simplemente no se hizo una modificacion

                }
                
                
            }catch(error){
                campos_incorrectos.push(["dia",'']);  // el id del input
                campos_incorrectos.push(["mes",'']);  // el id del input
                campos_incorrectos.push(["año",'']);  // el id del input
            }

            
        
            if(campos_incorrectos.length > 0 ){
                console.log(campos_incorrectos);
                respuesta.send({incorrectos:campos_incorrectos});
            }
            else{
                // significa que no hubo campos incorrectos
                let repetidos = [];

                //verificar que el correo no este repetido
                let consult = "select pkIdUsuario from usuario where email = ?"
                let [fields] = await solicitud.database.query(mysql.format(consult,[buzon]));


                //verificar que el telefono no este repetido
                let consult_tel = "select pkIdUsuario from usuario where telefono = ?"
                let [fields_tel] = await solicitud.database.query(mysql.format(consult_tel,[sms]));


                if(fields.length > 0){
                    repetidos.push([cuerpo['correo_id'],' ya existe una cuenta con tu correo']);
                }

                if(fields_tel.length > 0){
                    repetidos.push([cuerpo['telefono_id'],' ya existe una cuenta con tu numero telefonico']);
                }


                if(repetidos.length == 0){

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





                                if(buzon.length > 0 &&   buzon==fields[0].email){
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
                    return respuesta.send({repetidos:repetidos});
                }
                
        
            }


        }
        else{
            //algo paso, el usuario ya no esta logueado, por lo que todo se cancela
            respuesta.send({redirect:'/'});
        }
    }


    

    
}




export const methods ={
    change_data
}