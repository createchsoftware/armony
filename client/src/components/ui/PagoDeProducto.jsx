import { useState, useEffect } from "react";
import InforTarjeta from "./InfoTarjeta";
import PagoRealizado from "./PagoRealizadoProducto";
import { jwtDecode } from "jwt-decode";



function Pago({ producto, next }) {
    const [tarjeta, setTarjeta] = useState(false);
    const [pagoRealizado, setPagoRealizado] = useState(false);
    const [Uid, setUid] = useState(null)
    const [descuento, setDescuento] = useState('');

    const [cartItems, setCartItems] = useState(() => {
        if (producto) {
            // Si hay un producto en el prop, lo utilizamos
            return producto;
        } else {
            // Si no hay un producto en el prop, intentamos obtenerlo del localStorage
            const savedCart = localStorage.getItem('cartItems');
            return savedCart ? JSON.parse(savedCart) : [];
        }
    });

    // const [tarjetas, setTarjetas] = useState([
    //     {id: 1, noTarjeta: "509612341234", tipo: "Débito", banco: "BANORTE", code: "****"},
    //     {id: 2, noTarjeta: "294712341234", tipo: "Débito", banco: "NU", code: "****"}
    // ]);

    const [tarjetas, setTarjetas] = useState([]);

    const totalProductos = cartItems.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0).toFixed(2);
    const cantidadProductos = cartItems.reduce((sum, producto) => sum + producto.cantidad, 0);
    const subTotal = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2);
    const ivaTotal = (parseFloat(subTotal) * 0.08).toFixed(2);
    const total = (parseFloat(subTotal) + parseFloat(ivaTotal)).toFixed(2);

    useEffect(() => {
        const getidUser = () => {// aqui veificamos si hay una cookie con este nombre 
            const cookie = obteneridCookie('Naruto_cookie')
            if (cookie) {

                const decode = jwtDecode(cookie)//aqui decodificaremos la cokie
                setUid(decode.user)
            }
        }
        getidUser()
    }, [])


    const obteneridCookie = (namecookie) => { //en este metodo lo que hacemos es destructurar la cokie para 
        // obtener el user y luego el id
        const cookies = document.cookie.split(';');
        for (let cokie of cookies) {
            const [key, value] = cokie.split('=')
            if (key.trim() === namecookie) {
                return value;//retornara el valor
            }
        }
        return null;
    }



    useEffect(() => {
        setTimeout(() => {
            fetch("/api/tarjetas/1.5")
                .then(response => response.json())
                .then(data => {
                    setTarjetas(data.array);
                })
                .catch(error => {
                    console.log(error);
                });
        }, 500);
    }, [])

    const cliente = {};
    useEffect(() => {
        if (Uid) {
            fetch(`/api/admin/cliente/read/${Uid}`)
                .then(response => response.json())
                .then(data => {
                    cliente.idCliente = data.ID;
                    cliente.nombre = data.Nombre;
                    cliente.telefono = data.telefono;
                    cliente.direccion = data.Dirección;
                    cliente.email = data.email;
                    cliente.monedero = data.monedero;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [Uid]);

    const toggleTarjeta = () => {
        setTarjeta(!tarjeta);
    }
    const togglePago = () => {
        setPagoRealizado(!pagoRealizado);
    }
    // const datosRecibidos = (nuevaTarjeta) => {
    //     setTarjetas([...tarjetas, {id: 3, noTarjeta: {nuevaTarjeta}, tipo: "Débito", banco: "BBVA", code: "****"}]);
    //     console.log(tarjetas);
    // }

    //const total = (574).toFixed(2);

    const cardList = tarjetas.length > 0 ? (tarjetas.map(item => (
        <li key={item.id} className="flex items-center justify-between gap-4 px-4 mb-4 border-2 shadow-md rounded-3xl border-gray">
            <img src={"../../../pictures/" + item.imagen} className="w-1/5 h-auto" />
            <h1 className="text-xl truncate">{item.empresa}</h1>
            <h1 className="text-xl">{item.tipo}</h1>
            {/* <h1 className="text-xl">{item.code}</h1> */}
            <h1 className="text-xl">{item.numero_tarjeta.slice(0, 4)}</h1>
            <button onClick={togglePago} className='bg-[#ec5766] text-xl text-white px-10 py-2 rounded-full duration-200 hover:bg-[#ffb5a7]'>Continuar</button>
        </li>
    ))) : (<div></div>)
    return (
        <>
            <div className='flex justify-between mx-16'>
                {/* Bloque de ¿Cómo quieres pagar? */}
                <div className="rounded-xl shadow-md w-[55%] border-2 border-gray">
                    <div className='grid bg-[rgb(3,109,99)] rounded-t-xl'>
                        <p className='py-2 ml-8 text-2xl text-white'>¿Cómo quieres pagar?</p>
                    </div>
                    <div className='px-6 pt-6 overflow-y-auto'>
                        {cardList.length === 0 ? (
                            <>
                            </>
                        ) : (
                            <ul>
                                {cardList}
                            </ul>
                        )}
                        <ul>
                            <li className="flex items-center justify-between gap-4 px-4 mb-4 border-2 shadow-md rounded-3xl border-gray">
                                <svg className='w-16' fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 459.669 459.669" xmlSpace="preserve">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier"> <g> <g>
                                        <path d="M404.723,76.087H54.948C24.649,76.087,0,100.735,0,131.035v197.599c0,30.298,24.649,54.948,54.948,54.948h349.774 c30.298,0,54.947-24.65,54.947-54.948V131.035C459.67,100.735,435.021,76.087,404.723,76.087z M429.267,328.633 c0,13.534-11.011,24.544-24.544,24.544H54.948c-13.534,0-24.545-11.01-24.545-24.544V196.214h398.863L429.267,328.633 L429.267,328.633z M429.267,152.839l-398.863,0.029v-21.834c0-13.534,11.011-24.545,24.545-24.545h349.774 c13.533,0,24.544,11.011,24.544,24.545V152.839z"></path>
                                        <path d="M68.136,324.98h83.23c2.98,0,5.398-2.416,5.398-5.396v-16.421c0-2.981-2.418-5.397-5.398-5.397h-83.23 c-2.981,0-5.398,2.416-5.398,5.397v16.421C62.737,322.564,65.154,324.98,68.136,324.98z"></path>
                                        <path d="M337.963,324.98h24.756c14.288,0,25.87-11.582,25.87-25.869v-24.756c0-14.287-11.582-25.869-25.87-25.869h-24.756 c-14.287,0-25.869,11.582-25.869,25.869v24.756C312.094,313.398,323.676,324.98,337.963,324.98z"></path> </g> </g>
                                    </g>
                                </svg>
                                <h1 className="text-xl">Nueva tarjeta de crédito</h1>
                                <button onClick={toggleTarjeta} className='bg-[#ec5766] text-xl text-white px-10 py-2 rounded-full duration-200 hover:bg-[#ffb5a7]'>Continuar</button>
                            </li>
                            <li className="flex items-center justify-between gap-4 px-4 mb-4 border-2 shadow-md rounded-3xl border-gray">
                                <svg className="w-16" fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 442.979 442.979" xmlSpace="preserve">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g>
                                        <path d="M327.93,139.923H33.462C14.982,139.923,0,154.904,0,173.384v166.355c0,18.481,14.981,33.462,33.462,33.462h294.47 c18.479,0,33.461-14.98,33.461-33.462V173.384C361.393,154.904,346.41,139.923,327.93,139.923z M53.441,210.654 c0-11.284,9.147-20.432,20.432-20.432h19.553c11.284,0,20.432,9.147,20.432,20.432v19.553c0,11.284-9.147,20.432-20.432,20.432 H73.873c-11.284,0-20.432-9.147-20.432-20.432V210.654z M154.241,319.293c0,3.159-2.561,5.719-5.719,5.719H60.341 c-3.158,0-5.72-2.561-5.72-5.719v-17.398c0-3.158,2.562-5.719,5.72-5.719h88.182c3.158,0,5.719,2.561,5.719,5.719L154.241,319.293 L154.241,319.293z M306.77,319.293c0,3.159-2.562,5.719-5.721,5.719h-88.18c-3.158,0-5.72-2.561-5.72-5.719v-17.398 c0-3.158,2.562-5.719,5.72-5.719h88.18c3.158,0,5.721,2.561,5.721,5.719V319.293z"></path>
                                        <path d="M409.516,69.777H115.048c-18.48,0-33.462,14.981-33.462,33.462v9.04h246.346c33.691,0,61.104,27.412,61.104,61.105v25.874 h53.943v-96.019C442.979,84.758,427.996,69.777,409.516,69.777z"></path>
                                        <path d="M389.035,303.057h20.48c18.48,0,33.463-14.981,33.463-33.463v-37.16h-53.943V303.057z"></path> </g> </g>
                                    </g>
                                </svg>
                                <h1 className="text-xl">Nueva tarjeta de débito</h1>
                                <button onClick={toggleTarjeta} className='bg-[#ec5766] text-xl text-white px-10 py-2 rounded-full duration-200 hover:bg-[#ffb5a7]'>Continuar</button>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Sección derecha */}
                <div className="w-[40%]">
                    {/* Bloque de resumen */}
                    <div className="border-2 shadow-md rounded-xl border-gray">
                        <div className='grid bg-[rgb(3,109,99)] rounded-t-xl'>
                            <p className='py-2 ml-8 text-2xl text-white'>Pago</p>
                        </div>
                        <div className='px-6 pt-6'>
                            <div className='grid p-6 mb-4 border-2 shadow-md rounded-xl border-gray'>
                                <div className='flex justify-between px-6'>
                                    <span className='font-bold'>{cantidadProductos} {cantidadProductos === 1 ? "Producto" : "Productos"}</span>
                                    <span className="text-[rgb(3,109,99)] font-bold text-xl">${totalProductos}</span>
                                </div>
                                <div className='flex justify-between px-6 pt-6'>
                                    <h1 className='font-bold'>Envío</h1>
                                    <span className="text-[rgb(3,109,99)] font-bold">$0.00</span>
                                </div>
                                <div className='flex justify-between px-6 pt-6'>
                                    <h1 className='font-bold'>IVA</h1>
                                    <span className="text-[rgb(3,109,99)] font-bold">${ivaTotal}</span>
                                </div>
                                <div className='flex justify-between px-6 pt-6'>
                                    <h1 className='font-bold'>Cupón</h1>
                                    <span className="text-[rgb(3,109,99)] font-bold">$0.00</span>
                                </div>
                            </div>
                            <div className='flex justify-between p-6 px-10 mb-4 border-2 shadow-md rounded-xl border-gray'>
                                <h4 className='text-xl font-bold'>Total:</h4>
                                <span className='font-bold text-[rgb(3,109,99)] text-xl'>${total}</span>
                            </div>
                        </div>
                    </div>
                    {/* Bloque "Aceptamos" */}
                    <div className="mt-2 border-2 shadow-md rounded-xl border-gray">
                        <div className='grid bg-[rgb(3,109,99)] rounded-t-xl'>
                            <p className='py-2 ml-8 text-2xl text-white'>Aceptamos</p>
                        </div>
                        <div className='flex justify-between items-center px-6 py-2 gap-2'>
                            <img className="w-28 h-auto" src="../../../pictures/Visa.png" alt="" />
                            <img className="w-28 h-auto" src="../../../pictures/MasterCard.png" alt="" />
                            <img className="w-28 h-auto" src="../../../pictures/AmericanExpress.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            {tarjeta && (
                <div className='soon-fondo'>
                    <div className='soon-fx'>
                        <InforTarjeta cerrarInfo={toggleTarjeta} />
                    </div>
                </div>
            )}
            {pagoRealizado && (
                <div className='soon-fondo'>
                    <div className='soon-fx'>
                        <PagoRealizado cerrarPago={togglePago} cliente={cliente} total={total} next={next} />
                    </div>
                </div>
            )}
        </>
    )
}

export default Pago;