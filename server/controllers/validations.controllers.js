import JsonWebToken from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';
import mysql from "mysql2";
import {methods as servicios} from '../services/mail.service.js';

async function validarIdentidad(solicitud,respuesta){
    if(solicitud.headers.cookie == undefined){
        // el usuario no esta logueado
        return respuesta.send({redirect:'/'});
    }
    else{
        let galletas = solicitud.headers.cookie.split('; ');

        let galleta_login = galletas.find(galleta=>galleta.startsWith('Naruto_cookie='));

        if(galleta_login){
            // todo bien podemos seguir
            galleta_login = galleta_login.slice(14);

            let password = solicitud.body.password;


            //verificar si ya el usuario habia llenado su contrasena anteriormente

            let galleta_correspondiente = galletas.find(galleta=>galleta.startsWith('Mikasa_cookie='));

            if(galleta_correspondiente){
                // significa que el usuario ya habia acompletado este paso con anterioridad
                galleta_correspondiente = galleta_correspondiente.slice(14);

                if(password == galleta_correspondiente.contraseña){
                    // el campo no se cambio, lo redireccionamos solamente
                    return respuesta.send({next:true});
                }
                else{
                    respuesta.clearCookie('Mikasa_cookie', { path: '/' });
                }
                
            }
            
            let decodificada = await JsonWebToken.verify(galleta_login, process.env.JWT_SECRET);

            if(password == undefined || password==''){
                return respuesta.send({vacio:'Por favor, introduce una contraseña antes de continuar'});
            }
            else{
                
                // el usuario deperdida puso algo
                let contraseña_correcta = await bcryptjs.compare(password,decodificada.contraseña);

                if(contraseña_correcta != true){
                    return respuesta.send({incorrecto:'Su contraseña no es correcta'});
                }
                else{
                    // si el usuario lleno el campo y de forma correcta, toca levantar la cookie
                    let token = JsonWebToken.sign({
                        contraseña:password
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
                    respuesta.cookie("Mikasa_cookie",token,galleta_register);

                    return respuesta.send({next:true});
                }

            
                
            }

            
            
        }
        else{
            // mandar al usuario al inicio ya que no esta logueado
            return respuesta.send({redirect:'/'});
        }
    }

}




// aqui no se va a chekar la galleta correspondiente ya que es el ultimo paso
async function validarCorreo(solicitud,respuesta){
    if(solicitud.headers.cookie == undefined){
        return respuesta.send({redirect:'/'});
    }
    else{
        let galletas = solicitud.headers.cookie.split('; ');

        let galleta_login = galletas.find(galleta=> galleta.startsWith('Naruto_cookie='));

        if(galleta_login){

                //let galleta_anterior = galletas.find(galleta=> galleta.startsWith('Mikasa_cookie='));

            
                // el usuario si acompleto el paso anterior
                galleta_login = galleta_login.slice(14);

                let decodificada = await JsonWebToken.verify(galleta_login, process.env.JWT_SECRET);

                let correo_anterior = solicitud.body.correo_anterior;
                let correo_nuevo = solicitud.body.correo_nuevo;


                //verificar que los campos no esten vacios
                let vacios = [];

                if(!correo_anterior || correo_anterior == ''){
                    vacios.push('Ingresa tu correo anterior');
                }

                if(!correo_nuevo || correo_nuevo == ''){
                    vacios.push('Ingresa tu correo nuevo');
                }


                if(vacios.length > 0){
                    return respuesta.send({vacios:vacios});
                }
                else{
                    //verificar que el correo anterior sea el correspondiente
                    let incorrectos = [];
                    let regex_newEmail = /^\S+@(gmail\.com|hotmail\.com|outlook\.com|icloud.com|itmexicali\.edu\.mx|bc\.conalep\.edu\.mx|cecytebc\.edu\.mx|miprepacetis(75|18)\.mx|cobachbc\.edu\.mx|)$/;
                
                    if(correo_anterior != decodificada.correo){
                        incorrectos.push([0,'Tu correo no concuerda con el correo asociado a tu cuenta']);
                    }

                    if(regex_newEmail.test(correo_nuevo) == false){
                        incorrectos.push([1,'El nuevo correo que estas ingresando no es valido']);
                    }

                    if(incorrectos.length > 0){
                        return respuesta.send({incorrectos:incorrectos});
                    }
                    else{
                        // todo salio bien, toca modificar el correo

                        let consulta = 'update usuario set email = ? where email = ?';
                        let parametros = [correo_nuevo, correo_anterior];

                        try{
                            await solicitud.database.query(mysql.format(consulta,parametros));
                        }catch(error){
                            console.log(error);
                            return respuesta.send({reintento:'Algo salio mal, por favor, vuelve a intentar el cambio de correo'});
                        }

                        // si nada salio mal, entonces llegaremos a esta parte


                        try{
                            let full_name = `${decodificada.nombre} ${decodificada.paterno} ${decodificada.materno}`;
                            let sending = await servicios.Cambio_de_correo("token",full_name,decodificada.user,correo_nuevo);

                            console.log(sending); // para ver que es lo que nos arroja sending
                        }
                        catch(error){
                            // si hubo un error al mandar el correo, eso no afecta en que el usuario haya modificado su correo
                        }


                        //creamos el contenido de la nueva cookie
                        let contenido_naruto = {
                            user:decodificada.user,
                            nombre:decodificada.nombre,
                            paterno:decodificada.paterno,
                            materno:decodificada.materno,
                            correo:correo_nuevo, // almacenamos el correo nuevo
                            telefono:decodificada.telefono,
                            contraseña:decodificada.contraseña,  
                            tipo:decodificada.tipo,
                            imagen:decodificada.imagen,
                            calle:decodificada.calle,
                            colonia:decodificada.colonia,
                            numero:decodificada.numero,
                            postal:decodificada.postal,
                            nacimiento:decodificada.nacimiento
                        }

                        //eliminamos la cookie con la informacion desactualizada
                        respuesta.clearCookie('Naruto_cookie', { path: '/' });



                        let token = JsonWebToken.sign(
                            contenido_naruto,
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

                        // levantamos la cookie naruto de nuevo
                        respuesta.cookie("Naruto_cookie",token,galleta);
                        
                        
                        return respuesta.send({next:true});  // dejamos que el usuario vaya a la confirmacion
                    }
                }
                
            
              
        }
        else{
            return respuesta.send({redirect:'/'});
        }
    }
}



async function validarContrasena(solicitud,respuesta){
    if(solicitud.headers.cookie == undefined){
        return respuesta.send({redirect:'/'});
    }
    else{
        let galletas = solicitud.headers.cookie.split('; ');

        let galleta_login = galletas.find(galleta=>galleta.startsWith('Naruto_cookie='));

        if(galleta_login){

            console.log('el usuario esta logueado')

            galleta_login = galleta_login.slice(14);
            let decodificada = await JsonWebToken.verify(galleta_login, process.env.JWT_SECRET);

            let contraseña = solicitud.body.contraseña;
            let confirmacion = solicitud.body.confirmacion;
  
            if(contraseña !== confirmacion){
              console.log('antitrue');
              return respuesta.send({confirmar:'Las contraseñas son diferentes'});
            }else{
  
              let arreglo_regex = [];
          
              let regex_numero = /\d/;
              let regex_caracter_especial = /[!@#\^\*\$%&`~\?_\+\/\\]/;
              let regex_Mayuscula = /[A-ZÁ-ÚÑ]/;
              let regex_minuscula = /[a-zá-úñ]/;
              let regex_mayor = /\w{20,}/;
              
              if(regex_numero.test(contraseña)==false){
                arreglo_regex.push(1);
              }
  
              if(regex_caracter_especial.test(contraseña)==false){
                arreglo_regex.push(2);
              }
  
              if(regex_Mayuscula.test(contraseña)==false){
                arreglo_regex.push(3);
              }
  
              if(regex_minuscula.test(contraseña)==false){
                arreglo_regex.push(4);
              }
  
              if(regex_mayor.test(contraseña)==true){
                arreglo_regex.push(5);
              }
  
              if(contraseña.length<8){
                arreglo_regex.push(6);
              }
  
              
            
              if(arreglo_regex.length>0){
                respuesta.send({invalidas:arreglo_regex});
              }
              else{
                // la contrasena tanto confirmacion como normal son validas e iguales

                console.log('La contraseña que se esta intentando insertar es correcta');

                let salt =  await bcryptjs.genSalt(5);  //clave cryptografica de la contraseña del usuario
                let hashPassword =  await bcryptjs.hash(contraseña,salt); // encriptar la contraseña del usuario

                let consulta = 'call updUsuarioPass(?,?)';
                let parametros = [decodificada.user,hashPassword];

                try{
                    await solicitud.database.query(mysql.format(consulta,parametros));
                }
                catch(error){
                    console.log(error);
                    return respuesta.send({reintento:'Algo salio mal, por favor, vuelve a intentar el cambio de contraseña'});
                }


                // si no hubo error, seremos capaces de llegar hasta aqui
                try{
                    let sending = await servicios.Confirmacion_Contraseña("token",decodificada.correo);

                    console.log(sending); 
                }
                catch(error){
                    console.log(error);
                }


                //creamos el contenido de la nueva cookie
                let contenido_naruto = {
                    user:decodificada.user,
                    nombre:decodificada.nombre,
                    paterno:decodificada.paterno,
                    materno:decodificada.materno,
                    correo:decodificada.correo,
                    telefono:decodificada.telefono,
                    contraseña:hashPassword,  // nueva contraseña encriptada
                    tipo:decodificada.tipo,
                    imagen:decodificada.imagen,
                    calle:decodificada.calle,
                    colonia:decodificada.colonia,
                    numero:decodificada.numero,
                    postal:decodificada.postal,
                    nacimiento:decodificada.nacimiento
                }

                //eliminamos la cookie con la informacion desactualizada
                respuesta.clearCookie('Naruto_cookie', { path: '/' });



                let token = JsonWebToken.sign(
                    contenido_naruto,
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

                // levantamos la cookie naruto de nuevo
                respuesta.cookie("Naruto_cookie",token,galleta);
                
                
                return respuesta.send({next:true});  // dejamos que el usuario vaya a la confirmacion

              }
            }
        }
        else{
            respuesta.send({redirect:'/'});
        }
    }
}


export const methods = {
    validarIdentidad,
    validarCorreo,
    validarContrasena
}