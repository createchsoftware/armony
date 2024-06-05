import { useState } from "react"
import { Rating } from '@mui/material';

function ReturnCitas({ citas }) {
    const [info, setInfo] = useState(false);

    //console.log(citas);

    return (
        <div className='grid gap-4 p-6 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] '>
            <div className="flex justify-between">
                <div>
                    <p className="text-[#00000085]">{`${citas.day} de ${citas.month} del ${citas.year}`}</p>
                    <p className="text-[#00000085]">{`Hora: ${citas.hora}`}</p>
                </div>
                <p className="text-[#00000085]">Pedido #{citas.id_cita}</p>
            </div>
            <hr />
            <div className="flex justify-between w-full">
                <div className='flex justify-between gap-4 '>
                    <img src={citas.imagen}
                        alt={citas.nombre} className='w-24 h-24' />
                    <div className='grid place-content-center'>
                        <h1 className='text-xl'>{citas.nombre}</h1>
                        <p className='text-sm'><span className="font-bold">Especialista: </span> {citas.especialista}</p>
                        <p className='text-sm'><span className="font-bold">Sesiones: </span> {citas.sesiones}</p>
                        <p className='text-sm'><span className="font-bold">Fecha: </span> {citas.fecha}</p>
                        <p className='text-sm'><span className="font-bold">Hora: </span> {citas.hora}</p>
                    </div>
                </div>
                <div className='grid content-center gap-2 p-2 '>
                    <button onClick={() => setInfo(!info)} className='w-48 px-4 py-2 h-max text-white rounded-full bg-[#EB5765] duration-200 hover:bg-[#ffb5a6]'>Ver información</button>
                    <button className='w-48 px-10 py-2 h-max text-[#EB5765] rounded-full bg-[#ffb6b6] duration-200 hover:font-bold'>Opinar</button>
                </div>
            </div>
            {info && 
                <div className='cart-fondo z-30'>
                    <div className='cart-fx'>
                        <div className='grid mt-16 w-[60%] bg-white rounded-2xl m-auto py-4'>
                            <h1 className="justify-self-center font-bold text-3xl text-[#EB5765]">Servicio</h1>
                            <div className=" justify-self-center w-1/2 border border-black my-3" />
                            <h1 className=" justify-self-center mb-5 text-xl">{`Fecha: ${citas.day} / ${citas.month} / ${citas.year}`}</h1>
                            <div className="flex justify-between px-12">
                                <div className="grid w-[35%] justify-items-center">
                                    <h1 className="text-2xl font-bold text-center overflow-hidden">{citas.nombre}</h1>
                                    <img src={citas.imagen} alt="" className="w-[90%] h-auto rounded-2xl" />
                                    <h1 className="text-xl text-[#EB5765]">Calificación de los clientes:</h1>
                                    <h1 className="text-xl text-[rgb(3,109,99)]">Excelente</h1>
                                    <Rating className='' value={citas.valoracion} readOnly unratedcolor="amber" ratedcolor="amber" />
                                </div>
                                <div className="grid w-[55%]">
                                    <div className="flex justify-center items-center border-b border-t border-black py-1">
                                        <h1 className="text-2xl">{`Pedido: #${citas.id}`}</h1>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <p>Sesiones</p>
                                        <p>{`1 x $${citas.precio}`}</p>
                                    </div>
                                    {/* <div className="flex justify-between">
                                        <p>IVA:</p>
                                        <p>$0.00</p>
                                    </div> */}
                                    <div className="flex justify-between">
                                        <p>Descuento</p>
                                        <p>$0.00</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Método de pago:</p>
                                        <p>Tarjeta</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Tarjeta utilizada</p>
                                        <p>************9382</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-[rgb(3,109,99)]">Puntos obtenidos:</p>
                                        <p className="text-[rgb(3,109,99)]">{parseInt(citas.precio/10)} puntos</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid justify-items-center">
                                <button className='w-48 px-4 py-2 h-max mb-2 text-white rounded-full bg-[#EB5765] duration-200 hover:bg-[#ffb5a6]'>Dar una opinión</button>
                                <button className='w-48 px-4 py-2 h-max mb-2 text-white rounded-full bg-[#EB5765] duration-200 hover:bg-[#ffb5a6]'>Volver a comprar</button>
                                <button onClick={() => setInfo(!info)} className='w-48 px-4 py-2 h-max mb-2 text-white rounded-full bg-[#EB5765] duration-200 hover:bg-[#ffb5a6]'>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ReturnCitas