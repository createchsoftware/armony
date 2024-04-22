import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Carrito from './Carrito.jsx';

function Navbar( ) {
    const [cart, setCart] = useState(false);

    const toggleCart = () => {
        setCart(!cart)
    };

    return (
        <>
            <header className="header">
                <div>
                    <nav className="nav" >
                        <a href="/">
                            <img src="../../../pictures/armonyLogo.png" alt="" className="logo" />
                        </a>
                        <button className="nav-toggle" aria-label="Abrir Menú">
                            <FontAwesomeIcon icon={faBars} /> 
                        </button>
                        <ul className="menu">
                            <li className="nav-menu-item">
                                <a href="#" className="menu-link">
                                    Inicio
                                </a>
                            </li>
                            <li className="nav-menu-item">
                                <a href="#" className="menu-link">
                                    Servicios
                                </a>
                            </li>
                            <li className="nav-menu-item">
                                <a href="#" className="menu-link">
                                    Productos
                                </a>
                            </li>
                            <li className="nav-menu-item">
                                <a href="#" className="menu-link">
                                    Agendar
                                </a>
                            </li>
                            <li className="nav-menu-item">
                                <a href="#" className="menu-link menu-is">
                                    Inicia sesión
                                </a>
                            </li>
                            <li className="nav-menu-item">
                                <button className="nav-cart" aria-label="Abrir Lista de Deseo" onClick={toggleCart}>
                                    <FontAwesomeIcon icon={faCartShopping} />
                                    <span className="badge badge-pill badge-warning text-xs">
                                        {0}
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            {cart && (
                <div className='cart-fondo'>
                    <div className='cart-fx'>
                        <Carrito cerrar={toggleCart}/>
                    </div>
                </div>
            )}
            
        </>
    )
}

export default Navbar