// eslint-disable-next-line react/prop-types
function TarjetasPago({ tarjetas , funcion, texto_btn}) {
    return (
        <>
            <div className='flex p-6 border-b border-gray-400 justify-between'>
                <div className="flex gap-4">
                    <img src={`../../../pictures/${tarjetas.imagen}`}
                        alt={tarjetas.empresa} className='w-auto h-24' />
                    <div className="grid place-content-center">
                        <h1 className="text-lg font-bold">Terminada en {tarjetas.vista_tarjeta}</h1>
                        <p className='text-sm text-gray-500'>{tarjetas.empresa}</p>
                        <p className='text-sm text-gray-500'>Vencimiento {tarjetas.fechaVencimiento}</p>
                    </div>
                </div>
                <div className='grid gap-2 p-2 '>
                    {funcion? (
                        <button onClick={()=> funcion(tarjetas)} className='px-10 py-1 text-[#EB5765] rounded-full bg-white'>{texto_btn}</button>
                    ):(
                        <span>Seleccionado</span>
                    )}
                </div>
            </div>
        </>
    )
}

export default TarjetasPago