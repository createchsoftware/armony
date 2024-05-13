function TarjetasPagoEstatica({ tarjetas}) {

    return (
        
        <div className='grid gap-2 p-4 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] '>
            <p className="text-[#00000085]">Terminada en {tarjetas.vista_tarjeta}</p>
            <hr />
            <div className="flex justify-between w-full">
                <div className='flex justify-between gap-2 '>
                    <img src={`../../../pictures/${tarjetas.imagen}`}
                        alt={tarjetas.empresa} className='w-24 h-24' />
                    <div className='grid place-content-center'>
                        <h1 className='text-xl'>{tarjetas.nombre}</h1>
                        <p className='text-sm'>Vencimiento {tarjetas.fechaVencimiento}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TarjetasPagoEstatica