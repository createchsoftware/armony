import { useState, useEffect } from 'react'
import LayoutPrincipal from '../layouts/LayoutPrincipal'
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";

function Perfil() {

    const [nombre, setNombre] = useState(false); //<<< PARA EL INICIO DE SESION
    const [correo, setCorreo] = useState(false); //<<< PARA EL INICIO DE SESION
    const [imagen, setImagen] = useState(false); //<<< PARA EL INICIO DE SESION
    const [clave, setClave] = useState(false);
    const [sus, setSus] = useState(false); //<<< CARACTERISTICA GRAFICA DE QUE EL USUARIO ES SOCIO

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
            setImagen(null);
        }

        let respuestaJson = await respuesta.json();

        if (respuestaJson.logueado == true) {
            setNombre(respuestaJson.nombre);
            setCorreo(respuestaJson.email);
            setImagen(respuestaJson.imagen);
            setClave(respuestaJson.clave)
            console.log('esta es mi imagen' + respuestaJson.imagen);
        }
        else {
            setNombre(null);
            setCorreo(null);
            setImagen(null);
            
        }
    }
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

    useEffect(() => {
        recibido()
    }, []);

    return (
        <>
            <LayoutPrincipal>
                <main className='mt-40'>
                    <section className='rounded-2xl w-[60%] m-auto p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                        <a className='flex content-center text-sm gap-x-4 w-max items-center ml-6 text-black relative cursor-pointer before:bg-black before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:font-bold' href='/'> <IoIosArrowBack className='' />
                            Volver</a>
                        <div className='relative w-40 m-auto my-6 -mt-32 aspect-square'>
                            {sus && (
                                <img
                                    src="../../../pictures/marcoSuscripcion.png"
                                    alt=""
                                    className="absolute object-cover w-full h-full m-auto"
                                />
                            )}
                            <div className="flex w-full h-full items-center justify-center">
                                <img className='w-[85%] m-auto aspect-square rounded-full' src={imagen !== null ? `../../../pictures/avatares/${imagen}`: "../../../pictures/userDefault.png"} alt="" />
                            </div>
                        </div>
                        <div className='w-1/2 m-auto text-center'>
                            <h1 className='text-[#EB5765]'>{nombre === null ? "NOMBRE DE USUARIO" : nombre}</h1>
                            <h1 className=''>{correo === null ? "correo@armony.com" : correo}</h1>
                        </div>
                    </section>
                    <section className='my-12 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-2xl w-[60%] m-auto p-6 text-sm'>
                        <a href='/perfil/informacion' className='flex justify-between p-5 duration-200 hover:bg-slate-200 hover:underline rounded-xl'>
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
                        <a href='/perfil/seguridad' className='flex justify-between p-5 duration-200 hover:bg-slate-200 hover:underline rounded-xl'>
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
                        <a href='/perfil/tarjetas' className='flex justify-between p-5 duration-200 hover:bg-slate-200 hover:underline rounded-xl'>
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
                        <a href='/perfil/suscripciones' className='flex justify-between p-5 duration-200 hover:bg-slate-200 hover:underline rounded-xl'>
                            <div className='flex gap-6'>
                                <div className='rounded-full place-content-center md:bg-[#D9D9D9]'><img className='w-10 md:w-12' src="../../pictures/suscripciones.png" alt="" /></div>
                                <div>
                                    <h2>Suscripción</h2>
                                    <p className='text-gray-500'>Mi membresía</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-end'>
                                <MdNavigateNext />
                            </div>
                        </a>
                        <a href='/perfil/rango' className='flex justify-between p-5 duration-200 hover:bg-slate-200 hover:underline rounded-xl'>
                            <div className='flex gap-6'>
                                <div className='rounded-full place-content-center md:bg-[#D9D9D9]'><img className='w-10 md:w-12' src="../../pictures/rangoVIP2.png" alt="" /></div>
                                <div>
                                    <h2>Rango</h2>
                                    <p className='text-gray-500'>Mi nivel de rango</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-end'>
                                <MdNavigateNext />
                            </div>
                        </a>
                        <a href='/perfil/monedero' className='flex justify-between p-5 duration-200 hover:bg-slate-200 hover:underline rounded-xl'>
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
                        <a href='/perfil/pedidos' className='flex justify-between p-5 duration-200 hover:bg-slate-200 hover:underline rounded-xl'>
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
                        <a href='/perfil/agenda' className='flex justify-between p-5 duration-200 hover:bg-slate-200 hover:underline rounded-xl'>
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
                        <a href='/perfil/movimientos' className='flex justify-between p-5 duration-200 hover:bg-slate-200 hover:underline rounded-xl'>
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