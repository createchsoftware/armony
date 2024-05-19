document.getElementById('guardar').addEventListener('click', async()=>{

    console.log("me hicieron un click");

    let regex_vacio = /(^\s*|\s*^)/;

    //datos del usuario
    let nombre = document.getElementById('nombre');
    let paterno = document.getElementById('paterno');
    let materno = document.getElementById('materno');
    let correo = document.getElementById('correo');
    let telefono = document.getElementById('telefono');
    

    //direccion
    let calle = document.getElementById('calle');
    let colonia = document.getElementById('colonia');
    let codigoP = document.getElementById('codigoP');
    let numero = document.getElementById('numero');

    //fecha
    let dia =  document.getElementById('dia');
    let mes =  document.getElementById('mes');
    let año =  document.getElementById('año');

    let campos_a_modificar = [];

    if(nombre.value && nombre.value !='' && regex_vacio.test(nombre.value) == false){
        campos_a_modificar.push([nombre.value,nombre.id]);
    }
        
    if(paterno.value && paterno.value !='' && regex_vacio.test(paterno.value) == false){
        campos_a_modificar.push([paterno.value,paterno.id]);
    }
        
    if(materno.value && materno.value !='' && regex_vacio.test(materno.value) == false){
        campos_a_modificar.push([materno.value,materno.id]);
    }
        
    if(correo.value && correo.value!='' && regex_vacio.test(correo.value) == false){
        campos_a_modificar.push([correo.value,correo.id]);
    }
        
    if(telefono.value && telefono.value!='' && regex_vacio.test(telefono.value) == false){
        campos_a_modificar.push([telefono.value,telefono.id]);
    }
        


    //direccion
    if(calle.value && calle.value !='' && regex_vacio.test(calle.value) == false){
        campos_a_modificar.push([calle.value,calle.id]);
    }
        
    if(colonia.value && colonia.value !='' &&  regex_vacio.test(colonia.value) == false){
        campos_a_modificar.push([colonia.value,colonia.id]);
    }
        
    if(codigoP.value && codigoP.value !='' &&  regex_vacio.test(codigoP.value) == false){
        campos_a_modificar.push([codigoP.value,codigoP.id]);
    }
        
    if(numero.value && numero.value !=''  &&  regex_vacio.test(numero.value) == false){
        campos_a_modificar.push([numero.value,numero.id]);
    }
        

    //fecha
    if(dia.value && dia.value !='' && regex_vacio.test(dia.value) == false){
        campos_a_modificar.push([dia.value,dia.id]);
    }
       
    if(mes.value && mes.value !=''  &&  regex_vacio.test(mes.value) == false){
        campos_a_modificar.push([mes.value,mes.id]);
    }
     
    if(año.value && año.value !=''  &&  regex_vacio.test(año.value) == false){
        campos_a_modificar.push([año.value,año.id]);
    }
        



    if(campos_a_modificar.length == 0){
        //no hace ninguna modificacion
        console.log("no modificaste ningun dato");
        nombre.value=''; paterno.value=''; materno.value=''; correo.value=''; telefono.value='';
        calle.value=''; colonia.value=''; codigoP.value=''; numero.value='';
        dia.value='';  mes.value='';  año.value='';
        return;
    }
    else{

        console.log("los datos en un momento seran modificados");


        let cuerpo = {
            cantidad:campos_a_modificar.length
        }


        for(let i=0;i<campos_a_modificar.length;i++){

            let llave = `${campos_a_modificar[i][1]}`;
            cuerpo[llave] =[campos_a_modificar[i][0],campos_a_modificar[i][1]];
        }


        console.log(cuerpo);
        
        const respuesta = await fetch("/api/editarPerfil",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(cuerpo)

        })

        if(!respuesta.ok)
            return;

        const respuestaJson = await respuesta.json();



        if(respuestaJson.incorrectos){
            let arreglo = respuestaJson.incorrectos
            for(indice in arreglo){
            let temporal = document.getElementById(arreglo[indice])
            temporal.placeholder = "llenaste incorrectamente este campo";
            temporal.style.backgroundColor = 'yellow';
            }
        }


        if(respuestaJson.correo_existente){
            correo.placeholder = "El correo que quieres ingresar no es valido";
            correo.style.backgroundColor = 'yellow';
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
    document.getElementById('correo').value = '';
    document.getElementById('telefono').value = '';
    
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