import React, { useState, useEffect } from 'react'
import LayoutPrincipal from '../../layouts/LayoutPrincipal'
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";

function Rango() {
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
                        <h1 className='text-[#036C65] font-semibold text-2xl mb-2'>Rango</h1>
                        <h2></h2>
                    </div>
                </section>

                <section className='w-[60%] m-auto'>
                    <div className='rounded-2xl m-auto grid p-12 gap-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                        <h2 className='text-[#036C65] text-lg'>Tu rango actual</h2>
                        <p className='text-sm text-justify'>Este es tu rango actual. Recuerda que tu nivel será actualizado automáticamente cuando alcances los puntos suficientes para el siguiente nivel.</p>
                        <div className='rounded-xl m-auto w-1/3 text-center bg-[#45B59C] mt-4 grid gap-4 my-auto  p-3'>
                            <p className='grid px-2 py-6 bg-white rounded-lg'> Rango Oro
                                <svg width="39" height="51" viewBox="0 0 39 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.5074 50.1802L38.6973 25.5076L19.5074 0.834961L0.317627 25.5076L19.5074 50.1802Z" fill="#7CA1FF" />
                                </svg>
                                <svg width="98" height="99" viewBox="0 0 98 99" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_2365_8559)">
                                        <path d="M48.5075 0L4 27.0972V63.2268L48.5075 90.324L93.0149 63.2268V27.0972L48.5075 0Z" fill="#99B3F6" />
                                        <path d="M48.5075 0L4 27.0972V63.2268L48.5075 90.324L93.0149 63.2268V27.0972L48.5075 0Z" stroke="black" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_d_2365_8559" x="0" y="0" width="97.0149" height="98.3242" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                            <feOffset dy="4" />
                                            <feGaussianBlur stdDeviation="2" />
                                            <feComposite in2="hardAlpha" operator="out" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2365_8559" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2365_8559" result="shape" />
                                        </filter>
                                    </defs>
                                </svg>
                                <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M33.5074 58.1802L52.6973 33.5076L33.5074 8.83496L14.3176 33.5076L33.5074 58.1802Z" fill="#7CA1FF" />
                                    <path d="M33.5074 58.1802L41.7317 33.5076L33.5074 8.83496L52.6973 33.5076L33.5074 58.1802Z" fill="#3A7AF8" />
                                    <path d="M33.5074 58.1802L25.2832 33.5076L33.5074 8.83496L14.3176 33.5076L33.5074 58.1802Z" fill="#C0D2FF" />
                                </svg>
                                <svg width="71" height="73" viewBox="0 0 71 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_i_2365_8560)">
                                        <path d="M35.5052 0.163574L0.161011 21.7628V50.5617L35.5052 72.1609L70.8493 50.5617V21.7628L35.5052 0.163574Z" fill="#4873C8" />
                                        <path d="M35.5052 0.163574L0.161011 21.7628V50.5617L35.5052 72.1609L70.8493 50.5617V21.7628L35.5052 0.163574Z" stroke="#ECB800" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_i_2365_8560" x="0.161011" y="0.163574" width="70.6884" height="75.9976" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                            <feOffset dy="4" />
                                            <feGaussianBlur stdDeviation="2" />
                                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2365_8560" />
                                        </filter>
                                    </defs>
                                </svg>

                            </p>
                        </div>
                    </div>
                </section>

                <section className='w-[60%] m-auto'>
                    <div className='rounded-2xl  m-auto grid gap-4 p-12 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                        <h2 className='text-[#036C65] text-lg'>Sube tu rango al siguiente nivel</h2>
                        <p className='text-sm text-justify'>Cada vez que compras productos o servicios en armony, acumulas puntos para subir de nivel tu cuenta, y por lo tanto, obtener mejores beneficios. Aquí tienes una pequeña muestra de tu progreso en armony.</p>
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
                    <div className='rounded-2xl m-auto grid gap-4 p-12 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                        <h2 className='text-[#036C65] text-lg'>Beneficios con los que cuentas</h2>
                        <p className='text-sm text-justify'>Estos son los beneficios con lo que cuentas, así como los que puedes alcanzar en el próximo rango.</p>
                        <div className='flex justify-center gap-6'>
                            <div className='rounded-xl text-center bg-[#45B59C] mt-4 grid gap-4 my-auto  p-3'>
                                <p className='grid p-2 bg-white rounded-lg'> Rango Platino
                                    <img className='w-24 m-auto mt-2' src="../../../pictures/membresia2.png" alt="" />
                                </p>
                                <p className='p-2 bg-white rounded-lg'> Válido para 2 personas </p>
                                <p className='p-2 bg-white rounded-lg'> Regalos exclusivos </p>
                                <p className='p-2 bg-white rounded-lg'> Descuentos generosos en spa </p>
                                <p className='p-2 bg-white rounded-lg'> Acceso anticipado a ventas </p>
                            </div>
                            <div className='rounded-xl text-center bg-[#45B59C] mt-4 grid gap-4 my-auto  p-3'>
                                <p className='grid p-2 bg-white rounded-lg'> Rango VIP
                                    <img className='w-24 m-auto mt-2' src="../../../pictures/membresia1.png" alt="" />
                                </p>
                                <p className='p-2 bg-white rounded-lg'> Válido para 4 personas </p>
                                <p className='p-2 bg-white rounded-lg'> Invitaciones a eventos VIP de élite </p>
                                <p className='p-2 bg-white rounded-lg'> Acceso anticipado a ventas exclusivas </p>
                                <p className='p-2 bg-white rounded-lg'> Contenido premium ilimitado </p>
                                <p className='p-2 bg-white rounded-lg'> Acceso a todos los servicios de nuestro spa </p>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </LayoutPrincipal >
    );
}

export default Rango;

