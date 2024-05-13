import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconoAgregarAlCarrito } from '../../components/ui/Iconos'
import { faBasketShopping, faHandHoldingHeart, faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ContenedorProductos from '../../components/ui/ContenedorProductos';
import Navbar from '../../components/ui/Navbar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import { Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

function ListaDeseo() {
    const [boton1, setBoton1] = useState('lista-boton');
    const [boton2, setBoton2] = useState('lista-boton');
    const [resumen, setResumen] = useState('lista-resumen-off');
    const [width, setWidth] = useState('w-full');

    const [contResumen, setContResumen] = useState([{
        id: 1,
        nombre: 'Producto 1',
        precio: 100,
        categoria: 'Cosméticos',
        marca: 'POND’S',
        valoracion: 4,
        masVendido: false,
        imagen: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
        id: 2,
        nombre: 'Producto 2',
        precio: 200,
        categoria: 'Facial',
        marca: 'Hidra Sense',
        valoracion: 3,
        masVendido: true,
        imagen: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
        id: 3,
        nombre: 'Producto 3',
        precio: 300,
        categoria: 'Crema',
        marca: 'Savasana',
        valoracion: 2,
        masVendido: false,
        imagen: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
        id: 4,
        nombre: 'Producto 4',
        precio: 400,
        categoria: 'Spray',
        marca: 'CeraVe',
        valoracion: 1,
        masVendido: true,
        imagen: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
        id: 5,
        nombre: 'Producto 5',
        precio: 500,
        categoria: 'Serúm',
        marca: 'Cetaphil',
        valoracion: 5,
        masVendido: false,
        imagen: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-05.jpg',
        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
        id: 6,
        nombre: 'Producto 6',
        precio: 600,
        categoria: 'Depilación',
        marca: 'Mizon',
        valoracion: 4,
        masVendido: true,
        imagen: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-06.jpg',
        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },])

    const presionar1 = () => {
        setBoton1('lista-boton-on')
        setBoton2('lista-boton')
        setResumen('lista-resumen-on')
        setWidth('w-1/2')
    }
    const presionar2 = () => {
        setBoton2('lista-boton-on')
        setBoton1('lista-boton')
        setResumen('lista-resumen-off')
        setWidth('w-full')
    }

    const removeProducto = (itemId) => {
        setContResumen(contResumen.filter(item => item.id !== itemId));
    };

    const resumenList = contResumen.map(item => (
        <li key={item.id} className='flex justify-between mb-2'>
            <h1>{item.nombre}</h1>
            <h1 className='text-[#036d63]'>${item.precio}</h1>
        </li>
    ))

    const contenido = contResumen.map(producto => (
        <li key={producto.id} className='grid border-4 bg-white border-[#E2B3B7] p-6 py-2 rounded-xl mx-6 mb-6'>
            <Box
                className="float-right"
                sx={{
                    '& > legend': { mt: 2 },
                }}
            >
                <StyledRating
                    name="customized-color"
                    defaultValue={1}
                    max={1}
                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                    precision={1}
                    icon={<FavoriteIcon fontSize="inherit" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    onClick={() => removeProducto(producto.id)}
                />
            </Box>
            <img className='w-2/3 justify-self-center m-auto mb-4 rounded-lg aspect-square'
                src={'https://i.imgur.com/CCBFmSi.png'}
                alt={producto.nombre}
            />
            <div>
                <p className='mt-2  text-[#0BC26A] text-lg'>{'$' + producto.precio + ' MXN'}</p>
                <Rating className='' value={producto.valoracion} readOnly unratedcolor="amber" ratedcolor="amber" />
                <h3 className='mt-0 text-xl font-bold'>{producto.nombre}</h3>
                <p className='mt-0 text-xs text-justify'>
                    {producto.descripcion}
                </p>
            </div>
            <div className='grid mt-2'>
                <button className=" text-xs gap-2  transition-all duration-300 px-8  hover:bg-[#036C65] hover:ring-1  hover:[#036C65] hover:ring-offset-1 group relative flex h-10 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#EB5765] font-[abeatbykai] text-neutral-200"><span>Agregar</span> <IconoAgregarAlCarrito /> <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-0 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"></div></button>
            </div>
        </li>
    ))

    const precioTotal = contResumen.reduce((acc, item) => acc + item.precio, 0).toFixed(2);
    const cantProductos = contResumen.length;

    return (
        <>
            <Navbar />
            <div className='w-full overflow-hidden'>
                <div className='flex w-[120%]'>
                    <div className='menu-deseo bg-[#fb9ea6] w-[32%]'>
                        <div className='flex items-center mx-8 py-8'>
                            <FontAwesomeIcon className='text-2xl' icon={faBars} />
                            <p className='text-xl ml-8'>Mi lista de deseos</p>
                        </div>
                        <ul className='text-xl'>
                            <li className={boton1} onClick={presionar1}>
                                <FontAwesomeIcon className='ml-6' icon={faBasketShopping} />
                                <p className='ml-3'>Productos</p>
                            </li>
                            <li className={boton2} onClick={presionar2}>
                                <FontAwesomeIcon className='ml-6' icon={faHandHoldingHeart} />
                                <p className='ml-3'>Servicios</p>
                            </li>
                        </ul>
                    </div>
                    <div className='menu-deseo w-full'>
                        <img src="../../../pictures/decoArmony1.png" alt="" className='absolute -right-7 -rotate-90 w-60 h-180 top-60 z-0' />
                        <div className='flex justify-center mt-5'>
                            <form action="" className='flex items-center w-4/5 justify-center border-2 border-[rgb(255,181,167)] rounded-lg'>
                                <input
                                    className='w-full rounded-lg px-5 py-2'
                                    type="buscar"
                                    placeholder="Buscar..."
                                />
                                <FontAwesomeIcon icon={faMagnifyingGlass} className='mx-4 text-[rgb(255,181,167)] text-xl' />
                            </form>
                        </div>
                        <div className='grid p-12 overflow-y-scroll'>
                            {/* Contenido */}
                            { contResumen.length === 0 ? (
                                <p className='m-auto'>No se encontraron productos</p>
                            ):(
                                <ul className='grid grid-cols-1 gap-2 md:grid-cols-3'>{contenido}</ul>
                            )}
                        </div>
                    </div>
                    <div className={resumen}>
                        <div className={width}>
                            { contResumen.length === 0 ? (
                                <h1 className='text-center text-xl py-6'>No hay artículos</h1>
                            ):(
                                <>
                                    <h1 className='text-center text-xl py-6'>Total artículos ({cantProductos})</h1>
                                    <hr className='border-2 w-full border-black' />
                                    <ul className='p-8'>{resumenList}</ul>
                                    <hr className='border-2 w-full border-black mb-6' />
                                    <h1 className='text-left text-xl px-6 mb-4'>Gastos de envío</h1>
                                    <p className='text-left text-gray-500 text-l px-6'>Si tu compra supera $1,000 conseguiras gastos de envío gratis.</p>
                                    { precioTotal >= 1000 ? (
                                        <p className='text-right text-[#45b59c] text-l px-6'>Envío gratis.</p>
                                    ):(
                                        <p className='text-right text-[#45b59c] text-l px-6'>Envío NO gratis.</p>
                                    )}
                                    <hr className='border-2 w-full border-black my-6' />
                                    <div className='flex justify-between px-8'>
                                        <h1 className='text-xl'>Total:</h1>
                                        <h1 className='text-[#036d63] text-xl'>${precioTotal}</h1>
                                    </div>
                                    <div className='grid'>
                                        <button className='bg-[#ec5766] p-2 text-white mx-6 rounded-xl my-2 duration-200 hover:bg-[#ffb5a7]'>Comprar</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaDeseo;