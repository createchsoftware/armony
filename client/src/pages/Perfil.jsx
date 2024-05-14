import React, { useState, useEffect } from 'react'
import LayoutPrincipal from '../layouts/LayoutPrincipal'
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";

function Perfil() {

    const [nombre, setNombre] = useState(false); //<<< PARA EL INICIO DE SESION
    const [correo, setCorreo] = useState(false); //<<< PARA EL INICIO DE SESION

    async function recibido() {
        const respuesta = await fetch('/api/logueado', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (!respuesta.ok) {
            setNombre(null);
            setCorreo(null);
        }

        let respuestaJson = await respuesta.json();

        if (respuestaJson.logueado == true) {
            setNombre(respuestaJson.nombre);
            setCorreo(respuestaJson.email);
        }
        else {
            setNombre(null);
            setCorreo(null);
        }
    }

    useEffect(() => {
        recibido()
    }, []);

    return (
        <>
            <LayoutPrincipal>
                <main className='mt-24'>
                    <section className='rounded-2xl w-[80%] m-auto p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                        <a className='flex items-baseline content-center text-sm gap-x-4' href="/spa"> <IoIosArrowBack className='' />
                            Volver</a>
                        <img className='w-32 m-auto my-6 rounded-full aspect-square' src="../../pictures/armonyImagen1.png" alt="" />
                        <div className='w-1/2 m-auto text-center'>
                            <h1 className='text-[#EB5765]'>{nombre}</h1>
                            <p>{correo}</p>
                        </div>
                    </section>
                    <section className='my-12 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-2xl w-[80%] m-auto p-6 text-sm'>
                        <a href='/perfil/informacion' className='flex justify-between p-5 hover:underline rounded-xl hover:bg-slate-100'>
                            <div className='flex gap-6'>
                                <div className='rounded-full place-content-center md:bg-[#D9D9D9]'><img className='w-12' src="../../pictures/personal.png" alt="" /></div>
                                <div>
                                    <h2>Informacion Personal</h2>
                                    <p className='text-gray-500'>Información de tu identificación oficial</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-end'>
                                <MdNavigateNext />
                            </div>
                        </a>
                        <a href='/perfil/seguridad' className='flex justify-between p-5 hover:underline rounded-xl hover:bg-slate-100'>
                            <div className='flex gap-6'>
                                <div className='rounded-full place-content-center md:bg-[#D9D9D9]'><img className='w-12' src="../../pictures/seguridad.png" alt="" /></div>
                                <div>
                                    <h2>Seguridad</h2>
                                    <p className='text-gray-500'>Protege tu cuenta de peligros inminentes</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-end'>
                                <MdNavigateNext />
                            </div>
                        </a>
                        <a href='/perfil/tarjetas' className='flex justify-between p-5 hover:underline rounded-xl hover:bg-slate-100'>
                            <div className='flex gap-6'>
                                <div className='rounded-full place-content-center md:bg-[#D9D9D9]'><img className='w-12' src="../../pictures/tarjetas.png" alt="" /></div>
                                <div>
                                    <h2>Tarjetas</h2>
                                    <p className='text-gray-500'>Tarjetas guardadas en tu cuenta</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-end'>
                                <MdNavigateNext />
                            </div>
                        </a>
                        <a href='/perfil/suscripciones' className='flex justify-between p-5 hover:underline rounded-xl hover:bg-slate-100'>
                            <div className='flex gap-6'>
                                <div className='rounded-full place-content-center md:bg-[#D9D9D9]'><img className='w-10 md:w-12' src="../../pictures/suscripciones.png" alt="" /></div>
                                <div>
                                    <h2>Suscripciones</h2>
                                    <p className='text-gray-500'>Mis membresias</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-end'>
                                <MdNavigateNext />
                            </div>
                        </a>
                        <a href='/perfil/rango' className='flex justify-between p-5 hover:underline rounded-xl hover:bg-slate-100'>
                            <div className='flex gap-6'>
                                <div className='rounded-full place-content-center md:bg-[#D9D9D9]'><img className='w-10 md:w-12' src="../../pictures/rango.png" alt="" /></div>
                                <div>
                                    <h2>Rango</h2>
                                    <p className='text-gray-500'>Mi nivel de raango</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-end'>
                                <MdNavigateNext />
                            </div>
                        </a>
                        <a href='/perfil/monedero' className='flex justify-between p-5 hover:underline rounded-xl hover:bg-slate-100'>
                            <div className='flex gap-6'>
                                <div className='rounded-full place-content-center md:bg-[#D9D9D9]'><img className='w-12' src="../../pictures/monedero.png" alt="" /></div>
                                <div>
                                    <h2>Mi monedero</h2>
                                    <p className='text-gray-500'>Dinero obtenido en la cuenta</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-end'>
                                <MdNavigateNext />
                            </div>
                        </a>
                        <a href='/perfil/pedidos' className='flex justify-between p-5 hover:underline rounded-xl hover:bg-slate-100'>
                            <div className='flex gap-6'>
                                <div className='rounded-full place-content-center md:bg-[#D9D9D9]'><img className='w-12' src="../../pictures/pedidos.png" alt="" /></div>
                                <div>
                                    <h2>Mis pedidos</h2>
                                    <p className='text-gray-500'>Estado de los pedidos en proceso de entrega y ya entregados </p>
                                </div>
                            </div>
                            <div className='flex items-center justify-end'>
                                <MdNavigateNext />
                            </div>
                        </a>
                        <a href='/perfil/agenda' className='flex justify-between p-5 hover:underline rounded-xl hover:bg-slate-100'>
                            <div className='flex gap-6'>
                                <div className='rounded-full place-content-center md:bg-[#D9D9D9]'><img className='w-12' src="../../pictures/agenda.png" alt="" /></div>
                                <div>
                                    <h2>Agenda</h2>
                                    <p className='text-gray-500'>Calendario de citas pendientes</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-end'>
                                <MdNavigateNext />
                            </div>
                        </a>
                        <a href='/perfil/historial' className='flex justify-between p-5 hover:underline rounded-xl hover:bg-slate-100'>
                            <div className='flex gap-6'>
                                <div className='rounded-full place-content-center md:bg-[#D9D9D9]'><img className='w-12' src="../../pictures/historial.png" alt="" /></div>
                                <div>
                                    <h2>Historial de movimientos</h2>
                                    <p className='text-gray-500'>Actividades registradas de tus productos y servicios</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-end'>
                                <MdNavigateNext />
                            </div>
                        </a>


                    </section>
                </main>
            </LayoutPrincipal>
        </>
    )
}

export default Perfil