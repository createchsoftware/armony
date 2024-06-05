import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Compras({ compras, entregado }) {
    const entrega = entregado;
    const [info, setInfo] = useState(false);
    const navigate = useNavigate();
    const [id, setId] = useState(null);

    useEffect(() => {
        getId();
    }, []);

    async function getId() {
        let respuestaJson = null;
        try {
            const respuesta = await fetch("/api/logueado", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            respuestaJson = await respuesta.json();
            console.log("id en uso: ", respuestaJson.clave);
            await setId(respuestaJson.clave);
        } catch (error) {
            console.log("Error");
        }
    }

    const handleViewMore = (producto) => {
        // Validaciones u otras lógicas aquí...

        console.log(producto);

        const product = {
            id: producto.id,
            nombre: producto.nombre,
            precio: parseFloat(producto.precio),
            descripcion: producto.descripcion,
            valoracion: producto.valoracion || 0,
            imagen: producto.imagen,
            uid: id,
            favorito: producto.favorito || 0,
        };
        console.log(product);
        navigate(`/spa/producto/${product.id}`, { state: { product } });
    }

    const handleComprar = (productoComprar) => {
        if (!productoComprar || !productoComprar.id || typeof productoComprar.precio !== 'number') {
            console.error('Producto no válido para comprar', productoComprar);
            return;
        }

        const productoBuy = {
            id: productoComprar.pkIdPS,
            // nombre: productoComprar.nombre,
            // precio: parseFloat(productoComprar.precio),
            // cantidad: 1,
            // descripcion: productoComprar.descripcion,
            // valoracion: productoComprar.valoracion,
            // imagen: productoComprar.img,
        };
        navigate('/spa/comprar', { state: { producto: [productoBuy] } });
    };

    return (
        <>
            <div className='grid gap-4 p-6 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] '>
                <div className="flex justify-between">
                    <p className="text-[#00000085]">{compras.header}</p>
                    <p className="text-[#00000085]">Pedido #{compras.id_venta}</p>
                </div>
                <hr />
                <div className="flex justify-between w-full">
                    <div className='flex justify-between gap-4 '>
                        <img src={compras.imagen}
                            alt={compras.nombre} className='w-24 h-24' />
                        <div className='grid place-content-center'>
                            <h1 className='text-xl'>{compras.nombre}</h1>
                            <p className='mt-1 text-sm'>{compras.descripcion}</p>
                            <p className='mt-1 text-sm'><span className="font-bold">Precio:</span> ${compras.precio}</p>
                            <p className='text-sm'><span className="font-bold">Cantidad: </span> {compras.cantidad}</p>
                        </div>
                    </div>
                    {entrega ? (
                        <div className='grid content-center gap-2 p-2 '>
                            <button onClick={() => setInfo(!info)} id={compras.id} className='w-max h-max px-10 py-2 text-white rounded-full bg-[#EB5765] duration-200 hover:bg-[#ffb5a7]'>Ver información</button>
                            <button id={compras.id} className='w-52 h-max px-10 py-2 text-[#EB5765] rounded-full bg-[#ffc5c5] duration-200 hover:font-bold'>Opinar</button>
                        </div>
                    ) : (
                        <div className='grid content-center gap-2 p-2 '>
                            <button onClick={() => handleViewMore(compras)} id={compras.id} className='w-max h-max px-10 py-2 text-white rounded-full bg-[#EB5765] duration-200 hover:bg-[#ffb5a7]'>Ver producto</button>
                        </div>
                    )}
                </div>
            </div>
            {info &&
                <div className='cart-fondo'>
                    <div className='cart-fx'>
                        <div className='grid w-1/3 px-12 py-8 m-auto mt-32 bg-white rounded-2xl'>
                            <h1 className='text-[#EB5765] text-2xl mb-4 justify-self-center text-center'>Información del pedido</h1>
                            <hr />
                            <p className="pt-8 text-lg justify-self-center">Fecha: {compras.header}</p>
                            <h1 className="py-6 text-3xl text-black justify-self-center">${compras.precio}</h1>
                            <p className="text-lg justify-self-center">Total</p>
                            <div className="grid py-4 border-t border-b border-black">
                                <p>Pedido #{compras.id_venta}</p>
                            </div>
                            <div className='mb-4'>
                                <div className='flex justify-between my-1'>
                                    <h1>{compras.nombre}</h1>
                                    <h1>{compras.cantidad} x ${compras.precio * compras.cantidad}</h1>
                                </div>
                                <div className='flex justify-between my-1'>
                                    <h1>Método de pago</h1>
                                    <h1>Tarjeta</h1>
                                </div>
                                <div className='flex justify-between my-1'>
                                    <h1>Tarjeta utilizada</h1>
                                    <h1>****************</h1>
                                </div>
                                <div className='flex justify-between my-1'>
                                    <h1 className=" text-[#036C65]">Puntos obtenidos</h1>
                                    <h1 className=" text-[#036C65]">{parseInt(compras.precio / 10)} puntos</h1>
                                </div>
                            </div>
                            <button onClick={() => handleComprar(compras)} className='w-1/2 justify-self-center px-4 py-2 mb-2 bg-[#EB5765] rounded-full text-white duration-200 hover:bg-[#ffb5a7]'>Volver a comprar</button>
                            <button onClick={() => setInfo(!info)} className='w-1/2 justify-self-center px-4 py-2 bg-[#EB5765] rounded-full text-white duration-200 hover:bg-[#ffb5a7]'>Regresar</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Compras;
