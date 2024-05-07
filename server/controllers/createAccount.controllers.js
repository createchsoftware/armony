import bcryptjs from 'bcryptjs';
import JsonWebToken from 'jsonwebtoken';
import dotenv from 'dotenv';
import {methods as servicios} from "../services/mail.service.js";
import mysql from "mysql2";

const regex_email = /.+@(gmail|hotmail|icloud|outlook)\.com/;
const regex_lada = /\d{2}/;
const regex_nombres = /[a-zA-Zá-úñ]{3,11}/;
const regex_apellidos = /[a-zA-Zá-úñ]{3,}/;




async function paso1(solicitud,respuesta){

    let nombre = solicitud.body.nombre;
    let paterno = solicitud.body.paterno;
    let materno = solicitud.body.materno;
    let correo = solicitud.body.correo;
    let lada = solicitud.body.lada;
    let telefono = solicitud.body.telefono;
    let dia = solicitud.body.dia;
    let mes = solicitud.body.mes;
    let año = solicitud.body.año;
    let imagen = solicitud.body.imagen;
    let calle = solicitud.body.calle;
    let colonia = solicitud.body.colonia;
    let numero = solicitud.body.numero;
    let codigo_postal = solicitud.body.codigo_postal;

    let campos_faltantes = [];

    if(!nombre[0])
      campos_faltantes.push(nombre[1]);
    if(!paterno[0])
      campos_faltantes.push(paterno[1]);
    if(!materno[0])
      campos_faltantes.push(materno[1]);
    if(!correo[0])
      campos_faltantes.push(correo[1]);
    if(!lada[0])
      campos_faltantes.push(lada[1]);
    if(!telefono[0])
      campos_faltantes.push(telefono[1]);
    if(!dia[0])
      campos_faltantes.push(dia[1]);
    if(!mes[0])
      campos_faltantes.push(mes[1]);
    if(!año[0])
      campos_faltantes.push(año[1]);
    if(!calle[0])
      campos_faltantes.push(calle[1]);
    if(!colonia[0])
      campos_faltantes.push(colonia[1]);
    if(!numero[0])
      campos_faltantes.push(numero[1]);
    if(!codigo_postal[0])
      campos_faltantes.push(codigo_postal[1]);

      
    if(campos_faltantes.length > 0){
        // el usuario no lleno todos los campos
        respuesta.send({faltantes:campos_faltantes});
    }
    else{
        // toda verificar que los datos sean correctos


        let correo_valido = regex_email.test(correo[0]);
        let lada_valida = regex_lada.test(lada[0]);
        let nombre_valido = regex_nombres.test(nombre[0]);
        let paterno_valido = regex_apellidos.test(paterno[0]);
        let materno_valido = regex_apellidos.test(materno[0]);

        let campos_invalidos = [];


        if(nombre_valido == false)
           campos_invalidos.push(nombre[1]); 

        if(paterno_valido == false)
           campos_invalidos.push(paterno[1]);  

        if(materno_valido == false)
           campos_invalidos.push(materno[1]); 

        if(correo_valido == false)
           campos_invalidos.push(correo[1]);

        if(telefono[0].length > 10)
           campos_invalidos.push(telefono[1]);

        if(lada_valida == false)
           campos_invalidos.push(lada[1]);

        if(numero[0].length > 4)
          campos_invalidos.push(numero[1]);
        
        if(codigo_postal[0].length > 5)
          campos_invalidos.push(codigo_postal[1]);

        try{
          var fecha = new Date(`${mes[0]}/${dia[0]}/${año[0]}`);

        if(isNaN(fecha.getTime())){
          campos_invalidos.push(dia[1]);
          campos_invalidos.push(mes[1]);
          campos_invalidos.push(año[1]);
        }
        }catch(error){
          campos_invalidos.push(dia[1]);
          campos_invalidos.push(mes[1]);
          campos_invalidos.push(año[1]);
        }

        
        if(campos_invalidos.length > 0){
            // significa que hubo campos incorrectos
            respuesta.send({invalidos:campos_invalidos});
        }
        else{
            // ya que lo datos fueron ingresados correctamente, ahora toca

            //verificar que el email no exista

            let consulta = "select pkIdUsuario from usuario where email = ?"

            let [fields] = await solicitud.database.query(mysql.format(consulta,[correo[0]]))

                if(fields.length > 0 ){
                  respuesta.send({correo_ya_existente:true});
                }
                else{
                  // este token va a estar dentro de la cookie
                  let token = JsonWebToken.sign(
                    {
                        nombre:nombre[0],
                        paterno:paterno[0],
                        materno:materno[0],
                        correo:correo[0],
                        lada:lada[0],
                        telefono:telefono[0],
                        imagen:imagen[0],
                        calle:calle[0],
                        colonia:colonia[0],
                        numero:numero[0],
                        codigo_postal:codigo_postal[0],
                        dia:dia[0],
                        mes:mes[0],
                        año:año[0]
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
                  respuesta.cookie("Megumin_cookie",token,galleta_register);

                  // el usuario podra continuar con el apartado patologias
                  respuesta.send({redirect:"/spa/signUp/Patologia"}); 
                  }
        }
    }
}



async function paso2(solicitud,respuesta){


    if(solicitud.headers.cookie == undefined){
      // no tiene ninguna cookie, lo cual significa que no tiene la cookie megumin, que a su vez significa que no acompleto el paso1
      respuesta.send({redirect:"/spa/signUp"}); 
    }
    else{
      
      let galletas = solicitud.headers.cookie.split("; ");
      let galleta2 = galletas.find(galleta => galleta.startsWith("Nakano_Itsuki="));


      //verificar que existe la cookie Nakano Itsuki
      if(galleta2){
        //si existe, debemos eliminarla
        respuesta.clearCookie('Nakano_Itsuki', { path: '/' });
      }else{
        // ahora toca verificar que tenga la cookie megumin
        let galleta1 = galletas.find(galleta => galleta.startsWith("Megumin_cookie="));

        //verificar que existe la cookie Megumin
        if(galleta1){
          //ahora si podemos realizar nuestro codigo
          let regex_descripcion = /([a-zA-Zá-úÁ-Úñ]{1,15}\s[a-zA-Zá-úÁ-Úñ]{1,15})+/;

          let campos = [];

          let longitud = solicitud.body.cantidad;

          for(let iterador=1; iterador<=longitud; iterador++){
            campos.push(solicitud.body[`llave${iterador}`]);
          }

            
          let campos_vacios = [];

          for(let indice=0; indice<=longitud-1; indice++){
            if(campos[indice] == null){
              campos_vacios.push(`q${indice+1}`);
            }
          }

          if(campos_vacios.length > 0){

            respuesta.send({vacios:campos_vacios});
            console.log("no contestaste todos los campos");

          }
          else{

            let campos_incorrectos = [];

            let campos_si_correctos = [];

            for(let indice=0; indice<=longitud-1; indice++){

              if(campos[indice][1] == 1){
                //significa que contestaron que si

                //comprobar que hayan insertado algo valido no mames
                let insercion_valida = regex_descripcion.test(campos[indice][0]);

                if(insercion_valida == false){
                  campos_incorrectos.push(`q${indice+1}`);
                }else{
                  campos_si_correctos.push([campos[indice][2],campos[indice][0]])  // anadir el puro valor de texto
                }
              }

            }

            if(campos_incorrectos.length > 0){

              respuesta.send({incorrectos:campos_incorrectos});
              console.log("hubo campos incorrectos");

            }else{

              //si llego hasta aqui significa que ningun campo esta vacio, incompleto o correcto

              let cuerpo = {
                cantidad:campos_si_correctos.length
              };  // crear un objeto vacio por el momento

              console.log(campos_si_correctos);

              for(let i=0;i<campos_si_correctos.length;i++){
                  let llave = `patologia${i+1}`;
                  cuerpo[llave] = campos_si_correctos[i];
              }

              console.log(cuerpo);

              let token = JsonWebToken.sign(
                cuerpo,
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
              respuesta.cookie("Nakano_Itsuki",token,galleta_register);

              // el usuario podra continuar con el apartado patologias
              respuesta.send({redirect:"/spa/signUp/Contrasena"}); 
              

            }

          }
        }else{
          respuesta.send({redirect:"/spa/signUp"}); 
        }
      }
    }
  
  

}


async function paso3(solicitud,respuesta){

    if(solicitud.headers.cookie == undefined){
      // no tiene ninguna cookie, lo cual significa que no acompleto ni el paso1 ni el paso2
      respuesta.send({redirect:"/spa/signUp"}); 
    }
    else{
      let galletas = solicitud.headers.cookie.split("; ");
      let galleta1 = galletas.find(galleta => galleta.startsWith("Naruto_cookie="));
      let galleta2 = galletas.find(galleta => galleta.startsWith("Nakano_Itsuki="));

      if(galleta1){
        //galleta 1 existe
        if(galleta2){
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
            let regex_menor = /\w{1,8}/;
            
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
            }
            else{

                if(regex_mayor.test(contraseña)==true){
                  respuesta.send({fuera_rango:"mas de 20 caracteres"})
                }else{
                  if(contraseña.length<8){
                    respuesta.send({fuera_rango:"menos de 8 caracteres"})
                  }else{

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
                    respuesta.cookie("Rem_cookie",token,galleta_register);
              
                    // el usuario podra continuar con el apartado patologias
                    respuesta.send({redirect:"/spa/resetPassword",logueado:true}); 

                  }
                  
                }
            }
          }
        }
        else{
          // no existe la galleta 2 y debe regresarse a patologias
          respuesta.send({redirect:"/spa/signUp/Patologia"});
        }
      }
      else{
        //no existe la galleta 1 y se debe regresar al paso 1
        respuesta.send({redirect:"/spa/signUp"}); 
      }
    }

    
  

  
  
  

}
  




export const methods ={
  paso1,
  paso2,
  paso3
}