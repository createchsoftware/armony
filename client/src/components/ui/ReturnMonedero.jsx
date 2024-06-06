import React, { useState } from 'react'

function ReturnMonederos({ monederos }) {

    const [info, setInfo] = useState(false);

    function capitalizeFirstLetter(string) {
        if (!string) return string; // Manejo de cadenas vacías o indefinidas
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (

        <div className='grid gap-4 p-6 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] '>
            <p className="text-[#00000085]">{`${monederos.day} de ${monederos.month} del ${monederos.year}`}</p>
            <hr />
            <div className="flex justify-between w-full">
                <div className='flex justify-between gap-4 '>
                    <img src={`../../../pictures/${monederos.imagen}`}
                        alt='alcancia de naruto' className='w-24 h-24' />
                    <div className='grid place-content-center'>
                        <h1 className='text-xl'>Recarga al monedero</h1>
                        <p className='text-sm'><span className="font-bold">Monto: </span> {monederos.monto}</p>

                    </div>
                </div>
                <div className='grid content-center gap-2 p-2 '>
                    <button onClick={() => setInfo(!info)} className='w-max h-max px-10 py-2 text-white rounded-full bg-[#EB5765]'>Ver información</button>
                </div>
            </div>
            {info && 
                <div className='cart-fondo z-30'>
                    <div className='cart-fx'>
                        <div className='grid mt-36 w-[60%] bg-white rounded-2xl m-auto py-4'>
                            <h1 className="justify-self-center font-bold text-3xl text-[#EB5765]">Recarga</h1>
                            <div className=" justify-self-center w-1/2 border border-black my-3" />
                            <h1 className=" justify-self-center mb-5 text-xl">{`Fecha: ${monederos.day} / ${monederos.month} / ${monederos.year}`}</h1>
                            <div className="flex justify-between px-12">
                                <div className="grid w-[35%] justify-items-center">
                                    <h1 className="text-2xl font-bold text-center overflow-hidden">{monederos.nombre}</h1>
                                    <img src={`../../../pictures/${monederos.imagen}`} alt="" className="w-[75%] h-auto rounded-2xl" />
                                </div>
                                <div className="grid w-[55%]">
                                    <div className="flex justify-between">
                                        <p>Monto:</p>
                                        <p>{monederos.monto}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Método de pago:</p>
                                        <p>{capitalizeFirstLetter(monederos.tipoPago)}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Tarjeta utilizada:</p>
                                        <p>************{monederos.numeroTarjeta.substring(12, 16)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid justify-items-center">
                                <button onClick={() => setInfo(!info)} className='w-48 px-4 py-2 h-max mb-2 text-white rounded-full bg-[#EB5765] duration-200 hover:bg-[#ffb5a6]'>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ReturnMonederos