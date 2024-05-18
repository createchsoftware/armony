import React, { Fragment, useEffect, useState } from "react";
//import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Carrito from "./Carrito.jsx";
import PopupLogin from "./Login/PopupLogin.jsx";
import SubMenuServicios from "./SubMenuServicios.jsx"
import MenuPerfil from "./MenuPerfil.jsx";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useCarrito } from '../ui/Carrito.jsx';

function Navbar() {


    const [cart, setCart, showModal, setShowModal] = useState(false);
    const [login, setLogin] = useState(false);
    const [log, setLog] = useState(false); //<<< PARA EL INICIO DE SESION
    const [usuario, setUsuario] = useState(false); //<<< PARA EL INICIO DE SESION
    const [items, setItems] = useState(0);

    const toggleCart = () => {
        setCart(!cart);
    };

    const cantProductos = (dato) => {
        setItems(dato);
    };

    const toggleLogin = () => {
        setLogin(!login);
    };

    async function recibido() {
        const respuesta = await fetch("/api/logueado", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!respuesta.ok) {
            setLog(false);
            setUsuario(null);
        }

        let respuestaJson = await respuesta.json();

        if (respuestaJson.logueado == true) {
            setLog(true);
            setUsuario(respuestaJson.usuario);
        } else {
            setLog(false);
            setUsuario(null);
        }
    }

    useEffect(() => {
        recibido();
    }, []);

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <script src="../../../public/scripts/index.js"></script>
                </Helmet>
            </HelmetProvider>
            <header className="header">
                <div>
                    <nav className="nav">
                        <a href="/">
                            <img
                                src="../../../pictures/armonyLogo.png"
                                alt=""
                                className="logo"
                            />
                        </a>
                        <button className="nav-toggle" aria-label="Abrir Menú">
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        <ul className="menu">
                            <li className="nav-menu-item">
                                <a href="/spa" className="menu-link">
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
                                    <li className="cursor-pointer nav-menu-item">
                                        <a className="menu-link">
                                            Servicios
                                        </a>
                                        <SubMenuServicios />
                                    </li>
                                    <li className="nav-menu-item">
                                        <a href="/spa/productos" className="menu-link">
                                            Productos
                                        </a>
                                    </li>
                                    <li className="nav-menu-item">
                                        {log ? (
                                            <a href="/spa/agendar" className="menu-link">
                                                Agendar
                                            </a>
                                        ) : (
                                            <a href="#" className="menu-link" onClick={toggleLogin}>
                                                Agendar
                                            </a>
                                        )}
                                    </li>
                                </>
                            )}
                            <li className="cursor-pointer nav-menu-item">
                                {log ? (
                                    <>
                                        <a
                                            className="flex items-center h-20 menu-link"
                                        >
                                            <img
                                                src="../../../pictures/userCl.png"
                                                alt=""
                                                className="w-10 h-10 mr-5 rounded-full"
                                            />
                                            {usuario}
                                        </a>
                                        <MenuPerfil />
                                    </>
                                ) : (
                                    <a
                                        href="#"
                                        onClick={toggleLogin}
                                        className="menu-link menu-is"
                                    >
                                        Inicia sesión
                                    </a>
                                )}
                            </li>
                            {location.pathname !== "/" && (
                                <li className="nav-menu-item">
                                    {log ? (
                                        <a
                                            href="/favoritos"
                                            className="nav-fav"
                                            aria-label="Ir a Favoritos"
                                        >
                                            <FontAwesomeIcon icon={faHeart} />
                                        </a>
                                    ) : (
                                        <a
                                            href="#"
                                            className="nav-fav"
                                            aria-label="Ir a Favoritos"
                                            onClick={toggleLogin}
                                        >
                                            <FontAwesomeIcon icon={faHeart} />
                                        </a>
                                    )}
                                </li>
                            )}
                            {location.pathname == "/spa/productos" && (
                                <li className="nav-menu-item">
                                    <button
                                        className="nav-cart"
                                        aria-label="Abrir Carrito"
                                        onClick={toggleCart}
                                    >
                                        <FontAwesomeIcon icon={faCartShopping} />
                                        <span className="text-xs badge badge-pill badge-warning">
                                            {items}
                                        </span>
                                    </button>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>
            {login && <PopupLogin cerrar={toggleLogin} />}

            {cart && (
                <div className="cart-fondo">
                    <div className="cart-fx">
                        <Carrito cerrar={toggleCart} totalProductos={cantProductos} logCart={log} loginCart={toggleLogin} />
                    </div>
                </div>
            )}

            {/* {perfil && (
                <div className="usermenu-fondo">
                    <div className="usermenu-fx">
                        <MenuPerfil />
                    </div>
                </div>
            )} */}
        </>
    );
}

export default Navbar;
