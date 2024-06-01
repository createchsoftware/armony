// eslint-disable-next-line react/prop-types

function TarjetasMonedero({ monedero}) {
    return (
        <>
            <div className='flex p-6 border-b border-gray-400 justify-between'>
                <div className="flex gap-4">
                    <img src={`../../../pictures/${monedero.imagen}`}
                        alt="monedero" className='w-auto h-24' />
                    <div className="grid place-content-center">
                        <h1 className="text-lg font-bold">{monedero.label}</h1>
                        <p className='text-sm text-gray-500'>monto {monedero.monto}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TarjetasMonedero