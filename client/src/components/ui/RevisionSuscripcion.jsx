import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function RevisionProductos({ restart }) {
    const suscripcion = 199
    const [descuento, setDescuento] = useState('')
    const handleChange = (event) => {
        setDescuento(event.target.value)
    }

    return (
        <>
            <div className='grid mb-8'>
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
                            <div className='grid justify-center p-6 mb-4 border-2 shadow-md rounded-xl border-gray'>
                                <h3 className='mb-4 text-xl font-bold justify-self-center'>¿Tienes un cupón de descuento?</h3>
                                <form action="" className='flex mx-4 border-2 rounded-full shadow-md border-gray'>
                                    <input
                                        type="text"
                                        value={descuento}
                                        onChange={handleChange}
                                        maxLength="15"
                                        className='px-2 py-2 text-center rounded-l-full'
                                    />
                                    <button type="submit" className='rounded-r-full text-white bg-[rgb(3,109,99)] py-2 px-8 duration-200 hover:bg-[rgb(69,181,156)] hover:font-bold'>Aplicar</button>
                                </form>
                                <p className='w-[80%] text-center justify-self-center text-xs mt-4'>Los <p className='text-[#D47300]'>Términos y Condiciones de los Cupones</p> de Armony aplican el uso de cupones.</p>
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