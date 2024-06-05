let imagen = document.getElementById('imagen');

var file;
imagen.addEventListener('change',(evento)=>{
    file = evento.target.files[0];
})



let nombre = document.getElementById('nombre');
let paterno = document.getElementById('paterno');
let materno = document.getElementById('materno');
let telefono = document.getElementById('telefono');
let lada = document.getElementById('lada');
    
//direccion
let calle = document.getElementById('calle');
let colonia = document.getElementById('colonia');
let codigoP = document.getElementById('codigoP');
let numero = document.getElementById('numero');

//fecha
let dia =  document.getElementById('dia');
let mes =  document.getElementById('mes');
let año =  document.getElementById('año');




nombre.addEventListener('input',()=>{if(nombre.value.length > 0) nombre.style.borderColor='#ccc';});
paterno.addEventListener('input',()=>{if(paterno.value.length > 0) paterno.style.borderColor='#ccc';});
materno.addEventListener('input',()=>{if(materno.value.length > 0) materno.style.borderColor='#ccc';});
telefono.addEventListener('input',()=>{if(telefono.value.length > 0) telefono.style.borderColor='#ccc';});
calle.addEventListener('input',()=>{if(calle.value.length > 0) calle.style.borderColor='#ccc';});
colonia.addEventListener('input',()=>{if(colonia.value.length > 0) colonia.style.borderColor='#ccc';});
codigoP.addEventListener('input',()=>{if(postal.value.length > 0) postal.style.borderColor='#ccc';});
numero.addEventListener('input',()=>{if(numero.value.length > 0) numero.style.borderColor='#ccc';});
dia.addEventListener('input',()=>{if(dia.value.length > 0) dia.style.borderColor='#ccc';});
mes.addEventListener('input',()=>{if(mes.value.length > 0) mes.style.borderColor='#ccc';});
año.addEventListener('input',()=>{if(año.value.length > 0) año.style.borderColor='#ccc';});
lada.addEventListener('input',()=>{if(lada.value.length > 0) lada.style.borderColor='#ccc';});


let btn = document.getElementById('guardar');

btn.style.zIndex = '100';

btn.addEventListener('click', async()=>{

    let cantidad = 0;
    let formData = new FormData();

    console.log('hasta aqui');

    if(nombre.value && nombre.value !=''){
        formData.append('nombre_id',nombre.id); formData.append('nombre',nombre.value);
        cantidad++;
    }
        
    if(paterno.value && paterno.value !=''){
        formData.append('paterno_id',paterno.id); formData.append('paterno',paterno.value);
        cantidad++;
    }
        
    if(materno.value && materno.value !=''){
        formData.append('materno_id',materno.id); formData.append('materno',materno.value);
        cantidad++;
    }
        
    if(telefono.value && telefono.value!=''){
        formData.append('telefono_id',telefono.id); formData.append('telefono',telefono.value);
        cantidad++;
    }

    if(lada.value && lada.value!=''){
        formData.append('lada_id',lada.id); formData.append('lada',lada.value);
        cantidad++;
    }
        


    //direccion
    if(calle.value && calle.value !=''){
        formData.append('calle_id',calle.id); formData.append('calle',calle.value);
        cantidad++;
    }
        
    if(colonia.value && colonia.value !=''){
        formData.append('colonia_id',colonia.id); formData.append('colonia',colonia.value);
        cantidad++;
    }
        
    if(codigoP.value && codigoP.value !=''){
        formData.append('codigo_postal_id',codigoP.id); formData.append('codigo_postal',codigoP.value);
        cantidad++;
    }
        
    if(numero.value && numero.value !=''){
        formData.append('numero_id',numero.id); formData.append('numero',numero.value);
        cantidad++;
    }
        

    //fecha
    if(dia.value && dia.value !=''){
        formData.append('dia_id',dia.id); formData.append('dia',dia.value);
        console.log('si hubo un dia');
        cantidad++;
    }
       
    if(mes.value && mes.value !=''){
        formData.append('mes_id',mes.id); formData.append('mes',mes.value);
        console.log('si hubo un mes');
        cantidad++;
    }
     
    if(año.value && año.value !=''){
        formData.append('year_id',año.id); formData.append('year',año.value);
        console.log('si hubo un ano');
        cantidad++;
    }

    if(file){
        formData.append('image', file);
        cantidad++;
    }
        



    if(cantidad == 0){
        //no hace ninguna modificacion
        nombre.value=''; paterno.value=''; materno.value=''; telefono.value='';
        calle.value=''; colonia.value=''; codigoP.value=''; numero.value='';
        dia.value='';  mes.value='';  año.value=''; lada.value='';
        return;
    }
    else{

        console.log("los datos en un momento seran modificados");

        const respuesta = await fetch("/api/editarPerfil",{
                method:"POST",
                body:formData
        })

        if(!respuesta.ok)
            return;

        const respuestaJson = await respuesta.json();



        if(respuestaJson.incorrectos){

            let toastBox = document.getElementById('toastBox');
            let arreglo = respuestaJson.incorrectos;

            console.log(arreglo);

            for(indice in arreglo){
                let temporal = document.getElementById(arreglo[indice][0])
                temporal.style.borderColor = 'red';


                if(arreglo[indice][0] != 'dia' && arreglo[indice][0] != 'mes'){

                    let div = document.createElement('div');
                    div.classList.add('toast');
    
                    if(arreglo[indice][0] == 'año'){
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
            let toastBox = document.getElementById('toastBox');

            for(let i in a){
                let temporal = document.getElementById(a[i][0]);
                temporal.value='';
                temporal.style.borderColor='#34495E';

                let div = document.createElement('div');
                div.classList.add('toast');
                div.innerHTML ='<div id="texto">'+ a[i][1]+'</div> <div id="icono"> <i class="fa-solid fa-user"></i> </div>';
                div.classList.add('blue');
                toastBox.appendChild(div);
                setTimeout(()=>{
                    div.remove();
                },6000);
            }

            return;

        }

        if(respuestaJson.redirect){
            window.location.href = respuestaJson.redirect;
        }
    }
})



document.getElementById('cancelar').addEventListener('click', async()=>{
    //informacion
    document.getElementById('nombre').value = '';
    document.getElementById('paterno').value = '';
    document.getElementById('materno').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('lada').value = '';
    
    //direccion
    document.getElementById('calle').value = '';
    document.getElementById('colonia').value = '';
    document.getElementById('codigoP').value = '';
    document.getElementById('numero').value = '';

    //fecha
    document.getElementById('dia').value = '';
    document.getElementById('mes').value = '';
    document.getElementById('año').value = '';

    window.location.href = '/perfil/informacion';

})