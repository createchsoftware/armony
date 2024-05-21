document.getElementById('cancelar').addEventListener('click', ()=>{

    document.cookie = "Akane_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
    document.cookie = "Himiko_Toga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
    document.cookie = "Shiragiku_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
    document.cookie = "Nezuko_Kamado=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 

    window.location.href = '/';
})