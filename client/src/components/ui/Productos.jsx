import { IconoAgregarAlCarrito } from '../ui/Iconos.jsx'
import { Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { CarritoProvider } from '../ui/Carrito.jsx'
import { useCarrito } from '../ui/Carrito.jsx'
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import ProductosFav from './ProductosFav.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

function Productos({ productos, st, log, idUser }) {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState({});
    const [uid, setUid] = useState(null);


    useEffect(() => {
    }, [])


    // useEffect(() => {
    //     const Prod = async () => {
    //         try {
    //             if (uid) {
    //                 //este fetch traera todos los favoritos del cliente,solo incluyendo servicios y productos
    //                 const response = await fetch(`/api/admin/favoritos/FavoritosbyId/${uid}`)
    //                 const data = await response.json();
    //                 setContResumen(data)
    //                 console.log(data)
    //             }
    //         } catch (error) {
    //             console.error("hubo error :", error)
    //         }
    //     }
    //     Prod()
    // }, [uid])


    const toggleFavorite = async (idProducto) => {
        const estaEnFavoritos = favorites[idProducto.pkIdPS];

        if (uid) {
            try {
                fetch('/api/admin/favoritos/invertirFav', {
                    method: "POST",
                    body: JSON.stringify({ idCliente: uid, IdProducto: idProducto.pkIdPS }),
                    headers: { "Content-Type": "application/json" },
                });

                setFavorites(prev => ({
                    ...prev,
                    [idProducto.pkIdPS]: !estaEnFavoritos
                }));


            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        } else {
            setFavorites(prev => ({
                ...prev,
                [idProducto.pkIdPS]: !estaEnFavoritos
            }));
            let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
            const estaEnFavoritos = favoritos.some(fav => fav.pkIdPS === idProducto.pkIdPS);
            if (!estaEnFavoritos) {

                favoritos.push(idProducto);
                localStorage.setItem("favoritos", JSON.stringify(favoritos));
            } else {
                let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
                favoritos = favoritos.filter((obj) => obj.pkIdPS !== idProducto.pkIdPS);
                localStorage.setItem("favoritos", JSON.stringify(favoritos));
            }
        }
    };

    console.log(productos)
    return (
        <div className="w-2/3 m-auto md:w-auto">
            <ul className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:ml-28'>
                {
                    productos.map(producto => (
                        <ProductosFav
                            props={{
                                id: idUser,
                                log: log,
                                ps: producto.pkIdPS,
                                nombre: producto.nombre,
                                descripcion: producto.descripcion,
                                img: producto.img,
                                precio: producto.precio,
                                valoracion: producto.valoracion,
                                favorito: producto.favorito,
                                st: st,
                            }}
                        />
                    ))
                }
            </ul>
            <ToastContainer position={'top-right'} theme={'light'} />
        </div>
    )
}

export default Productos