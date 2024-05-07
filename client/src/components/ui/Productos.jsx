import React, { useEffect, useState } from 'react';
import { IconoAgregarAlCarrito } from '../ui/Iconos.jsx';
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
    const [favorites, setFavorites] = useState({});
    const [uid, setUid] = useState(null);

    useEffect(() => {
        const cookie = obteneridCookie('Naruto_cookie');
        if (cookie) {
            const decoded = jwtDecode(cookie);
            setUid(decoded.user);
        }
    }, []);

    const obteneridCookie = (cookieName) => {
        const cookies = document.cookie.split(';');
        const cookie = cookies.find(c => c.trim().startsWith(cookieName + "="));
        return cookie ? cookie.split('=')[1] : null;
    };
    const toggleFavorite = (idProducto) => {
        console.log(setFavorites)
        const estaEnFavoritos = favorites[idProducto];
        const url = estaEnFavoritos ? 'http://localhost:3000/api/admin/favoritos/delFavorito' : 'http://localhost:3000/api/admin/favoritos/addfavorito';

        fetch(url, {
            method: "POST",
            body: JSON.stringify({ idCliente: uid, IdProducto: idProducto }),
            headers: { "Content-Type": "application/json" },
        })
        .then(res => res.json())
        .then(() => {
          
            setFavorites(prev => ({
                ...prev,
                [idProducto]: !estaEnFavoritos
            }));
        })
        .catch(console.error);
    };

    return (
        <div className="w-2/3 m-auto md:w-auto">
            <ul className='grid grid-cols-1 gap-2 md:grid-cols-4 md:ml-28'>
                {productos.map(producto => (
                    <li key={producto.pkIdPS} className='grid place-content-between justify-between border-4 bg-white border-[#E2B3B7] p-6 py-2 rounded-xl'>
                       <Box className="float-right" onClick={() => toggleFavorite(producto.pkIdPS)}>
                     {favorites[producto.pkIdPS] ? 
                    <FavoriteIcon style={{ color: '#ff6d75' }} /> : 
                     <FavoriteBorderIcon  />
    }
</Box>
                        <img className='m-auto rounded-lg aspect-square'
                            src={'https://i.imgur.com/CCBFmSi.png'}
                            alt={producto.nombre}
                        />
                        <div>
                            <p className='mt-2 text-[#0BC26A] text-lg'>{'$' + producto.precio + ' MXN'}</p>
                            <h3 className='mt-0 text-lg'>{producto.nombre}</h3>
                            <p className='mt-0 text-xs text-justify'>
                                {producto.descripcion}
                            </p>
                        </div>
                        <div className='mt-2'>
                            <button className="text-xs transition-all duration-300 px-2 m-auto hover:bg-[#036C65] hover:ring-1 hover:[#036C65] hover:ring-offset-1 group relative flex h-10 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#EB5765] font-[abeatbykai] text-neutral-200">
                                <span>Agregar al carrito</span> <IconoAgregarAlCarrito />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Productos;
