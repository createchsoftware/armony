import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
function RevisionProductos({ restart }) {
    const suscripcion = 199


    localStorage.setItem('puntosSuscripcion', suscripcion / 10)
    localStorage.setItem('totalSuscripcion', suscripcion)

    console.log(localStorage.getItem('puntosSuscripcion'))
    console.log(localStorage.getItem('totalSuscripcion'))

    // console.log(localStorage.getItem('puntosSuscripcion'))
    // console.log(localStorage.getItem('totalSuscripcion'))

    const puntos = suscripcion / 10;
    //En caso de ser Socio VVV
    //const puntos = (parseInt(totalIva))/5;

    return (
        <>
            <div className='grid'>
                <div className='flex justify-between mx-16'>
                    <div className="rounded-xl shadow-md w-[55%] h-max border-2 border-gray">
                        <div className='flex bg-[rgb(3,109,99)] rounded-t-xl justify-between items-center'>
                            <a href="/spa/productos" className='flex items-center ml-6 text-white relative cursor-pointer before:bg-white before:absolute before:-bottom-1 before:block before:h-[1px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:font-bold'>
                                <FontAwesomeIcon icon={faAngleLeft} />
                                <p className='ml-2'>Volver</p>
                            </a>
                            <p className='py-2 text-lg text-white mr-[45%]'>Revisión</p>
                        </div>
                        {/* Contenido de la suscripción */}
                        <div className='px-6 pt-6 overflow-y-auto'>
                            <ul>
                                <li className="flex p-4 mb-4 border-2 shadow-md rounded-xl border-gray">
                                    <img className='w-1/3 h-auto' src='../../../pictures/tarjetaSuscripcion.png' alt='' />
                                    <div className='grid content-between w-3/4 mx-4'>
                                        <div className='flex justify-between'>
                                            <div className='grid'>
                                                <span className='mr-5 text-xl font-bold'>Suscripción Armony</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='text-xs'>Suscripción a todas las novedades y exclusividad en Armony.</span>
                                        </div>
                                        <div className='flex justify-end'>
                                            <h1 className='text-[rgb(3,109,99)]'>${suscripcion.toFixed(2)}</h1>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Bloque de pago */}
                    <div className="rounded-xl shadow-md w-[40%] border-2 border-gray">
                        <div className='grid bg-[rgb(3,109,99)] rounded-t-xl'>
                            <p className='py-2 pl-8 text-lg text-white justify-self-start'>Resumen</p>
                        </div>
                        <div className='px-6 pt-6'>
                            <div className='grid p-6 mb-4 border-2 shadow-md rounded-xl border-gray'>
                                <div className='flex justify-between'>
                                    <span>1 Producto(s)</span>
                                    <h1 className='font-bold'>${suscripcion.toFixed(2)}</h1>
                                </div>
                                <div className='flex justify-between'>
                                    <h1>Envío</h1>
                                    <h1 className='font-bold'>$0.00</h1>
                                </div>
                                <div className='flex justify-between'>
                                    <h1>Cupón</h1>
                                    <h1 className='font-bold'>$0.00</h1>
                                </div>
                            </div>
                            {/* Código de descuento */}
                            <div className='p-6 mb-4 border-2 shadow-md rounded-xl border-gray'>
                                <div className='flex justify-center w-full'>
                                    <h3 className='mb-4 text-xl font-bold text-center justify-self-center'>¿Tienes un cupón de descuento?</h3>
                                </div>
                                {/* <div className='flex justify-between border-2 rounded-full shadow-md border-gray'>
                                    <input
                                        type="text"
                                        value={descuento}
                                        onChange={handleChange}
                                        maxLength="15"
                                        className=' w-[70%] px-2 py-2 text-center rounded-l-full'
                                    />
                                    <button type="submit" className=' w-[30%] rounded-r-full text-center text-white bg-[rgb(3,109,99)] duration-200 hover:bg-[rgb(69,181,156)] hover:font-bold'>Aplicar</button>
                                </div> */}
                                <div className='flex justify-center w-full'>
                                    <p className='mt-4 text-xs text-center justify-self-center'>Los <p className='text-[#D47300]'>Términos y Condiciones de los Cupones</p> de Armony aplican el uso de cupones.</p>
                                </div>
                            </div>
                            <div className='flex justify-between p-6 px-10 mb-4 border-2 shadow-md rounded-xl border-gray'>
                                <h4 className='text-xl font-bold'>Puntos obtenidos:</h4>
                                <span className='font-bold text-[rgb(3,109,99)] text-xl'>{parseInt(puntos)}</span>
                            </div>
                            <div className='flex justify-between p-6 px-10 mb-4 border-2 shadow-md rounded-xl border-gray'>
                                <h4 className='text-xl font-bold'>Total:</h4>
                                <span className='font-bold text-[rgb(3,109,99)] text-xl'>${suscripcion.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RevisionProductos;