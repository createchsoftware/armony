import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const EditarTarjeta = ({cerrar}) => {
    const [mostrarFormulario, setMostrarFormulario] = useState(false)

    const toggleFormulario = () => {
        setMostrarFormulario(!mostrarFormulario)
    };

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
                    <input type="text" maxLength={30} className='rounded-lg w-full' />
                </div>
                <div className='mt-6'>
                    <h1 className='mb-2'>Fecha de caducidad</h1>
                    <div className='flex'>
                        <select name="" id="" className='border-0 rounded-md shadow-lg mr-2 cursor-pointer'>
                            <option value="" className='align-middle py-1'>01</option>
                            <option value="" className='align-middle py-1'>02</option>
                            <option value="" className='align-middle py-1'>03</option>
                            <option value="" className='align-middle py-1'>04</option>
                            <option value="" className='align-middle py-1'>05</option>
                            <option value="" className='align-middle py-1'>06</option>
                            <option value="" className='align-middle py-1'>07</option>
                            <option value="" className='align-middle py-1'>08</option>
                            <option value="" className='align-middle py-1'>09</option>
                            <option value="" className='align-middle py-1'>10</option>
                            <option value="" className='align-middle py-1'>11</option>
                            <option value="" className='align-middle py-1'>12</option>
                        </select>
                        <select name="" id="" className='border-0 rounded-md shadow-lg mr-2 cursor-pointer'>
                            <option value="" className='align-middle py-1'>2024</option>
                            <option value="" className='align-middle py-1'>2025</option>
                            <option value="" className='align-middle py-1'>2026</option>
                            <option value="" className='align-middle py-1'>2027</option>
                            <option value="" className='align-middle py-1'>2028</option>
                            <option value="" className='align-middle py-1'>2029</option>
                            <option value="" className='align-middle py-1'>2030</option>
                            <option value="" className='align-middle py-1'>2031</option>
                            <option value="" className='align-middle py-1'>2032</option>
                            <option value="" className='align-middle py-1'>2033</option>
                            <option value="" className='align-middle py-1'>2034</option>
                            <option value="" className='align-middle py-1'>2035</option>
                        </select>
                    </div>
                </div>
                <div className='mt-6'>
                    <h1 className='mb-2'>Número de teléfono</h1>
                    <input type="text" maxLength={10} className='rounded-lg w-full' />
                </div>
            </form>
            <div className='mt-4 duration-200'>
                <h1 className='mb-2'>Dirección asociada</h1>
                <div className={'flex items-center p-2 w-full ' + ( mostrarFormulario ? ('rounded-t-lg border-b-2 border-gray-300 shadow-md'):('rounded-lg shadow-md'))}>
                    <button onClick={toggleFormulario} className='flex justify-between w-full'>
                        <span className='mr-2 text-sm'>Cambiar dirección</span>
                        <FontAwesomeIcon icon={mostrarFormulario ? faMinus : faPlus} />
                    </button>
                </div>
                {mostrarFormulario && (
                    <form className={'p-4 shadow-lg ' + (mostrarFormulario ? ('rounded-b-lg shadow-md'):'')}>
                        <div className='mb-4'>
                            <label className='block text-gray-700'>Ciudad</label>
                            <input type='text' className='w-full p-2 border rounded-lg' />
                        </div>
                        <div className='mb-4 flex'>
                            <div className='flex-1 mr-2'>
                                <label className='block text-gray-700'>Estado</label>
                                <select className='w-full p-2 border-0 shadow-md rounded-xl cursor-pointer'>
                                    <option>Selecciona</option>
                                    <option>Activo</option>
                                    <option>No activo</option>
                                </select>
                            </div>
                            <div className='flex-1 ml-2'>
                                <label className='block text-gray-700'>Código postal</label>
                                <input type='text' maxLength={5} className='w-full p-2 border rounded-lg' />
                            </div>
                        </div>
                        <div className='mb-4'>
                            <label className='block text-gray-700'>Calle</label>
                            <input type='text' className='w-full p-2 border rounded-lg' />
                        </div>
                    </form>
                )}
            </div>
            <div className="flex justify-end mt-4">
                <button onClick={cerrar} className='bg-[#fccfc6] cursor-pointer justify-self-center mr-4 text-xl text-[#EB5765] px-10 py-2 rounded-full duration-200 hover:font-bold'>Cancelar</button>
                <button onClick={cerrar} className='bg-[#ec5766] cursor-pointer justify-self-center text-xl text-white px-10 py-2 rounded-full duration-200 hover:bg-[#ffb5a7]'>Guardar</button>
            </div>
        </div>
    )
}

export default EditarTarjeta;