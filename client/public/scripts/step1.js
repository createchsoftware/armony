console.log("demonios no quiere funcionar");

document.getElementById('step-one').addEventListener('click',async ()=>{

     document.cookie = "Megumin_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 

     let nombre = document.getElementById('name');
     let paterno = document.getElementById('lastname1');
     let materno = document.getElementById('lastname2');
     let correo = document.getElementById('email');
     let lada = document.getElementById('lada');
     let telefono = document.getElementById('phone');
     let dia = document.getElementById('day');
     let mes = document.getElementById('month');
     let año = document.getElementById('year');
     let calle = document.getElementById('calle');
     let postal = document.getElementById('codigo_postal');
     let numero = document.getElementById('numero');
     let colonia = document.getElementById('colonia');


    const respuesta = await fetch("/api/step1",{

            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                nombre:[nombre.value,nombre.id],
                paterno:[paterno.value,paterno.id],
                materno:[materno.value,materno.id],
                correo:[correo.value,correo.id],
                lada:[lada.value,lada.id],
                telefono:[telefono.value,telefono.id],
                dia:[dia.value,dia.id],
                mes:[mes.value,mes.id],
                año:[año.value,año.id],
                imagen:["imagen.png","imagen"],
                calle:[calle.value,calle.id],
                colonia:[colonia.value,colonia.id],
                codigo_postal:[postal.value,postal.id],
                numero:[numero.value,numero.id]
            })
    })  // fin del fetch


    if(!respuesta.ok)
        return


    const respuestaJson = await respuesta.json();


    if(respuestaJson.faltantes){
        let arreglo = respuestaJson.faltantes
        for(let indice in arreglo){
           let temporal = document.getElementById(arreglo[indice])
           temporal.placeholder = "no llenaste este campo";
           temporal.style.backgroundColor = 'orange';
           // 
        }
    }

    if(respuestaJson.invalidos){
        let arreglo = respuestaJson.invalidos
        for(let indice in arreglo){
           let temporal = document.getElementById(arreglo[indice])
           temporal.placeholder = "llenaste incorrectamente este campo";
           temporal.style.backgroundColor = 'red';
           // 
        }
    }


    if(respuestaJson.correo_ya_existente){
        console.log("el correo que ingresate ya existe, por favor ingrese otro");
        correo.value = '';
        correo.style.backgroundColor = 'yellow';
    }


    if(respuestaJson.redirect){
        console.log("paso 1 acompletado");
        window.location.href = respuestaJson.redirect;
    }



})