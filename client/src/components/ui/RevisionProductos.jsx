import { useState } from 'react';
import Carousel from 'react-multi-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Rating } from '@mui/material';
import { faCircleMinus, faCirclePlus, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Ofertas from './Ofertas.jsx'

const ofertas = [
    {
        id: 1,
        nombre: 'Esponjabon',
        precio: 10,
        descripcion: 'Esponjabon floor para baño, formul...',
        imagen: '../../pictures/oferta1.png'
    },
    {
        id: 2,
        nombre: 'Body butter',
        precio: 20,
        descripcion: 'Crema corporal, artesanal, 239 ml.',
        imagen: '../../pictures/oferta2.png'
    },
    {
        id: 3,
        nombre: 'Tónito facial',
        precio: 15,
        descripcion: 'Tónito facial dermatológico...',
        imagen: '../../pictures/oferta3.png'
    },
    {
        id: 4,
        nombre: 'Mascarilla',
        precio: 25,
        descripcion: 'Combina el poder de la arcilla verde...',
        imagen: '../../pictures/oferta4.png'
    },
]


//useEffect para obtener las ofertas
// useEffect(() => {
//     fetch("/api/admin/productos/getProducts")
//         .then(response => response.json())
//         .then(data => {
//             setAllProducts(data);
//         })
//         .catch(error => {
//             console.log('error', error);
//         });
// }, []);


function RevisionProductos({ restart, producto, next }) {
    const [cartItems, setCartItems] = useState(() => {
        if (producto) {
            // Si hay un producto en el prop, lo utilizamos
            return producto;
        } else {
            // Si no hay un producto en el prop, intentamos obtenerlo del localStorage
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : [];
        }
    });
    //  ^^^ ES SOLO TEST PARA PROBAR LA FUNCIONALIDAD DEL RESUMEN DE CITAS

    //Para remover por completo un servicio.
    const removeItem = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
    };
    const increaseQuantity = (itemId) => {
        setCartItems(cartItems.map(item =>
            item.id === itemId ? { ...item, cantidad: item.cantidad + 1 } : item
        ));
    };
    const decreaseQuantity = (itemId, itemQuan) => {
        if (itemQuan == 1) {
            removeItem(itemId);
        } else {
            setCartItems(cartItems.map(item =>
                item.id === itemId ? { ...item, cantidad: Math.max(item.cantidad - 1, 1) } : item
            ));
        }
    };

    const [descuento, setDescuento] = useState('');
    const handleChange = (event) => {
        setDescuento(event.target.value);
    }

    const totalProductos = cartItems.reduce((total, item) => total + item.cantidad, 0);
    const subTotal = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2);
    const ivaTotal = (subTotal * (.08)).toFixed(2);
    const total = (parseFloat(subTotal) + parseFloat(ivaTotal)).toFixed(2);

    const puntos = (parseFloat(total)) / 10;
    //En caso de ser Socio VVV
    //const puntos = (parseInt(totalIva))/5;

    const cartList = cartItems.map(item => (
        <li key={item.id} className="flex p-4 mb-4 border-2 shadow-md rounded-xl border-gray">
            <img className='w-[25%] h-auto mx-4 shadow-md' src={item.imagen} alt={item.nombre} />
            <div className='grid content-between w-3/4 mx-4'>
                <div className='flex justify-between'>
                    <div className='grid'>
                        <span className='mr-5 text-xl font-bold'>{item.nombre}</span>
                        <Rating className='' value={item.valoracion} readOnly unratedcolor="amber" ratedcolor="amber" />
                    </div>
                    <button className='cart-remove' onClick={() => removeItem(item.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
                <div>
                    <span className='text-xs'>{item.descripcion}</span>
                </div>
                <div className="flex justify-between">
                    <div>
                        <button className='ml-2 cart-quan' onClick={() => decreaseQuantity(item.id, item.cantidad)}>
                            <FontAwesomeIcon icon={faCircleMinus} />
                        </button>
                        <span className='ml-2'>{item.cantidad}</span>
                        <button className='ml-2 cart-quan' onClick={() => increaseQuantity(item.id, item.cantidad)}>
                            <FontAwesomeIcon icon={faCirclePlus} />
                        </button>
                    </div>
                    <span className='ml-5 font-bold text-[#036d63]'> ${item.precio.toFixed(2)}</span>
                </div>
            </div>
        </li>
    ));

    return (
        <>
            <div className='grid mb-8'>
                <div className='flex justify-between mx-16'>
                    {/* Bloque de productos */}
                    <div className="rounded-xl shadow-md w-[55%] overflow-y-auto border-2 border-gray">
                        <div className='flex bg-[rgb(3,109,99)] rounded-t-xl justify-between items-center'>
                            <a href="/spa/productos" className='flex items-center ml-6 text-white relative cursor-pointer before:bg-white before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:font-bold'>
                                <FontAwesomeIcon icon={faAngleLeft} />
                                <p className='ml-2'>Volver</p>
                            </a>
                            <p className='py-2 text-lg text-white mr-[45%]'>Resumen</p>
                        </div>
                        {/* Contenido de los productos en carrito */}
                        <div className='px-6 pt-6 overflow-y-visible'>
                            {cartItems.length === 0 ? (
                                <div className='grid'>
                                    <h4 className="mt-4 mb-10 text-xl font-bold justify-self-center">No hay productos en el carrito.</h4>
                                </div>
                            ) : (
                                <>
                                    <ul id="">{cartList}</ul>
                                </>
                            )}
                        </div>
                    </div>
                    {/* Bloque de pago */}
                    <div className="rounded-xl shadow-md w-[40%] h-max border-2 border-gray">
                        <div className='grid bg-[rgb(3,109,99)] rounded-t-xl'>
                            <p className='py-2 pl-8 text-lg text-white justify-self-start'>Pago</p>
                        </div>
                        <div className='px-6 pt-6'>
                            <div className='grid p-6 mb-4 border-2 shadow-md rounded-xl border-gray'>
                                <div className='flex justify-between'>
                                    <span>{totalProductos} Producto(s)</span>
                                    <h1 className='font-bold'>${total}</h1>
                                </div>
                                <div className='flex justify-between'>
                                    <h1>IVA</h1>
                                    <h1 className='font-bold'>${ivaTotal}</h1>
                                </div>
                                <div className='flex justify-between'>
                                    <h1>Envío</h1>
                                    <h1 className='font-bold'>$0.00</h1>
                                </div>
                                <div className='flex justify-between'>
                                    <h1>Cupón</h1>
                                    <h1 className='font-bold'>$0.00</h1>
                                </div>
                            </div>
                            {/* Código de descuento */}
                            <div className='p-6 mb-4 border-2 shadow-md rounded-xl border-gray'>
                                <div className='flex justify-center w-full'>
                                    <h3 className='mb-4 text-xl font-bold text-center justify-self-center'>¿Tienes un cupón de descuento?</h3>
                                </div>
                                <div className='flex justify-between border-2 rounded-full shadow-md border-gray'>
                                    <input
                                        type="text"
                                        value={descuento}
                                        onChange={handleChange}
                                        maxLength="15"
                                        className=' w-[70%] px-2 py-2 text-center rounded-l-full'
                                    />
                                    <button type="submit" className=' w-[30%] rounded-r-full text-center text-white bg-[rgb(3,109,99)] duration-200 hover:bg-[rgb(69,181,156)] hover:font-bold'>Aplicar</button>
                                </div>
                                <div className='flex justify-center w-full'>
                                    <p className='mt-4 text-xs text-center justify-self-center'>Los <p className='text-[#D47300] inline-flex'>Términos y Condiciones de los Cupones</p> de Armony aplican el uso de cupones.</p>
                                </div>
                            </div>
                            <div className='flex justify-between p-6 px-10 mb-4 border-2 shadow-md rounded-xl border-gray'>
                                <h4 className='text-xl font-bold'>Puntos obtenidos:</h4>
                                <span className='font-bold text-[rgb(3,109,99)] text-xl'>{parseInt(puntos)}</span>
                            </div>
                            <div className='flex justify-between p-6 px-10 mb-4 border-2 shadow-md rounded-xl border-gray'>
                                <h4 className='text-xl font-bold'>Total:</h4>
                                <span className='font-bold text-[rgb(3,109,99)] text-xl'>${total}</span>
                            </div>
                        </div>
                        <div className='flex justify-between gap-2 px-6 py-4'>
                            <a href='/spa/productos' className='px-8 py-2 bg-[#ec5766] text-xl text-white rounded-full duration-200 hover:bg-[#ffb5a7]'>
                                Cancelar
                            </a>
                            <button onClick={() => next()} className='px-8 py-2 bg-[#ec5766] text-xl text-white rounded-full duration-200 hover:bg-[#ffb5a7]'>
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RevisionProductos;