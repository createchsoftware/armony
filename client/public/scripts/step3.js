var contraseña = document.getElementById('contraseña');
var confirmacion = document.getElementById('nueva-contraseña');
var politicas = document.getElementById('state');
var proximamente = document.getElementById('oculto');
proximamente.style.position = 'fixed';
proximamente.style.top = '50%'; 
proximamente.style.left = '50%';
proximamente.style.transform = 'translate(-50%, -50%)';
proximamente.style.zIndex = '50';
proximamente.innerHTML = `<h1 className="soon-title">
<i id='alarm' class="fa-solid fa-spinner"></i>
    ¡Procesando datos!
<i id='alarm' class="fa-solid fa-spinner"></i>
</h1>
<h4 className="soon-desc">
     La contraseña esta <br />
     siendo procesada.  <br />
</h4>`;


var ejecutandose = false;

proximamente.style.display = 'none';
contraseña.addEventListener('input',()=>{if(contraseña.value.length > 0) contraseña.style.borderColor='#ccc';});
confirmacion.addEventListener('input',()=>{if(confirmacion.value.length > 0) confirmacion.style.borderColor='#ccc';});


function ShowSoon(id){
  let mostrar = document.getElementById(id);

  if(mostrar.style.display == 'none'){
    mostrar.style.display = 'inline-block';
  }
  else{
    mostrar.style.display = 'none';
  }
}



document.getElementById('step3').addEventListener('click',async ()=>{

    if(ejecutandose == true){
        // el usuario le dio en continuar, pero la vez pasada que le dio continuar aun no termina
        return;
    }
    else{
        // si estaba en false, ahora la funcion se ejecutara, y activaremos el estado de ejecucion como true
        ejecutandose = true;
    }


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
        ejecutandose = false;
        return;
    }
       
    ShowSoon('oculto');

    await new Promise(resolve=> setTimeout(resolve, 2000));


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
        ShowSoon('oculto');
        ejecutandose = false;
        return;
    }
      

    const respuestaJson = await respuesta.json();


    if(respuestaJson.confirmar){
        ShowSoon('oculto');

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
        ejecutandose = false;
        return;
    }

    if(respuestaJson.invalidas){
        ShowSoon('oculto');

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
        ejecutandose = false;
        return;
    }

    if(respuestaJson.redirect){

        if(respuestaJson.redirect = '/spa/signUp/Confirmacion'){

            proximamente.innerHTML = `<img id="process-img" src="../../../../../../public/pictures/ArrowCut.png" />`;

            await new Promise(resolve=> setTimeout(resolve, 1200));

            proximamente.innerHTML = `<h1 className="soon-title">
            <i id='alarm' class="fa-solid fa-user-plus"></i>
            Inserción de Usuario
            <i id='alarm' class="fa-solid fa-user-plus"></i>
            </h1>
            <h4 className="soon-desc">
                Felicidades, en un momento se creará tu cuenta. <br />
                Este proceso puede tardar unos segundos, se paciente. <br />
            </h4>`;
        }
        
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