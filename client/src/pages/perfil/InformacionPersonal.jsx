import React, { useState, useEffect } from 'react'
import LayoutPrincipal from '../../layouts/LayoutPrincipal'

function InformacionPersonal() {

    const [nombre, setNombre] = useState(false); //<<< PARA EL INICIO DE SESION
    const [correo, setCorreo] = useState(false); //<<< PARA EL INICIO DE SESION
    const [apellidoP, setPaterno] = useState(false); //<<< PARA EL INICIO DE SESION
    const [apellidoM, setMaterno] = useState(false); //<<< PARA EL INICIO DE SESION
    const [codigoP, setPostal] = useState(false); //<<< PARA EL INICIO DE SESION
    const [telefono, setTelefono] = useState(false); //<<< PARA EL INICIO DE SESION
    const [calle, setCalle] = useState(false); //<<< PARA EL INICIO DE SESION
    const [numero, setNumero] = useState(false); //<<< PARA EL INICIO DE SESION
    const [colonia, setColonia] = useState(false); //<<< PARA EL INICIO DE SESION
    const [fechaNac, setNacimiento] = useState(false); //<<< PARA EL INICIO DE SESION
    const [imagen, setImagen] = useState(false); //<<< PARA EL INICIO DE SESION
    const [clave, setClave] = useState(false); //<<< PARA EL INICIO DE SESION

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
            setPaterno(null);
            setMaterno(null);
            setTelefono(null);
            setPostal(null);
            setNumero(null);
            setCalle(null);
            setColonia(null);
            setNacimiento(null);
            setImagen(null);
        }

        let respuestaJson = await respuesta.json();

        if (respuestaJson.logueado == true) {
            setClave(respuestaJson.clave);
            setNombre(respuestaJson.nombre);
            setCorreo(respuestaJson.email);
            setPaterno(respuestaJson.apellidoP);
            setMaterno(respuestaJson.apellidoM);
            setTelefono(respuestaJson.telefono);
            setPostal(respuestaJson.codigoP);
            setNumero(respuestaJson.numero);
            setCalle(respuestaJson.calle);
            setColonia(respuestaJson.colonia);
            setNacimiento(respuestaJson.fechaNac);
            setImagen(respuestaJson.imagen);
            
        }
        else {
            setNombre(null);
            setCorreo(null);
            setPaterno(null);
            setMaterno(null);
            setTelefono(null);
            setPostal(null);
            setNumero(null);
            setCalle(null);
            setColonia(null);
            setNacimiento(null);
            setImagen(null);
        }
    }

    useEffect(() => {
        recibido()
    }, []);

    return (
        <>
            <LayoutPrincipal>
                <main className='grid p-12 m-12 md:flex'>
                    <div className='grid gap-6 md:w-3/5'>
                        <section className=' flex justify-around rounded-2xl w-[80%] m-auto p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                            <a className='flex items-baseline text-md gap-x-4' href="#"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg> Volver</a>
                            <h1 className=''>Informacion Personal</h1>
                        </section>
                        <section className=' grid gap-6 rounded-2xl w-[80%] m-auto p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                            <h2 className='text-[#EB5765]'>Datos de la cuenta:</h2>
                            <div>
                                <div className='flex gap-x-4'>
                                    <p className='text-[#9D9999]'>Usuario:</p>
                                    <p>{`${nombre} ${apellidoP}`}</p>
                                </div>
                                <div className='flex gap-x-4'>
                                    <p className='text-[#9D9999]'>E-mail:</p>
                                    <p>{correo}</p>
                                </div>
                                <div className='flex gap-x-4'>
                                    <p className='text-[#9D9999]'>Clave:</p>
                                    <p>{clave}</p>
                                </div>
                            </div>
                        </section>
                        <section className=' grid gap-6 rounded-2xl w-[80%] m-auto p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                            <h2 className='text-[#EB5765]'>Datos pesonales:</h2>
                            <div>
                                <div className='flex gap-x-4'>
                                    <p className='text-[#9D9999]'>nombre y apellidos:</p>
                                    <p>{`${apellidoP} ${apellidoM} ${nombre}`}</p>
                                </div>
                                <div className='flex gap-x-4'>
                                    <p className='text-[#9D9999]'>Telefono:</p>
                                    <p>{telefono}</p>
                                </div>
                                <div className='flex gap-x-4'>
                                    <p className='text-[#9D9999]'>Fecha de nacimiento:</p>
                                    <p>{fechaNac}</p>
                                </div>
                            </div>
                        </section>
                        <section className=' grid gap-6 rounded-2xl w-[80%] m-auto p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                            <h2 className='text-[#EB5765]'>Domicilio:</h2>
                            <div>
                                <div className='flex gap-x-4'>
                                    <p className='text-[#9D9999]'>Calle:</p>
                                    <p>{calle}</p>
                                </div>
                                <div className='flex gap-x-4'>
                                    <p className='text-[#9D9999]'>Colonia</p>
                                    <p>{colonia}</p>
                                </div>
                                <div className='flex gap-x-4'>
                                    <p className='text-[#9D9999]'>Codigo Postal:</p>
                                    <p>{codigoP}</p>
                                </div>
                            </div>
                        </section>
                        <section className=' grid gap-6 rounded-2xl w-[80%] m-auto p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                            <h2 className='text-[#EB5765]'>Patologias:</h2>
                            <div>
                                <div className='flex gap-x-4'>
                                    <p className='text-[#9D9999]'>Patologia1:</p>
                                    <p>Recien operado de una Ernia</p>
                                </div>
                            </div>
                        </section>
                    </div>
                    <aside className='w-2/5 m-auto my-8'>
                        <div className='grid gap-6 text-center '>
                            <img className='m-auto rounded-full md:w-1/3' src="../../../pictures/5school.png" alt="" />
                            <h2 className='text-[#EB5765]'>Rango platino</h2>
                            <img className='w-48 m-auto' src="../../../pictures/membresiaEjemplo.png" alt="" />
                            <a href="#_" className="m-auto px-12 py-2  font-medium text-white whitespace-no-wrap bg-[#EB5765] border border-gray-200 rounded-full shadow-sm hover:cursor-pointer hover:bg-[#eb7580] focus:outline-none focus:shadow-none">
                                Editar
                            </a>
                        </div>
                    </aside>
                </main>
            </LayoutPrincipal>
        </>
    )
}

export default InformacionPersonal
