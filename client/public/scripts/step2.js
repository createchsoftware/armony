document.getElementById('step2').addEventListener('click', async ()=>{

    document.cookie = "Nakano_Itsuki=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    //crear un objeto

    var cuerpo = {
        cantidad:10
    }

    for(let iterador=1; iterador <=10; iterador++){

        let value_temporal = document.getElementById(`q${iterador}`);

        let llave = `llave${iterador}`;

        if(document.getElementById(`no-${iterador}`).checked){
            cuerpo[llave] = [value_temporal.value,0,iterador]; //selecciono que no
        }else{
            if(document.getElementById(`si-${iterador}`).checked){
                cuerpo[llave] = [value_temporal.value,1,iterador]; //selecciono que si
            }else{
                cuerpo[llave] = null; // no selecciono nada
            }
        }
    
    }

    console.log(cuerpo);


    const respuesta = await fetch("/api/step2",{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(cuerpo)
    })


    if(!respuesta.ok)
        return

    const respuestaJson = await respuesta.json();    

    if(respuestaJson.vacios){
        let arreglo = respuestaJson.vacios
        for(indice in arreglo){
           let temporal = document.getElementById(arreglo[indice])
           temporal.placeholder = "no contestaste";
           temporal.style.backgroundColor = 'orange';
           // 
        }
    } 

    if(respuestaJson.incorrectos){
        let arreglo = respuestaJson.incorrectos
        for(indice in arreglo){
           let temporal = document.getElementById(arreglo[indice])
           temporal.placeholder = "Se mas conciso";
           temporal.style.backgroundColor = 'red';
           // 
        }
    }


    if(respuestaJson.redirect){
        console.log("paso 2 completado");
        window.location.href = respuestaJson.redirect;
    }


})