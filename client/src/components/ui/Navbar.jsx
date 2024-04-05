import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'

function Navbar() {
    return (
        <header className="header">
                <div>
                    <nav className="nav" >
                        <a href="#">
                            <img src="../../../pictures/armonyLogo.png" alt="" className="logo" />
                        </a>
                        <button className="nav-toggle" aria-label="Abrir Menú">
                            <i className="fa-solid fa-bars" />
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
                                <a href="" className="menu-link menu-is">
                                    Inicia sesión
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
    )
}

export default Navbar
