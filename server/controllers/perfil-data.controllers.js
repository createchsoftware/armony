import jsonwebtoken from "jsonwebtoken";
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import mysql from "mysql2";
import Stripe from 'stripe';
import {methods as servicios} from "../services/mail.service.js";

dotenv.config();


const stripe = new Stripe(process.env.STRIPE_SECRET); // le estamos pasando a express mi cuenta y mi contrasena de STRIPE


const arreglo_meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];


async function getPedidos(solicitud,respuesta){
    //verificar que el usuario este logueado

    if(solicitud.headers.cookie == undefined){
        respuesta.send({logueado:false});
    }
    else{
        let galletas = solicitud.headers.cookie.split("; ");
        let galleta = galletas.find(galleta => galleta.startsWith("Naruto_cookie="));

        if(galleta){
            galleta = galleta.slice(14);

            let decodificada = await jsonwebtoken.verify(galleta, process.env.JWT_SECRET);

            let consulta = "call pedidos(?)";

            let [resultados] = await solicitud.database.query(mysql.format(consulta,[decodificada.user]))

            
            
            if(resultados.length == 0 ){
                // el usuario no tiene movimientos, osea no tiene historial
            }else{
                let arreglo = [];
                let entregados = [];

                let arreglo_de_objetos = resultados[0];
                

                for(let i in arreglo_de_objetos){
                    let objeto_temporal = {};
                    
                    objeto_temporal.id_venta = arreglo_de_objetos[i].pkIdVenta;
                    objeto_temporal.id = arreglo_de_objetos[i].pkIdPS;
                    objeto_temporal.nombre = arreglo_de_objetos[i].nombre;
                    objeto_temporal.descripcion = arreglo_de_objetos[i].descripcion;
                    objeto_temporal.cantidad = arreglo_de_objetos[i].cantidad;
                    objeto_temporal.precio = arreglo_de_objetos[i].precio;
                    objeto_temporal.imagen = arreglo_de_objetos[i].img;
    
                    if(arreglo_de_objetos[i].fechaEntregado == null){
                        objeto_temporal.header = retornarHeader(arreglo_de_objetos[i].fecha,12,20);
                        objeto_temporal.date = arreglo_de_objetos[i].fecha;
                        arreglo.push(objeto_temporal);
                    }
                    else{
                        let date = arreglo_de_objetos[i].fechaEntregado;
                        objeto_temporal.date = date;
                        objeto_temporal.header = `Entregado ${date.getDate()} de ${arreglo_meses[date.getMonth()]} del ${date.getFullYear()}`;
                        entregados.push(objeto_temporal);
                    }
                    
                }

                if(entregados.length > 0){
                    entregados.sort((a,b)=> b.date - a.date);
                }
                respuesta.send({arreglo1:arreglo,arreglo2:entregados});  // mandarle el arreglo con el  historial
            }

        }else{
            //alguna otra galleta existia, pero la Naruto_cookie no, por lo que el usuario no esta logueado
            respuesta.send({logueado:false});
        }
    }

    //obtener el id de la cookie naruto para hacer la consulta a la base de datos
}




async function getTarjetas(solicitud,respuesta){
    if(solicitud.headers.cookie == undefined){
        respuesta.send({logueado:false});
    }
    else{
        let galletas = solicitud.headers.cookie.split("; ");
        let galleta = galletas.find(galleta => galleta.startsWith("Naruto_cookie="));

        if(galleta){
            //el usuario esta logueado

            galleta = galleta.slice(14);

            let decodificada = await jsonwebtoken.verify(galleta, process.env.JWT_SECRET);

            let consulta = "call getTarjetasIdCliente(?)";

            let [resultados] = await solicitud.database.query(mysql.format(consulta,[decodificada.user]));

            let arreglo = resultados[0];

            let arreglo_a_enviar = [];

            for(let i in arreglo){

                // Entregar una fecha mas limpia
                let fecha = arreglo[i].fechaVencimiento;
                let year = fecha.getFullYear()
                year = year.toString();
                year = year.slice(2);
                let month = fecha.getMonth() + 1;
                let mes = `0${month}`;
                arreglo[i].fechaVencimiento = `${mes}/${year}`;


                arreglo[i].cvv = arreglo[i].cvv.toString('utf-8');

                arreglo[i].exp_month = fecha.getMonth() +1;
                arreglo[i].exp_year = fecha.getFullYear();
                arreglo[i].codigoPostal = decodificada.postal;
                
                if(arreglo[i].longitud == 16){
                    if(arreglo[i].primeros_digitos.startsWith('5')){
                        arreglo[i].empresa = 'Mastercard';
                        arreglo[i].imagen = 'MasterCard.png';
                    }
                    if(arreglo[i].primeros_digitos.startsWith('4')){
                        arreglo[i].empresa = 'Visa';
                        arreglo[i].imagen = 'Visa.png';
                    }
                }
                else{
                    if(arreglo[i].longitud == 15){
                        if(arreglo[i].primeros_digitos =='37' ||arreglo[i].primeros_digitos == '34'){
                            arreglo[i].empresa = 'American Express';
                            arreglo[i].imagen = 'AmericanExpress.png';
                        }
                    }

                }


                delete arreglo[i].primeros_digitos;
                
                if(arreglo[i].empresa){
                    arreglo_a_enviar.push(arreglo[i]);
                }
            }

            respuesta.send({array:arreglo_a_enviar});
            console.log(arreglo);
        }
        else{
            respuesta.send({logueado:false});
        }
    }
}




async function deleteTarjeta(solicitud,respuesta){
    if(solicitud.headers.cookie == undefined){
        //el usuario no esta logueado, no puede realizar ninguna funcion
        respuesta.send({logueado:false});
    }
    else{
        let galletas = solicitud.headers.cookie.split("; ");
        let galleta = galletas.find(galleta=>galleta.startsWith("Naruto_cookie="));

        if(galleta){
            //el usuario esta logueado

            let parametro = solicitud.body.numero_tarjeta;

            let consulta = 'call delTarjeta(?)';

            try{
                await solicitud.database.query(mysql.format(consulta,[parametro]));
                console.log('La Eliminacion fue exitosa');
                respuesta.send({exito:true})
            }catch(error){
                console.log(error)
                respuesta.send({fallo:true})
            }
        }
        else{
            // el usuario no esta logueado
            respuesta.send({logueado:false});
        }
    }

}





async function InsertarTarjeta(solicitud,respuesta){
    if(solicitud.headers.cookie == undefined){
        return respuesta.send({logueado:false});
    }
    else{
        let galletas = solicitud.headers.cookie.split('; ');
        let galleta = galletas.find(galleta => galleta.startsWith('Naruto_cookie='));

        if(galleta){
            //el usuario esta logueado
            galleta = galleta.slice(14);

            console.log('el usuario esta logueado');


            let decodificada = await jsonwebtoken.verify(galleta,process.env.JWT_SECRET);

            let titular = solicitud.body.titular;
            let numero = solicitud.body.numero;
            let mes = solicitud.body.mes;
            let año = solicitud.body.año;
            let principal = solicitud.body.principal; // true or false
            let cvv = solicitud.body.cvv;
            let tipo = solicitud.body.tipo;



            let faltantes = [];

            if(!titular[0] || titular[0]==''){
                faltantes.push(titular[1]);
            }
            if(!numero[0] || numero[0]==''){
                faltantes.push(numero[1]);
            }
            if(!mes[0] || mes[0]==''){
                faltantes.push(mes[1]);
            }
            if(!año[0] || año[0]==''){
                faltantes.push(año[1]);
            }
            if(!cvv[0] || cvv[0]==''){
                faltantes.push(cvv[1]);
            }
            if(!tipo[0] || tipo[0]==''){
                faltantes.push(tipo[1]);
            }



            if(faltantes.length > 0){
                console.log('hubo campos faltantes');
                // el usuario no lleno todos los campos
                return respuesta.send({campos_faltantes:faltantes});
            }
            else{
                // todos los campos fueron llenados
                let invalidos = [];


                let regex_cvv = /^\d{3}$/;
                let only_numbers = /^\d+$/;  // verificar que sean puros numeros
                let regex_titular = /^([a-zA-Zá-úÁ-ÚñÑ]{3,12}(?: [a-zA-Zá-úÁ-ÚñÑ]{3,12})?)$/;  // verificar que sea un nombre valido


                //cvv sea valido
                if(regex_cvv.test(cvv[0]) == false){
                    invalidos.push(cvv[1]);
                }

                //titular sea valido
                if(regex_titular.test(titular[0]) == false){
                    invalidos.push(titular[1]);
                }

                
                //validar que el numero de la tarjeta sea valido
                if(only_numbers.test(numero[0]) == false){
                    invalidos.push(numero[1])
                }
                else{
                    // que haya pasado la primera prueba no significa que el numero sea valido
                    if(numero[0].startsWith('4') || numero[0].startsWith('5')){
                        // la tarjeta es mastercard o visa, asi que debe de tener 16 de longitud
                        if(numero[0].length != 16){
                            invalidos.push(numero[1])
                        }
                        else{
                            // tiene la longitud perfecta, pero aun no sabemos si es un numero valido
                            let Tarjeta_valida = validarTarjeta(numero[0]);

                            if(Tarjeta_valida == false){
                                //la tarjeta no es valida
                                invalidos.push(numero[1]);
                            }
                        }
                    }
                    else{
                        if(numero[0].startsWith('34') || numero[0].startsWith('37')){
                            // la tarjeta es American Express, debe de tener 15 de longitud
                            if(numero[0].length != 15){
                                invalidos.push(numero[1])
                            }
                        }
                    }
                }


                //validar que el año y el mes que hayan ingresado sea correcto
                if(only_numbers.test(año[0]) && only_numbers.test(mes[0])){


                    if(mes[0] > 12){
                        console.log("el mes es mas grande de 12")
                        invalidos.push(mes[1]);
                        invalidos.push(año[1]);
                    }
                    else{
                        if(año[0].length == 2 || año[0].length == 4){

                                // el año tiene puros numeros
                                let current_date = new Date()
                                let future_date = new Date(current_date.getTime() + 1000 * 60 * 60 * 24 * 365 * 7);
                                let  año_actual = current_date.getFullYear();
                                año_actual = año_actual.toString();
                                año_actual = año_actual.slice(0,-2);   // si el año es 2310 en numero, ahora con esto sera un string que contendra solo '23'
                                año_actual = parseInt(año_actual) * 100; // ahora de ser un string '23' sera un entero 2300


                                if(año[0].length == 4){
                                    año[0] = parseInt(año[0]); // si año era un string '2027', solo lo parseamos, sin necesidad de sumar nada
                                }  
                                else{
                                    if(año[0].length == 2){
                                        año[0] = año_actual + parseInt(año[0]);  // por ejemplo, si año era un string '27' ahora sera un entero 2327
                                    }
                                }


                                let fecha_un_dia_mas = new Date(año[0], mes[0]);

                                let fecha_a_vencer = new Date(fecha_un_dia_mas.getTime() - 1000 * 60 * 60 * 24 * 1);

                                if(fecha_a_vencer.getTime() <= current_date.getTime() || fecha_a_vencer.getTime() >= future_date.getTime()){
                                    console.log("la fecha que ingresate no esta en el rango")
                                    // la fecha es o muy mayor a la actual, o igual o menor a la actual
                                    invalidos.push(año[1]);
                                    invalidos.push(mes[1]);
                                }
                        }
                        else{
                            console.log("el año no tiene el formato que deberia")
                            invalidos.push(mes[1]);
                            invalidos.push(año[1]);
                        }
                    }    
                
                }
                else{
                    console.log("debes ingresar puros numeros")
                    invalidos.push(año[1]);
                    invalidos.push(mes[1]);
                }




                if(invalidos.length > 0){
                    // hubos algunos campos incorrectos
                    console.log('hubo campos invalidos');
                    return respuesta.send({incorrectos:invalidos});
                }
                else{
                    // todos los campos fueron llenados y de forma correcta

                    let fecha_un_dia_mas = new Date(año[0], mes[0]);
                    let fecha_a_vencer = new Date(fecha_un_dia_mas.getTime() - 1000 * 60 * 60 * 24 * 1);
                   
                    // let salt =  await bcryptjs.genSalt(5);  //clave cryptografica de la contraseña del usuario
                    // let hashCVV =  await bcryptjs.hash(cvv[0],salt);  // contraseña cryptografica


                    let meses;

                    if((fecha_a_vencer.getMonth()+1) < 10){
                        meses = `0${fecha_a_vencer.getMonth()+1}`
                    }
                    else{
                        meses = `${fecha_a_vencer.getMonth()+1}`
                    }


                    let fecha_a_introducir = `${fecha_a_vencer.getFullYear()}-${meses}-${fecha_a_vencer.getDate()}`;

                    console.log(fecha_a_introducir);
                    

                    let predeterminada = 0;


                    let buscar_predeterminada ='select * from tarjeta where predeterminada = 1 and fkCliente = ?';

                    let [fields_predeterminada] = await solicitud.database.query(mysql.format(buscar_predeterminada,[decodificada.user]));
                    
                    let objeto_predeterminada = fields_predeterminada[0][0];

                    if(!objeto_predeterminada){
                        // no existe ningun usuario con la tarjeta predeterminada

                        // aunque el usuario no haya puesto que es predeterminada, al ser la primer tarjeta sera la predeterminada
                        predeterminada = 1;
                    }
                    else{
                        // supongamos que ya existe una tarjeta predeterminada, pero si el usuario puso que esta iba a ser la nueva predeterminada, entonces 

                        if(principal==true){
                        
                            try{
                                // tenemos que actualizar la anterior tarjeta predeterminada
                                let u_consulta = 'update tarjeta set predeterminada = 0 where pkIdNumero = ? and fkCliente = ?';
                                let u_parametros = [objeto_predeterminada.pkIdNumero, decodificada.user];
                                await solicitud.database.query(mysql.format(u_consulta,u_parametros));

                                predeterminada = 1;
                            }
                            catch(error){
                                // probablemente nunca vaya a ver un error, pero por si acaso
                                console.log('no se pudo quitar como predeterminada la tarjeta anterior');
                            }
     
                        }
                    }
                    

                    let parametros = [numero[0],decodificada.user,tipo[0],titular[0],fecha_a_introducir,cvv[0],predeterminada,'id-stripe'];

                    console.log(parametros.length);

                    let consulta = 'call addTarjeta(?,?,?,?,?,?,?,?)';

                    

                    try{
                        await solicitud.database.query(mysql.format(consulta,parametros));
                        console.log('La Insercion fue exitosa');
                        return respuesta.send({redirect:'/perfil/tarjetas'});
                    }catch(error){
                        console.log('No se pudo insertar la tarjeta');
                        return respuesta.send({fallo:true});
                    }

                }
                
                



            }
        }
        else{
            // el usuario no esta logueado
            return respuesta.send({logueado:false});
        }
    }
}


// async function InsertarTarjeta(solicitud,respuesta){
//     if(solicitud.headers.cookie == undefined){
//         respuesta.send({logueado:false});
//     }
//     else{
//         let galletas = solicitud.headers.cookie.split('; ');
//         let galleta = galletas.find(galleta => galleta.startsWith('Naruto_cookie='));
        
//         if(galleta){
//             //el usuario esta logueado
//             galleta = galleta.slice(14);
//             let decodificada = await jsonwebtoken.verify(galleta,process.env.JWT_SECRET);

//             //si llegamos hasta aqui, solo nos queda validar que titular y tipo sean correctos
//             let titular = solicitud.body.titular;
//             let numero = solicitud.body.numero;
//             let mes = solicitud.body.mes;
//             let año = solicitud.body.año;
//             let principal = solicitud.body.principal; // true or false
//             let cvv = solicitud.body.cvv;
//             let tipo = solicitud.body.tipo;
//             let id_s = solicitud.body.id;


//             let faltantes = [];

//             if(!titular){
//                 faltantes.push('titular');
//             }
//             if(!tipo){
//                 faltantes.push('tipo');
//             }

//             if(faltantes.length >0){
//                 // el usuario no lleno estos campos
//                 respuesta.send({faltantes:faltantes})
//             }
//             else{
//                 //verificar que los respectivos campos hayan sido llenado correctamente
//                 let regex_titular = /^([a-zA-Zá-úÁ-ÚñÑ]{3,12}(?: [a-zA-Zá-úÁ-ÚñÑ]{3,12})?)$/;  // verificar que sea un nombre valido
//                 let regex_tipo = /(debito|Debito|Credito|credito|DEBITO|CREDITO)/;

//                 let invalidos =[];

//                 //titular sea valido
//                 if(regex_titular.test(titular) == false){
//                     invalidos.push('titular');
//                 }
//                 if(regex_tipo.test(tipo) == false){
//                     invalidos.push('tipo');
//                 }

//                 if(invalidos.length > 0){
//                     respuesta.send({invalidos:invalidos});
//                 }
//                 else{
//                     // el usuario si lleno todos los datos y de forma correcta

//                     const stripe = Stripe(process.env.STRIPE_SECRET);

//                     //buscar al customer con el correo especifico
//                     const customer = await stripe.customers.list({ email: decodificada.correo });   // usamos list ya que en strip no existe find u algunos otros


//                     if(customer.data.length > 0){

//                         // atar el metodo de pago con el cliente
//                         await stripe.paymentMethods.attach(id_s,{
//                             customer: customer.data[0].id
//                         })


//                         // ya encontramos al usuario, ahora sigue obtener los datos del payment
//                         const paymentMethod = await stripe.paymentMethods.retrieve(id_s);

//                         console.log(paymentMethod);

//                         let predeterminada = 0;

//                         if(principal == true){
//                             //hacemos que la predeterminada anterior ya no sea predeterminada
//                             let consulta = 'call setPredeterminada(?)';
//                             await solicitud.database.query(mysql.format(consulta,[decodificada.user]));
//                             predeterminada = 1;

//                         }

//                         // insertamos la nueva tarjeta
//                         let fecha_un_dia_mas = new Date(año, mes);
//                         let fecha_a_vencer = new Date(fecha_un_dia_mas.getTime() - 1000 * 60 * 60 * 24 * 1);
                    
//                         let meses;

//                         if((fecha_a_vencer.getMonth()+1) < 10){
//                             meses = `0${fecha_a_vencer.getMonth()+1}`
//                         }
//                         else{
//                             meses = `${fecha_a_vencer.getMonth()+1}`
//                         }


//                         let fecha_a_introducir = `${fecha_a_vencer.getFullYear()}-${meses}-${fecha_a_vencer.getDate()}`;

//                         console.log(fecha_a_introducir);
                            
//                         let parametros = [numero,decodificada.user,tipo,titular,fecha_a_introducir,cvv,predeterminada,id_s];

//                         let consulta2 = 'call addTarjeta(?,?,?,?,?,?,?,?)';

                    
//                         try{
//                             await solicitud.database.query(mysql.format(consulta2,parametros));
//                             console.log('La Insercion fue exitosa');
//                             respuesta.send({redirect:'/perfil/tarjetas'})
//                         }catch(error){
//                             console.log(error);
//                             respuesta.send({fallo:true});
//                         }
//                     }
//                     else{
//                         console.log('no se pudo encontrar al usuario en stripe');
//                         respuesta.send({fallo:true});
//                     }

                    
                    


//                 }
//             }



//         }
//         else{
//             respuesta.send({logueado:false});
//         }    
//     }
// }




async function getTransacciones(solicitud,respuesta){

    if(solicitud.headers.cookie == undefined){
        //el usuario no esta logueado
        respuesta.send({logueado:false});
    }
    else{
        let galletas = solicitud.headers.cookie.split('; ');
        let galleta = galletas.find(galleta => galleta.startsWith('Naruto_cookie='));

        if(galleta){
            galleta = galleta.slice(14);
            let decodificada = await jsonwebtoken.verify(galleta, process.env.JWT_SECRET);

            let arreglo_general = [];

            // transacciones de tipo producto
            let pedidos_consulta = 'call pedidos(?)';
            let [fields_pedidos] = await  solicitud.database.query(mysql.format(pedidos_consulta,[decodificada.user]));

            let arreglo_pedidos = fields_pedidos[0];


            // empezar a anadir todos los objetos pedidos en el arreglo general
            for(let i in arreglo_pedidos){
                let objeto_temporal = {};

                objeto_temporal.id_venta = arreglo_pedidos[i].pkIdVenta;
                objeto_temporal.id = arreglo_pedidos[i].pkIdPS;
                objeto_temporal.nombre = arreglo_pedidos[i].nombre;
                objeto_temporal.descripcion = arreglo_pedidos[i].descripcion;
                objeto_temporal.cantidad = arreglo_pedidos[i].cantidad;
                objeto_temporal.precio = arreglo_pedidos[i].precio;
                objeto_temporal.imagen = arreglo_pedidos[i].img;
                objeto_temporal.tipo = arreglo_pedidos[i].tipo;
                objeto_temporal.type = 'Productos';
                objeto_temporal.date = arreglo_pedidos[i].fecha;
                objeto_temporal.year = objeto_temporal.date.getFullYear();
                objeto_temporal.month = arreglo_meses[objeto_temporal.date.getMonth()];
                objeto_temporal.day = objeto_temporal.date.getDate();

                arreglo_general.push(objeto_temporal);
            }



            // las transacciones de tipo monedero
            let monedero_consulta = 'call monederos(?)';
            let [fields_monedero] = await  solicitud.database.query(mysql.format(monedero_consulta,[decodificada.user]));

            let arreglo_monederos = fields_monedero[0];


            for(let i in arreglo_monederos){
                let temporal = {};

                temporal.date = arreglo_monederos[i].fechaTransaccion;

                temporal.year = temporal.date.getFullYear();
                temporal.month = arreglo_meses[temporal.date.getMonth()];
                temporal.day = temporal.date.getDate();

                temporal.monto = arreglo_monederos[i].monto;
                temporal.imagen = 'monedero.jpg';
                temporal.tipo = arreglo_monederos[i].tipo;
                temporal.type = 'Monedero';
                arreglo_general.push(temporal);
            }




            // las transacciones de tipo anadir puntos
            let puntos_consulta = 'call puntos(?)';
            let [fields_puntos] = await  solicitud.database.query(mysql.format(puntos_consulta,[decodificada.user]));

            let arreglo_puntos = fields_puntos[0];

            for(let i in arreglo_puntos){
                let temporal = {};

                temporal.date = arreglo_puntos[i].fechaTransaccion;

                temporal.year = temporal.date.getFullYear();
                temporal.month = arreglo_meses[temporal.date.getMonth()];
                temporal.day = temporal.date.getDate();

                temporal.monto = arreglo_puntos[i].monto;
                temporal.puntos = arreglo_puntos[i].monto / 10; // los puntos que obtuvo
                temporal.imagen = 'point.jpg';
                temporal.tipo = arreglo_puntos[i].tipo;
                temporal.type = 'Puntos';
                arreglo_general.push(temporal);
            }



            let citas_consulta = 'call movCitas(?)';
            let [fields_citas] = await  solicitud.database.query(mysql.format(citas_consulta,[decodificada.user]));


            let arreglo_citas = fields_citas[0];

            for(let i in arreglo_citas){
                let temporal = {};

                temporal.date = arreglo_citas[i].fechaTransaccion;
                temporal.year = temporal.date.getFullYear();
                temporal.month = arreglo_meses[temporal.date.getMonth()];
                temporal.day = temporal.date.getDate();
                temporal.nombre = arreglo_citas[i].nombre;
                temporal.especialista= arreglo_citas[i].nombre_empleado;
                temporal.sesiones = arreglo_citas[i].sesiones; 


                let dia_asistir = arreglo_citas[i].fecha_a_asistir.getDate();
                let mes_asistir = arreglo_citas[i].fecha_a_asistir.getMonth()+1;
                let año_asistir = arreglo_citas[i].fecha_a_asistir.getFullYear();

                temporal.fecha =  `${dia_asistir}/${mes_asistir}/${año_asistir}`;
                let first = arreglo_citas[i].horaIn.slice(0,-3)
                let last = arreglo_citas[i].horaFin.slice(0,-3)
                temporal.hora = `${first}-${last}`;
                temporal.imagen = arreglo_citas[i].img;
                temporal.tipo = arreglo_citas[i].tipo;
                temporal.type = 'Servicios';
                arreglo_general.push(temporal);
            }


            if(arreglo_general.length > 0){
                arreglo_general.sort((a,b)=> b.date - a.date);
            }

            respuesta.send({array:arreglo_general}); // mandar el arreglo ordenado de la fecha mas reciente a la mas antigua


        }
        else{
            // el usuario no esta logueado
            respuesta.send({logueado:false});
        }
    }
}




async function getMonedero(solicitud,respuesta){
    if(solicitud.headers.cookie == undefined){
        respuesta.send({logueado:false});
    }
    else{
        //verificar que existe la cookie naruto
        let galletas = solicitud.headers.cookie.split('; ');
        let galleta = galletas.find(galleta=> galleta.startsWith('Naruto_cookie='));

        if(galleta){
            galleta = galleta.slice(14);

            let decodificada = jsonwebtoken.verify(galleta, process.env.JWT_SECRET);

            let consulta = 'call getMonedero(?)';

            let [fields] = await solicitud.database.query(mysql.format(consulta,[decodificada.user]));

            let datos = fields[0];

            respuesta.send({data:datos});

        }
        else{
            //el usuario no esta logueado
            respuesta.send({logueado:false});
        }
    }
}



async function Insert_to_Monedero(solicitud,respuesta){

    if(solicitud.headers.cookie == undefined){
        respuesta.send({logueado:false});
    }
    else{
        let galletas = solicitud.headers.cookie.split('; ');
        let galleta = galletas.find(galleta=> galleta.startsWith('Naruto_cookie='));

        if(galleta){
            galleta = galleta.slice(14);

            let decodificada = await jsonwebtoken.verify(galleta, process.env.JWT_SECRET);

            let numeroTarjeta = solicitud.body.numero_tarjeta;

            let monto = solicitud.body.monto;

            console.log(`el numero es: ${numeroTarjeta}`);
            console.log(`el monto es: ${monto}`);

            let numero_valido = /^\d*\.?\d+$/;

            if(numero_valido.test(monto)){
                //como el monto es un numero valido, ahora podemos hacer esto
            
                monto = parseFloat(monto);

                try{
                    let consulta = 'call addVentaRecargarSaldo(?,?,?)';
                    let parametros = [decodificada.user,numeroTarjeta,monto];
                    let [fields] = await solicitud.database.query(mysql.format(consulta,parametros))

                    console.log(fields); //para ver que es lo que nos dio
                    respuesta.send({redirect:'/perfil/monedero'});

                }catch(error){
                    console.log(error);
                    respuesta.send({mensaje:'hubo un error en la insercion'});
                }

                    
            
                
            }else{
                // el monto no es un numero valido
                respuesta.send({mensaje:'debes de poner un monto valido'});
            }

        }
        else{
            respuesta.send({logueado:false});
        }
    }
}






function retornarHeader(fecha,init,limit){

    fecha = fecha.getTime();

    let fechaInicio = new Date(fecha + (1000 * 60 * 60 * 24 * init));
    let fechaFin = new Date(fecha + (1000 * 60 * 60 * 24 * limit));

    if(fechaInicio.getMonth() == fechaFin.getMonth()){
        
        return `Entrega estimada ${fechaInicio.getDate()} - ${fechaFin.getDate()} de ${arreglo_meses[fechaInicio.getMonth()]} del ${fechaInicio.getFullYear()}`;
    }
    else{
        if(fechaInicio.getFullYear() == fechaFin.getFullYear()){
            return `Entrega estimada ${fechaInicio.getDate()} de ${arreglo_meses[fechaInicio.getMonth()]} - ${fechaFin.getDate()} de ${arreglo_meses[fechaFin.getMonth()]} del ${fechaInicio.getFullYear()}`;
        }
        else{
            return `Entrega estimada ${fechaInicio.getDate()} de ${arreglo_meses[fechaInicio.getMonth()]} del ${fechaInicio.getFullYear()} - ${fechaFin.getDate()} de ${arreglo_meses[fechaFin.getMonth()]} del ${fechaFin.getFullYear()}`;
        }
    }

}




async function getOpcionesPago(solicitud,respuesta){
    if(solicitud.headers.cookie == undefined){
        respuesta.send({logueado:false});
    }
    else{
        let galletas = solicitud.headers.cookie.split("; ");
        let galleta = galletas.find(galleta => galleta.startsWith("Naruto_cookie="));

        if(galleta){
            //el usuario esta logueado

            galleta = galleta.slice(14);

            let decodificada = await jsonwebtoken.verify(galleta, process.env.JWT_SECRET);

            let consulta = "call getTarjetasIdCliente(?)";

            let [resultados] = await solicitud.database.query(mysql.format(consulta,[decodificada.user]));

            let arreglo = resultados[0];

            let arreglo_a_enviar = [];

            for(let i in arreglo){

                // Entregar una fecha mas limpia
                let fecha = arreglo[i].fechaVencimiento;
                let year = fecha.getFullYear()
                year = year.toString();
                year = year.slice(2);
                let month = fecha.getMonth() + 1;
                let mes = `0${month}`;
                arreglo[i].fechaVencimiento = `${mes}/${year}`;


                arreglo[i].cvv = arreglo[i].cvv.toString('utf-8');

                arreglo[i].exp_month = fecha.getMonth() +1;
                arreglo[i].exp_year = fecha.getFullYear();
                arreglo[i].codigoPostal = decodificada.postal;
                
                if(arreglo[i].longitud == 16){
                    if(arreglo[i].primeros_digitos.startsWith('5')){
                        arreglo[i].empresa = 'Mastercard';
                        arreglo[i].imagen = 'MasterCard.png';
                    }
                    if(arreglo[i].primeros_digitos.startsWith('4')){
                        arreglo[i].empresa = 'Visa';
                        arreglo[i].imagen = 'Visa.png';
                    }
                }
                else{
                    if(arreglo[i].longitud == 15){
                        if(arreglo[i].primeros_digitos =='37' ||arreglo[i].primeros_digitos == '34'){
                            arreglo[i].empresa = 'American Express';
                            arreglo[i].imagen = 'AmericanExpress.png';
                        }
                    }

                }


                delete arreglo[i].primeros_digitos;
                
                if(arreglo[i].empresa){
                    arreglo_a_enviar.push(arreglo[i]);
                }
            }


            let conMonedero = "call getMonedero(?)";
            let [fields] = await solicitud.database.query(mysql.format(conMonedero,[decodificada.user]));

            let objeto_monedero = fields[0][0];

            objeto_monedero.label = 'Tarjeta de monedero';
            objeto_monedero.imagen = 'icon.png';
            objeto_monedero.tipo = 'monedero';

            
            let cantidad = parseFloat(objeto_monedero.monedero);

            if(cantidad != 0.0){
                console.log('esto si ocurrio');
                arreglo_a_enviar.push(objeto_monedero);
            }

            console.log(arreglo_a_enviar);
            console.log(objeto_monedero);

            return respuesta.send({array:arreglo_a_enviar});
            
        }
        else{
            respuesta.send({logueado:false});
        }
    }
}




async function getSuscripcion(solicitud,respuesta){
    if(solicitud.headers.cookie == undefined){
        return respuesta.send({logueado:false});
    }
    else{
        let galletas = solicitud.headers.cookie.split('; ');

        let galleta = galletas.find(galleta => galleta.startsWith('Naruto_cookie='));

        if(galleta){

            let dia_semana = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
            let meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

            galleta = galleta.slice(14);

            let consulta = 'call getSuscripcionActual(?)';

            let decodificada = await jsonwebtoken.verify(galleta, process.env.JWT_SECRET);

            let [fields] = await solicitud.database.query(mysql.format(consulta,[decodificada.user]));

            let objeto_respuesta = fields[0][0];

            if(!objeto_respuesta){
                // no existe una suscripcion vigente
                objeto_respuesta=false;
            }
            else{
                let aE = objeto_respuesta.fechaExpiracion.getFullYear();
                let mE = objeto_respuesta.fechaExpiracion.getMonth()+1;
                let dE = objeto_respuesta.fechaExpiracion.getDate();

                objeto_respuesta.mE = meses[mE-1];
                objeto_respuesta.dE = dE;
                objeto_respuesta.sE = dia_semana[objeto_respuesta.fechaExpiracion.getDay()];

                let aI = objeto_respuesta.fechaInicio.getFullYear();
                let mI = objeto_respuesta.fechaInicio.getMonth()+1;
                let dI = objeto_respuesta.fechaInicio.getDate();

                objeto_respuesta.mI = meses[mI-1];
                objeto_respuesta.dI = dI;
                objeto_respuesta.sI = dia_semana[objeto_respuesta.fechaInicio.getDay()];

                objeto_respuesta.fechaExpiracion = `${aE}-${mE}-${dE}`;
                objeto_respuesta.fechaInicio  = `${aI}-${mI}-${dI}`;
            }
            

            return respuesta.send({logueado:true,nombre:decodificada.nombre,correo:decodificada.correo,objeto_respuesta:objeto_respuesta});
        }
        else{
            return respuesta.send({logueado:false});
        }
    }
}


async function deleteSuscripcion(solicitud,respuesta){
    if(solicitud.headers.cookie == undefined){
        return respuesta.send({logueado:false});
    }
    else{
        let galletas = solicitud.headers.cookie.split('; ');
        let galleta = galletas.find(galleta=> galleta.startsWith('Naruto_cookie='));

        if(galleta){
            galleta = galleta.slice(14);

            let decodificada = await jsonwebtoken.verify(galleta, process.env.JWT_SECRET);

            let consulta = 'cancelarSuscripcion(?)';

            let exito = false;            

            try{
                // ejecutamos la cancelacion de la suscripcion
                await solicitud.database.query(mysql.format(consulta,[decodificada.user]));

                exito = true;
            }
            catch(error){
                exito = false;
            }
            

            if(exito == true){
                try{
                    let full_name = `${decodificada.paterno} ${decodificada.materno} ${decodificada.nombre}`;
    
                    //toca enviar al usuario un correo
                    let sending = await servicios.CancelacionSuscripcion(decodificada.correo,"token",full_name);
                }catch(error){
                    console.log('envio incorrecto');
                    console.log(error);
                }

                // independientemente del resultado del try catch, el proceso fue exitoso
                return respuesta.send({logueado:true,suscripcion:false,redirect:'/perfil/suscripciones'});
            }
            else{
                return respuesta.send({logueado:true,suscripcion:true}); // no se cancelo la suscripcion
            }
           
            


            


        }
        else{
            return respuesta.send({logueado:false});
        }
    }
}









function validarTarjeta(numero_tarjeta){

    let odd_sum=0;
    let even_sum=0;
    for(let index in numero_tarjeta){
        if(index%2==0){
            //numero par
            even_sum+= par(numero_tarjeta[index]);
        }
        else{
            //numero impar
            odd_sum+= parseInt(numero_tarjeta[index]);
        }
    }

    let total = odd_sum + even_sum;

    console.log(total);

    if(total%10==0){
        return true;
    }
    else{
        return false;
    }
}


function par(e){
    let even = parseInt(e);
    even = even * 2;
    let module = even%10;

    if(module != even){
        //el numero es mayor de 10
        module=module+1;
    }

    return module;
}





export const methods = {
    getPedidos,
    getTarjetas,
    deleteTarjeta,
    InsertarTarjeta,
    getTransacciones,
    getMonedero,
    Insert_to_Monedero,
    getOpcionesPago,
    getSuscripcion,
    deleteSuscripcion
}