import bcryptjs from 'bcryptjs';
import JsonWebToken from 'jsonwebtoken';
import dotenv from 'dotenv';
import {methods as servicios} from "../services/mail.service.js";
import mysql from "mysql2";
import fs from 'fs';

const regex_email = /^\S+@(gmail\.com|hotmail\.com|outlook\.com|icloud.com|itmexicali\.edu\.mx|bc\.conalep\.edu\.mx|cecytebc\.edu\.mx|miprepacetis(75|18)\.mx|cobachbc\.edu\.mx|)$/;
const regex_nombres = /[a-zA-Zá-úñ]{3,11}/;
const regex_apellidos = /[a-zA-Zá-úñ]{3,}/;
const regex_lada = /^\+?\d{1,3}$/;
const regex_telefono = /^(\d{9,10}|\d{2,3} \d{7}|\d{2,3} \d{3} \d{4}|\d{2,3}-\d{7}|\d{2,3}-\d{3}-\d{4})$/;
const regex_postal = /^\d{5}$/;
const regex_numero = /^\S{1,10}$/;




// INFORMACION BASICA
async function paso1(solicitud,respuesta){

      if(solicitud.headers.cookie != undefined){

        let galletas = solicitud.headers.cookie.split('; ');
        let galleta_login = galletas.find(galleta => galleta.startsWith('Naruto_cookie='));

        if(galleta_login){
          return respuesta.send({redirect:'/'});
        }
        

        let galleta_correspondiente = galletas.find(galleta => galleta.startsWith('Megumin_cookie='));
        if(galleta_correspondiente){
          //vamos a decodificar la galleta
          galleta_correspondiente = galleta_correspondiente.slice(15);


          let decodificada = await JsonWebToken.verify(galleta_correspondiente,process.env.JWT_SECRET);

          eliminar(decodificada.imagen); // esto nos eliminar una imagen si es diferente de undefined

          let l = solicitud.body.lada;
          let t = solicitud.body.telefono;

          if(l!= undefined && t!= undefined){
              t = t.replace(/-/g,'');
              t = t.replace(/ /g,'');
              l = l.replace('\+','');

              let comparador = {
                nombre:solicitud.body.nombre,
                apodo:'Itsuki',
                paterno:solicitud.body.paterno,
                materno:solicitud.body.materno,
                correo:solicitud.body.correo,
                lada:l,
                telefono:t,
                imagen:solicitud.file,
                calle:solicitud.body.calle,
                colonia:solicitud.body.colonia,
                numero:solicitud.body.numero,
                codigo_postal:solicitud.body.codigo_postal,
                dia:solicitud.body.dia,
                mes:solicitud.body.mes,
                año:solicitud.body.year
              }

              //ahora comparamos lo que el usuario tiene vs lo que se habia guardado anteriormente
              if(JSON.stringify(comparador) == JSON.stringify(decodificada)){
                console.log('los datos no se cambiaron con respecto a la ultima vez');
                return respuesta.send({redirect:'/spa/signUp/Patologia'});
              }
            
          }
          // si llegamos hasta aqui, es porque si existe la galleta correspondiente, pero los datos han sido cambiados
          respuesta.clearCookie('Megumin_cookie', { path: '/' });
          

        }
        

      }



      
      //  el usuario esta logueado y debemos de sacarlo
      //  INICIO 1 RECIBIR LOS DATOS QUE EL USUARIO LLENO EN EL FORMULARIO DESDE EL CLIENT
  
        let nombre_id = solicitud.body.nombre_id
        let nombre = solicitud.body.nombre;

        let paterno_id = solicitud.body.paterno_id;
        let paterno = solicitud.body.paterno;

        let materno_id = solicitud.body.materno_id;
        let materno = solicitud.body.materno;

        let correo_id = solicitud.body.correo_id;
        let correo = solicitud.body.correo;

        let lada_id = solicitud.body.lada_id;
        let lada = solicitud.body.lada;

        let telefono_id = solicitud.body.telefono_id;
        let telefono = solicitud.body.telefono;

        let dia_id = solicitud.body.dia_id;
        let dia = solicitud.body.dia;

        let mes_id = solicitud.body.mes_id;
        let mes = solicitud.body.mes;

        let año_id = solicitud.body.year_id;
        let año = solicitud.body.year;

        let imagen = solicitud.file;

        let calle_id = solicitud.body.calle_id;
        let calle = solicitud.body.calle;

        let colonia_id = solicitud.body.colonia_id;
        let colonia = solicitud.body.colonia;

        let numero_id = solicitud.body.numero_id;
        let numero = solicitud.body.numero;

        let codigo_postal_id = solicitud.body.codigo_postal_id;
        let codigo_postal = solicitud.body.codigo_postal;

        let apodo_id = 'apodo';
        let apodo = 'Itsuki';

        //FIN 1
      
      
        // INICIO 2  CREAR UN ARREGLO QUE ALMACENARA CAMPOS SIN CONTESTAR
        let campos_faltantes = [];

        if(!nombre || nombre==''){
          campos_faltantes.push([nombre_id,'tu nombre']);
        }
          
        if(!apodo || apodo==''){
          campos_faltantes.push(apodo_id,'tu apodo');
        }
          
        if(!paterno || paterno==''){
          campos_faltantes.push([paterno_id,'tu apellido paterno']);
        }
          
        if(!materno || materno==''){
          campos_faltantes.push([materno_id,'tu apellido materno']);
        }
          
        if(!correo || correo==''){
          campos_faltantes.push([correo_id,'tu correo']);
        }
          
        if(!lada || lada==''){
          campos_faltantes.push([lada_id,'la lada de tu país']);
        }
          
        if(!telefono || telefono==''){
          campos_faltantes.push([telefono_id,'tu teléfono']);
        }
          
        if(!año || año=='' || !mes || mes=='' || !dia || dia ==''){
          campos_faltantes.push([dia_id,'']);
          campos_faltantes.push([mes_id,'']);
          campos_faltantes.push([año_id,'todos los campos correspondientes a fecha']);
        }
          
        if(!calle || calle==''){
          campos_faltantes.push([calle_id,'tu calle']);
        }
          
        if(!colonia || colonia==''){
          campos_faltantes.push([colonia_id,'tu colonia']);
        }
          
        if(!numero || numero==''){
          campos_faltantes.push([numero_id,'el número de tu casa']);
        }
          
        if(!codigo_postal || codigo_postal==''){
          campos_faltantes.push([codigo_postal_id,'tu código postal']);
        }
          

        // FIN - 2

        

      // si el arreglo tiene una longitud mayor a 0, significa que si hubo campos sin contestar
      if(campos_faltantes.length > 0){
          eliminar(imagen);
          return respuesta.send({faltantes:campos_faltantes});
      }
      else{
          // si llegamos hasta este ELSE, signifca que la longitud es 0, y por lo tanto, el usuario lleno todos los datos




          // INICIO 3 QUE EL USUARIO HAYA LLENADO TODOS LOS DATOS, NO SIGNIFCA QUE LOS HAYA LLENADO CORRECTAMENTE, AHORA TOCA VERIFICAR QUE LOS DATOS SEAN VALIDOS  

          let correo_valido = regex_email.test(correo);
          let lada_valida = regex_lada.test(lada);
          let nombre_valido = regex_nombres.test(nombre);
          let paterno_valido = regex_apellidos.test(paterno);
          let materno_valido = regex_apellidos.test(materno);
          let telefono_valido = regex_telefono.test(telefono);
          let postal_valido = regex_postal.test(codigo_postal);

          // CREAR OTRO ARREGLO QUE ALMACENARA LOS CAMPOS INVALIDOS
          let campos_invalidos = [];


          if(nombre_valido == false){
            campos_invalidos.push([nombre_id, 'Tu nombre no es válido']);
          }
          if(paterno_valido == false){
            campos_invalidos.push([paterno_id,'Tu apellido paterno no es válido']); 
          }
          if(materno_valido == false){
            campos_invalidos.push([materno_id,'Tu apellido materno no es válido']); 
          }
          if(correo_valido == false){
            campos_invalidos.push([correo_id,'El correo ingresado no es válido']);
          }
          if(telefono_valido == false){
            campos_invalidos.push([telefono_id,'El teléfono no es válido']);
          }
          if(lada_valida == false){
            campos_invalidos.push([lada_id,'La lada de tu país no es válida']);
          }
          if(regex_numero.test(numero) == false){
            campos_invalidos.push([numero_id,'El número de tu casa no es válido']);
          } 
          if(postal_valido == false){
            campos_invalidos.push([codigo_postal_id,'Tu código postal no es válido']);
          }
            


          let fecha_boolean = ValidarFecha(dia,mes,año);
          
          if(fecha_boolean == false){
            campos_invalidos.push([dia_id,'']);
            campos_invalidos.push([mes_id,'']);
            campos_invalidos.push([año_id,'']);
          }
         
          //FIN 3

          
          // si el arreglo es mayor de 0, signifca que hubo datos incorrectos
          if(campos_invalidos.length > 0){
            eliminar(imagen);
            return respuesta.send({invalidos:campos_invalidos});
          }
          else{

              telefono = telefono.replace(/-/g,'');
              telefono = telefono.replace(/ /g,'');
              lada = lada.replace('\+','');

              // Si llegamos hasta este ELSE, significa que el usuario contesto correctamente todos los campos

              // INICIO 4 AHORA TOCA VERIFICAR QUE EL CORREO NO ESTE REPETIDO, YA QUE NO PUEDE HABER CORREOS REPETIDOS ENTRE USUARIOS

              let consulta = "select pkIdUsuario from usuario where email = ?";
              let [fields] = await solicitud.database.query(mysql.format(consulta,[correo]));

              let conTelefono = "select pkIdUsuario from usuario where telefono = ?";
              let [fieldsTelefono] = await solicitud.database.query(mysql.format(conTelefono,[lada+telefono]));

              let repetidos = [];

              if(fields.length > 0){
                repetidos.push([correo_id,'Ya hay una cuenta con este correo']);
              }
              if(fieldsTelefono.length > 0){
                repetidos.push([telefono_id,'Ya hay una cuenta con este teléfono']);
              }

              // FIN 4
              
                  // Lo mismo que antes, si en repetidos, obtuvimos un length mayor a 0, significa que hay por lo menos 1 o mas usuarios con el correo o el telefono, por lo que nuetro usuario que esta por crear una cuenta, no puede seguir adelante
                  if(repetidos.length > 0){
                    eliminar(imagen);
                    return respuesta.send({repetidos:repetidos});
                  }
                  else{

                    // Si llegamos a este ELSE, significa que no hay usuarios con el mismo correo en la base de datos, lo cual es correcto

                    //ya una vez aqui almacenamos los datos del usuario en una cookie, para ya mas despues hacer la insercion en la base de datos

                    // este token va a estar dentro de la cookie
                    let token = JsonWebToken.sign({
                      nombre:nombre,
                      apodo:apodo,
                      paterno:paterno,
                      materno:materno,
                      correo:correo,
                      lada:lada,
                      telefono:telefono,
                      imagen:imagen,
                      calle:calle,
                      colonia:colonia,
                      numero:numero,
                      codigo_postal:codigo_postal,
                      dia:dia,
                      mes:mes,
                      año:año

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
                    return respuesta.send({redirect:"/spa/signUp/Patologia"}); 
                    }
          }
      }
       
      
      

}


// PATOLOGIAS
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
            console.log("No contestaste todos los campos");

          }
          else{

            let campos_incorrectos = [];

            let campos_si_correctos = [];

            for(let indice=0; indice<=longitud-1; indice++){

              if(campos[indice][1] == 1){
                //significa que contestaron que si

                //comprobar que hayan insertado algo valido
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
              console.log("Hubo campos incorrectos");

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

// LLENADO DE CONTRASENA
async function paso3(solicitud,respuesta){

    if(solicitud.headers.cookie == undefined){
      // no tiene ninguna cookie, lo cual significa que no acompleto ni el paso1 ni el paso2
      respuesta.send({redirect:"/spa/signUp"}); 
    }
    else{
      let galletas = solicitud.headers.cookie.split("; ");
      let galleta1 = galletas.find(galleta => galleta.startsWith("Megumin_cookie="));
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
            
            if(regex_numero.test(contraseña)==false){
              arreglo_regex.push("no tiene un número");
            }

            if(regex_caracter_especial.test(contraseña)==false){
              arreglo_regex.push("no tiene un carácter especial");
            }

            if(regex_Mayuscula.test(contraseña)==false){
              arreglo_regex.push("no tiene una mayúscula");
            }

            if(regex_minuscula.test(contraseña)==false){
              arreglo_regex.push("no tiene una minúscula");
            }

            if(regex_mayor.test(contraseña)==true){
              arreglo_regex.push('es mayor de 20 caracteres');
            }

            if(contraseña.length<8){
              arreglo_regex.push('es menor de 8 caracteres');
            }

            
          
            if(arreglo_regex.length>0){
              respuesta.send({invalidas:arreglo_regex});
              
            }
            else{
                    
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
              respuesta.send({redirect:"/spa/signUp/Confirmacion",logueado:true}); 
  
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



function eliminar(imagen){
  if(imagen != undefined){
    fs.unlink(imagen.path,(error)=>{
      if(error){
        console.log(error);
      }
    })
  }
}
  




function añoBisiesto(year){

  if(year%4==0){
      //puede que sea bisiesto
      if(year%100==0){

          if(year%400==0){
              return 29;
          }
          else{
            return 28;
          }
      }
      else{
          return 29;
      }
  }
  else{
    return 28;
  }

}


function ValidarFecha(dia,mes,año){

  let month = parseInt(mes); // si recibimos '1' o '01' o '00001', de igual forma pasara a 0

  if(isNaN(month)){
    return false;
  }
  else{
    month = month-1;
  }


  let year = parseInt(año);
  if(isNaN(year)){
    return false;
  }


  let day = parseInt(dia);

  if(isNaN(day)){
    return false;
  }
  

  let days = añoBisiesto(year); // le debemos pasar un numero y no un string

  let formato = [ 31,days,31,30,31,30,31,31,30,31,30,31 ];

  if(year <= 0){
    // significa que el usuario puso una año negativo, o que puso un año mayor al actual
    return false;
  }
  else{
      if((month +1) > formato.length || (month+1) <= 0){
          // significa que la persona puso un mes menor a 0, o que puso un mes mayor a 12
          return false;
      }
      else{
          if(formato[month] < day || day <= 0){
              //significa que la persona paso un dia mayor al limite o que puso en dia igual a 0 o negativo
              return false;
          }
          else{
              // por el momento todo bien, pero ahora toca verificar que la fecha que ingreso no sea mayor

              let birthday = new Date(`${year}-${month+1}-${day}`);
              let fa = new Date(Date.now());
              let fecha_actual = new Date(`${fa.getFullYear()}-${fa.getMonth()+1}-${fa.getDate()}`);

              if(birthday.getTime()>=fecha_actual.getTime()){
                // la fecha de nacimiento es igual a la de hoy o mayor
                return false;
              }
              else{
                return true;
              }
          }
      }
  }
  

  


  
  

}



export const methods ={
  paso1,
  paso2,
  paso3
}