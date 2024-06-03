import React, { useState, useEffect } from 'react'
import LayoutPrincipal from '../../layouts/LayoutPrincipal'
import { IoIosArrowBack } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function Suscripciones() {
    const [nombre, setNombre] = useState(false); //<<< PARA EL INICIO DE SESION
    const [correo, setCorreo] = useState(false); //<<< PARA EL INICIO DE SESION
    const [sus, setSus] = useState(false); //<<< PARA VERIFICAR SI ES MIEMBRO EL USUARIO

    const [diaInicio, setDiaInicio] = useState('');
    const [mesInicio, setMesInicio] = useState('');
    const [semanaInicio, setSemanaInicio] = useState('');

    const [diaFinal, setDiaFinal] = useState('');
    const [mesFinal, setMesFinal] = useState('');
    const [semanaFinal, setSemanaFinal] = useState('');
    const [diasFaltantes, setDiasFaltantes] = useState(0);

    
    



    async function recibido() {
        const respuesta = await fetch('/api/suscripcion', {
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

            if (respuestaJson.objeto_respuesta != false) {

                let ob = respuestaJson.objeto_respuesta;
                setSus(true);

                setDiaInicio(ob.dI);
                setMesInicio(ob.mI);
                setSemanaInicio(ob.sI);

                setDiaFinal(ob.dE);
                setMesFinal(ob.mE);
                setSemanaFinal(ob.sE);

            }
            setNombre(respuestaJson.nombre);
            setCorreo(respuestaJson.email);
        }
        else {
            setNombre(null);
            setCorreo(null);
        }
    }


    //metodo para calcular los dias faltantes para que la suscripcion acabe 
    const calcularDiasFaltantes = async (fechaI, fechaF) => {
        const fechaActual = new Date();

        if (fechaF > fechaActual) {
            const fechaInicio = new Date(fechaI);
            const fechaFin = new Date(fechaF);
            let diferencia = fechaFin.getTime() - fechaInicio.getTime();
            return diferencia / 1000 / 60 / 60 / 24;
        }

        return 0; //si retorna 0 es que la fecha actual sobrepaso la fecha final o ya no esta vigente la sus
    }

    async function cancelarSuscripcion() {
        const respuesta2 = await fetch('/api/delete/suscripcion', {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
            }
        })

        if (!respuesta2.ok) {
            return;
        }

        const respuesta2Json = await respuesta2.json();

        if (respuesta2Json.logueado == true) {

            if (respuesta2Json.suscripcion == false) {
                // la suscripcion fue eliminada con exito
                window.location.href = respuesta2Json.redirect;
            }
            else {
                // la suscripcion no fue eliminada, un toast que diga que no se pudo
                toast(<div>{`Al parecer estamos teniendo problemas al cancelar tu suscripcion`}<FontAwesomeIcon icon={faCircleExclamation} /></div>);
            }
        }
    }



    useEffect(() => {
        recibido()
        setDiasFaltantes(parseInt(100 * ((30 - calcularDiasFaltantes) / 30)));
    }, []);

    return (
        <LayoutPrincipal>
            <main className='grid gap-12 my-24'>
                <section className='rounded-2xl mt-12 w-[60%] m-auto p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                    <a className='flex gap-2 w-max items-center ml-6 text-black relative cursor-pointer before:bg-black before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:font-bold' href="/perfil"> <IoIosArrowBack className='' />
                        Volver</a>
                    <img className='w-32 m-auto my-6 -mt-24 rounded-full aspect-square' src="../../pictures/suscripcionCirculo.png" alt="" />
                    <div className='m-auto text-center '>
                        <h1 className='text-[#036C65] font-semibold text-2xl mb-2'>Suscripción</h1>
                        <h2>La suscripción que puede darte más en poco tiempo</h2>
                    </div>
                </section>

                {sus ? (
                    <section className='w-[60%] m-auto'>
                        <h2 className='text-[#036C65] text-2xl ml-12 mb-4'>Tu suscripción</h2>
                        <div className='rounded-2xl m-auto grid gap-4 p-12 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                            <p className='text-sm text-justify'>Esta es tu suscripción, será facturada en el mismo periodo de facturación.</p>
                            <div className='rounded-xl m-auto w-1/3 text-center bg-[#45B59C] mt-4 my-auto  p-3'>
                                <div className='grid gap-2 px-2 py-6 bg-white rounded-lg'>
                                    <img className='w-48 m-auto mt-2' src="../../../pictures/membresia1.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className='w-[60%] m-auto'>
                        <h2 className='text-[#036C65] text-2xl ml-12 mb-4'>Tu suscripción</h2>
                        <div className='rounded-2xl m-auto grid gap-4 p-12 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                            <p className='text-sm text-justify'>Esta es tu suscripción, será facturada en el mismo periodo de facturación.</p>
                            <div className='bg-gray-400 text-center mt-6 py-3 w-1/2 m-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg'>No tienes una suscripción vigente</div>
                        </div>
                    </section>
                )}

                {sus ? (
                    <section className='w-[60%] m-auto'>
                        <h2 className='text-[#036C65] text-2xl ml-12 mb-4'>Fecha de renovación</h2>
                        <div className='rounded-2xl  m-auto grid gap-4 p-12 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                            <p className='text-sm text-justify'>Recuerda que tu suscripción se renueva automáticamente
                                Previo a la fecha de vencimiento, se te hará llegar una notificación a tu correo electrónico.</p>
                            <div className='flex items-center justify-between gap-4 px-3'>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                                    <div className=" bg-[#036C65] h-1.5 rounded-full dark:bg-gray-300" style={{ width: diasFaltantes + '%' }}></div>
                                </div>
                            </div>
                            <div className='flex items-center justify-between text-gray-500'>
                                <div className='px-10 text-center '>
                                    <p className='text-gray-500'>{mesInicio}</p>
                                    <p className='text-gray-500'>{semanaInicio} - {diaInicio}</p>
                                </div>
                                <div className='text-center '>
                                    <p className='text-gray-500'>{mesFinal}</p>
                                    <p className='text-gray-500'>{semanaFinal} - {diaFinal}</p>
                                </div>
                            </div>
                            <button className='bg-[#EB5765] text-white mt-6 py-3 w-1/2 m-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg duration-200 hover:bg-[rgb(255,181,167)]'>Renovar suscripción</button>
                        </div>
                    </section>
                ) : (
                    <section className='w-[60%] m-auto'>
                        <h2 className='text-[#036C65] text-2xl ml-12 mb-4'>Hazte socio</h2>
                        <div className='rounded-2xl  m-auto grid gap-4 p-12 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                            <p className='text-sm text-justify'>Si no puedes esperar a obtener más beneficios, ¿Qué esperas?
                                ¡Compra la suscripción para empezar a obtener beneficios más rápido!</p>
                            <div className='flex items-center justify-start gap-8'>
                                <div className='bg-[#74C7B5] rounded-2xl p-6'>
                                    <img className='w-24 m-auto mt-2' src="../../../pictures/membresia1.png" alt="" />
                                    <a href='/suscripcion/compra' className="mt-12 transition-all duration-300 m-auto hover:bg-[#036C65] hover:ring-2 hover:ring-neutral-800 hover:ring-offset-1 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-lg border-2 bg-[#EB5765] px-6 font-[abeatbykai] text-neutral-200"><span>Adquirir</span><div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></div></a>
                                </div>
                                <div className='grid gap-4'>
                                    <p><span className='text-[#F584A7]'>Tipo de compra:</span> {"Suscripción"}</p>
                                    <p><span className='text-[#F584A7]'>Precio: </span>{"$199 MXN"}</p>
                                    <p><span className='text-[#F584A7]'>Tiempo de vigencia: </span> {"Vigente por un mes"}</p>
                                </div>
                            </div>
                            <p>Tan fácil como comprarlo por tan solo $199 MXN. Una vez llegado el día de facturación tu suscripción se te cobrará con la tarjeta añadida a tu cuenta.
                                Puedes cancelar la suscripción cuando quieras.</p>
                        </div>
                    </section>
                )}

                <section className='w-[60%] m-auto'>
                    <h2 className='text-[#036C65] text-2xl ml-12 mb-4'>Cancelar suscripción</h2>
                    <div className='rounded-2xl m-auto grid gap-4 px-8 py-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                        {sus ? (
                            <>
                                <p className='text-sm text-justify'>¿Estás seguro que quisieras cancelar tu suscripción? Una vez cancelada tu suscripción, los cambios son irreversibles.</p>
                                <button className='bg-[#036C65] text-white mt-6 py-3 w-1/2 m-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg duration-200 hover:bg-[#45B59C]' onClick={cancelarSuscripcion}>Cancelar suscripción</button>
                            </>
                        ) : (
                            <>
                                <div className='bg-gray-400 text-center mt-6 py-3 w-1/2 m-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg'>No tienes una suscripción vigente</div>
                            </>
                        )}
                    </div>
                    <ToastContainer position={'bottom-right'} theme={'light'} />
                </section>
            </main>
        </LayoutPrincipal >
    );
}

export default Suscripciones;