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


    if(!respuesta.ok){
        return;
    }
        

    const respuestaJson = await respuesta.json();    

    if(respuestaJson.vacios){
        let arreglo = respuestaJson.vacios
        for(let indice in arreglo){
           let temporal = document.getElementById(arreglo[indice])
           temporal.placeholder = "no contestaste";
           temporal.style.backgroundColor = 'orange';
           // 
        }
        return;
    } 

    if(respuestaJson.incorrectos){
        let arreglo = respuestaJson.incorrectos
        for(let indice in arreglo){
           let temporal = document.getElementById(arreglo[indice])
           temporal.placeholder = "Se mas conciso";
           temporal.style.backgroundColor = 'red';
           // 
        }
        return;
    }


    if(respuestaJson.redirect){
        console.log("paso 2 completado");
        window.location.href = respuestaJson.redirect;
    }


})


document.getElementById('cancelar').addEventListener('click',()=>{

    document.cookie = "Megumin_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
    document.cookie = "Nakano_Itsuki=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "Rem_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 

    let longitud =10;

    for(let iterador=1; iterador <=longitud; iterador++){
        document.getElementById(`q${iterador}`).value = '';
        document.getElementById(`no-${iterador}`).checked = false;
        document.getElementById(`si-${iterador}`).checked = false;
    }

    window.location.href = '/';

})