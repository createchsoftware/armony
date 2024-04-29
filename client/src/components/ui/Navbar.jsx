import React, { Fragment, useState } from 'react'
//import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Carrito from './Carrito.jsx';
import ModalLogin from './Login/PopupLogin.jsx';
import MenuServicios from './SubMenuServicios.jsx'
import MenuPerfil from './MenuPerfil.jsx'

function Navbar( ) {
    const [cart, setCart, showModal, setShowModal] = useState(false);
    const [servicios, setServicios] = useState(false);
    const [perfil, setPerfil] = useState(false);
    const [items, setItems,] = useState(0);

    const toggleCart = () => {
        setCart(!cart)
    };

    const recibirDato = (datoRecibido) => {
        setItems(datoRecibido)
    };

    const toggleServicio = () => {
        setServicios(!servicios)
    };

    const togglePerfil = () => {
        setPerfil(!perfil)
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
                                    <li className="nav-menu-item cursor-pointer">
                                        <a className="menu-link" onClick={toggleServicio}>
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
                                    </li><li className="nav-menu-item">
                                        <a href="#" className="menu-link">
                                            Membresías
                                        </a>
                                    </li>
                                </>
                            )}
                            <li className="nav-menu-item cursor-pointer">
                                <ModalLogin actionElement={
                                    <a href="#" className="menu-link menu-is">Inicia sesión</a>
                                }/>
                                {/* <a className="menu-link flex items-center" onClick={togglePerfil} >
                                    <img src="../../../pictures/userCl.png" alt="" className='rounded-full w-10 h-10'/>
                                    Usuario
                                </a> */}
                                {/* ^^^^^ PARA TESTEAR EL MENU DESPLEGABLE DEL PERFIL, DESCOMENTAR Y COMENTAR EL BOTON "INICIAR SESION" */}
                            </li>
                            {location.pathname !== "/" && (
                                <li className="nav-menu-item">
                                    <a href='/favoritos' className="nav-fav" aria-label="Ir a Favoritos" >
                                        <FontAwesomeIcon icon={faHeart} />
                                    </a>
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
            {servicios && (
                <div className="submenu-fondo">
                    <div className='submenu-fx'>
                        <MenuServicios />
                    </div>
                </div>
            )}

            {cart && (
                <div className='cart-fondo'>
                    <div className='cart-fx'>
                        <Carrito cerrar={toggleCart} enviarDato={recibirDato} />
                    </div>
                </div>
            )}

            {perfil && (
                <div className='usermenu-fondo'>
                    <div className='usermenu-fx'>
                        <MenuPerfil />
                    </div>
                </div>
            )}
            
        </>
    )
}

export default Navbar;