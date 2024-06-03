import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import {methods as servicios} from "../services/mail.service.js";
import mysql from "mysql2";


const regex_email = /^\S+@(gmail\.com|hotmail\.com|outlook\.com|icloud.com|itmexicali\.edu\.mx|bc\.conalep\.edu\.mx|cecytebc\.edu\.mx|miprepacetis(75|18)\.mx|cobachbc\.edu\.mx|)$/;
const regex_telefono =/^(\d{9,10}|\d{2,3} \d{7}|\d{2,3} \d{3} \d{4}|\d{2,3}-\d{7}|\d{2,3}-\d{3}-\d{4})$/;
const regex_n_a = /^[a-zA-Zá-úñ]{3,17}$/;
const regex_postal = /^\d{5}$/;
const regex_lada = /^\+?\d{1,3}$/;


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
        
        
            if(cuerpo['telefono'] && cuerpo['lada']){
                let phone = cuerpo['telefono'];
                let lada = cuerpo['lada'];

                let avanzar = true;


                if(!regex_telefono.test(phone)){
                    campos_incorrectos.push([cuerpo['telefono_id'],'tu telefono no es un telefono valido']);
                    avanzar = false;
                }
                if(!regex_lada.test(lada)){
                    campos_incorrectos.push([cuerpo['lada_id'],'La lada no es una lada valida']);
                    avanzar = false;
                }
                    
                if(avanzar == true){
                    consulta+="telefono= ?,";
                    
                    phone = phone.replace(/-/g,'');
                    phone = phone.replace(/ /g,'');

                    lada = lada.replace('\+','');

                    sms = lada+phone;
                    paramteros.push(lada+phone);
                }
            }
            else{
                if(cuerpo['telefono'] && !cuerpo['lada']){
                    //significa que la persona si puso el telefono pero no la lada
                    campos_incorrectos.push([cuerpo['telefono_id'],'No puede ingresar un numero telefonico sin una lada']);
                }
                if(!cuerpo['telefono'] && cuerpo['lada']){
                    // signfica que la persona si puso la lada pero no el telefono
                    campos_incorrectos.push([cuerpo['lada_id'],'No puede ingresar una lada sin un numero telefonico']);
                }
                // si la persona no puso ninguno de los dos, sencillamente no hacemos nada
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

                //verificar que el telefono no este repetido
                let consult_tel = "select pkIdUsuario from usuario where telefono = ?"
                let [fields_tel] = await solicitud.database.query(mysql.format(consult_tel,[sms]));

                if(fields_tel.length > 0){
                    repetidos.push([cuerpo['telefono_id'],' ya existe una cuenta con tu numero telefonico']);
                }


                if(repetidos.length == 0){

                    consulta = consulta.slice(0, -1); // cortamos el ultimo ,
                    consulta+= ' where pkIdUsuario = ?';
                    
                    paramteros.push(decodificada.user);
            
                    console.log(paramteros);
                    console.log(consulta);
            
                    await solicitud.database.query(mysql.format(consulta, paramteros))
                    

                    try{
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