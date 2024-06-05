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


function Ofertas({ props, handleClickCarrito, noDesc }) {
    const notify = () => toast("Producto agregado al carrito");
    const { agregarAlCarrito } = useCarrito();
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



    const handleViewMore = (props) => {
        // navigate to the product page with the product current id
        const product = {
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

    const formatPrice = (price) => {
        return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }


    return (
        <>
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
                            max={1}
                            defaultValue={props.favorito}
                            // value={producto.favorito || favorites[producto.pkIdPS] ? 1 : 0}
                            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={1}
                            icon={<FavoriteIcon fontSize="inherit" />}
                            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                            onClick={() => callFav()}
                        />
                    </Box>
                </div>
                <img data-tooltip-id="ver" data-tooltip-content="Ver producto" onClick={() => handleViewMore(props)} className='w-[100%] h-[100%] hover:opacity-80 ml-0  hover:cursor-pointer aspect-square' src={props.img} alt={props.nombre} />
                <hr />
                <div className='grid h-64 place-content-between'>
                    <p className='text-[#0BC26A] pt-4 text-lg text-center'>{'$' + Number(props.precio) + ' MXN'} <span className='text-[#000000] line-through'>{'$' + formatPrice(Number(props.precio) + 120)}</span></p>
                    <div className='flex justify-center'>
                        <Rating className='' value={props.valoracion} readOnly unratedcolor="amber" ratedcolor="amber" />
                    </div>
                    <h6 className='pt-2 text-xl font-bold text-center'>{props.nombre.length > 27 ? props.nombre.substring(0, 20) + '...' : props.nombre}</h6>
                    <p className='text-center'>{props.descripcionOferta}</p>
                    <div className='mt-2'>
                        <button onClick={() => handleClick(props)} className=" text-xs transition-all duration-300 px-2 m-auto hover:bg-[#036C65] hover:  hover:[#036C65] hover:ring-offset-1 group relative flex h-10 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#EB5765] font-[abeatbykai] text-neutral-200">Agregar <IconoAgregarAlCarrito /> <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-0 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"></div></button>
                    </div>
                </div>
                <Tooltip id="ver" />
            </div>
        </>
    )
}
<>

</>

export default Ofertas;