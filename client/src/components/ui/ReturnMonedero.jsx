function ReturnMonederos({ monederos }) {

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
                        <p className='text-sm'>monto: {monederos.monto}</p>
                        
                    </div>
                </div>
                <div className='grid gap-2 p-2 '>
                    <button className='px-10 py-1 text-white rounded-full bg-[#EB5765]'>Opinar</button>
                </div>


            </div>
        </div>
    )
}

export default ReturnMonederos