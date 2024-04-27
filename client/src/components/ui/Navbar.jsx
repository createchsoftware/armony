import React, { Fragment, useState } from 'react'
//import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Carrito from './Carrito.jsx';
import ModalLogin from './Login/ModalLogin.jsx';

function Navbar( ) {
    const [cart, setCart, showModal, setShowModal] = useState(false);
    const [items, setItems] = useState(0);

    const toggleCart = () => {
        setCart(!cart)
    };

    const recibirDato = (datoRecibido) => {
        setItems(datoRecibido);
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
                            {location.pathname == "/" && (
                                <>
                                    <li className="nav-menu-item">
                                        <a href="#nosotros" className="menu-link">
                                            Nosotros
                                        </a>
                                    </li>
                                    <li className="nav-menu-item">
                                        <a href="#contacto" className="menu-link">
                                            Contacto
                                        </a>
                                    </li>
                                </>
                            )}
                            {location.pathname !== "/" && (
                                <>
                                    <li className="nav-menu-item">
                                        <a href="#" className="menu-link">
                                            Servicios
                                        </a>
                                    </li>
                                    <li className="nav-menu-item">
                                        <a href="/spa/tienda" className="menu-link">
                                            Productos
                                        </a>
                                    </li><li className="nav-menu-item">
                                        <a href="#" className="menu-link">
                                            Agendar
                                        </a>
                                    </li>
                                </>
                            )}
                            <li className="nav-menu-item">
                                <ModalLogin />
                            </li>
                            {location.pathname !== "/" && (
                                <li className="nav-menu-item">
                                    <button className="nav-fav" aria-label="Ir a Favoritos" >
                                        <FontAwesomeIcon icon={faHeart} />
                                    </button>
                                </li>
                            )}
                            {location.pathname == "/spa/tienda" && (
                                <li className="nav-menu-item">
                                    <button className="nav-cart" aria-label="Abrir Carrito" onClick={toggleCart}>
                                        <FontAwesomeIcon icon={faCartShopping} />
                                        <span className="badge badge-pill badge-warning text-xs">
                                            {items}
                                        </span>
                                    </button>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>
            {cart && (
                <div className='cart-fondo'>
                    <div className='cart-fx'>
                        <Carrito cerrar={toggleCart} enviarDato={recibirDato} />
                    </div>
                </div>
            )}
            
        </>
    )
}

export default Navbar