import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faHandHoldingHeart, faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ContenedorProductos from '../../components/ui/ContenedorProductos';
// ^^^ ICONOS PREPARADOS PARA EMPEZAR PAGINA DE "LISTA DE DESEOS"

import Navbar from '../../components/ui/Navbar';

function ListaDeseo() {
    return (
        <>
            <Navbar />
            <div className='flex'>
                <div className='menu-deseo bg-[#fb9ea6] w-1/5'>
                    <div className='flex items-center mx-8 py-8'>
                        <FontAwesomeIcon className='text-2xl' icon={faBars} />
                        <p className='text-xl ml-8'>Mi lista de deseos</p>
                    </div>
                    <ul className='text-xl'>
                        <li className='flex p-2 duration-300 hover:bg-[#ec5766] hover:text-white cursor-pointer mb-2'>
                            <FontAwesomeIcon className='ml-6' icon={faBasketShopping} />
                            <p className='ml-3'>Productos</p>
                        </li>
                        <li className='flex p-2 duration-300 hover:bg-[#ec5766] hover:text-white cursor-pointer'>
                            <FontAwesomeIcon className='ml-6' icon={faHandHoldingHeart} />
                            <p className='ml-3'>Servicios</p>
                        </li>
                    </ul>
                </div>
                <div className='menu-deseo w-4/5'>
                    <img src="../../../pictures/decoArmony1.png" alt="" className='absolute -right-7 -rotate-90 w-60 h-180 top-60' />
                    <div className='flex justify-center mt-5'>
                        <form action="" className='flex items-center w-1/2 justify-center border-2 border-[rgb(255,181,167)] rounded-lg'>
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
                        <ContenedorProductos className='justify-self-center' />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaDeseo;