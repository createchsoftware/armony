document.getElementById('guardar').addEventListener('click', async()=>{

    console.log("me hicieron un click");

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

    if(nombre.value)
        campos_a_modificar.push([nombre.value,nombre.id]);
    if(paterno.value)
        campos_a_modificar.push([paterno.value,paterno.id]);
    if(materno.value)
        campos_a_modificar.push([materno.value,materno.id]);
    if(correo.value)
        campos_a_modificar.push([correo.value,correo.id]);
    if(telefono.value)
        campos_a_modificar.push([telefono.value,telefono.id]);


    //direccion
    if(calle.value)
        campos_a_modificar.push([calle.value,calle.id]);
    if(colonia.value)
        campos_a_modificar.push([colonia.value,colonia.id]);
    if(codigoP.value)
        campos_a_modificar.push([codigoP.value,codigoP.id]);
    if(numero.value)
        campos_a_modificar.push([numero.value,numero.id]);

    //fecha
    if(dia.value)
       campos_a_modificar.push([dia.value,dia.id]);
    if(mes.value)
        campos_a_modificar.push([mes.value,mes.id]);
    if(año.value)
        campos_a_modificar.push([año.value,año.id]);



    if(campos_a_modificar.length == 0){
        //no hace ninguna modificacion
        console.log("no modificaste ningun dato");
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