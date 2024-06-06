import { useState } from "react"

// eslint-disable-next-line react/prop-types
function TarjetasPagoEstatica({ tarjetas, isFirst, show }) {
    const [isSelect, setIsSelect] = useState(null)

    function selected(card) {
        //clearSelection()
        setIsSelect(card.numero_tarjeta)
        show(tarjetas)
    }

    console.log(tarjetas);

    return (
        <div className={'grid overflow-hidden ' + 
            `${isSelect === tarjetas.numero_tarjeta ? 
                isFirst ? 
                    'border-2 border-red-600 rounded-t-2xl'
                :
                    'border-2 border-red-600'
                
            : 
                'border-b border-gray-400'}`
        }>
            { tarjetas.predeterminada === 1 && (
                isFirst ? (
                    <div className="grid w-[40%] justify-self-end rounded-tr-2xl rounded-bl-2xl bg-[#056761]">
                        <p className="text-white justify-self-center">Predeterminado</p>
                    </div>
                ):(
                    <div className="grid w-[40%] justify-self-end rounded-bl-2xl bg-[#056761]">
                        <p className="text-white justify-self-center">Predeterminado</p>
                    </div>
                )  
            )}
            <div className="flex py-6 px-8 justify-between">
                <div className="grid justify-center">
                    <img src={`../../../pictures/${tarjetas.imagen}`}
                        alt={tarjetas.empresa} className='w-16 h-auto aspect-square rounded-full justify-self-center' />
                    {isSelect === tarjetas.numero_tarjeta ? (
                        <button onClick={() => selected('')} className='px-8 py-1 text-[#EB5765] rounded-full hover:font-bold'>Cerrar</button>
                    ) : (
                        <button onClick={() => selected(tarjetas)} className='px-8 py-1 text-[#EB5765] rounded-full hover:font-bold'>Editar</button>
                    )}
                </div>
                <div className="grid place-content-center">
                    <h1 className="text-lg font-bold">Terminada en {tarjetas.vista_tarjeta}</h1>
                    <p className='text-sm text-gray-500'>{tarjetas.empresa}</p>
                    <p className='text-sm text-gray-500'>Vencimiento: {tarjetas.exp_month}/{tarjetas.exp_year}</p>
                </div>
            </div> 
        </div>
    )
}

export default TarjetasPagoEstatica