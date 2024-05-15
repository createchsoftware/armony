import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Agenda({ restart }) {
    const [citasItems, setCitasItems] = useState([
        { id: 1, name: 'Facial Hidratante', price: 800.00, quantity: 1, image: "../../../pictures/crema2.png", desc: "Crema olor a coco humectante.", duracion: "60 min", dia: "07/06/2024", hora: "8:00", especialista: "Antonio Esparza" },
        { id: 2, name: 'Maquillaje', price: 1100.00, quantity: 1, image: "../../../pictures/crema1.png", desc: "Shampoo con aceite de coco.", duracion: "90 min", dia: "31/03/2024", hora: "14:20", especialista: "Antonio Esparza" },
    ]);
    //  ^^^ ES SOLO TEST PARA PROBAR LA FUNCIONALIDAD DEL RESUMEN DE CITAS

    //Para remover por completo un servicio.
    const removeItem = (itemId) => {
        setCitasItems(citasItems.filter(item => item.id !== itemId));
    };

    const [descuento, setDescuento] = useState('');
    const handleChange = (event) => {
        setDescuento(event.target.value);
    }

    const handleRestart = () => {
        restart();
    }

    const totalCitas = citasItems.reduce((total, item) => total + item.quantity, 0);
    const total = citasItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    const iva = (total * (.08)).toFixed(2);
    const totalIva = (parseFloat(total) + parseFloat(iva)).toFixed(2);

    const citasList = citasItems.map(item => (
        <li key={item.id} className="flex justify-between p-4 mb-4 border-2 shadow-md rounded-xl border-gray">
            <img className='w-24 h-24 mr-6 rounded-full' src={item.image} alt={item.name} />
            <div className='grid justify-center'>
                <div className='flex justify-self-center'>
                    <span className='mr-5 font-bold text-l'>{item.name}</span>
                </div>
                <div className='flex justify-between'>
                    <span className='text-m'>Duracion: {item.duracion}</span>
                    <span className='text-m'>Costo: ${item.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-around">
                    <span className='text-m'>Cita: {item.dia} - {item.hora}</span>
                </div>
                <div className="flex justify-center">
                    <span className='text-m'>Especialista: {item.especialista}</span>
                </div>
            </div>
            <button className='duration-200 hover:text-[#ec5766] text-2xl' onClick={() => removeItem(item.id)}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </li>
    ));

    return (
        <>
            <div className='grid'>
                <h1 className='justify-self-center text-2xl px-8  border-b-2 border-b-[#ec5766] font-bold mb-10'>
                    Resumen de tus citas
                </h1>
                <div className='flex justify-between mx-16'>
                    {/* Bloque de servicios */}
                    <div className="rounded-xl shadow-md w-[45%] border-2 border-gray">
                        <div className='grid bg-[rgb(3,109,99)] rounded-t-xl'>
                            <p className='py-2 text-lg text-white justify-self-center'>Servicios</p>
                        </div>
                        {/* Contenido de los servicios agendados */}
                        <div className='px-6 pt-6 overflow-y-auto'>
                            {citasItems.length === 0 ? (
                                <div className='grid'>
                                    <h4 className="mt-4 mb-10 text-xl font-bold justify-self-center">No hay servicios agendados.</h4>
                                </div>
                            ) : (
                                <>
                                    <ul id="">{citasList}</ul>
                                </>
                            )}
                        </div>
                        {/* Botones */}
                        <div>
                            {citasItems.length === 0 ? (
                                <div className='flex justify-center'>
                                    <button onClick={handleRestart} className='bg-[#ec5766] text-white px-10 py-2 rounded-full'>Agregar</button>
                                </div>
                            ) : (
                                <div className='flex justify-around mb-4'>
                                    <button className='bg-[#ec5766] text-white px-10 py-2 rounded-full duration-200 hover:bg-[#ffb5a7]'>Modificar</button>
                                    <button onClick={handleRestart} className='bg-[#ec5766] text-white px-10 py-2 rounded-full duration-200 hover:bg-[#ffb5a7]'>Agregar</button>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Bloque de pago */}
                    <div className="rounded-xl shadow-md w-[45%] border-2 border-gray">
                        <div className='grid bg-[rgb(3,109,99)] rounded-t-xl'>
                            <p className='py-2 text-lg text-white justify-self-center'>Pago</p>
                        </div>
                        <div className='px-6 pt-6'>
                            <div className='grid p-6 mb-4 border-2 shadow-md rounded-xl border-gray'>
                                <div className='flex justify-between mb-2'>
                                    <span>{totalCitas} Servicio(s)</span>
                                    <h1 className='font-bold'>${total}</h1>
                                </div>
                                <div className='flex justify-between mb-2'>
                                    <h1>IVA</h1>
                                    <h1 className='font-bold'>${iva}</h1>
                                </div>
                                <div className='flex justify-between'>
                                    <h1>Descuento por membresía</h1>
                                    <h1 className='font-bold'>$0.00</h1>
                                </div>
                            </div>
                            {/* Código de descuento */}
                            <div className='grid justify-center p-6 mb-4 border-2 shadow-md rounded-xl border-gray'>
                                <h3 className='mb-4 text-xl font-bold justify-self-center'>Código de descuento</h3>
                                <form action="" className='flex border-2 rounded-full shadow-md border-gray'>
                                    <input
                                        type="text"
                                        value={descuento}
                                        onChange={handleChange}
                                        maxLength="15"
                                        className='px-6 py-2 text-center rounded-full'
                                    />
                                    <button type="submit" className='rounded-full text-white bg-[rgb(3,109,99)] py-2 px-8 duration-200 hover:bg-[rgb(69,181,156)] hover:font-bold'>Aplicar</button>
                                </form>
                            </div>
                            <div className='flex justify-between p-6 px-10 mb-4 border-2 shadow-md rounded-xl border-gray'>
                                <h4 className='text-xl font-bold'>Total:</h4>
                                <span className='font-bold text-[rgb(3,109,99)] text-xl'>${totalIva}</span>
                            </div>
                        </div>
                        <div className='flex justify-around mb-6'>
                            <button className='bg-[#ec5766] text-white px-10 py-2 rounded-full duration-200 hover:bg-[#ffb5a7]'>Pago anticipo</button>
                            <button className='bg-[#ec5766] text-white px-10 py-2 rounded-full duration-200 hover:bg-[#ffb5a7]'>Pago total</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Agenda;