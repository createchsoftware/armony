import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faHandHoldingHeart, faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ContenedorProductos from '../../components/ui/ContenedorProductos';
import Navbar from '../../components/ui/Navbar';
import { useState } from 'react';

function ListaDeseo() {
    const [boton1, setBoton1] = useState('lista-boton');
    const [boton2, setBoton2] = useState('lista-boton');
    const [resumen, setResumen] = useState('lista-resumen-off');
    const [width, setWidth] = useState('w-full');

    const [contResumen, setContResumen] = useState([
        { id: 1, name: 'Hidra sense', precio: 500 },
        { id: 2, name: 'CeraVE', precio: 215 },
        { id: 3, name: 'Gojo', precio: 99 },
        { id: 4, name: 'Hidra sense', precio: 500 },
        { id: 5, name: 'CeraVE', precio: 215 },
    ])

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

    const resumenList = contResumen.map(item => (
        <li key={item.id} className='flex justify-between mb-2'>
            <h1>{item.name}</h1>
            <h1 className='text-[#036d63]'>${item.precio}</h1>
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
                        <img src="../../../pictures/decoArmony1.png" alt="" className='absolute -right-7 -rotate-90 w-60 h-180 top-60' />
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
                        <div className='grid p-12'>
                            {/* Contenido */}
                            <ContenedorProductos  className='justify-self-center' />
                        </div>
                    </div>
                    <div className={resumen}>
                        <div className={width}>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaDeseo;