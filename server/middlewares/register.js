import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import mysql from "mysql2";
import {methods as servicios} from "../services/mail.service.js";

dotenv.config();

async function InsertUser(solicitud,respuesta,siguiente){
    if(solicitud.headers.cookie == undefined){
        respuesta.send({megumin_cookie:false});
    }
    else{
        let galletas = solicitud.headers.cookie.split("; ");

        let galleta1 = galletas.find(galleta => galleta.startsWith("Megumin_cookie="));
        let galleta2 = galletas.find(galleta => galleta.startsWith("Nakano_Itsuki="));
        let galleta3 = galletas.find(galleta => galleta.startsWith("Rem_cookie="));

        let galleta4 = galletas.find(galleta => galleta.startsWith("Naruto_cookie="));


        if(galleta4){
            // si la galleta4 existe, no nos dejara hacer la insercion
            if(galleta1 && galleta2 && galleta3){
                //si tambien existen las otras galletas, eliminarlas
                respuesta.clearCookie('Megumin_cookie', { path: '/' });
                respuesta.clearCookie('Nakano_Itsuki', { path: '/' });
                respuesta.clearCookie('Rem_cookie', { path: '/' });
            }
            return siguiente()   
        }
        else{

            if(galleta1 && galleta2 && galleta3){
                //ambas galletas existen
                galleta1 = galleta1.slice(15);
                galleta2 = galleta2.slice(14);
                galleta3 = galleta3.slice(11);
    
                    let decodificada1 = await jsonwebtoken.verify(galleta1, process.env.JWT_SECRET); // decodificar galleta 1
                    let decodificada2 = await jsonwebtoken.verify(galleta2, process.env.JWT_SECRET); // decodificar galleta 2
                    let decodificada3 = await jsonwebtoken.verify(galleta3, process.env.JWT_SECRET); // decodificar galleta 3
    
                    let consulta = "insert into usuario values (null,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    
                    let telefono_completo = decodificada1.lada + decodificada1.telefono;
                    let nacimiento = `${decodificada1.año}-${decodificada1.mes}-${decodificada1.dia}`;
    
    
                    let salt =  await bcryptjs.genSalt(5);  //clave cryptografica de la contraseña del usuario
                    let hashPassword =  await bcryptjs.hash(decodificada3.password,salt);  // contraseña cryptografica
    
                    
    
                    let parametros = [decodificada1.nombre,decodificada1.paterno,decodificada1.materno,decodificada1.correo,telefono_completo,hashPassword,1,decodificada1.imagen,decodificada1.calle,decodificada1.colonia,decodificada1.numero,decodificada1.codigo_postal,nacimiento]
    
    
                    console.log(decodificada1);
                    
                    // utilizamos una promesa para esperar que la funcion asincrona se termine
                try{
    
                    let insercion_exitosa = new Promise(async (resolve, reject) => {
                        let [fields] = await solicitud.database.query(consulta, parametros)
                            
                            resolve(fields.insertId);
                            
                    });
    
                    const id_usuario = await insercion_exitosa;
                        
    
    
                        let token = jsonwebtoken.sign(
                            {
                                user:id_usuario,
                                nombre:decodificada1.nombre,
                                paterno:decodificada1.paterno,
                                materno:decodificada1.materno,
                                correo:decodificada1.correo,
                                telefono:telefono_completo,
                                contraseña:hashPassword,  // contrasena encriptada detro de la cookie
                                tipo:1,
                                imagen:decodificada1.imagen,
                                calle:decodificada1.calle,
                                colonia:decodificada1.colonia,
                                numero:decodificada1.numero,
                                postal:decodificada1.codigo_postal,
                                nacimiento:nacimiento
    
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
    
    
                        let full_name = `${decodificada1.nombre} ${decodificada1.paterno} ${decodificada1.materno}`;
    
                        let sending = await servicios.CrearCuentaEmail(decodificada1.correo,"token",full_name,id_usuario);
    
                        console.log(sending); // nos deberia imprimir la informacion acerca del envio

                        respuesta.clearCookie('Megumin_cookie', { path: '/' });
                        respuesta.clearCookie('Nakano_Itsuki', { path: '/' });
                        respuesta.clearCookie('Rem_cookie', { path: '/' });
    
                        return siguiente();
                    
                }
                catch(error){
                    throw error;
                    return respuesta.redirect('/');
                }
            }
            else{
                console.log("alguna de las 3 galletas no exite, por lo que no se puede hacer la insercion");
                //aunque seria bueno poner un siguiente, no quiero ponerlo
                return respuesta.redirect('/');
            }
        }

        
    }
}



export default InsertUser;