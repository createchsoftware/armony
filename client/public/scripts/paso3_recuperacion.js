document.getElementById('continuar').addEventListener('click',async ()=>{

    console.log("me hicieron click");
    
    let contraseña = document.getElementById('contraseña');
    let confirmacion = document.getElementById('nueva-contraseña');

    

    const respuesta = await fetch("/api/recuperacion/paso3",{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            pass:contraseña.value,
            again_pass:confirmacion.value,
        })
    })

    if(!respuesta.ok){
        return;
    }
      

    const respuestaJson = await respuesta.json();

    if(respuestaJson.confirmar){
        // ambas contraseñas no concuerdan
        contraseña.value='';
        contraseña.placeholder = "las contraseñas no concuerdan"
        contraseña.backgroundColor = 'yellow';
        confirmacion.value='';
        confirmacion.placeholder = "las contraseñas no concuerdan";
        confirmacion.backgroundColor = 'yellow';
        return;
    }

    if(respuestaJson.invalidas){
        // ambas contraseñas si concuerdan, pero no son validas

        let arreglo = respuestaJson.invalidas;
        let texto = "Te falta";
        for(let i in arreglo){
            texto=texto+" "+arreglo[i].toString();
        }
        contraseña.value='';
        confirmacion.value='';
        contraseña.placeholder = texto;
        contraseña.backgroundColor = 'orange';
        return;
    }

    if(respuestaJson.fuera_rango){
        contraseña.value='';
        confirmacion.value='';
        contraseña.placeholder = `La contrasena que ingresaste tiene ${respuestaJson.fuera_rango}`;
        contraseña.backgroundColor = 'white';
        return;
    }

    if(respuestaJson.redirect){
        console.log("paso 3 completado");
        window.location.href = respuestaJson.redirect;
    }

})


document.getElementById('cancelar').addEventListener('click', ()=>{

    document.cookie = "Akane_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
    document.cookie = "Himiko_Toga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
    document.cookie = "Shiragiku_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
    document.cookie = "Nezuko_Kamado=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 

    window.location.href = '/';
})