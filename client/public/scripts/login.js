document.getElementById('iniciar-sesion-fet').addEventListener('click', async()=>{

    let input_pass = document.getElementById('pass');
    let input_user_email = document.getElementById('user');
    
    const respuesta = await fetch("/api/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            user_or_email:input_user_email.value,
            password:input_pass.value
        })
    })

    if(!respuesta.ok)
       return;

    const respuestaJson = await respuesta.json();

    if(respuestaJson.campos_vacios){

        let array = respuestaJson.campos_vacios;
        let toastBox = document.getElementById('toastBox');

        for(let i in array){

            if(array[i].includes('contraseña')){ input_pass.style.borderColor='orange'; }

            if(array[i].includes('correo')){ input_user_email.style.borderColor='orange'; }


            let div = document.createElement('div');
            div.classList.add('toast');
            div.innerHTML = '<div id="texto">'+array[i]+'</div>    <div id="icono"><i class="fa-solid fa-circle-xmark"></i></div>';
            div.classList.add('orange');
            toastBox.appendChild(div);
            setTimeout(()=>{
                div.remove();
            },6000);
        }

        return;
    }



    if(respuestaJson.campos_invalidos){

        let array = respuestaJson.campos_invalidos;
        let toastBox = document.getElementById('toastBox');
        input_user_email.style.borderColor = '#34495E';

        for(let i in array){
            let div = document.createElement('div');
            div.classList.add('toast');
            div.innerHTML = '<div id="texto">'+array[i]+'</div>    <div id="icono"><i class="fa-solid fa-circle-xmark"></i></div>';
            toastBox.appendChild(div);
            setTimeout(()=>{
                div.remove();
            },6000);
        }

        return;
    }

    if(respuestaJson.mensaje){
        let toastBox = document.getElementById('toastBox');
        input_user_email.style.borderColor = '#34495E';

        let div = document.createElement('div');
        div.classList.add('toast');
        div.innerHTML = '<div id="texto">'+respuestaJson.mensaje+'</div>    <div id="icono"><i class="fa-solid fa-database"></i></div>';
        div.classList.add('blue');
        toastBox.appendChild(div);

        setTimeout(()=>{
            div.remove();
        },6000);

        return;
    }

    if(respuestaJson.contraseña_incorrecta){
        let toastBox = document.getElementById('toastBox');
        input_pass.style.borderColor = '#FA8072';

        let div = document.createElement('div');
        div.classList.add('toast');
        div.innerHTML = '<div id="texto">'+respuestaJson.contraseña_incorrecta+'</div>    <div id="icono"><i class="fa-solid fa-lock"></i></div>';
        div.classList.add('salmon');
        toastBox.appendChild(div);

        setTimeout(()=>{
            div.remove();
        },6000);

        return;
    }

    if(respuestaJson.redirect){
        console.log("usuario logueado exitosamente");
        window.location.reload();
    }
    
})  