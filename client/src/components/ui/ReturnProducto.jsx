import { useState } from "react"
import { Rating } from '@mui/material';
import { useNavigate } from "react-router-dom";

function Compras({ producto }) {
    const [info, setInfo] = useState(false);
    const navigate = useNavigate();

    const handleComprar = (productoComprar) => {
        // navigate('/spa/comprar');
        const productoBuy = {
            id: productoComprar.id,
            nombre: productoComprar.nombre,
            precio: parseFloat(productoComprar.precio/productoComprar.cantidad),
            cantidad: 1,
            descripcion: productoComprar.descripcion,
            valoracion: productoComprar.valoracion,
            imagen: productoComprar.imagen,
        };
        navigate('/spa/comprar', { state: { producto: [productoBuy] } });
    };

    //console.log(producto);
    const date = new Date(producto.date);

    const horaFormateada = date.toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return (
        <>
            <div className='grid gap-4 p-6 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] '>
                <div className="flex justify-between">
                    <div className="flex gap-4">
                        <p className="text-[#00000085]">{`${producto.day} de ${producto.month} de ${producto.year}`}</p>
                        <p className="text-[#00000085]">{`Hora: ${horaFormateada}`}</p>
                    </div>
                    <p className="text-[#00000085]">Pedido #{producto.id_venta}</p>
                </div>
                <hr />
                <div className="flex justify-between w-full">
                    <div className='flex justify-between gap-4 '>
                        <img src={producto.imagen}
                            alt={producto.nombre} className='w-24 h-24' />
                        <div className='grid place-content-center'>
                            <h1 className='text-xl'>{producto.nombre}</h1>
                            <p className='mt-1 text-sm'>{producto.descripcion}</p>
                            <p className='mt-1 text-sm'><span className="font-bold">Precio:</span> ${producto.precio}</p>
                            <p className='text-sm'><span className="font-bold">Cantidad: </span> {producto.cantidad}</p>
                        </div>
                    </div>
                    <div className='grid content-center gap-2 p-2 '>
                        <button onClick={() => setInfo(!info)} className='w-max h-max px-10 py-2 text-white rounded-full bg-[#EB5765] duration-200 hover:bg-[#ffb5a7]'>Ver información</button>
                        <button className='w-52 h-max px-10 py-2 text-[#EB5765] rounded-full bg-[#ffc5c5] duration-200 hover:font-bold'>Opinar</button>
                    </div>
                </div>
            </div>
            {info && 
                <div className='cart-fondo z-30'>
                <div className='cart-fx'>
                    <div className='grid mt-16 w-[60%] bg-white rounded-2xl m-auto py-4'>
                        <h1 className="justify-self-center text-3xl text-[#EB5765]">Producto</h1>
                        <div className=" justify-self-center w-1/2 border border-black my-3" />
                        <h1 className=" justify-self-center mb-5 text-xl">{`Fecha: ${producto.day} / ${producto.month} / ${producto.year}`}</h1>
                        <div className="flex justify-between px-12">
                            <div className="grid w-[35%] justify-items-center">
                                <h1 className="text-2xl font-bold overflow-hidden">{producto.nombre}</h1>
                                <img src={producto.imagen} alt="" className="w-full h-auto aspect-square rounded-2xl" />
                                <h1 className="text-xl text-[#EB5765]">Calificación de los clientes:</h1>
                                <h1 className="text-xl text-[rgb(3,109,99)]">Excelente</h1>
                                <Rating className='' value={producto.valoracion} readOnly unratedcolor="amber" ratedcolor="amber" />
                            </div>
                            <div className="grid w-[55%]">
                                <div className="flex justify-center items-center border-b border-t border-black py-1">
                                    <h1 className="text-2xl">{`Pedido: #${producto.id}`}</h1>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <p>Sesiones</p>
                                    <p>{`1 x $${producto.precio}`}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>IVA:</p>
                                    <p>$0.00</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Descuento</p>
                                    <p>$0.00</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Método de pago:</p>
                                    <p>Tarjeta</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Tarjeta utilizada</p>
                                    <p>************9382</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-[rgb(3,109,99)]">Puntos obtenidos:</p>
                                    <p className="text-[rgb(3,109,99)]">{parseInt(producto.precio/10)} puntos</p>
                                </div>
                            </div>
                        </div>
                        <div className="grid justify-items-center">
                            <button className='w-48 px-4 py-2 h-max mb-2 text-white rounded-full bg-[#EB5765] duration-200 hover:bg-[#ffb5a6]'>Dar una opinión</button>
                            <button onClick={() => handleComprar(producto)} className='w-48 px-4 py-2 h-max mb-2 text-white rounded-full bg-[#EB5765] duration-200 hover:bg-[#ffb5a6]'>Volver a comprar</button>
                            <button onClick={() => setInfo(!info)} className='w-48 px-4 py-2 h-max mb-2 text-white rounded-full bg-[#EB5765] duration-200 hover:bg-[#ffb5a6]'>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default Compras
