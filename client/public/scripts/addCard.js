// console.log('el script se cargo');


// document.addEventListener('DOMContentLoaded',()=>{
//     document.getElementById('add-Tarjeta').addEventListener('click', async(e)=>{

//         e.preventDefault();
    
//         console.log("hiciste click en la funcion para anadir una nueva tarjeta");
    
//         let titular = document.getElementById('titular');
//         let numero = document.getElementById('numero');
//         let mes = document.getElementById('mes');
//         let año = document.getElementById('año');
//         let cvv = document.getElementById('cvv');
//         let cbRecordar = document.getElementById('recordar');
//         let cbPrincipal = document.getElementById('principal');
//         let tipo = document.getElementById('tipo');
    
    
//         const respuesta = await fetch('/api/tarjeta-nueva',{
//             method:'POST',
//             headers:{
//                 "Content-Type":"application/json",
//             },
//             body:JSON.stringify({
//                 titular:[titular.value,titular.id],
//                 numero:[numero.value,numero.id],
//                 mes:[mes.value,mes.id],
//                 año:[año.value,año.id],
//                 cvv:[cvv.value,cvv.id],
//                 recordar:[cbRecordar.checked,cbRecordar.id],
//                 principal:[cbPrincipal.checked,cbPrincipal.id],
//                 tipo:[tipo.value,tipo.id]
//             })
//         })
    
//         if(!respuesta.ok){
//             console.log("Hubo un error en la conexion con el servidor o viceserva");
//             return;
//         }
    
//         const respuestaJson = await respuesta.json();
    
//         if(respuestaJson.campos_faltantes){
//             console.log('campos faltantes');
//             let arreglo = respuestaJson.campos_faltantes;
//             for(let i in arreglo){
//                 let temporal = document.getElementById(arreglo[i]);
//                 temporal.placeholder = 'no llenado';
//                 temporal.style.backgroundColor = 'yellow';
//             }
//         }
    
//         if(respuestaJson.incorrectos){
//             let arreglo = respuestaJson.incorrectos;
//             for(let i in arreglo){
//                 let temporal = document.getElementById(arreglo[i]);
//                 temporal.placeholder = 'incorrecto';
//                 temporal.style.backgroundColor = 'orange';
//             }
//         }
    
//         if(respuestaJson.redirect){
//             window.location.href = respuestaJson.redirect;
//         }
    
//         if(respuestaJson.fallo){
//             console.log("hubo un problema en la insercion de la tarjeta");
//         }
    
    
//     })

// })





