import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

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



async function revisar_cookie(solicitud){

    if(solicitud.headers.cookie == undefined){
        return false;
    }
    else{
        let galletas = solicitud.headers.cookie.split("; ");
        let galleta = galletas.find(galleta => galleta.startsWith("Naruto_cookie=")).slice(14);
    
        
         
          // El slice() es para cortar el nombre de la cookie, ya que no lo ocupamos para poder trabajar con ello
        

        try{
            let decodificada = await jsonwebtoken.verify(galleta, process.env.JWT_SECRET);
            let consulta = "select * from usuarios where usuario_id = ? or correo = ?"
            let parametros = [decodificada.user,decodificada.user]


            // utilizamos una promesa para esperar que la funcion asincrona se termine
            let resultadoConsulta = new Promise((resolve, reject) => {
                solicitud.database.query(consulta, parametros, (error, resultados) => {
                    if (error)
                        reject(error);
                    resolve(resultados);
                });
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
    logeado,
    no_logeado
}