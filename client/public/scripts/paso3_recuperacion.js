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
        contraseña.style.borderColor='yellow';
        confirmacion.value='';
        confirmacion.style.borderColor='yellow';

        let toastBox = document.getElementById('toastBox');

        let div = document.createElement('div');
        div.classList.add('toast');
        div.innerHTML = '<div id="texto">Las contraseñas no concuerdan</div>     <div id="icono> <i class="fa-solid fa-equals"></i> </div>';
        div.classList.add('yellow');
        toastBox.appendChild(div);
        setTimeout(()=>{
            div.remove();
        },6000)

        return;
    }

    if(respuestaJson.invalidas){
        // ambas contraseñas si concuerdan, pero no son validas
        contraseña.value='';
        contraseña.style.borderColor='red';
        confirmacion.value='';
        confirmacion.style.borderColor='red';

        
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

    document.cookie = "Akane_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
    document.cookie = "Himiko_Toga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
    document.cookie = "Shiragiku_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
    document.cookie = "Nezuko_Kamado=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 

    window.location.href = '/';
})