import React, { useState, useEffect } from 'react'
import LayoutPrincipal from '../../layouts/LayoutPrincipal'
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import rangoPlatino from "../../../public/pictures/rangoPlatino.png";
import rangoVIP from "../../../public/pictures/rangoVIP.png";
import rangoOro from "../../../public/pictures/rangoOro.png";


function Rango() {
    const [nombre, setNombre] = useState(false); //<<< PARA EL INICIO DE SESION
    const [correo, setCorreo] = useState(false); //<<< PARA EL INICIO DE SESION
    const [foto, setFoto] = useState(null)
    const [rango, setRango] = useState(0); //<<< MUESTRA EL RANGO DEL USUARIO
    const [puntos, setPuntos] = useState(0) //<<< PUNTOS TOTALES\
    const [porcentaje, setPorcentaje] = useState(0)

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
            setFoto(null);
        }

        let respuestaJson = await respuesta.json();

        if (respuestaJson.logueado == true) {
            setNombre(respuestaJson.nombre);
            setCorreo(respuestaJson.email);
            setFoto(respuestaJson.imagen);
        }
        else {
            setNombre(null);
            setCorreo(null);
            setFoto(null);
        }
    }

    useEffect(() => {
        recibido()
        switch (rango){
        case 0:
            setPorcentaje(parseInt(100*((puntos)/1000)));
            break;
        case 1:
            setPorcentaje(parseInt(100*((puntos-1000)/2000)));
            break;
        case 2:
            setPorcentaje(parseInt(100*((puntos-3000)/5000)));
            break;
        }
    }, []);

    return (
        <LayoutPrincipal>
            <main className='grid gap-12 my-24'>
                <section className='rounded-2xl mt-12 w-[60%] m-auto p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                    <a className='flex items-baseline content-center text-sm gap-x-4' href="/perfil"> <IoIosArrowBack className='' />
                        Volver</a>
                    <img
                        src={ foto !== null ? (
                            `../../../pictures/avatares/${foto}`
                        ):(
                            '../../../pictures/userDefault.png'
                        )}
                        alt=""
                        className="w-32 m-auto my-6 -mt-24 rounded-full aspect-square"
                    />
                    <div className='m-auto text-center '>
                        <div className='flex items-center justify-center gap-4'>
                            <h1 className='text-[#EB5765] font-semibold text-xl'>{nombre}</h1>
                            {rango === 1 ? (
                                <img
                                    src="../../../pictures/rangoOro.png"
                                    alt=""
                                    className="w-8 h-auto"
                                />
                            ) : (
                                rango === 2 ? (
                                    <img
                                        src="../../../pictures/rangoPlatino.png"
                                        alt=""
                                        className="w-8 h-auto"
                                    />
                                ) : (
                                    rango === 3 ? (
                                        <img
                                            src="../../../pictures/rangoVIP.png"
                                            alt=""
                                            className="w-8 h-auto"
                                        />
                                    ) : ''
                                )
                            )}
                        </div>
                    </div>
                </section>

                <section className='w-[60%] m-auto'>
                    <div className='rounded-2xl m-auto grid p-12 gap-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                        <h2 className='text-[#036C65] text-lg'>Tu rango actual</h2>
                        <p className='text-sm text-justify'>Este es tu rango actual. Recuerda que tu nivel será actualizado automáticamente cuando alcances los puntos suficientes para el siguiente nivel.</p>
                        <div className='rounded-xl m-auto w-1/3 text-center bg-[#45B59C] mt-4 my-auto  p-3'>      
                            <div className='grid gap-2 px-2 py-6 bg-white rounded-lg'>
                            {rango === 1 ? (
                                <>
                                    <p>Rango Oro</p>
                                    <img className='w-24 m-auto' src={rangoOro} alt="" />
                                </>
                            ) : (
                                rango === 2 ? (
                                    <>
                                        <p>Rango Platino</p>
                                        <img className='w-24 m-auto' src={rangoPlatino} alt="" />
                                    </>
                                ) : (
                                    rango === 3 ? (
                                        <>
                                            <p>Rango VIP</p>
                                            <img className='w-24 m-auto' src={rangoVIP} alt="" />
                                        </>
                                    ) : (
                                        <>
                                            <p>No ha alcanzado algún rango.</p>
                                        </>
                                    )
                                )
                            )}
                                
                            </div>
                        </div>
                    </div>
                </section>

                <section className='w-[60%] m-auto'>
                    <div className='rounded-2xl  m-auto grid gap-4 p-12 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                        <h2 className='text-[#036C65] text-lg'>Sube tu rango al siguiente nivel</h2>
                        <p className='text-sm text-justify'>Cada vez que compras productos o servicios en armony, acumulas puntos para subir de nivel tu cuenta, y por lo tanto, obtener mejores beneficios. Aquí tienes una pequeña muestra de tu progreso en armony.</p>
                        {rango === 1 ? (
                            <>
                                <div className='flex items-center justify-between gap-4 px-3'>
                                    <img className='w-24' src={rangoOro} alt="" />
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                                        <div className=" bg-[#036C65] h-1.5 rounded-full dark:bg-gray-300" style={{width: porcentaje+'%'}}></div>
                                    </div>
                                    <img className='w-24' src={rangoPlatino} alt="" />
                                </div>
                                <div className='flex items-center justify-between text-gray-500'>
                                    <div className='px-10 text-center '>
                                        <p>Oro</p>
                                    </div>
                                    <div>
                                        <p>{puntos-1000} puntos</p>
                                    </div>
                                    <div className='text-center '>
                                        <p>2000 puntos</p>
                                        <p>Platino</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            rango === 2 ? (
                                <>
                                    <div className='flex items-center justify-between gap-4 px-3'>
                                        <img className='w-24' src={rangoPlatino} alt="" />
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                                            <div className="bg-[#036C65] h-1.5 rounded-full dark:bg-gray-300" style={{width: porcentaje+'%'}}></div>
                                        </div>
                                        <img className='w-24' src={rangoVIP} alt="" />
                                    </div>
                                    <div className='flex items-center justify-between text-gray-500'>
                                        <div className='px-10 text-center '>
                                            <p>Platino</p>
                                        </div>
                                        <div>
                                            <p>{puntos-3000} puntos</p>
                                        </div>
                                        <div className='text-center '>
                                            <p>5000 puntos</p>
                                            <p>VIP</p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                rango === 3 ? (
                                    <>
                                        <div className='flex items-center justify-between gap-4 px-3'>
                                            <img className='w-24' src={rangoPlatino} alt="" />
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                                                <div className="bg-[#036C65] h-1.5 rounded-full dark:bg-gray-300" style={{width: porcentaje+'%'}}></div>
                                            </div>
                                            <img className='w-24' src={rangoVIP} alt="" />
                                        </div>
                                        <div className='flex items-center justify-between text-gray-500'>
                                            <div className='px-10 text-center '>
                                                <p>Platino</p>
                                            </div>
                                            <div>
                                                <p>{puntos-3000} puntos</p>
                                            </div>
                                            <div className='text-center '>
                                                <p>5000 puntos</p>
                                                <p>VIP</p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='flex items-center justify-between gap-4 px-3'>
                                            <img className='w-24 opacity-25' src={rangoOro} alt="" />
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                                                <div className=" bg-[#036C65] h-1.5 rounded-full dark:bg-gray-300" style={{width: porcentaje+'%'}}></div>
                                            </div>
                                            <img className='w-24' src={rangoOro} alt="" />
                                        </div>
                                        <div className='flex items-center justify-between text-gray-500'>
                                            <div className='px-10 text-center '>
                                                <p>Sin nivel</p>
                                            </div>
                                            <div>
                                                <p>{puntos} puntos</p>
                                            </div>
                                            <div className='text-center '>
                                                <p>1000 puntos</p>
                                                <p>Oro</p>
                                            </div>
                                        </div>
                                    </>
                                )
                            )
                        )}
                    </div>
                </section>

                <section className='w-[60%] m-auto'>
                    <div className='rounded-2xl m-auto grid gap-4 p-12 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                        <h2 className='text-[#036C65] text-lg'>Beneficios con los que cuentas</h2>
                        <p className='text-sm text-justify'>Estos son los beneficios con lo que cuentas, así como los que puedes alcanzar en el próximo rango.</p>
                        <div className='flex justify-center gap-6'>
                        {rango === 1 ? (
                            <>
                                <div className='w-[46%] rounded-xl text-center bg-[#45B59C] mt-4 grid gap-4 my-auto  p-3'>
                                    <p className='grid p-2 py-4 bg-white rounded-lg'> Rango Oro
                                        <img className='w-24 m-auto mt-2' src={rangoOro} alt="" />
                                    </p>
                                    <p className='p-2 py-4 bg-white rounded-lg'> Envío prioritario </p>
                                    <p className='p-2 py-4 bg-white rounded-lg'> Promociones exclusivas </p>
                                </div>
                                <div className='w-[46%] rounded-xl text-center bg-[#45B59C] mt-4 grid gap-4 my-auto  p-3'>
                                    <p className='grid p-2 py-4 bg-white rounded-lg'> Rango Platino
                                        <img className='w-24 m-auto mt-2' src={rangoPlatino} alt="" />
                                    </p>
                                    <p className='p-2 py-4 bg-white rounded-lg'> Regalos exclusivos </p>
                                    <p className='p-2 py-4 bg-white rounded-lg'> Descuentos generosos en spa </p>
                                    <p className='p-2 py-4 bg-white rounded-lg'> Acceso anticipado a ventas </p>
                                </div>
                            </>
                        ) : (
                            rango === 2 ? (
                                <>
                                    <div className='w-[46%] rounded-xl text-center bg-[#45B59C] mt-4 grid gap-4 my-auto  p-3'>
                                        <p className='grid p-2 py-4 bg-white rounded-lg'> Rango Platino
                                            <img className='w-24 m-auto mt-2' src={rangoPlatino} alt="" />
                                        </p>
                                        <p className='p-2 py-4 bg-white rounded-lg'> Regalos exclusivos </p>
                                        <p className='p-2 py-4 bg-white rounded-lg'> Descuentos generosos en spa </p>
                                        <p className='p-2 py-4 bg-white rounded-lg'> Acceso anticipado a ventas </p>
                                    </div>
                                    <div className='w-[46%] rounded-xl text-center bg-[#45B59C] mt-4 grid gap-4 my-auto  p-3'>
                                        <p className='grid p-2 py-4 bg-white rounded-lg'> Rango VIP
                                            <img className='w-24 m-auto mt-2' src={rangoVIP} alt="" />
                                        </p>
                                        <p className='p-2 py-4 bg-white rounded-lg'> Invitaciones a eventos VIP de élite </p>
                                        <p className='p-2 py-4 bg-white rounded-lg'> Acceso anticipado a ventas exclusivas </p>
                                        <p className='p-2 py-4 bg-white rounded-lg'> Contenido premium ilimitado </p>
                                        <p className='p-2 py-4 bg-white rounded-lg'> Acceso a todos los servicios de nuestro spa </p>
                                    </div>
                                </>
                            ) : (
                                rango === 3 ? (
                                    <div className='w-[46%] rounded-xl text-center bg-[#45B59C] mt-4 grid gap-4 my-auto  p-3'>
                                        <p className='grid p-2 py-4 bg-white rounded-lg'> Rango VIP
                                            <img className='w-24 m-auto mt-2' src={rangoVIP} alt="" />
                                        </p>
                                        <p className='p-2 py-4 bg-white rounded-lg'> Invitaciones a eventos VIP de élite </p>
                                        <p className='p-2 py-4 bg-white rounded-lg'> Acceso anticipado a ventas exclusivas </p>
                                        <p className='p-2 py-4 bg-white rounded-lg'> Contenido premium ilimitado </p>
                                        <p className='p-2 py-4 bg-white rounded-lg'> Acceso a todos los servicios de nuestro spa </p>
                                    </div>
                                ) : (
                                    <div className='w-[46%] rounded-xl text-center bg-[#45B59C] mt-4 grid gap-4 my-auto  p-3'>
                                        <p className='grid p-2 py-4 bg-white rounded-lg'> Rango Oro
                                            <img className='w-24 m-auto mt-2' src={rangoOro} alt="" />
                                        </p>
                                        <p className='p-2 py-4 bg-white rounded-lg'> Envío prioritario </p>
                                        <p className='p-2 py-4 bg-white rounded-lg'> Promociones exclusivas </p>
                                    </div>
                                )
                            )
                        )}
                        </div>
                    </div>
                </section>

            </main>
        </LayoutPrincipal >
    );
}

export default Rango;

