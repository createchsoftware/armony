function Compras({ compras }) {

    return (

        <div className='grid gap-4 p-6 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] '>
            <p className="text-[#00000085]">{compras.header} Pedido #{compras.id_venta}</p>
            <hr />
            <div className="flex justify-between w-full">
                <div className='flex justify-between gap-4 '>
                    <img src={`../../../pictures/${compras.img}`}
                        alt={compras.nombre} className='w-24 h-24' />
                    <div className='grid place-content-center'>
                        <h1 className='text-xl'>{compras.nombre}</h1>
                        <p className='mt-1 text-sm'>{compras.descripcion}</p>
                        <p className='mt-1 text-sm'><span className="font-bold">Precio:</span> ${compras.precio}</p>
                        <p className='text-sm'><span className="font-bold">Cantidad: </span> {compras.cantidad}</p>
                    </div>
                </div>
                <div className='grid gap-2 p-2 '>
                    <button id={compras.id} className='px-10 py-1 text-white rounded-full bg-[#EB5765]'>Ver producto</button>
                </div>


            </div>
        </div>
    )
}

export default Compras
