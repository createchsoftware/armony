import React, { useState, useEffect } from 'react'
import LayoutPrincipal from '../../layouts/LayoutPrincipal'
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";

function Suscripciones() {
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
            <main className='grid gap-12 my-24'>
                <section className='rounded-2xl mt-12 w-[60%] m-auto p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                    <a className='flex items-baseline content-center text-sm gap-x-4' href="/spa"> <IoIosArrowBack className='' />
                        Volver</a>
                    <img className='w-32 m-auto my-6 -mt-24 rounded-full aspect-square' src="../../pictures/suscripcionCirculo.png" alt="" />
                    <div className='m-auto text-center '>
                        <h1 className='text-[#036C65] font-semibold text-2xl mb-2'>Suscripción</h1>
                        <h2>La suscripción que puede darte más en poco tiempo</h2>
                    </div>
                </section>

                <section className='w-[60%] m-auto'>
                    <h2 className='text-[#036C65] text-2xl ml-12 mb-4'>Tu suscripción</h2>
                    <div className='rounded-2xl m-auto grid gap-4 p-12 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                        <p className='text-sm text-justify'>Esta es tu suscripción, será facturada en el mismo periodo de facturación.</p>
                        <button className='bg-gray-400 mt-6 py-3 w-1/2 m-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg'>No tienes una suscripción vigente</button>
                    </div>
                </section>

                <section className='w-[60%] m-auto'>
                    <h2 className='text-[#036C65] text-2xl ml-12 mb-4'>Hazte socio</h2>
                    <div className='rounded-2xl  m-auto grid gap-4 p-12 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                        <p className='text-sm text-justify'>Si no puedes esperar a obtener más beneficios, ¿Qué esperas?
                            ¡Compra la suscripción para empezar a obtener beneficios más rápido!</p>
                        <div className='flex items-center justify-start gap-8'>
                            <div className='bg-[#74C7B5] rounded-2xl p-6'>
                                <img className='w-24 m-auto mt-2' src="../../../pictures/membresia1.png" alt="" />
                                <button class="mt-12 transition-all duration-300 m-auto hover:bg-[#036C65] hover:ring-2 hover:ring-neutral-800 hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg border-2 bg-[#EB5765] px-6 font-[abeatbykai] text-neutral-200"><span>Adquirir</span><div class="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></div></button>
                            </div>
                            <div className='grid gap-4'>
                                <p><span className='text-[#F584A7]'>Tipo de compra:</span> {"Suscripción"}</p>
                                <p><span className='text-[#F584A7]'>Precio: </span>{"$199 MXN"}</p>
                                <p><span className='text-[#F584A7]'>Tiempo de vigencia: {"Vigente por un mes"}</span></p>
                            </div>
                        </div>
                        <p>Tan fácil como comprarlo por tan solo $199 MXN. Una vez llegado el día de facturación tu suscripción se te cobrará con la tarjeta añadida a tu cuenta.
                            Puedes cancelar la suscripción cuando quieras.</p>
                    </div>
                </section>

                <section className='w-[60%] m-auto'>
                    <h2 className='text-[#036C65] text-2xl ml-12 mb-4'>Cancelar suscripción</h2>
                    <div className='rounded-2xl m-auto grid gap-4 px-8 py-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                        <p className='text-sm text-justify'>Una vez cancelada la suscripción, los cambios son irreversibles.</p>
                        <button className='bg-gray-400 mt-6 py-3 w-1/2 m-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg'>Cancelar suscripción</button>
                    </div>
                </section>

            </main>
        </LayoutPrincipal >
    );
}

export default Suscripciones;

// <div className='rounded-2xl m-auto grid gap-4 px-8 py-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] mb-12'>
//     <div className='flex justify-center gap-6'>
//         <div className='rounded-xl text-center bg-[#45B59C] mt-4 grid gap-4 my-auto  p-3'>
//             <p className='grid p-2 bg-white rounded-lg'> Rango Oro
//                 <img className='w-24 m-auto mt-2' src="../../../pictures/membresia2.png" alt="" />
//             </p>
//             <p className='p-2 bg-white rounded-lg'> Envío prioritario </p>
//             <p className='p-2 bg-white rounded-lg'> Contenido excluisvo </p>
//             <p className='p-2 bg-white rounded-lg'> Promociones exclusivas </p>
//         </div>
//         <div className='rounded-xl text-center bg-[#45B59C] mt-4 grid gap-4 my-auto  p-3'>
//             <p className='grid p-2 bg-white rounded-lg'> Rango VIP
//                 <img className='w-24 m-auto mt-2' src="../../../pictures/membresia1.png" alt="" />
//             </p>
//             <p className='p-2 bg-white rounded-lg'> Todo el contenido de los rangos anteriores </p>
//             <p className='p-2 bg-white rounded-lg'> Regalos de alta gama </p>
//             <p className='p-2 bg-white rounded-lg'> Contenido premium ilimitado </p>
//             <p className='p-2 bg-white rounded-lg'> Invitaciones a eventos VIP de élite. </p>
//         </div>
//     </div>
// </div>