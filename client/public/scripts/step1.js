console.log("demonios no quiere funcionar");

const nombre = document.getElementById('name');
const paterno = document.getElementById('lastname1');
const materno = document.getElementById('lastname2');
const correo = document.getElementById('email');
const lada = document.getElementById('lada');
const telefono = document.getElementById('phone');
const dia = document.getElementById('day');
const mes = document.getElementById('month');
const año = document.getElementById('year');
const calle = document.getElementById('calle');
const postal = document.getElementById('codigo_postal');
const numero = document.getElementById('numero');
const colonia = document.getElementById('colonia');


nombre.addEventListener('input',()=>{if(nombre.value.length > 0) nombre.style.borderColor='#ccc';});
paterno.addEventListener('input',()=>{if(paterno.value.length > 0) paterno.style.borderColor='#ccc';});
materno.addEventListener('input',()=>{if(materno.value.length > 0) materno.style.borderColor='#ccc';});
correo.addEventListener('input',()=>{if(correo.value.length > 0) correo.style.borderColor='#ccc';});
lada.addEventListener('input',()=>{if(lada.value.length > 0) lada.style.borderColor='#ccc';});
telefono.addEventListener('input',()=>{if(telefono.value.length > 0) telefono.style.borderColor='#ccc';});
dia.addEventListener('input',()=>{if(dia.value.length > 0) dia.style.borderColor='#ccc';});
mes.addEventListener('input',()=>{if(mes.value.length > 0) mes.style.borderColor='#ccc';});
año.addEventListener('input',()=>{if(año.value.length > 0) año.style.borderColor='#ccc';});
calle.addEventListener('input',()=>{if(calle.value.length > 0) calle.style.borderColor='#ccc';});
postal.addEventListener('input',()=>{if(postal.value.length > 0) postal.style.borderColor='#ccc';});
numero.addEventListener('input',()=>{if(numero.value.length > 0) numero.style.borderColor='#ccc';});
colonia.addEventListener('input',()=>{if(colonia.value.length > 0) colonia.style.borderColor='#ccc';});

document.getElementById('step-one').addEventListener('click',async ()=>{

     document.cookie = "Megumin_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 

    const respuesta = await fetch("/api/step1",{

            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                nombre:[nombre.value,nombre.id],
                paterno:[paterno.value,paterno.id],
                materno:[materno.value,materno.id],
                correo:[correo.value,correo.id],
                lada:[lada.value,lada.id],
                telefono:[telefono.value,telefono.id],
                dia:[dia.value,dia.id],
                mes:[mes.value,mes.id],
                año:[año.value,año.id],
                imagen:["imagen.png","imagen"],
                calle:[calle.value,calle.id],
                colonia:[colonia.value,colonia.id],
                codigo_postal:[postal.value,postal.id],
                numero:[numero.value,numero.id]
            })
    })  // fin del fetch


    if(!respuesta.ok){
        return;
    }
        


    const respuestaJson = await respuesta.json();


    if(respuestaJson.faltantes){
        let arreglo = respuestaJson.faltantes
        for(let indice in arreglo){
           let temporal = document.getElementById(arreglo[indice][0]);
           temporal.style.borderColor='orange';

            let toastBox = document.getElementById('toastBox');
            let div = document.createElement('div');
            div.classList.add('toast');
            div.innerHTML = '<div id="texto">no pusiste '+arreglo[indice][1]+'</div>   <div id="icono"><i class="fa-solid fa-circle-exclamation"></i></div>';
            div.classList.add('orange');
            toastBox.appendChild(div);
            setTimeout(()=>{
                div.remove();
            },6000)

           // 
        }
        return;
    }

    if(respuestaJson.invalidos){

        let toastBox = document.getElementById('toastBox');
        let arreglo = respuestaJson.invalidos

        for(let indice in arreglo){
           let temporal = document.getElementById(arreglo[indice][0]);
           temporal.value='';
           temporal.style.borderColor = 'red';

           if(arreglo[indice][0] != 'day' && arreglo[indice][0] != 'month'){

               let div = document.createElement('div');
               div.classList.add('toast');

               if(arreglo[indice][0] == 'year'){
                    div.innerHTML = 'Su fecha de nacimiento no es correcta <i class="fa-solid fa-circle-xmark"></i>';   
               }
               else{
                    div.innerHTML = '<div id="texto">'+arreglo[indice][1]+'</div>   <div id="icono"><i class="fa-solid fa-circle-xmark"></i></div>';        
               }

               toastBox.appendChild(div);
               setTimeout(()=>{
                  div.remove();
               },6000)
            
           }

            
           
        }
        return;
    }


    if(respuestaJson.repetidos){

        let a = respuestaJson.repetidos;

        for(let i in a){
            let temporal = document.getElementById(a[i][0]);
            temporal.value='';
            temporal.style.borderColor='yellow';

            let toastBox = document.getElementById('toastBox');
            let div = document.createElement('div');
            div.classList.add('toast');
            div.innerHTML ='<div id="texto">'+ a[i][1]+'</div> <div id="icono"> <i class="fa-solid fa-user"></i> </div>';
            div.classList.add('yellow');
            toastBox.appendChild(div);
            setTimeout(()=>{
                div.remove();
            },6000);
        }

       

        return;
    }


    if(respuestaJson.redirect){
        console.log("paso 1 acompletado");
        window.location.href = respuestaJson.redirect;
    }



})


document.getElementById('cancelar').addEventListener('click',()=>{

    document.cookie = "Megumin_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
    document.cookie = "Nakano_Itsuki=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "Rem_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 


    nombre.value = '';
    paterno.value = '';
    materno.value = '';
    correo.value = '';
    lada.value = '';
    telefono.value = '';
    dia.value = '';
    mes.value = '';
    año.value = '';
    calle.value = '';
    postal.value = '';
    numero.value = '';
    colonia.value = '';

    window.location.href = '/';

})