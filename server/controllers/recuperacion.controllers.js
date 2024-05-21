import JsonWebToken from 'jsonwebtoken';
import dotenv from 'dotenv';
import {methods as servicios} from "../services/mail.service.js";
import {methods as sms} from "../services/sms.service.js";
import mysql from "mysql2";



async function paso1(solicitud, respuesta){

    if(solicitud.headers.cookie != undefined){
        //hay cookies, pero a lo mejor no existe la cookie que queremos eliminar

        let galletas = solicitud.headers.cookie.split('; ');
        let galleta = galletas.find(galleta=> galleta.startsWith('Akane_cookie='));

        if(galleta){
            // el usuario ya habia puesto un correo o un telefono valido
            galleta = galleta.slice(13);

            let decodificada = await JsonWebToken.verify(galleta,process.env.JWT_SECRET);

            if(decodificada.type == 'correo' && solicitud.body.type == 'correo'){
                if(decodificada.telefono_o_correo = solicitud.body.correo){
                    return respuesta.send({redirect:'/recuperacion/paso2'});
                }
            }
            if(decodificada.type = 'telefono' && solicitud.body.type == 'telefono'){
                //verificar que los campos no se hayan cambiado
                try{
                    let lada = solicitud.body.lada;
                    let telefono = solicitud.body.telefono;

                    lada = lada.replace(/\+/g,'');
                    telefono = telefono.replace(/-/g,'');
                    telefono = telefono.replace(/ /g,'');

                    let ncompleto = lada + telefono;

                    if(ncompleto == decodificada.telefono_o_correo){
                        //ningun dato se cambio
                        return respuesta.send({redirect:'/recuperacion/paso2'});
                    }

                }catch(error){
                    // si hubo un error, es porque a lo mejor el usuario no puso un numero o lada valido, y por lo tanto, es diferente al numero que ya habiamos almacenado en la cookie
                }
            }

            respuesta.clearCookie('Akane_cookie', { path: '/' });

            //como el paso 1 fue cambiado, aunque se haya llegado a la confirmacion de la contrasena, todo debe ser cambiado
            let galleta2 = galletas.find(galleta=> galleta.startsWith('Himiko_Toga='));
            let galleta3 = galletas.find(galleta=> galleta.startsWith('Shiragiku_cookie='));

            if(galleta2){
                respuesta.clearCookie('Himiko_Toga', { path: '/' });
            }

            if(galleta3){
                respuesta.clearCookie('Shiragiku_cookie', { path: '/' });
            }
            
        }
    }


    //si llegamos hasta aqui es porque no se cumplio ningun de los redirect



    //seguimos con el siguiente paso
    let tipo = solicitud.body.type;
    let input ='';

    if(tipo == 'telefono'){

        let lada = solicitud.body.lada;
        let telefono = solicitud.body.telefono;
        let faltantes = [];
        

        if(!telefono || telefono==''){
            faltantes.push('telefono');
        }

        if(!lada || lada==''){
            faltantes.push('lada');
        }

        if(faltantes.length > 0){
            //hubo campos faltantes
            return respuesta.send({faltantes:faltantes});
        }
        else{
            // no hubo campos faltantes
            let invalidos = [];

            let regex_lada = /^\+?\d{1,3}$/;
            let regex_telefono = /^(\d{10}|\d{3} \d{7}|\d{3} \d{3} \d{4}|\d{3}-\d{7}|\d{3}-\d{3}-\d{4})$/;

            if(regex_lada.test(lada) == false){
                invalidos.push('lada');
            }

            if(regex_telefono.test(telefono) == false){
                invalidos.push('telefono');
            }

            if(invalidos.length > 0){
                //hubo campos invalidos
                return respuesta.send({invalidos:invalidos});
            }
            else{
                //no hubo campos invalidos

                telefono = telefono.replace(/-/g,'');
                telefono = telefono.replace(/ /g,'');
                lada = lada.replace('\+','');

                console.log('mi numero de telefono es: '+telefono);
                console.log('la lada de mi pais es: '+lada);
                
                let consulta = 'select telefono from usuario where telefono = ?';
                let telefono_completo = lada+telefono;
                let [fields] = await solicitud.database.query(mysql.format(consulta,[telefono_completo]));
                

                if(fields.length == 0){
                    //no hubo coincidencias en la base de datos
                    return respuesta.send({mensaje:'tu numero de telefono no pertenece a ninguna cuenta activa'});
                }
                else{
                    input = telefono_completo;
                }
                
            }




        

        }


        
    }
    else{
        //tipo es correo
        let correo = solicitud.body.correo;

        let faltantes = [];

        if(!correo || correo == ''){
            faltantes.push('correo');
        }

        if(faltantes.length > 0){
            return respuesta.send({faltantes:faltantes});
        }
        else{
            // no hubo campos invalidos
            let regex_correo = /^(\S+@(gmail|hotmail|icloud|outlook)\.com|\S*@itmexicali\.edu\.mx)$/;
            let invalidos = [];

            if(regex_correo.test(correo) == false){
                invalidos.push('correo');
            }

            if(invalidos.length > 0){
                return respuesta.send({invalidos:invalidos});
            }
            else{
                // no hubo campos incorrectos
                let consulta = 'select email from usuario where email = ?';
                let [fields] = await solicitud.database.query(mysql.format(consulta,[correo]));

                if(fields.length == 0){
                    return respuesta.send({mensaje:`no se encontro un cuenta activa con el correo: ${correo}`});
                }
                else{
                    input = correo;
                }
            }
        }
    



        
    }


    // si llego hasta aqui, es porque no paso por ningun return
    let token = JsonWebToken.sign(
        {
           telefono_o_correo:input,
           type:tipo
        },
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRATION}
      );

      // esto es un objeto
      let galleta_register = {
          maxAge:1000*60*20,
          // el expires es de tipo fecha
          expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
          path:'/'

      };

      // genero la cookie
      respuesta.cookie("Akane_cookie",token,galleta_register);

      return respuesta.send({redirect:'/recuperacion/paso2'});
}


async function paso2_enviar(solicitud,respuesta){

    if(solicitud.headers.cookie== undefined){
        //no exite la cookie del paso 1 y por lo tanto no puede hacer este paso
        return respuesta.send({redirect:'/recuperacion/paso1'});
    }
    else{
        // todavia no estamos seguros
        let galletas = solicitud.headers.cookie.split('; ');

        let galleta_correspondiente = galletas.find(galleta=>galleta.startsWith('Himiko_Toga='));

        if(galleta_correspondiente){
            // eso quiere decir que con anterioridad ya se habia mandado un SMS o un correo
            // primero toca verificar si ya se habia llegado mas lejos
            let galleta_paso3 = galletas.find(galleta=>galleta.startsWith('Shiragiku_cookie='));

            if(galleta_paso3){
                //significa que el usuario ya habia llegado hasta confirmacion de contrasena

                galleta_paso3 = galleta_paso3.slice(17);

                let decodificada = JsonWebToken.verify(galleta_paso3,process.env.JWT_SECRET);

                return respuesta.send({codigo:decodificada.codigo})
            }
            else{
                // significa que el usuario no ha comprobado su codigo aun
                respuesta.clearCookie('Himiko_Toga', { path: '/' });
                console.log('galleta eliminada exitosamente');
            }
        }


        let galleta_anterior = galletas.find(galleta=>galleta.startsWith('Akane_cookie='));

        if(galleta_anterior){
            // si esta la cookie del paso anterior y la cookie de este paso ya esta eliminada, seguimos

            galleta_anterior = galleta_anterior.slice(13);


            let decodificada = await JsonWebToken.verify(galleta_anterior,process.env.JWT_SECRET);

            let numero_random = parseInt(Math.random()*Math.pow(10,6));
            let codigo = numero_random.toString();
            let mensaje='';
            let enviada=false;
            
            if(decodificada.type == 'correo'){
                   // toca mandar un correo

                try{
                    let sending = await servicios.Codigo_de_Verificacion("token",decodificada.telefono_o_correo,codigo);
                    console.log('correo enviado');
                    console.log(sending);
                    enviada=true;
                    mensaje='El codigo de verificacion en llegara en unos segundos a tu correo';
                }
                catch(error){
                    console.log(error);
                    mensaje='Hubo un problema al enviar el codigo de verificacion a tu correo';
                }

            }
            else{
                // es de tipo telefono, toca mandar un sms

                try{
                    await sms.SMS_VERIFICACION(codigo,decodificada.telefono_o_correo);
                    console.log('el SMS fue enviado exitosamente');

                    mensaje = 'El SMS fue enviado, reciba tu celular';
                    enviada = true;
                }catch(error){
                    console.log(error);
                    mensaje = 'Hubo un problema al enviar el SMS'
                }

            }


            let token = JsonWebToken.sign(
                {
                   codigo:codigo,
                   enviada:enviada
                },
                process.env.JWT_SECRET,
                {expiresIn:process.env.JWT_EXPIRATION}
              );
        
              // esto es un objeto
              let galleta_register = {
                  maxAge:1000*60*20,
                  // el expires es de tipo fecha
                  expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                  path:'/'
        
              };
        
              // genero la cookie
              respuesta.cookie("Himiko_Toga",token,galleta_register);
        
              return respuesta.send({mensaje:mensaje});




        }
        else{
            return respuesta.send({redirect:'/recuperacion/paso1'});
        }
    }

}



async function paso2_procesar(solicitud,respuesta){
    if(solicitud.headers.cookie == undefined){
        // el usuario no tiene ninguna cookie lo cual significa que ni el paso 1 ha hecho
        return respuesta.send({redirect:'/recuperacion/paso1'});
    }
    else{
        let galletas = solicitud.headers.cookie.split('; ');

        let galleta_correspondiente = galletas.find(galleta=>galleta.startsWith('Shiraguki_cookie='));


        if(galleta_correspondiente){
            //el usuario ya verifico su codigo
            return respuesta.send({redirect:'/recuperacion/paso3'});
        }
        else{

        let galleta_primer = galletas.find(galleta=> galleta.startsWith("Akane_cookie="));
        let galleta_enviada = galletas.find(galleta=>galleta.startsWith('Himiko_Toga='));


        if(galleta_primer){
            if(galleta_enviada){
                //perfecto el paso 2 enviar fue completado
                galleta_enviada = galleta_enviada.slice(12);
    
                let decodificada = await JsonWebToken.verify(galleta_enviada,process.env.JWT_SECRET);
    
                if(decodificada.enviada == false){
                    return respuesta.send({mensaje:'tranquilo viejo, el sms o correo no se te han enviado aun'})
                }
                else{
                    //todo bien
    
                    let code = solicitud.body.codigo;
    
                    if(decodificada.codigo == code){
                        // el usuario ya tiene derecho de avanzar al paso 3
    
                        //levantar la otra cookie
                        let token = JsonWebToken.sign(
                            {
                               codigo:code,
                            },
                            process.env.JWT_SECRET,
                            {expiresIn:process.env.JWT_EXPIRATION}
                        );
                    
                        // esto es un objeto
                        let galleta_register = {
                              maxAge:1000*60*20,
                              // el expires es de tipo fecha
                              expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                              path:'/'
                    
                        };
                    
                        // genero la cookie
                        respuesta.cookie("Shiragiku_cookie",token,galleta_register);
    
    
                        return respuesta.send({redirect:'/recuperacion/paso3'});
                    }
                    else{
                        //el usuario no puede avanzar al paso 3 ni crear la cookie correspondiente
                        return respuesta.send({mensaje:'el codigo que ingresaste no es correcto'});
                    }

                }
                
    
                
                
    
            }
            else{
                return respuesta.send({mensaje:'tu sms o correo ya vencio, o sencillamente no se te envio, por favor genera uno nuevo'});
            }
        }
        else{
            return respuesta.send({redirect:'/recuperacion/paso1'});
        }
        }




        


        
        
    }

}


// async function showData(solicitud,respuesta){
//     if(solicitud.headers.cookie == undefined){
//         // el usuario no ha completado ningun paso
//         return respuesta.send({redirect:'/recuperacion/paso1'});
//     }
//     else{
//         let galletas = solicitud.headers.cookie.split('; ');

//         let galleta_correspondiente = galletas.find(galleta=>galleta.startsWith('Nezuko_Kamado='));

//         if(galleta_correspondiente){
//             //mostrar los datos que el usuario ya habia llenado
//             galleta_correspondiente = galleta_correspondiente.slice(14);

//             let decodificada = JsonWebToken.verify(galleta_correspondiente, process.env.JWT_SECRET);

//             return respuesta.send({pass1:decodificada.password, pass2:decodificada.confirmation});
//         }
//         else{
//             // no se pueden mostrar los datos
//             let galleta3 = galletas.find(galleta=>galleta.startsWith('Shiragiku_cookie='));
//             if(galleta3){
//                 // lo podemos dejar entrar al citio correspondiente
//                 return respuesta.send({mensaje:'puedes estar aqui'});
//             }
//             else{
//                 let galleta1 = galletas.find(galleta=>galleta.startsWith('Akane_cookie='));

//                 if(galleta1){
//                     return respuesta.send({redirect:'/recuperacion/paso2'});
//                 }
//                 else{
//                     return respuesta.send({redirect:'/recuperacion/paso1'});
//                 }
//             }
//         }
//     }
// }


async function paso3(solicitud,respuesta){
    if(solicitud.headers.cookie == undefined){
        return respuesta.send({redirect:'/recuperacion/paso1'});
    }
    else{
        let galletas = solicitud.headers.cookie.split('; ');
        
        let galleta3 = galletas.find(galleta=>galleta.startsWith("Shiragiku_cookie="));

        if(galleta3){
          //todo bien
          let contraseña = solicitud.body.pass;
          let confirmacion = solicitud.body.again_pass;

          if(contraseña !== confirmacion){
            respuesta.send({confirmar:true});
          }else{

            let arreglo_regex = [];
        
            let regex_numero = /\d/;
            let regex_caracter_especial = /[!@#\^\*\$%&`~\?_\+\/\\]/;
            let regex_Mayuscula = /[A-ZÁ-ÚÑ]/;
            let regex_minuscula = /[a-zá-úñ]/;
            let regex_mayor = /\w{20,}/;
            
            if(regex_numero.test(contraseña)==false){
              arreglo_regex.push("un numero");
            }

            if(regex_caracter_especial.test(contraseña)==false){
              arreglo_regex.push("un caracter especial");
            }

            if(regex_Mayuscula.test(contraseña)==false){
              arreglo_regex.push("una Mayuscula");
            }

            if(regex_minuscula.test(contraseña)==false){
              arreglo_regex.push("una minuscula");
            }

            
          
            if(arreglo_regex.length>0){
              respuesta.send({invalidas:arreglo_regex});
              console.log('por aqui');
            }
            else{

                if(regex_mayor.test(contraseña)==true){
                  respuesta.send({fuera_rango:"mas de 20 caracteres"})
                }else{
                  if(contraseña.length<8){
                    respuesta.send({fuera_rango:"menos de 8 caracteres"})
                  }else{

                    console.log('verdad que todo salio bien??');
                    // todo salio bien

                    let token = JsonWebToken.sign(
                      {
                          password:contraseña,
                          confirmation:confirmacion
                      },
                      process.env.JWT_SECRET,
                      {expiresIn:process.env.JWT_EXPIRATION}
                    );
              
                    // esto es un objeto
                    let galleta_register = {
                        maxAge:1000*60*20,
                        // el expires es de tipo fecha
                        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        path:'/'
              
                    };
              
                    // genero la cookie
                    respuesta.cookie("Nezuko_Kamado",token,galleta_register);
                    // el usuario podra continuar con el apartado patologias
                    respuesta.send({redirect:"/recuperacion/confirmacion"}); 

                  }
                  
                }
            }
          }

            
        }
        else{
            let galleta2 = galletas.find(galleta=>galleta.startsWith("Himiko_Toga="));

            if(galleta2){
                return respuesta.send({redirect:'/recuperacion/paso2'});
            }
            else{
                let galleta1 = galletas.find(galleta=>galleta.startsWith("Akane_cookie="));
                if(galleta1){
                    return respuesta.send({redirect:'/recuperacion/paso2'});
                }
                else{
                    return respuesta.send({redirect:'/recuperacion/paso1'});
                }
            } 
        }
    }
}





export const methods ={
    paso1,
    paso2_enviar,
    paso2_procesar,
    paso3
}