

//import { usuarioid } from '../controllers/authentication.controllers';
export let ProductosFavorito=[];
export const contFavorito=0;
export const contCarrito=0;    


    export  async function getFavoritosLog(id){
    fetch(`/api/admin/productos/FavoritosbyId/${id}`)
    .then(response => response.json())  
    .then(data => {

        return data;//aqui regresamos todos lo favoritos del cliente
    })
    .catch(error => {
        console.log('error', error);
    });
}


async function Heard(idproducto){
try{
    const urlADD='/api/admin/favoritos/addfavorito'
//     const urlDEL='/api/admin/favoritos/delFavorito'

    var data={
        idCliente: usuarioid,
        IdProducto: idproducto
    }

// //se tomara el valor de estado del corazon 
// //si esta activo se agregara 
// //si se desativa se borrara
// //es un metodo provisional,se mejorara

    fetch(urlADD, {
        method: "POST", 
        body: JSON.stringify(data),//aqui mandamos la info para anadir un favorito
        headers: {
          "Content-Type": "application/json",
        },
      })
      /*capturacion de errores */
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => console.log("Success:", response));

    }catch(err){
      throw new err('error al procesar la solicitud',err)
    }
    // fetch(urlDEL, {
    //     method: "POST", 
    //     body: JSON.stringify(data),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((res) => res.json())
    //     .catch((error) => console.error("Error:", error))
    //     .then((response) => console.log("Success:", response));

}






//       --------------------- sin logear ------------------


//regresar los favoritos guardados en invitado
export  async function getFavoritosNoLog(){
ProductosFavorito.forEach(element => {
    return ParseJson.stringify(element)
  });
}

//aqui en este codigo lo que hacemos es extraer la info del producto
/*y guardandola de forma local cabe destacar que esta informacion se borrara una vez 
se de refrech ala pagina ya que solo es invitado 
funcionario de igual forma para el carrito
*/
export function HeardAddNoLog(favorito){
  const {id,nombre,precio,descripcion}=favorito
   
  const producto=[
contFavorito++,//esta sera un id provisional solo para identificarla aqui 
id,
nombre,
precio,descripcion
]
  localStorage.setItem(id,JSON.stringify(producto))
}

//esta funcion lo que hace es elminar  un producto que eligio un usuario m¿no logeado
export function HeardDelNoLog(id){
  localStorage.removeItem(id)
}

module.exports=Heard