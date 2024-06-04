document.getElementById('step2').addEventListener('click', async ()=>{

    document.cookie = "Nakano_Itsuki=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    //crear un objeto

    var cuerpo = {
        cantidad:10
    }

    for(let iterador=1; iterador <=10; iterador++){

        let value_temporal = document.getElementById(`q${iterador}`);


        value_temporal.addEventListener('input', ()=>{
            if(value_temporal.value.length > 0) value_temporal.style.borderColor = '#ccc';
        })

        let llave = `llave${iterador}`;

        let no = document.getElementById(`no-${iterador}`);
        let si = document.getElementById(`si-${iterador}`);

        if(no.checked){
            cuerpo[llave] = [value_temporal.value,0,iterador]; //selecciono que no
        }else{
            if(si.checked){
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
           temporal.value = ''
           temporal.style.borderColor = 'orange';
        

            let toastBox = document.getElementById('toastBox');
            let div = document.createElement('div');
            div.classList.add('toast');
            div.innerHTML = '<div id="texto">Dejaste en blanco la pregunta '+arreglo[indice].slice(1);+'</div>   <div id="icono"><i class="fa-solid fa-circle-exclamation"></i></div>';
            div.classList.add('orange');
            toastBox.appendChild(div);
            setTimeout(()=>{
                div.remove();
            },6000)
        }
        return;
    } 

    if(respuestaJson.incorrectos){
        let arreglo = respuestaJson.incorrectos
        for(let indice in arreglo){
           let temporal = document.getElementById(arreglo[indice])
           temporal.value='';
           temporal.style.borderColor = 'red';

           let toastBox = document.getElementById('toastBox');
           let div = document.createElement('div');
           div.classList.add('toast');
           div.innerHTML = '<div id="texto">Se más específico en la pregunta '+arreglo[indice].slice(1);+', escribe más al respecto</div>   <div id="icono"> <i class="fa-solid fa-circle-xmark"> </div>';
           toastBox.appendChild(div);
           setTimeout(()=>{
               div.remove();
           },6000)
           
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