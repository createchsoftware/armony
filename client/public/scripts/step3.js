document.getElementById('step3').addEventListener('click',async ()=>{

    console.log("me hicieron click");

    document.cookie = "Rem_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 

    let contraseña = document.getElementById('contraseña');
    let confirmacion = document.getElementById('nueva-contraseña');
    let politicas = document.getElementById('state');

    let de_acuerdo = false;

    if(politicas.checked == false){
        console.log("debes de aceptar las politicas");
        return
    }
       
    console.log("si llegaste hasta aqui es porque aceptaste las politicas");

    const respuesta = await fetch("/api/step3",{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            pass:contraseña.value,
            again_pass:confirmacion.value,
        })
    })

    if(!respuesta.ok)
      return

    const respuestaJson = await respuesta.json();

    if(respuestaJson.confirmar){
        // ambas contraseñas no concuerdan
        contraseña.value='';
        contraseña.placeholder = "las contraseñas no concuerdan"
        contraseña.backgroundColor = 'yellow';
        confirmacion.value='';
        confirmacion.placeholder = "las contraseñas no concuerdan";
        confirmacion.backgroundColor = 'yellow';
    }

    if(respuestaJson.invalidas){
        // ambas contraseñas si concuerdan, pero no son validas

        let arreglo = respuestaJson.invalidas;
        let texto = "Te falta";
        for(i in arreglo){
            texto=texto+" "+arreglo[i].toString();
        }
        contraseña.value='';
        confirmacion.value='';
        contraseña.placeholder = texto;
        contraseña.backgroundColor = 'orange';
    }

    if(respuestaJson.fuera_rango){
        contraseña.value='';
        confirmacion.value='';
        contraseña.placeholder = `La contrasena que ingresaste tiene ${respuestaJson.fuera_rango}`;
        contraseña.backgroundColor = 'white';
    }

    if(respuestaJson.redirect){
        console.log("paso 3 completado");
        window.location.href = respuestaJson.redirect;
    }

})