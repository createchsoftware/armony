
    
    export  async function getFavoritos(id){
    fetch(`http://localhost:3000/api/admin/productos/FavoritosbyId/${id}`)
    .then(response => response.json())  
    .then(data => {

        return 
    })
    .catch(error => {
        console.log('error', error);
    });
}

