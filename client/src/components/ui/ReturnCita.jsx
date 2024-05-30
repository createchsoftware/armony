function ReturnCitas({ citas }) {

    return (

        <div className='grid gap-4 p-6 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] '>
            <p className="text-[#00000085]">{`${citas.day} de ${citas.month} del ${citas.year}`}</p>
            <hr />
            <div className="flex justify-between w-full">
                <div className='flex justify-between gap-4 '>
                    <img src={`../../../pictures/${citas.imagen}`}
                        alt={citas.nombre} className='w-24 h-24' />
                    <div className='grid place-content-center'>
                        <h1 className='text-xl'>{citas.nombre}</h1>
                        <p className='text-sm'><span className="font-bold">Especialista: </span> {citas.especialista}</p>
                        <p className='text-sm'><span className="font-bold">Sesiones: </span> {citas.sesiones}</p>
                        <p className='text-sm'><span className="font-bold">Fecha: </span> {citas.fecha}</p>
                        <p className='text-sm'><span className="font-bold">Hora: </span> {citas.hora}</p>
                    </div>
                </div>
                <div className='grid gap-2 p-2 '>
                    <button className='px-10 py-1 text-white rounded-full bg-[#EB5765]'>Opinar</button>
                </div>


            </div>
        </div>
    )
}

export default ReturnCitas