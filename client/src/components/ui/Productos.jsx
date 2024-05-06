import { useEffect, useState } from 'react';
import { IconoAgregarAlCarrito } from '../ui/Iconos.jsx'
import { Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { jwtDecode } from "jwt-decode";

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

function Productos({ productos }) {

//aqui  en esta parte estamos llamando a una funcion para que cuando se de click al corazon se agrege 
//a la bd
   const [isClick,setIsClicked]=useState(false)
 const [Uid,setUid]=useState(null)
console.log(isClick)

 useEffect(()=>{
const getidUser=()=>{// aqui veificamos si hay una cookie con este nombre 
const cookie=  obteneridCookie('Naruto_cookie')
if(cookie){

    const decode=jwtDecode(cookie)//aqui decodificaremos la cokie
setUid(decode.user)
}
}
getidUser()
 },[])


 const obteneridCookie=(namecookie)=>{ //en este metodo lo que hacemos es destructurar la cokie para 
    //obtener el user y luego el id
const cookies=document.cookie.split(';');
for(let cokie of cookies){
const [key,value]=cokie.split('=')
if(key.trim()=== namecookie){
    return value;//retornara el valor
}
}
return null;
 }



const click=(idp)=>{//si se clickea si hace este metodo

setIsClicked(!isClick)
//if(isClick==true){
const urlADD='http://localhost:3000/api/admin/favoritos/addfavorito'
//     const urlDEL='http://localhost:3000/api/admin/favoritos/delFavorito'
try{

    fetch(urlADD, {
        method: "POST", 
        body: JSON.stringify({//aqui mandamos lo que la info del producto y cliente
        idCliente: Uid,
        IdProducto:idp
     }
        ),
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
}


    //}
    return (
        <div className="w-2/3 m-auto md:w-auto">
            <ul className='grid grid-cols-1 gap-2 md:grid-cols-4 md:ml-28'>
                {
                    productos.map(producto => (
                        <li key={productos.pkIdPS} className='grid place-content-between justify-between border-4 bg-white border-[#E2B3B7] p-6 py-2 rounded-xl'>
                            <Box
                                className="float-right"
                                sx={{
                                    '& > legend': { mt: 2 },
                                }}
                            >
                                <StyledRating
                                    name="customized-color"
                                    defaultValue={0}
                                    max={1}
                                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                    precision={1}
                                    icon={<FavoriteIcon fontSize="inherit" />}
                                    onClick={()=>click(producto.pkIdPS)}//llamada ala funcion 
                                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                />
                            </Box>
                            <img className='m-auto rounded-lg aspect-square'
                                src={'https://i.imgur.com/CCBFmSi.png'}
                                alt={producto.nombre}
                            />
                            <div>
                                <p className='mt-2  text-[#0BC26A] text-lg'>{'$' + producto.precio + ' MXN'}</p>
                                <h3 className='mt-0 text-lg'>{producto.nombre}</h3>
                                <p className='mt-0 text-xs text-justify'>
                                    {producto.descripcion}
                                </p>
                            </div>
                            <div className='mt-2'>
                                <button className=" text-xs transition-all duration-300 px-2 m-auto hover:bg-[#036C65] hover:ring-1  hover:[#036C65] hover:ring-offset-1 group relative flex h-10 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#EB5765] font-[abeatbykai] text-neutral-200"><span>Agregar al carrito</span> <IconoAgregarAlCarrito /> <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-0 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"></div></button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Productos