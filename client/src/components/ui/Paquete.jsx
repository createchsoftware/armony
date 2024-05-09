

function Paquete({ paquete }) {
    return (
        <div className="flex justify-around">
            <div className="grid items-center place-items-center">
                <h2>{paquete.nombre}</h2>
                <div className="px-4 py-2 border-2 border-black rounded-full cursor-pointer md:py-4 md:px-20 hover:bg-slate-50">{paquete.descripcion}</div>
            </div>
            <div className="flex items-center justify-between gap-2">
                <div className="grid place-items-center">
                    <div className="p-2 border-2 border-black rounded-full cursor-pointer hover:bg-slate-50"> {'$' + paquete.precio} </div>
                </div>
                <div className="grid place-items-center">
                    <div className="p-2 border-2 border-black rounded-full cursor-pointer hover:bg-slate-50"> {'$' + paquete.precio * 5} </div>
                </div>
                <div className="grid place-items-center">
                    <div className="p-2 border-2 border-black rounded-full cursor-pointer hover:bg-slate-50"> {'$' + paquete.precio * 10} </div>
                </div>
            </div>
        </div>
    )
}

export default Paquete;