import { ChevronRight } from 'lucide-react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconoAgregarAlCarrito } from '../ui/Iconos.jsx'
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../ui/Carrito.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopupLogin from "../../components/ui/Login/PopupLogin";
import { useState } from 'react'
import { useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});


function Ofertas({ producto, handleClickCarrito, noDesc }) {
    const navigate = useNavigate();
    const notify = () => toast("Producto agregado al carrito");
    const { agregarAlCarrito } = useCarrito();

    const [favorites, setFavorites] = useState({});
    const [uid, setUid] = useState(null);

    useEffect(() => {
        localStorage.removeItem("favoritos")
    }, [])

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

    const handleViewMore = (producto) => {
        // navigate to the product page with the product current id
        const product = {
            id: producto.pkIdPS,
            nombre: producto.nombre,
            precio: parseFloat(producto.precio),
            descripcion: producto.descripcion,
            valoracion: producto.valoracion || 5,
            imagen: producto.img,
        };
        navigate(`/spa/producto/${product.id}`, { state: { product } });
    }

    const handleClick = (producto) => {
        notify();
        handleAgregarAlCarrito(producto);
    }

    const handleAgregarAlCarrito = (producto) => {
        const productoParaCarrito = {
            id: producto.pkIdPS,
            nombre: producto.nombre,
            precio: parseFloat(producto.precio),
            cantidad: 1,
            descripcion: producto.descripcion,
            valoracion: producto.valoracion || 5,
            imagen: producto.img,
        };
        agregarAlCarrito(productoParaCarrito);
    };

    const formatPrice = (price) => {
        return Number(price).toFixed(2);
    }

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

    return (
        <div className='my-2 mx-4 font-[abeatbyKai] grid  content-between h-[97%]'>
            <div className='flex justify-end'>
                <Box
                    className="absolute z-20 flex justify-end float-right m-2"
                    sx={{
                        '& > legend': { mt: 0 },
                    }}
                >
                    <StyledRating
                        name="customized-color"
                        defaultValue={0}
                        max={1}
                        value={producto.favorito || favorites[producto.pkIdPS] ? 1 : 0}
                        getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                        onChange={() => toggleFavorite(producto)}
                    />
                </Box>
            </div>
            <img onClick={() => handleViewMore(producto)} className='w-[100%] h-[100%] hover:opacity-80 ml-0  hover:cursor-pointer aspect-square' src={producto.img} alt={producto.nombre} />
            <hr />
            <div className='grid h-64 place-content-between'>
                <p className='text-[#0BC26A] pt-4 text-lg text-center'>{'$' + Number(producto.precio) + ' MXN'} <span className='text-[#000000] line-through'>{'$' + formatPrice(Number(producto.precio) + 120)}</span></p>
                <div className='flex justify-center'>
                    <Rating className='' value={5} readOnly unratedcolor="amber" ratedcolor="amber" />
                </div>
                <h6 className='pt-2 text-xl font-bold text-center'>{producto.nombre.length > 27 ? producto.nombre.substring(0, 27) + '...' : producto.nombre}</h6>
                <p className='text-center'>{producto.descripcionOferta}</p>
                <div className='mt-2'>
                    <button onClick={() => handleClick(producto)} className=" text-xs transition-all duration-300 px-2 m-auto hover:bg-[#036C65] hover:  hover:[#036C65] hover:ring-offset-1 group relative flex h-10 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#EB5765] font-[abeatbykai] text-neutral-200">Agregar <IconoAgregarAlCarrito /> <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-0 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"></div></button>

                </div>
            </div>
        </div >
    )
}
<ToastContainer position={'bottom-right'} theme={'light'} />
export default Ofertas;