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

    if(!respuesta.ok){
        return;
    }
      

    const respuestaJson = await respuesta.json();

    if(respuestaJson.confirmar){
        // ambas contraseñas no concuerdan
        let toastBox = document.getElementById('toastBox');

        let div = document.createElement('div');
        div.classList.add('toast');
        div.innerHTML = '<div id="texto">Las contraseñas no concuerdan</div>     <div id="icono> <i class="fa-solid fa-equals"></i> </div>';
        div.classList.add('orange');
        toastBox.appendChild(div);
        setTimeout(()=>{
            div.remove();
        },6000)
        return;
    }

    if(respuestaJson.invalidas){
        // ambas contraseñas si concuerdan, pero no son validas
        let toastBox = document.getElementById('toastBox');

        let arreglo = respuestaJson.invalidas;

        for(let i in arreglo){
            let div = document.createElement('div');
            div.classList.add('toast');
            div.innerHTML = '<div id="texto">tu contraseña '+arreglo[i]+'</div>    <div id="icono"><i class="fa-solid fa-circle-xmark"></i></div>';
            toastBox.appendChild(div);

            setTimeout(()=>{
                div.remove();
            },6000)
        }
        return;
    }

    if(respuestaJson.redirect){
        console.log("paso 3 completado");
        window.location.href = respuestaJson.redirect;
    }

})


document.getElementById('cancelar').addEventListener('click', ()=>{

    document.cookie = "Megumin_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
    document.cookie = "Nakano_Itsuki=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "Rem_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
    
    document.getElementById('contraseña').value = '';
    document.getElementById('nueva-contraseña').value = '';
    document.getElementById('state').checked = false;

    window.location.href = '/';
})