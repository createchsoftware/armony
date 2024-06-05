import { IconoAgregarAlCarrito } from '../ui/Iconos.jsx'
import { Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { CarritoProvider } from '../ui/Carrito.jsx'
import { useCarrito } from '../ui/Carrito.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});



function ProductosFav({ props }) {
    const navigate = useNavigate();
    const [fav, setFav] = useState(props.favorito);
    const [login, setLogin] = useState(false);

    console.log("es favorito??????/", props.favorito);

    useEffect(() => {
    }, [])


    const toggleLogin = () => {
        setLogin(!login);
    };

    const checkFav = () => {
        if (props.log == true) {
            console.log(10);
        } else {
            toggleLogin();
        }
    };

    const callFav = async () => {
        if (props.id != 0) {
            try {
                const respuesta = await fetch("/api/admin/productos/setFavorito", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: props.id,
                        idPS: props.ps,
                        estado: props.favorito,
                    }),
                });

                let respuestaJson = await respuesta.json();
                if ((await respuestaJson[0].res) == true) {
                    setFav(!fav);
                }
            } catch (error) {
                console.log(error, "error");
            }
        }
    };

    useEffect(() => {
        if (fav !== props.favorito) {
            props.st();
        }
    }, [fav]);

    const handleClick = (producto) => {
        notify();
        handleAgregarAlCarrito(producto);
    }

    const notify = () => toast("Producto agregado al carrito");
    const { agregarAlCarrito } = useCarrito();


    const handleViewMore = (props) => {
        // navigate to the product page with the product current id
        const product = {
            uid: props.id,
            id: props.ps,
            nombre: props.nombre,
            precio: parseFloat(props.precio),
            descripcion: props.descripcion,
            valoracion: props.valoracion || 0,
            imagen: props.img,
            favorito: props.favorito,
        };
        navigate(`/spa/producto/${product.id}`, { state: { product } });
    }

    const handleAgregarAlCarrito = (props) => {
        const productoParaCarrito = {
            id: props.ps,
            nombre: props.nombre,
            precio: parseFloat(props.precio),
            cantidad: 1,
            descripcion: props.descripcion,
            valoracion: props.valoracion || 0,
            imagen: props.img,
        };
        agregarAlCarrito(productoParaCarrito);
    };


    return (
        <li key={props.ps} className='border-4 bg-white grid content-between border-[#E2B3B7] p-6 py-2 rounded-xl'>
            <div className='flex justify-end'>
                {/* <Box className="float-right hover:cursor-pointer" onClick={() => toggleFavorite(producto.pkIdPS)}>
                                    {favorites[producto.pkIdPS] ?
                                        <FavoriteIcon style={{ color: '#ff6d75' }} /> :
                                        <FavoriteBorderIcon />
                                    }
                                </Box> */}
                <Box
                    className="absolute flex justify-end float-right -mr-3"
                    sx={{
                        '& > legend': { mt: 2 },
                    }}
                >
                    <StyledRating
                        name="customized-color"
                        max={1}
                        // value={uid ? (producto.favorito || favorites[producto.pkIdPS]) ? 1 : 0 : JSON.parse(localStorage.getItem("favoritos"))?.some(fav => fav.pkIdPS === producto.pkIdPS) ? 1 : 0}
                        // value={uid ? favorites[producto.pkIdPS] ? 1 : 0 : JSON.parse(localStorage.getItem("favoritos"))?.some(fav => fav.pkIdPS === producto.pkIdPS) ? 1 : 0}
                        getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                        precision={1}
                        defaultValue={props.favorito}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                        onClick={() => callFav()}
                    />
                </Box>
            </div>
            <img data-tooltip-id="ver" data-tooltip-content="Ver producto" onClick={() => handleViewMore(props)} className='w-2/3 m-auto mt-6 mb-4 rounded-lg hover:cursor-pointer hover:opacity-60 aspect-square'
                src={props.img ? props.img : 'https://i.imgur.com/CCBFmSi.png'}
                // src={'https://i.imgur.com/CCBFmSi.png'}
                alt={props.nombre}
            />
            <div>
                <p className='mt-2  text-[#0BC26A] text-lg'>{'$' + props.precio + ' MXN'}</p>
                <Rating className='' value={Math.floor(parseFloat(props.valoracion))} readOnly unratedcolor="amber" ratedcolor="amber" />
                <h3 className='mt-0 text-lg'>{props.nombre.substring(0, 15) + '...'}</h3>
                <p className='mt-0 text-xs text-justify'>
                    {props.descripcion.substring(0, 40) + '...'}
                </p>
            </div>
            <div className='mt-2'>
                <button onClick={() => handleClick(props)} className=" text-xs gap-2  transition-all duration-300 px-8  hover:bg-[#036C65] hover:ring-1  hover:[#036C65] hover:ring-offset-1 group relative flex h-10 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#EB5765] font-[abeatbykai] text-neutral-200"><span>Agregar</span> <IconoAgregarAlCarrito /> <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-0 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"></div></button>
            </div>
            <Tooltip id="ver" />
        </li>
    )
}

export default ProductosFav