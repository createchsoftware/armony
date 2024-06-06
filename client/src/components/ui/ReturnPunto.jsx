import React, { useState } from 'react'

function ReturnPuntos({ puntos }) {

    const [info, setInfo] = useState(false);

    return (
        <div className='grid gap-4 p-6 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] '>
            <p className="text-[#00000085]">{`${puntos.day} de ${puntos.month} del ${puntos.year}`}</p>
            <hr />
            <div className="flex justify-between w-full">
                <div className='flex justify-between gap-4 '>
                    <img src={`../../../pictures/${puntos.imagen}`}
                        alt='stellas' className='w-24 h-24' />
                    <div className='grid place-content-center'>
                        <h1 className='text-xl'>Acumulacion de puntos</h1>
                        <p className='text-sm'><span className="font-bold">Puntos obtenidos: </span> {parseInt(puntos.monto)}</p>
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
                            <h1 className="justify-self-center font-bold text-3xl text-[#EB5765]">Puntos</h1>
                            <div className=" justify-self-center w-1/2 border border-black my-3" />
                            <h1 className=" justify-self-center mb-5 text-xl">{`Fecha: ${puntos.day} / ${puntos.month} / ${puntos.year}`}</h1>
                            <div className="flex justify-center px-12">
                                <div className="grid w-[35%] justify-items-center">
                                    <h1 className="text-2xl font-bold text-center overflow-hidden">{puntos.nombre}</h1>
                                    <img src={`../../../pictures/${puntos.imagen}`} alt="" className="w-[75%] h-auto rounded-2xl" />
                                    <p className='text-sm mt-2'><span className="font-bold">Puntos obtenidos: </span> {parseInt(puntos.monto)}</p>
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

export default ReturnPuntos