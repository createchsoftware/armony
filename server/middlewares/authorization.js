import jsonwebtoken from 'jsonwebtoken';
import { jwt } from "../data/datos.js";

async function logeado(solicitud, respuesta, siguiente){
    let hizo_login = await revisar_cookie(solicitud);
    if(hizo_login == true) {
        return siguiente();
    }
    else {
        return respuesta.redirect('/'); // si no esta logueado lo regresa al login
    }
        
} 

async function no_logeado(solicitud, respuesta, siguiente){
    let hizo_login = await revisar_cookie(solicitud);
    if(hizo_login == false) {
        return siguiente();
    }
    else{
        return respuesta.redirect('/admin'); // si ya esta logueado que no lo deje entrar a register o login, que lo mande a admin
    }
        
}


// function revisar_cookie(solicitud){
//     if(solicitud.headers.cookie != undefined)
//         return true; // si esta logeado
//     else
//         return false; // no esta logeado
// }




async function verificar_cookie(solicitud,respuesta){
        if (solicitud.headers.cookie !== undefined && solicitud.headers.cookie.startsWith("Naruto_cookie=")) {
            let galletas = solicitud.headers.cookie.split("; ");
            let galleta = galletas.find(galleta => galleta.startsWith("Naruto_cookie=")).slice(14);

            try{
                let decodificada = await jsonwebtoken.verify(galleta, jwt.SECRET);
                let consulta = "SELECT * FROM usuario WHERE pkIdUsuario = ? OR email = ?"
                let parametros = [decodificada.user,decodificada.user]
    
    
                // utilizamos una promesa para esperar que la funcion asincrona se termine
                let resultadoConsulta = new Promise(async (resolve, reject) => {
                    let [results] = await solicitud.database.query(consulta, parametros);
                    if (results.length === 0) {
                        reject();
                        respuesta.send({logueado: false});
                    } else {
                        resolve(results);
                    }
                });
    
                let resultados = await resultadoConsulta;
    
                if (resultados.length <= 0){
                    respuesta.send({logueado: false});
                    
                }
                else {
                    respuesta.send({logueado: true, usuario: resultados[0].nombre, nombre: resultados[0].nombre + " " + resultados[0].apellidoP + " " + resultados[0].apellidoM, email: resultados[0].email});
                    
                }
            
    
    
                
                
            }
            catch(error){
                console.log(error)
                console.log("Hubo un error");
                respuesta.send({logueado:false});
            }
        } else {
            respuesta.send({logueado:false});
        }
}





async function revisar_cookie(solicitud){

    if(solicitud.headers.cookie == undefined){
        return false;
    }
    else{
        let galletas = solicitud.headers.cookie.split("; ");
        let galleta = galletas.find(galleta => galleta.startsWith("Naruto_cookie=")).slice(14);
         
          // El slice() es para cortar el nombre de la cookie, ya que no lo ocupamos para poder trabajar con ello
        
        try{
            let decodificada = await jsonwebtoken.verify(galleta, jwt.SECRET);
            let consulta = "SELECT * FROM usuario WHERE pkIdUsuario = ? OR email = ?"
            let parametros = [decodificada.user,decodificada.user]


            // utilizamos una promesa para esperar que la funcion asincrona se termine
            let resultadoConsulta = new Promise(async (resolve, reject) => {
                let [results] = await solicitud.database.query(consulta, parametros)
                    if (results.length <= 0) {
                        reject();
                    } else {
                        resolve(resultados);
                    }
                });

            let resultados = await resultadoConsulta;

            if (resultados.length == 0)
                return false;
            else 
                return true;
        
        }
        catch(error){
            console.log("Hubo un error");
            return false;
        }
     
    }

}









export const  methods = {
    verificar_cookie,
    logeado,
    no_logeado
}