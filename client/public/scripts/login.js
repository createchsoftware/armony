document.getElementById('iniciar-sesion-fet').addEventListener('click', async()=>{

    let input_pass = document.getElementById('pass');
    let input_user_email = document.getElementById('user');
    
    const respuesta = await fetch("http://localhost:3000/api/login",{
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

    if(respuestaJson.redirect){
        console.log("usuario logueado exitosamente");
    }
    
})  