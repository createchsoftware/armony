import JsonWebToken from 'jsonwebtoken';
import dotenv from 'dotenv';
import {methods as servicios} from "../services/mail.service.js";
import {methods as sms} from "../services/sms.service.js";
import mysql from "mysql2";



async function confirmacion(solicitud,respuesta,siguiente){
    if(solicitud.headers.cookie == undefined){
        //no hay ninguna cookie
        return respuesta.redirect('/recuperacion/paso1');
    }
    else{
        let galletas = solicitud.headers.cookie.split('; ');
        let galletaNaruto = galletas.find(galleta=>galleta.startsWith('Naruto_cookie='));

        if(galletaNaruto){
            respuesta.redirect(windows.history.back);
        }
        else{
            let galleta1 = galletas.find(galleta=>galleta.startsWith('Akane_cookie='));
            let galleta2 = galletas.find(galleta=>galleta.startsWith('Himiko_toga='));
            let galleta3 =  galletas.find(galleta=>galleta.startsWith('Shiragiku_cookie='));
            let galleta4 =  galletas.find(galleta=>galleta.startsWith('Nezuko_Kamado='));

            if(galleta4){
                // ahora toca actualizar la base de datos

                galleta1 = galleta1.slice(13);
                galleta4 = galleta4.slice(14);

                let decodificada1 = await JsonWebToken.verify(galleta1,process.env.JWT_SECRET);
                let decodificada4 = await JsonWebToken.verify(galleta4,process.env.JWT_SECRET);

                let consulta = 'call UPD_PASS(?,?)';

                let salt =  await bcryptjs.genSalt(5);  //clave cryptografica de la contraseña del usuario
                let hashPassword =  await bcryptjs.hash(decodificada4.password,salt); 

                let parametros = [decodificada1.telefono_o_correo,hashPassword];

                let [fields] = await solicitud.database.query(mysql.format(consulta,parametros));

                //si todo salio bien, toca enviar un correo o SMS

                if(decodificada1.type == 'telefono'){
                    //enviar SMS
                    try{
                        await sms.SMS_CONGRALUATION(decodificada1.telefono_o_correo);
                        console.log('el SMS fue enviado exitosamente');
                        
                    }catch(error){
                        console.log(error);
                    }
                }
                else{
                    //enviar correo
                    try{
                        let sending = await servicios.Confirmacion_Contraseña("token",decodificada1.telefono_o_correo);
                        console.log('correo enviado');
                        console.log(sending);
                    }
                    catch(error){
                        console.log(error);
                    }
                }

                //ya que se cambio la contrasena y se envio la notificacion, toca eliminar las cookies
                respuesta.clearCookie('Akane_cookie', { path: '/' });
                respuesta.clearCookie('Himiko_toga', { path: '/' });
                respuesta.clearCookie('Shiragiku_cookie', { path: '/' });
                respuesta.clearCookie('Nezuko_Kamado', { path: '/' });
                

                return siguiente();

            }
            else{
                if(galleta3){
                    respuesta.redirect('/recuperacion/paso3');
                }
                else{
                    if(galleta2){
                        respuesta.redirect('/recuperacion/paso2');
                    }
                    else{
                        if(galleta1){
                            respuesta.redirect('/recuperacion/paso2');
                        }
                        else{
                            respuesta.redirect('/recuperacion/paso1');
                        }
                    }
                }
            }
        }
    }
}


export default confirmacion;