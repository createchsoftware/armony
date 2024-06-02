import React, { useEffect, useState } from "react";
//import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Carrito from "./Carrito.jsx";
import PopupLogin from "./Login/PopupLogin.jsx";
import SubMenuServicios from "./SubMenuServicios.jsx"
import MenuPerfil from "./MenuPerfil.jsx";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useCarrito } from '../ui/Carrito.jsx'
import { useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();

    const { getCartItemsCount } = useCarrito();
    const [clave, setClave] = useState(false);
    const [cart, setCart, showModal, setShowModal] = useState(false);
    const [login, setLogin] = useState(false);
    const [log, setLog] = useState(false); //<<< PARA EL INICIO DE SESION
    const [usuario, setUsuario] = useState(); //<<< PARA EL INICIO DE SESION
    const [imagen, setImagen] = useState()
    const [items, setItems] = useState(0);
    const [rango, setRango] = useState(0); //<<< MUESTRA EL RANGO DEL USUARIO
    const [sus, setSus] = useState(false); //<<< CARACTERISTICA GRAFICA DE QUE EL USUARIO ES SOCIO

    const spaRutas = location.pathname.startsWith('/spa') ||
        location.pathname.startsWith('/favoritos') ||
        location.pathname.startsWith('/rangos') ||
        location.pathname.startsWith('/suscripcion')
    const mainRutas = location.pathname.startsWith('/perfil')

    async function callRango() {
        const respuesta3 = await fetch("/api/perfil/rangos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (!respuesta3.ok) {
          return;
        }
    
        const respuesta3Json = await respuesta3.json();
    
        if (respuesta3Json.informacion) {
          setRango(respuesta3Json.informacion[0]);
        }
    }

    //auto update cart items in navbar (items)
    useEffect(() => {
        const updateCartItems = () => {
            setItems(getCartItemsCount());
        };
        updateCartItems();
    }, [getCartItemsCount]);

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
            setImagen(null);
        }

        let respuestaJson = await respuesta.json();

        if (respuestaJson.logueado == true) {
            setLog(true);
            setUsuario(respuestaJson.nombre);
            setImagen(respuestaJson.imagen);
            setClave(respuestaJson.clave);
        } else {
            setLog(false);
            setUsuario(null);
            setImagen(null);
        }
    }

    useEffect(() => {
        callRango();
        recibido();
    }, []);
    
    useEffect(() => {
        
        const Prod = async () => {
            try {
                if (clave) {
    
                    const response = await fetch(`/api/admin/cliente/StatusSus/${clave}`)
                    const data = await response.json();
                    setSus(data)
                }
            } catch (error) {
                console.error("hubo error :", error)
            }
        }
        Prod()
    }, [clave])

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
                                alt="Logo de armony, aquí puedes ir al inicio del sitio web."
                                className="logo"
                            />
                        </a>
                        <button className="nav-toggle" aria-label="Abrir Menú">
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        <ul className="menu">
                            {location.pathname === '/' && (
                                <>
                                    <li className="nav-menu-item">
                                        <a href="#" className="menu-link">
                                            Inicio
                                        </a>
                                    </li>
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
                            {mainRutas && (
                                <>
                                    <li className="nav-menu-item">
                                        <a href="/spa" className="menu-link">
                                            Inicio
                                        </a>
                                    </li>
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
                            {spaRutas && (
                                <>
                                    <li className="nav-menu-item">
                                        <a href="/spa" className="menu-link">
                                            Inicio
                                        </a>
                                    </li>
                                    <li className="nav-menu-item">
                                        <a href="/suscripcion" className="menu-link">
                                            Suscripción
                                        </a>
                                    </li>
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
                                            <div className="relative mr-3 align-middle w-14 h-14">
                                                {sus && (
                                                    <img
                                                        src="../../../pictures/marcoSuscripcion.png"
                                                        alt="Marco decorativo para socios."
                                                        className="absolute object-cover w-full h-full m-auto"
                                                    />
                                                )}
                                                <div className="flex w-full h-full items-center justify-center">
                                                    <img
                                                        src={imagen !== null ? (
                                                            `../../../pictures/avatares/${imagen}`
                                                        ) : (
                                                            '../../../pictures/userDefault.png'
                                                        )}
                                                        alt="Foto de perfil del usuario."
                                                        className="w-[80%] h-[80%] m-auto my-[5%] rounded-full"
                                                    />
                                                </div>
                                            </div>
                                            {usuario}
                                            {rango === 1 ? (
                                                <img
                                                    src="../../../pictures/rangoOro.png"
                                                    alt="Eres rango oro."
                                                    className="w-4 h-auto m-auto ml-2"
                                                />
                                            ) : (
                                                rango === 2 ? (
                                                    <img
                                                        src="../../../pictures/nuevoPlatino.png"
                                                        alt="Eres rango platino."
                                                        className="w-4 h-auto m-auto ml-2"
                                                    />
                                                ) : (
                                                    rango === 3 ? (
                                                        <img
                                                            src="../../../pictures/nuevoVIP.png"
                                                            alt="Eres rango VIP."
                                                            className="w-4 h-auto m-auto ml-2"
                                                        />
                                                    ) : ''
                                                )
                                            )}
                                        </a>
                                        <MenuPerfil />
                                    </>
                                ) : (
                                    <a
                                        onClick={toggleLogin}
                                        className="menu-link menu-is"
                                    >
                                        Inicia sesión
                                    </a>
                                )}
                            </li>
                            {spaRutas && (
                                <li className="nav-menu-item">
                                    <a
                                        href="/favoritos"
                                        className="nav-fav"
                                        aria-label="Ir a Favoritos"
                                    >
                                        <FontAwesomeIcon icon={faHeart} />
                                    </a>
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
                            {location.pathname.includes("/producto/") && (
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
                <div className="overflow-y-auto cart-fondo">
                    <div className="overflow-y-auto cart-fx">
                        <Carrito cerrar={toggleCart} totalProductos={cantProductos} cartLogin={toggleLogin} />
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;
