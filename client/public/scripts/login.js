console.log("hola mundo");


document.getElementById('iniciar-sesion-fet').addEventListener('submit', async(e)=>{

    console.log("se mando a llamar el metodo");

    e.preventDefault();
    
    const respuesta = await fetch("http://localhost:3000/api/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            user_or_email:e.target.children.user.value,
            password:e.target.children.pass.value
        })
    })

    if(!respuesta.ok)
       return;

    const respuestaJson = await respuesta.json();

    if(respuestaJson.redirect){
        console.log("usuario logueado exitosamente");
    }
    
})  