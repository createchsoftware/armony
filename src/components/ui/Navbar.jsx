import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'

function Navbar() {
    return (
        <header className="selection:bg-[#EB5765] selection:text-white bg-white font-[Quinger]">
            <nav className="flex items-center justify-center p-6 mx-auto w-[100%] px-8" aria-label="Global">
                <div className="flex flex-1 text-2xl">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only"></span>
                        <img className="w-auto h-8" src="https://camo.githubusercontent.com/204dc7eb356bf51bfa051c1e9b4e3d24c0bc9da4a4e5fb25c801e8797a12a154/68747470733a2f2f66696c65732e636174626f782e6d6f652f6a3175386f632e706e67" alt="" />
                    </a>
                </div>
                <Popover.Group className="flex gap-x-12">
                    <a href="#" className="text-lg font-semibold leading-6 m-auto text-[#EB5765]">
                        Inicio
                    </a>
                    <a href="#" className="text-lg font-semibold leading-6 m-auto text-[#EB5765]">
                        Nosotros
                    </a>
                    <a href="#" className="text-lg font-semibold leading-6 m-auto text-[#EB5765]">
                        Contacto
                    </a>
                    <div className="flex justify-end flex-1">
                        <a href="#" className="text-lg font-semibold rounded-[7px] leading-6 p-2 h-[39px] bg-[#EB5765] text-white">
                            Inicia Sesión <span aria-hidden="true"></span>
                        </a>
                    </div>
                </Popover.Group>
            </nav>
        </header>
    )
}

export default Navbar
