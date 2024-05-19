import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line react/prop-types
const EditarTarjeta = ({cerrar}) => {
    return(
        <div className="absolute w-1/3 px-10 py-6 shadow-md bg-white rounded-lg m-auto">
            <section className='flex border-b-2 border-gray-500 justify-between pb-6'>
                <div className='flex-grow' />
                <h2 className='text-2xl text-[#ec5766] text-center flex-grow'>Editar tarjeta</h2>
                <div className='flex-grow flex justify-end'>
                    <button className='duration-200 text-2xl text-black hover:text-[#ffb5a7]' onClick={cerrar} >
                        <FontAwesomeIcon icon={faX} />
                    </button>
                </div>
            </section>
            <form className='grid border-b-2 py-6 border-gray-500'>
                <div>
                    <h1 className='mb-2'>Nombre de la tarjeta</h1>
                    <input type="text" className='rounded-lg w-full' />
                </div>
                <div className='mt-6'>
                    <h1 className='mb-2'>Fecha de caducidad</h1>
                </div>
                <div className='mt-6'>
                    <h1 className='mb-2'>Número de teléfono</h1>
                    <input type="text" className='rounded-lg w-full' />
                </div>
            </form>
            <div className='mt-4'>
                <h1 className='mb-2'>Dirreción asociada</h1>
            </div>
            <div className="flex justify-end mt-4">
                <button onClick={cerrar} className='bg-[#fccfc6] cursor-pointer justify-self-center mr-4 text-xl text-[#EB5765] px-10 py-2 rounded-full duration-200 hover:font-bold'>Cancelar</button>
                <button onClick={cerrar} className='bg-[#ec5766] cursor-pointer justify-self-center text-xl text-white px-10 py-2 rounded-full duration-200 hover:bg-[#ffb5a7]'>Guardar</button>
            </div>
        </div>
    )
}

export default EditarTarjeta;