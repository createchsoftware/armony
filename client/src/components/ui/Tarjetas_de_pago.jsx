function TarjetasPago({ tarjetas , funcion, texto_btn}) {
    return (
        <div className='grid gap-4 p-6 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] '>
            <p className="text-[#00000085]">Terminada en {tarjetas.vista_tarjeta}</p>
            <hr />
            <div className="flex justify-between w-full">
                <div className='flex justify-between gap-4 '>
                    <img src={`../../../pictures/${tarjetas.imagen}`}
                        alt={tarjetas.empresa} className='w-24 h-24' />
                    <div className='grid place-content-center'>
                        <h1 className='text-xl'>{tarjetas.titular}</h1>
                        <p className='text-sm'>Vencimiento {tarjetas.fechaVencimiento}</p>
                    </div>
                </div>
                <div className='grid gap-2 p-2 '>
                    {funcion? (
                        <button onClick={()=> funcion(tarjetas)} className='px-10 py-1 text-white rounded-full bg-[#EB5765]'>{texto_btn}</button>
                    ):(
                        <span>Seleccionado</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TarjetasPago