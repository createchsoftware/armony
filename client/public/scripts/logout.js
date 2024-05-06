console.log("Claro que si, el rayo esta listo");



document.getElementById('close').addEventListener('click',()=>{
    console.log("Iniciado proceso de logout")
    document.cookie = "Naruto_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
    window.location.reload();
})