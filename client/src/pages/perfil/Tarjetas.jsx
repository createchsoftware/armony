import React, { useState, useEffect } from 'react'
import LayoutPrincipal from '../../layouts/LayoutPrincipal'
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";

function Tarjetas() {
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
        <LayoutPrincipal>
            <main className='grid gap-6 mt-24'>
                <section className='rounded-2xl w-[80%] m-auto p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                    <a className='flex items-baseline content-center text-sm gap-x-4' href="/spa"> <IoIosArrowBack className='' />
                        Volver</a>
                    <img className='w-32 m-auto my-6 rounded-full aspect-square' src="../../pictures/armonyImagen1.png" alt="" />
                    <div className='w-1/2 m-auto text-center'>
                        <h1 className='text-[#EB5765]'>{nombre}</h1>
                    </div>
                </section>

                <section className='rounded-2xl w-[80%] m-auto grid gap-4 px-8 py-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                    <h2 className='text-[#036C65] '>Tu suscripción</h2>
                    <p className='text-sm text-justify'>Esta es tu suscripción actual. Serán facturadas en el mismo periodo de facturación.
                        Tu suscripción se actualizará automáticamente cuando llegues a la siguiente meta.</p>
                    <div className='rounded-xl text-center border-[#45B59C] mt-4 border-8 w-1/2 m-auto p-2'>
                        Rango Platino
                        <img className='w-24 m-auto mt-2' src="../../../pictures/membresia3.png" alt="" />
                    </div>
                </section>

                <section className='rounded-2xl w-[80%] m-auto grid gap-4 px-8 py-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                    <h2 className='text-[#036C65] '>Sube de nivel tu suscripción</h2>
                    <p className='text-sm text-justify'>Cada vez que compras productos o servicios en Armony, acumulas puntos para
                        subir de nivel tu cuenta, y por lo tanto, obtener mejores beneficios. Aquí tienes una pequeña muestra de tu progreso en Armony.</p>
                    <div className='rounded-xl text-center border-[#45B59C] mt-4 border-8 w-1/2 m-auto p-2 text-sm'>
                        <p>Puntos recolectados: {4} puntos</p>
                        <p>Siguiente meta: Rango oro (2,000 puntos)</p>
                    </div>
                </section>

                <section className='rounded-2xl w-[80%] m-auto grid gap-4 px-8 py-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] mb-12'>
                    <h2 className='text-[#036C65] '>Alcanza mejores beneficios</h2>
                    <p className='text-sm text-justify'>Mira qué mejores beneficios puedes obtener si sigues acumulando más puntos en Armony y subiendo de rango.</p>
                    <div className='flex justify-center gap-6'>
                        <div className='rounded-xl text-center bg-[#45B59C] mt-4 grid gap-4 my-auto  p-3'>
                            <p className='grid p-2 bg-white rounded-lg'> Rango Oro
                                <img className='w-24 m-auto mt-2' src="../../../pictures/membresia2.png" alt="" />
                            </p>
                            <p className='p-2 bg-white rounded-lg'> Envío prioritario </p>
                            <p className='p-2 bg-white rounded-lg'> Contenido excluisvo </p>
                            <p className='p-2 bg-white rounded-lg'> Promociones exclusivas </p>
                        </div>
                        <div className='rounded-xl text-center bg-[#45B59C] mt-4 grid gap-4 my-auto  p-3'>
                            <p className='grid p-2 bg-white rounded-lg'> Rango VIP
                                <img className='w-24 m-auto mt-2' src="../../../pictures/membresia1.png" alt="" />
                            </p>
                            <p className='p-2 bg-white rounded-lg'> Todo el contenido de los rangos anteriores </p>
                            <p className='p-2 bg-white rounded-lg'> Regalos de alta gama </p>
                            <p className='p-2 bg-white rounded-lg'> Contenido premium ilimitado </p>
                            <p className='p-2 bg-white rounded-lg'> Invitaciones a eventos VIP de élite. </p>
                        </div>
                    </div>
                </section>

            </main>
        </LayoutPrincipal >
    );
}

export default Tarjetas;