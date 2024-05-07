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
        console.log("Feliz cumpleanos")
        return siguiente();
    }
    else{
        return respuesta.redirect('/'); // si ya esta logueado que no lo deje entrar a register o login, que lo mande a admin
    }
        
}


// function revisar_cookie(solicitud){
//     if(solicitud.headers.cookie != undefined)
//         return true; // si esta logeado
//     else
//         return false; // no esta logeado
// }




async function verificar_cookie(solicitud,respuesta){

    if(solicitud.headers.cookie == undefined){
        respuesta.send({logueado:false});
        
    }
    else{
        let galletas = solicitud.headers.cookie.split("; ");
        let galleta = galletas.find(galleta => galleta.startsWith("Naruto_cookie="))
        
        if(galleta){
                // la galleta si existe y debe hacer muchos mas pasos

                galleta = galleta.slice(14);  // 14 es la longitud del nombre
         
                // El slice() es para cortar el nombre de la cookie, ya que no lo ocupamos para poder trabajar con ello
                
                    let decodificada = await jsonwebtoken.verify(galleta, process.env.JWT_SECRET);


                    // // utilizamos una promesa para esperar que la funcion asincrona se termine
                    // let resultadoConsulta = new Promise((resolve, reject) => {
                    //     solicitud.database.query(consulta, parametros, (error, resultados) => {
                    //         if (error){
                    //             reject(error);
                    //             respuesta.send({logueado:false});
                        
                    //         }
                    //         resolve(resultados);
                    //     });
                    // });

                    // let resultados = await resultadoConsulta;

                
                    
                    respuesta.send({logueado:true,nombre:decodificada.nombre,apellidoP:decodificada.paterno,apellidoM:decodificada.materno,email:decodificada.correo,telefono:decodificada.telefono,pass:decodificada.contraseña,imagen:decodificada.imagen,calle:decodificada.calle,clave:decodificada.user,colonia:decodificada.colonia,numero:decodificada.numero,codigoP:decodificada.postal,fechaNac:decodificada.nacimiento});
                        
                    
                    
                
        }
        else{
            console.log("la galleta naruto para iniciar sesion no existe");
        }
           
        
    }
}





async function revisar_cookie(solicitud){

    if(solicitud.headers.cookie == undefined){
        return false;
    }
    else{
        let galletas = solicitud.headers.cookie.split("; ");
        let galleta = galletas.find(galleta => galleta.startsWith("Naruto_cookie="))
         
        if(galleta){

            galleta = galleta.slice(14);  

            try{
                let decodificada = await jsonwebtoken.verify(galleta, process.env.JWT_SECRET);
                let consulta = "select * from usuario where pkIdUsuario = ?";
    
    
                // utilizamos una promesa para esperar que la funcion asincrona se termine
                let resultadoConsulta = new Promise((resolve, reject) => {
                    solicitud.database.query(consulta, decodificada.user, (error, resultados) => {
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
        else{
            return false;
        }
          // El slice() es para cortar el nombre de la cookie, ya que no lo ocupamos para poder trabajar con ello
        
        
     
    }

}









export const  methods = {
    verificar_cookie,
    logeado,
    no_logeado
}