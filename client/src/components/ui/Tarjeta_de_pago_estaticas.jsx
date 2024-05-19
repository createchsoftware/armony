import { useState } from "react"

function TarjetasPagoEstatica({ tarjetas, isFirst, show, clearSelection }) {
    const [select, setSelect] = useState('border-b border-gray-400')
    const [isSelect, setIsSelect] = useState(false)

    const selected = () => {
        clearSelection()
        setIsSelect(!isSelect)
        isSelect ? (
            setSelect('border-b border-gray-400')
        ):(
            isFirst ? (
                setSelect('border-2 border-red-600 rounded-t-2xl')
            ):(
                setSelect('border-2 border-red-600')
            )  
        )
        show(tarjetas)
    }

    return (
        <div className={'grid ' + select}>
            { isFirst ? (
                <div className="grid w-[40%] justify-self-end rounded-tr-2xl rounded-bl-2xl bg-[#056761]">
                    <p className="text-white justify-self-center">Predeterminado</p>
                </div>
            ):''}
            <div className="flex py-6 px-8 justify-between">
                <div className="grid justify-center">
                    <img src={`../../../pictures/${tarjetas.imagen}`}
                            alt={tarjetas.empresa} className='w-16 h-auto aspect-square rounded-full justify-self-center' />
                    <button onClick={selected} className='px-8 py-1 text-[#EB5765] rounded-full hover:font-bold'>Editar</button>
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