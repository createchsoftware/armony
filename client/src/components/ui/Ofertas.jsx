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

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

function Ofertas({ producto }) {
    const navigate = useNavigate();
    const notify = () => toast("Producto agregado al carrito");
    const { agregarAlCarrito } = useCarrito();

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


    return (
        <div className='m-2 font-[abeatbyKai] grid  content-between h-[97%]'>
            <div className='flex justify-end'>
                <Box
                    className="absolute flex justify-end float-right"
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
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    />
                </Box>
            </div>
            <a href="/spa"><img onClick={() => handleViewMore(producto)} className='w-[100%] aspect-square' src={producto.img} alt={producto.nombre} /></a>
            <hr />
            <p className='text-[#0BC26A] pt-4 text-lg text-center'>{'$' + Number(producto.precio) + ' MXN'} <span className='text-[#000000] line-through'>{'$' + (producto.precio + 130)}</span></p>
            <div className='flex justify-center'>
                <Rating className='' value={5} readOnly unratedcolor="amber" ratedcolor="amber" />
            </div>
            <h6 className='pt-2 text-xl font-bold text-center'>{producto.nombre.length > 27 ? producto.nombre.substring(0, 27) + '...' : producto.nombre}</h6>
            <p className='text-center'>{producto.descripcion}</p>
            <div className='mt-2'>
                <button onClick={() => handleClick(producto)} className=" text-xs transition-all duration-300 px-2 m-auto hover:bg-[#036C65] hover:ring-1  hover:[#036C65] hover:ring-offset-1 group relative flex h-10 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#EB5765] font-[abeatbykai] text-neutral-200">Agregar <IconoAgregarAlCarrito /> <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-0 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"></div></button>
            </div>
        </div>
    )
}
<ToastContainer position={'bottom-right'} theme={'light'} />
export default Ofertas;