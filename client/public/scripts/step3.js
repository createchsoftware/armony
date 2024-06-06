var contraseña = document.getElementById('contraseña');
var confirmacion = document.getElementById('nueva-contraseña');
var politicas = document.getElementById('state');


contraseña.addEventListener('input',()=>{if(contraseña.value.length > 0) contraseña.style.borderColor='#ccc';});
confirmacion.addEventListener('input',()=>{if(confirmacion.value.length > 0) confirmacion.style.borderColor='#ccc';});



document.getElementById('step3').addEventListener('click',async ()=>{


    document.cookie = "Rem_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 

    if(politicas.checked == false){
        let toastBox = document.getElementById('toastBox');
        let div = document.createElement('div');
        div.classList.add('toast');
        div.innerHTML = '<div id="texto">Debes de aceptar las políticas</div><div id="icono"><i class="fa-solid fa-lock"></i></div>';
        div.classList.add('blue');
        toastBox.appendChild(div);
        setTimeout(()=>{
            div.remove();
        },6000);
        // el proceso termino y el estado vuelve a false, y se hace un return para salir de la funcion
        
        return;
    }


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
        contraseña.value = '';
        contraseña.style.borderColor = 'yellow';
        confirmacion.value = '';
        confirmacion.style.borderColor = 'yellow';

        let toastBox = document.getElementById('toastBox');
        let div = document.createElement('div');
        div.classList.add('toast');
        div.innerHTML = '<div id="texto">Las contraseñas no concuerdan</div>     <div id="icono"> <i class="fa-solid fa-equals"></i> </div>';
        div.classList.add('yellow');
        toastBox.appendChild(div);
        setTimeout(()=>{
            div.remove();
        },6000);
        return;
    }

    if(respuestaJson.invalidas){
        // ambas contraseñas si concuerdan, pero no son validas
        contraseña.value = '';
        contraseña.style.borderColor = 'red';
        confirmacion.value = '';
        confirmacion.style.borderColor = 'red';

        let toastBox = document.getElementById('toastBox');
        let arreglo = respuestaJson.invalidas;
        for(let i in arreglo){
            let div = document.createElement('div');
            div.classList.add('toast');
            div.innerHTML = '<div id="texto">Tu contraseña '+arreglo[i]+'</div>    <div id="icono"><i class="fa-solid fa-circle-xmark"></i></div>';
            toastBox.appendChild(div);

            setTimeout(()=>{
                div.remove();
            },6000)
        }
        return;
    }

    if(respuestaJson.redirect){
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